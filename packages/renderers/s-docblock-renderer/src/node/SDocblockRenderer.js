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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __handlebars from 'handlebars/dist/handlebars';
import __promisedHandlebars from 'promised-handlebars';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SDocblockRendererSettingsInterface from './interface/SDocblockRendererSettingsInterface';
import classBlock from './default/blocks/class';
import defaultBlock from './default/blocks/default';
import functionBlock from './default/blocks/function';
import concatHelper from './default/helpers/concat';
import classLayout from './default/layouts/class';
import defaultLayout from './default/layouts/default';
import functionLayout from './default/layouts/function';
// @ts-ignore
class SDocblockRenderer extends __SClass {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(docblockInstance, settings) {
        // save the settings
        super(__deepMerge({
            docblockRenderer: Object.assign({}, __SDocblockRendererSettingsInterface.defaults())
        }, settings));
        /**
         * @name          _renderedBlocks
         * @type          Array<SDocblockBlock>
         * @private
         *
         * Store the rendered blocks to avoid rendering them twice
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._renderedBlocks = [];
        // @ts-ignore
        if (window && !window.global)
            window.global = {};
        // save the docblock instance
        this._docblockInstance = docblockInstance;
        this._registerHandlerbarsHelpers();
    }
    /**
     * @name        docblockRendererSettings
     * @type        ISDocblockRendererSettings
     * @get
     *
     * Access the docblock renderer settings
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get docblockRendererSettings() {
        return this._settings.docblockRenderer;
    }
    /**
     * @name      registerHelper
     * @type      Function
     * @static
     *
     * Register an helper
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerHelper(helperObj) {
        this._registeredHelpers[helperObj.id] = helperObj;
    }
    /**
     * @name        registerLayout
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerLayout(layoutObj) {
        this._registeredLayouts[layoutObj.id] = layoutObj;
    }
    /**
     * @name        registerPartial
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerPartial(partialObj) {
        this._registeredPartials[partialObj.id] = partialObj;
    }
    /**
     * @name        registerTag
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerTag(tagObj) {
        this._registeredTags[tagObj.id] = tagObj;
    }
    /**
     * @name        registerBlock
     * @type        Function
     * @static
     *
     * Allows you to register a new layout for this particular renderer instance
     *
     * @todo      doc
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerBlock(blockObj) {
        this._registeredBlocks[blockObj.id] = blockObj;
    }
    /**
     * @name        _registerHelpers
     * @type        Function
     * @private
     *
     * Register all the helpers inside the "helpers" folders
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _registerHelpers() {
        // @ts-ignore
        Object.keys(this.constructor._registeredHelpers).forEach((helperId) => {
            // @ts-ignore
            const helperObj = this.constructor._registeredHelpers[helperId];
            this._handlebars.registerHelper(helperObj.id, (...args) => {
                const api = {
                    settings: this.docblockRendererSettings,
                    renderer: this,
                    hbs: this._handlebars,
                    render: (string, data = {}) => {
                        const tpl = this._handlebars.compile(string);
                        return tpl(data);
                    }
                };
                if (!helperObj.args) {
                    throw new Error(`You try to make use of the "<yellow>${helperObj.id}</yellow>" SDocblockRenderer helper but it does not have the required "<cyan>args</cyan>" property.`);
                }
                Object.keys(helperObj.args).forEach((key, i) => {
                    const value = args[i];
                    if (value !== undefined) {
                        api[key] = value;
                    }
                    else {
                        api[key] = helperObj[key];
                    }
                });
                return helperObj.process(api);
            });
        });
    }
    /**
     * @name          _registerHandlerbarsHelpers
     * @type          Function
     * @private
     *
     * This method init the handlebar instance that will be used during the rendering process
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _registerHandlerbarsHelpers() {
        this._handlebars = __promisedHandlebars(__handlebars, {
            Promise: Promise
        });
        // this._handlebars = __handlebars;
        let currentBlock;
        const blocksByHash = {};
        this._handlebars.registerHelper('block', (type) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this._docblockInstance.blocks ||
                    !this._docblockInstance.blocks.length)
                    return '';
                // filter blocks
                const blocks = this._docblockInstance.blocks.filter((block, i) => {
                    const blockObj = block.toObject();
                    if (i > 0)
                        return false;
                    if (type !== '...') {
                        if (!blockObj.type)
                            return false;
                        if (blockObj.type.toLowerCase() !== type.toLowerCase())
                            return false;
                    }
                    const blockHash = __md5.encrypt(blockObj);
                    if (blocksByHash[blockHash])
                        return false;
                    // add the block in the rendered blocks stack
                    blocksByHash[blockHash] = block;
                    return true;
                });
                const renderedBlocks = [];
                for (let i = 0; i < blocks.length; i++) {
                    const blockObj = blocks[i].toObject();
                    currentBlock = blocks[i];
                    const result = yield this.renderBlock(blocks[i]);
                    renderedBlocks.push(result);
                }
                resolve(renderedBlocks.join('\n\n'));
            }));
        });
        this._handlebars.registerHelper('tag', (tagName) => __awaiter(this, void 0, void 0, function* () {
            if (!currentBlock)
                return '';
            return yield this.renderTag(currentBlock, tagName);
        }));
        // @ts-ignore
        Object.keys(this.constructor._registeredPartials).forEach((partialId) => {
            // @ts-ignore
            const partialObj = this.constructor._registeredPartials[partialId];
            this._handlebars.registerPartial(partialObj.id, partialObj.template.trim());
        });
        this._registerHelpers();
    }
    /**
     * @name          renderBlock
     * @type          Function
     * @async
     *
     * This method is the one take will render a block using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    renderBlock(blockObj, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (blockObj.toObject && typeof blockObj.toObject === 'function')
                    blockObj = blockObj.toObject();
                const type = typeof blockObj.type === 'string'
                    ? blockObj.type.toLowerCase()
                    : 'default';
                const template = 
                // @ts-ignore
                this.constructor._registeredBlocks[type] ||
                    // @ts-ignore
                    this.constructor._registeredBlocks.default;
                let compiledTemplateFn;
                compiledTemplateFn = this._handlebars.compile(template.template, {
                    noEscape: true
                });
                const renderedTemplate = compiledTemplateFn(blockObj);
                // return the rendered template
                resolve(renderedTemplate);
            });
        });
    }
    /**
     * @name          renderTag
     * @type          Function
     * @async
     *
     * This method is the one take will render a tag using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    renderTag(blockObj, tagName = 'default', settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (blockObj.toObject && typeof blockObj.toObject === 'function')
                    blockObj = blockObj.toObject();
                const template = 
                // @ts-ignore
                this.constructor._registeredTags[tagName] ||
                    // @ts-ignore
                    this.constructor._registeredTags.default;
                let compiledTemplateFn;
                compiledTemplateFn = this._handlebars.compile(template.template.trim(), {
                    noEscape: true
                });
                let renderedTemplate = '';
                renderedTemplate = compiledTemplateFn({
                    [tagName]: blockObj[tagName]
                });
                // return the rendered template
                resolve(renderedTemplate);
            });
        });
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * This method is the main one that will take each blocks in the docblock instance
     * and render them by passing each tags to the ```renderTag``` method.
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render() {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // get the block in object format
            const blocksArray = this._docblockInstance.toObject();
            if (!blocksArray.length)
                return resolve();
            // get the first block
            const firstBlock = blocksArray[0];
            // get the layout to render
            const type = typeof firstBlock.type === 'string'
                ? firstBlock.type.toLowerCase()
                : 'default';
            const layout = 
            // @ts-ignore
            this.constructor._registeredLayouts[type] ||
                // @ts-ignore
                this.constructor._registeredLayouts.default;
            if (!layout.template) {
                return reject();
            }
            // render the template
            const compiledTemplateFn = this._handlebars.compile(layout.template, {
                noEscape: true
            });
            const renderedLayout = compiledTemplateFn();
            // resolve the rendering process with the rendered stack
            resolve(renderedLayout);
        }), {
            id: 'SDocblockRendererRender'
        });
    }
}
/**
 * @name        _registeredLayouts
 * @type        Record<string, string>
 * @private
 * @static
 *
 * Store the registered layouts
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDocblockRenderer._registeredLayouts = {};
/**
 * @name        _registeredPartials
 * @type        Record<string, string>
 * @private
 * @static
 *
 * Store the registered partials
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDocblockRenderer._registeredPartials = {};
/**
 * @name        _registeredHelpers
 * @type        Record<string, string>
 * @private
 * @static
 *
 * Store the registered helpers
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDocblockRenderer._registeredHelpers = {};
/**
 * @name        _registeredTags
 * @type        Record<string, string>
 * @private
 * @static
 *
 * Store the registered tags
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDocblockRenderer._registeredTags = {};
/**
 * @name        _registeredBlocks
 * @type        Record<string, string>
 * @private
 * @static
 *
 * Store the registered blocks
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SDocblockRenderer._registeredBlocks = {};
SDocblockRenderer.registerBlock(classBlock);
SDocblockRenderer.registerBlock(defaultBlock);
SDocblockRenderer.registerBlock(functionBlock);
SDocblockRenderer.registerHelper(concatHelper);
SDocblockRenderer.registerLayout(classLayout);
SDocblockRenderer.registerLayout(defaultLayout);
SDocblockRenderer.registerLayout(functionLayout);
export default SDocblockRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLG9CQUFvQixNQUFNLHFCQUFxQixDQUFDO0FBR3ZELE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBRXpELE9BQU8sb0NBQW9DLE1BQU0sZ0RBQWdELENBQUM7QUFNbEcsT0FBTyxVQUFVLE1BQU0sd0JBQXdCLENBQUM7QUFDaEQsT0FBTyxZQUFZLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFFdEQsT0FBTyxZQUFZLE1BQU0sMEJBQTBCLENBQUM7QUFFcEQsT0FBTyxXQUFXLE1BQU0seUJBQXlCLENBQUM7QUFDbEQsT0FBTyxhQUFhLE1BQU0sMkJBQTJCLENBQUM7QUFDdEQsT0FBTyxjQUFjLE1BQU0sNEJBQTRCLENBQUM7QUFxRnhELGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLFFBQVE7SUFvSHRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQXlDO1FBRXpDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsZ0JBQWdCLG9CQUNYLG9DQUFvQyxDQUFDLFFBQVEsRUFBRSxDQUNuRDtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXBDSjs7Ozs7Ozs7O1dBU0c7UUFDSyxvQkFBZSxHQUFzQixFQUFFLENBQUM7UUE0QjlDLGFBQWE7UUFDYixJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQUUsTUFB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