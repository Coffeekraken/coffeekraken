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
        define(["require", "exports", "../html/replaceTags", "../config/sugar", "../string/upperFirst", "chalk", "../_js/console/parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    var replaceTags_1 = __importDefault(require("../html/replaceTags"));
    var sugar_1 = __importDefault(require("../config/sugar"));
    var upperFirst_1 = __importDefault(require("../string/upperFirst"));
    var chalk_1 = __importDefault(require("chalk"));
    var parseHtml_1 = require("../_js/console/parseHtml");
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
        var isArray = false;
        if (Array.isArray(message)) {
            isArray = true;
        }
        else {
            message = [message];
        }
        var tagsMap = Object.assign({}, parseHtml_1.tagsMap);
        var sugarColors = Object.keys(sugar_1.default('colors')).filter(function (c) { return c !== 'terminal'; });
        var terminalColors = Object.keys(sugar_1.default('terminal.colors'));
        var colorsObj = {};
        sugarColors.forEach(function (name) {
            colorsObj[name] = sugar_1.default("colors." + name + ".color");
        });
        terminalColors.forEach(function (name) {
            colorsObj[name] = sugar_1.default("terminal.colors." + name + ".color");
        });
        message = message.map(function (m) {
            Object.keys(colorsObj).forEach(function (c) {
                var cValue = colorsObj[c];
                tagsMap[c] = function (tag, content) { return chalk_1.default.hex(cValue)(content); };
                tagsMap["bg" + upperFirst_1.default(c)] = function (tag, content) {
                    return chalk_1.default.bgHex(cValue)(content);
                };
            });
            return replaceTags_1.default(m, tagsMap);
        });
        if (isArray)
            return message;
        return message[0];
    }
    return parseHtml;
});
