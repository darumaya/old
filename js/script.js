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

(function() {
    window.thumbnailsReplaced = 0;
    window.$thumbnails = $('.banner-related > img');
    window.thumbnailsLength = $thumbnails.length;
})();

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
    availableWidths: {
        60: 100,
        75: 100,
        100: 100
    },
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

new Imager('.img-jt', {
    availableWidths: {
        157: 'i6',  // 750  / 12 * 3 - 30 = 157
        212: 'i6',  // 970  / 12 * 3 - 30 = 212
        220: 'i6',  // 750  / 12 * 4 - 30 = 220
        262: 'i6',  // 1170 / 12 * 3 - 30 = 262
        293: 'i6',  // 970  / 12 * 4 - 30 = 293
        345: 'i6',  // 750  / 12 * 6 - 30 = 345
        360: 'i6',  // 1170 / 12 * 4 - 30 = 360
        375: 'i6',  // iPhone 6 = 375
        455: 'xs',  // 970 / 12 * 6 - 30 = 455
        555: 'xs',  // 1170 / 12 * 6 - 30 = 555
        720: 'xs',  // sm = 720
        940: 'xs'   // md = 940
    },
    availablePixelRatios: [1, 2],
    className: 'img-jt-replace',
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

$(document).on('click', '*[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(event.currentTarget).ekkoLightbox();
});

$(document).on('click', '.img-lightbox', function(event) {
    var $target = $(event.currentTarget);
    $target.ekkoLightbox({
        remote: $target.attr('src').replace(/\-(xs|sm)/, '-md')
    });
});

$('#btnMap').on('click', function() {
    launchMap('だるまや京染本店', 35.33159, 139.348566, '神奈川県 平塚市 明石町 5-7');
});

function launchMap(place, lat, lng, addr) {
    place = encodeURIComponent(place);
    addr = encodeURIComponent(addr);
    var URL_GOOGLE = 'comgooglemaps://?q=' + place + '&center=' + lat + ',' + lng;
    var URL_APPLE = 'http://maps.apple.com/?q=' + addr + '&ll=' + lat + ',' + lng;
    var URL_WEB = 'https://maps.google.co.jp/maps?q=' + place + '&center=' + lat + ',' + lng;
    var isIos = navigator.userAgent.search(/(iPad|iPhone|iPod)/i) !== -1;
    var isAndroid = navigator.userAgent.search(/Android/i) !== -1;
    if (isIos) {
        var iframe = document.createElement('iframe');
        iframe.src = URL_GOOGLE;
        document.body.appendChild(iframe);
        var time = (new Date()).getTime();
        setTimeout(function() {
            var now = (new Date()).getTime();
            document.body.removeChild(iframe);
            if ((now - time) > 400) {
                return;
            }
            document.location = URL_APPLE;
        }, 300);
        return;
    }
    if (isAndroid) {
        location.href = URL_GOOGLE;
        return;
    }
    open(URL_WEB);
};

$('form').gaForm();