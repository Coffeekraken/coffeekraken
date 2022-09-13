"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const plainObject_1 = __importDefault(require("@coffeekraken/sugar/shared/is/plainObject"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const namespaceCompliant_1 = __importDefault(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
const marked_1 = require("marked");
const author_1 = __importDefault(require("./tags/author"));
const contributor_1 = __importDefault(require("./tags/contributor"));
const cssClass_1 = __importDefault(require("./tags/cssClass"));
const description_1 = __importDefault(require("./tags/description"));
const event_1 = __importDefault(require("./tags/event"));
const example_1 = __importDefault(require("./tags/example"));
const install_1 = __importDefault(require("./tags/install"));
const interface_1 = __importDefault(require("./tags/interface"));
const menu_1 = __importDefault(require("./tags/menu"));
const namespace_1 = __importDefault(require("./tags/namespace"));
const param_1 = __importDefault(require("./tags/param"));
const platform_1 = __importDefault(require("./tags/platform"));
const return_1 = __importDefault(require("./tags/return"));
const see_1 = __importDefault(require("./tags/see"));
const simpleRepeatableValue_1 = __importDefault(require("./tags/simpleRepeatableValue"));
const simpleValue_1 = __importDefault(require("./tags/simpleValue"));
const snippet_1 = __importDefault(require("./tags/snippet"));
const support_1 = __importDefault(require("./tags/support"));
const todo_1 = __importDefault(require("./tags/todo"));
const type_1 = __importDefault(require("./tags/type"));
// @ts-ignore
class SDocblockBlock extends s_class_1.default {
    /**
     * @name          constructor
     * @type          Function
     * @contructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(source, settings) {
        super((0, deepMerge_1.default)({
            filePath: null,
            packageJson: null,
            renderMarkdown: false,
            markedOptions: {},
            tags: SDocblockBlock.tagsMap,
        }, settings));
        this._source = source
            .trim()
            .replace(/\s\*\s/gm, '\n * ')
            .split(/\n/gm)
            .map((l) => l.trim())
            .filter((l) => l !== '')
            .join('\n')
            // .replace(/\*\s\*/gm, '*')
            .replace(/^\/\*\*/, '/**\n*')
            .replace(/\*\/$/, '\n*/');
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
     * @name          toString
     * @type          Function
     *
     * This method return the passed source string
     *
     * @return      {String}              The passed docblock string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toObject() {
        if (!this._blockObj) {
            throw new Error(`<red>${this.constructor.name}</red> Before accessing the blocks you'll need to parse the docblocks using "<yellow>await this.parse()</yellow>"`);
        }
        return this._blockObj;
    }
    /**
     * @name          parse
     * @type          Function
     * @async
     * @private
     *
     * This method take a docblick string and parse it to a javascript object
     *
     * @return      {Object}          The object version of the source string
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    parse() {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // some variables
            let currentTag;
            let currentContent = [];
            let currentObj = {};
            let docblockObj = {};
            let finalDocblockObj = {};
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
            lines = lines.map((l) => l.trim()).filter((l) => l !== '');
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
                else if (previousWasEmptyLine &&
                    !line.trim().match(/^\*\/$/)) {
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
            if (this.settings.renderMarkdown) {
                marked_1.marked.setOptions((_a = this.settings.markedOptions) !== null && _a !== void 0 ? _a : {});
            }
            for (let i = 0; i < Object.keys(docblockObj).length; i++) {
                const prop = Object.keys(docblockObj)[i];
                const value = docblockObj[prop];
                // do not process two times the same property
                if (finalDocblockObj[prop])
                    continue;
                // private props
                if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_')
                    continue;
                // process with tags
                if (this.settings.tags[prop] && prop !== 'src') {
                    let res;
                    try {
                        res = yield this.settings.tags[prop](value, this.settings);
                    }
                    catch (e) {
                        emit('log', {
                            type: s_log_1.default.TYPE_WARN,
                            value: `<red>[SDocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:\n\n${this._source}\n\n${e.stack}`,
                        });
                    }
                    if (res === null || res === void 0 ? void 0 : res.tags) {
                        for (let [key, value] of Object.entries(res.tags)) {
                            finalDocblockObj[key] = value;
                        }
                    }
                    else if (res !== undefined) {
                        finalDocblockObj[prop] = res;
                    }
                }
                else {
                    finalDocblockObj[prop] = (0, simpleValue_1.default)(value, this.settings);
                }
                if (this.settings.renderMarkdown) {
                    function renderMarkdown(data) {
                        if (data instanceof String &&
                            data.render === true) {
                            return marked_1.marked.parseInline(data.toString());
                        }
                        else if (Array.isArray(data)) {
                            return data.map((item) => {
                                return renderMarkdown(item);
                            });
                        }
                        else if ((0, plainObject_1.default)(data)) {
                            Object.keys(data).forEach((key) => {
                                data[key] = renderMarkdown(data[key]);
                            });
                            return data;
                        }
                        else {
                            return data;
                        }
                    }
                    finalDocblockObj[prop] = renderMarkdown(finalDocblockObj[prop]);
                }
            }
            // save the raw string
            finalDocblockObj.raw = this._source.toString();
            // docblock id
            if (!finalDocblockObj.id) {
                if (finalDocblockObj.namespace && finalDocblockObj.name) {
                    finalDocblockObj.id = (0, namespaceCompliant_1.default)(`${finalDocblockObj.namespace}.${finalDocblockObj.name}`);
                }
                else {
                    // ensure it start with a character for html id attribute to work correctly
                    finalDocblockObj.id = `s${crypto_1.__sha256.encrypt(finalDocblockObj.raw)}`;
                }
            }
            // save into internal property
            this._blockObj = finalDocblockObj;
            // return the parsed docblock object
            return resolve(finalDocblockObj);
        }));
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
SDocblockBlock.registerTag('contributor', contributor_1.default);
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
SDocblockBlock.registerTag('as', simpleValue_1.default);
SDocblockBlock.registerTag('package', simpleValue_1.default);
SDocblockBlock.registerTag('private', simpleValue_1.default);
SDocblockBlock.registerTag('protected', simpleValue_1.default);
SDocblockBlock.registerTag('public', simpleValue_1.default);
SDocblockBlock.registerTag('readonly', simpleValue_1.default);
SDocblockBlock.registerTag('requires', simpleValue_1.default);
SDocblockBlock.registerTag('since', simpleValue_1.default);
SDocblockBlock.registerTag('static', simpleValue_1.default);
SDocblockBlock.registerTag('summary', simpleValue_1.default);
SDocblockBlock.registerTag('this', simpleValue_1.default);
SDocblockBlock.registerTag('tutorial', simpleValue_1.default);
SDocblockBlock.registerTag('type', simpleValue_1.default);
SDocblockBlock.registerTag('variation', simpleValue_1.default);
SDocblockBlock.registerTag('version', simpleValue_1.default);
SDocblockBlock.registerTag('enum', simpleValue_1.default);
SDocblockBlock.registerTag('src', simpleValue_1.default);
SDocblockBlock.registerTag('import', simpleValue_1.default);
SDocblockBlock.registerTag('install', install_1.default);
SDocblockBlock.registerTag('feature', simpleRepeatableValue_1.default);
SDocblockBlock.registerTag('description', description_1.default);
SDocblockBlock.registerTag('desc', description_1.default);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('see', see_1.default);
SDocblockBlock.registerTag('interface', interface_1.default);
SDocblockBlock.registerTag('return', return_1.default);
SDocblockBlock.registerTag('type', type_1.default);
SDocblockBlock.registerTag('param', param_1.default);
SDocblockBlock.registerTag('property', param_1.default);
SDocblockBlock.registerTag('prop', param_1.default);
SDocblockBlock.registerTag('setting', param_1.default);
SDocblockBlock.registerTag('platform', platform_1.default);
SDocblockBlock.registerTag('namespace', namespace_1.default);
SDocblockBlock.registerTag('menu', menu_1.default);
SDocblockBlock.registerTag('cssClass', cssClass_1.default);
SDocblockBlock.registerTag('support', support_1.default);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', snippet_1.default);
SDocblockBlock.registerTag('example', example_1.default);
SDocblockBlock.registerTag('todo', todo_1.default);
SDocblockBlock.registerTag('event', event_1.default);
exports.default = SDocblockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsdURBQXNEO0FBQ3RELDRGQUF3RTtBQUN4RSw0RkFBc0U7QUFDdEUsOEdBQXdGO0FBQ3hGLG1DQUE0QztBQUU1QywyREFBd0M7QUFDeEMscUVBQWtEO0FBQ2xELCtEQUF5QztBQUN6QyxxRUFBa0Q7QUFDbEQseURBQXNDO0FBQ3RDLDZEQUEwQztBQUMxQyw2REFBMEM7QUFDMUMsaUVBQThDO0FBQzlDLHVEQUFvQztBQUNwQyxpRUFBOEM7QUFDOUMseURBQXNDO0FBQ3RDLCtEQUE0QztBQUM1QywyREFBd0M7QUFDeEMscURBQWtDO0FBQ2xDLHlGQUFtRTtBQUNuRSxxRUFBa0Q7QUFDbEQsNkRBQTBDO0FBQzFDLDZEQUEwQztBQUMxQyx1REFBb0M7QUFDcEMsdURBQW9DO0FBMENwQyxhQUFhO0FBQ2IsTUFBTSxjQUFlLFNBQVEsaUJBQVE7SUEwRGpDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxNQUFNLEVBQUUsUUFBMkM7UUFDM0QsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLElBQUk7WUFDakIsY0FBYyxFQUFFLEtBQUs7WUFDckIsYUFBYSxFQUFFLEVBQUU7WUFDakIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1NBQy9CLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTTthQUNoQixJQUFJLEVBQUU7YUFDTixPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUM1QixLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENB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