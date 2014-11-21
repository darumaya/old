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
new Imager('div.img-xs', {
    availableWidths: {
        375: 'xs'
    },
    availablePixelRatios: [1, 2],
    className: 'img-xs-replace'
});
new Imager('div.img-sm', {
    availableWidths: {
        375: 'xs',
        720: 'sm'
    },
    availablePixelRatios: [1, 2],
    className: 'img-sm-replace'
});
new Imager('div.img-md', {
    availableWidths: {
        375: 'xs',
        720: 'sm',
        940: 'md'
    },
    availablePixelRatios: [1, 2],
    className: 'img-md-replace'
});
new Imager('div.img-lg', {
    availableWidths: {
        375: 'xs',
        720: 'sm',
        940: 'md',
        1140: 'lg'
    },
    availablePixelRatios: [1, 2],
    className: 'img-lg-replace'
});