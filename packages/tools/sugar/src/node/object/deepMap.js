// @ts-nocheck
// @shared
import __isPlainObject from '../is/plainObject';
import __deepMerge from '../object/deepMerge';
/**
 * @name            deepMap
 * @namespace           sugar.js.object
 * @type            Function
 * @stable
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - processObjects (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
 * - handleArray (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, (value, prop, fullPath) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(object, processor, settings = {}, _path = []) {
    settings = __deepMerge({
        deepFirst: false,
        processObjects: false,
        handleArray: true
    }, settings);
    Object.keys(object).forEach((prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(object, prop);
        if (descriptor.get &&
            typeof descriptor.get === 'function' &&
            !descriptor.set) {
            return;
        }
        if (!settings.deepFirst) {
            if (__isPlainObject(object[prop]) ||
                (Array.isArray(object[prop]) && settings.handleArray)) {
                object[prop] = deepMap(object[prop], processor, settings, [
                    ..._path,
                    prop
                ]);
                if (!settings.processObjects)
                    return;
            }
            const res = processor(object[prop], prop, [..._path, prop].join('.'));
            if (res === -1)
                delete object[prop];
            else
                object[prop] = res;
        }
        else {
            const res = processor(object[prop], prop, [..._path, prop].join('.'));
            if (res === -1)
                delete object[prop];
            else
                object[prop] = res;
            if (__isPlainObject(object[prop]) ||
                (Array.isArray(object[prop]) && settings.handleArray)) {
                object[prop] = deepMap(object[prop], processor, settings, [
                    ..._path,
                    prop
                ]);
                if (!settings.processObjects)
                    return;
            }
        }
    });
    return object;
}
export default deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUU7SUFDM0QsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxTQUFTLEVBQUUsS0FBSztRQUNoQixjQUFjLEVBQUUsS0FBSztRQUNyQixXQUFXLEVBQUUsSUFBSTtLQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpFLElBQ0UsVUFBVSxDQUFDLEdBQUc7WUFDZCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVTtZQUNwQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQ2Y7WUFDQSxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUN2QixJQUNFLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ3JEO2dCQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7b0JBQ3hELEdBQUcsS0FBSztvQkFDUixJQUFJO2lCQUNMLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWM7b0JBQUUsT0FBTzthQUN0QztZQUNELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUN6QjthQUFNO1lBQ0wsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBRXhCLElBQ0UsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDckQ7Z0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtvQkFDeEQsR0FBRyxLQUFLO29CQUNSLElBQUk7aUJBQ0wsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYztvQkFBRSxPQUFPO2FBQ3RDO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLE9BQU8sQ0FBQyJ9