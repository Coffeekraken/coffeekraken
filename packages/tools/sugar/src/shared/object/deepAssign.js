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
    const unique_1 = __importDefault(require("../array/unique"));
    const plainObject_1 = __importDefault(require("../is/plainObject"));
    const clone_1 = __importDefault(require("./clone"));
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
    function deepAssign(referenceObj, ...objects) {
        // objects.forEach((obj) => {
        //   __deepAssign(referenceObj, obj);
        // });
        // return referenceObj;
        const settings = {
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
            for (const key of Object.keys(mixWithObj)) {
                // merging arrays
                if (settings.array === true &&
                    Array.isArray(refObj[key]) &&
                    Array.isArray(mixWithObj[key])) {
                    const newArray = unique_1.default([...refObj[key], ...mixWithObj[key]]);
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
        const potentialSettingsObj = objects[objects.length - 1] || {};
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
        for (let i = 0; i < objects.length; i++) {
            const toMergeObj = objects[i] || {};
            merge(referenceObj, toMergeObj);
        }
        return referenceObj;
    }
    exports.default = deepAssign;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcEFzc2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBBc3NpZ24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw2REFBdUM7SUFDdkMsb0VBQWdEO0lBQ2hELG9EQUE4QjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQXdCLFVBQVUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxPQUFPO1FBQ3pELDZCQUE2QjtRQUM3QixxQ0FBcUM7UUFDckMsTUFBTTtRQUNOLHVCQUF1QjtRQUV2QixNQUFNLFFBQVEsR0FBRztZQUNmLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixXQUFXLEVBQUUsSUFBSTtTQUNsQixDQUFDO1FBRUYsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVU7WUFDL0IscUJBQXFCO1lBQ3JCLGdEQUFnRDtZQUNoRCw0Q0FBNEM7WUFDNUMseUNBQXlDO1lBQ3pDLHFDQUFxQztZQUNyQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3pDLGlCQUFpQjtnQkFDakIsSUFDRSxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUk7b0JBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMxQixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM5QjtvQkFDQSxNQUFNLFFBQVEsR0FBRyxnQkFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUN2QixTQUFTO2lCQUNWO2dCQUVELGtCQUFrQjtnQkFDbEIsSUFDRSxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUk7b0JBQ3hCLHFCQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1QixxQkFBZSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUNoQztvQkFDQSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbEQsU0FBUztpQkFDVjtnQkFFRCxJQUFJLHFCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtvQkFDNUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGVBQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3JDLElBQUksRUFBRSxJQUFJO3FCQUNYLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxpQkFBaUI7b0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQy9CO2FBQ0Y7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDL0QsSUFDRSxDQUFDLG9CQUFvQixDQUFDLEtBQUs7WUFDekIsT0FBTyxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO1lBQ2xELENBQUMsb0JBQW9CLENBQUMsTUFBTTtnQkFDMUIsT0FBTyxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLEVBQ25EO1lBQ0EsSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLEtBQUssU0FBUztnQkFDMUMsUUFBUSxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUM7WUFDOUMsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEtBQUssU0FBUztnQkFDM0MsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUM7WUFDaEQsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BDLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDakM7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBeEVELDZCQXdFQyJ9