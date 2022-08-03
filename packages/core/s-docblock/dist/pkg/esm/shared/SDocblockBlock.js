var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __sha256 from '@coffeekraken/sugar/shared/crypt/sha256';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
import __marked from 'marked';
import __authorTag from './tags/author';
import __contributorTag from './tags/contributor';
import __cssClass from './tags/cssClass';
import __descriptionTag from './tags/description';
import __eventTag from './tags/event';
import __exampleTag from './tags/example';
import __installTag from './tags/install';
import __interfaceTag from './tags/interface';
import __menuTag from './tags/menu';
import __namespaceTag from './tags/namespace';
import __paramTag from './tags/param';
import __platformTag from './tags/platform';
import __returnTag from './tags/return';
import __seeTag from './tags/see';
import __simpleRepeatableValue from './tags/simpleRepeatableValue';
import __simpleValueTag from './tags/simpleValue';
import __snippetTag from './tags/snippet';
import __supportTag from './tags/support';
import __todoTag from './tags/todo';
import __typeTag from './tags/type';
// @ts-ignore
class SDocblockBlock extends __SClass {
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
        super(__deepMerge({
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
                __marked.setOptions((_a = this.settings.markedOptions) !== null && _a !== void 0 ? _a : {});
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
                            type: __SLog.TYPE_WARN,
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
                    finalDocblockObj[prop] = __simpleValueTag(value, this.settings);
                }
                if (this.settings.renderMarkdown) {
                    function renderMarkdown(data) {
                        if (data instanceof String &&
                            data.render === true) {
                            return __marked.parseInline(data.toString());
                        }
                        else if (Array.isArray(data)) {
                            return data.map((item) => {
                                return renderMarkdown(item);
                            });
                        }
                        else if (__isPlainObject(data)) {
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
                    finalDocblockObj.id = __namespaceCompliant(`${finalDocblockObj.namespace}.${finalDocblockObj.name}`);
                }
                else {
                    // ensure it start with a character for html id attribute to work correctly
                    finalDocblockObj.id = `s${__sha256.encrypt(finalDocblockObj.raw)}`;
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
SDocblockBlock.registerTag('author', __authorTag);
SDocblockBlock.registerTag('contributor', __contributorTag);
SDocblockBlock.registerTag('abstract', __simpleValueTag);
SDocblockBlock.registerTag('final', __simpleValueTag);
SDocblockBlock.registerTag('async', __simpleValueTag);
SDocblockBlock.registerTag('generator', __simpleValueTag);
SDocblockBlock.registerTag('global', __simpleValueTag);
SDocblockBlock.registerTag('constructor', __simpleValueTag);
SDocblockBlock.registerTag('hideconstructor', __simpleValueTag);
SDocblockBlock.registerTag('ignore', __simpleValueTag);
SDocblockBlock.registerTag('inheritdoc', __simpleValueTag);
SDocblockBlock.registerTag('inner', __simpleValueTag);
SDocblockBlock.registerTag('instance', __simpleValueTag);
SDocblockBlock.registerTag('mixin', __simpleValueTag);
SDocblockBlock.registerTag('override', __simpleValueTag);
SDocblockBlock.registerTag('access', __simpleValueTag);
SDocblockBlock.registerTag('category', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('alias', __simpleValueTag);
SDocblockBlock.registerTag('augments', __simpleValueTag);
SDocblockBlock.registerTag('callback', __simpleValueTag);
SDocblockBlock.registerTag('class', __simpleValueTag);
SDocblockBlock.registerTag('classdesc', __simpleValueTag);
SDocblockBlock.registerTag('constant', __simpleValueTag);
SDocblockBlock.registerTag('constructs', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('default', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('exports', __simpleValueTag);
SDocblockBlock.registerTag('external', __simpleValueTag);
SDocblockBlock.registerTag('host', __simpleValueTag);
SDocblockBlock.registerTag('file', __simpleValueTag);
SDocblockBlock.registerTag('function', __simpleValueTag);
SDocblockBlock.registerTag('func', __simpleValueTag);
SDocblockBlock.registerTag('method', __simpleValueTag);
SDocblockBlock.registerTag('implements', __simpleValueTag);
SDocblockBlock.registerTag('interface', __simpleValueTag);
SDocblockBlock.registerTag('kind', __simpleValueTag);
SDocblockBlock.registerTag('lends', __simpleValueTag);
SDocblockBlock.registerTag('license', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('mixes', __simpleValueTag);
SDocblockBlock.registerTag('module', __simpleValueTag);
SDocblockBlock.registerTag('name', __simpleValueTag);
SDocblockBlock.registerTag('as', __simpleValueTag);
SDocblockBlock.registerTag('package', __simpleValueTag);
SDocblockBlock.registerTag('private', __simpleValueTag);
SDocblockBlock.registerTag('protected', __simpleValueTag);
SDocblockBlock.registerTag('public', __simpleValueTag);
SDocblockBlock.registerTag('readonly', __simpleValueTag);
SDocblockBlock.registerTag('requires', __simpleValueTag);
SDocblockBlock.registerTag('since', __simpleValueTag);
SDocblockBlock.registerTag('static', __simpleValueTag);
SDocblockBlock.registerTag('summary', __simpleValueTag);
SDocblockBlock.registerTag('this', __simpleValueTag);
SDocblockBlock.registerTag('tutorial', __simpleValueTag);
SDocblockBlock.registerTag('type', __simpleValueTag);
SDocblockBlock.registerTag('variation', __simpleValueTag);
SDocblockBlock.registerTag('version', __simpleValueTag);
SDocblockBlock.registerTag('enum', __simpleValueTag);
SDocblockBlock.registerTag('src', __simpleValueTag);
SDocblockBlock.registerTag('import', __simpleValueTag);
SDocblockBlock.registerTag('install', __installTag);
SDocblockBlock.registerTag('feature', __simpleRepeatableValue);
SDocblockBlock.registerTag('description', __descriptionTag);
SDocblockBlock.registerTag('desc', __descriptionTag);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('see', __seeTag);
SDocblockBlock.registerTag('interface', __interfaceTag);
SDocblockBlock.registerTag('return', __returnTag);
SDocblockBlock.registerTag('type', __typeTag);
SDocblockBlock.registerTag('param', __paramTag);
SDocblockBlock.registerTag('property', __paramTag);
SDocblockBlock.registerTag('prop', __paramTag);
SDocblockBlock.registerTag('setting', __paramTag);
SDocblockBlock.registerTag('platform', __platformTag);
SDocblockBlock.registerTag('namespace', __namespaceTag);
SDocblockBlock.registerTag('menu', __menuTag);
SDocblockBlock.registerTag('cssClass', __cssClass);
SDocblockBlock.registerTag('support', __supportTag);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', __snippetTag);
SDocblockBlock.registerTag('example', __exampleTag);
SDocblockBlock.registerTag('todo', __todoTag);
SDocblockBlock.registerTag('event', __eventTag);
export default SDocblockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sb0JBQW9CLE1BQU0sc0RBQXNELENBQUM7QUFDeEYsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBRTlCLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUN4QyxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sU0FBUyxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDNUMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLHVCQUF1QixNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FB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