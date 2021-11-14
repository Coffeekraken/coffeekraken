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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwZW5kU3R5bGVUYWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBlbmRTdHlsZVRhZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxTQUFTLGNBQWMsQ0FDbkIsR0FBVSxFQUNWLFVBQXVCLFFBQVEsQ0FBQyxJQUFJO0lBQ2hDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMvQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDbkIsc0NBQXNDO1FBQ3RDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztLQUNuQztTQUFNO1FBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDcEQ7SUFDRCxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9