(function() { // Begin closure




// Share text
var DOMAIN = "dontsellourhomestowallstreet.org";
var TWEET_TEXT = "Tell @SecretaryCastro: Stop selling our neighborhoods to Wall Street! https://" + DOMAIN + "/?source=${source}";
var EMAIL_SUBJECT = "I just signed this:";
var EMAIL_BODY = "Hi – I just signed this petition to Secretary Julian Castro urging him to end the Wall Street giveaway at the Department of Housing and Urban Development. \
\n\n\
The department has been selling our neighborhoods to Wall Street – with 98% of overdue mortgages getting sold to huge financial institutions – even though the department promised to sell to nonprofit community organizations. \
\n\n\
Could you sign too? http://" + DOMAIN + "/?source=${source} \
\n\n\
Thanks!";





// Check for outdated browsers
var isIE = navigator.userAgent.match(/MSIE (\d+)\./);
if (isIE) {
    var version = +isIE[1];
    if (version < 10) {
        alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
}

if (navigator.userAgent.match(/Android 2\.3/)) {
    alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
}



// Fill in dynamic form fields
$('[name=action_user_agent]').val(navigator.userAgent);
$('[name=source]').val(StaticKit.query.source);
$('[name=url]').val(location.href);

var requiredFields = [
    'email',
    'postcode',
];

$('.email_signup form').on('submit', function(e) {
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];

        if (!document.getElementById(field).value) {
            e.preventDefault();
            alert('Please enter your ' + field.replace(/_/g, ' ') + '.');
            return document.getElementById(field).focus();
        }
    }

    // document.activeElement.blur();
    // var thanks = document.getElementById('thanks');
    // document.querySelector('form button').setAttribute('disabled', true);
    // thanks.style.display = 'block';
    // thanks.clientWidth;
    // thanks.style.opacity = 1;

    // // Send to Queue
    // var xhr1 = new XMLHttpRequest();
    // xhr1.onreadystatechange = function() {
    //     if (xhr1.readyState === 4) {
    //         // console.log('response:', xhr1.response);
    //     }
    // };
    // xhr1.open('post', 'https://queue.fightforthefuture.org/action', true);
    // xhr1.send(data);

    // modal_show('thank-you');
    // document.querySelector('input[type=tel]').focus();
});

function modal_show(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.style.display = 'table';
    setTimeout(function() {
        overlayNode.className = overlayNode.className.replace(/ ?invisible ?/, ' ');
    }, 50);
};

function modal_hide(id) {
    var overlayNode = document.getElementById(id);
    overlayNode.className += 'invisible';
    setTimeout(function() {
        overlayNode.style.display = 'none';
    }, 400);
}

var bindModalEvents = function(modal, permanent) {
    modal = document.getElementById(modal);

    if (!modal)
        return;

    var closeButton = modal.querySelector('.modal .close');

    if (permanent) {
        closeButton.parentElement.removeChild(closeButton);
        return;
    }

    closeButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal_hide(modal.id);
    }, false);

    modal.querySelector('.gutter').addEventListener('click', function(e) {
        if (e.target === e.currentTarget) {
            e.preventDefault();
            modal_hide(modal.id);
        }
    }, false);
}
bindModalEvents('confirmed', true);
bindModalEvents('goodbye_modal', true);
bindModalEvents('letter');
bindModalEvents('sent');

var fb = document.querySelectorAll('a.facebook');
for (var i = 0; i < fb.length; i++) {
    fb[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.open(
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(DOMAIN + '/?source=' + StaticKit.query.cleanedSource + '-fbshare')
        );
    }, false);
}

var tws = document.querySelectorAll('a.twitter');
for (var i = 0; i < tws.length; i++) {
    tws[i].addEventListener('click', function(e) {
        e.preventDefault();
        window.open(
            'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(
                TWEET_TEXT.replace('${source}', StaticKit.query.cleanedSource + '-twittershare')
            )
        );
    }, false);
}

var ems = document.querySelectorAll('a.email');
for (var i = 0; i < ems.length; i++) {
    ems[i].addEventListener('click', function(e) {
        e.preventDefault();

        window.open(
            'mailto:?subject=' + encodeURIComponent(EMAIL_SUBJECT) +
            '&body=' + encodeURIComponent(
                EMAIL_BODY.replace('${source}', StaticKit.query.cleanedSource + '-emailshare')
            )
        );
    }, false);
}

$('a.the-letter').on('click', function(e) {
    e.preventDefault();
    modal_show('letter');
});

$('.animated-scroll').on('click', function(e) {
    e.preventDefault();

    var target = $(e.target).data('target');
    $('html, body').stop().animate({
        scrollTop: $(target).offset().top,
    }, 640);
});

function removeNode(target) {
    var node = document.querySelector(target);
    node.parentElement.removeChild(node);
}

var disclaimer = document.querySelector('.disclaimer');

var resizeTimeout = false;
window.addEventListener('resize', function(e) {
    resizeTimeout = setTimeout(onResize, 300);
}, false);

function onResize() {
    var modals = document.getElementsByClassName('modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.maxHeight = innerHeight + 'px';
    }
}

if (window.location.href.indexOf('dropoff=1') != -1) {
    window.location.href = '#dropoff';
}

function directOpenCallModal() {
    document.getElementById('call_header').textContent = 'Enter your phone number and we\'ll connect you.';
    modal_show('call_tool');
}
if (window.location.href.indexOf('call=1') != -1) {
    directOpenCallModal()
}

// Hashes
if (location.hash === '#confirmed') {
    modal_show('confirmed');
    showThanks();
    location.hash = '';
} else if (location.hash === '#sent') {
    modal_show('sent');
    showThanks();
    location.hash = '';
}

function showThanks() {
    var thanks = document.getElementById('thanks');
    document.querySelector('form button').setAttribute('disabled', true);
    thanks.style.display = 'block';
    thanks.style.opacity = 1;
}

function shuffleLogos() {
    // Get array of logos
    var logos = Array.prototype.slice.call(document.querySelectorAll('.logos .clamp a'));

    // Randomize order
    logos.forEach(function (logo) {
        logo.randomValue = Math.random();
    });

    logos.sort(function (a, b) {
        return a.randomValue - b.randomValue;
    });

    // Re-append all logos
    logos.forEach(function (logo) {
        var parent = logo.parentElement;
        parent.removeChild(logo);
        parent.appendChild(logo);
    });
}

function fetchActionKitCount() {
    var script = document.createElement('script');
    script.src = 'https://act.demandprogress.org/progress/dontsellourhomestowallstreetorg?callback=onActionKitCount';
    document.head.appendChild(script);
}

function onActionKitCount(data) {
    createCounter(data.total.actions);
}
window.onActionKitCount = onActionKitCount;

function createCounter(size) {
    var wrapperEl = document.querySelector('.action-wrapper');
    if (!wrapperEl) {
        return;
    }
    wrapperEl.className += ' counter-is-visible';

    var counterDestinationLength = size.toString().length;
    var counterStartingNumber = Math.pow(10, counterDestinationLength - 1);
    var counter = new flipCounter('flip-counter', {
        value: counterStartingNumber,

        // Sizing
        bFH: 40,
        bOffset: 200,
        fW: 30,
        tFH: 20,
    });
    counter.incrementTo(size, 1.6, 120);
    var el = document.querySelector('#flip-counter');
    el.style.width = counterDestinationLength * 30 + Math.floor((counterDestinationLength - 1) / 3) * 7 + 'px';
}

fetchActionKitCount();
// shuffleLogos();

$(function() {
    FastClick.attach(document.body);
});



})(); // End closure
