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
        define(["require", "exports", "../../string/parse", "../../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parse_1 = __importDefault(require("../../string/parse"));
    var upperFirst_1 = __importDefault(require("../../string/upperFirst"));
    /**
     * @name              param
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @wip
     *
     * Parse the param tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @param      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function param(data) {
        if (!Array.isArray(data))
            data = [data];
        var res = {};
        data.forEach(function (param) {
            if (typeof param !== 'object' ||
                !param.value ||
                typeof param.value !== 'string')
                return;
            var parts = param.value.split(/\s{2,20000}/).map(function (l) { return l.trim(); });
            var type = parts && parts[0]
                ? upperFirst_1.default(parts[0].replace('{', '').replace('}', ''))
                : null;
            var variable = parts && parts[1] ? parts[1] : null;
            var description = parts && parts[2] ? parts[2] : null;
            var name = variable;
            var defaultValue = undefined;
            var variableMatch = null;
            if (variable && typeof variable === 'string')
                variableMatch = variable.match(/^\[(.*)\]$/);
            if (type && type.includes('|')) {
                type = type.split('|').map(function (l) { return upperFirst_1.default(l.trim()); });
            }
            if (variableMatch) {
                var variableParts = variableMatch[1].split('=');
                if (variableParts.length === 2) {
                    name = variableParts[0].trim();
                    defaultValue = parse_1.default(variableParts[1].trim());
                }
            }
            res[name] = {
                name: name,
                type: type,
                description: description,
                default: defaultValue
            };
            if (param.content)
                res[name].content = param.content.join('\n');
        });
        return res;
    }
    return param;
});
