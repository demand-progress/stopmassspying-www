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
