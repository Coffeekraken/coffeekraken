"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const countLine_1 = __importDefault(require("./countLine"));
/**
 * @name                                        crop
 * @namespace            js.string
 * @type                                        Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function crop(text, length, settings = {}) {
    settings = (0, deepMerge_1.default)({
        chars: '...',
        splitWords: false,
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
                    if ((0, countLine_1.default)(result) +
                        (0, countLine_1.default)(currentWord) +
                        (0, countLine_1.default)(settings.chars) <=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDckMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDbEI7UUFDSSxLQUFLLEVBQUUsS0FBSztRQUNaLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFakMscUZBQXFGO0lBQ3JGLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUk7U0FDYixLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDVixPQUFPLENBQ0gsQ0FBQyxLQUFLLFNBQVM7WUFDZixDQUFDLEtBQUssR0FBRztZQUNULENBQUMsS0FBSyxFQUFFO1lBQ1IsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3BDLENBQUM7SUFDTixDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUMxQixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRVAsdUJBQXVCO0lBQ3ZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNoQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDckIsSUFBSSxhQUFh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