"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parse_1 = __importDefault(require("../../string/parse"));
const upperFirst_1 = __importDefault(require("../../string/upperFirst"));
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
    const res = {};
    data.forEach((param) => {
        if (typeof param !== 'object' ||
            !param.value ||
            typeof param.value !== 'string')
            return;
        const parts = param.value.split(/\s{2,20000}/).map((l) => l.trim());
        let type = parts && parts[0]
            ? upperFirst_1.default(parts[0].replace('{', '').replace('}', ''))
            : null;
        const variable = parts && parts[1] ? parts[1] : null;
        const description = parts && parts[2] ? parts[2] : null;
        let name = variable;
        let defaultValue = undefined;
        let variableMatch = null;
        if (variable && typeof variable === 'string')
            variableMatch = variable.match(/^\[(.*)\]$/);
        if (type && type.includes('|')) {
            type = type.split('|').map((l) => upperFirst_1.default(l.trim()));
        }
        if (variableMatch) {
            const variableParts = variableMatch[1].split('=');
            if (variableParts.length === 2) {
                name = variableParts[0].trim();
                defaultValue = parse_1.default(variableParts[1].trim());
            }
        }
        res[name] = {
            name,
            type,
            description,
            default: defaultValue
        };
        if (param.content)
            res[name].content = param.content.join('\n');
    });
    return res;
}
module.exports = param;
