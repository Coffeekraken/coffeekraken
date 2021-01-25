"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = crop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsb0VBQThDO0FBQzlDLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLEtBQUs7UUFDWixVQUFVLEVBQUUsS0FBSztLQUNsQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLHFGQUFxRjtJQUNyRixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztJQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJO1NBQ2YsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1osT0FBTyxDQUNMLENBQUMsS0FBSyxTQUFTO1lBQ2YsQ0FBQyxLQUFLLEdBQUc7WUFDVCxDQUFDLEtBQUssRUFBRTtZQUNSLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNsQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDMUIsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDLENBQUMsQ0FBQztJQUVMLHVCQUF1QjtJQUN2QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksYUFBYSxH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