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
import __isPath from '@coffeekraken/sugar/node/fs/isPath';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __require from '@coffeekraken/sugar/node/esm/require';
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
                filter: undefined,
                filterByTag: undefined,
                sortFunction: (a, b) => {
                    var _a, _b, _c, _d;
                    let res = 0;
                    if (!b || !a)
                        return res;
                    const aObj = a.toObject(), bObj = b.toObject();
                    // if (.object.namespace && !aObj.namespace) res -= 1;
                    if (bObj.namespace)
                        res += 1;
                    if (((_a = bObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'class')
                        res += 1;
                    if (bObj.constructor)
                        res += 1;
                    if (bObj.private)
                        res += 1;
                    if (((_b = bObj.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'function')
                        res += 1;
                    if (((_c = bObj.name) === null || _c === void 0 ? void 0 : _c.length) > ((_d = aObj.name) === null || _d === void 0 ? void 0 : _d.length))
                        res += 1;
                    return res;
                },
                filepath: null,
                renderMarkdown: false,
                markedOptions: {},
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
            const __fs = __require('fs');
            if (!__fs.existsSync(source))
                throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
            this.docblockSettings.filepath = source;
            this._source = __fs.readFileSync(source, 'utf8');
            this._packageJson = __packageJsonSync(source);
        }
        else {
            this._source = source;
        }
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
            const regDefault = /(\/\*{2})([\s\S]+?)(\*\/)/g;
            const regMarkup = /(<!--)([\s\S]+?)((-->))/g;
            let blocksArrayStr = [];
            // extracting blocks
            // @ts-ignore
            const regDefaultMatches = string.match(regDefault);
            if (regDefaultMatches === null || regDefaultMatches === void 0 ? void 0 : regDefaultMatches.length) {
                // regDefaultMatches.forEach((matchStr) => {
                //     string = string.replace(matchStr, '');
                // });
                blocksArrayStr = [...regDefaultMatches];
            }
            // const regMarkupMatches = string.match(regMarkup);
            // if (regMarkupMatches?.length) {
            //     regMarkupMatches.forEach((matchStr) => {
            //         string = string.replace(matchStr, '');
            //     });
            //     blocksArrayStr = [...blocksArrayStr, ...regMarkupMatches];
            // }
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
                        for (let i = 0; i <
                            Object.keys(this.docblockSettings.filterByTag).length; i++) {
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
                                        if (tagValueValue
                                            .trim()
                                            .match(tagFilterFilter)) {
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
                        renderMarkdown: this.docblockSettings.renderMarkdown,
                        markedOptions: this.docblockSettings.markedOptions,
                    },
                });
                yield docblockBlock.parse();
                blocks[i] = docblockBlock;
            }
            if (blocks && blocks.length) {
                this._blocks = blocks;
            }
            if (typeof this.docblockSettings.filter === 'function') {
                // @ts-ignore
                this._blocks = this._blocks.filter((docblockBlock) => {
                    // @ts-ignore
                    return this.docblockSettings.filter(docblockBlock.toObject(), docblockBlock);
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQXFDLE1BQU0sa0JBQWtCLENBQUM7QUFDckUsNkNBQTZDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxTQUFTLE1BQU0sc0NBQXNDLENBQUM7QUFxRDdELGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxRQUFRO0lBZ0Q1Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBaUM7UUFFekQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFFBQVEsRUFBRTtnQkFDTixNQUFNLEVBQUUsU0FBUztnQkFDakIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7b0JBQ25CLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFFWixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFBRSxPQUFPLEdBQUcsQ0FBQztvQkFFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUV4QixzREFBc0Q7b0JBQ3RELElBQUksSUFBSSxDQUFDLFNBQVM7d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsV0FBVyxFQUFFLE1BQUssT0FBTzt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29C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