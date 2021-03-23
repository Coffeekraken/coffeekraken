"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SClass_1 = __importDefault(require("../class/SClass"));
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
class SDocblockBlock extends SClass_1.default {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZEQUF1QztBQUN2QyxvRUFBNkM7QUFDN0Msd0RBQWtDO0FBRWxDLHNEQUFrQztBQUVsQywyREFBd0M7QUFDeEMscUVBQWtEO0FBQ2xELHFFQUFrRDtBQUNsRCwyREFBd0M7QUFDeEMsNkRBQTBDO0FBQzFDLHlEQUFzQztBQUN0Qyw2REFBMEM7QUFFMUMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUUxQiw0REFBc0M7QUErQ3RDLGFBQWE7QUFDYixNQUFNLGNBQWUsU0FBUSxnQkFBUTtJQXdFbkM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUMvQixLQUFLLENBQ0gsbUJBQVUsQ0FDUjtZQUNFLGFBQWEsRUFBRTtnQkFDYixRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsY0FBYyxDQUFDLE9BQU87YUFDN0I7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3Qiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQS9ERDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsTUFBZ0I7UUFDbEQsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUNiLDBJQUEwSSxDQUMzSSxDQUFDO1FBQ0osbUJBQW1CO1FBQ25CLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFC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