// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "json-cyclic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var json_cyclic_1 = require("json-cyclic");
    /**
     * @name            stringify
     * @namespace       sugar.js.json
     * @type            Function
     * @status              beta
     *
     * This function do the same as the ```JSON.stringify``` one but add some features.
     *
     * @feature       2.0.0         Remove circular dependencies by default
     *
     * @param         {Object}        obj       The object to stringify
     * @param         {Function}    [replacerOrSettings=null]       A function that alters the behavior of the stringification process. You can also pass the settings object here
     * @param         {Object}      [settings={}]         An object of settings to configure your process:
     * - space (null) {Number}: A String or Number object that's used to insert white space into the output JSON string
     * - decircular (true) {Boolean}: Specify if you want to remove circular dependencies or not
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import stringify from '@coffeekraken/sugar/js/json/stringify';
     * stringify({
     *    hello: 'world'
     * }); // => {"hello":"world"}
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function stringify(obj, replacerOrSettings, settings) {
        if (replacerOrSettings === void 0) { replacerOrSettings = null; }
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            space: null,
            decircular: true
        }, replacerOrSettings !== null && typeof replacerOrSettings === 'object'
            ? replacerOrSettings
            : settings);
        var replacer = typeof replacerOrSettings === 'function' ? replacerOrSettings : null;
        var newObj = Object.assign({}, obj);
        if (settings.decircular)
            newObj = json_cyclic_1.decycle(newObj);
        return JSON.stringify(newObj, replacer, settings.space);
    }
    exports.default = stringify;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2pzb24vc3RyaW5naWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixrRUFBOEM7SUFDOUMsMkNBQXNDO0lBRXRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNEJHO0lBQ0gsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLGtCQUF5QixFQUFFLFFBQWE7UUFBeEMsbUNBQUEsRUFBQSx5QkFBeUI7UUFBRSx5QkFBQSxFQUFBLGFBQWE7UUFDOUQsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLElBQUk7WUFDWCxVQUFVLEVBQUUsSUFBSTtTQUNqQixFQUNELGtCQUFrQixLQUFLLElBQUksSUFBSSxPQUFPLGtCQUFrQixLQUFLLFFBQVE7WUFDbkUsQ0FBQyxDQUFDLGtCQUFrQjtZQUNwQixDQUFDLENBQUMsUUFBUSxDQUNiLENBQUM7UUFDRixJQUFNLFFBQVEsR0FDWixPQUFPLGtCQUFrQixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUV2RSxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsQ0FBQyxVQUFVO1lBQUUsTUFBTSxHQUFHLHFCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==