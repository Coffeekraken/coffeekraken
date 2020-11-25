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
        define(["require", "exports", "../../object/deepMerge", "../interface/SDefinitionObjectInterface", "./validateObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SDefinitionObjectInterface_1 = __importDefault(require("../interface/SDefinitionObjectInterface"));
    var validateObject_1 = __importDefault(require("./validateObject"));
    /**
     * @name            validateDefinitionObject
     * @namespace       sugar.js.validation.object
     * @type            Function
     * @wip
     *
     * This function simply take a definition object and validate it
     *
     * @param       {Object}          definitionObject        The definition object to validate
     * @param       {Object}          [settings={}]           An object of settings to configure your validation process:
     * - name (Unnamed) {String}: Specify a name for your definition object validation. It helps a lot when you need to debug things
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import validateDefinitionObject from '@coffeekraken/sugar/js/validation/object/validateDefinitionObject';
     * validateDefinitionObject({
     *    myProp: {
     *      type: 'String',
     *      required: true
     *    },
     *    otherProp: {
     *      type: 'Boolean'
     *    }
     * }); // => true
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateDefinitionObject(definitionObject, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            name: 'Unnamed'
        }, settings);
        var issuesObj = {
            $name: settings.name,
            $issues: [],
            $messages: {}
        };
        // loop on each definition object props
        Object.keys(definitionObject).forEach(function (argName) {
            var argDefinitionObj = definitionObject[argName];
            // validate this
            var res = validateObject_1.default(argDefinitionObj, SDefinitionObjectInterface_1.default.definitionObj, {
                throw: true,
                name: settings.name + "." + argName
            });
        });
    }
    return validateDefinitionObject;
});
