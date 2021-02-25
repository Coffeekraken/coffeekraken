// @ts-nocheck
import __uncamelize from '../string/uncamelize';
/**
 * @name      styleObject2String
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Transform a style object to inline string separated by ;
 *
 * @param 		{Object} 				styleObj 		An object of style to apply
 * @return 		(String) 								The string style representation
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example 	js
 * import styleObject2String from '@coffeekraken/sugar/js/dom/styleObject2String'
 * const styleString = styleObject2String({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function styleObject2String(styleObj) {
    // process the style object
    const propertiesArray = [];
    for (const key in styleObj) {
        const value = styleObj[key];
        // if the value is ''
        // mean that we need to get rid of
        if (value === undefined || value === '') {
            delete styleObj[key];
        }
        else {
            propertiesArray.push(`${__uncamelize(key)}:${value};`);
        }
    }
    // return the css text
    return propertiesArray.join(' ');
}
export default styleObject2String;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVPYmplY3QyU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVPYmplY3QyU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxzQkFBc0IsQ0FBQztBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsa0JBQWtCLENBQUMsUUFBUTtJQUNsQywyQkFBMkI7SUFDM0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixxQkFBcUI7UUFDckIsa0NBQWtDO1FBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO2FBQU07WUFDTCxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDeEQ7S0FDRjtJQUNELHNCQUFzQjtJQUN0QixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUNELGVBQWUsa0JBQWtCLENBQUMifQ==