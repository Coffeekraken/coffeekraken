// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    return /** @class */ (function () {
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
        function SCodeSplitter(settings) {
            if (settings === void 0) { settings = {}; }
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
        SCodeSplitter.prototype.split = function (code, splitters, settings) {
            if (splitters === void 0) { splitters = []; }
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            var blocks = [];
            var thingsToExtract = true;
            var _loop_1 = function () {
                var splittersMatches = [];
                splitters.forEach(function (extractorObj) {
                    if (extractorObj.regex) {
                        var matches = code.matchAll(extractorObj.regex);
                        process.exit();
                        matches.forEach(function (match) {
                            blocks.push({
                                type: extractorObj.type,
                                data: match
                            });
                        });
                        return;
                    }
                    if (extractorObj.prefix) {
                        var matches = code.match(extractorObj.prefix);
                        if (matches) {
                            splittersMatches.push({
                                extractorObj: extractorObj,
                                match: {
                                    index: matches.index,
                                    string: matches[extractorObj.prefixMatchIdx || 0]
                                }
                            });
                        }
                    }
                });
                var idx = code.length, extractorObj;
                splittersMatches.forEach(function (obj) {
                    if (obj.match.index < idx) {
                        idx = obj.match.index;
                        extractorObj = __assign(__assign({ opened: false, closed: false, openCount: 0, closeCount: 0 }, obj.extractorObj), { match: obj.match });
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
                    return "break";
                }
                var blockString = '';
                for (var i = extractorObj.match.string.length; i < code.length; i++) {
                    var char = code[i];
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
                                var suffixMatch = code.slice(i).match(extractorObj.suffix);
                                if (suffixMatch && suffixMatch.index === 1) {
                                    blockString += suffixMatch[0];
                                }
                            }
                            blockString = "" + extractorObj.match.string + blockString;
                            var type = extractorObj.type;
                            if (extractorObj.exclude) {
                                if (!Array.isArray(extractorObj.exclude))
                                    extractorObj.exclude = [extractorObj.exclude];
                                for (var k = 0; k < extractorObj.exclude.length; k++) {
                                    var excludeReg = extractorObj.exclude[k];
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
            };
            while (thingsToExtract) {
                var state_1 = _loop_1();
                if (state_1 === "break")
                    break;
            }
            return blocks;
        };
        return SCodeSplitter;
    }());
});
//# sourceMappingURL=SCodeSplitter.js.map