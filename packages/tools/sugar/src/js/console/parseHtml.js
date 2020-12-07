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
        define(["require", "exports", "../html/replaceTags", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.tagsMap = void 0;
    var replaceTags_1 = __importDefault(require("../html/replaceTags"));
    var chalk_1 = __importDefault(require("chalk"));
    chalk_1.default.level = 3;
    /**
     * @name                                parseHtml
     * @namespace          sugar.js.console
     * @type                                Function
     *
     * Parse the simple html tags to format the console message
     *
     * @param           {String|Array}                  message                 The message to format of an array of messages to format
     * @return          {String}                                          The formated message
     *
     * @todo        interface
     * @todo        doc
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.tagsMap = {
        black: function (tag, content) { return chalk_1.default.black(content); },
        red: function (tag, content) { return chalk_1.default.red(content); },
        green: function (tag, content) { return chalk_1.default.green(content); },
        yellow: function (tag, content) { return chalk_1.default.yellow(content); },
        blue: function (tag, content) { return chalk_1.default.blue(content); },
        magenta: function (tag, content) { return chalk_1.default.magenta(content); },
        cyan: function (tag, content) { return chalk_1.default.cyan(content); },
        white: function (tag, content) { return chalk_1.default.white(content); },
        grey: function (tag, content) { return chalk_1.default.grey(content); },
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
        h1: function (tag, content) {
            return chalk_1.default.underline(chalk_1.default.bold(content)) + '\n\n';
        },
        h2: function (tag, content) {
            return chalk_1.default.bold(content) + '\n';
        },
        iWarn: function (tag, content) { return parseHtml('<yellow>⚠</yellow> '); },
        iCheck: function (tag, content) { return parseHtml("<green>\u2713</green> "); },
        iCross: function (tag, content) { return parseHtml("<red>\u2716</red> "); },
        iClose: function (tag, content) { return "\u2716"; },
        iStart: function (tag, content) { return parseHtml("<green>\u2023</green> "); },
        date: function (tag, content) {
            return new Date().getDate().toString().padStart('0', 2) +
                '-' +
                (new Date().getMonth() + 1).toString().padStart('0', 2) +
                '-' +
                new Date().getFullYear().toString().padStart('0', 2);
        },
        time: function (tag, content) {
            return new Date().getHours().toString().padStart('0', 2) +
                ':' +
                new Date().getMinutes().toString().padStart('0', 2) +
                ':' +
                new Date().getMinutes().toString().padStart('0', 2);
        },
        day: function (tag, content) { return new Date().getDate().toString().padStart('0', 2); },
        days: function (tag, content) { return new Date().getDate().toString().padStart('0', 2); },
        month: function (tag, content) { return new Date().getMonth().toString().padStart('0', 2); },
        months: function (tag, content) { return new Date().getMonth().toString().padStart('0', 2); },
        year: function (tag, content) { return new Date().getFullYear().toString().padStart('0', 2); },
        years: function (tag, content) { return new Date().getFullYear().toString().padStart('0', 2); },
        hour: function (tag, content) { return new Date().getHours().toString().padStart('0', 2); },
        hours: function (tag, content) { return new Date().getHours().toString().padStart('0', 2); },
        minute: function (tag, content) { return new Date().getMinutes().toString().padStart('0', 2); },
        minutes: function (tag, content) {
            return new Date().getMinutes().toString().padStart('0', 2);
        },
        second: function (tag, content) { return new Date().getSeconds().toString().padStart('0', 2); },
        seconds: function (tag, content) {
            return new Date().getSeconds().toString().padStart('0', 2);
        },
        br: function (tag, content) { return '\n'; }
    };
    function parseHtml(message) {
        var isArray = false;
        if (Array.isArray(message)) {
            isArray = true;
        }
        else {
            message = [message];
        }
        message = message.map(function (m) {
            return replaceTags_1.default(m, exports.tagsMap);
        });
        if (isArray)
            return message;
        return message[0];
    }
    return parseHtml;
});
//# sourceMappingURL=parseHtml.js.map