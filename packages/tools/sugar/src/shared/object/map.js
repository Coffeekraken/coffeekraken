"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                map
 * @namespace           sugar.js.object
 * @type                Function
 * @stable
 *
 * This is the same function as the "Array.map" but for objects. It will iterate over all the properties
 * of the passed object and pass the value to your process function. It will then save the property
 * with your processed value
 *
 * @param           {Object}            object          The object to process
 * @param           {Function}          processor       The processor function that will take as parameters the current property value and the property name
 * @return          {Object}                            The processed object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import map from '@coffeekraken/sugar/js/object/map';
 * const myObject = {
 *    hello: 'world',
 *    cat: 'Nelson'
 * };
 * map(myObject, ({value, prop}) => {
 *    return prop === 'hello' ? 'universe' : value;
 * });
 * {
 *    hello: 'universe',
 *    cat: 'Nelson'
 * }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function map(object, processor) {
    Object.keys(object).forEach((prop, i) => {
        const res = processor({ value: object[prop], key: prop, prop, i, idx: i });
        if (res === -1)
            delete object[prop];
        else
            object[prop] = res;
    });
    return object;
}
exports.default = map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVM7SUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBQ0Qsa0JBQWUsR0FBRyxDQUFDIn0=