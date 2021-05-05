"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parse_1 = __importDefault(require("../string/parse"));
const unquote_1 = __importDefault(require("../string/unquote"));
/**
 * @name                        parseArgs
 * @namespace            js.cli
 * @type                        Function
 *
 * Parse a string to find the provided arguments into the list and return a corresponding object.
 *
 * @param             {String}                    string                      The string to parse
 * @param             {Object}                    [settings={}]               A settings object that configure how the string will be parsed. Here's the settings options:
 * @return            {Object}                                                The object of funded arguments and their values
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import parseArgs from '@coffeekraken/sugar/js/string/parseArgs';
 * parseArgs('hello -w 10 yop "hello world" -b --hello.world Nelson --help "coco yep" #blop', {
 *    param1: { type: 'String', alias: 'p' },
 *    world: { type: 'Array', alias: 'w', validator: value => {
 *      return Array.isArray(value);
 *    }},
 *    bool: { type: 'Boolean', alias: 'b', default: false, required: true },
 *    'hello.world': { type: 'String' },
 *    help: { type: 'String', alias: 'h' },
 *    id: { type: 'String', alias: 'i', regexp: /^#([\S]+)$/ }
 * }, {
 *    treatDotsAsObject: true,
 *    handleOrphanOptions: true
 * });
 * {
 *    param1: 'hello',
 *    world: [10, 'yop', 'hello world'],
 *    bool: true,
 *    hello: {
 *      world: 'Nelson'
 *    },
 *    help: 'coco yep',
 *    id: '#blop'
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function parseArgs(string, settings = {}) {
    settings = deepMerge_1.default({
        throw: true,
        defaultObj: {},
        cast: true,
        valueQuote: undefined
    }, settings);
    string = string.trim();
    let valueQuote = settings.valueQuote;
    if (!valueQuote) {
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (char === '"' || char === '`' || char === "'") {
                valueQuote = char;
                break;
            }
        }
        if (!valueQuote)
            valueQuote = '"';
    }
    let stringArray = [];
    let isFunctionStyle = false;
    if (string.match(/^\(/) && string.match(/\)$/)) {
        isFunctionStyle = true;
        string = string.slice(1, -1);
        let currentStr = '';
        let isInParenthesis = false;
        let isInQuotes = false;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !isInQuotes) {
                isInQuotes = true;
            }
            else if (char === valueQuote && previousChar !== '\\' && isInQuotes) {
                isInQuotes = false;
            }
            // check if we are in parenthesis
            if (!isInQuotes && char === '(' && !isInParenthesis) {
                isInParenthesis = true;
            }
            else if (!isInQuotes && char === ')') {
                isInParenthesis = false;
            }
            if (char === ',') {
                if (isInQuotes || isInParenthesis) {
                    currentStr += char;
                }
                else {
                    stringArray.push(currentStr.trim());
                    currentStr = '';
                }
            }
            else {
                currentStr += char;
            }
        }
        stringArray.push(currentStr.trim());
    }
    else {
        let currentStr = '';
        let isInQuotes = false;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !isInQuotes) {
                isInQuotes = true;
            }
            else if (char === valueQuote && previousChar !== '\\' && isInQuotes) {
                isInQuotes = false;
            }
            if (char === ' ') {
                if (isInQuotes) {
                    currentStr += char;
                }
                else {
                    stringArray.push(currentStr.trim());
                    currentStr = '';
                }
            }
            else {
                currentStr += char;
            }
        }
        stringArray.push(currentStr.trim());
    }
    stringArray = stringArray.map((item) => unquote_1.default(item));
    const argsObj = {};
    let currentArgName = undefined;
    let currentValue;
    stringArray = stringArray.forEach((part, i) => {
        const isLast = i === stringArray.length - 1;
        if (!isFunctionStyle &&
            (part.slice(0, 2) === '--' || part.slice(0, 1) === '-')) {
            if (currentValue === undefined &&
                currentArgName !== -1 &&
                currentArgName) {
                argsObj[currentArgName] = true;
            }
            currentArgName = part.replace(/^[-]{1,2}/, '');
            argsObj[currentArgName] = true;
        }
        else {
            let value;
            if (part && typeof part === 'string') {
                value = part
                    .replace(/^\\\\\\`/, '')
                    .replace(/\\\\\\`$/, '')
                    .replace(/^'/, '')
                    .replace(/'$/, '')
                    .replace(/^"/, '')
                    .replace(/"$/, '');
                if (value.match(/^\$[a-zA-Z0-9-_]+\s?:.*/)) {
                    const parts = part.split(':');
                    currentArgName = parts[0].trim().replace(/^\$/, '');
                    value = parts.slice(1).join(':').trim();
                }
            }
            currentValue = parse_1.default(value);
            if (currentArgName !== undefined) {
                if (argsObj[currentArgName] !== undefined &&
                    argsObj[currentArgName] !== true) {
                    if (!Array.isArray(argsObj[currentArgName])) {
                        argsObj[currentArgName] = [argsObj[currentArgName]];
                    }
                    argsObj[currentArgName].push(currentValue);
                }
                else {
                    argsObj[currentArgName] = currentValue;
                }
                currentValue = undefined;
                currentArgName = undefined;
            }
            else {
                argsObj[i] = currentValue;
            }
        }
    });
    return argsObj;
}
exports.default = parseArgs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsU0FBUztLQUN0QixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV2QixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3JDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDaEQsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsTUFBTTthQUNQO1NBQ0Y7UUFDRCxJQUFJLENBQUMsVUFBVTtZQUFFLFVBQVUsR0FBRyxHQUFHLENBQUM7S0FDbkM7SUFFRCxJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUM7SUFFL0IsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBRTVCLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxN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