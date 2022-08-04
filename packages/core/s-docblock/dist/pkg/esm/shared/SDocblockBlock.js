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
import { marked as __marked } from 'marked';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sb0JBQW9CLE1BQU0sc0RBQXNELENBQUM7QUFDeEYsT0FBTyxFQUFFLE1BQU0sSUFBSSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFFNUMsT0FBTyxXQUFXLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxVQUFVLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLFVBQVUsTUFBTSxjQUFjLENBQUM7QUFDdEMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxjQUFjLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sdUJBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxnQkFBZ0IsTUFBTSxv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RUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDdkQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN6RCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDM0QsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN0RCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDekQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUMzRCxjQUFjLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFELGNBQWMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDeEQsY0FBYyxDQUFDLFdBQVcsQ0FBQyxZQUFZ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