"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const replaceTags_1 = __importDefault(require("../html/replaceTags"));
const sugar_1 = __importDefault(require("../config/sugar"));
const upperFirst_1 = __importDefault(require("../string/upperFirst"));
const chalk_1 = __importDefault(require("chalk"));
const parseHtml_1 = require("../console/parseHtml");
chalk_1.default.level = 3;
// TODO tests
/**
 * @name                                parseHtml
 * @namespace           sugar.node.terminal
 * @type                                Function
 * @wip
 *
 * Parse the simple html tags to format the terminal message
 *
 * @param           {String|Array}                  message                 The message to format of an array of messages to format
 * @return          {String}                                          The formated message
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseHtml(message) {
    let isArray = false;
    if (Array.isArray(message)) {
        isArray = true;
    }
    else {
        message = [message];
    }
    const tagsMap = Object.assign({}, parseHtml_1.tagsMap);
    const sugarColors = Object.keys(sugar_1.default('colors')).filter((c) => c !== 'terminal');
    const terminalColors = Object.keys(sugar_1.default('terminal.colors'));
    const colorsObj = {};
    sugarColors.forEach((name) => {
        colorsObj[name] = sugar_1.default(`colors.${name}.color`);
    });
    terminalColors.forEach((name) => {
        colorsObj[name] = sugar_1.default(`terminal.colors.${name}.color`);
    });
    message = message.map((m) => {
        Object.keys(colorsObj).forEach((c) => {
            const cValue = colorsObj[c];
            tagsMap[c] = (tag, content) => chalk_1.default.hex(cValue)(content);
            tagsMap[`bg${upperFirst_1.default(c)}`] = (tag, content) => chalk_1.default.bgHex(cValue)(content);
        });
        return replaceTags_1.default(m, tagsMap);
    });
    if (isArray)
        return message;
    return message[0];
}
module.exports = parseHtml;
