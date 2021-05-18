// @ts-nocheck
/**
 * @name        appendStyleTag
 * @namespace            js.dom
 * @type      Function
 * @stable
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
function appendStyleTag(css, $parent = document.head || document.getElementsByTagName('head')[0]) {
    const $style = document.createElement('style');
    if ($style.styleSheet) {
        // This is required for IE8 and below.
        $style.styleSheet.cssText = css;
    }
    else {
        $style.appendChild(document.createTextNode(css));
    }
    $parent.appendChild($style);
}
export default appendStyleTag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVUYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTdHlsZVRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsY0FBYyxDQUNyQixHQUFHLEVBQ0gsT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUNyQixzQ0FBc0M7UUFDdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0tBQ2pDO1NBQU07UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNsRDtJQUNELE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUNELGVBQWUsY0FBYyxDQUFDIn0=