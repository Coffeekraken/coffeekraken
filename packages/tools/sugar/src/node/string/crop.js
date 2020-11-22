"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../object/deepMerge");
const countLine_1 = require("./countLine");
/**
 * @name                                        crop
 * @namespace           sugar.js.string
 * @type                                        Function
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
 * @example         js
 * import crop from '@coffeekraken/sugar/js/string/crop';
 * crop('Hello World', 10); // => Hello w...
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function crop(text, length, settings = {}) {
    settings = deepMerge_1.default({
        chars: '...',
        splitWords: false
    }, settings);
    text = text.replace(/\s/gm, '¯');
    // split the text on spaces or every characters if the splitWords settings is to true
    let splitReg = /(<([^>]+)>|\S|\s)/gm;
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
    let openedHtmlTagsArray = [];
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
    // console.log(currentLength, result, __countLine(result));
    // if we take care of html, make sure the opened tags are closed
    openedHtmlTagsArray.forEach((tag) => {
        result += `</${tag}>`;
    });
    return result;
}
exports.default = crop;
