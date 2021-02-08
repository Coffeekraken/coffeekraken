"use strict";
// @shared
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
        docblockObj = map_1.default(docblockObj, (value, prop) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7QUFFViw2REFBdUM7QUFDdkMsb0VBQTZDO0FBQzdDLHdEQUFrQztBQUVsQyxzREFBa0M7QUFFbEMsMkRBQXdDO0FBQ3hDLHFFQUFrRDtBQUNsRCxxRUFBa0Q7QUFDbEQsMkRBQXdDO0FBQ3hDLDZEQUEwQztBQUMxQyx5REFBc0M7QUFDdEMsNkRBQTBDO0FBRTFDLDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsNERBQXNDO0FBbUR0QyxhQUFhO0FBQ2IsTUFBTSxjQUFlLFNBQVEsZ0JBQVE7SUF3RW5DOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDL0IsS0FBSyxDQUNILG1CQUFVLENBQ1I7WUFDRSxhQUFhLEVBQUU7Z0JBQ2IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO2FBQzdCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUEvREQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLE1BQWdCO1FBQ2xELG1CQUFtQjtRQUNuQixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVU7WUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwSUFBMEksQ0FDM0ksQ0FBQztRQUNKLG1CQUFtQjtRQUNuQixjQUFjLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lB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