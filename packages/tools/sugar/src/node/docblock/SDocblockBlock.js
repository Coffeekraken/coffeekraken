"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const SDocblock_1 = __importDefault(require("./SDocblock"));
/**
 * @name          SDocblockBlock
 * @namespace           sugar.js.docblock
 * @type          Class
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @todo        tests
 * @todo        Support "feature" tag
 * @todo        Check the supported tags
 *
 * @example         js
 * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SDocblockBlock';
 * const myBlock = new SDocblockBlock(myDocblockString);
 * const myBlock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class SDocblockBlock {
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
        /**
         * @name          _source
         * @type          String
         * @private
         *
         * Store the passed source
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
         */
        this._source = null;
        /**
         * @name          _settings
         * @type          Object
         * @private
         *
         * Store this instance settings
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
         */
        this._settings = {};
        /**
         * @name        _blockObj
         * @type        {Object}
         * @private
         *
         * Store the parsed docblock object
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
         */
        this._blockObj = {};
        this._source = source.trim();
        this._settings = deepMerge_1.default({
            filepath: null,
            parse: {
                tags: SDocblockBlock.tagsMap
            }
        }, settings);
        // parse the docblock string
        this._blockObj = this.parse();
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
        let currentTag = null;
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
            currentTag = null;
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
            if (this._settings.parse.tags[prop] && prop !== 'src')
                return this._settings.parse.tags[prop](value);
            return simpleValue_1.default(value);
        });
        if (docblockObj['src'] && node_1.default() && this._settings.filepath) {
            const __fs = require('fs');
            const __path = require('path');
            const absoluteFilepath = __path.resolve(this._settings.filepath, docblockObj['src']);
            const srcValue = __fs.readFileSync(absoluteFilepath, 'utf8');
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
exports.default = SDocblockBlock;
/**
 * @name            tagsMap
 * @type            Object
 * @static
 *
 * Store the default tags mapping to their parsing functions
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
SDocblockBlock.tagsMap = {
    author: author_1.default,
    abstract: simpleValue_1.default,
    final: simpleValue_1.default,
    async: simpleValue_1.default,
    generator: simpleValue_1.default,
    global: simpleValue_1.default,
    constructor: simpleValue_1.default,
    hideconstructor: simpleValue_1.default,
    ignore: simpleValue_1.default,
    inheritdoc: simpleValue_1.default,
    inner: simpleValue_1.default,
    instance: simpleValue_1.default,
    mixin: simpleValue_1.default,
    override: simpleValue_1.default,
    access: simpleValue_1.default,
    category: simpleValue_1.default,
    copyright: simpleValue_1.default,
    deprecated: simpleValue_1.default,
    alias: simpleValue_1.default,
    augments: simpleValue_1.default,
    callback: simpleValue_1.default,
    class: simpleValue_1.default,
    classdesc: simpleValue_1.default,
    constant: simpleValue_1.default,
    constructs: simpleValue_1.default,
    copyright: simpleValue_1.default,
    default: simpleValue_1.default,
    deprecated: simpleValue_1.default,
    exports: simpleValue_1.default,
    external: simpleValue_1.default,
    host: simpleValue_1.default,
    file: simpleValue_1.default,
    function: simpleValue_1.default,
    func: simpleValue_1.default,
    method: simpleValue_1.default,
    implements: simpleValue_1.default,
    interface: simpleValue_1.default,
    kind: simpleValue_1.default,
    lends: simpleValue_1.default,
    license: simpleValue_1.default,
    memberof: simpleValue_1.default,
    'memberof!': simpleValue_1.default,
    mixes: simpleValue_1.default,
    module: simpleValue_1.default,
    name: simpleValue_1.default,
    namespace: simpleValue_1.default,
    package: simpleValue_1.default,
    private: simpleValue_1.default,
    protected: simpleValue_1.default,
    public: simpleValue_1.default,
    readonly: simpleValue_1.default,
    requires: simpleValue_1.default,
    see: simpleValue_1.default,
    since: simpleValue_1.default,
    static: simpleValue_1.default,
    summary: simpleValue_1.default,
    this: simpleValue_1.default,
    todo: simpleValue_1.default,
    tutorial: simpleValue_1.default,
    type: simpleValue_1.default,
    variation: simpleValue_1.default,
    version: simpleValue_1.default,
    enum: simpleValue_1.default,
    src: simpleValue_1.default,
    description: description_1.default,
    desc: description_1.default,
    // yields: __yieldsTag,
    // typedef: __typedefTag,
    // throws: __throwsTag,
    return: return_1.default,
    param: param_1.default,
    property: param_1.default,
    prop: param_1.default,
    // listens: __listensTag,
    // member: __memberTag,
    // var: __memberTag,
    // event: __eventTag,
    // borrows: __borrowsTag,
    snippet: snippet_1.default,
    example: example_1.default
};
