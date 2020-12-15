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
        define(["require", "exports", "../../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    var upperFirst_1 = __importDefault(require("../../string/upperFirst"));
    /**
     * @name              return
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @wip
     *
     * Parse the return tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function returnTag(data) {
        var stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        return {
            type: stringArray[0]
                ? upperFirst_1.default(stringArray[0].replace('{', '').replace('}', '').trim())
                : '',
            description: stringArray[1] ? stringArray[1].trim() : ''
        };
    }
    return returnTag;
});
//# sourceMappingURL=return.js.map