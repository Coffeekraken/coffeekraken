"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
/**
 * @name              SCodeSplitter
 * @namespace         sugar.js.code
 * @type              Class
 * @status              wip
 *
 * This class allows you to specify some "splitters" that will be used to split the code accordingly.
 * A "splitter" is an object of these properties:
 * - type (null) {String}: A simple word used as "type" to define the splitted blocks
 * - prefix (null) {Regex}: A regex used to detect the start of a block
 * - suffix (null) {Regex}: A regex used to detect what can be after the block
 * - open ('{') {String}: A 1 character string that specify the opening of a code block like "{", etc...
 * - close ('}') {String}: A 1 character string that specify the closing of a code block like "}", etc...
 * - exclude (null) {Array<Regex>}: An array of regex used to exclude some previously matched blocks of this splitter
 *
 * @param       {Object}      [settings={}]         An object of settings to configure your code splitter instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SCodeSplitter from '@coffeekraken/sugar/js/code/SCodeSplitter';
 * const splitter = new SCodeSplitter();
 * const splitStack = splitter.split([{
 *    type: 'include',
 *    prefix: /@include\s[a-zA-Z0-9-_\.]+/,
 *    suffix: /;/,
 *    open: '(',
 *    close: ')',
 *    exclude: [/@include Sugar\.setup\(.*\);/]
 * }]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCodeSplitter {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name        _settings
         * @type        Object
         * @private
         *
         * Store the instance settings
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        this._settings = deepMerge_1.default({}, settings);
    }
    /**
     * @name            split
     * @type            Function
     *
     * This method is the main one that allows you to actually split the passed code
     * into small pieces.
     *
     * @param       {String}        code        The code you want to split
     * @param       {Array<Object>}     splitters       An array of splitter objects composed of these properties:
     * - type (null) {String}: A simple word used as "type" to define the splitted blocks
     * - prefix (null) {Regex}: A regex used to detect the start of a block
     * - suffix (null) {Regex}: A regex used to detect what can be after the block
     * - open ('{') {String}: A 1 character string that specify the opening of a code block like "{", etc...
     * - close ('}') {String}: A 1 character string that specify the closing of a code block like "}", etc...
     * - exclude (null) {Array<Regex>}: An array of regex used to exclude some previously matched blocks of this splitter
     * @param       {Object}        [settings={}]         An object of settings to override the instance ones
     * @return      {Array<Object>}                       An array of splited code blocks objects
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    split(code, splitters = [], settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        const blocks = [];
        let thingsToExtract = true;
        while (thingsToExtract) {
            const splittersMatches = [];
            splitters.forEach((extractorObj) => {
                if (extractorObj.regex) {
                    const matches = code.matchAll(extractorObj.regex);
                    process.exit();
                    matches.forEach((match) => {
                        blocks.push({
                            type: extractorObj.type,
                            data: match
                        });
                    });
                    return;
                }
                if (extractorObj.prefix) {
                    const matches = code.match(extractorObj.prefix);
                    if (matches) {
                        splittersMatches.push({
                            extractorObj,
                            match: {
                                index: matches.index,
                                string: matches[extractorObj.prefixMatchIdx || 0]
                            }
                        });
                    }
                }
            });
            let idx = code.length, extractorObj;
            splittersMatches.forEach((obj) => {
                if (obj.match.index < idx) {
                    idx = obj.match.index;
                    extractorObj = Object.assign(Object.assign({ opened: false, closed: false, openCount: 0, closeCount: 0 }, obj.extractorObj), { match: obj.match });
                }
            });
            if (extractorObj) {
                blocks.push({
                    type: 'string',
                    data: code.slice(0, extractorObj.match.index)
                });
                code = code.slice(extractorObj.match.index);
            }
            else {
                blocks.push({
                    type: 'string',
                    data: code
                });
                thingsToExtract = false;
                break;
            }
            let blockString = '';
            for (let i = extractorObj.match.string.length; i < code.length; i++) {
                const char = code[i];
                blockString += char;
                if (char === extractorObj.open) {
                    if (!extractorObj.opened) {
                        extractorObj.opened = true;
                    }
                    extractorObj.openCount++;
                }
                else if (char === extractorObj.close) {
                    extractorObj.closeCount++;
                    if (extractorObj.opened &&
                        extractorObj.closeCount === extractorObj.openCount) {
                        extractorObj.closed = true;
                        // check suffix
                        if (extractorObj.suffix) {
                            const suffixMatch = code.slice(i).match(extractorObj.suffix);
                            if (suffixMatch && suffixMatch.index === 1) {
                                blockString += suffixMatch[0];
                            }
                        }
                        blockString = `${extractorObj.match.string}${blockString}`;
                        let type = extractorObj.type;
                        if (extractorObj.exclude) {
                            if (!Array.isArray(extractorObj.exclude))
                                extractorObj.exclude = [extractorObj.exclude];
                            for (let k = 0; k < extractorObj.exclude.length; k++) {
                                const excludeReg = extractorObj.exclude[k];
                                if (blockString.match(excludeReg)) {
                                    type = 'string';
                                    break;
                                }
                            }
                        }
                        // append the block to the blocks stack
                        blocks.push({
                            type: type,
                            data: blockString
                        });
                        // crop the code
                        code = code.slice(blockString.length);
                        // stop the loop here
                        break;
                    }
                }
            }
        }
        return blocks;
    }
}
exports.default = SCodeSplitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvX193aXBfXy9jb2RlL1NDb2RlU3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxNQUFxQixhQUFhO0lBYWhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUF0QnpCOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFhYixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVqRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRTNCLE9BQU8sZUFBZSxFQUFFO1lBQ3RCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1lBQzVCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO29CQUN0QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFD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