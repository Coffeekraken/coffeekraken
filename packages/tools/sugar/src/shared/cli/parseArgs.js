// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __parse from '../string/parse';
import __unquote from '../string/unquote';
/**
 * @name                        parseArgs
 * @namespace            js.cli
 * @type                        Function
 * @platform          js
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsQ0FBQztBQUN0QyxPQUFPLFNBQVMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNuRCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLEtBQUssRUFBRSxJQUFJO1FBQ1gsVUFBVSxFQUFFLEVBQUU7UUFDZCxJQUFJLEVBQUUsSUFBSTtRQUNWLFVBQVUsRUFBRSxTQUFTO0tBQ3hCLEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVuRCxJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3JDLElBQUksQ0FBQyxVQUFVLEVBQUU7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDOUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxJQUFJLENBQUMsVUFBVTtZQUFFLFVB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