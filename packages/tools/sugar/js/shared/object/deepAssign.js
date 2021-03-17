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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2RlZXBBc3NpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLDJEQUF1QztJQUN2QyxrRUFBZ0Q7SUFDaEQsa0RBQThCO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBd0IsVUFBVSxDQUFDLFlBQVk7UUFDN0MsNkJBQTZCO1FBQzdCLHFDQUFxQztRQUNyQyxNQUFNO1FBQ04sdUJBQXVCO1FBSndCLGlCQUFVO2FBQVYsVUFBVSxFQUFWLHFCQUFVLEVBQVYsSUFBVTtZQUFWLGdDQUFVOztRQU16RCxJQUFNLFFBQVEsR0FBRztZQUNmLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDO1FBRUYsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVU7WUFDL0IscUJBQXFCO1lBQ3JCLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLHFDQUFxQztZQUNyQyxLQUFrQixVQUF1QixFQUF2QixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQXZCLGNBQXVCLEVBQXZCLElBQXVCLEVBQUU7Z0JBQXRDLElBQU0sR0FBRyxTQUFBO2dCQUNaLGlCQUFpQjtnQkFDakIsSUFDRSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM5QjtvQkFDQSxJQUFNLFFBQVEsR0FBRyxnQkFBUSxpQ0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ2hFLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQ3ZCLFNBQVM7aUJBQ1Y7Z0JBRUQsa0JBQWtCO2dCQUNsQixJQUNFLFFBQVEsQ0FBQyxNQUFNLEtBQUssSUFBSTtvQkFDeEIscUJBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLHFCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQ2hDO29CQUNBLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxTQUFTO2lCQUNWO2dCQUVELElBQUkscUJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO29CQUM1RCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsZUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDckMsSUFBSSxFQUFFLElBQUk7cUJBQ1gsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLGlCQUFpQjtvQkFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDL0I7YUFDRjtZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMvRCxJQUNFLENBQUMsb0JBQW9CLENBQUMsS0FBSztZQUN6QixPQUFPLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7WUFDbEQsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNO2dCQUMxQixPQUFPLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsRUFDbkQ7WUFDQSxJQUFJLG9CQUFvQixDQUFDLEtBQUssS0FBSyxTQUFTO2dCQUMxQyxRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFvQixDQUFDLEtBQUssQ0FBQztZQUM5QyxJQUFJLG9CQUFvQixDQUFDLE1BQU0sS0FBSyxTQUFTO2dCQUMzQyxRQUFRLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQztZQUNoRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDZjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEMsS0FBSyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUF4RUQsNkJBd0VDIn0=