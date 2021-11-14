// @ts-nocheck

/**
 * @name        appendStyleTag
 * @namespace            js.dom
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Append a style tag either to the head or the body
 *
 * @param    {String}    css    The style css to append
 * @param       {HTMLElement}       [$parent=document.head]            The parent in which you want to append the style tag
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import appendStyleTag from '@coffeekraken/sugar/js/dom/appendStyleTag'
 * appendStyleTag('dist/js/app.js')
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function appendStyleTag(
    css: sting,
    $parent: HTMLElement = document.head ||
        document.getElementsByTagName('head')[0],
): HTMLStyleElement {
    const $style = document.createElement('style');
    if ($style.styleSheet) {
        // This is required for IE8 and below.
        $style.styleSheet.cssText = css;
    } else {
        $style.appendChild(document.createTextNode(css));
    }
    $parent.appendChild($style);
    return $style;
}
export default appendStyleTag;
