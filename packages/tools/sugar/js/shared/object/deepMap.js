// @ts-nocheck
// @shared
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
        define(["require", "exports", "../is/plainObject", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name            deepMap
     * @namespace           sugar.js.object
     * @type            Function
     * @stable
     *
     * This function is the same as the "map" one. The only difference is that this one goes deep into the object
     *
     * @param         {Object}        object          The object you want to map through
     * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
     * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
     * - processObjects (false) {Boolean}: Specify if you want the objects to be processed the same as other values
     * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
     * - handleArray (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
     * deepMap({
     *    hello: 'world'
     * }, (value, prop, fullPath) => {
     *    return '~ ' + value;
     * });
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepMap(object, processor, settings, _path) {
        if (settings === void 0) { settings = {}; }
        if (_path === void 0) { _path = []; }
        settings = deepMerge_1.default({
            deepFirst: false,
            processObjects: false,
            handleArray: true
        }, settings);
        Object.keys(object).forEach(function (prop) {
            var descriptor = Object.getOwnPropertyDescriptor(object, prop);
            if (descriptor.get &&
                typeof descriptor.get === 'function' &&
                !descriptor.set) {
                return;
            }
            if (!settings.deepFirst) {
                if (plainObject_1.default(object[prop]) ||
                    (Array.isArray(object[prop]) && settings.handleArray)) {
                    object[prop] = deepMap(object[prop], processor, settings, __spreadArray(__spreadArray([], _path), [
                        prop
                    ]));
                    if (!settings.processObjects)
                        return;
                }
                var res = processor(object[prop], prop, __spreadArray(__spreadArray([], _path), [prop]).join('.'));
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
            }
            else {
                var res = processor(object[prop], prop, __spreadArray(__spreadArray([], _path), [prop]).join('.'));
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
                if (plainObject_1.default(object[prop]) ||
                    (Array.isArray(object[prop]) && settings.handleArray)) {
                    object[prop] = deepMap(object[prop], processor, settings, __spreadArray(__spreadArray([], _path), [
                        prop
                    ]));
                    if (!settings.processObjects)
                        return;
                }
            }
        });
        return object;
    }
    exports.default = deepMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2RlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQWdEO0lBQ2hELGtFQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E2Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQWEsRUFBRSxLQUFVO1FBQXpCLHlCQUFBLEVBQUEsYUFBYTtRQUFFLHNCQUFBLEVBQUEsVUFBVTtRQUMzRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxTQUFTLEVBQUUsS0FBSztZQUNoQixjQUFjLEVBQUUsS0FBSztZQUNyQixXQUFXLEVBQUUsSUFBSTtTQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQy9CLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFakUsSUFDRSxVQUFVLENBQUMsR0FBRztnQkFDZCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssVUFBVTtnQkFDcEMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUNmO2dCQUNBLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUN2QixJQUNFLHFCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUNyRDtvQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxrQ0FDbkQsS0FBSzt3QkFDUixJQUFJO3VCQUNKLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO3dCQUFFLE9BQU87aUJBQ3RDO2dCQUNELElBQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdDQUFJLEtBQUssSUFBRSxJQUFJLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RFLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0NBQUksS0FBSyxJQUFFLElBQUksR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFFeEIsSUFDRSxxQkFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFDckQ7b0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsa0NBQ25ELEtBQUs7d0JBQ1IsSUFBSTt1QkFDSixDQUFDO29CQUNILElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYzt3QkFBRSxPQUFPO2lCQUN0QzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsT0FBTyxDQUFDIn0=