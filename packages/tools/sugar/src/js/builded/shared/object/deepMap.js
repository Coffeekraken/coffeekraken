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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZGVlcE1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBZ0Q7SUFDaEQsa0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCRztJQUNILFNBQVMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBYSxFQUFFLEtBQVU7UUFBekIseUJBQUEsRUFBQSxhQUFhO1FBQUUsc0JBQUEsRUFBQSxVQUFVO1FBQzNELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFdBQVcsRUFBRSxJQUFJO1NBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDL0IsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVqRSxJQUNFLFVBQVUsQ0FBQyxHQUFHO2dCQUNkLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVO2dCQUNwQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQ2Y7Z0JBQ0EsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3ZCLElBQ0UscUJBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQ3JEO29CQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLGtDQUNuRCxLQUFLO3dCQUNSLElBQUk7dUJBQ0osQ0FBQztvQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWM7d0JBQUUsT0FBTztpQkFDdEM7Z0JBQ0QsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0NBQUksS0FBSyxJQUFFLElBQUksR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxnQ0FBSSxLQUFLLElBQUUsSUFBSSxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUV4QixJQUNFLHFCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUNyRDtvQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsUUFBUSxrQ0FDbkQsS0FBSzt3QkFDUixJQUFJO3VCQUNKLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjO3dCQUFFLE9BQU87aUJBQ3RDO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==