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
import __SPromise from '@coffeekraken/s-promise';
import __isPath from '@coffeekraken/sugar/node/fs/isPath';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __fs from 'fs';
// import __markdown from './markdown/index';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDocblockBlock from './SDocblockBlock';
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
            filter: undefined,
            filterByTag: undefined,
            sortFunction: (a, b) => {
                var _a, _b, _c, _d, _e, _f;
                let res = 0;
                if (!b || !a)
                    return res;
                const aObj = a.toObject(), bObj = b.toObject();
                // if (.object.namespace && !aObj.namespace) res -= 1;
                if (bObj.namespace)
                    res += 1;
                if (((_b = (_a = bObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'class')
                    res += 1;
                if (bObj.constructor)
                    res += 1;
                if (bObj.private)
                    res += 1;
                if (((_d = (_c = bObj.type) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 'function')
                    res += 1;
                if (((_e = bObj.name) === null || _e === void 0 ? void 0 : _e.length) > ((_f = aObj.name) === null || _f === void 0 ? void 0 : _f.length))
                    res += 1;
                return res;
            },
            filePath: null,
            renderMarkdown: false,
            markedOptions: {},
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
            if (!__fs.existsSync(source))
                throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
            this.settings.filePath = source;
            this._source = __fs.readFileSync(source, 'utf8');
            this._packageJson = __packageJsonSync(source);
        }
        else {
            this._source = source;
        }
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
            sortFunction = this.settings.sortFunction;
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    parse(string = this._source) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            // extract each docblocks
            const regDefault = /(['"`\s]+)?(\/\*{2})([\s\S]+?)(\*\/)/g;
            let blocksArrayStr = [];
            // extracting blocks
            // @ts-ignore
            let regDefaultMatches = string.match(regDefault);
            if (regDefaultMatches === null || regDefaultMatches === void 0 ? void 0 : regDefaultMatches.length) {
                regDefaultMatches = regDefaultMatches
                    .filter((match) => {
                    if (match.trim().match(/^['`"]/))
                        return false;
                    return true;
                })
                    .map((match) => {
                    return match.trim();
                });
                blocksArrayStr = [...regDefaultMatches];
            }
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
                    if (this.settings.filterByTag) {
                        let isBlockMatchFilter = true;
                        for (let i = 0; i < Object.keys(this.settings.filterByTag).length; i++) {
                            const tagName = Object.keys(this.settings.filterByTag)[i];
                            const tagFilter = this.settings.filterByTag[tagName];
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
                    packageJson: this._packageJson,
                    filePath: this.settings.filePath || '',
                    renderMarkdown: this.settings.renderMarkdown,
                    markedOptions: this.settings.markedOptions,
                });
                yield pipe(docblockBlock.parse());
                blocks[i] = docblockBlock;
            }
            if (blocks && blocks.length) {
                this._blocks = blocks;
            }
            if (typeof this.settings.filter === 'function') {
                // @ts-ignore
                this._blocks = this._blocks.filter((docblockBlock) => {
                    // @ts-ignore
                    return this.settings.filter(docblockBlock.toObject(), docblockBlock);
                });
            }
            // sort
            this.sort();
            // return the class instance itself
            resolve(this._blocks);
        }));
    }
    /**
     * @name          toObject
     * @type          Function
     *
     * This method convert the parsed docblocks to a simple object
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFDMUUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLDZDQUE2QztBQUM3QyxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBbURoRCxhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsUUFBUTtJQWtDNUI7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBYyxFQUFFLFFBQXNDO1FBQzlELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxNQUFNLEVBQUUsU0FBUztZQUNqQixXQUFXLEVBQUUsU0FBUztZQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBRVosSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQUUsT0FBTyxHQUFHLENBQUM7Z0JBRXpCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFDckIsSUFBSSxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFeEIsc0RBQXNEO2dCQUN0RCxJQUFJLElBQUksQ0FBQyxTQUFTO29CQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQSxNQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsV0FBVyxrREFBSSxNQUFLLE9BQU87b0JBQUUsR0FBRyxJQUFJ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