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
});

$(document).on('ready', function() {
    window.thumbnailsReplaced = 0;
    window.$thumbnails = $('.thumbnail > img');
    window.thumbnailsLength = $thumbnails.length;
});
function imagesReplacedHandler(images) {
    $(images).each(function() {
        if ($.inArray(this, $thumbnails) === -1) {
            return;
        }
        $(this).on('load', function() {
            thumbnailsReplaced++;
            if (thumbnailsReplaced < thumbnailsLength) {
                return;
            }
            var maxHeight = 0;
            $thumbnails.each(function() {
                $thumbnail = $(this);
                var height = $thumbnail.parent().height();
                if (maxHeight < height) {
                    maxHeight = height;
                }
            });
            $thumbnails.each(function() {
                $(this).parent().height(maxHeight);
            });
        });
    });
}

new Imager('div.img-xs', {
    availableWidths: {
        375: 'xs'
    },
    availablePixelRatios: [1, 2],
    className: 'img-xs-replace',
    onImagesReplaced: imagesReplacedHandler
});
new Imager('div.img-sm', {
    availableWidths: {
        375: 'xs',
        720: 'sm'
    },
    availablePixelRatios: [1, 2],
    className: 'img-sm-replace',
    onImagesReplaced: imagesReplacedHandler
});
new Imager('div.img-md', {
    availableWidths: {
        375: 'xs',
        720: 'sm',
        940: 'md'
    },
    availablePixelRatios: [1, 2],
    className: 'img-md-replace',
    onImagesReplaced: imagesReplacedHandler
});
new Imager('div.img-lg', {
    availableWidths: {
        375: 'xs',
        720: 'sm',
        940: 'md',
        1140: 'lg'
    },
    availablePixelRatios: [1, 2],
    className: 'img-lg-replace',
    onImagesReplaced: imagesReplacedHandler
});