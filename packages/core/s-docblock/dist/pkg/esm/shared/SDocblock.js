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
import { __isPath } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __fs from 'fs';
// import __markdown from './markdown/index.js';
import { __isNode } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SDocblockBlock from './SDocblockBlock.js';
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
        this._parsed = false;
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
    parse(string = this._source) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            // extract each docblocks
            const regDefault = /(['"`\s]+)?(\/\*{2})([\s\S]+?)(\*\/)/g;
            // update parsed flag
            this._parsed = true;
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
                yield docblockBlock.parse();
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
        if (!this._parsed) {
            throw new Error(`<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`);
        }
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
        if (!this._parsed) {
            throw new Error(`<red>[SDocblock]</red> Before accessing any block, you MUST call the "parse" async method...`);
        }
        return this.blocks
            .map((block) => {
            return block.toString();
        })
            .join('\n');
    }
}
export default SDocblock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsZ0RBQWdEO0FBQ2hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxnQkFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQThEbkQsYUFBYTtBQUNiLE1BQU0sU0FBVSxTQUFRLFFBQVE7SUFrQzVCOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQWMsRUFBRSxRQUFzQztRQUM5RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksTUFBTSxFQUFFLFNBQVM7WUFDakIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUVaLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUFFLE9BQU8sR0FBRyxDQUFDO2dCQUV6QixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQ3JCLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRXhCLHNEQUFzRDtnQkFDdEQsSUFBSSxJQUFJLENBQUMsU0FBUztvQkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFdBQVcsa0RBQUksTUFBSyxPQUFPO29CQUFFLEdB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