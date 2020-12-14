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
        define(["require", "exports", "../../console/parseHtml", "../../string/toString", "../../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parseHtml_1 = __importDefault(require("../../console/parseHtml"));
    var toString_1 = __importDefault(require("../../string/toString"));
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    /**
     * @name                validateValueOutputString
     * @namespace           sugar.js.validation.value
     * @type                Function
     * @wip
     *
     * This function take the resulting object of the ```validateValue``` one and transform it into
     * a nice human readable string.
     *
     * @param         {Object}          validateValueResultObj           The validateValue resulting object
     * @return        {String}                                        A human readable string of the resulting object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import validateValueOutputString from '@coffeekraken/sugar/js/validation/object/validateValueOutputString';
     * import validateValue from '@coffeekraken/sugar/js/validation/object/validateValue';
     * const resultObj = validateValue(true, {
     *    type: 'String',
     *    required: true
     * });
     * validateValueOutputString(resultObj);
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateValueOutputString(validateValueResultObj, settings) {
        if (settings === void 0) { settings = {}; }
        var issuesArray = [];
        settings = deepMerge_1.default({
            name: settings.name || validateValueResultObj.$name,
            interface: settings.interface || validateValueResultObj.$interface
        });
        if (settings.name) {
            issuesArray.push("<yellow>\u2502</yellow> " + settings.name + "\n<yellow>\u2502</yellow>");
        }
        if (validateValueResultObj.$received) {
            var string = "<yellow>\u2502</yellow> - Received value: <yellow>" + toString_1.default(validateValueResultObj.$received.value, { beautify: true }) + "</yellow>";
            issuesArray.push(string);
        }
        validateValueResultObj.$issues.forEach(function (issue) {
            if (validateValueResultObj.$messages[issue]) {
                issuesArray.push("<yellow>\u2502</yellow> - " + validateValueResultObj.$messages[issue]);
            }
        });
        return parseHtml_1.default(issuesArray.join('\n')) + '\n';
    }
    return validateValueOutputString;
});
//# sourceMappingURL=module.js.map