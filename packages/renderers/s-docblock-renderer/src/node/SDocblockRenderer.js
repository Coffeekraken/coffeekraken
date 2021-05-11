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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const handlebars_1 = __importDefault(require("handlebars/dist/handlebars"));
const promised_handlebars_1 = __importDefault(require("promised-handlebars"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const SDocblockRendererSettingsInterface_1 = __importDefault(require("./interface/SDocblockRendererSettingsInterface"));
const class_1 = __importDefault(require("./default/blocks/class"));
const default_1 = __importDefault(require("./default/blocks/default"));
const function_1 = __importDefault(require("./default/blocks/function"));
const concat_1 = __importDefault(require("./default/helpers/concat"));
const class_2 = __importDefault(require("./default/layouts/class"));
const default_2 = __importDefault(require("./default/layouts/default"));
const function_2 = __importDefault(require("./default/layouts/function"));
// @ts-ignore
class SDocblockRenderer extends s_class_1.default {
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
        super(deepMerge_1.default({
            docblockRenderer: Object.assign({}, SDocblockRendererSettingsInterface_1.default.defaults())
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
        this._handlebars = promised_handlebars_1.default(handlebars_1.default, {
            Promise: Promise
        });
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
                    const blockHash = md5_1.default.encrypt(blockObj);
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
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // get the block in object format
            const blocksArray = this._docblockInstance.toObject();
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
SDocblockRenderer.registerBlock(class_1.default);
SDocblockRenderer.registerBlock(default_1.default);
SDocblockRenderer.registerBlock(function_1.default);
SDocblockRenderer.registerHelper(concat_1.default);
SDocblockRenderer.registerLayout(class_2.default);
SDocblockRenderer.registerLayout(default_2.default);
SDocblockRenderer.registerLayout(function_2.default);
exports.default = SDocblockRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLG9FQUE2QztBQUM3Qyw0RkFBc0U7QUFDdEUsd0VBQWlEO0FBQ2pELDRFQUFzRDtBQUN0RCw4RUFBdUQ7QUFHdkQsK0VBQXlEO0FBRXpELHdIQUFrRztBQU1sRyxtRUFBZ0Q7QUFDaEQsdUVBQW9EO0FBQ3BELHlFQUFzRDtBQUV0RCxzRUFBb0Q7QUFFcEQsb0VBQWtEO0FBQ2xELHdFQUFzRDtBQUN0RCwwRUFBd0Q7QUFxRnhELGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLGlCQUFRO0lBb0h0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUF5QztRQUV6QyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxnQkFBZ0Isb0JBQ1gsNENBQW9DLENBQUMsUUFBUSxFQUFFLENBQ25EO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBcENKOzs7Ozs7Ozs7V0FTRztRQUNLLG9CQUFlLEdBQXNCLEVBQUUsQ0FBQztRQTRCOUMsYUFBYTtRQUNiLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVqRCw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBRTFDLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUEzREQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx3QkFBd0I7UUFDMUIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDO0lBQ2hELENBQUM7SUFpREQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFtQztRQUN2RCxJQUFJLENB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