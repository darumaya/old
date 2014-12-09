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
    window.$thumbnails = $('.banner-related > img');
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

new Imager('.img-tn', {
    availableWidths: [100],
    availablePixelRatios: [1, 2],
    className: 'img-tn-replace',
    onImagesReplaced: imagesReplacedHandler
});

new Imager('.img-xs', {
    availableWidths: {
        157: 'xs',  // 750  / 12 * 3 - 30 = 157
        212: 'xs',  // 970  / 12 * 3 - 30 = 212
        220: 'xs',  // 750  / 12 * 4 - 30 = 220
        262: 'xs',  // 1170 / 12 * 3 - 30 = 262
        293: 'xs',  // 970  / 12 * 4 - 30 = 293
        345: 'xs',  // 750  / 12 * 6 - 30 = 345
        360: 'xs',  // 1170 / 12 * 4 - 30 = 360
        375: 'xs'   // iPhone 6 = 375
    },
    availablePixelRatios: [1, 2],
    className: 'img-xs-replace',
    onImagesReplaced: imagesReplacedHandler
});

new Imager('.img-sm', {
    availableWidths: {
        157: 'xs',  // 750  / 12 * 3 - 30 = 157
        212: 'xs',  // 970  / 12 * 3 - 30 = 212
        220: 'xs',  // 750  / 12 * 4 - 30 = 220
        262: 'xs',  // 1170 / 12 * 3 - 30 = 262
        293: 'xs',  // 970  / 12 * 4 - 30 = 293
        345: 'xs',  // 750  / 12 * 6 - 30 = 345
        360: 'xs',  // 1170 / 12 * 4 - 30 = 360
        375: 'xs',  // iPhone 6 = 375
        455: 'sm',  // 970 / 12 * 6 - 30 = 455
        555: 'sm',  // 1170 / 12 * 6 - 30 = 555
        720: 'sm'   // sm = 720
    },
    availablePixelRatios: [1, 2],
    className: 'img-sm-replace',
    onImagesReplaced: imagesReplacedHandler
});

new Imager('.img-md', {
    availableWidths: {
        157: 'xs',  // 750  / 12 * 3 - 30 = 157
        212: 'xs',  // 970  / 12 * 3 - 30 = 212
        220: 'xs',  // 750  / 12 * 4 - 30 = 220
        262: 'xs',  // 1170 / 12 * 3 - 30 = 262
        293: 'xs',  // 970  / 12 * 4 - 30 = 293
        345: 'xs',  // 750  / 12 * 6 - 30 = 345
        360: 'xs',  // 1170 / 12 * 4 - 30 = 360
        375: 'xs',  // iPhone 6 = 375
        455: 'sm',  // 970 / 12 * 6 - 30 = 455
        555: 'sm',  // 1170 / 12 * 6 - 30 = 555
        720: 'sm',  // sm = 720
        940: 'md'   // md = 940
    },
    availablePixelRatios: [1, 2],
    className: 'img-md-replace',
    onImagesReplaced: imagesReplacedHandler
});

new Imager('.img-lg', {
    availableWidths: {
        157: 'xs',  // 750  / 12 * 3 - 30 = 157
        212: 'xs',  // 970  / 12 * 3 - 30 = 212
        220: 'xs',  // 750  / 12 * 4 - 30 = 220
        262: 'xs',  // 1170 / 12 * 3 - 30 = 262
        293: 'xs',  // 970  / 12 * 4 - 30 = 293
        345: 'xs',  // 750  / 12 * 6 - 30 = 345
        360: 'xs',  // 1170 / 12 * 4 - 30 = 360
        375: 'xs',  // iPhone 6 = 375
        455: 'sm',  // 970 / 12 * 6 - 30 = 455
        555: 'sm',  // 1170 / 12 * 6 - 30 = 555
        720: 'sm',  // sm = 720
        940: 'md',  // md = 940
        1140: 'lg'  // lg = 1140
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