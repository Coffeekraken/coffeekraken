var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocblockBlock from './SDocblockBlock';
// import __markdown from './markdown/index';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __isPath from '@coffeekraken/sugar/shared/is/path';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
// @ts-ignore
class SDocblock extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    constructor(source, settings) {
        super(__deepMerge({
            docblock: {
                filterByTag: undefined,
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
        if (__isPath(source)) {
            if (!__isNode())
                throw new Error(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
            (() => __awaiter(this, void 0, void 0, function* () {
                const { default: __fs } = yield import('fs');
                if (!__fs.existsSync(source))
                    throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
                this._source = __fs.readFileSync(source, 'utf8');
                this._packageJson = __packageJsonSync(source);
            }))();
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
    // /**
    //  * @name        getBlockByName
    //  * @type        Function
    //  *
    //  * Get a block by it's name
    //  *
    //  * @param       {String}        name      The name you want to get block for
    //  * @return      SDocblockBlock            The getted block
    //  *
    //  * @since     2.0.0
    //  * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //  */
    // getBlockByName(name: string): __SDocblockBlock {
    //   // for (let i = 0; this._blocks.length; i++) {
    //   //   const block = this._blocks[i];
    //   //   console.log(block);
    //   // }
    // }
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
                if (this.docblockSettings.filterByTag) {
                    let isBlockMatchFilter = true;
                    for (let i = 0; i < Object.keys(this.docblockSettings.filterByTag).length; i++) {
                        const tagName = Object.keys(this.docblockSettings.filterByTag)[i];
                        const tagFilter = this.docblockSettings.filterByTag[tagName];
                        const tagValueReg = new RegExp(`@${tagName}([^\n]+)`);
                        const tagValue = blockStr.match(tagValueReg);
                        const tagFilterArray = Array.isArray(tagFilter)
                            ? tagFilter
                            : [tagFilter];
                        let isMatchOrCondition = false;
                        if (tagValue && tagValue[1]) {
                            const tagValueValue = tagValue[1].trim();
                            for (let j = 0; j < tagFilterArray.length; j++) {
                                const tagFilterFilter = tagFilterArray[j];
                                if (typeof tagFilterFilter === 'string') {
                                    if (tagValueValue === tagFilterFilter) {
                                        isMatchOrCondition = true;
                                        break;
                                    }
                                }
                                else if (tagFilterFilter instanceof RegExp) {
                                    if (tagValueValue.trim().match(tagFilterFilter)) {
                                        isMatchOrCondition = true;
                                        break;
                                    }
                                }
                                else if (typeof tagFilterFilter === 'function') {
                                    if (tagFilterFilter(tagValueValue.trim())) {
                                        isMatchOrCondition = true;
                                        break;
                                    }
                                }
                                else {
                                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed "<yellow>${tagName}</yellow>" filterByTag filter can be only a RegExp or a function`);
                                }
                            }
                        }
                        if (!isMatchOrCondition)
                            isBlockMatchFilter = false;
                    }
                    if (isBlockMatchFilter)
                        return true;
                    return false;
                }
                return true;
            })
                .map((block) => {
                return new __SDocblockBlock(block || ' ', {
                    docblockBlock: {
                        packageJson: this._packageJson,
                        filepath: this.docblockSettings.filepath || ''
                    }
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
    /**
     * @name        toString
     * @type        Function
     *
     * This method allows you to get the string version of the docblock(s)
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    toString() {
        return this.blocks
            .map((block) => {
            return block.toString();
        })
            .join('\n');
    }
}
export default SDocblock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQXFDLE1BQU0sa0JBQWtCLENBQUM7QUFDckUsNkNBQTZDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFpRDFFLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxRQUFRO0lBZ0Q5Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBaUM7UUFDM0QsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFFBQVEsRUFBRTtnQkFDUixXQUFXLEVBQUUsU0FBUztnQkFDdEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUUsT0FBTyxHQUFHLENBQUM7b0JBRXpCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFdEIsc0RBQXNEO29CQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU87d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVzt3QkFBRSxHQUFHLElBQUksQ0FBQyxD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