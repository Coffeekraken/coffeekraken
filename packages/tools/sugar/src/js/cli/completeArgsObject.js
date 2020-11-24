// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepize", "../object/deepMerge", "../string/toString", "../validation/object/validateObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepize_1 = __importDefault(require("../object/deepize"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var toString_1 = __importDefault(require("../string/toString"));
    var validateObject_2 = __importDefault(require("../validation/object/validateObject"));
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
     * - definitionObj ({}) {Object}: Specify a definitionObj to use
     * - throw (true) {Boolean}: Specify if you want to throw an error when the validation process fails
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
        settings = deepMerge_2.default({
            definitionObj: {},
            throw: true
        }, settings);
        // loop on all the arguments
        Object.keys(settings.definitionObj).forEach(function (argString) {
            var argDefinitionObj = settings.definitionObj[argString];
            // check if we have an argument passed in the properties
            if (argsObj[argString] === undefined &&
                argDefinitionObj.default !== undefined) {
                argsObj[argString] = argDefinitionObj.default;
            }
        });
        // make sure all is ok
        var argsValidationResult = validateObject_2.default(argsObj, settings.definitionObj, settings);
        if (argsValidationResult !== true && settings.throw)
            throw new Error(toString_1.default(argsValidationResult));
        else if (argsValidationResult !== true)
            return argsValidationResult;
        // return the argsObj
        return deepize_1.default(argsObj);
    }
    return completeArgsObject;
});
