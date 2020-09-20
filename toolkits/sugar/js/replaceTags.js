"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceTags;

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                            replaceTags
 * @namespace           sugar.js.html
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
  if (!text) text = '';
  text = (0, _toString.default)(text);
  var oneLineText = text.replace(/\r\n/g, '|rn|');
  oneLineText = oneLineText.replace(/\n/g, '|n|');
  oneLineText = oneLineText.replace(/\r/g, '|r|'); // loop on the tags

  Object.keys(tags).forEach(tagName => {
    // create the match regex
    var reg = new RegExp("<s*".concat(tagName, "[^>]*>((.*?))<\\s*/\\s*").concat(tagName, ">"), 'g'); // const reg = new RegExp(`<\s*${tagName}[^>]*>(([\S\s]+)?)<\\s*\/\\s*${tagName}>`, 'g');

    var tagsArray = oneLineText.match(reg);
    var singleReg = new RegExp("\\s?<".concat(tagName, "\\s?/>\\s?"), 'g');
    var singleTagsArray = oneLineText.match(singleReg);

    if (tagsArray) {
      for (var i = 0; i < tagsArray.length; i++) {
        var t = tagsArray[i];
        var tagArgs = t.match("<\\s*".concat(tagName, "[^>]*>((.*?))<\\s*/\\s*").concat(tagName, ">"));
        if (!tagArgs) continue;
        var tagToReplace = tagArgs[0];
        var tagContent = tagArgs[1]; // call the replacement function

        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }

    if (singleTagsArray) {
      for (var _i = 0; _i < singleTagsArray.length; _i++) {
        var _t = singleTagsArray[_i];

        var _tagArgs = _t.match("\\s?<".concat(tagName, "\\s?/>\\s?"));

        if (!_tagArgs) continue;
        var _tagToReplace = _tagArgs[0];
        var _tagContent = ''; // call the replacement function

        oneLineText = oneLineText.replace(_tagToReplace, tags[tagName](tagName, _tagContent));
      }
    }
  });
  oneLineText = oneLineText.replace(/\|rn\|/g, '\r\n');
  oneLineText = oneLineText.replace(/\|n\|/g, '\n');
  oneLineText = oneLineText.replace(/\|r\|/g, '\r');
  return oneLineText;
}

module.exports = exports.default;