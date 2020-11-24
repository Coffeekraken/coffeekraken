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
        define(["require", "exports", "./parseHtml"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parseHtml_1 = __importDefault(require("./parseHtml"));
    /**
     * @name                                parseMarkdown
     * @namespace           sugar.node.terminal
     * @type                                Function
     * @wip
     *
     * Parse the simple markdown tags to format the terminal message
     *
     * @param           {String|Array}                  message                 The message to format of an array of messages to format
     * @return          {String}                                          The formated message
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     * @todo      move in "format" folder
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseMarkdown(message) {
        var isArray = false;
        if (Array.isArray(message)) {
            isArray = true;
        }
        else {
            message = [message];
        }
        message = message.map(function (m) {
            var h1Reg = /#\s(.*\n?)/g;
            var h1Matches = m.match(h1Reg);
            if (h1Matches) {
                m = m.replace(h1Matches[0], "<h1>" + h1Matches[0].replace(/^#\s/, '').trim() + "</h1>");
            }
            var h2Reg = /##\s(.*\n?)/g;
            var h2Matches = m.match(h2Reg);
            if (h2Matches) {
                m = m.replace(h2Matches[0], "<h2>" + h2Matches[0].replace(/^##\s/, '').trim() + "</h2>");
            }
            if (m.match(/^#success\s/)) {
                m = "<iCheck/> " + m.replace(/^#success\s/, '');
            }
            if (m.match(/^#start\s/)) {
                m = "<iStart/> " + m.replace(/^#start\s/, '');
            }
            if (m.match(/^#error\s/)) {
                m = "<iCross/> " + m.replace(/^#error\s/, '');
            }
            if (m.match(/^#warning\s/)) {
                m = "<iWarn/> " + m.replace(/^#warning\s/, '');
            }
            if (m.match(/^#warn\s/)) {
                m = "<iWarn/> " + m.replace(/^#warn\s/, '');
            }
            return parseHtml_1.default(m.trim());
        });
        if (isArray)
            return message;
        return message[0];
    }
    return parseMarkdown;
});
