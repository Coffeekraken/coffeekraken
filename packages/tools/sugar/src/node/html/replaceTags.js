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
        define(["require", "exports", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @name                            replaceTags
     * @namespace           sugar.js.html
     * @type                            Function
     * @stable
     *
     * Replace all the html tags that you specify by something else that you can fully choose
     *
     * @param               {String}                 text                           The text in which replace all the tags
     * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
     * @return              {String}                                                The new text
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * import replaceTags from '@coffeekraken/sugar/js/html/replaceTags';
     * replaceTags('<span>Hello</span> world', {
     *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
     * });
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function replaceTags(text, tags) {
        if (!text)
            text = '';
        text = toString_1.default(text);
        var oneLineText = text.replace(/\r\n/g, '|rn|');
        oneLineText = oneLineText.replace(/\n/g, '|n|');
        oneLineText = oneLineText.replace(/\r/g, '|r|');
        // loop on the tags
        Object.keys(tags).forEach(function (tagName) {
            // create the match regex
            var reg = new RegExp("<s*" + tagName + "[^>]*>((.*?))<\\s*/\\s*" + tagName + ">", 'g');
            // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');
            var tagsArray = oneLineText.match(reg);
            var singleReg = new RegExp("\\s?<" + tagName + "\\s?/>\\s?", 'g');
            var singleTagsArray = oneLineText.match(singleReg);
            if (tagsArray) {
                for (var i = 0; i < tagsArray.length; i++) {
                    var t = tagsArray[i];
                    var tagArgs = t.match("<\\s*" + tagName + "[^>]*>((.*?))<\\s*/\\s*" + tagName + ">");
                    if (!tagArgs)
                        continue;
                    var tagToReplace = tagArgs[0];
                    var tagContent = tagArgs[1];
                    // call the replacement function
                    oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
                }
            }
            if (singleTagsArray) {
                for (var i = 0; i < singleTagsArray.length; i++) {
                    var t = singleTagsArray[i];
                    var tagArgs = t.match("\\s?<" + tagName + "\\s?/>\\s?");
                    if (!tagArgs)
                        continue;
                    var tagToReplace = tagArgs[0];
                    var tagContent = '';
                    // call the replacement function
                    oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
                }
            }
        });
        oneLineText = oneLineText.replace(/\|rn\|/g, '\r\n');
        oneLineText = oneLineText.replace(/\|n\|/g, '\n');
        oneLineText = oneLineText.replace(/\|r\|/g, '\r');
        return oneLineText;
    }
    return replaceTags;
});
