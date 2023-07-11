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
const crypto_1 = require("@coffeekraken/sugar/crypto");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const marked_1 = require("marked");
const author_js_1 = __importDefault(require("./tags/author.js"));
const contributor_js_1 = __importDefault(require("./tags/contributor.js"));
const cssClass_js_1 = __importDefault(require("./tags/cssClass.js"));
const description_js_1 = __importDefault(require("./tags/description.js"));
const event_js_1 = __importDefault(require("./tags/event.js"));
const example_js_1 = __importDefault(require("./tags/example.js"));
const install_js_1 = __importDefault(require("./tags/install.js"));
const interface_js_1 = __importDefault(require("./tags/interface.js"));
const menu_js_1 = __importDefault(require("./tags/menu.js"));
const namespace_js_1 = __importDefault(require("./tags/namespace.js"));
const param_js_1 = __importDefault(require("./tags/param.js"));
const platform_js_1 = __importDefault(require("./tags/platform.js"));
const return_js_1 = __importDefault(require("./tags/return.js"));
const see_js_1 = __importDefault(require("./tags/see.js"));
const simpleRepeatableValue_js_1 = __importDefault(require("./tags/simpleRepeatableValue.js"));
const simpleValue_js_1 = __importDefault(require("./tags/simpleValue.js"));
const snippet_js_1 = __importDefault(require("./tags/snippet.js"));
const support_js_1 = __importDefault(require("./tags/support.js"));
const todo_js_1 = __importDefault(require("./tags/todo.js"));
const type_js_1 = __importDefault(require("./tags/type.js"));
// @ts-ignore
class SDocblockBlock extends s_class_1.default {
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
     * @name          constructor
     * @type          Function
     * @contructor
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(source, settings) {
        super((0, object_1.__deepMerge)({
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                        console.error(`<red>[SDocblockBlock]</red> An error occured during the parsing of the docblock bellow on the tag <yellow>${prop}</yellow>:\n\n${this._source}\n\n${e.stack}`);
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
                    finalDocblockObj[prop] = (0, simpleValue_js_1.default)(value, this.settings);
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
                        else if ((0, is_1.__isPlainObject)(data)) {
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
                    finalDocblockObj.id = (0, string_1.__namespaceCompliant)(`${finalDocblockObj.namespace}.${finalDocblockObj.name}`);
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
SDocblockBlock.registerTag('author', author_js_1.default);
SDocblockBlock.registerTag('contributor', contributor_js_1.default);
SDocblockBlock.registerTag('abstract', simpleValue_js_1.default);
SDocblockBlock.registerTag('final', simpleValue_js_1.default);
SDocblockBlock.registerTag('async', simpleValue_js_1.default);
SDocblockBlock.registerTag('generator', simpleValue_js_1.default);
SDocblockBlock.registerTag('global', simpleValue_js_1.default);
SDocblockBlock.registerTag('constructor', simpleValue_js_1.default);
SDocblockBlock.registerTag('hideconstructor', simpleValue_js_1.default);
SDocblockBlock.registerTag('ignore', simpleValue_js_1.default);
SDocblockBlock.registerTag('inheritdoc', simpleValue_js_1.default);
SDocblockBlock.registerTag('inner', simpleValue_js_1.default);
SDocblockBlock.registerTag('instance', simpleValue_js_1.default);
SDocblockBlock.registerTag('mixin', simpleValue_js_1.default);
SDocblockBlock.registerTag('override', simpleValue_js_1.default);
SDocblockBlock.registerTag('access', simpleValue_js_1.default);
SDocblockBlock.registerTag('category', simpleValue_js_1.default);
SDocblockBlock.registerTag('copyright', simpleValue_js_1.default);
SDocblockBlock.registerTag('deprecated', simpleValue_js_1.default);
SDocblockBlock.registerTag('alias', simpleValue_js_1.default);
SDocblockBlock.registerTag('augments', simpleValue_js_1.default);
SDocblockBlock.registerTag('callback', simpleValue_js_1.default);
SDocblockBlock.registerTag('class', simpleValue_js_1.default);
SDocblockBlock.registerTag('classdesc', simpleValue_js_1.default);
SDocblockBlock.registerTag('constant', simpleValue_js_1.default);
SDocblockBlock.registerTag('constructs', simpleValue_js_1.default);
SDocblockBlock.registerTag('copyright', simpleValue_js_1.default);
SDocblockBlock.registerTag('default', simpleValue_js_1.default);
SDocblockBlock.registerTag('deprecated', simpleValue_js_1.default);
SDocblockBlock.registerTag('exports', simpleValue_js_1.default);
SDocblockBlock.registerTag('external', simpleValue_js_1.default);
SDocblockBlock.registerTag('host', simpleValue_js_1.default);
SDocblockBlock.registerTag('file', simpleValue_js_1.default);
SDocblockBlock.registerTag('function', simpleValue_js_1.default);
SDocblockBlock.registerTag('func', simpleValue_js_1.default);
SDocblockBlock.registerTag('method', simpleValue_js_1.default);
SDocblockBlock.registerTag('implements', simpleValue_js_1.default);
SDocblockBlock.registerTag('interface', simpleValue_js_1.default);
SDocblockBlock.registerTag('kind', simpleValue_js_1.default);
SDocblockBlock.registerTag('lends', simpleValue_js_1.default);
SDocblockBlock.registerTag('license', simpleValue_js_1.default);
SDocblockBlock.registerTag('memberof', simpleValue_js_1.default);
SDocblockBlock.registerTag('memberof', simpleValue_js_1.default);
SDocblockBlock.registerTag('mixes', simpleValue_js_1.default);
SDocblockBlock.registerTag('module', simpleValue_js_1.default);
SDocblockBlock.registerTag('name', simpleValue_js_1.default);
SDocblockBlock.registerTag('as', simpleValue_js_1.default);
SDocblockBlock.registerTag('package', simpleValue_js_1.default);
SDocblockBlock.registerTag('private', simpleValue_js_1.default);
SDocblockBlock.registerTag('protected', simpleValue_js_1.default);
SDocblockBlock.registerTag('public', simpleValue_js_1.default);
SDocblockBlock.registerTag('readonly', simpleValue_js_1.default);
SDocblockBlock.registerTag('requires', simpleValue_js_1.default);
SDocblockBlock.registerTag('since', simpleValue_js_1.default);
SDocblockBlock.registerTag('static', simpleValue_js_1.default);
SDocblockBlock.registerTag('summary', simpleValue_js_1.default);
SDocblockBlock.registerTag('this', simpleValue_js_1.default);
SDocblockBlock.registerTag('tutorial', simpleValue_js_1.default);
SDocblockBlock.registerTag('type', simpleValue_js_1.default);
SDocblockBlock.registerTag('variation', simpleValue_js_1.default);
SDocblockBlock.registerTag('version', simpleValue_js_1.default);
SDocblockBlock.registerTag('enum', simpleValue_js_1.default);
SDocblockBlock.registerTag('src', simpleValue_js_1.default);
SDocblockBlock.registerTag('import', simpleValue_js_1.default);
SDocblockBlock.registerTag('install', install_js_1.default);
SDocblockBlock.registerTag('feature', simpleRepeatableValue_js_1.default);
SDocblockBlock.registerTag('description', description_js_1.default);
SDocblockBlock.registerTag('desc', description_js_1.default);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('see', see_js_1.default);
SDocblockBlock.registerTag('interface', interface_js_1.default);
SDocblockBlock.registerTag('return', return_js_1.default);
SDocblockBlock.registerTag('type', type_js_1.default);
SDocblockBlock.registerTag('param', param_js_1.default);
SDocblockBlock.registerTag('property', param_js_1.default);
SDocblockBlock.registerTag('prop', param_js_1.default);
SDocblockBlock.registerTag('setting', param_js_1.default);
SDocblockBlock.registerTag('platform', platform_js_1.default);
SDocblockBlock.registerTag('namespace', namespace_js_1.default);
SDocblockBlock.registerTag('menu', menu_js_1.default);
SDocblockBlock.registerTag('cssClass', cssClass_js_1.default);
SDocblockBlock.registerTag('support', support_js_1.default);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', snippet_js_1.default);
SDocblockBlock.registerTag('example', example_js_1.default);
SDocblockBlock.registerTag('todo', todo_js_1.default);
SDocblockBlock.registerTag('event', event_js_1.default);
exports.default = SDocblockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHVEQUFzRDtBQUN0RCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELHVEQUFrRTtBQUNsRSxtQ0FBNEM7QUFFNUMsaUVBQTJDO0FBQzNDLDJFQUFxRDtBQUNyRCxxRUFBNEM7QUFDNUMsMkVBQXFEO0FBQ3JELCtEQUF5QztBQUN6QyxtRUFBNkM7QUFDN0MsbUVBQTZDO0FBQzdDLHVFQUFpRDtBQUNqRCw2REFBdUM7QUFDdkMsdUVBQWlEO0FBQ2pELCtEQUF5QztBQUN6QyxxRUFBK0M7QUFDL0MsaUVBQTJDO0FBQzNDLDJEQUFxQztBQUNyQywrRkFBc0U7QUFDdEUsMkVBQXFEO0FBQ3JELG1FQUE2QztBQUM3QyxtRUFBNkM7QUFDN0MsNkRBQXVDO0FBQ3ZDLDZEQUF1QztBQXdFdkMsYUFBYTtBQUNiLE1BQU0sY0FBZSxTQUFRLGlCQUFRO0lBa0NqQzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFlLEVBQUUsTUFBVztRQUMzQyxtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVO1lBQzVCLE1BQU0sSUFBSSxLQUFLLENBQ1gsMElBQTBJLENBQzdJLENBQUM7UUFDTixtQkFBbUI7UUFDbkIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxNQUFNLEVBQUUsUUFBMkM7UUFDM0QsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLElBQUk7WUFDakIsY0FBYyxFQUFFLEtBQUs7WUFDckIsYUFBYSxFQUFFLEVBQUU7WUFDakIsSUFBSSxFQUFFLGNBQWMsQ0FBQyxPQUFPO1NBQy9CLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTTthQUNoQixJQUFJLEVBQUU7YUFDTixPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzthQUM1QixLQUFLLENBQUMsTUFBTSxDQUFDO2FBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDWCw0QkFBNEI7YUFDM0IsT0FBTyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQ1gsUUFBUSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksbUhBQW1ILENBQ25KLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxpQkFBaUI7WUFDakIsSUFBSSxVQUFrQixDQUFDO1lBQ3ZCLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQztZQUNsQyxJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7WUFDekIsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO1lBQzFCLElBQUksZ0JBQWdCLEdBQVEsRUFBRSxDQUFDO1lBQy9CLElBQUksb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1lBRWpDLFNBQVMsR0FBRztnQkFDUixJQUFJLGNBQWMsQ0FBQyxNQUFNO29CQUFFLFVBQVUsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO2dCQUMvRCxJQUNJLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO29CQUN0QyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQ3pDO29CQUNFLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDN0MsV0FBVyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7aUJBQzVDO2dCQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztvQkFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDL0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO29CQUN4QyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM1QztxQkFBTTtvQkFDSCxXQUFXLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO2lCQUN4QztnQkFDRCxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNoQixjQUFjLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixhQUFhO2dCQUNiLFVBQVUsR0FBRyxTQUFTLENBQUM7WUFDM0IsQ0FBQztZQUVELDBCQUEwQjtZQUMxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDekMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRTNELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDbkIsbUJBQW1CO2dCQUNuQixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQztnQkFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFNUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3JDLElBQUksY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQzNCLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQzNCO3lCQUFNO3dCQUNILElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7NEJBQ2hDLEdBQUcsRUFBRSxDQUFDO3lCQUNUO3dCQUNELG9CQUFvQixHQUFHLElBQUksQ0FBQztxQkFDL0I7aUJBQ0o7cUJBQU0sSUFBSSxZQUFZLEVBQUU7b0JBQ3JCLElBQUksVUFBVSxFQUFFO3dCQUNaLEdBQUcsRUFBRSxDQUFDO3FCQUNUO29CQUNELFVBQVUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDaEQsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDakIsVUFBVSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7cUJBQzNCO3lCQUFNO3dCQUNILFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO3FCQUMzQjtvQkFDRCxvQkFBb0IsR0FBRyxLQUFLLENBQUM7aUJBQ2hDO3FCQUFNLElBQ0gsb0JBQW9CO29CQUNwQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQzlCO29CQUNFLFVBQVUsR0FBRyxhQUFhLENBQUM7b0JBQzNCLGNBQWMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBQ2hCLG9CQUFvQixHQUFHLEtBQUssQ0FBQztpQkFDaEM7cUJBQU07b0JBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUMvQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQzlCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7d0JBQ3BCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzdCO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxHQUFHLEVBQUUsQ0FBQztZQUVOLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7Z0JBQzlCLGVBQVEsQ0FBQyxVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsbUNBQUksRUFBRSxDQUFDLENBQUM7YUFDMUQ7WUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFaEMsNkNBQTZDO2dCQUM3QyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQztvQkFBRSxTQUFTO2dCQUVyQyxnQkFBZ0I7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztvQkFDckQsU0FBUztnQkFFYixvQkFBb0I7Z0JBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtvQkFDNUMsSUFBSSxHQUFHLENBQUM7b0JBQ1IsSUFBSTt3QkFDQSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDaEMsS0FBSyxFQUNMLElBQUksQ0FBQyxRQUFRLENBQ2hCLENBQUM7cUJBQ0w7b0JBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FDVCw2R0FBNkcsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLE9BQU8sT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQ2pLLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsSUFBSSxFQUFFO3dCQUNYLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDL0MsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO3lCQUNqQztxQkFDSjt5QkFBTSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7d0JBQzFCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztxQkFDaEM7aUJBQ0o7cUJBQU07b0JBQ0gsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBQSx3QkFBZ0IsRUFDckMsS0FBSyxFQUNMLElBQUksQ0FBQyxRQUFRLENBQ2hCLENBQUM7aUJBQ0w7Z0JBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtvQkFDOUIsU0FBUyxjQUFjLENBQUMsSUFBUzt3QkFDN0IsSUFDSSxJQUFJLFlBQVksTUFBTTs0QkFDaEIsSUFBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQzdCOzRCQUNFLE9BQU8sZUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDaEQ7NkJBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUM1QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQ0FDckIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2hDLENBQUMsQ0FBQyxDQUFDO3lCQUNOOzZCQUFNLElBQUksSUFBQSxvQkFBZSxFQUFDLElBQUksQ0FBQyxFQUFFOzRCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dDQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxDQUFDLENBQUMsQ0FBQzs0QkFDSCxPQUFPLElBQUksQ0FBQzt5QkFDZjs2QkFBTTs0QkFDSCxPQUFPLElBQUksQ0FBQzt5QkFDZjtvQkFDTCxDQUFDO29CQUNELGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FDbkMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQ3pCLENBQUM7aUJBQ0w7YUFDSjtZQUVELHNCQUFzQjtZQUN0QixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUUvQyxjQUFjO1lBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRTtnQkFDdEIsSUFBSSxnQkFBZ0IsQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFO29CQUNyRCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBQSw2QkFBb0IsRUFDdEMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQzNELENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsMkVBQTJFO29CQUMzRSxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxpQkFBUSxDQUFDLE9BQU8sQ0FDdEMsZ0JBQWdCLENBQUMsR0FBRyxDQUN2QixFQUFFLENBQUM7aUJBQ1A7YUFDSjtZQUVELDhCQUE4QjtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1lBRWxDLG9DQUFvQztZQUNwQyxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXZURDs7Ozs7Ozs7R0FRRztBQUNJLHNCQUFPLEdBQTJCLEVBQUUsQ0FBQztBQWlUaEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsbUJBQVcsQ0FBQyxDQUFDO0FBQ2xELGNBQWMsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDNUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDNUQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ2hFLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMzRCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMzRCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMzRCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3hELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDckQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUNuRCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3hELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUMxRCxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUNyRCxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLHdCQUFnQixDQUFDLENBQUM7QUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsb0JBQVksQ0FBQyxDQUFDO0FBQ3BELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGtDQUF1QixDQUFDLENBQUM7QUFDL0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztBQUM1RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELHFEQUFxRDtBQUNyRCx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JELGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLGdCQUFRLENBQUMsQ0FBQztBQUM1QyxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxzQkFBYyxDQUFDLENBQUM7QUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsbUJBQVcsQ0FBQyxDQUFDO0FBQ2xELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLGlCQUFTLENBQUMsQ0FBQztBQUM5QyxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDaEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsa0JBQVUsQ0FBQyxDQUFDO0FBQ25ELGNBQWMsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLGtCQUFVLENBQUMsQ0FBQztBQUMvQyxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDbEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQWEsQ0FBQyxDQUFDO0FBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLHNCQUFjLENBQUMsQ0FBQztBQUN4RCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxpQkFBUyxDQUFDLENBQUM7QUFDOUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUscUJBQVUsQ0FBQyxDQUFDO0FBQ25ELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLG9CQUFZLENBQUMsQ0FBQztBQUNwRCx1REFBdUQ7QUFDdkQscURBQXFEO0FBQ3JELGtEQUFrRDtBQUNsRCxtREFBbUQ7QUFDbkQsdURBQXVEO0FBQ3ZELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLG9CQUFZLENBQUMsQ0FBQztBQUNwRCxjQUFjLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxvQkFBWSxDQUFDLENBQUM7QUFDcEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsaUJBQVMsQ0FBQyxDQUFDO0FBQzlDLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGtCQUFVLENBQUMsQ0FBQztBQUVoRCxrQkFBZSxjQUFjLENBQUMifQ==