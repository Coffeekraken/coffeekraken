/**
 * @name            adoptStyleInShadowRoot
 * @namespace       js.css
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function allows you to make a shadowRoot element adopt his host context styles
 *
 * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
 * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
 * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
 *
 * @snippet         __adoptStyleInShadowRoot($1);
 *
 * @todo        tests
 *
 * @example         js
 * import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';
 * const myShadowRoot = $myElement.shadowRoot;
 * await __adoptStyleInShadowRoot(myShadowRoot);
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default async function __adoptStyleInShadowRoot(
    $shadowRoot: HTMLElement,
    $context: HTMLElement | typeof document = document,
): Promise<any> {
    const $links = $context.querySelectorAll('link[rel="stylesheet"]');
    if ($links && $shadowRoot) {
        Array.from($links).forEach(async ($link) => {
            $shadowRoot?.appendChild($link.cloneNode());
        });
    }
    return true;
}
