"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
        super(deepMerge_1.default({
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
        // if (__isPath(source)) {
        //   if (!__isNode())
        //     throw new Error(
        //       `Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like "<yellow>${source}</yellow>"...`
        //     );
        //   if (!e.existsSync(source))
        //     throw new Error(
        //       `Sorry but the passed source path "<yellow>${source}</yellow>" does not exists on the filesystem...`
        //     );
        //   this._source = __fs.readFileSync(source, 'utf8');
        // } else {
        this._source = source;
        // }
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
exports.default = SDocblock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRGQUFzRTtBQUN0RSxzRUFBcUU7QUFvRHJFLGFBQWE7QUFDYixNQUFNLFNBQVUsU0FBUSxpQkFBUTtJQXFDOUI7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBYyxFQUFFLFFBQWlDO1FBQzNELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsUUFBUSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3JCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFFWixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFBRSxPQUFPLEdBQUcsQ0FBQztvQkFFekIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUN2QixJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUV0QixzREFBc0Q7b0JBQ3RELElBQUksSUFBSSxDQUFDLFNBQVM7d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTzt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUMvRCxJQUFJLElBQUksQ0FBQyxXQUFXO3dCQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQy9CLElBQUksSUFBSSxDQUFDLE9BQU87d0JBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVTt3QkFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO29CQUNsRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07d0JBQy9ELEdBQUcsSUFBSSxDQUFDLENBQUM7b0JBQ1gsT0FBTyxHQUFHLENBQUM7Z0JBQ2IsQ0FBQztnQkFDRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxFQUFFLEVBQUU7Z0JBQ0YsdUJBQXVCO2lCQUN4QjthQUNGO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQWpFSjs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FBVSxFQUFFLENBQUM7UUEwRGxCLDhCQUE4QjtRQUM5QiwwQkFBMEI7UUFDMUIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2Qiw2SkFBNko7UUFDN0osU0FBUztRQUNULCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsNkdBQTZHO1FBQzdHLFNBQVM7UUFDVCxzREFBc0Q7UUFDdEQsV0FBVztRQUNYLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUk7UUFFSixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQXpFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGdCQUFnQjtRQUNsQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsUUFBUSxDQUFDO0lBQ3hDLENBQUM7SUErREQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsSUFBSSxDQUFDLFlBQXNDO1FBQ3pDLElBQUksQ0FBQyxZQUFZO1lBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7UUFDckUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsSUFBSSxNQUFNO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTTtJQUNOLGlDQUFpQztJQUNqQywyQkFBMkI7SUFDM0IsS0FBSztJQUNMLDhCQUE4QjtJQUM5QixLQUFLO0lBQ0wsK0VBQStFO0lBQy9FLDZEQUE2RDtJQUM3RCxLQUFLO0lBQ0wsc0JBQXNCO0lBQ3RCLG9GQUFvRjtJQUNwRixNQUFNO0lBQ04sbURBQW1EO0lBQ25ELG1EQUFtRDtJQUNuRCx3Q0FBd0M7SUFDeEMsNkJBQTZCO0lBQzdCLFNBQVM7SUFDVCxJQUFJO0lBRUo7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTztRQUN6Qix5QkFBeUI7UUFDekIsTUFBTSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFFbEQsb0JBQW9CO1FBQ3BCLGFBQWE7UUFDYixJQUFJLGNBQWMsR0FBYSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELElBQUksTUFBTSxHQUF1QixFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDbEMsY0FBYyxHQUFHLEVBQUUsQ0FBQztTQUNyQjthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO1lBQ2pFLGNBQWMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFFekQsTUFBTSxHQUFHLGNBQWM7aUJBQ3BCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNuQixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUk7d0JBQUUsT0FBTyxLQUFLLENBQUM7aUJBQ3BEO2dCQUVELElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtvQkFDckMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQzlCLEtBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQ3pELENBQUMsRUFBRSxFQUNIO3dCQUNBLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3RCxNQUFNLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLE9BQU8sVUFBVSxDQUFDLENBQUM7d0JBQ3RELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzdDLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOzRCQUM3QyxDQUFDLENBQUMsU0FBUzs0QkFDWCxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDaEIsSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7d0JBQy9CLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDM0IsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOzRCQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQ0FDOUMsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dDQUMxQyxJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtvQ0FDdkMsSUFBSSxhQUFhLEtBQUssZUFBZSxFQUFFO3dDQUNyQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7d0NBQzFCLE1BQU07cUNBQ1A7aUNBQ0Y7cUNBQU0sSUFBSSxlQUFlLFlBQVksTUFBTSxFQUFFO29DQUM1QyxJQUFJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7d0NBQy9DLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3Q0FDMUIsTUFBTTtxQ0FDUDtpQ0FDRjtxQ0FBTSxJQUFJLE9BQU8sZUFBZSxLQUFLLFVBQVUsRUFBRTtvQ0FDaEQsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7d0NBQ3pDLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3Q0FDMUIsTUFBTTtxQ0FDUDtpQ0FDRjtxQ0FBTTtvQ0FDTCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlDQUF5QyxPQUFPLGtFQUFrRSxDQUNqSixDQUFDO2lDQUNIOzZCQUNGO3lCQUNGO3dCQUNELElBQUksQ0FBQyxrQkFBa0I7NEJBQUUsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO3FCQUNyRDtvQkFDRCxJQUFJLGtCQUFrQjt3QkFBRSxPQUFPLElBQUksQ0FBQztvQkFDcEMsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUM7aUJBQ0QsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxJQUFJLHdCQUFnQixDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUU7b0JBQ3hDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxJQUFJLEVBQUU7aUJBQy9DLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO1FBRUQsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLG1DQUFtQztRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvQixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNO2FBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDYixPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBRUQsa0JBQWUsU0FBUyxDQUFDIn0=