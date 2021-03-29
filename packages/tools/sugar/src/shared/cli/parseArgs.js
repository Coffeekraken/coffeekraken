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
     * @namespace           sugar.js.cli
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
            valueQuote: '`'
        }, settings);
        // process the passed string
        let reg = /(?:[^\s"]+|"[^"]*")+/gm;
        if (settings.valueQuote === "'")
            reg = /(?:[^\s']+|'[^']*')+/gm;
        else if (settings.valueQuote === '`')
            reg = /(?:[^\s`]+|`[^`]*`)+/gm;
        let stringArray = string.match(reg) || [];
        stringArray = stringArray.map((item) => {
            return unquote_1.default(item);
        });
        const argsObj = {};
        let currentArgName = -1;
        let currentValue;
        stringArray = stringArray.forEach((part, i) => {
            const isLast = i === stringArray.length - 1;
            if (part.slice(0, 2) === '--' || part.slice(0, 1) === '-') {
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
                currentValue = parse_1.default(part);
                if (currentArgName !== undefined) {
                    argsObj[currentArgName] = parse_1.default(currentValue);
                    currentValue = undefined;
                    currentArgName = undefined;
                }
            }
        });
        return argsObj;
    }
    exports.default = parseArgs;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE4QztJQUM5Qyw0REFBc0M7SUFDdEMsZ0VBQTBDO0lBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkNHO0lBQ0gsU0FBd0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNyRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxLQUFLLEVBQUUsSUFBSTtZQUNYLFVBQVUsRUFBRSxFQUFFO1lBQ2QsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsR0FBRztTQUNoQixFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsNEJBQTRCO1FBQzVCLElBQUksR0FBRyxHQUFHLHdCQUF3QixDQUFDO1FBQ25DLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1lBQUUsR0FBRyxHQUFHLHdCQUF3QixDQUFDO2FBQzNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1lBQUUsR0FBRyxHQUFHLHdCQUF3QixDQUFDO1FBQ3JFLElBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDckMsT0FBTyxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksWUFBWSxDQUFDO1FBQ2pCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUU1QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7Z0JBQ3pELElBQ0UsWUFBWSxLQUFLLFNBQVM7b0JBQzFCLGNBQWMsS0FBSyxDQUFDLENBQUM7b0JBQ3JCLGNBQWMsRUFDZDtvQkFDQSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNoQztnQkFDRCxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRS9DLElBQUksTUFBTSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ2hDO2FBQ0Y7aUJBQU07Z0JBQ0wsWUFBWSxHQUFHLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxjQUFjLEtBQUssU0FBUyxFQUFFO29CQUNoQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsZUFBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNoRCxZQUFZLEdBQUcsU0FBUyxDQUFDO29CQUN6QixjQUFjLEdBQUcsU0FBUyxDQUFDO2lCQUM1QjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBakRELDRCQWlEQyJ9