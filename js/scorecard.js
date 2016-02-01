$(function() {
    $('.candidates').on('click', '.candidate', function(e) {
        var isOpened = !$(this).hasClass('opened');
        var message = isOpened ? 'Read less' : 'Read more';

        $(this).toggleClass('opened');
        $(this).find('.read-more').text(message);
    });

    $('.candidates').on('click', '.dropdown', function(e) {
        e.stopPropagation();
    });

    // $('.candidates').on('click', '.subject', function(e) {
    //     e.stopPropagation();
    //
    //     console.log($(this));
    // });
});
