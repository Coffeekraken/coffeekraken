// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "copy-to", "../is/plainObject", "../array/unique"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const copy_to_1 = __importDefault(require("copy-to"));
    const plainObject_1 = __importDefault(require("../is/plainObject"));
    const unique_1 = __importDefault(require("../array/unique"));
    /**
     * @name                deepMerge
     * @namespace            js.object
     * @type                Function
     * @stable
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
            object: true
        };
        function merge(firstObj, secondObj) {
            const newObj = {};
            if (!firstObj && secondObj)
                return secondObj;
            if (!secondObj && firstObj)
                return firstObj;
            if (!firstObj && !secondObj)
                return {};
            copy_to_1.default(firstObj).override(newObj);
            for (const key of Object.keys(secondObj)) {
                // merging arrays
                if (settings.array === true &&
                    Array.isArray(firstObj[key]) &&
                    Array.isArray(secondObj[key])) {
                    const newArray = unique_1.default([...firstObj[key], ...secondObj[key]]);
                    newObj[key] = newArray;
                    continue;
                }
                // merging objects
                else if (settings.object === true &&
                    plainObject_1.default(firstObj[key]) &&
                    plainObject_1.default(secondObj[key])) {
                    newObj[key] = merge(firstObj[key], secondObj[key]);
                    continue;
                }
                copy_to_1.default(secondObj).pick(key).toCover(newObj);
            }
            return newObj;
        }
        const potentialSettingsObj = args[args.length - 1] || {};
        if ((potentialSettingsObj.array &&
            typeof potentialSettingsObj.array === 'boolean') ||
            (potentialSettingsObj.object &&
                typeof potentialSettingsObj.object === 'boolean')) {
            if (potentialSettingsObj.array !== undefined)
                settings.array = potentialSettingsObj.array;
            if (potentialSettingsObj.object !== undefined)
                settings.object = potentialSettingsObj.object;
            args.pop();
        }
        let currentObj = {};
        for (let i = 0; i < args.length; i++) {
            const toMergeObj = args[i] || {};
            currentObj = merge(currentObj, toMergeObj);
        }
        return currentObj;
    }
    exports.default = deepMerge;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHNEQUErQjtJQUMvQixvRUFBZ0Q7SUFDaEQsNkRBQXVDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxHQUFHLElBQUk7UUFDeEIsTUFBTSxRQUFRLEdBQUc7WUFDZixLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUVGLFNBQVMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVM7Z0JBQUUsT0FBTyxTQUFTLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxRQUFRO2dCQUFFLE9BQU8sUUFBUSxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxTQUFTO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBQ3ZDLGlCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDeEMsaUJBQWlCO2dCQUNqQixJQUNFLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtvQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzdCO29CQUNBLE1BQU0sUUFBUSxHQUFHLGdCQUFRLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQ3ZCLFNBQVM7aUJBQ1Y7Z0JBRUQsa0JBQWtCO3FCQUNiLElBQ0gsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO29CQUN4QixxQkFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIscUJBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7b0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELFNBQVM7aUJBQ1Y7Z0JBQ0QsaUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELElBQ0UsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3pCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNsRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07Z0JBQzFCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUNuRDtZQUNBLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lBQzlDLElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7Z0JBQzNDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNaO1FBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=