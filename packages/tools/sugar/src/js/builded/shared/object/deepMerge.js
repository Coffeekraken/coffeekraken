var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
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
    // @ts-nocheck
    // @shared
    var copy_to_1 = __importDefault(require("copy-to"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var unique_1 = __importDefault(require("../array/unique"));
    /**
     * @name                deepMerge
     * @namespace           sugar.js.object
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
    function deepMerge() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var settings = {
            array: false,
            object: true
        };
        function merge(firstObj, secondObj) {
            var newObj = {};
            if (!firstObj && secondObj)
                return secondObj;
            if (!secondObj && firstObj)
                return firstObj;
            if (!firstObj && !secondObj)
                return {};
            copy_to_1.default(firstObj).override(newObj);
            for (var _i = 0, _a = Object.keys(secondObj); _i < _a.length; _i++) {
                var key = _a[_i];
                // merging arrays
                if (settings.array === true &&
                    Array.isArray(firstObj[key]) &&
                    Array.isArray(secondObj[key])) {
                    var newArray = unique_1.default(__spreadArray(__spreadArray([], firstObj[key]), secondObj[key]));
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
        var potentialSettingsObj = args[args.length - 1] || {};
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
        var currentObj = {};
        for (var i = 0; i < args.length; i++) {
            var toMergeObj = args[i] || {};
            currentObj = merge(currentObj, toMergeObj);
        }
        return currentObj;
    }
    exports.default = deepMerge;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL29iamVjdC9kZWVwTWVyZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLGNBQWM7SUFDZCxVQUFVO0lBQ1Ysb0RBQStCO0lBQy9CLGtFQUFnRDtJQUNoRCwyREFBdUM7SUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQVMsU0FBUztRQUFDLGNBQU87YUFBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1lBQVAseUJBQU87O1FBQ3hCLElBQU0sUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsSUFBSTtTQUNiLENBQUM7UUFFRixTQUFTLEtBQUssQ0FBQyxRQUFRLEVBQUUsU0FBUztZQUNoQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTO2dCQUFFLE9BQU8sU0FBUyxDQUFDO1lBQzdDLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUTtnQkFBRSxPQUFPLFFBQVEsQ0FBQztZQUM1QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUztnQkFBRSxPQUFPLEVBQUUsQ0FBQztZQUN2QyxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwQyxLQUFrQixVQUFzQixFQUF0QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQXRCLGNBQXNCLEVBQXRCLElBQXNCLEVBQUU7Z0JBQXJDLElBQU0sR0FBRyxTQUFBO2dCQUNaLGlCQUFpQjtnQkFDakIsSUFDRSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM3QjtvQkFDQSxJQUFNLFFBQVEsR0FBRyxnQkFBUSxpQ0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUssU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQ3ZCLFNBQVM7aUJBQ1Y7Z0JBRUQsa0JBQWtCO3FCQUNiLElBQ0gsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO29CQUN4QixxQkFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDOUIscUJBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDL0I7b0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELFNBQVM7aUJBQ1Y7Z0JBQ0QsaUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELElBQ0UsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3pCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNsRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07Z0JBQzFCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUNuRDtZQUNBLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lBQzlDLElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7Z0JBQzNDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNaO1FBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=