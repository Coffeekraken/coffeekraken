// @ts-nocheck
import __isPlainObject from '../is/plainObject';
import __deepMerge from '../object/deepMerge';
import __isClassInstance from '../is/classInstance';
/**
 * @name            deepMap
 * @namespace            js.object
 * @type            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * This function is the same as the "map" one. The only difference is that this one goes deep into the object
 *
 * @param         {Object}        object          The object you want to map through
 * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
 * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
 * - classInstances (false) {Boolean}: Specify if you want the objects to be processed the same as other values
 * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
 * - array (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
 * deepMap({
 *    hello: 'world'
 * }, ({object, prop, value, path}) => {
 *    return '~ ' + value;
 * });
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
    settings = __deepMerge({
        classInstances: false,
        array: true,
        privateProps: false,
        cloneFirst: true
    }, settings);
    const isArray = Array.isArray(objectOrArray);
    let newObject = isArray
        ? []
        : settings.cloneFirst
            ? Object.assign({}, objectOrArray)
            : objectOrArray;
    Object.keys(objectOrArray).forEach((prop) => {
        if (!settings.privateProps && prop.match(/^_/))
            return;
        if (__isPlainObject(objectOrArray[prop]) ||
            (__isClassInstance(objectOrArray[prop]) && settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop
            ]);
            if (isArray) {
                newObject.push(res);
            }
            else {
                if (prop === '...' && __isPlainObject(res)) {
                    newObject = Object.assign(Object.assign({}, newObject), res);
                }
                else {
                    newObject[prop] = res;
                }
            }
            return;
        }
        const res = processor({
            object: objectOrArray,
            prop,
            value: objectOrArray[prop],
            path: [..._path, prop].join('.')
        });
        if (res === -1) {
            delete objectOrArray[prop];
            return;
        }
        if (isArray)
            newObject.push(res);
        else {
            if (prop === '...' && __isPlainObject(res)) {
                // console.log('DEFEF', res);
                newObject = Object.assign(Object.assign({}, newObject), res);
            }
            else {
                newObject[prop] = res;
            }
        }
    });
    return newObject;
}
export default deepMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBQ0gsU0FBUyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO0lBQ2xFLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsY0FBYyxFQUFFLEtBQUs7UUFDckIsS0FBSyxFQUFFLElBQUk7UUFDWCxZQUFZLEVBQUUsS0FBSztRQUNuQixVQUFVLEVBQUUsSUFBSTtLQUNqQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUU3QyxJQUFJLFNBQVMsR0FBRyxPQUFPO1FBQ3JCLENBQUMsQ0FBQyxFQUFFO1FBQ0osQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLENBQUM7WUFDbEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUVsQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUV2RCxJQUNFLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQ25FLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQ3REO1lBQ0EsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFO2dCQUM1RCxHQUFHLEtBQUs7Z0JBQ1IsSUFBSTthQUNMLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxFQUFFO2dCQUNYLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckI7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDMUMsU0FBUyxtQ0FDSixTQUFTLEdBQ1QsR0FBRyxDQUNQLENBQUM7aUJBQ0g7cUJBQU07b0JBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztpQkFDdkI7YUFDRjtZQUNELE9BQU87U0FDUjtRQUVELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNwQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJO1lBQ0osS0FBSyxFQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDMUIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNkLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLE9BQU87U0FDUjtRQUNELElBQUksT0FBTztZQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7WUFDSCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQyw2QkFBNkI7Z0JBQzdCLFNBQVMsbUNBQ0osU0FBUyxHQUNULEdBQUcsQ0FDUCxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN2QjtTQUNGO0lBRUgsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==