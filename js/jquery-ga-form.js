;(function($) {
    $.fn.gaForm = function(options) {
        var defaults = {
            timeout: 250,
            permitSameOrigin: false,
            debug: false
        };
        options = $.extend(true, {}, defaults, options);
        return this.filter(function() {
            var link = this;
            var linkOrigin = link.origin ? link.origin : getOrigin(link);
            var locationOrigin = location.origin ? location.origin : getOrigin(location);
            var tag = link.tagName.toLowerCase();
            if (!options.permitSameOrigin && linkOrigin === locationOrigin) {
                return false;
            }
            if (tag !== 'form') {
                return false;
            }
            var isSubmitted = false;
            $(link).on('submit', function (event) {
                if (isSubmitted) {
                    return;
                }
                isSubmitted = true;
                var elem = this;
                var $elem = $(elem);
                event.preventDefault();
                if (options.debug) {
                    if (window.console && console.time) {
                        console.time('jquery-ga-outbound');
                    }
                }
                var timer = setTimeout(function() {
                    if (options.debug) {
                        if (window.console && console.timeEnd) {
                            console.timeEnd('jquery-ga-outbound');
                        }
                        if (window.console && console.log) {
                            console.log('fired set timeout callback.');
                        } else {
                            alert('fired set timeout callback.');
                        }
                    }
                    elem.submit();
                }, options.timeout);
                ga('send', {
                    hitType: 'event',
                    eventCategory: $elem.attr('data-category'),
                    eventAction: $elem.attr('data-action'),
                    eventLabel: location.href,
                    hitCallback: function() {
                        clearTimeout(timer);
                        if (options.debug) {
                            if (window.console && console.timeEnd) {
                                console.timeEnd('jquery-ga-outbound');
                            }
                            if (window.console && console.log) {
                                console.log('fired ga hit callback.');
                            } else {
                                alert('fired set timeout callback.');
                            }
                        }
                        elem.submit();
                    }
                });
            });

            function getOrigin(loc) {
                var port = loc.port;
                if ((loc.protocol === 'http:' && port === '80')
                    || (loc.protocol === 'https:' && loc.port === '443')) {
                    port = '';
                }
                if (port) {
                    port = ':' + port;
                }
                return loc.protocol + '//' + loc.hostname + port;
            }
        });
    };
})(jQuery);
