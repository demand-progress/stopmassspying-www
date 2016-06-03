import $ from 'jquery';
import clone from 'lodash/clone';
import Constants from './constants';
import each from 'lodash/each';
import Modal from './modal';
import reduce from 'lodash/reduce';
import sample from 'lodash/sample';
import shuffle from 'lodash/shuffle';
import slice from 'lodash/slice';
import StaticKit from './static-kit';
import uniq from 'lodash/uniq';


var state = {
    bioguideIDs  : [],
    callCampaign : 'stop-mass-spying',
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
    var fields = $feedbackForm.serializeArray();
    var message = reduce(
        fields,
        field => message += `${field.name}:\n${field.value}\n\n`,
        ''
    );

    message += '\n\nBioguide IDs: ( ' + state.bioguideIDs.join(', ') + ' )';
    message += '\n\nZIP: ' + state.zip;

    $.getJSON(Constants.FEEDBACK_TOOL_URL, {
        campaign: Constants.ACTIONKIT_PAGE,
        subject: 'Feedback from Stop Mass Spying',
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

    // Search for visitor's rep
    var reps = [];
    each(res.results, representative => {
        if (representative.chamber !== 'house') {
            return;
        }

        // A few reps didn't have Twitter IDs in the Sunlight DB
        if (!representative.twitter_id) {
            representative.twitter_id = Constants.TWITTER_ID_BACKUPS[representative.bioguide_id];
        }

        reps.push(representative);
    });

    if (reps.length === 0) {
        state.twitterText = 'the time to #ReformECPA & require warrants for email is now — reject privacy weakening amendments! https://savethefourth.net';
        reps = [
            {
                bioguide_id: 'G000386',
                twitter_id: 'ChuckGrassley',
            },
        ];
        $('body')
            .removeClass('variation-default')
            .addClass('variation-missing');
    }

    // Store Twitter & Bioguide IDs
    each(reps, representative => {
        state.bioguideIDs.push(representative.bioguide_id);
        state.twitterIDs.push(representative.twitter_id);
    });

    // Add the remaining representatives members, in shuffled order.
    var targets = state.bioguideIDs;
    var shuffledReps = shuffle(clone(Constants.LEGISLATORS_TO_CALL));
    targets = targets.concat(shuffledReps);
    targets = uniq(targets);
    targets = slice(targets, 0, 40);
    state.bioguideIDs = targets;
}

function debug() {
    if (StaticKit.query.action === 'calling') {
        Modal.show('.calling');
    }

    if (StaticKit.query.zip) {
        sessionStorage.zip = StaticKit.query.zip;
    }
}

export default {
    start,
};
