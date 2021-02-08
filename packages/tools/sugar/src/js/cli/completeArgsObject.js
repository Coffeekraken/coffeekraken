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
    return completeArgsObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVBcmdzT2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcGxldGVBcmdzT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7OztJQUVWLDhEQUEwQztJQUMxQyxrRUFBOEM7SUFJOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQ2hELE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVyQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxVQUFVLEVBQUUsRUFBRTtZQUNkLEtBQUssRUFBRSxJQUFJO1lBQ1gsa0JBQWtCLEVBQUUsRUFBRTtTQUN2QixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFNBQVM7WUFDakQsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyRCx3REFBd0Q7WUFDeEQsSUFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUztnQkFDaEMsYUFBYSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQ25DO2dCQUNBLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDO2FBQzVDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBcUI7UUFDckIsT0FBTyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCxPQUFTLGtCQUFrQixDQUFDIn0=