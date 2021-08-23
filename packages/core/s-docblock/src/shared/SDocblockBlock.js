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
import __deepMege from '@coffeekraken/sugar/shared/object/deepMerge';
import __authorTag from './tags/author';
import __contributorTag from './tags/contributor';
import __simpleValueTag from './tags/simpleValue';
import __simpleRepeatableValue from './tags/simpleRepeatableValue';
import __descriptionTag from './tags/description';
import __returnTag from './tags/return';
import __exampleTag from './tags/example';
import __paramTag from './tags/param';
import __seeTag from './tags/see';
import __snippetTag from './tags/snippet';
import __platformTag from './tags/platform';
import __namespaceTag from './tags/namespace';
import __todoTag from './tags/todo';
import __menuTag from './tags/menu';
import __interfaceTag from './tags/interface';
// @ts-ignore
class SDocblockBlock extends __SClass {
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
        super(__deepMege({
            docblockBlock: {
                filepath: null,
                packageJson: null,
                tags: SDocblockBlock.tagsMap,
            },
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            // some variables
            let currentTag;
            let currentContent = [];
            let currentObj = {};
            let docblockObj = {};
            let previousWasEmptyLine = false;
            // function add() {
            //     if (currentContent.length) currentObj.content = currentContent;
            //     if (docblockObj.hasOwnProperty(currentTag) && !Array.isArray(docblockObj[currentTag])) {
            //         const currentValue = docblockObj[currentTag];
            //         docblockObj[currentTag] = [currentValue];
            //     }
            //     if (!currentObj.value) currentObj.value = true;
            //     if (Array.isArray(docblockObj[currentTag])) {
            //         docblockObj[currentTag].push(currentObj);
            //     } else {
            //         docblockObj[currentTag] = currentObj;
            //     }
            //     currentObj = {};
            //     currentContent = [];
            //     // @ts-ignore
            //     currentTag = undefined;
            // }
            // // split the block by tags
            // let lines = this._source.trim().split('\n');
            // if (!lines || !lines.length) return null;
            // lines = lines.map((l) => l.trim()).filter((l) => l !== '');
            // lines.forEach((line) => {
            //     // get the tag name
            //     const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
            //     const tagNameMatch = line.match(tagNameReg);
            //     if (line.replace('*', '').trim() === '') {
            //         if (currentContent.length > 0) {
            //             currentContent.push('');
            //         } else {
            //             if (currentTag && currentObj.value) {
            //                 add();
            //             }
            //             previousWasEmptyLine = true;
            //         }
            //     } else if (tagNameMatch) {
            //         if (currentTag) {
            //             add();
            //         }
            //         currentTag = tagNameMatch[1];
            //         line = line.replace(tagNameMatch[0], '').trim();
            //         if (line.length > 0) {
            //             currentObj.value = line;
            //         } else {
            //             currentObj.value = true;
            //         }
            //         previousWasEmptyLine = false;
            //     } else if (previousWasEmptyLine && !line.trim().match(/^\*\/$/)) {
            //         currentTag = 'description';
            //         currentContent = [line.replace('*', '')];
            //         currentObj = {};
            //         previousWasEmptyLine = false;
            //     } else {
            //         line = line.replace('/**', '');
            //         line = line.replace('*/', '');
            //         line = line.replace('* ', '');
            //         line = line.replace('*', '');
            //         if (line.trim().length) {
            //             currentContent.push(line);
            //         }
            //     }
            // });
            // add();
            // for (let i = 0; i < Object.keys(docblockObj).length; i++) {
            //     const prop = Object.keys(docblockObj)[i];
            //     const value = docblockObj[prop];
            //     if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_') continue;
            //     if (this.docblockBlockSettings.tags[prop] && prop !== 'src') {
            //         docblockObj[prop] = await this.docblockBlockSettings.tags[prop](value, this.docblockBlockSettings);
            //     } else {
            //         docblockObj[prop] = __simpleValueTag(value, this.docblockBlockSettings);
            //     }
            // }
            // // save the raw string
            // docblockObj.raw = this._source.toString();
            // return the parsed docblock object
            return docblockObj;
        });
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
SDocblockBlock.registerTag('feature', __simpleRepeatableValue);
SDocblockBlock.registerTag('description', __descriptionTag);
SDocblockBlock.registerTag('desc', __descriptionTag);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('see', __seeTag);
SDocblockBlock.registerTag('interface', __interfaceTag);
SDocblockBlock.registerTag('return', __returnTag);
SDocblockBlock.registerTag('param', __paramTag);
SDocblockBlock.registerTag('property', __paramTag);
SDocblockBlock.registerTag('prop', __paramTag);
SDocblockBlock.registerTag('setting', __paramTag);
SDocblockBlock.registerTag('platform', __platformTag);
SDocblockBlock.registerTag('namespace', __namespaceTag);
SDocblockBlock.registerTag('menu', __menuTag);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', __snippetTag);
SDocblockBlock.registerTag('example', __exampleTag);
SDocblockBlock.registerTag('todo', __todoTag);
export default SDocblockBlock;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFVBQVUsTUFBTSw2Q0FBNkMsQ0FBQztBQUlyRSxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFDO0FBQ2xELE9BQU8sdUJBQXVCLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLFdBQVcsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxZQUFZLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxVQUFVLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLFlBQVksTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLGFBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLGNBQWMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLFNBQVMsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sY0FBYyxNQUFNLGtCQUFrQixDQUFDO0FBZ0Q5QyxhQUFhO0FBQ2IsTUFBTSxjQUFlLFNBQVEsUUFBUTtJQXdFakM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUM3QixLQUFLLENBQ0QsVUFBVSxDQUNOO1lBQ0ksYUFBYSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixJQUFJLEVBQUUsY0FBYyxDQUFDLE9BQU87YUFDL0I7U0FDSixFQUNELFFB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