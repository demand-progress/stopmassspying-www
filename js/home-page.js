// Modules
import $ from 'jquery';
import Constants from './constants';
import each from 'lodash/each';
import Email from './email';
import FlipCounter from './flip-counter';
import Modal from './modal';
import StaticKit from './static-kit';


function start() {
    // Populate special form fields
    $('[name=action_user_agent]').val(navigator.userAgent);
    $('[name=source]').val(StaticKit.query.cleanedSource);
    $('[name=url]').val(location.href);

    // Letter modal
    $('a.the-letter').on('click', e => {
        e.preventDefault();

        Modal.show('#letter');
    });

    // Disclaimer
    updateDisclaimer();

    // Counter
    FlipCounter.update(Constants.actionKitPage);

    // Setup signature form
    var readyToSubmit = false;
    var $signatureForm = $('.action form');
    $signatureForm.on('submit', e => {
        if (readyToSubmit) {
            return;
        }

        e.preventDefault();
        var valid = true;

        each(Constants.requiredFields, field => {
            if (!valid) {
                return;
            }

            console.log(field);

            var $field = $('#' + field);
            var value  = $field.val() && $field.val().trim();
            if (!value) {
                alert('Please enter your ' + $field.attr('placeholder'));
                $field.focus();

                valid = false;
            }
        });

        if (!valid) {
            return false;
        }

        var email = $('#email').val().trim().toLowerCase();

        if (!Email.validate(email)) {
            $('#email').focus();
            alert('Please enter your valid email');
            return false;
        }

        var zip = $('#postcode').val().trim();
        try {
            sessionStorage.zip = zip;
        } catch (e) {}

        // Thanking user, and disabling form
        $('form button').attr('disabled', true);
        $('#thanks').css({
            display : 'block',
            opacity : 1,
        });

        readyToSubmit = true;
        $signatureForm.submit();
    });
}

function updateDisclaimer() {
    var pattern = /_ns$/;
    var source = StaticKit.query.cleanedSource;
    if (!source.match(/_ns$/)) {
        return;
    }

    var key = source.replace(pattern, '');
    var orgName = Constants.orgNames[key];
    if (orgName) {
        $('.disclaimer .org-name').text(orgName);
    }

    $('.disclaimer').css({ display: 'block' });
    $('.squaredFour').remove();
}

export default {
    start,
};
