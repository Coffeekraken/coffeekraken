"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const fs_1 = require("@coffeekraken/sugar/fs");
const package_1 = require("@coffeekraken/sugar/package");
const fs_2 = __importDefault(require("fs"));
// import __markdown from './markdown/index';
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const SDocblockBlock_1 = __importDefault(require("./SDocblockBlock"));
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
        super((0, object_1.__deepMerge)({
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
        if ((0, fs_1.__isPath)(source)) {
            if (!(0, is_1.__isNode)())
                throw new Error(`Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`);
            if (!fs_2.default.existsSync(source))
                throw new Error(`Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`);
            this.settings.filePath = source;
            this._source = fs_2.default.readFileSync(source, 'utf8');
            this._packageJson = (0, package_1.__packageJsonSync)(source);
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
                const docblockBlock = new SDocblockBlock_1.default(block || ' ', {
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
exports.default = SDocblock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLCtDQUFrRDtBQUNsRCx5REFBZ0U7QUFDaEUsNENBQXNCO0FBQ3RCLDZDQUE2QztBQUM3QywrQ0FBa0Q7QUFDbEQsdURBQXlEO0FBRXpELHNFQUFnRDtBQThEaEQsYUFBYTtBQUNiLE1BQU0sU0FBVSxTQUFRLGlCQUFRO0lBa0M1Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxNQUFjLEVBQUUsUUFBc0M7UUFDOUQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ25CLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFWixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFBRSxPQUFPLEdBQUcsQ0FBQztnQkFFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUNyQixJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV4QixzREFBc0Q7Z0JBQ3RELElBQUksSUFBSSxDQUFDLFNBQVM7b0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FBRSxXQUFXLGtEQUFJLE1BQUssT0FBTztvQkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLElBQUksQ0FBQyxXQUFXO29CQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQUksSUFBSSxDQUFDLE9BQU87b0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FB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