"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepize_1 = __importDefault(require("../object/deepize"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const toString_1 = __importDefault(require("../string/toString"));
const validateObject_1 = __importDefault(require("../validation/object/validateObject"));
/**
 * @name                completeArgsObject
 * @namespace          sugar.js.cli
 * @type                Function
 *
 * This function take an arguments object and complete it with the definition object default values
 * for missing args
 *
 * @param             {Object}            argsObj         The arguments object to complete
 * @param             {Object}            [settings={}]       An object of settings to configure your process:
 * - definitionObj ({}) {Object}: Specify a definitionObj to use
 * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
 * @return            {Object}                            The completed arguments object
 *
 * @example         js
 * import completeArgsObject from '@coffeekraken/sugar/js/cli/completeArgsObject';
 *
 * @since       2.0.0
 *
 */
function completeArgsObject(argsObj, settings = {}) {
    argsObj = Object.assign({}, argsObj);
    settings = deepMerge_1.default({
        definitionObj: {},
        throw: true
    }, settings);
    // loop on all the arguments
    Object.keys(settings.definitionObj).forEach((argString) => {
        const argDefinitionObj = settings.definitionObj[argString];
        // check if we have an argument passed in the properties
        if (argsObj[argString] === undefined &&
            argDefinitionObj.default !== undefined) {
            argsObj[argString] = argDefinitionObj.default;
        }
    });
    // make sure all is ok
    const argsValidationResult = validateObject_1.default(argsObj, settings.definitionObj, settings);
    if (argsValidationResult !== true && settings.throw)
        throw new Error(toString_1.default(argsValidationResult));
    else if (argsValidationResult !== true)
        return argsValidationResult;
    // return the argsObj
    return deepize_1.default(argsObj);
}
exports.default = completeArgsObject;
