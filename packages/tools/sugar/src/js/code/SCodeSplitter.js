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
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    var SCodeSplitter = /** @class */ (function () {
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
    exports.default = SCodeSplitter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvZGVTcGxpdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb2RlU3BsaXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsa0VBQThDO0lBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1DRztJQUNIO1FBYUU7Ozs7Ozs7OztXQVNHO1FBQ0gsdUJBQVksUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTtZQXRCekI7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQWFiLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQW9CRztRQUNILDZCQUFLLEdBQUwsVUFBTSxJQUFJLEVBQUUsU0FBYyxFQUFFLFFBQWE7WUFBN0IsMEJBQUEsRUFBQSxjQUFjO1lBQUUseUJBQUEsRUFBQSxhQUFhO1lBQ3ZDLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFakQsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQzs7Z0JBR3pCLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2dCQUM1QixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtvQkFDN0IsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUN0QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDbEQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLOzRCQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDO2dD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