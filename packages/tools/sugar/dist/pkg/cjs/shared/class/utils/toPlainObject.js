"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                          toPlainObject
 * @namespace          shared.class.utils
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status            beta
 *
 * This function take a instance as parameter and return a plain object of it
 *
 * @param               {Mixed}               instance                Any class instance to transform into a plain object
 * @return              {Object}                                      A plain object version of the the class instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import toPlainObject from '@coffeekraken/sugar/shared/class/utils/toPlainObject';
 * class Coco {
 *    constructor() {
 *      this.hello = 'world';
 *    }
 * }
 * toPlainObject(new Coco()); // => { hello: 'world' }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
function toPlainObject(theClass) {
    const originalClass = theClass || {};
    const keys = Object.getOwnPropertyNames(originalClass);
    return keys.reduce((classAsObj, key) => {
        classAsObj[key] = originalClass[key];
        return classAsObj;
    }, {});
}
exports.default = toPlainObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsUUFBUTtJQUMzQixNQUFNLGFBQWEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ3JDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDWCxDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=