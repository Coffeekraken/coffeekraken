"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const toString_1 = __importDefault(require("../string/toString"));
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
    let oneLineText = text.replace(/\r\n/g, '|rn|');
    oneLineText = oneLineText.replace(/\n/g, '|n|');
    oneLineText = oneLineText.replace(/\r/g, '|r|');
    // loop on the tags
    Object.keys(tags).forEach((tagName) => {
        // create the match regex
        const reg = new RegExp(`<\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`, 'g');
        // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');
        const tagsArray = oneLineText.match(reg);
        const singleReg = new RegExp(`\\s?<${tagName}\\s?\/>\\s?`, 'g');
        const singleTagsArray = oneLineText.match(singleReg);
        if (tagsArray) {
            for (let i = 0; i < tagsArray.length; i++) {
                const t = tagsArray[i];
                const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`);
                if (!tagArgs)
                    continue;
                const tagToReplace = tagArgs[0];
                const tagContent = tagArgs[1];
                // call the replacement function
                oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
            }
        }
        if (singleTagsArray) {
            for (let i = 0; i < singleTagsArray.length; i++) {
                const t = singleTagsArray[i];
                const tagArgs = t.match(`\\s?<${tagName}\\s?\/>\\s?`);
                if (!tagArgs)
                    continue;
                const tagToReplace = tagArgs[0];
                const tagContent = '';
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
module.exports = replaceTags;
