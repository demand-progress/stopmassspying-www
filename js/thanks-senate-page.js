import $ from 'jquery';
import clone from 'lodash/clone';
import Constants from './constants';
import each from 'lodash/each';
import Modal from './modal';
import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import StaticKit from './static-kit';
import uniq from 'lodash/uniq';


var state = {
    bioguideIDs  : [],
    callCampaign : 'savethefourthnet-senate-default',
    twitterIDs   : [],
    twitterText  : 'support the effort to #ReformECPA & urge leadership to swiftly pass a clean bill! https://savethefourth.net',
    zip: '',
};

async function start() {
    // Debug
    debug();

    // Update campaign
    var zip = getSavedZip();
    state.zip = zip;
    await updateCampaignWithZip(zip);
    tweetToAdditionalMember();

    // Update suggested Tweet
    $('.tweet-content').html(
        state.twitterText
            .replace(/#(\w+)/g, '<span class="link">#$1</span>')
            .replace(/http([^ ]+)/g, '<span class="link">http$1</span>')
    );

    // Update forms
    $('.sample-tweet .handle').text('@' + state.twitterIDs.join(' @'));

    // Show forms
    $('body').addClass('ready');
    $('.options').addClass('ready');
    $('.tweet-prompt').addClass('ready');

    // Call form logic
    $('.call-wrapper form').on('submit', onCallFormSubmit);

    // Tweet form logic
    $('.tweet-wrapper form').on('submit', onTweetFormSubmit);

    // Feedback form logic
    $('.calling-wrapper form').on('submit', onFeedbackFormSubmit);
}

function onFeedbackFormSubmit(e) {
    e.preventDefault();

    var $feedbackForm = $(e.target);
    var message = '';
    var fields = $feedbackForm.serializeArray();
    each(fields, field => message += `${field.name}:\n${field.value}\n\n`);

    message += '\n\nBioguide IDs: ( ' + state.bioguideIDs.join(', ') + ' )';
    message += '\n\nZIP: ' + state.zip;

    $.getJSON(Constants.FEEDBACK_TOOL_URL, {
        campaign: 'save-the-fourth-senate',
        subject: 'Feedback from Save the Fourth (Senate)',
        text: message,
    });

    $feedbackForm.addClass('sent');
}

function onTweetFormSubmit(e) {
    e.preventDefault();

    var tweet = `.@${state.twitterIDs.join(' @')} ${state.twitterText}`;

    var url =
        'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(tweet);

    window.open(url);

    // Show thanks
    var $submit = $('.tweet-wrapper button');
    $submit.addClass('thanks');
    $submit.text('Thanks!');

    // Send event
    ga('send', {
        hitType       : 'event',
        eventCategory : 'ThanksPageTweet',
        eventAction   : 'sent',
        eventLabel    : state.campaignId,
    });
}

async function onCallFormSubmit(e) {
    e.preventDefault();

    var $phone = $('input[name=phone]');

    var phone = $phone.val().replace(/[^\d]/g, '');

    if (phone.length < 10) {
        return alert('Please enter your 10 digit phone number.');
    }

    Modal.show('.calling');

    $phone.val('');

    // Send call
    var callParams = {
        campaignId: state.callCampaign,
        source_id: StaticKit.query.cleanedSource,
        userPhone: phone,
        repIds: state.bioguideIDs,
    };

    $.getJSON(Constants.CALL_TOOL_URL, callParams);

    // Deselect input
    document.activeElement.blur();

    // Show thanks
    showCallFormThanks();

    // Send event
    ga('send', {
        hitType       : 'event',
        eventCategory : 'ThanksPageCall',
        eventAction   : 'sent',
        eventLabel    : callParams.campaignId,
    });
}

function showCallFormThanks() {
    var $callWrapper = $('.call-wrapper');
    $callWrapper.addClass('thanks');
    var $submit = $('.call-wrapper button');
    $submit.attr('disabled', true);
    $submit.text('Thanks!');

    $('.call-wrapper form input').remove();
    $('.call-wrapper h2').remove();
}

function getSavedZip() {
    try {
        return sessionStorage.zip;
    } catch (e) {
        return null;
    }
}

async function updateCampaignWithZip(zip) {
    var res = await $.getJSON(Constants.SUNLIGHT_LOCATE_URL, {
        apikey: Constants.SUNLIGHT_API_KEY,
        zip: zip || 50316,
    });

    // Search for committee members who represents the visitor
    var senators = [];
    var senatorsWithinCommittee = [];
    each(res.results, representative => {
        if (representative.chamber !== 'senate') {
            return;
        }

        // A few Senators didn't have Twitter IDs in the Sunlight DB
        if (!representative.twitter_id) {
            representative.twitter_id = Constants.TWITTER_ID_BACKUPS[representative.bioguide_id];
        }

        senators.push(representative);
        representative.committee = 0;

        each(Constants.COMMITTEE_MEMBERS_SENATE, bioguideID => {
            if (representative.bioguide_id === bioguideID) {
                senatorsWithinCommittee.push(representative);
                representative.committee = 1;
                return false;
            }
        });
    });

    if (senators.length === 0) {
        state.twitterText = 'the time to #ReformECPA & require warrants for email is now — reject privacy weakening amendments! https://savethefourth.net';
        senators = [
            {
                bioguide_id: 'G000386',
                twitter_id: 'ChuckGrassley',
            },
        ];
        $('body')
            .removeClass('variation-default')
            .addClass('variation-missing');
    }

    if (zip && senatorsWithinCommittee.length > 0) {
        if (senatorsWithinCommittee.length === 1) {
            // Update page (Match)
            state.callCampaign = 'savethefourthnet-senate-match';
            state.twitterText = 'the time to #ReformECPA & require warrants for email is now — reject privacy weakening amendments! https://savethefourth.net';
            $('body')
                .removeClass('variation-default')
                .addClass('variation-match');
        } else {
            // Update page (Matches)
            state.callCampaign = 'savethefourthnet-senate-matches';
            state.twitterText = 'the time to #ReformECPA is now — reject all privacy weakening amendments! https://savethefourth.net';
            $('body')
                .removeClass('variation-default')
                .addClass('variation-matches');
        }

        // Shuffle and store Twitter IDs
        each(shuffle(senatorsWithinCommittee), senator => {
            state.twitterIDs.push(senator.twitter_id);
        });
    } else {
        // Shuffle and store Twitter IDs
        each(shuffle(senators), senator => {
            state.twitterIDs.push(senator.twitter_id);
        });
    }

    // Shuffle the order of calls
    // Sort committee members higher though
    senators = shuffle(senators).sort((a, b) => b.committee - a.committee);

    // Store bioguide IDs for call tool
    each(senators, senator => {
        state.bioguideIDs.push(senator.bioguide_id);
    });

    // Add Grassley. Then add the remaining committee members, in shuffled order.
    var targets = state.bioguideIDs;
    var shuffledCommitteeMembers = shuffle(clone(Constants.COMMITTEE_MEMBERS_SENATE));
    targets = targets.concat('G000386');
    targets = targets.concat(shuffledCommitteeMembers);
    targets = uniq(targets);
    state.bioguideIDs = targets;
}

function tweetToAdditionalMember() {
    var chair = 'RepGoodlatte';

    // Only add to default tweets
    if (state.twitterIDs[0] !== chair) {
        return;
    }

    // Find additional members
    while (state.twitterIDs.join(' @').length <= 40) {
        var member = sample(Constants.COMMITTEE_MEMBERS).twitter;

        if (state.twitterIDs.indexOf(member) > -1) {
            continue;
        }

        state.twitterIDs.push(member);
    }
}

function debug() {
    switch (StaticKit.query.debug) {
        case 'default':
            sessionStorage.zip = '33880';
            break;

        case 'match':
            sessionStorage.zip = '90210';
            break;

        case 'matches':
            sessionStorage.zip = '84622';
            break;

        case 'missing':
            sessionStorage.zip = '85001';
            break;

        case 'default-calling':
            sessionStorage.zip = '33880';
            Modal.show('.calling');
            break;

        case 'match-calling':
            sessionStorage.zip = '90210';
            Modal.show('.calling');
            break;

        case 'matches-calling':
            sessionStorage.zip = '84622';
            Modal.show('.calling');
            break;

        case 'missing-calling':
            sessionStorage.zip = '85001';
            Modal.show('.calling');
            break;
    }
}

export default {
    start,
};
