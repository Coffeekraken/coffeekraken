// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "../object/map", "../is/node", "./tags/author", "./tags/simpleValue", "./tags/description", "./tags/return", "./tags/example", "./tags/param", "./tags/snippet", "fs", "path", "./SDocblock"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    var map_1 = __importDefault(require("../object/map"));
    var node_1 = __importDefault(require("../is/node"));
    var author_1 = __importDefault(require("./tags/author"));
    var simpleValue_1 = __importDefault(require("./tags/simpleValue"));
    var description_1 = __importDefault(require("./tags/description"));
    var return_1 = __importDefault(require("./tags/return"));
    var example_1 = __importDefault(require("./tags/example"));
    var param_1 = __importDefault(require("./tags/param"));
    var snippet_1 = __importDefault(require("./tags/snippet"));
    var fs_1 = __importDefault(require("fs"));
    var path_1 = __importDefault(require("path"));
    var SDocblock_1 = __importDefault(require("./SDocblock"));
    return (_a = /** @class */ (function () {
            /**
             * @name          constructor
             * @type          Function
             * @contructor
             *
             * Constructor
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SDocblockBlock(source, settings) {
                if (settings === void 0) { settings = {}; }
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
                this._settings = deepMerge_2.default({
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
            SDocblockBlock.prototype.toString = function () {
                return this._source.trim();
            };
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
            SDocblockBlock.prototype.toObject = function () {
                return this._blockObj;
            };
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
            SDocblockBlock.prototype.parse = function () {
                var _this = this;
                // some variables
                var currentTag = null;
                var currentContent = [];
                var currentObj = {};
                var docblockObj = {};
                var previousWasEmptyLine = false;
                function add() {
                    if (currentContent.length)
                        currentObj.content = currentContent;
                    if (docblockObj.hasOwnProperty(currentTag) &&
                        !Array.isArray(docblockObj[currentTag])) {
                        var currentValue = docblockObj[currentTag];
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
                var lines = this._source.trim().split('\n');
                if (!lines || !lines.length)
                    return null;
                lines = lines.map(function (l) { return l.trim(); });
                lines.forEach(function (line) {
                    // get the tag name
                    var tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
                    var tagNameMatch = line.match(tagNameReg);
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
                docblockObj = map_1.default(docblockObj, function (value, prop) {
                    if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_')
                        return value;
                    if (_this._settings.parse.tags[prop] && prop !== 'src')
                        return _this._settings.parse.tags[prop](value);
                    return simpleValue_1.default(value);
                });
                if (docblockObj['src'] && node_1.default() && this._settings.filepath) {
                    var absoluteFilepath = path_1.default.resolve(this._settings.filepath, docblockObj['src']);
                    var srcValue = fs_1.default.readFileSync(absoluteFilepath, 'utf8');
                    var srcDocblockInstance = new SDocblock_1.default(srcValue);
                    var srcBlocks = srcDocblockInstance.parse();
                    if (srcBlocks.length) {
                        var tags = srcBlocks[0].parse();
                        docblockObj = deepMerge_2.default(docblockObj, tags);
                    }
                }
                // save the raw string
                docblockObj.raw = this._source.toString();
                // return the parsed docblock object
                return docblockObj;
            };
            return SDocblockBlock;
        }()),
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
});
