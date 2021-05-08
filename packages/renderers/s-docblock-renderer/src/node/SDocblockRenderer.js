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
try {
    if (!global) {
        global = {};
        global.Symbol = Symbol;
    }
}
catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUk7SUFDRixJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ1gsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCO0NBQ0Y7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBR2Qsb0VBQTZDO0FBQzdDLDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsNEVBQXNEO0FBQ3RELDhFQUF1RDtBQUd2RCwrRUFBeUQ7QUFFekQsd0hBQWtHO0FBTWxHLG1FQUFnRDtBQUNoRCx1RUFBb0Q7QUFDcEQseUVBQXNEO0FBRXRELHNFQUFvRDtBQUVwRCxvRUFBa0Q7QUFDbEQsd0VBQXNEO0FBQ3RELDBFQUF3RDtBQXFGeEQsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsaUJBQVE7SUFvSHRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQXlDO1FBRXpDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGdCQUFnQixvQkFDWCw0Q0FBb0MsQ0FBQyxRQUFRLEVBQUUsQ0FDbkQ7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFwQ0o7Ozs7Ozs7OztXQVNHO1FBQ0ssb0JBQWUsR0FBc0IsRUFBRSxDQUFDO1FBNEI5QyxhQUFhO1FBQ2IsSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtZQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWpELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFMUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQTNERDs7Ozs7Ozs7O09BU0c7SUFD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