"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SClass_1 = __importDefault(require("../class/SClass"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
// import __markdown from './markdown/index';
const node_1 = __importDefault(require("../is/node"));
const path_1 = __importDefault(require("../is/path"));
const fs_1 = __importDefault(require("fs"));
// @ts-ignore
class SDocblock extends SClass_1.default {
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
     * @return      {SDocblock}                                   The class instance itself to maintain chainability
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
     * @return      {Array<SDocblockBlock>}                       An array of SDocblockBlock instances
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxVQUFVOzs7OztBQUVWLDZEQUF1QztBQUV2QyxvRUFBOEM7QUFDOUMsc0VBQXFFO0FBRXJFLDZDQUE2QztBQUM3QyxzREFBa0M7QUFDbEMsc0RBQWtDO0FBQ2xDLDRDQUFzQjtBQW9EdEIsYUFBYTtBQUNiLE1BQU0sU0FBVSxTQUFRLGdCQUFRO0lBcUM5Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBaUM7UUFDM0QsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxRQUFRLEVBQUU7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUUsT0FBTyxHQUFHLENBQUM7b0JBRXpCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFdEIsc0RBQXNEO29CQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU87d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVzt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUMvQixJQUFJLElBQUksQ0FBQyxPQUFPO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzNCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVU7d0JBQUUsR0FB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