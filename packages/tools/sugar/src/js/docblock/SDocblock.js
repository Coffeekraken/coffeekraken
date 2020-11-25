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
        define(["require", "exports", "../error/SError", "../object/deepMerge", "./SDocblockBlock", "../is/node", "../is/path", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SError_1 = __importDefault(require("../error/SError"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
    // import __markdown from './markdown/index';
    var node_1 = __importDefault(require("../is/node"));
    var path_1 = __importDefault(require("../is/path"));
    var fs_1 = __importDefault(require("fs"));
    return /** @class */ (function () {
        /**
         * @name            constructor
         * @type            Function
         *
         * Constructor
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        function SDocblock(source, settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name              _settings
             * @type              Object
             * @private
             *
             * Store this instance settings
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            this._settings = {};
            /**
             * @name            _source
             * @type            String|Array<Object>
             * @private
             *
             * Store the passed source
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            this._source = null;
            /**
             * @name            _blocks
             * @type            Array<Object>
             * @private
             *
             * Store the parsed array of docblock objects
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            this._blocks = null;
            /**
             * @name          _to
             * @type          String
             * @private
             *
             * Store the format in which the docblocks have to be converted
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            this._to = null;
            this._settings = deepMerge_1.default({
                sortFunction: function (a, b) {
                    var res = 0;
                    if (!b || !a)
                        return res;
                    var aObj = a.toObject(), bObj = b.toObject();
                    // if (.object.namespace && !aObj.namespace) res -= 1;
                    if (bObj.namespace)
                        res += 1;
                    if (bObj.type && bObj.type.toLowerCase() === 'class')
                        res += 1;
                    if (bObj.constructor)
                        res += 1;
                    if (bObj.private)
                        res += 1;
                    if (bObj.type && bObj.type.toLowerCase() === 'function')
                        res += 1;
                    if (aObj.name && bObj.name && bObj.name.length > aObj.name.length)
                        res += 1;
                    return res;
                },
                filepath: null,
                to: {
                // markdown: __markdown
                }
            }, settings);
            // check if the source is path
            if (path_1.default(source)) {
                if (!node_1.default())
                    throw new SError_1.default("Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like \"<yellow>" + source + "</yellow>\"...");
                if (!fs_1.default.existsSync(source))
                    throw new SError_1.default("Sorry but the passed source path \"<yellow>" + source + "</yellow>\" does not exists on the filesystem...");
                this._source = fs_1.default.readFileSync(source, 'utf8');
            }
            else {
                this._source = source;
            }
            // parsing the source
            this.parse();
        }
        /**
         * @name        sort
         * @type        Function
         *
         * This method allows you to set the order in which you want to get the
         * blocks back when using the methods like get blocks, etc...
         *
         * @param       {Function}      [sortFunction=null]       Specify a custom sort function you want to use. If not set, use the ```sortFunction``` setting.
         * @return      {SDocblock}                                   The class instance itself to maintain chainability
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        SDocblock.prototype.sort = function (sortFunction) {
            if (sortFunction === void 0) { sortFunction = null; }
            if (!sortFunction)
                sortFunction = this._settings.sortFunction;
            this._blocks = this._blocks.sort(sortFunction);
            return this;
        };
        Object.defineProperty(SDocblock.prototype, "blocks", {
            /**
             * @name        blocks
             * @type        Array
             *
             * Access the parsed blocks array
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            get: function () {
                if (!this._blocks)
                    this.parse();
                return this._blocks;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name          parse
         * @type          Function
         *
         * This method is the principal one. Use it to parse a string
         * and get back the object version of it
         *
         * @param       {String}        [string=this._source]        The string to parse
         * @return      {SDocblock}                     The class instance itself to maintain chainability
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SDocblock.prototype.parse = function (string) {
            var _this = this;
            if (string === void 0) { string = this._source; }
            // extract each docblocks
            var reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
            // extracting blocks
            var blocksArray = string.match(reg);
            if (!Array.isArray(blocksArray)) {
                blocksArray = [];
            }
            else if (Array.isArray(blocksArray) && blocksArray.length) {
                blocksArray = blocksArray.map(function (t) { return t.trim(); });
                if (!blocksArray || !blocksArray.length)
                    return [];
                blocksArray = blocksArray.map(function (block) {
                    return new SDocblockBlock_1.default(block || ' ', {
                        filepath: _this._settings.filepath || ''
                    });
                });
            }
            // save the blocks
            this._blocks = blocksArray;
            // sort the blocks
            this.sort();
            // return the class instance itself
            return this;
        };
        /**
         * @name          toObject
         * @type          Function
         *
         * This method convert the parsed docblocks to a simple object
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SDocblock.prototype.toObject = function () {
            return this.blocks.map(function (block) {
                return block.toObject();
            });
        };
        return SDocblock;
    }());
});
