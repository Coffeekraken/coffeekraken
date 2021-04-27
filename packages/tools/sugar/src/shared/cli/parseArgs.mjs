// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';
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
export default function parseArgs(string, settings = {}) {
    settings = __deepMerge({
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
    stringArray = stringArray.map((item) => __unquote(item));
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
            if (isLast) {
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
            if (currentArgName !== undefined) {
                if (argsObj[currentArgName] !== undefined) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jbGkvcGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyRCxRQUFRLEdBQUcsV0FBVyxDQUNwQjtRQUNFLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLFVBQVUsRUFBRSxTQUFTO0tBQ3RCLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXZCLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDckMsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO2dCQUNoRCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixNQUFNO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxVQUFVO1lBQUUs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