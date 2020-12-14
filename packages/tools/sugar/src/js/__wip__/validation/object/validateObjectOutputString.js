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
        define(["require", "exports", "../value/validateValueOutputString", "../../console/parseHtml", "../../string/trimLines"], factory);
    }
})(function (require, exports) {
    "use strict";
    var validateValueOutputString_1 = __importDefault(require("../value/validateValueOutputString"));
    var parseHtml_1 = __importDefault(require("../../console/parseHtml"));
    var trimLines_1 = __importDefault(require("../../string/trimLines"));
    /**
     * @name                validateObjectOutputString
     * @namespace           sugar.js.validation.object
     * @type                Function
     * @wip
     *
     * This function take the resulting object of the ```validateObject``` one and transform it into
     * a nice human readable string.
     *
     * @param         {Object}          validateObjectResultObj           The validateObject resulting object
     * @return        {String}                                        A human readable string of the resulting object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import validateObjectOutputString from '@coffeekraken/sugar/js/validation/object/validateObjectOutputString';
     * import validateObject from '@coffeekraken/sugar/js/validation/object/validateObject';
     * const resultObj = validateObject({
     *    plop: true,
     *    hello: 'world'
     * }, {
     *    plop: {
     *      type: 'String',
     *      required: true
     *    },
     *    hello: {
     *      type: 'String',
     *      required: true
     *    }
     * });
     * validateObjectOutputString(resultObj);
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function validateObjectOutputString(validateObjectResultObj, settings) {
        if (settings === void 0) { settings = {}; }
        var stringsArray = [];
        stringsArray.push(trimLines_1.default("\n  <underline><green>Object validation</green></underline>\n\n  " + (validateObjectResultObj.$interface
            ? "- Interface:  <cyan>" + validateObjectResultObj.$interface + "</cyan>"
            : '') + "\n  - Name:       <yellow>" + (validateObjectResultObj.$name || 'unnamed') + "</yellow>\n  - Error" + (validateObjectResultObj.$issues.length > 1 ? 's' : '') + ":" + (validateObjectResultObj.$issues.length > 1 ? '' : ' ') + "     <red>" + validateObjectResultObj.$issues.length + "</red>\n  - Propert" + (validateObjectResultObj.$issues.length > 1 ? 'ies' : 'y') + ":" + (validateObjectResultObj.$issues.length > 1 ? '' : '  ') + " " + validateObjectResultObj.$issues
            .map(function (v) {
            return "<magenta>" + v + "</magenta>";
        })
            .join(', ')));
        validateObjectResultObj.$issues.forEach(function (attrName) {
            var attrIssueObj = validateObjectResultObj[attrName];
            var string = validateValueOutputString_1.default(attrIssueObj, {
                interface: validateObjectResultObj.$interface,
                name: "<yellow>" + validateObjectResultObj.$name + "</yellow>.<magenta>" + attrName + "</magenta>"
            });
            stringsArray.push(string);
        });
        return parseHtml_1.default(stringsArray.join('\n\n'));
    }
    return validateObjectOutputString;
});
//# sourceMappingURL=module.js.map