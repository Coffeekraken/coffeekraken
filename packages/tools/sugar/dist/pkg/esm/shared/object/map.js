// @ts-nocheck
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
export default map;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTO0lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNsQixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNuQixHQUFHLEVBQUUsSUFBSTtZQUNULElBQUk7WUFDSixDQUFDO1lBQ0QsR0FBRyxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUMzQjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxlQUFlLEdBQUcsQ0FBQyJ9