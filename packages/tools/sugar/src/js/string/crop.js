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
        // if we take care of html, make sure the opened tags are closed
        openedHtmlTagsArray.forEach(function (tag) {
            result += "</" + tag + ">";
        });
        return result;
    }
    return crop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQThDO0lBQzlDLDBEQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxLQUFLLEVBQUUsS0FBSztZQUNaLFVBQVUsRUFBRSxLQUFLO1NBQ2xCLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFakMscUZBQXFGO1FBQ3JGLElBQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO1FBQ3ZDLElBQU0sS0FBSyxHQUFHLElBQUk7YUFDZixLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsTUFBTSxDQUFDLFVBQUMsQ0FBQztZQUNSLE9BQU8sQ0FDTCxDQUFDLEtBQUssU0FBUztnQkFDZixDQUFDLEtBQUssR0FBRztnQkFDVCxDQUFDLEtBQUssRUFBRTtnQkFDUixDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDbEMsQ0FBQztRQUNKLENBQUMsQ0FBQzthQUNELEdBQUcsQ0FBQyxVQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBdUI7UUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLGFB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