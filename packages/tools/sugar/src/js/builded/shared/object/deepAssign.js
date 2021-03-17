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
        define(["require", "exports", "../array/unique", "../is/plainObject", "./clone"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var unique_1 = __importDefault(require("../array/unique"));
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var clone_1 = __importDefault(require("./clone"));
    /**
     * @name            deepAssign
     * @namespace       sugar.js.object
     * @type            Function
     *
     * This function take as first parameter the object you want to assign others to,
     * then others objects you want to assign to the first.
     * The difference with the ```deepMerge``` function is that this one keep the first
     * passed object as reference and update it directly. The ```deepMerge``` one create a new
     * object with the merging result
     *
     * @param       {Object}          referenceObj          The object you want to assign the others in
     * @param       {Object}          ...objects            Some objects you want to assign in the first one
     * @return      {Object}                                Return the reference to the first passed object
     *
     * @example         js
     * import deepAssign from '@coffeekraken/sugar/js/object/deepAssign';
     * const obj1 = { something: 'cool' };
     * const obj2 = { other: true };
     * const obj3 = deepAssign(obj1, obj2);
     * obj1 === obj3 // => true
     *
     * @see         https://www.npmjs.com/package/assign-deep
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepAssign(referenceObj) {
        // objects.forEach((obj) => {
        //   __deepAssign(referenceObj, obj);
        // });
        // return referenceObj;
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        var settings = {
            array: false,
            object: true,
            cloneChilds: true
        };
        function merge(refObj, mixWithObj) {
            // const newObj = {};
            // if (!refObj && mixWithObj) return mixWithObj;
            // if (!mixWithObj && refObj) return refObj;
            // if (!refObj && !mixWithObj) return {};
            // __copyTo(refObj).override(newObj);
            for (var _i = 0, _a = Object.keys(mixWithObj); _i < _a.length; _i++) {
                var key = _a[_i];
                // merging arrays
                if (settings.array === true &&
                    Array.isArray(refObj[key]) &&
                    Array.isArray(mixWithObj[key])) {
                    var newArray = unique_1.default(__spreadArray(__spreadArray([], refObj[key]), mixWithObj[key]));
                    refObj[key] = newArray;
                    continue;
                }
                // merging objects
                if (settings.object === true &&
                    plainObject_1.default(refObj[key]) &&
                    plainObject_1.default(mixWithObj[key])) {
                    refObj[key] = merge(refObj[key], mixWithObj[key]);
                    continue;
                }
                if (plainObject_1.default(mixWithObj[key]) && settings.cloneChilds) {
                    refObj[key] = clone_1.default(mixWithObj[key], {
                        deep: true
                    });
                }
                else {
                    // default values
                    refObj[key] = mixWithObj[key];
                }
            }
            return refObj;
        }
        var potentialSettingsObj = objects[objects.length - 1] || {};
        if ((potentialSettingsObj.array &&
            typeof potentialSettingsObj.array === 'boolean') ||
            (potentialSettingsObj.object &&
                typeof potentialSettingsObj.object === 'boolean')) {
            if (potentialSettingsObj.array !== undefined)
                settings.array = potentialSettingsObj.array;
            if (potentialSettingsObj.object !== undefined)
                settings.object = potentialSettingsObj.object;
            objects.pop();
        }
        for (var i = 0; i < objects.length; i++) {
            var toMergeObj = objects[i] || {};
            merge(referenceObj, toMergeObj);
        }
        return referenceObj;
    }
    exports.default = deepAssign;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZGVlcEFzc2lnbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMkRBQXVDO0lBQ3ZDLGtFQUFnRDtJQUNoRCxrREFBOEI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUF3QixVQUFVLENBQUMsWUFBWTtRQUM3Qyw2QkFBNkI7UUFDN0IscUNBQXFDO1FBQ3JDLE1BQU07UUFDTix1QkFBdUI7UUFKd0IsaUJBQVU7YUFBVixVQUFVLEVBQVYscUJBQVUsRUFBVixJQUFVO1lBQVYsZ0NBQVU7O1FBTXpELElBQU0sUUFBUSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixNQUFNLEVBQUUsSUFBSTtZQUNaLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUM7UUFFRixTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVTtZQUMvQixxQkFBcUI7WUFDckIsZ0RBQWdEO1lBQ2hELDRDQUE0QztZQUM1Qyx5Q0FBeUM7WUFDekMscUNBQXFDO1lBQ3JDLEtBQWtCLFVBQXVCLEVBQXZCLEtBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBdkIsY0FBdUIsRUFBdkIsSUFBdUIsRUFBRTtnQkFBdEMsSUFBTSxHQUFHLFNBQUE7Z0JBQ1osaUJBQWlCO2dCQUNqQixJQUNFLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSTtvQkFDdkIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzFCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQzlCO29CQUNBLElBQU0sUUFBUSxHQUFHLGdCQUFRLGlDQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBSyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDaEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQztvQkFDdkIsU0FBUztpQkFDVjtnQkFFRCxrQkFBa0I7Z0JBQ2xCLElBQ0UsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO29CQUN4QixxQkFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIscUJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFDaEM7b0JBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2xELFNBQVM7aUJBQ1Y7Z0JBRUQsSUFBSSxxQkFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7b0JBQzVELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNyQyxJQUFJLEVBQUUsSUFBSTtxQkFDWCxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsaUJBQWlCO29CQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMvQjthQUNGO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9ELElBQ0UsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLO1lBQ3pCLE9BQU8sb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztZQUNsRCxDQUFDLG9CQUFvQixDQUFDLE1BQU07Z0JBQzFCLE9BQU8sb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxFQUNuRDtZQUNBLElBQUksb0JBQW9CLENBQUMsS0FBSyxLQUFLLFNBQVM7Z0JBQzFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO1lBQzlDLElBQUksb0JBQW9CLENBQUMsTUFBTSxLQUFLLFNBQVM7Z0JBQzNDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQyxLQUFLLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQXhFRCw2QkF3RUMifQ==