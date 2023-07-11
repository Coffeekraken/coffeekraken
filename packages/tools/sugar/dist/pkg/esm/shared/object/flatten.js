// @ts-nocheck
import __isPlain from '../is/isPlainObject.js';
/**
 * @name                              flatten
 * @namespace            shared.object
 * @type                              Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Transform the passed multiple level object into a single level one
 *
 * @param               {Object}                          object                    The object to flatten
 * @param               {Object}                          [settings={}]             An object of settings to configure your flatten process
 * @return              {Object}                                                    The flatten object
 *
 * @setting               {String}            [separation="."]          The separation character to use for preperty names
 * @setting 							{Boolean}			    	[array=false] 		Specify if you want to flatten array or not
 * @setting               {Boolean}          [quoteSeparatedProperties=true]      Specify if you want to quote dotted properties to be able to restore them correctly later
 * @setting               {String}        [quoteCharacter='"']        Specify the quote character to use when need to quote separated properties
 * @setting               {Boolean}       [keepLastIntact=false]       Specify if you want to keep the last level (object, array) intact and not to flatten each properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __flatten($1)
 *
 * @example             js
 * import { __flatten } from '@coffeekraken/sugar/object';
 * __flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __flatten(object, settings = {}) {
    const toReturn = {};
    // make sure the passed object is not null, undefined
    if (!Array.isArray(object) && !__isPlain(object))
        return object;
    settings = Object.assign({ separator: '.', array: false, quoteSeparatedProperties: true, quoteCharacter: '"', excludeProps: [], keepLastIntact: false }, settings);
    for (const key in object) {
        if (object[key] === undefined)
            continue;
        if (object[key] === null) {
            toReturn[key] = null;
            continue;
        }
        if (settings.excludeProps.indexOf(key) !== -1) {
            toReturn[key] = object[key];
            continue;
        }
        if ((Array.isArray(object[key]) && settings.array) ||
            (!Array.isArray(object[key]) && typeof object[key]) == 'object') {
            const isArray = Array.isArray(object[key]);
            const flatObject = __flatten(object[key], Object.assign(Object.assign({}, settings), { keepLastIntact: false }));
            for (const x in flatObject) {
                if (flatObject[x] === undefined)
                    continue;
                if (isArray) {
                    toReturn[`${key}[${x}]`] = flatObject[x];
                }
                else {
                    const part = key;
                    if (settings.quoteSeparatedProperties &&
                        part.includes(settings.separator)) {
                        toReturn[`${settings.quoteCharacter}${key}${settings.quoteCharacter}` +
                            settings.separator +
                            x] = flatObject[x];
                    }
                    else {
                        toReturn[key + settings.separator + x] = flatObject[x];
                    }
                }
            }
            continue;
        }
        toReturn[key] = object[key];
    }
    return toReturn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSx3QkFBd0IsQ0FBQztBQUUvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ25ELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUVwQixxREFBcUQ7SUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFaEUsUUFBUSxtQkFDSixTQUFTLEVBQUUsR0FBRyxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osd0JBQXdCLEVBQUUsSUFBSSxFQUM5QixjQUFjLEVBQUUsR0FBRyxFQUNuQixZQUFZLEVBQUUsRUFBRSxFQUNoQixjQUFjLEVBQUUsS0FBSyxJQUNsQixRQUFRLENBQ2QsQ0FBQztJQUVGLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFO1FBQ3RCLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVM7WUFBRSxTQUFTO1FBRXhDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUN0QixRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLFNBQVM7U0FDWjtRQUVELElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDM0MsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixTQUFTO1NBQ1o7UUFFRCxJQUNJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQzlDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUNqRTtZQUNFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFM0MsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsa0NBQ2pDLFFBQVEsS0FDWCxjQUFjLEVBQUUsS0FBSyxJQUN2QixDQUFDO1lBRUgsS0FBSyxNQUFNLENBQUMsSUFBSSxVQUFVLEVBQUU7Z0JBQ3hCLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7b0JBQUUsU0FBUztnQkFFMUMsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDSCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUM7b0JBQ2pCLElBQ0ksUUFBUSxDQUFDLHdCQUF3Qjt3QkFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ25DO3dCQUNFLFFBQVEsQ0FDSixHQUFHLFFBQVEsQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEVBQUU7NEJBQ3hELFFBQVEsQ0FBQyxTQUFTOzRCQUNsQixDQUFDLENBQ1IsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3JCO3lCQUFNO3dCQUNILFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzFEO2lCQUNKO2FBQ0o7WUFDRCxTQUFTO1NBQ1o7UUFFRCxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9CO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyJ9