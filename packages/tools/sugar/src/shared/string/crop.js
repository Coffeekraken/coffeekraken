// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __countLine from './countLine';
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function crop(text, length, settings = {}) {
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
                    if (__countLine(result) +
                        __countLine(currentWord) +
                        __countLine(settings.chars) <=
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
export default crop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JvcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBQzlDLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLEtBQUssRUFBRSxLQUFLO1FBQ1osVUFBVSxFQUFFLEtBQUs7S0FDcEIsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUVGLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVqQyxxRkFBcUY7SUFDckYsTUFBTSxRQUFRLEdBQUcscUJBQXFCLENBQUM7SUFDdkMsTUFBTSxLQUFLLEdBQUcsSUFBSTtTQUNiLEtBQUssQ0FBQyxRQUFRLENBQUM7U0FDZixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNWLE9BQU8sQ0FDSCxDQUFDLEtBQUssU0FBUztZQUNmLENBQUMsS0FBSyxHQUFHO1lBQ1QsQ0FBQyxLQUFLLEVBQUU7WUFDUixDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDcEMsQ0FBQztJQUNOLENBQUMsQ0FBQztTQUNELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRztZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFUCx1QkFBdUI7SUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2hCLElBQUksV0FBVyxHQUFHLEVB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