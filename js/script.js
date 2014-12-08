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

function isBreakpoint(alias) {
    return $('.device-' + alias).is(':visible');
}

var waitForFinalEvent = (function() {
    var timer = 0;
    return function(callback, duration) {
        timer && clearTimeout(timer);
        timer = setTimeout(callback, duration);
    }
})();

function getDevice() {
    return isBreakpoint('xs') ? 'xs'
        : isBreakpoint('sm') ? 'sm'
        : isBreakpoint('md') ? 'md'
        : isBreakpoint('lg') ? 'lg' : '';
}

var device = getDevice();

$(window).resize(function() {
    waitForFinalEvent(function() {
        var newDevice = getDevice();
        if (device === newDevice) {
            return;
        }
        device = newDevice;
        if (device) {
            $(document).trigger({
                type: 'breakpoint',
                device: device
            });
        }
    }, 300);
});

$('.fb-like-box').attr('data-width', getFbLikeBoxWidth());

function getFbLikeBoxWidth () {
    switch (device) {
        case 'sm':
            return 220;
        case 'md':
            return 293;
        case 'lg':
            return 360;
    }
}

$(document).on('breakpoint', function(event) {
    var width = getFbLikeBoxWidth();
    $('.fb-like-box').attr('data-width', width);
    $('.fb-like-box > span, .fb-like-box > span > iframe').css('width', width);
});

(function() {
    var CHO_ON = /(ー)/g;
    var KOGAKI = /(ぁ|ぃ|ぅ|ぇ|ぉ|ゃ|ゅ|ょ|っ|ャ|ュ|ョ|ッ)/g;
    var KUTOUTEN = /(、|。)/g;
    $('.banner-vertical-label > .hidden-xs').each(function() {
        var $this = $(this);
        var text = $this.text();
        var html = text;
        html = html.replace(CHO_ON, '<span class="cho-on">$1</span>');
        html = html.replace(KOGAKI, '<span class="kogaki">$1</span>');
        html = html.replace(KUTOUTEN, '<span class="kutouten">$1</span>');
        if (text !== html) {
            $this.html(html);
        }
    });
})();