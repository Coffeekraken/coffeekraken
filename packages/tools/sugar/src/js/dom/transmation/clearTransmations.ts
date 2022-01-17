// @ts-nocheck
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';

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
 * @return      {HTMLStyleElement}              The style element that clear all the transitions and animations down bellow
 * 
 * @setting         {Number}        [timeout=0]    The timeout in ms to wait before removing the animations/transitions clearing
 * 
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import clearTransmations from '@coffeekraken/sugar/js/dom/clearTransmations'
 * clearTransmations($myElement, {
 *  timeout: 1000
 * });
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IClearTransmationsSettings {
    timeout: number;
}

export default function clearTransmations(
    $elm: HTMLElement,
    settings?: Partial<IClearTransmationsSettings>
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

    if (settings?.timeout) {
        setTimeout(() => {
            $elm.classList.remove(cls);
            $tag.remove();
        }, settings.timeout);
    }

    return $tag;
}