// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../class/SClass", "../object/deepMerge", "../object/map", "../is/node", "./tags/author", "./tags/simpleValue", "./tags/description", "./tags/return", "./tags/example", "./tags/param", "./tags/snippet", "fs", "path", "./SDocblock"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../class/SClass"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    // @ts-ignore
    var SDocblockBlock = /** @class */ (function (_super) {
        __extends(SDocblockBlock, _super);
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
            var _this = _super.call(this, deepMerge_1.default({
                docblockBlock: {
                    filepath: null,
                    tags: SDocblockBlock.tagsMap
                }
            }, settings)) || this;
            _this._source = source.trim();
            // parse the docblock string
            _this._blockObj = _this.parse();
            return _this;
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
        SDocblockBlock.registerTag = function (tagName, parser) {
            // check the params
            if (typeof parser !== 'function')
                throw new Error("The \"<yellow>parser</yellow>\" parameter of the static \"<cyan>SDocblockBlock</cyan>\" class method needs to be a \"<green>Function</green>\"");
            // register the tag
            SDocblockBlock.tagsMap[tagName] = parser;
        };
        Object.defineProperty(SDocblockBlock.prototype, "docblockBlockSettings", {
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
            get: function () {
                return this._settings.docblockBlock;
            },
            enumerable: false,
            configurable: true
        });
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
            var currentTag;
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
                // @ts-ignore
                currentTag = undefined;
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
                if (_this.docblockBlockSettings.tags[prop] && prop !== 'src')
                    return _this.docblockBlockSettings.tags[prop](value);
                return simpleValue_1.default(value);
            });
            if (docblockObj['src'] &&
                node_1.default() &&
                this.docblockBlockSettings.filepath) {
                var absoluteFilepath = path_1.default.resolve(this.docblockBlockSettings.filepath, docblockObj['src']);
                var srcValue = fs_1.default.readFileSync(absoluteFilepath, 'utf8');
                var srcDocblockInstance = new SDocblock_1.default(srcValue);
                var srcBlocks = srcDocblockInstance.parse();
                if (srcBlocks.length) {
                    var tags = srcBlocks[0].parse();
                    docblockObj = deepMerge_1.default(docblockObj, tags);
                }
            }
            // save the raw string
            docblockObj.raw = this._source.toString();
            // return the parsed docblock object
            return docblockObj;
        };
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
        return SDocblockBlock;
    }(SClass_1.default));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMkRBQXVDO0lBQ3ZDLGtFQUE2QztJQUM3QyxzREFBa0M7SUFFbEMsb0RBQWtDO0lBRWxDLHlEQUF3QztJQUN4QyxtRUFBa0Q7SUFDbEQsbUVBQWtEO0lBQ2xELHlEQUF3QztJQUN4QywyREFBMEM7SUFDMUMsdURBQXNDO0lBQ3RDLDJEQUEwQztJQUUxQywwQ0FBc0I7SUFDdEIsOENBQTBCO0lBRTFCLDBEQUFzQztJQStDdEMsYUFBYTtJQUNiO1FBQTZCLGtDQUFRO1FBd0VuQzs7Ozs7Ozs7V0FRRztRQUNILHdCQUFZLE1BQU0sRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBQWpDLFlBQ0Usa0JBQ0UsbUJBQVUsQ0FDUjtnQkFDRSxhQUFhLEVBQUU7b0JBQ2IsUUFBUSxFQUFFLElBQUk7b0JBQ2QsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO2lCQUM3QjthQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsU0FLRjtZQUhDLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLDRCQUE0QjtZQUM1QixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7UUFDaEMsQ0FBQztRQS9ERDs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0ksMEJBQVcsR0FBbEIsVUFBbUIsT0FBZSxFQUFFLE1BQWdCO1lBQ2xELG1CQUFtQjtZQUNuQixJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVU7Z0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQ2IsZ0pBQTBJLENBQzNJLENBQUM7WUFDSixtQkFBbUI7WUFDbkIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7UUFD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