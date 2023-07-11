// @ts-nocheck
import __deepMerge from '../object/deepMerge.js';
import __countLineChars from './countLineChars.js';
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
 * @snippet         __crop($1, $2)
 *
 * @example         js
 * import { __crop } from '@coffeekraken/sugar/string';
 * __crop('Hello World', 10); // => Hello w...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __crop(text, length, settings = {}) {
    settings = __deepMerge({
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
                    if (__countLineChars(result) +
                        __countLineChars(currentWord) +
                        __countLineChars(settings.chars) <=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLGdCQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdEQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxLQUFLLEVBQUUsS0FBSztRQUNaLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFakMscUZBQXFGO0lBQ3JGLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUk7U0FDYixLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ2YsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDVixPQUFPLENBQ0gsQ0FBQyxLQUFLLFNBQVM7WUFDZixDQUFDLEtBQUssR0FBRztZQUNULENBQUMsS0FBSyxFQUFFO1lBQ1IsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3BDLENBQUM7SUFDTixDQUFDLENBQUM7U0FDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUMxQixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRVAsdUJBQXVCO0lBQ3ZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FB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