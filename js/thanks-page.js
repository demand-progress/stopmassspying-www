import $ from 'jquery';
import Constants from './constants';
import each from 'lodash/each';
import Modal from './modal';
import sample from 'lodash/sample';
import StaticKit from './static-kit';


var campaign = {
    callCampaign : 'ecpa-goodlatte',
    twitterIds   : [ 'RepGoodlatte' ],
    twitterText  : 'Pass the most popular bill in Congress! #EmailPrivacyAct https://savethefourth.net',
};

async function start() {
    // Debug
    debug();

    // Update campaign
    var zip = getSavedZip();
    await updateCampaignWithZip(zip);
    tweetToAdditionalMember();

    // Update suggested Tweet
    $('.tweet-content').html(campaign.twitterText.replace('#', '<span class="link">#') + '</span>');

    // Update forms
    $('.sample-tweet .handle').text('@' + campaign.twitterIds.join(' @'));

    // Show forms
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
    each(fields, field => {
        message += `${field.name}:\n${field.value}\n\n`;
    });

    $.getJSON(Constants.FEEDBACK_TOOL_URL, {
        campaign: 'save-the-fourth',
        subject: 'Feedback from Save the Fourth',
        text: message,
    });

    $feedbackForm.addClass('sent');
}

function onTweetFormSubmit(e) {
    e.preventDefault();

    var tweet = `.@${campaign.twitterIds.join(' @')} ${campaign.twitterText}`;

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
        eventLabel    : campaign.campaignId,
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
        campaignId: campaign.callCampaign,
        source_id: StaticKit.query.cleanedSource,
        userPhone: phone,
    };

    if (callParams.campaignId === 'ecpa-zip') {
        callParams.zipcode = getSavedZip();
    }

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
    if (!zip) {
        return;
    }

    var res = await $.getJSON(Constants.SUNLIGHT_LOCATE_URL, {
        apikey: Constants.SUNLIGHT_API_KEY,
        zip: zip || $('#postcode').val(),
    });

    // Search for a committee member who represents the visitor
    for (var representative of res.results) {
        if (representative.chamber !== 'house') {
            continue;
        }

        for (var committeeMember of Constants.COMMITTEE_MEMBERS) {
            if (
                (committeeMember.district === representative.district) &&
                (committeeMember.state === representative.state)
            ) {
                campaign = {
                    callCampaign : 'ecpa-zip',
                    twitterIds   : [ representative.twitter_id ],
                    twitterText  : 'it’s time to pass the most popular bill in Congress, with no weakening amendments #EmailPrivacyAct https://savethefourth.net',
                };

                // Update copy
                $('body').removeClass('chairman-goodlatte').addClass('your-rep');

                break;
            }
        }
    }
}

function tweetToAdditionalMember() {
    var chair = 'RepGoodlatte';

    // Only add to default tweets
    if (campaign.twitterIds[0] !== chair) {
        return;
    }

    // Find additional members
    while (campaign.twitterIds.join(' @').length <= 40) {
        var member = sample(Constants.COMMITTEE_MEMBERS).twitter;

        if (campaign.twitterIds.indexOf(member) > -1) {
            continue;
        }

        campaign.twitterIds.push(member);
    }
}

function debug() {
    switch (StaticKit.query.debug) {
        case 'calling-goodlatte':
            sessionStorage.zip = '90210';
            Modal.show('.calling');
            break;
        case 'calling-rep':
            sessionStorage.zip = '95046';
            Modal.show('.calling');
            break;
        case 'rep':
            sessionStorage.zip = '95046';
            break;
        case 'goodlatte':
            sessionStorage.zip = '90210';
            break;
    }
}

export default {
    start,
};
