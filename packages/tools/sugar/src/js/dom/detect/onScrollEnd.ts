// @ts-nocheck

/**
 * @name            onScrollEnd
 * @namespace       js.dom.detect
 * @type            Function
 * @platform          js
 * @status        stable
 * @async
 *
 * This function simply listen for scroll on the passed element and call the passed callback
 * when reaching the end of it.
 *
 * @param       {HTMLElement}           $elm        The element to listen on
 * @param       {Function}              callback        The function to call when scroll end is detected
 * @param       {IOnScrollEndSettings}      [settings={}]       Some settings like offset, etc...
 *
 * @setting         {Number}        [offset=20]             An offset to detect earlier the end of the scroll
 * @setting         {boolean}       [once=false]            true if you want to detect the scroll end just once
 * @setting         {number}        [times=-1]              Specify a number of times to detect the scroll end
 *
 * @todo      tests
 *
 * @snippet         __onScrollEnd($1, $2);
 * __onScrollEnd($1, () => {
 *      $2
 * });
 *
 * @example         js
 * import { __onScrollEnd } from '@coffeekraken/sugar/dom';
 * __onScrollEnd($elm, () => {
 *      // do something
 * }, {
 *    offset: 50
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface IOnScrollEndSettings {
    offset: number;
    once: boolean;
    times: number;
}

export default function __onScrollEnd(
    $elm: HTMLElement,
    callback: Function,
    settings?: IOnScrollEndSettings,
): void {
    const finalSettings: IOnScrollEndSettings = {
        offset: 20,
        once: false,
        times: -1,
        ...(settings ?? {}),
    };

    let isBody = false;

    let $scrollListenedElm = $elm;
    let $scrollHeightElm = $elm;
    if ($elm === window.document.body) {
        isBody = true;
        $scrollListenedElm = document;
        $scrollHeightElm = window.document.body;
    } else if ($elm === window.document) {
        isBody = true;
        $elm = window.document.body;
        $scrollHeightElm = window.document.body;
    }

    let active = true,
        count = 0;

    const internalCallback = (e) => {
        let fullHeight, viewportHeight, scrollTop;
        if (isBody) {
            viewportHeight = window.innerHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = Math.max(
                window.document.body.scrollHeight,
                window.document.documentElement.scrollHeight,
                window.document.body.offsetHeight,
                window.document.documentElement.offsetHeight,
                window.document.body.clientHeight,
                window.document.documentElement.clientHeight,
            );
        } else {
            viewportHeight = $scrollHeightElm.offsetHeight;
            scrollTop = $scrollHeightElm.scrollTop;
            fullHeight = $scrollHeightElm.scrollHeight;
        }

        if (
            active &&
            scrollTop + viewportHeight >= fullHeight - finalSettings.offset
        ) {
            callback();
            count++;
            if (finalSettings.once) {
                $scrollListenedElm.removeEventListener(
                    'scroll',
                    internalCallback,
                );
                active = false;
            } else if (
                finalSettings.times > 0 &&
                count >= finalSettings.times
            ) {
                $scrollListenedElm.removeEventListener(
                    'scroll',
                    internalCallback,
                );
                active = false;
            }
        } else if (
            $scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop <
            $scrollHeightElm.scrollHeight - finalSettings.offset
        ) {
            active = true;
        }
    };

    $scrollListenedElm.addEventListener('scroll', internalCallback);
}
