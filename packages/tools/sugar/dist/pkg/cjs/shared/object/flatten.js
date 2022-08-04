"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
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
 * @example             js
 * import flatten from '@coffeekraken/sugar/js/object/flatten';
 * flatten({
 *    hello: {
 *      world: 'Coco'
 *    }
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function flatten(object, settings = {}) {
    const toReturn = {};
    // make sure the passed object is not null, undefined
    if (!Array.isArray(object) && !(0, plainObject_1.default)(object))
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
            const flatObject = flatten(object[key], Object.assign(Object.assign({}, settings), { keepLastIntact: false }));
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
exports.default = flatten;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUEwQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNsQyxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIscURBQXFEO0lBQ3JELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxxQkFBUyxFQUFDLE1BQU0sQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRWhFLFFBQVEsbUJBQ0osU0FBUyxFQUFFLEdBQUcsRUFDZCxLQUFLLEVBQUUsS0FBSyxFQUNaLHdCQUF3QixFQUFFLElBQUksRUFDOUIsY0FBYyxFQUFFLEdBQUcsRUFDbkIsWUFBWSxFQUFFLEVBQUUsRUFDaEIsY0FBYyxFQUFFLEtBQUssSUFDbEIsUUFBUSxDQUNkLENBQUM7SUFFRixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtRQUN0QixJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTO1lBQUUsU0FBUztRQUV4QyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDdEIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNyQixTQUFTO1NBQ1o7UUFFRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsU0FBUztTQUNaO1FBRUQsSUFDSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM5QyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFDakU7WUFDRSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGtDQUMvQixRQUFRLEtBQ1gsY0FBYyxFQUFFLEtBQUssSUFDdkIsQ0FBQztZQUVILEtBQUssTUFBTSxDQUFDLElBQUksVUFBVSxFQUFFO2dCQUN4QixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTO29CQUFFLFNBQVM7Z0JBRTFDLElBQUksT0FBTyxFQUFFO29CQUNULFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO29CQUNqQixJQUNJLFFBQVEsQ0FBQyx3QkFBd0I7d0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNuQzt3QkFDRSxRQUFRLENBQ0osR0FBRyxRQUFRLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxFQUFFOzRCQUN4RCxRQUFRLENBQUMsU0FBUzs0QkFDbEIsQ0FBQyxDQUNSLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNyQjt5QkFBTTt3QkFDSCxRQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMxRDtpQkFDSjthQUNKO1lBQ0QsU0FBUztTQUNaO1FBRUQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMvQjtJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxrQkFBZSxPQUFPLENBQUMifQ==