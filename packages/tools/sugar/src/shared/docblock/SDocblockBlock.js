var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "../object/deepMerge", "../object/map", "../is/node", "./tags/author", "./tags/simpleValue", "./tags/description", "./tags/return", "./tags/example", "./tags/param", "./tags/snippet", "fs", "path", "./SDocblock"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const map_1 = __importDefault(require("../object/map"));
    const node_1 = __importDefault(require("../is/node"));
    const author_1 = __importDefault(require("./tags/author"));
    const simpleValue_1 = __importDefault(require("./tags/simpleValue"));
    const description_1 = __importDefault(require("./tags/description"));
    const return_1 = __importDefault(require("./tags/return"));
    const example_1 = __importDefault(require("./tags/example"));
    const param_1 = __importDefault(require("./tags/param"));
    const snippet_1 = __importDefault(require("./tags/snippet"));
    const fs_1 = __importDefault(require("fs"));
    const path_1 = __importDefault(require("path"));
    const SDocblock_1 = __importDefault(require("./SDocblock"));
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
            if (docblockObj['src'] &&
                node_1.default() &&
                this.docblockBlockSettings.filepath) {
                const absoluteFilepath = path_1.default.resolve(this.docblockBlockSettings.filepath, docblockObj['src']);
                const srcValue = fs_1.default.readFileSync(absoluteFilepath, 'utf8');
                const srcDocblockInstance = new SDocblock_1.default(srcValue);
                const srcBlocks = srcDocblockInstance.parse();
                if (srcBlocks.length) {
                    const tags = srcBlocks[0].parse();
                    docblockObj = deepMerge_1.default(docblockObj, tags);
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLG9FQUE2QztJQUM3QyxvRUFBNkM7SUFDN0Msd0RBQWtDO0lBQ2xDLHNEQUFrQztJQUVsQywyREFBd0M7SUFDeEMscUVBQWtEO0lBQ2xELHFFQUFrRDtJQUNsRCwyREFBd0M7SUFDeEMsNkRBQTBDO0lBQzFDLHlEQUFzQztJQUN0Qyw2REFBMEM7SUFFMUMsNENBQXNCO0lBQ3RCLGdEQUEwQjtJQUUxQiw0REFBc0M7SUErQ3RDLGFBQWE7SUFDYixNQUFNLGNBQWUsU0FBUSxpQkFBUTtRQXdFbkM7Ozs7Ozs7O1dBUUc7UUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtZQUMvQixLQUFLLENBQ0gsbUJBQVUsQ0FDUjtnQkFDRSxhQUFhLEVBQUU7b0JBQ2IsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO2lCQUM3QjthQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLDRCQUE0QjtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxDQUFDO1FBL0REOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQWUsRUFBRSxNQUFnQjtZQUNsRCxtQkFBbUI7WUFDbkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVO2dCQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLDBJQUEwSSxDQUMzSSxDQUFDO1lBQ0osbUJBQW1CO1lBQ25CLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQzNDLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7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