"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
exports.default = crop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvc3RyaW5nL2Nyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtRQUNFLEtBQUssRUFBRSxLQUFLO1FBQ1osVUFBVSxFQUFFLEtBQUs7S0FDbEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztJQUVGLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVqQyxxRkFBcUY7SUFDckYsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7SUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSTtTQUNmLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDZixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNaLE9BQU8sQ0FDTCxDQUFDLEtBQUssU0FBUztZQUNmLENBQUMsS0FBSyxHQUFHO1lBQ1QsQ0FBQyxLQUFLLEVBQUU7WUFDUixDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDbEMsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7SUFFTCx1QkFBdUI7SUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksV0FBVyxHQUFH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