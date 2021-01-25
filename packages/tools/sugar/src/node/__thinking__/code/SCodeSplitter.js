"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
module.exports = class SCodeSplitter {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb2RlU3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYsb0VBQThDO0FBc0M5QyxpQkFBUyxNQUFNLGFBQWE7SUFhMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQXRCekI7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQWFiLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUN2QyxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWpELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFFM0IsT0FBTyxlQUFlLEVBQUU7WUFDdEIsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDNUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFO2dCQUNqQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDOzRCQUNWLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTs0QkFDdkIsSUFBSSxFQUFFLEtBQUs7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