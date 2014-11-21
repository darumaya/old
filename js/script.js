$(window).on('load', function() {
    $('.carousel-outer-indicators').each(function() {
        var $indicators = $(this);
        var target = $indicators.find('[data-target]').eq(0).attr('data-target');

        $(target).on('slide.bs.carousel', function (event) {
            var $item = $(event.relatedTarget);
            var $items = $item.parent().children('.item');
            var index = $items.index($item);
            $indicators.find('.active').removeClass('active');
            var $nextIndicator = $indicators.children().eq(index);
            $nextIndicator && $nextIndicator.addClass('active');
        });
    });
});
