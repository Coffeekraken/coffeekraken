// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "../string/parse", "../string/unquote"], factory);
    }
})(function (require, exports) {
    "use strict";
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
                currentValue = parse_1.default(value);
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
    exports.default = parseArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5Qyw0REFBc0M7SUFDdEMsZ0VBQTBDO0lBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkNHO0lBQ0gsU0FBd0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsU0FBUztTQUN0QixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV2QixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFO29CQUNoRCxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNsQixNQUFNO2lCQUNQO2FBQ0Y7WUFDRCxJQUFJLENBQUMsVUFBVTtnQkFBRSxVQUFVLEdBQUcsR0FBRyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxXQUFXLEdBQWEsRUFBRSxDQUFDO1FBRS9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztRQUU1QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FB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