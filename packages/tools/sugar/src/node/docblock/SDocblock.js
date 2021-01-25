"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
// import __markdown from './markdown/index';
const node_1 = __importDefault(require("../is/node"));
const path_1 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
module.exports = class SDocblock {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(source, settings = {}) {
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
        }, settings);
        // check if the source is path
        if (path_1.default(source)) {
            if (!node_1.default())
                throw new SError_1.default(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
            if (!fs_1.default.existsSync(source))
                throw new SError_1.default(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
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
    sort(sortFunction = null) {
        if (!sortFunction)
            sortFunction = this._settings.sortFunction;
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
     * @return      {SDocblock}                     The class instance itself to maintain chainability
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    parse(string = this._source) {
        // extract each docblocks
        const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
        // extracting blocks
        let blocksArray = string.match(reg);
        if (!Array.isArray(blocksArray)) {
            blocksArray = [];
        }
        else if (Array.isArray(blocksArray) && blocksArray.length) {
            blocksArray = blocksArray.map((t) => t.trim());
            if (!blocksArray || !blocksArray.length)
                return [];
            blocksArray = blocksArray.map((block) => {
                return new SDocblockBlock_1.default(block || ' ', {
                    filepath: this._settings.filepath || ''
                });
            });
        }
        // save the blocks
        this._blocks = blocksArray;
        // sort the blocks
        this.sort();
        // return the class instance itself
        return this;
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDZEQUF1QztBQUN2QyxvRUFBOEM7QUFDOUMsc0VBQWdEO0FBRWhELDZDQUE2QztBQUM3QyxzREFBa0M7QUFDbEMsc0RBQWtDO0FBQ2xDLDRDQUFzQjtBQTRCdEIsaUJBQVMsTUFBTSxTQUFTO0lBNkN0Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFwRGpDOzs7Ozs7OztXQVFHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztRQUVmOzs7Ozs7OztXQVFHO1FBQ0gsUUFBRyxHQUFHLElBQUksQ0FBQztRQVdULElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFWixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFBRSxPQUFPLEdBQUcsQ0FBQztnQkFFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV0QixzREFBc0Q7Z0JBQ3RELElBQUksSUFBSSxDQUFDLFNBQVM7b0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTztvQkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUMvRCxJQUFJLElBQUksQ0FB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