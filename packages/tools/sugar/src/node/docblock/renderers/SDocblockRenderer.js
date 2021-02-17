"use strict";
// @shared
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
const SClass_1 = __importDefault(require("../../class/SClass"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const handlebars_1 = __importDefault(require("handlebars"));
const promised_handlebars_1 = __importDefault(require("promised-handlebars"));
const packageRoot_1 = __importDefault(require("../../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const sugar_1 = __importDefault(require("../../config/sugar"));
// @ts-ignore
class SDocblockRenderer extends SClass_1.default {
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
            docblockRenderer: {
                rootDir: undefined,
                config: Object.assign({}, sugar_1.default('doc')),
                templates: {},
                blocks: {},
                partials: {}
            }
        }, settings));
        /**
         * @name        _partialsTemplateObj
         * @type        ISDocblockRendererPartialsTemplateObj
         * @private
         *
         * Store the partials template objects
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._partialsTemplateObj = {};
        /**
         * @name        _registered
         * @type        ISDocblockRendererRegisteredStacks
         * @private
         *
         * Store the registered templates, blocks and partials
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._registered = {
            templates: {},
            blocks: {},
            partials: {}
        };
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
        // save the docblock instance
        this._docblockInstance = docblockInstance;
        // init the handlebars helpers
        this._registerHandlerbarsHelpers();
        // register helpers
        this._registerHelpers();
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
     * @name        registerTemplate
     * @type        Function
     *
     * Allows you to register a new template for this particular renderer instance
     *
     * @param     {String}      name        The name of this template
     * @param     {String}    path          The path to the template file
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerTemplate(name, path) {
        if (!fs_1.default.existsSync(path)) {
            throw new Error(`You try to register the template named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this template is either inexistant, or invalid...`);
        }
        this._registered.templates[name] = path;
    }
    /**
     * @name        registerBlock
     * @type        Function
     *
     * Allows you to register a new block for this particular renderer instance
     *
     * @param     {String}      name        The name of this template
     * @param     {String}    path          The path to the template file
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerBlock(name, path) {
        if (!fs_1.default.existsSync(path)) {
            throw new Error(`You try to register the block named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this block is either inexistant, or invalid...`);
        }
        this._registered.blocks[name] = path;
    }
    /**
     * @name        registerPartial
     * @type        Function
     *
     * Allows you to register a new template for this particular renderer instance
     *
     * @param     {String}      name        The name of this template
     * @param     {String}    path          The path to the template file
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    registerPartial(name, path) {
        if (!fs_1.default.existsSync(path)) {
            throw new Error(`You try to register the partial named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this partial is either inexistant, or invalid...`);
        }
        this._registered.partials[name] = path;
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
        const files = glob_1.default.sync(`${__dirname}/helpers/**/*.js`);
        files.forEach((filePath) => {
            const helperObj = require(filePath);
            if (!helperObj.id || !helperObj.helper)
                return;
            this._handlebars.registerHelper(helperObj.id, helperObj.helper.bind(this));
        });
        if (this.docblockRendererSettings.rootDir) {
            console.log(`${this.docblockRendererSettings.rootDir}/helpers/**/*.js`);
            const rendererFiles = glob_1.default.sync(`${this.docblockRendererSettings.rootDir}/helpers/**/*.js`);
            rendererFiles.forEach((filePath) => {
                const helperObj = require(filePath).default;
                if (!helperObj.id || !helperObj.helper)
                    return;
                this._handlebars.registerHelper(helperObj.id, helperObj.helper.bind(this));
            });
        }
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
            promise: Promise
        });
        this._handlebars.registerHelper('include', (type) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this._docblockInstance.blocks ||
                    !this._docblockInstance.blocks.length)
                    return '';
                // filter blocks
                const blocks = this._docblockInstance.blocks.filter((block) => {
                    if (!block.toObject().type)
                        return false;
                    const rendered = this._renderedBlocks.indexOf(block) !== -1;
                    this._renderedBlocks.push(block);
                    return rendered !== true;
                });
                const renderedBlocks = [];
                for (let i = 0; i < blocks.length; i++) {
                    const block = blocks[i];
                    const result = yield this.renderBlock(block.toObject());
                    renderedBlocks.push(result);
                }
                resolve(renderedBlocks.join('\n\n'));
            }));
        });
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
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    renderBlock(blockObj, settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (blockObj.toObject && typeof blockObj.toObject === 'function')
                blockObj = blockObj.toObject();
            const type = typeof blockObj.type === 'string'
                ? blockObj.type.toLowerCase()
                : 'default';
            const template = this._registered.blocks[type] || this._registered.blocks.default;
            let compiledTemplateFn;
            // get template object
            let templateObj = yield this.getTemplateObj(template);
            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                noEscape: true
            });
            const renderedTemplate = yield compiledTemplateFn(blockObj);
            // return the rendered template
            return renderedTemplate;
        });
    }
    /**
     * @name          registerPartials
     * @type        Function
     * @async
     *
     * This method loop on all the partials and read them with their stats if we are in node context
     *
     * @since       2.0.0
     *  @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */
    registerPartials() {
        Object.keys(this._registered.partials).forEach((partialName) => __awaiter(this, void 0, void 0, function* () {
            const partialPath = this._registered.partials[partialName];
            const partialsTemplateObj = yield this.getTemplateObj(partialPath);
            // register partials
            this._handlebars.unregisterPartial(partialName);
            this._handlebars.registerPartial(partialName, partialsTemplateObj.content);
        }));
    }
    /**
     * @name          getTemplateObj
     * @type          Function
     * @async
     *
     * This method take the template url setted in the settings object and
     * resolve it to get back a full template object with the path and the stats if we are in node context
     *
     * @param         {String}        templatePath        The template path to get
     * @return      {ISDocblockRendererTemplateObj}                          The template object with the path and the stats if we are in node context
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */
    getTemplateObj(templatePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let stats;
            if (fs_1.default.existsSync(templatePath)) {
            }
            else if (fs_1.default.existsSync(`${packageRoot_1.default()}/node_modules/${templatePath}`)) {
                templatePath = `${packageRoot_1.default()}/node_modules/${templatePath}`;
            }
            else {
                throw new Error(`Sorry but the passed template url "<yellow>${templatePath}</yellow>" does not exists...`);
            }
            stats = fs_1.default.statSync(templatePath);
            const content = fs_1.default.readFileSync(templatePath, 'utf8');
            const templateObj = {
                path: templatePath,
                content,
                stats
            };
            return templateObj;
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
        // init the partials
        this.registerPartials();
        return new SPromise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // get the block in object format
            const blocksArray = this._docblockInstance.toObject();
            // reset all blocks rendered state
            blocksArray.forEach((block) => {
                block._rendered = false;
            });
            // get the first block
            const firstBlock = blocksArray[0];
            // get the template to render
            const type = typeof firstBlock.type === 'string'
                ? firstBlock.type.toLowerCase()
                : 'default';
            const template = this._registered.templates[type] ||
                this._registered.templates.default;
            const templateObj = yield this.getTemplateObj(template);
            if (!templateObj || !templateObj.content) {
                return reject();
            }
            // render the template
            const compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                noEscape: true
            });
            const renderedTemplate = yield compiledTemplateFn();
            // resolve the rendering process with the rendered stack
            resolve(renderedTemplate);
        }), {
            id: 'SDocblockRendererRender'
        });
    }
}
exports.default = SDocblockRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUFFVixnRUFBMEM7QUFDMUMsdUVBQWlEO0FBQ2pELHNFQUFnRDtBQUNoRCw0REFBc0M7QUFDdEMsOEVBQXVEO0FBQ3ZELGlGQUEyRDtBQUUzRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLCtEQUErQztBQWdFL0MsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsZ0JBQVE7SUErRXRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQXlDO1FBRXpDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGdCQUFnQixFQUFFO2dCQUNoQixPQUFPLEVBQUUsU0FBUztnQkFDbEIsTUFBTSxvQkFDRCxlQUFhLENBQUMsS0FBSyxDQUFDLENBQ3hCO2dCQUNELFNBQVMsRUFBRSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFFBQVEsRUFBRSxFQUFFO2FBQ2I7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFwRko7Ozs7Ozs7OztXQVNHO1FBQ0gseUJBQW9CLEdBQTBDLEVBQUUsQ0FBQztRQUVqRTs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUF1QztZQUNoRCxTQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sRUFBRSxFQUFFO1lBQ1YsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBZ0JGOzs7Ozs7Ozs7V0FTRztRQUNLLG9CQUFlLEdBQXNCLEVBQUUsQ0FBQztRQWtDOUMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFB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