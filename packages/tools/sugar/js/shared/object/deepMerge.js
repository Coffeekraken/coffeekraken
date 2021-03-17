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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9vYmplY3QvZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxjQUFjO0lBQ2QsVUFBVTtJQUNWLG9EQUErQjtJQUMvQixrRUFBZ0Q7SUFDaEQsMkRBQXVDO0lBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxTQUFTLFNBQVM7UUFBQyxjQUFPO2FBQVAsVUFBTyxFQUFQLHFCQUFPLEVBQVAsSUFBTztZQUFQLHlCQUFPOztRQUN4QixJQUFNLFFBQVEsR0FBRztZQUNmLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBRUYsU0FBUyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVM7WUFDaEMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUztnQkFBRSxPQUFPLFNBQVMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVE7Z0JBQUUsT0FBTyxRQUFRLENBQUM7WUFDNUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDdkMsaUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsS0FBa0IsVUFBc0IsRUFBdEIsS0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO2dCQUFyQyxJQUFNLEdBQUcsU0FBQTtnQkFDWixpQkFBaUI7Z0JBQ2pCLElBQ0UsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJO29CQUN2QixLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDN0I7b0JBQ0EsSUFBTSxRQUFRLEdBQUcsZ0JBQVEsaUNBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUNqRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUN2QixTQUFTO2lCQUNWO2dCQUVELGtCQUFrQjtxQkFDYixJQUNILFFBQVEsQ0FBQyxNQUFNLEtBQUssSUFBSTtvQkFDeEIscUJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlCLHFCQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQy9CO29CQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxTQUFTO2lCQUNWO2dCQUNELGlCQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMvQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6RCxJQUNFLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUN6QixPQUFPLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7WUFDbEQsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO2dCQUMxQixPQUFPLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsRUFDbkQ7WUFDQSxJQUFJLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUM5QyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTO2dCQUMzQyxRQUFRLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztZQUNoRCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDWjtRQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9