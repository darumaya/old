$(window).on('load', function() {
    $('.carousel-outer-indicators').each(function() {
        var $indicators = $(this);
        var target = $indicators.find('[data-target]').eq(0).attr('data-target');

        $(target).on('slide.bs.carousel', function (event) {
            var $item = $(event.relatedTarget);
            var $items = $item.parent().children('.item');
            var index = $items.index($item);
            $indicators.find('.active').removeClass('active');
            var $nextIndicator = $indicators.find('[data-target]').eq(index).parent('li');
            $nextIndicator && $nextIndicator.addClass('active');
        });
    });

    $('.thumbnail').each(function() {
        var $thumbnail = $(this);
        if ($thumbnail.hasClass('equal-height')) {
            return;
        }
        var $section = $thumbnail.parentsUntil('section').last();
        var maxHeight = 0;
        $section.find('.thumbnail').each(function() {
            var height = $(this).height();
            if (maxHeight < height) {
                maxHeight = height;
            }
        });
        $section.find('.thumbnail').each(function() {
            $(this).height(maxHeight).addClass('equal-height');
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