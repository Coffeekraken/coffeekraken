"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
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
module.exports = (_a = class SDocblockBlock {
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
                const absoluteFilepath = path_1.default.resolve(this._settings.filepath, docblockObj['src']);
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
    },
    /**
     * @name            tagsMap
     * @type            Object
     * @static
     *
     * Store the default tags mapping to their parsing functions
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    _a.tagsMap = {
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
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsb0VBQTZDO0FBQzdDLHdEQUFrQztBQUVsQyxzREFBa0M7QUFFbEMsMkRBQXdDO0FBQ3hDLHFFQUFrRDtBQUNsRCxxRUFBa0Q7QUFDbEQsMkRBQXdDO0FBQ3hDLDZEQUEwQztBQUMxQyx5REFBc0M7QUFDdEMsNkRBQTBDO0FBRTFDLDRDQUFzQjtBQUN0QixnREFBMEI7QUFFMUIsNERBQXNDO0FBMEJ0Qyx1QkFBUyxNQUFNLGNBQWM7UUEwSTNCOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxNQUFNLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUExQ2pDOzs7Ozs7OztlQVFHO1lBQ0gsWUFBTyxHQUFHLElBQUksQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQUVmOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQVliLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVUsQ0FDekI7Z0JBQ0UsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxjQUFjLENBQUMsT0FBTztpQkFDN0I7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1lBQ0YsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hDLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFRO1lBQ04sT0FBTyxJQUFJLENB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