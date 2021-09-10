// @ts-nocheck
import __uniqid from '../../shared/string/uniqid';
/**
 * @name            injectStyle
 * @namespace            js.css
 * @type            Function
 * @platform          js
 * @platform          ts
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
 * import injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
 * injectStyle('a { color: red; }');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function injectStyle(style, id = `injected-style-${__uniqid()}`, node = document.head) {
    const $tag = document.createElement('style');
    $tag.type = 'text/css';
    $tag.setAttribute('id', `injected-style-${id.toLowerCase()}`);
    $tag.innerHTML = style;
    node.appendChild($tag);
    return $tag;
}
export default injectStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0U3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmplY3RTdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxRQUFRLE1BQU0sNEJBQTRCLENBQUM7QUFFbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxXQUFXLENBQUMsS0FBYSxFQUFFLEtBQWEsa0JBQWtCLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJO0lBQ2pHLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==