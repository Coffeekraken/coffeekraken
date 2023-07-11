// @ts-nocheck
import __uncamelize from '../../../shared/string/uncamelize.js';
/**
 * @name      styleObject2String
 * @namespace            js.css.transform
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
 * @snippet         __styleObjectToString($1)
 *
 * @example 	js
 * import { __styleObjectToString } from '@coffeekraken/sugar/css'
 * const styleString =  __styleObjectToString({
 * 		paddingLeft : '20px',
 * 		display : 'block'
 * });
 * // output => padding-left:20px; display:block;
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __styleObjectToString(styleObj) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSxzQ0FBc0MsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUscUJBQXFCLENBQUMsUUFBYTtJQUN2RCwyQkFBMkI7SUFDM0IsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLEtBQUssTUFBTSxHQUFHLElBQUksUUFBUSxFQUFFO1FBQ3hCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixxQkFBcUI7UUFDckIsa0NBQWtDO1FBQ2xDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1lBQ3JDLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hCO2FBQU07WUFDSCxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDMUQ7S0FDSjtJQUNELHNCQUFzQjtJQUN0QixPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQyJ9