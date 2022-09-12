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
 * @namespace            shared.string
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
 * import { __crop } from '@coffeekraken/sugar/string';
 * __crop('Hello World', 10); // => Hello w...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __crop(text, length, settings = {}) {
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
exports.default = __crop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RELFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ2xCO1FBQ0ksS0FBSyxFQUFFLEtBQUs7UUFDWixVQUFVLEVBQUUsS0FBSztLQUNwQixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLHFGQUFxRjtJQUNyRixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQztJQUN2QyxNQUFNLEtBQUssR0FBRyxJQUFJO1NBQ2IsS0FBSyxDQUFDLFFBQVEsQ0FBQztTQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1YsT0FBTyxDQUNILENBQUMsS0FBSyxTQUFTO1lBQ2YsQ0FBQyxLQUFLLEdBQUc7WUFDVCxDQUFDLEtBQUssRUFBRTtZQUNSLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUNwQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO1NBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQUUsT0FBTyxHQUFHLENBQUM7UUFDMUIsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVQLHVCQUF1QjtJQUN2QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksYUFB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