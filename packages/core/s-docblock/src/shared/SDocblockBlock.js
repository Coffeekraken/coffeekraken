var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/object/map", "./tags/author", "./tags/simpleValue", "./tags/description", "./tags/return", "./tags/example", "./tags/param", "./tags/snippet"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const map_1 = __importDefault(require("@coffeekraken/sugar/shared/object/map"));
    const author_1 = __importDefault(require("./tags/author"));
    const simpleValue_1 = __importDefault(require("./tags/simpleValue"));
    const description_1 = __importDefault(require("./tags/description"));
    const return_1 = __importDefault(require("./tags/return"));
    const example_1 = __importDefault(require("./tags/example"));
    const param_1 = __importDefault(require("./tags/param"));
    const snippet_1 = __importDefault(require("./tags/snippet"));
    // @ts-ignore
    class SDocblockBlock extends s_class_1.default {
        /**
         * @name          constructor
         * @type          Function
         * @contructor
         *
         * Constructor
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(source, settings = {}) {
            super(deepMerge_1.default({
                docblockBlock: {
                    filepath: null,
                    tags: SDocblockBlock.tagsMap
                }
            }, settings));
            this._source = source.trim();
            // parse the docblock string
            this._blockObj = this.parse();
        }
        /**
         * @name          registerTag
         * @type          Function
         * @static
         *
         * This static method allows you to register a new tag that will
         * be recognized by the SDocblockBlock class.
         *
         * @param     {String}      tagName       The tag you want to register without the @
         * @param     {Function}    parser    A function that will be called with the string tag content. You can parse this string and return an object that represent the tag data
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
         */
        static registerTag(tagName, parser) {
            // check the params
            if (typeof parser !== 'function')
                throw new Error(`The "<yellow>parser</yellow>" parameter of the static "<cyan>SDocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`);
            // register the tag
            SDocblockBlock.tagsMap[tagName] = parser;
        }
        /**
         * @name        docblockBlockSettings
         * @type        ISDocblockBlockSettings
         * @get
         *
         * Access the docblockBlock settings
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get docblockBlockSettings() {
            return this._settings.docblockBlock;
        }
        /**
         * @name          toString
         * @type          Function
         *
         * This method return the passed source string
         *
         * @return      {String}              The passed docblock string
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toString() {
            return this._source.trim();
        }
        /**
         * @name          toObject
         * @type          Function
         *
         * This method return the parsed docblock object
         *
         * @return      {Object}              The parsed dobclock object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        toObject() {
            return this._blockObj;
        }
        /**
         * @name          parse
         * @type          Function
         * @private
         *
         * This method take a docblick string and parse it to a javascript object
         *
         * @return      {Object}          The object version of the source string
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        parse() {
            // some variables
            let currentTag;
            let currentContent = [];
            let currentObj = {};
            let docblockObj = {};
            let previousWasEmptyLine = false;
            function add() {
                if (currentContent.length)
                    currentObj.content = currentContent;
                if (docblockObj.hasOwnProperty(currentTag) &&
                    !Array.isArray(docblockObj[currentTag])) {
                    const currentValue = docblockObj[currentTag];
                    docblockObj[currentTag] = [currentValue];
                }
                if (!currentObj.value)
                    currentObj.value = true;
                if (Array.isArray(docblockObj[currentTag])) {
                    docblockObj[currentTag].push(currentObj);
                }
                else {
                    docblockObj[currentTag] = currentObj;
                }
                currentObj = {};
                currentContent = [];
                // @ts-ignore
                currentTag = undefined;
            }
            // split the block by tags
            let lines = this._source.trim().split('\n');
            if (!lines || !lines.length)
                return null;
            lines = lines.map((l) => l.trim());
            lines.forEach((line) => {
                // get the tag name
                const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
                const tagNameMatch = line.match(tagNameReg);
                if (line.replace('*', '').trim() === '') {
                    if (currentContent.length > 0) {
                        currentContent.push('');
                    }
                    else {
                        if (currentTag && currentObj.value) {
                            add();
                        }
                        previousWasEmptyLine = true;
                    }
                }
                else if (tagNameMatch) {
                    if (currentTag) {
                        add();
                    }
                    currentTag = tagNameMatch[1];
                    line = line.replace(tagNameMatch[0], '').trim();
                    if (line.length > 0) {
                        currentObj.value = line;
                    }
                    else {
                        currentObj.value = true;
                    }
                    previousWasEmptyLine = false;
                }
                else if (previousWasEmptyLine) {
                    currentTag = 'description';
                    currentContent = [line.replace('*', '')];
                    currentObj = {};
                    previousWasEmptyLine = false;
                }
                else {
                    line = line.replace('/**', '');
                    line = line.replace('*/', '');
                    line = line.replace('* ', '');
                    line = line.replace('*', '');
                    if (line.trim().length) {
                        currentContent.push(line);
                    }
                }
            });
            add();
            docblockObj = map_1.default(docblockObj, ({ value, prop }) => {
                if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_')
                    return value;
                if (this.docblockBlockSettings.tags[prop] && prop !== 'src')
                    return this.docblockBlockSettings.tags[prop](value);
                return simpleValue_1.default(value);
            });
            // if (
            //   docblockObj['src'] &&
            //   __isNode() &&
            //   this.docblockBlockSettings.filepath
            // ) {
            //   const absoluteFilepath = __path.resolve(
            //     this.docblockBlockSettings.filepath,
            //     docblockObj['src']
            //   );
            //   const srcValue = __fs.readFileSync(absoluteFilepath, 'utf8');
            //   const srcDocblockInstance = new __SDocblock(srcValue);
            //   const srcBlocks: any[] = srcDocblockInstance.parse();
            //   if (srcBlocks.length) {
            //     const tags = srcBlocks[0].parse();
            //     docblockObj = __deepMege(docblockObj, tags);
            //   }
            // }
            // save the raw string
            docblockObj.raw = this._source.toString();
            // return the parsed docblock object
            return docblockObj;
        }
    }
    /**
     * @name            tagsMap
     * @type            Object
     * @static
     *
     * Store the default tags mapping to their parsing functions
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    SDocblockBlock.tagsMap = {};
    SDocblockBlock.registerTag('author', author_1.default);
    SDocblockBlock.registerTag('abstract', simpleValue_1.default);
    SDocblockBlock.registerTag('final', simpleValue_1.default);
    SDocblockBlock.registerTag('async', simpleValue_1.default);
    SDocblockBlock.registerTag('generator', simpleValue_1.default);
    SDocblockBlock.registerTag('global', simpleValue_1.default);
    SDocblockBlock.registerTag('constructor', simpleValue_1.default);
    SDocblockBlock.registerTag('hideconstructor', simpleValue_1.default);
    SDocblockBlock.registerTag('ignore', simpleValue_1.default);
    SDocblockBlock.registerTag('inheritdoc', simpleValue_1.default);
    SDocblockBlock.registerTag('inner', simpleValue_1.default);
    SDocblockBlock.registerTag('instance', simpleValue_1.default);
    SDocblockBlock.registerTag('mixin', simpleValue_1.default);
    SDocblockBlock.registerTag('override', simpleValue_1.default);
    SDocblockBlock.registerTag('access', simpleValue_1.default);
    SDocblockBlock.registerTag('category', simpleValue_1.default);
    SDocblockBlock.registerTag('copyright', simpleValue_1.default);
    SDocblockBlock.registerTag('deprecated', simpleValue_1.default);
    SDocblockBlock.registerTag('alias', simpleValue_1.default);
    SDocblockBlock.registerTag('augments', simpleValue_1.default);
    SDocblockBlock.registerTag('callback', simpleValue_1.default);
    SDocblockBlock.registerTag('class', simpleValue_1.default);
    SDocblockBlock.registerTag('classdesc', simpleValue_1.default);
    SDocblockBlock.registerTag('constant', simpleValue_1.default);
    SDocblockBlock.registerTag('constructs', simpleValue_1.default);
    SDocblockBlock.registerTag('copyright', simpleValue_1.default);
    SDocblockBlock.registerTag('default', simpleValue_1.default);
    SDocblockBlock.registerTag('deprecated', simpleValue_1.default);
    SDocblockBlock.registerTag('exports', simpleValue_1.default);
    SDocblockBlock.registerTag('external', simpleValue_1.default);
    SDocblockBlock.registerTag('host', simpleValue_1.default);
    SDocblockBlock.registerTag('file', simpleValue_1.default);
    SDocblockBlock.registerTag('function', simpleValue_1.default);
    SDocblockBlock.registerTag('func', simpleValue_1.default);
    SDocblockBlock.registerTag('method', simpleValue_1.default);
    SDocblockBlock.registerTag('implements', simpleValue_1.default);
    SDocblockBlock.registerTag('interface', simpleValue_1.default);
    SDocblockBlock.registerTag('kind', simpleValue_1.default);
    SDocblockBlock.registerTag('lends', simpleValue_1.default);
    SDocblockBlock.registerTag('license', simpleValue_1.default);
    SDocblockBlock.registerTag('memberof', simpleValue_1.default);
    SDocblockBlock.registerTag('memberof', simpleValue_1.default);
    SDocblockBlock.registerTag('mixes', simpleValue_1.default);
    SDocblockBlock.registerTag('module', simpleValue_1.default);
    SDocblockBlock.registerTag('name', simpleValue_1.default);
    SDocblockBlock.registerTag('namespace', simpleValue_1.default);
    SDocblockBlock.registerTag('package', simpleValue_1.default);
    SDocblockBlock.registerTag('private', simpleValue_1.default);
    SDocblockBlock.registerTag('protected', simpleValue_1.default);
    SDocblockBlock.registerTag('public', simpleValue_1.default);
    SDocblockBlock.registerTag('readonly', simpleValue_1.default);
    SDocblockBlock.registerTag('requires', simpleValue_1.default);
    SDocblockBlock.registerTag('see', simpleValue_1.default);
    SDocblockBlock.registerTag('since', simpleValue_1.default);
    SDocblockBlock.registerTag('static', simpleValue_1.default);
    SDocblockBlock.registerTag('summary', simpleValue_1.default);
    SDocblockBlock.registerTag('this', simpleValue_1.default);
    SDocblockBlock.registerTag('todo', simpleValue_1.default);
    SDocblockBlock.registerTag('tutorial', simpleValue_1.default);
    SDocblockBlock.registerTag('type', simpleValue_1.default);
    SDocblockBlock.registerTag('variation', simpleValue_1.default);
    SDocblockBlock.registerTag('version', simpleValue_1.default);
    SDocblockBlock.registerTag('enum', simpleValue_1.default);
    SDocblockBlock.registerTag('src', simpleValue_1.default);
    SDocblockBlock.registerTag('description', description_1.default);
    SDocblockBlock.registerTag('desc', description_1.default);
    // SDocblockBlock.registerTag('yields', __yieldsTag);
    // SDocblockBlock.registerTag('typedef', __typedefTag);
    // SDocblockBlock.registerTag('throws', __throwsTag);
    SDocblockBlock.registerTag('return', return_1.default);
    SDocblockBlock.registerTag('param', param_1.default);
    SDocblockBlock.registerTag('property', param_1.default);
    SDocblockBlock.registerTag('prop', param_1.default);
    // SDocblockBlock.registerTag('listens', __listensTag);
    // SDocblockBlock.registerTag('member', __memberTag);
    // SDocblockBlock.registerTag('var', __memberTag);
    // SDocblockBlock.registerTag('event', __eventTag);
    // SDocblockBlock.registerTag('borrows', __borrowsTag);
    SDocblockBlock.registerTag('snippet', snippet_1.default);
    SDocblockBlock.registerTag('example', example_1.default);
    exports.default = SDocblockBlock;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9FQUE2QztJQUM3Qyw0RkFBcUU7SUFDckUsZ0ZBQTBEO0lBRzFELDJEQUF3QztJQUN4QyxxRUFBa0Q7SUFDbEQscUVBQWtEO0lBQ2xELDJEQUF3QztJQUN4Qyw2REFBMEM7SUFDMUMseURBQXNDO0lBQ3RDLDZEQUEwQztJQWtEMUMsYUFBYTtJQUNiLE1BQU0sY0FBZSxTQUFRLGlCQUFRO1FBd0VuQzs7Ozs7Ozs7V0FRRztRQUNILFlBQVksTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1lBQy9CLEtBQUssQ0FDSCxtQkFBVSxDQUNSO2dCQUNFLGFBQWEsRUFBRTtvQkFDYixRQUFRLEVBQUUsSUFBSTtvQkFDZCxJQUFJLEVBQUUsY0FBYyxDQUFDLE9BQU87aUJBQzdCO2FBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0IsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUEvREQ7Ozs7Ozs7Ozs7Ozs7V0FhRztRQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLE1BQWdCO1lBQ2xELG1CQUFtQjtZQUNuQixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVU7Z0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMElBQTBJLENBQzNJLENBQUM7WUFDSixtQkFBbUI7WUFDbkIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDM0MsQ0FBQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUkscUJBQXFCO1lBQ3ZCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQztRQTZCRDs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSztZQUNILGlCQUFpQjtZQUNqQixJQUFJLFVBQWtCLENBQUM7WUFDdkIsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO1lBQ2xDLElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztZQUN6QixJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7WUFDMUIsSUFBSSxvQkFBb0IsR0FBRyxLQUFLLENBQUM7WUFFakMsU0FBUyxHQUFHO2dCQUNWLElBQUksY0FBYyxDQUFDLE1BQU07b0JBQUUsVUFBVSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBQy9ELElBQ0UsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7b0JBQ3RDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFDdkM7b0JBQ0EsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3QyxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDMUM7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO29CQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUU7b0JBQzFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNMLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7aUJBQ3RDO2dCQUNELFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ2hCLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLGFBQWE7Z0JBQ2IsVUFBVSxHQUFHLFNBQVMsQ0FBQztZQUN6QixDQUFDO1lBRUQsMEJBQTBCO1lBQzFCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFFbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNyQixtQkFBbUI7Z0JBQ25CLE1BQU0sVUFBVSxHQUFHLHdCQUF3QixDQUFDO2dCQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDdkMsSUFBSSxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDN0IsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDekI7eUJBQU07d0JBQ0wsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTs0QkFDbEMsR0FBRyxFQUFFLENBQUM7eUJBQ1A7d0JBQ0Qsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO3FCQUM3QjtpQkFDRjtxQkFBTSxJQUFJLFlBQVksRUFBRTtvQkFDdkIsSUFBSSxVQUFVLEVBQUU7d0JBQ2QsR0FBRyxFQUFFLENBQUM7cUJBQ1A7b0JBQ0QsVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNoRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuQixVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFDekI7eUJBQU07d0JBQ0wsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUJBQ3pCO29CQUNELG9CQUFvQixHQUFHLEtBQUssQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxvQkFBb0IsRUFBRTtvQkFDL0IsVUFBVSxHQUFHLGFBQWEsQ0FBQztvQkFDM0IsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDekMsVUFBVSxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQy9CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM5QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzdCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTt3QkFDdEIsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDM0I7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsRUFBRSxDQUFDO1lBRU4sV0FBVyxHQUFHLGFBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ3hFLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssS0FBSztvQkFDekQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxPQUFPLHFCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTztZQUNQLDBCQUEwQjtZQUMxQixrQkFBa0I7WUFDbEIsd0NBQXdDO1lBQ3hDLE1BQU07WUFDTiw2Q0FBNkM7WUFDN0MsMkNBQTJDO1lBQzNDLHlCQUF5QjtZQUN6QixPQUFPO1lBRVAsa0VBQWtFO1lBQ2xFLDJEQUEyRDtZQUMzRCwwREFBMEQ7WUFDMUQsNEJBQTRCO1lBQzVCLHlDQUF5QztZQUN6QyxtREFBbUQ7WUFDbkQsTUFBTTtZQUNOLElBQUk7WUFFSixzQkFBc0I7WUFDdEIsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRTFDLG9DQUFvQztZQUNwQyxPQUFPLFdBQVcsQ0FBQztRQUNyQixDQUFDOztJQXRQRDs7Ozs7Ozs7T0FRRztJQUNJLHNCQUFPLEdBQTJCLEVBQUUsQ0FBQztJQWdQOUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsZ0JBQVcsQ0FBQyxDQUFDO0lBQ2xELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDMUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN2RCxjQUFjLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQzVELGNBQWMsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUNoRSxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDckQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDckQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN2RCxjQUFjLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDMUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN2RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDMUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3hELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDMUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN2RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUNwRCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDckQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDMUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLHFCQUFnQixDQUFDLENBQUM7SUFDcEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUscUJBQWdCLENBQUMsQ0FBQztJQUM1RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxxQkFBZ0IsQ0FBQyxDQUFDO0lBQ3JELHFEQUFxRDtJQUNyRCx1REFBdUQ7SUFDdkQscURBQXFEO0lBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGdCQUFXLENBQUMsQ0FBQztJQUNsRCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxlQUFVLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxlQUFVLENBQUMsQ0FBQztJQUNuRCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxlQUFVLENBQUMsQ0FBQztJQUMvQyx1REFBdUQ7SUFDdkQscURBQXFEO0lBQ3JELGtEQUFrRDtJQUNsRCxtREFBbUQ7SUFDbkQsdURBQXVEO0lBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGlCQUFZLENBQUMsQ0FBQztJQUNwRCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxpQkFBWSxDQUFDLENBQUM7SUFFcEQsa0JBQWUsY0FBYyxDQUFDIn0=