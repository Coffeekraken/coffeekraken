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
            // process the passed string
            let reg = /(?:[^,"]+|"[^"]*")+/gm;
            if (valueQuote === "'")
                reg = /(?:[^,']+|'[^']*')+/gm;
            else if (valueQuote === '`')
                reg = /(?:[^,\\\\`]+|\\\\`[^\\\\`]*\\\\`)+/gm;
            stringArray = string.match(reg) || [];
            stringArray = stringArray.map((item) => {
                return unquote_1.default(item);
            });
        }
        else {
            // process the passed string
            let reg = /(?:[^\s"]+|"[^"]*")+/gm;
            if (valueQuote === "'")
                reg = /(?:[^\s']+|'[^']*')+/gm;
            else if (valueQuote === '`')
                reg = /(?:[^\s\\\\`]+|\\\\`[^\\\\`]*\\\\`)+/gm;
            stringArray = string.match(reg) || [];
            stringArray = stringArray.map((item) => {
                return unquote_1.default(item);
            });
        }
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
                    argsObj[currentArgName] = currentValue;
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