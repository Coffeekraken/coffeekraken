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
import __packageJson from '@coffeekraken/sugar/node/package/json';
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
                this._packageJson = __packageJson(source);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQXFDLE1BQU0sa0JBQWtCLENBQUM7QUFDckUsNkNBQTZDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLHVDQUF1QyxDQUFDO0FBaURsRSxhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsUUFBUTtJQWdEOUI7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBYyxFQUFFLFFBQWlDO1FBQzNELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxRQUFRLEVBQUU7Z0JBQ1IsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUVaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUFFLE9BQU8sR0FBRyxDQUFDO29CQUV6QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3ZCLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRXRCLHNEQUFzRDtvQkFDdEQsSUFBSSxJQUFJLENBQUMsU0FBUzt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQy9ELElBQUksSUFBSSxDQUFDLFdBQVc7d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FB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