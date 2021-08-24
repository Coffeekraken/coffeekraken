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
                },
            },
        }, settings || {}));
        /**
         * @name            _source
         * @type            String|Array<Object>
         * @private
         *
         * Store the passed source
         *
         * @author 	Olivier Bossel <olivier.bossel@gmail.com>
         */
        this._source = '';
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
        // (async () => {
        //     this._blocks = this.parse();
        // })();
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
        if (!this._blocks) {
            throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
        }
        return this._blocks;
    }
    /**
     * @name          parse
     * @type          Function
     * @async
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
        return __awaiter(this, void 0, void 0, function* () {
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
                blocksArrayStr = blocksArrayStr.filter((blockStr) => {
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
                            const tagFilterArray = Array.isArray(tagFilter) ? tagFilter : [tagFilter];
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
                });
            }
            for (let i = 0; i < blocksArrayStr.length; i++) {
                const block = blocksArrayStr[i];
                const docblockBlock = new __SDocblockBlock(block || ' ', {
                    docblockBlock: {
                        packageJson: this._packageJson,
                        filepath: this.docblockSettings.filepath || '',
                    },
                });
                yield docblockBlock.parse();
                blocks[i] = docblockBlock;
            }
            if (blocks && blocks.length) {
                this._blocks = blocks;
            }
            // sort
            this.sort();
            // return the class instance itself
            return this._blocks;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQXFDLE1BQU0sa0JBQWtCLENBQUM7QUFDckUsNkNBQTZDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFpRDFFLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxRQUFRO0lBZ0Q1Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBaUM7UUFDekQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsU0FBUztnQkFDdEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUUsT0FBTyxHQUFHLENBQUM7b0JBRXpCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDckIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFFeEIsc0RBQXNEO29CQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU87d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxJQUFJLENBQUMsV0FBVzt3QkFBRSxHQUFHLElBQUksQ0FBQyxD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