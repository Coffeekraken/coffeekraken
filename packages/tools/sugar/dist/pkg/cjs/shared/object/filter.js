"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                        filter
 * @namespace            shared.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Allow to filter an object using a function. It works the same as the filter method on the Array object type.
 * The passed filter function will have as parameter each object properties and must return true or false depending if you want the
 * passed property in the filtered object
 *
 * @param               {Object}                object                The object to filter
 * @param               {Function}              filter                The filter function that take as parameter the property itself, and the property name
 * @return              {Object}                                      The filtered object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __filter } from '@coffeekraken/sugar/object';
 * __filter({
 *    coco: 'hello',
 *    plop: true
 * }, (key, item) => typeof item === 'string');
 * // { coco: 'hello' }
 *
 * @since         2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __filter(object, filter) {
    // init the new object to return
    const result = {};
    // loop on the object keys
    Object.keys(object).forEach((propertyName) => {
        // pass the property in the filter function
        if (filter(propertyName, object[propertyName])) {
            // add the property in the new object
            result[propertyName] = object[propertyName];
        }
    });
    // return the filtered object
    return result;
}
exports.default = __filter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxTQUF3QixRQUFRLENBQUMsTUFBTSxFQUFFLE1BQU07SUFDM0MsZ0NBQWdDO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVsQiwwQkFBMEI7SUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtRQUN6QywyQ0FBMkM7UUFDM0MsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFO1lBQzVDLHFDQUFxQztZQUNyQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCw2QkFBNkI7SUFDN0IsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQWZELDJCQWVDIn0=