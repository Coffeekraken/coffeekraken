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
 * @platform          ts
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface IInViewportStatusChangeSettings {
    offset: number;
}

function inViewportStatusChange(
    $elm,
    settings?: Partial<IInViewportStatusChangeSettings>,
) {
    let isFinished = false;

    settings = {
        offset: 10,
        ...(settings ?? {}),
    };

    return new __SPromise(
        async ({ emit }) => {
            function _whenIn() {
                if (isFinished) return;
                __whenInViewport($elm, settings).then(() => {
                    emit('enter', $elm);
                    _whenOut();
                });
            }
            function _whenOut() {
                if (isFinished) return;
                __whenOutOfViewport($elm, settings).then(() => {
                    emit('leave', $elm);
                    _whenIn();
                });
            }

            if (await __isInViewport($elm, settings)) {
                emit('enter', $elm);
                _whenOut();
            } else {
                emit('leave', $elm);
                _whenIn();
            }
        },
        {
            id: 'inViewportStatisChange',
        },
    ).on('finally', () => {
        isFinished = true;
    });
}
export default inViewportStatusChange;
