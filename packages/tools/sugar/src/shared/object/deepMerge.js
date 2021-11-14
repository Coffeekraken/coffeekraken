// @ts-nocheck
import __isPlainObject from '../is/plainObject';
/**
 * @name                deepMerge
 * @namespace            js.object
 * @type                Function
 * @platform          js
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
// function deepMerge(...args) {
//     const settings = {
//         array: false,
//         object: true,
//     };
//     function merge(firstObj, secondObj) {
//         const newObj = {};
//         if (!firstObj && secondObj) return secondObj;
//         if (!secondObj && firstObj) return firstObj;
//         if (!firstObj && !secondObj) return {};
//         __copyTo(firstObj).withAccess().toCover(newObj);
//         for (const key of Object.keys(secondObj)) {
//             // merging arrays
//             // if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
//             //     const newArray = __unique([...firstObj[key], ...secondObj[key]]);
//             //     newObj[key] = newArray;
//             //     continue;
//             // }
//             // merging objects
//             if (settings.object === true && __isPlainObject(firstObj[key]) && __isPlainObject(secondObj[key])) {
//                 const descriptor = Object.getOwnPropertyDescriptor(secondObj, key);
//                 if (descriptor.get || descriptor.set) {
//                 } else {
//                     newObj[key] = merge(firstObj[key], secondObj[key]);
//                     continue;
//                 }
//             }
//             __copyTo(secondObj).withAccess().pick(key).toCover(newObj);
//         }
//         return newObj;
//     }
//     const potentialSettingsObj = args[args.length - 1] || {};
//     if (
//         (potentialSettingsObj.array && typeof potentialSettingsObj.array === 'boolean') ||
//         (potentialSettingsObj.object && typeof potentialSettingsObj.object === 'boolean')
//     ) {
//         if (potentialSettingsObj.array !== undefined) settings.array = potentialSettingsObj.array;
//         if (potentialSettingsObj.object !== undefined) settings.object = potentialSettingsObj.object;
//         args.pop();
//     }
//     let currentObj = {};
//     for (let i = 0; i < args.length; i++) {
//         const toMergeObj = args[i];
//         currentObj = merge(currentObj, toMergeObj);
//     }
//     return currentObj;
// }
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
            else if (__isPlainObject(newObj[key]) &&
                __isPlainObject(secondObj[key])) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFHZCxPQUFPLGVBQWUsTUFBTSxtQkFBbUIsQ0FBQztBQUloRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxnQ0FBZ0M7QUFDaEMseUJBQXlCO0FBQ3pCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsU0FBUztBQUVULDRDQUE0QztBQUM1Qyw2QkFBNkI7QUFDN0Isd0RBQXdEO0FBQ3hELHVEQUF1RDtBQUN2RCxrREFBa0Q7QUFFbEQsMkRBQTJEO0FBRTNELHNEQUFzRDtBQUN0RCxnQ0FBZ0M7QUFDaEMsaUhBQWlIO0FBQ2pILHVGQUF1RjtBQUN2Riw2Q0FBNkM7QUFDN0MsK0JBQStCO0FBQy9CLG1CQUFtQjtBQUVuQixpQ0FBaUM7QUFDakMsbUhBQW1IO0FBQ25ILHNGQUFzRjtBQUN0RiwwREFBMEQ7QUFDMUQsMkJBQTJCO0FBQzNCLDBFQUEwRTtBQUMxRSxnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUVoQiwwRUFBMEU7QUFDMUUsWUFBWTtBQUNaLHlCQUF5QjtBQUN6QixRQUFRO0FBRVIsZ0VBQWdFO0FBQ2hFLFdBQVc7QUFDWCw2RkFBNkY7QUFDN0YsNEZBQTRGO0FBQzVGLFVBQVU7QUFDVixxR0FBcUc7QUFDckcsd0dBQXdHO0FBQ3hHLHNCQUFzQjtBQUN0QixRQUFRO0FBRVIsMkJBQTJCO0FBQzNCLDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMsc0RBQXNEO0FBQ3RELFFBQVE7QUFFUix5QkFBeUI7QUFDekIsSUFBSTtBQUVKLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxJQUFJO0lBQzVCLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTO1FBQzlCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7WUFBRSxPQUFPLFNBQVMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7WUFBRSxPQUFPLFFBQVEsQ0FBQztRQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBRXZDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM1RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3RCxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO2lCQUFNLElBQ0gsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNqQztnQkFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNwRDtpQkFBTTtnQkFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM5QztJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3RCLENBQUM7QUFFRCw0QkFBNEIifQ==