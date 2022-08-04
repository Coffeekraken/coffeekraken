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
export default appendStyleTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsY0FBYyxDQUNuQixHQUFVLEVBQ1YsVUFBdUIsUUFBUSxDQUFDLElBQUk7SUFDaEMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUNuQixzQ0FBc0M7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ25DO1NBQU07UUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUNELE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=