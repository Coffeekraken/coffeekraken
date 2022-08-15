// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';

/**
 * @name            injectStyle
 * @namespace            js.css
 * @type            Function
 * @platform          js
 * @status              beta
 *
 * Inject a passed style string in the DOM
 *
 * @param         {String}          style         The style to inject in DOM
 * @param         {HTMLElement}     [node=document.head]    The node in which to inject the new style tag
 * @return                          {HTMLStyleElement}      The injected HTMLStyleElement node
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function injectStyle(
    style: string,
    id: string = `injected-style-${__uniqid()}`,
    node,
) {
    if (document.querySelector(`#${id}`)) return;
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', `injected-style-${id.toLowerCase()}`);
    $tag.innerHTML = style;

    if (node) {
        node.appendChild($tag);
    } else {
        const $firstLink = document.querySelector(
            'head link[rel="stylesheet"]',
        );
        if ($firstLink) {
            $firstLink.parentElement?.insertBefore($tag, $firstLink);
        } else {
            document.head.appendChild($tag);
        }
    }
    return $tag;
}
export default injectStyle;
