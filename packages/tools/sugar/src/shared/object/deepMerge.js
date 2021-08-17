// @ts-nocheck
import __copyTo from 'copy-to';
import __isPlainObject from '../is/plainObject';
/**
 * @name                deepMerge
 * @namespace            js.object
 * @type                Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status        beta
 *
 * Deep merge one object with another and return the merged object result. This merging implementation support:
 * - Merging object with getters/setters
 * - n numbers of objects as arguments
 *
 * @param           {Object}            args...        Pass all the objects you want to merge
 * @param           {Object}            [settings={}]       Pass as last object the settings one that can contain these properties:
 * - object (true) {Boolean}: Specify if you want to merge the objects
 * - array (false) {Boolean}: Specify if you want to merge the arrays
 * @return          {Object}                              The merged object result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import deepMerge from '@coffeekraken/sugar/node/object/deepMerge';
 * deepMerge({a: {b: {c: 'c', d: 'd'}}}, {a: {b: {e: 'e', f: 'f'}}});
 * // => { a: { b: { c: 'c', d: 'd', e: 'e', f: 'f' } } }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function deepMerge(...args) {
    const settings = {
        array: false,
        object: true,
    };
    function merge(firstObj, secondObj) {
        const newObj = {};
        if (!firstObj && secondObj)
            return secondObj;
        if (!secondObj && firstObj)
            return firstObj;
        if (!firstObj && !secondObj)
            return {};
        __copyTo(firstObj).withAccess().toCover(newObj);
        for (const key of Object.keys(secondObj)) {
            // merging arrays
            // if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
            //     const newArray = __unique([...firstObj[key], ...secondObj[key]]);
            //     newObj[key] = newArray;
            //     continue;
            // }
            // merging objects
            if (settings.object === true && __isPlainObject(firstObj[key]) && __isPlainObject(secondObj[key])) {
                const descriptor = Object.getOwnPropertyDescriptor(secondObj, key);
                if (descriptor.get || descriptor.set) {
                }
                else {
                    newObj[key] = merge(firstObj[key], secondObj[key]);
                    continue;
                }
            }
            __copyTo(secondObj).withAccess().pick(key).toCover(newObj);
        }
        return newObj;
    }
    const potentialSettingsObj = args[args.length - 1] || {};
    if ((potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean') ||
        (potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean')) {
        if (potentialSettingsObj.array !== undefined)
            settings.array = potentialSettingsObj.array;
        if (potentialSettingsObj.object !== undefined)
            settings.object = potentialSettingsObj.object;
        args.pop();
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
export default function (...args) {
    function merge(firstObj, secondObj) {
        const newObj = {};
        if (!firstObj && secondObj)
            return secondObj;
        if (!secondObj && firstObj)
            return firstObj;
        if (!firstObj && !secondObj)
            return {};
        const firstProps = Object.getOwnPropertyNames(firstObj);
        firstProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(firstObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else {
                newObj[key] = firstObj[key];
            }
        });
        const secondProps = Object.getOwnPropertyNames(secondObj);
        secondProps.forEach((key) => {
            const desc = Object.getOwnPropertyDescriptor(secondObj, key);
            if (desc.set || desc.get) {
                Object.defineProperty(newObj, key, desc);
            }
            else if (__isPlainObject(newObj[key]) && __isPlainObject(secondObj[key])) {
                newObj[key] = merge(newObj[key], secondObj[key]);
            }
            else {
                newObj[key] = secondObj[key];
            }
        });
        return newObj;
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
        const toMergeObj = args[i];
        currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
}
// export default deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxlQUFlLE1BQU0sbUJBQW1CLENBQUM7QUFJaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQUNILFNBQVMsU0FBUyxDQUFDLEdBQUcsSUFBSTtJQUN0QixNQUFNLFFBQVEsR0FBRztRQUNiLEtBQUssRUFBRSxLQUFLO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDZixDQUFDO0lBRUYsU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFdkMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoRCxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEMsaUJBQWlCO1lBQ2pCLGtHQUFrRztZQUNsRyx3RUFBd0U7WUFDeEUsOEJBQThCO1lBQzlCLGdCQUFnQjtZQUNoQixJQUFJO1lBRUosa0JBQWtCO1lBQ2xCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDL0YsTUFBTSxVQUFVLEdB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