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
        define(["require", "exports", "../../html/replaceTags"], factory);
    }
})(function (require, exports) {
    "use strict";
    var replaceTags_1 = __importDefault(require("../../html/replaceTags"));
    /**
     * @name                              mail
     * @namespace           sugar.js.log.htmlPresets
     * @type                              Function
     * @wip
     *
     * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
     *
     * @param                   {String}                      text                        The text to process
     * @return                  {String}                                                  The processed text ready for the terminal
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function mail(text) {
        return replaceTags_1.default(text, {
            black: function (tag, content) { return "<span style=\"color: black\">" + content + "</span>"; },
            red: function (tag, content) { return "<span style=\"color: #FF0000\">" + content + "</span>"; },
            green: function (tag, content) { return "<span style=\"color: #008000\">" + content + "</span>"; },
            yellow: function (tag, content) { return "<span style=\"color: #F1C40F\">" + content + "</span>"; },
            blue: function (tag, content) { return "<span style=\"color: #0000FF\">" + content + "</span>"; },
            magenta: function (tag, content) { return "<span style=\"color: #800080\">" + content + "</span>"; },
            cyan: function (tag, content) { return "<span style=\"color: #5DADE2\">" + content + "</span>"; },
            white: function (tag, content) { return "<span style=\"color: white\">" + content + "</span>"; },
            bgBlack: function (tag, content) {
                return "<span style=\"background-color: black\">" + content + "</span>";
            },
            bgRed: function (tag, content) {
                return "<span style=\"background-color: #FF0000\">" + content + "</span>";
            },
            bgGreen: function (tag, content) {
                return "<span style=\"background-color: #008000\">" + content + "</span>";
            },
            bgYellow: function (tag, content) {
                return "<span style=\"background-color: #F1C40F\">" + content + "</span>";
            },
            bgBlue: function (tag, content) {
                return "<span style=\"background-color: #0000FF\">" + content + "</span>";
            },
            bgMagenta: function (tag, content) {
                return "<span style=\"background-color: #800080\">" + content + "</span>";
            },
            bgCyan: function (tag, content) {
                return "<span style=\"background-color: #5DADE2\">" + content + "</span>";
            },
            bgWhite: function (tag, content) {
                return "<span style=\"background-color: white\">" + content + "</span>";
            },
            bold: function (tag, content) {
                return "<span style=\"font-weight: bold;\">" + content + "</span>";
            },
            dim: function (tag, content) { return "<span style=\"\">" + content + "</span>"; },
            italic: function (tag, content) {
                return "<span style=\"font-style: italic;\">" + content + "</span>";
            },
            underline: function (tag, content) {
                return "<span style=\"font-style: underline;\">" + content + "</span>";
            },
            strike: function (tag, content) {
                return "<span text-decoration=\"line-through;\">" + content + "</span>";
            },
            br: function (tag, content) { return '<br />'; }
        });
    }
    return mail;
});
