function SimpleTransfer(options) {
    options = Object.assign({
        from: null,
        to: null,
        clone: true,
        transition: '1.8s all ease',
        opacity: .45,
        transferClass: 'transfer-element',
        transferCss: {},
        start: null,
        end: null,
    }, options || {})

    var from = options.from;
    var to = options.to;

    if (typeof from === 'string') {
        from = document.querySelector(from);
    }

    if (typeof to === 'string') {
        to = document.querySelector(to);
    }

    if (!(from instanceof HTMLElement) || !(to instanceof HTMLElement)) {
        return;
    }

    var
        body = document.body,
        offset = function (element) {
            if (!element.getClientRects().length) {
                return {top: 0, left: 0};
            }

            var rect = element.getBoundingClientRect();
            var win = element.ownerDocument.defaultView;

            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },
        getTransitionEndEventName = function () {
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd',
            };
            for (var transition in transitions) {
                if (typeof from.style[transition] !== 'undefined') {
                    return transitions[transition];
                }
            }

            return '';
        },
        createTransfer = function () {
            var
                clone = typeof options.clone === 'boolean' ? options.clone : true,
                transfer;

            if (clone === true) {
                transfer = from.cloneNode(true);
                transfer.removeAttribute('id');
            } else {
                transfer = document.createElement('div');
            }

            transfer.setAttribute('class', options.transferClass);
            transfer.style.transition = options.transition;
            transfer.style.position = toFixed ? 'fixed' : 'absolute';
            transfer.style.top = (startPosition.top - fixTop) + 'px';
            transfer.style.left = (startPosition.left - fixLeft) + 'px';
            transfer.style.width = fromRect.width + 'px';
            transfer.style.height = fromRect.height + 'px';

            if (typeof options.transferCss === 'object') {
                for (var css in options.transferCss) {
                    transfer.style[css] = options.transferCss[css];
                }
            }

            if (typeof options.start === 'function') {
                options.start.call(transfer);
            }

            return transfer;
        },
        endEvent = getTransitionEndEventName(),
        toFixed = to.style.position === 'fixed',
        fixTop = toFixed ? body.scrollTop : 0,
        fixLeft = toFixed ? body.scrollLeft : 0,
        startPosition = offset(from),
        endPosition = offset(to),
        fromRect = from.getBoundingClientRect(),
        toRect = to.getBoundingClientRect(),
        transfer = createTransfer();
    body.appendChild(transfer);

    if (endEvent.length) {

        var endCallBack = function () {
            transfer.removeEventListener(endEvent, endCallBack);
            body.removeChild(transfer);

            if (typeof options.end === 'function') {
                options.end.call(window);
            }
        };

        transfer.addEventListener(endEvent, endCallBack);
    } else {
        // Fallback
        setTimeout(function () {
            body.removeChild(transfer);

            if (typeof options.end === 'function') {
                options.end.call(window);
            }
        }, 1500);
    }

    setTimeout(function () {
        transfer.style.top = (endPosition.top - fixTop) + 'px';
        transfer.style.left = (endPosition.left - fixLeft) + 'px';
        transfer.style.width = toRect.width + 'px';
        transfer.style.height = toRect.height + 'px';
        transfer.style.opacity = options.opacity;
    }, 100);
}