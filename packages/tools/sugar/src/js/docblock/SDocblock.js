// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../class/SClass", "../object/deepMerge", "./SDocblockBlock", "../is/node", "../is/path", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../class/SClass"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
    // import __markdown from './markdown/index';
    var node_1 = __importDefault(require("../is/node"));
    var path_1 = __importDefault(require("../is/path"));
    var fs_1 = __importDefault(require("fs"));
    // @ts-ignore
    var SDocblock = /** @class */ (function (_super) {
        __extends(SDocblock, _super);
        /**
         * @name            constructor
         * @type            Function
         *
         * Constructor
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        function SDocblock(source, settings) {
            var _this = _super.call(this, deepMerge_1.default({
                docblock: {
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
                }
            }, settings || {})) || this;
            /**
             * @name            _blocks
             * @type            Array<Object>
             * @private
             *
             * Store the parsed array of docblock objects
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            _this._blocks = [];
            // check if the source is path
            if (path_1.default(source)) {
                if (!node_1.default())
                    throw new Error("Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like \"<yellow>" + source + "</yellow>\"...");
                if (!fs_1.default.existsSync(source))
                    throw new Error("Sorry but the passed source path \"<yellow>" + source + "</yellow>\" does not exists on the filesystem...");
                _this._source = fs_1.default.readFileSync(source, 'utf8');
            }
            else {
                _this._source = source;
            }
            // parsing the source
            _this._blocks = _this.parse();
            return _this;
        }
        Object.defineProperty(SDocblock.prototype, "docblockSettings", {
            /**
             * @name          docblockSettings
             * @type          ISDocblockSettings
             * @get
             *
             * Access the docblock settings
             *
             * @since       2.0.0
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            get: function () {
                return this._settings.docblock;
            },
            enumerable: false,
            configurable: true
        });
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
            if (!sortFunction)
                sortFunction = this.docblockSettings.sortFunction;
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
         * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
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
            // @ts-ignore
            var blocksArrayStr = string.match(reg);
            var blocks = [];
            if (!Array.isArray(blocksArrayStr)) {
                blocksArrayStr = [];
            }
            else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
                blocksArrayStr = blocksArrayStr.map(function (t) { return t.trim(); });
                if (!blocksArrayStr || !blocksArrayStr.length)
                    return [];
                blocks = blocksArrayStr
                    .filter(function (blockStr) {
                    var lines = blockStr.split('\n');
                    for (var i = 0; i < lines.length; i++) {
                        var line = lines[i];
                        if (line.trim().slice(0, 2) === '//')
                            return false;
                    }
                    return true;
                })
                    .map(function (block) {
                    return new SDocblockBlock_1.default(block || ' ', {
                        filepath: _this.docblockSettings.filepath || ''
                    });
                });
            }
            if (blocks && blocks.length) {
                this._blocks = blocks;
            }
            // sort
            this.sort();
            // return the class instance itself
            return this._blocks;
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
    }(SClass_1.default));
    exports.default = SDocblock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViwyREFBdUM7SUFFdkMsa0VBQThDO0lBQzlDLG9FQUFxRTtJQUVyRSw2Q0FBNkM7SUFDN0Msb0RBQWtDO0lBQ2xDLG9EQUFrQztJQUNsQywwQ0FBc0I7SUFpRHRCLGFBQWE7SUFDYjtRQUF3Qiw2QkFBUTtRQXFDOUI7Ozs7Ozs7V0FPRztRQUNILG1CQUFZLE1BQWMsRUFBRSxRQUFpQztZQUE3RCxZQUNFLGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsUUFBUSxFQUFFO29CQUNSLFlBQVksRUFBRSxVQUFDLENBQUMsRUFBRSxDQUFDO3dCQUNqQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQUUsT0FBTyxHQUFHLENBQUM7d0JBRXpCLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFFdEIsc0RBQXNEO3dCQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTOzRCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU87NEJBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVzs0QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPOzRCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzNCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVU7NEJB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