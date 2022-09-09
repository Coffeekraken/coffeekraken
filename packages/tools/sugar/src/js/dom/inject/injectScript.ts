// @ts-nocheck

import { __whenScriptLoaded } from '@coffeekraken/sugar/dom';

/**
 * @name        injectScript
 * @namespace            js.dom.inject
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Append a script tag either to the head or the body
 *
 * @param    {String}    src    The script src to load
 * @return    {Promise}    A promise resolved with the script tag when it has fully loaded
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import { __injectScript } from '@coffeekraken/sugar/dom'
 *  __injectScript('dist/js/app.js')
 *
 * @since     1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __injectScript(
    src: string,
    $parent: HTMLElement = document.body,
): Promise<HTMLScriptElement> {
    const $script = document.createElement('script');
    $script.src = src;
    $parent.appendChild($script);
    return __whenScriptLoaded($script);
}
