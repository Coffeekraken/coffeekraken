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
            const __fs = __require()('fs');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sZ0JBQXFDLE1BQU0sa0JBQWtCLENBQUM7QUFDckUsNkNBQTZDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxTQUFTLE1BQU0sc0NBQXNDLENBQUM7QUFtRDdELGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxRQUFRO0lBZ0Q1Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBaUM7UUFDekQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsU0FBUztnQkFDdEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUVaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUFFLE9BQU8sR0FBRyxDQUFDO29CQUV6QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3JCLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRXhCLHNEQUFzRDtvQkFDdEQsSUFBSSxJQUFJLENBQUMsU0FBUzt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FBRSxXQUFXLEVBQUUsTUFBSyxPQUFPO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ25ELElBQUksSUFBSSxDQUFDLFdB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