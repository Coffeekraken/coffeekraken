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
        valueQuote: '"'
    }, settings);
    // process the passed string
    let reg = /(?:[^\s"]+|"[^"]*")+/gm;
    if (settings.valueQuote === "'")
        reg = /(?:[^\s']+|'[^']*')+/gm;
    else if (settings.valueQuote === '`')
        reg = /(?:[^\s\\\\`]+|\\\\`[^\\\\`]*\\\\`)+/gm;
    let stringArray = string.match(reg) || [];
    stringArray = stringArray.map((item) => {
        return unquote_1.default(item);
    });
    const argsObj = {};
    let currentArgName = undefined;
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
            if (part && typeof part === 'string') {
                part = part
                    .replace(/^\\\\\\`/, '')
                    .replace(/\\\\\\`$/, '')
                    .replace(/^'/, '')
                    .replace(/'$/, '')
                    .replace(/^"/, '')
                    .replace(/"$/, '');
            }
            currentValue = parse_1.default(part);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBcmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VBcmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw0REFBc0M7QUFDdEMsZ0VBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBQ0gsU0FBd0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNyRCxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7UUFDRSxLQUFLLEVBQUUsSUFBSTtRQUNYLFVBQVUsRUFBRSxFQUFFO1FBQ2QsSUFBSSxFQUFFLElBQUk7UUFDVixVQUFVLEVBQUUsR0FBRztLQUNoQixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBRUYsNEJBQTRCO0lBQzVCLElBQUksR0FBRyxHQUFHLHdCQUF3QixDQUFDO0lBQ25DLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1FBQUUsR0FBRyxHQUFHLHdCQUF3QixDQUFDO1NBQzNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHO1FBQ2xDLEdBQUcsR0FBRyx3Q0FBd0MsQ0FBQztJQUNqRCxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JDLE9BQU8saUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNuQixJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUM7SUFDL0IsSUFBSSxZQUFZLENBQUM7SUFDakIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTVDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUN6RCxJQUNFLFlBQVksS0FBSyxTQUFTO2dCQUMxQixjQUFjLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixjQUFjLEVBQ2Q7Z0JBQ0EsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNoQztZQUNELGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUUvQyxJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2hDO1NBQ0Y7YUFBTTtZQUNMLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDcEMsSUFBSSxHQUFHLElBQUk7cUJBQ1IsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7cUJBQ3ZCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDO3FCQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztxQkFDakIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7cUJBQ2pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO3FCQUNqQixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBRUQsWUFBWSxHQUFHLGVBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLGNBQWMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRyxZQUFZLENBQUM7Z0JBQ3ZDLFlBQVksR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLGNBQWMsR0FBRyxTQUFTLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQzthQUMzQjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBOURELDRCQThEQyJ9