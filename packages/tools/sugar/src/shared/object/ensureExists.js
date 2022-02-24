// @ts-nocheck
import __get from './get';
import __set from './set';
/**
 * @name                        ensureExists
 * @namespace            js.object
 * @type                        Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
 *
 * @param           {Object}            obj                           The object on which to check the path existence
 * @param           {String}            path                           The dotted object path to check
 * @param           {Mixed}             value                         The value to set to the object path created if not already exist
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
 * const myObj = { hello: 'world' }«
 * ensureExists(myObj, 'cool.object', {});
 * // { hello: 'world', cool: { object: {} } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default (obj, path, value = {}) => {
    const v = __get(obj, path);
    if (v === undefined) {
        __set(obj, path, value);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRTtJQUNyQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNCLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUNqQixLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzQjtBQUNMLENBQUMsQ0FBQyJ9