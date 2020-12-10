"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepize_1 = __importDefault(require("../object/deepize"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name                completeArgsObject
 * @namespace          sugar.js.cli
 * @type                Function
 * @beta
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
function completeArgsObject(argsObj, settings = {}) {
    argsObj = Object.assign({}, argsObj);
    settings = deepMerge_1.default({
        definition: {},
        throw: true,
        descriptorSettings: {}
    }, settings);
    // loop on all the arguments
    Object.keys(settings.definition).forEach((argString) => {
        const argDefinition = settings.definition[argString];
        // check if we have an argument passed in the properties
        if (argsObj[argString] === undefined &&
            argDefinition.default !== undefined) {
            argsObj[argString] = argDefinition.default;
        }
    });
    // return the argsObj
    return deepize_1.default(argsObj);
}
module.exports = completeArgsObject;
//# sourceMappingURL=module.js.map