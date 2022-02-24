// @ts-nocheck
import __camelize from '../../shared/string/camelize';
import __autoCast from '../../shared/string/autoCast';
/**
 * @name      styleString2Object
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
 *
 * Transform a style string to an object representation
 *
 * @param 		{String} 				style 			The style string
 * @return 		(Object) 								The string object representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import styleString2Object from '@coffeekraken/sugar/js/dom/styleString2Object'
 * const styleString = styleString2Object('padding-left:20px; display:block;');
 * // output => {
 * //		paddingLeft : '20px',
 * // 		display : 'block'
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function styleString2Object(style) {
    if (!style || style === '')
        return {};
    const obj = {};
    const split = style.replace(/\s/g, '').split(';');
    split.forEach((statement) => {
        // split statement by key value pairs
        const spl = statement.split(':'), key = __camelize(spl[0]), value = spl[1];
        // add element into object
        obj[key] = __autoCast(value);
    });
    // return the style object
    return obj;
}
export default styleString2Object;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVTdHJpbmcyT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVTdHJpbmcyT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLEtBQWE7SUFDckMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssRUFBRTtRQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNmLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDeEIscUNBQXFDO1FBQ3JDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzVCLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3hCLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSCwwQkFBMEI7SUFDMUIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxrQkFBa0IsQ0FBQyJ9