"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name                map
 * @namespace            shared.object
 * @type                Function
 * @async
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This is the same function as the "Array.map" but for objects. It will iterate over all the properties
 * of the passed object and pass the value to your process function. It will then save the property
 * with your processed value
 *
 * @param           {Object}            object          The object to process
 * @param           {Function}          processor       The processor function that will take as parameters the current property value and the property name
 * @return          {Object}                            The processed object
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function map(object, processor) {
    for (let i = 0; i < Object.keys(object).length; i++) {
        const prop = Object.keys(object)[i];
        const res = processor({
            value: object[prop],
            key: prop,
            prop,
            i,
            idx: i,
        });
        if (res === -1)
            delete object[prop];
        else
            object[prop] = res;
    }
    return object;
}
exports.default = map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBQ0gsU0FBUyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVM7SUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2xCLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ25CLEdBQUcsRUFBRSxJQUFJO1lBQ1QsSUFBSTtZQUNKLENBQUM7WUFDRCxHQUFHLEVBQUUsQ0FBQztTQUNULENBQUMsQ0FBQztRQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzNCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELGtCQUFlLEdBQUcsQ0FBQyJ9