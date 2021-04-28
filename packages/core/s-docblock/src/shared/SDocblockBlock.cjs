"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZG9jYmxvY2svc3JjL3NoYXJlZC9TRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9FQUE2QztBQUM3Qyw0RkFBcUU7QUFDckUsZ0ZBQTBEO0FBRzFELDJEQUF3QztBQUN4QyxxRUFBa0Q7QUFDbEQscUVBQWtEO0FBQ2xELDJEQUF3QztBQUN4Qyw2REFBMEM7QUFDMUMseURBQXNDO0FBQ3RDLDZEQUEwQztBQWtEMUMsYUFBYTtBQUNiLE1BQU0sY0FBZSxTQUFRLGlCQUFRO0lBd0VuQzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQy9CLEtBQUssQ0FDSCxtQkFBVSxDQUNSO1lBQ0UsYUFBYSxFQUFFO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxjQUFjLENBQUMsT0FBTzthQUM3QjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBL0REOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQWUsRUFBRSxNQUFnQjtRQUNsRCxtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMElBQTBJLENBQzNJLENBQUM7UUFDSixtQkFBbUI7UUFDbkIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJ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