// @ts-nocheck
import __isPlainObject from '../is/plainObject';
import __deepMerge from '../object/deepMerge';
import __isClassInstance from '../is/classInstance';
/**
 * @name            deepMap
 * @namespace            js.object
 * @type            Function
 * @platform          js
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
    settings = __deepMerge({
        classInstances: false,
        array: true,
        privateProps: false,
        cloneFirst: true,
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
            (__isClassInstance(objectOrArray[prop]) &&
                settings.classInstances) ||
            (Array.isArray(objectOrArray[prop]) && settings.array)) {
            const res = deepMap(objectOrArray[prop], processor, settings, [
                ..._path,
                prop,
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
            path: [..._path, prop].join('.'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8saUJBQWlCLE1BQU0scUJBQXFCLENBQUM7QUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUU7SUFDaEUsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxjQUFjLEVBQUUsS0FBSztRQUNyQixLQUFLLEVBQUUsSUFBSTtRQUNYLFlBQVksRUFBRSxLQUFLO1FBQ25CLFVBQVUsRUFBRSxJQUFJO0tBQ25CLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRTdDLElBQUksU0FBUyxHQUFHLE9BQU87UUFDbkIsQ0FBQyxDQUFDLEVBQUU7UUFDSixDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQztZQUNsQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBRXZELElBQ0ksZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkMsUUFBUSxDQUFDLGNBQWMsQ0FBQztZQUM1QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN4RDtZQUNFLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTtnQkFDMUQsR0FBRyxLQUFLO2dCQUNSLElBQUk7YUFDUCxDQUFDLENBQUM7WUFFSCxJQUFJLE9BQU8sRUFBRTtnQkFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ3hDLFNBQVMsbUNBQ0YsU0FBUyxHQUNULEdBQUcsQ0FDVCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSTtZQUNKLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzFCLElBQUksRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDWixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU87WUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEMsNkJBQTZCO2dCQUM3QixTQUFTLG1DQUNGLFNBQVMsR0FDVCxHQUFHLENBQ1QsQ0FBQzthQUNMO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekI7U0FDSjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELGVBQWUsT0FBTyxDQUFDIn0=