var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "../object/deepMerge", "./SDocblockBlock", "../is/node", "../is/path", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
    // import __markdown from './markdown/index';
    const node_1 = __importDefault(require("../is/node"));
    const path_1 = __importDefault(require("../is/path"));
    const fs_1 = __importDefault(require("fs"));
    // @ts-ignore
    class SDocblock extends s_class_1.default {
        /**
         * @name            constructor
         * @type            Function
         *
         * Constructor
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        constructor(source, settings) {
            super(deepMerge_1.default({
                docblock: {
                    sortFunction: (a, b) => {
                        let res = 0;
                        if (!b || !a)
                            return res;
                        const aObj = a.toObject(), bObj = b.toObject();
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
            }, settings || {}));
            /**
             * @name            _blocks
             * @type            Array<Object>
             * @private
             *
             * Store the parsed array of docblock objects
             *
             * @author 	Olivier Bossel <olivier.bossel@gmail.com>
             */
            this._blocks = [];
            // check if the source is path
            if (path_1.default(source)) {
                if (!node_1.default())
                    throw new Error(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
                if (!fs_1.default.existsSync(source))
                    throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
                this._source = fs_1.default.readFileSync(source, 'utf8');
            }
            else {
                this._source = source;
            }
            // parsing the source
            this._blocks = this.parse();
        }
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
        get docblockSettings() {
            return this._settings.docblock;
        }
        /**
         * @name        sort
         * @type        Function
         *
         * This method allows you to set the order in which you want to get the
         * blocks back when using the methods like get blocks, etc...
         *
         * @param       {Function}      [sortFunction=null]       Specify a custom sort function you want to use. If not set, use the ```sortFunction``` setting.
         * @return      {SDocblock}                                   The class instance itself to maintain chainability
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        sort(sortFunction) {
            if (!sortFunction)
                sortFunction = this.docblockSettings.sortFunction;
            this._blocks = this._blocks.sort(sortFunction);
            return this;
        }
        /**
         * @name        blocks
         * @type        Array
         *
         * Access the parsed blocks array
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        get blocks() {
            if (!this._blocks)
                this.parse();
            return this._blocks;
        }
        /**
         * @name          parse
         * @type          Function
         *
         * This method is the principal one. Use it to parse a string
         * and get back the object version of it
         *
         * @param       {String}        [string=this._source]        The string to parse
         * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        parse(string = this._source) {
            // extract each docblocks
            const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
            // extracting blocks
            // @ts-ignore
            let blocksArrayStr = string.match(reg);
            let blocks = [];
            if (!Array.isArray(blocksArrayStr)) {
                blocksArrayStr = [];
            }
            else if (Array.isArray(blocksArrayStr) && blocksArrayStr.length) {
                blocksArrayStr = blocksArrayStr.map((t) => t.trim());
                if (!blocksArrayStr || !blocksArrayStr.length)
                    return [];
                blocks = blocksArrayStr
                    .filter((blockStr) => {
                    const lines = blockStr.split('\n');
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
                        if (line.trim().slice(0, 2) === '//')
                            return false;
                    }
                    return true;
                })
                    .map((block) => {
                    return new SDocblockBlock_1.default(block || ' ', {
                        filepath: this.docblockSettings.filepath || ''
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
        }
        /**
         * @name          toObject
         * @type          Function
         *
         * This method convert the parsed docblocks to a simple object
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toObject() {
            return this.blocks.map((block) => {
                return block.toObject();
            });
        }
    }
    exports.default = SDocblock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0VBQTZDO0lBQzdDLG9FQUE4QztJQUM5QyxzRUFBcUU7SUFDckUsNkNBQTZDO0lBQzdDLHNEQUFrQztJQUNsQyxzREFBa0M7SUFDbEMsNENBQXNCO0lBZ0R0QixhQUFhO0lBQ2IsTUFBTSxTQUFVLFNBQVEsaUJBQVE7UUFxQzlCOzs7Ozs7O1dBT0c7UUFDSCxZQUFZLE1BQWMsRUFBRSxRQUFpQztZQUMzRCxLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxRQUFRLEVBQUU7b0JBQ1IsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNyQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7d0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQUUsT0FBTyxHQUFHLENBQUM7d0JBRXpCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFFdEIsc0RBQXNEO3dCQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTOzRCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU87NEJBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQzt3QkFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVzs0QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPOzRCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzNCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVU7NEJBQUUsR0FB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