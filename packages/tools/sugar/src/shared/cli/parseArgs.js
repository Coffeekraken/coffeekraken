// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';
/**
 * @name                        parseArgs
 * @namespace            js.cli
 * @type                        Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status            beta
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
export default function parseArgs(string, settings = {}) {
    settings = __deepMerge({
        throw: true,
        defaultObj: {},
        cast: true,
        valueQuote: undefined,
    }, settings);
    string = string.trim();
    string = string.replace(/(["'`])--/gm, '$1--§ --');
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
        let parenthesisCount = 0;
        let quotesCount = 0;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
                quotesCount++;
            }
            else if (char === valueQuote &&
                previousChar !== '\\' &&
                quotesCount) {
                quotesCount--;
            }
            // check if we are in parenthesis
            if (!quotesCount && char === '(') {
                parenthesisCount++;
            }
            else if (!quotesCount && char === ')') {
                parenthesisCount--;
            }
            if (char === ',') {
                if (quotesCount || parenthesisCount) {
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
        if (parenthesisCount)
            currentStr += ')'.repeat(parenthesisCount);
        stringArray.push(currentStr.trim());
    }
    else {
        let currentStr = '';
        let quotesCount = false;
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            const previousChar = string[i - 1] || string[0];
            // check if we are in quotes or not
            if (char === valueQuote && previousChar !== '\\' && !quotesCount) {
                quotesCount = true;
            }
            else if (char === valueQuote &&
                previousChar !== '\\' &&
                quotesCount) {
                quotesCount = false;
            }
            if (char === ' ') {
                if (quotesCount) {
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
    stringArray = stringArray.map((item) => __unquote(item));
    const argsObj = {};
    let currentArgName = undefined;
    let currentValue;
    stringArray = stringArray.forEach((part, i) => {
        if (!isFunctionStyle &&
            !part.includes(' ') &&
            (part.slice(0, 2) === '--' || part.slice(0, 1) === '-')) {
            if (currentValue === undefined &&
                currentArgName !== -1 &&
                currentArgName &&
                argsObj[currentArgName] === undefined) {
                argsObj[currentArgName] = true;
            }
            currentArgName = part.replace(/^[-]{1,2}/, '');
            if (argsObj[currentArgName] === undefined) {
                argsObj[currentArgName] = true;
            }
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
            currentValue = __parse(value);
            if (typeof currentValue === 'string') {
                currentValue = currentValue.replace('--§ ', '');
            }
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
    Object.keys(argsObj).forEach((key) => {
        const value = argsObj[key];
        if (value === undefined)
            delete argsObj[key];
    });
    return argsObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDbkQsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsU0FBUztLQUN4QixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFbkQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxJQUFJLENBQUMsVUFBVSxFQUFFO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQzlDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE1BQU07YUFDVDtTQUNKO1FBQ0QsSUFBSSxDQUFDLFVBQVU7WUFBRSxV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