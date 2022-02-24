// @ts-nocheck

import __SPromise from '@coffeekraken/s-promise';
import __isInViewport from '../is/inViewport';
import __whenInViewport from './whenInViewport';
import __whenOutOfViewport from './whenOutOfViewport';

/**
 * @name      inViewportStatusChange
 * @namespace            js.dom.detect
 * @type      Function
 * @async
 * @platform          js
 * @status        beta
 *
 * Monitor when the passed element enter or exit the viewport
 *
 * @param 		{HTMLElement} 						elm  		The element to monitor
 * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
 *
 * @event       enter               Dispatched when the passed element enters the viewport
 * @event       leave               Dispatched when the passed element leave the viewport
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
 * inViewportStatusChange(myElm).on('enter', $elm => {
 *    // do something...
 * }).on('exit', $elm => {
 *    // do something...
 * });
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IInViewportStatusChangeSettings {
    offset: string;
}

function inViewportStatusChange(
    $elm,
    settings?: Partial<IInViewportStatusChangeSettings>,
) {
    let status = 'out',
        observer,
        isInViewport = false;

    settings = {
        offset: '10px',
        ...(settings ?? {}),
    };

    return new __SPromise(
        ({ emit }) => {
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
                    threshold: [
                        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
                    ],
                },
            );

            observer.observe($elm);
        },
        {
            id: 'inViewportStatisChange',
        },
    ).on('cancel', () => {
        observer.disconnect?.();
    });
}
export default inViewportStatusChange;
