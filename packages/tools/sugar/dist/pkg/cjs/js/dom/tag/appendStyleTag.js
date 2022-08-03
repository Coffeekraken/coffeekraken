"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function appendStyleTag(css, $parent = document.head ||
    document.getElementsByTagName('head')[0]) {
    const $style = document.createElement('style');
    if ($style.styleSheet) {
        // This is required for IE8 and below.
        $style.styleSheet.cssText = css;
    }
    else {
        $style.appendChild(document.createTextNode(css));
    }
    $parent.appendChild($style);
    return $style;
}
exports.default = appendStyleTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxjQUFjLENBQ25CLEdBQVUsRUFDVixVQUF1QixRQUFRLENBQUMsSUFBSTtJQUNoQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQ25CLHNDQUFzQztRQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7S0FDbkM7U0FBTTtRQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=