"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plainObject_1 = __importDefault(require("../is/plainObject"));
/**
 * @name                deepMerge
 * @namespace            shared.object
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
function default_1(...args) {
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
            else if ((0, plainObject_1.default)(newObj[key]) &&
                (0, plainObject_1.default)(secondObj[key])) {
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
exports.default = default_1;
// export default deepMerge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxnQ0FBZ0M7QUFDaEMseUJBQXlCO0FBQ3pCLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsU0FBUztBQUVULDRDQUE0QztBQUM1Qyw2QkFBNkI7QUFDN0Isd0RBQXdEO0FBQ3hELHVEQUF1RDtBQUN2RCxrREFBa0Q7QUFFbEQsMkRBQTJEO0FBRTNELHNEQUFzRDtBQUN0RCxnQ0FBZ0M7QUFDaEMsaUhBQWlIO0FBQ2pILHVGQUF1RjtBQUN2Riw2Q0FBNkM7QUFDN0MsK0JBQStCO0FBQy9CLG1CQUFtQjtBQUVuQixpQ0FBaUM7QUFDakMsbUhBQW1IO0FBQ25ILHNGQUFzRjtBQUN0RiwwREFBMEQ7QUFDMUQsMkJBQTJCO0FBQzNCLDBFQUEwRTtBQUMxRSxnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUVoQiwwRUFBMEU7QUFDMUUsWUFBWTtBQUNaLHlCQUF5QjtBQUN6QixRQUFRO0FBRVIsZ0VBQWdFO0FBQ2hFLFdBQVc7QUFDWCw2RkFBNkY7QUFDN0YsNEZBQTRGO0FBQzVGLFVBQVU7QUFDVixxR0FBcUc7QUFDckcsd0dBQXdHO0FBQ3hHLHNCQUFzQjtBQUN0QixRQUFRO0FBRVIsMkJBQTJCO0FBQzNCLDhDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMsc0RBQXNEO0FBQ3RELFFBQVE7QUFFUix5QkFBeUI7QUFDekIsSUFBSTtBQUVKLG1CQUF5QixHQUFHLElBQUk7SUFDNUIsU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUTtZQUFFLE9BQU8sUUFBUSxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFFdkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN2QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdELElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUM7aUJBQU0sSUFDSCxJQUFBLHFCQUFlLEVBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFBLHFCQUFlLEVBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2pDO2dCQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQTFDRCw0QkEwQ0M7QUFFRCw0QkFBNEIifQ==