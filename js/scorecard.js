// Check for outdated browsers
var isIE = navigator.userAgent.match(/MSIE (\d+)\./);
if (isIE) {
    var version = +isIE[1];
    if (version < 9) {
        alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
}

if (navigator.userAgent.match(/Android 2\.3/)) {
    alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
}

$(function() {
    // Fix potential click delay on mobile devices
    FastClick.attach(document.body);

    $('.candidates').on('click', '.candidate', function(e) {
        $(this).toggleClass('opened');
    });

    $('.candidates').on('click', '.dropdown', function(e) {
        e.stopPropagation();
    });

    $('.candidates').on('click', '.principle', function(e) {
        $(this).toggleClass('opened');
    });

    $('.candidates').on('click', '.bullet', function(e) {
        e.stopPropagation();
    });
});
