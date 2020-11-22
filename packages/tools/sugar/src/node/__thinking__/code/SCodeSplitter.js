"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = require("../object/deepMerge");
/**
 * @name              SCodeSplitter
 * @namespace         sugar.js.code
 * @type              Class
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
 * @todo        enhance documentation
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
                    console.log(matches);
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
                    extractorObj = {
                        opened: false,
                        closed: false,
                        openCount: 0,
                        closeCount: 0,
                        ...obj.extractorObj,
                        match: obj.match
                    };
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
