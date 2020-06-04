function SimpleTransfer(options) {
    options = options || {};
    var from = options.from || null;
    var to = options.to || null;

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
            var transfer = from.cloneNode(true);
            transfer.removeAttribute('id');
            transfer.setAttribute('class', options.transferClass || 'temp-transfer-element');
            transfer.style.transition = options.transition || '1.8s all ease';
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

            if (typeof options.callBack === 'function') {
                options.callBack.call(window, from, to);
            }
        };

        transfer.addEventListener(endEvent, endCallBack);
    } else {
        // Fallback
        setTimeout(function () {
            body.removeChild(transfer);

            if (typeof options.callBack === 'function') {
                options.callBack.call(window, from, to);
            }
        }, 1500);
    }

    setTimeout(function () {
        transfer.style.top = (endPosition.top - fixTop) + 'px';
        transfer.style.left = (endPosition.left - fixLeft) + 'px';
        transfer.style.width = toRect.width + 'px';
        transfer.style.height = toRect.height + 'px';
        transfer.style.opacity = options.opacity || .45;
    }, 100);
}