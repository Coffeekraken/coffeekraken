// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';

/**
 * @name      inViewportStatusChange
 * @namespace            js.dom.detect
 * @type      Function
 * @platform          js
 * @status        beta
 * @async
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						$elm  		The element to monitor
 * @param       {Partial<IInViewportStatusChangeSettings>}      [$settings={}]      Some settings to configure your detector
 * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks.
 *
 * @setting         {String}        [offset='10px']             An offset to detect the in/out earlier or later
 *
 * @event       enter               Dispatched when the passed element enters the viewport
 * @event       leave               Dispatched when the passed element leave the viewport
 *
 * @snippet         __inViewportStatusChange($1)
 * __inViewportStatusChange($1).on('enter', \$elm => {
 *      $2
 * }).on('leave', \$elm => {
 *      $3
 * });
 *
 * @todo      tests
 *
 * @example  	js
 * import { __inViewportStatusChange } from '@coffeekraken/sugar/dom';
 * __inViewportStatusChange(myElm).on('enter', $elm => {
 *    // do something...
 * }).on('enter', $elm => {
 *    // do something...
 * }).on('leave', $elm => {
 *    // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IInViewportStatusChangeSettings {
    offset: string;
}

export default function __inViewportStatusChange(
    $elm: HTMLElement,
    settings?: Partial<IInViewportStatusChangeSettings>,
): __SPromise {
    let status = 'out',
        observer,
        isInViewport = false;

    settings = {
        offset: '10px',
        ...(settings ?? {}),
    };

    return new __SPromise(({ emit }) => {
        const _cb = () => {
            if (!isInViewport && status === 'in') {
                status = 'out';
                emit('leave', $elm);
            } else if (isInViewport && status === 'out') {
                status = 'in';
                emit('enter', $elm);
            }
        };

        observer = new IntersectionObserver(
            (entries, observer) => {
                if (!entries.length) return;
                const entry = entries[0];
                if (entry.intersectionRatio > 0) {
                    isInViewport = true;
                } else {
                    isInViewport = false;
                }
                _cb();
            },
            {
                root: null, // viewport
                rootMargin: settings.offset,
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            },
        );

        observer.observe($elm);
    }).on('cancel', () => {
        observer.disconnect?.();
    });
}
