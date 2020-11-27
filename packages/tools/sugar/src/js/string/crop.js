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
        define(["require", "exports", "../object/deepMerge", "./countLine"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var countLine_1 = __importDefault(require("./countLine"));
    /**
     * @name                                        crop
     * @namespace           sugar.js.string
     * @type                                        Function
     * @stable
     *
     * Allows you to crop a string at a certain length (this length take care of the croping characters like "...")
     *
     * @param               {String}                  text                      The text to crop
     * @param               {Number}                  length                    The text length to have after the croping process
     * @param               {Object}                  [settings={}]             An object of settings described bellow:
     * - chars (...) {String}: The characters to use to signal the crop
     * - splitWords (false) {Boolean}: Specify if you want to split words or not. If not, the function will make sure the final text does not exceeds the wanted length
     * @return              {String}                                            The cropped text
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import crop from '@coffeekraken/sugar/js/string/crop';
     * crop('Hello World', 10); // => Hello w...
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function crop(text, length, settings) {
        if (settings === void 0) { settings = {}; }
        settings = deepMerge_1.default({
            chars: '...',
            splitWords: false
        }, settings);
        text = text.replace(/\s/gm, '¯');
        // split the text on spaces or every characters if the splitWords settings is to true
        var splitReg = /(<([^>]+)>|\S|\s)/gm;
        var parts = text
            .split(splitReg)
            .filter(function (c) {
            return (c !== undefined &&
                c !== ' ' &&
                c !== '' &&
                (c.length === 1 || c.match(/^</)));
        })
            .map(function (c) {
            if (c === '¯')
                return ' ';
            return c;
        });
        // init the result text
        var result = '';
        var currentWord = '';
        var currentLength = 0;
        var openedHtmlTagsArray = [];
        for (var i = 0; i < parts.length; i++) {
            var c = parts[i];
            if (c.length === 1) {
                if (settings.splitWords) {
                    if (currentLength + 1 + settings.chars.length <= length) {
                        result += c;
                        currentLength += 1;
                    }
                    else {
                        result += settings.chars;
                        currentLength += settings.chars.length;
                        break;
                    }
                }
                else {
                    if (c !== ' ') {
                        currentWord += c;
                    }
                    else {
                        if (countLine_1.default(result) +
                            countLine_1.default(currentWord) +
                            countLine_1.default(settings.chars) <=
                            length) {
                            result += currentWord;
                        }
                        else {
                            result = result.trim();
                            result += settings.chars;
                            break; // stop the loop execution...
                        }
                        // add the space
                        result += ' ';
                        // reset currentWord
                        currentWord = '';
                    }
                }
                // if it's not a character of 1 letter
                // meaning that it's surely an html tag
            }
            else {
                if (currentWord !== '') {
                    result += currentWord;
                    currentWord = '';
                }
                // preparing the match regexp
                var closingHtmlTagMatch = c.match(/^<\//);
                var openingHtmlTagMatch = c.match(/^<[a-zA-Z]+.*>$/);
                var singleHtmlTagMatch = c.match(/^<[a-zA-Z]+.*\/>$/);
                // if it's a closing html tag
                if (singleHtmlTagMatch) {
                    // we just add the single tag in the result
                    result += singleHtmlTagMatch.input;
                }
                else if (closingHtmlTagMatch) {
                    var tagName = closingHtmlTagMatch.input.match(/^<\/(.*)>$/)[1];
                    // check if this tag has been opened
                    if (openedHtmlTagsArray.indexOf(tagName) !== -1) {
                        // the tag has been opened so we add it to the close
                        result += closingHtmlTagMatch.input;
                        // remove the tag from the opened array
                        openedHtmlTagsArray.splice(openedHtmlTagsArray.indexOf(tagName), 1);
                    }
                }
                else if (openingHtmlTagMatch) {
                    var tagName = openingHtmlTagMatch.input.match(/^<([a-zA-Z]+).*>$/)[1];
                    // add the tag in the result
                    result += openingHtmlTagMatch.input;
                    // add the tag to the openedTagArray
                    openedHtmlTagsArray.push(tagName);
                }
            }
        }
        // console.log(currentLength, result, __countLine(result));
        // if we take care of html, make sure the opened tags are closed
        openedHtmlTagsArray.forEach(function (tag) {
            result += "</" + tag + ">";
        });
        return result;
    }
    return crop;
});
