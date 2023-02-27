// @ts-nocheck
import { __uniqid } from '@coffeekraken/sugar/string';

/**
 * @name        clearTransmations
 * @namespace            js.dom.transmation
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * This function allows you to clear all the animations and transitions inside a particular dom element.
 * You can specify a timeout if you want to clear them only for a limited amount of time.
 *
 * @param    {HTMLElement}      $elm        The dom element to clear the animations/transitions from
 * @param       {IClearTransmationsSettings}    [settings={}]    The settings to use
 * @return      {Function}              A function to reset the styles
 *
 * @setting         {Number}        [timeout=0]    The timeout in ms to wait before removing the animations/transitions clearing
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __clearTransmations($1)
 *
 * @example    js
 * import { __clearTransmations } from '@coffeekraken/sugar/dom'
 *  __clearTransmations($myElement, {
 *  timeout: 1000
 * });
 * const reset =  __clearTransmations($myElement);
 * setTimeout(() => reset(), 2000);
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IClearTransmationsSettings {
    timeout: number;
}

export default function __clearTransmations(
    $elm: HTMLElement = document.body,
    settings?: Partial<IClearTransmationsSettings>,
): HTMLStyleElement {
    const cls = `s-clear-transmations-${__uniqid()}`;
    $elm.classList.add(cls);

    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild($tag);

    function reset() {
        $elm.classList.remove(cls);
        $tag.remove();
    }

    if (settings?.timeout) {
        setTimeout(() => {
            reset();
        }, settings.timeout);
    }

    return reset;
}
