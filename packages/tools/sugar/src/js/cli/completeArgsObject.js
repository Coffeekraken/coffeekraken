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
        define(["require", "exports", "../object/deepize", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepize_1 = __importDefault(require("../object/deepize"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name                completeArgsObject
     * @namespace          sugar.js.cli
     * @type                Function
     * @status              beta
     *
     * This function take an arguments object and complete it with the definition object default values
     * for missing args
     *
     * @param             {Object}            argsObj         The arguments object to complete
     * @param             {Object}            [settings={}]       An object of settings to configure your process:
     * - definition ({}) {Object}: Specify a definition to use
     * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
     * - descriptorSettings   ({})  {Object}: Specify some settings to pass to the SDescriptor instance used to validate the object
     * @return            {Object}                            The completed arguments object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function completeArgsObject(argsObj, settings) {
        if (settings === void 0) { settings = {}; }
        argsObj = Object.assign({}, argsObj);
        settings = deepMerge_1.default({
            definition: {},
            throw: true,
            descriptorSettings: {}
        }, settings);
        // loop on all the arguments
        Object.keys(settings.definition).forEach(function (argString) {
            var argDefinition = settings.definition[argString];
            // check if we have an argument passed in the properties
            if (argsObj[argString] === undefined &&
                argDefinition.default !== undefined) {
                argsObj[argString] = argDefinition.default;
            }
        });
        // return the argsObj
        return deepize_1.default(argsObj);
    }
    exports.default = completeArgsObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVBcmdzT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGxldGVBcmdzT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViw4REFBMEM7SUFDMUMsa0VBQThDO0lBSTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUNoRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFckMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsVUFBVSxFQUFFLEVBQUU7WUFDZCxLQUFLLEVBQUUsSUFBSTtZQUNYLGtCQUFrQixFQUFFLEVBQUU7U0FDdkIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLDRCQUE0QjtRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFTO1lBQ2pELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFckQsd0RBQXdEO1lBQ3hELElBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVM7Z0JBQ2hDLGFBQWEsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUNuQztnQkFDQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLE9BQU8saUJBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Qsa0JBQWUsa0JBQWtCLENBQUMifQ==