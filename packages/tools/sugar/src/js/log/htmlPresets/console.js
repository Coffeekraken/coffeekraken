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
        define(["require", "exports", "../../html/replaceTags", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    var replaceTags_1 = __importDefault(require("../../html/replaceTags"));
    var chalk_1 = __importDefault(require("chalk"));
    chalk_1.default.level = 3;
    /**
     * @name                              console
     * @namespace           sugar.js.log.htmlPresets
     * @type                              Function
     * @wip
     *
     * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @param                   {String}                      text                        The text to process
     * @return                  {String}                                                  The processed text ready for the terminal
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function consoleFn(text) {
        return replaceTags_1.default(text, {
            black: function (tag, content) { return chalk_1.default.black(content); },
            red: function (tag, content) { return chalk_1.default.red(content); },
            green: function (tag, content) { return chalk_1.default.green(content); },
            yellow: function (tag, content) { return chalk_1.default.yellow(content); },
            blue: function (tag, content) { return chalk_1.default.blue(content); },
            magenta: function (tag, content) { return chalk_1.default.magenta(content); },
            cyan: function (tag, content) { return chalk_1.default.cyan(content); },
            white: function (tag, content) { return chalk_1.default.white(content); },
            bgBlack: function (tag, content) { return chalk_1.default.bgBlack(content); },
            bgRed: function (tag, content) { return chalk_1.default.bgRed(content); },
            bgGreen: function (tag, content) { return chalk_1.default.bgGreen(content); },
            bgYellow: function (tag, content) { return chalk_1.default.bgYellow(content); },
            bgBlue: function (tag, content) { return chalk_1.default.bgBlue(content); },
            bgMagenta: function (tag, content) { return chalk_1.default.bgMagenta(content); },
            bgCyan: function (tag, content) { return chalk_1.default.bgCyan(content); },
            bgWhite: function (tag, content) { return chalk_1.default.bgWhite(content); },
            bold: function (tag, content) { return chalk_1.default.bold(content); },
            dim: function (tag, content) { return chalk_1.default.dim(content); },
            italic: function (tag, content) { return chalk_1.default.italic(content); },
            underline: function (tag, content) { return chalk_1.default.underline(content); },
            strike: function (tag, content) { return chalk_1.default.strike(content); },
            br: function (tag, content) { return '\n'; }
        });
    }
    return consoleFn;
});
