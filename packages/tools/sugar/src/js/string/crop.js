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
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.default = crop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUE4QztJQUM5QywwREFBc0M7SUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQWE7UUFBYix5QkFBQSxFQUFBLGFBQWE7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsS0FBSztTQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLHFGQUFxRjtRQUNyRixJQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxJQUFNLEtBQUssR0FBRyxJQUFJO2FBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLE1BQU0sQ0FBQyxVQUFDLENBQUM7WUFDUixPQUFPLENBQ0wsQ0FBQyxLQUFLLFNBQVM7Z0JBQ2YsQ0FBQyxLQUFLLEdBQUc7Z0JBQ1QsQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ2xDLENBQUM7UUFDSixDQUFDLENBQUM7YUFDRCxHQUFHLENBQUMsVUFBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUMxQixPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUwsdUJBQXVCO1FBQ3ZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxh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