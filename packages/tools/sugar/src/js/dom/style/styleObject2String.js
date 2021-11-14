// @ts-nocheck
import __uncamelize from '../../shared/string/uncamelize';
/**
 * @name      styleObject2String
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @status        beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVPYmplY3QyU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3R5bGVPYmplY3QyU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxnQ0FBZ0MsQ0FBQztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGtCQUFrQixDQUFDLFFBQWE7SUFDckMsMkJBQTJCO0lBQzNCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUMzQixLQUFLLE1BQU0sR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUN4QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNyQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUFNO1lBQ0gsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO0tBQ0o7SUFDRCxzQkFBc0I7SUFDdEIsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFDRCxlQUFlLGtCQUFrQixDQUFDIn0=