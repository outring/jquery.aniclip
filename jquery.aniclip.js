(function ($, undefined) {

    var autoString = 'auto';

    function parseClipString(clipString) {
        return clipString.match(/(\d+\w+|auto)/g);
    }

    function sanitizeClipParts(clipParts) {
        for (var i = 0; i < 4; i++) {
            var partNumber = parseInt(clipParts[i]);
            clipParts[i] = isNaN(partNumber) ? clipParts[i] : partNumber;
        }
        return clipParts;
    }

    function styleToParts(element) {
        var clipString = $.css(element, 'clip');
        var clipParts;

        if (!clipString) {
            clipParts = [$.css(element, 'clipTop'), $.css(element, 'clipRight'), $.css(element, 'clipBottom'), $.css(element, 'clipLeft')];
        }
        else if (clipString === autoString) {
            clipParts = [autoString, autoString, autoString, autoString];
        }
        else {
            clipParts = parseClipString(clipString);
        }

        return sanitizeClipParts(clipParts);
    }

    function stringToParts(clipString) {
        var clipParts = parseClipString(clipString);
        return sanitizeClipParts(clipParts);
    }

    $.fx.step['clip'] = function (fx) {
        if (fx.pos === 0 && typeof fx.start !== 'object' && typeof fx.end !== 'object') {
            fx.start = styleToParts(fx.elem);
            fx.end = stringToParts(fx.end);
        }

        var clipParts = [];

        for (var i = 0; i < 4; i++) {
            var startValue = fx.start[i];
            var endValue = fx.end[i];

            if (startValue === autoString || endValue === autoString) {
                clipParts.push(autoString);
                continue;
            }

            clipParts.push(startValue + (endValue - startValue) * fx.pos + 'px');
        }

        fx.elem.style.clip = 'rect(' + clipParts.join(' ') + ')';
    };

})(jQuery);