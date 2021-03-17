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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5naWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9qc29uL3N0cmluZ2lmeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQThDO0lBQzlDLDJDQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUNILFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxrQkFBeUIsRUFBRSxRQUFhO1FBQXhDLG1DQUFBLEVBQUEseUJBQXlCO1FBQUUseUJBQUEsRUFBQSxhQUFhO1FBQzlELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLElBQUk7U0FDakIsRUFDRCxrQkFBa0IsS0FBSyxJQUFJLElBQUksT0FBTyxrQkFBa0IsS0FBSyxRQUFRO1lBQ25FLENBQUMsQ0FBQyxrQkFBa0I7WUFDcEIsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO1FBQ0YsSUFBTSxRQUFRLEdBQ1osT0FBTyxrQkFBa0IsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFdkUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFRLENBQUMsVUFBVTtZQUFFLE1BQU0sR0FBRyxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=