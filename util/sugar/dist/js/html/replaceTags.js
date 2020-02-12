"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceTags;

/**
 * @name                            replaceTags
 * @namespace                       sugar.js.html
 * @type                            Function
 *
 * Replace all the html tags that you specify by something else that you can fully choose
 *
 * @param               {String}                 text                           The text in which replace all the tags
 * @param               {Object}                 tags                           An object of tags to replace which have as value the replacement function that take the tag name, the tag content and must return the replacement content
 * @return              {String}                                                The new text
 *
 * @example             js
 * import replaceTags from '@coffeekraken/sugar/js/html/replaceTags';
 * replaceTags('<span>Hello</span> world', {
 *    span: (tag, content) => `<div>${content}</div>`; // => <div>Hello</div> world
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function replaceTags(text, tags) {
  // loop on the tags
  Object.keys(tags).forEach(tagName => {
    // create the match regex
    const reg = new RegExp(`<\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`, 'g');
    const tagsArray = text.match(reg);
    const singleReg = new RegExp(`\\s?<${tagName}\\s?\/>\\s?`, 'g');
    const singleTagsArray = text.match(singleReg);

    if (tagsArray) {
      for (let i = 0; i < tagsArray.length; i++) {
        const t = tagsArray[i];
        const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*\/\\s*${tagName}>`);
        if (!tagArgs) continue;
        const tagToReplace = tagArgs[0];
        const tagContent = tagArgs[1]; // call the replacement function

        text = text.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }

    if (singleTagsArray) {
      for (let i = 0; i < singleTagsArray.length; i++) {
        const t = singleTagsArray[i];
        const tagArgs = t.match(`\\s?<${tagName}\\s?\/>\\s?`);
        if (!tagArgs) continue;
        const tagToReplace = tagArgs[0];
        const tagContent = ''; // call the replacement function

        text = text.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
  });
  return text;
}

module.exports = exports.default;