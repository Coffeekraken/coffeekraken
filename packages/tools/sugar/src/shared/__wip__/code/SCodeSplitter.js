// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb2RlU3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLG9FQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQ0c7SUFDSCxNQUFxQixhQUFhO1FBYWhDOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7WUF0QnpCOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFhYixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FvQkc7UUFDSCxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDdkMsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVqRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBRTNCLE9BQU8sZUFBZSxFQUFFO2dCQUN0QixNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztnQkFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO29CQUNqQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7d0JBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNsRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDO2dD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