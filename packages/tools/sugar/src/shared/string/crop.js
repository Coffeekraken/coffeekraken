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
        define(["require", "exports", "../object/deepMerge", "./countLine"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const countLine_1 = __importDefault(require("./countLine"));
    /**
     * @name                                        crop
     * @namespace           sugar.js.string
     * @type                                        Function
     * @stable
     *
     * Allows you to crop a string at a certain length (this length take care of the croping characters like "...")
     *
     * @param               {String}                  text                      The text to crop
     * @param               {Number}                  length                    The text length to have after the croping process
     * @param               {Object}                  [settings={}]             An object of settings described bellow:
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
    function crop(text, length, settings = {}) {
        settings = deepMerge_1.default({
            chars: '...',
            splitWords: false
        }, settings);
        text = text.replace(/\s/gm, '¯');
        // split the text on spaces or every characters if the splitWords settings is to true
        const splitReg = /(<([^>]+)>|\S|\s)/gm;
        const parts = text
            .split(splitReg)
            .filter((c) => {
            return (c !== undefined &&
                c !== ' ' &&
                c !== '' &&
                (c.length === 1 || c.match(/^</)));
        })
            .map((c) => {
            if (c === '¯')
                return ' ';
            return c;
        });
        // init the result text
        let result = '';
        let currentWord = '';
        let currentLength = 0;
        const openedHtmlTagsArray = [];
        for (let i = 0; i < parts.length; i++) {
            const c = parts[i];
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
                const closingHtmlTagMatch = c.match(/^<\//);
                const openingHtmlTagMatch = c.match(/^<[a-zA-Z]+.*>$/);
                const singleHtmlTagMatch = c.match(/^<[a-zA-Z]+.*\/>$/);
                // if it's a closing html tag
                if (singleHtmlTagMatch) {
                    // we just add the single tag in the result
                    result += singleHtmlTagMatch.input;
                }
                else if (closingHtmlTagMatch) {
                    const tagName = closingHtmlTagMatch.input.match(/^<\/(.*)>$/)[1];
                    // check if this tag has been opened
                    if (openedHtmlTagsArray.indexOf(tagName) !== -1) {
                        // the tag has been opened so we add it to the close
                        result += closingHtmlTagMatch.input;
                        // remove the tag from the opened array
                        openedHtmlTagsArray.splice(openedHtmlTagsArray.indexOf(tagName), 1);
                    }
                }
                else if (openingHtmlTagMatch) {
                    const tagName = openingHtmlTagMatch.input.match(/^<([a-zA-Z]+).*>$/)[1];
                    // add the tag in the result
                    result += openingHtmlTagMatch.input;
                    // add the tag to the openedTagArray
                    openedHtmlTagsArray.push(tagName);
                }
            }
        }
        // if we take care of html, make sure the opened tags are closed
        openedHtmlTagsArray.forEach((tag) => {
            result += `</${tag}>`;
        });
        return result;
    }
    exports.default = crop;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQThDO0lBQzlDLDREQUFzQztJQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1lBQ0UsS0FBSyxFQUFFLEtBQUs7WUFDWixVQUFVLEVBQUUsS0FBSztTQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWpDLHFGQUFxRjtRQUNyRixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJO2FBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1osT0FBTyxDQUNMLENBQUMsS0FBSyxTQUFTO2dCQUNmLENBQUMsS0FBSyxHQUFHO2dCQUNULENBQUMsS0FBSyxFQUFFO2dCQUNSLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNsQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBdUI7UUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLGFB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