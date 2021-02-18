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
const path_1 = __importDefault(require("path"));
const SClass_1 = __importDefault(require("../../class/SClass"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const handlebars_1 = __importDefault(require("handlebars"));
const promised_handlebars_1 = __importDefault(require("promised-handlebars"));
const packageRoot_1 = __importDefault(require("../../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const md5_1 = __importDefault(require("../../crypt/md5"));
const SDocblockRendererSettingsInterface_1 = __importDefault(require("./interface/SDocblockRendererSettingsInterface"));
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
            docblockRenderer: Object.assign({}, SDocblockRendererSettingsInterface_1.default.defaults())
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
         * @name        _registeredTemplates
         * @type        Record<string, string>
         * @private
         *
         * Store the registered templates, blocks and partials
         *
         * @since       2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._registeredTemplates = {};
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
        // register templates
        this._registerTemplates();
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
     * @name      _registerTemplates
     * @type      Function
     * @private
     *
     * This method scan the directories "layouts", "blocks" and "partials" of the renderer directory
     * and register them automatically
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _registerTemplates() {
        const scanDir = (rootDir, directory) => {
            const layoutsPathes = glob_1.default.sync(`${rootDir}/${directory}/**/*.hbs`);
            layoutsPathes.forEach((path) => {
                const name = path_1.default
                    .relative(rootDir, path)
                    .replace('.hbs', '')
                    .split('/')
                    .join('.');
                this.registerTemplate(name, path);
            });
        };
        // const layouts = __glob.sync(`${__dirname}/layouts/**/*.js`);
        // layouts.forEach((layoutPath) => {
        //   const helperObj = require(filePath);
        //   if (!helperObj.id || !helperObj.helper) return;
        //   this._handlebars.registerHelper(helperObj.id, (...args) => {
        //     helperObj.helper(...args);
        //   });
        // });
        scanDir(`${__dirname}/default`, 'layouts');
        scanDir(`${__dirname}/default`, 'blocks');
        scanDir(`${__dirname}/default`, 'partials');
        scanDir(`${__dirname}/default`, 'tags');
        if (this.docblockRendererSettings.rootDir) {
            scanDir(this.docblockRendererSettings.rootDir, 'layouts');
            scanDir(this.docblockRendererSettings.rootDir, 'blocks');
            scanDir(this.docblockRendererSettings.rootDir, 'partials');
            scanDir(this.docblockRendererSettings.rootDir, 'tags');
        }
    }
    /**
     * @name        registerLayout
     * @type        Function
     *
     * Allows you to register a new layout for this particular renderer instance
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
        if (name.match(/^partials\./)) {
            name = name.replace(/^partials\./, '');
            this._handlebars.registerPartial(name, fs_1.default.readFileSync(path, 'utf8'));
        }
        else {
            this._registeredTemplates[name] = path;
        }
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
            this._handlebars.registerHelper(helperObj.id, (...args) => {
                helperObj.helper(...args);
            });
        });
        if (this.docblockRendererSettings.rootDir) {
            const rendererFiles = glob_1.default.sync(`${this.docblockRendererSettings.rootDir}/helpers/**/*.js`);
            rendererFiles.forEach((filePath) => {
                const helperObj = require(filePath).default;
                if (!helperObj.id || !helperObj.helper)
                    return;
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
                    return helperObj.helper(api);
                });
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
        let currentBlock;
        const blocksByHash = {};
        this._handlebars.registerHelper('block', (type) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!this._docblockInstance.blocks ||
                    !this._docblockInstance.blocks.length)
                    return '';
                // filter blocks
                const blocks = this._docblockInstance.blocks.filter((block) => {
                    const blockObj = block.toObject();
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
            const template = this._registeredTemplates[`blocks.${type}`] ||
                this._registeredTemplates['blocks.default'];
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
     * @name          renderTag
     * @type          Function
     * @async
     *
     * This method is the one take will render a tag using the correct block template
     * and the passed block object data
     *
     * @param       {Object}          blockObj          The object representing the block to render
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {String}                            The rendered block
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    renderTag(blockObj, tagName = 'default', settings = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (blockObj.toObject && typeof blockObj.toObject === 'function')
                blockObj = blockObj.toObject();
            const template = this._registeredTemplates[`tags.${tagName}`] ||
                this._registeredTemplates['tags.default'];
            let compiledTemplateFn;
            // get template object
            let templateObj = yield this.getTemplateObj(template);
            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                noEscape: true
            });
            const renderedTemplate = yield compiledTemplateFn({
                [tagName]: blockObj[tagName]
            });
            // return the rendered template
            return renderedTemplate;
        });
    }
    /**
     * @name          getTemplateObj
     * @type          Function
     * @async
     *
     * This method take the layout url setted in the settings object and
     * resolve it to get back a full layout object with the path and the stats if we are in node context
     *
     * @param         {String}        layoutPath        The template path to get
     * @return      {ISDocblockRendererTemplateObj}                          The template object with the path and the stats if we are in node context
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */
    getTemplateObj(layoutPath) {
        return __awaiter(this, void 0, void 0, function* () {
            let stats;
            if (fs_1.default.existsSync(layoutPath)) {
            }
            else if (fs_1.default.existsSync(`${packageRoot_1.default()}/node_modules/${layoutPath}`)) {
                layoutPath = `${packageRoot_1.default()}/node_modules/${layoutPath}`;
            }
            else {
                throw new Error(`Sorry but the passed template url "<yellow>${layoutPath}</yellow>" does not exists...`);
            }
            stats = fs_1.default.statSync(layoutPath);
            const content = fs_1.default.readFileSync(layoutPath, 'utf8');
            const templateObj = {
                path: layoutPath,
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
        // this.registerPartials();
        return new SPromise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            // get the block in object format
            const blocksArray = this._docblockInstance.toObject();
            // get the first block
            const firstBlock = blocksArray[0];
            // get the layout to render
            const type = typeof firstBlock.type === 'string'
                ? firstBlock.type.toLowerCase()
                : 'default';
            const layout = this._registeredTemplates[`layouts.${type}`] ||
                this._registerTemplates['layouts.default'];
            const layoutObj = yield this.getTemplateObj(layout);
            if (!layoutObj || !layoutObj.content) {
                return reject();
            }
            // render the template
            const compiledTemplateFn = this._handlebars.compile(layoutObj.content, {
                noEscape: true
            });
            const renderedLayout = yield compiledTemplateFn();
            // resolve the rendering process with the rendered stack
            resolve(renderedLayout);
        }), {
            id: 'SDocblockRendererRender'
        });
    }
}
exports.default = SDocblockRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7QUFFVixnREFBMEI7QUFDMUIsZ0VBQTBDO0FBQzFDLHVFQUFpRDtBQUNqRCxzRUFBZ0Q7QUFDaEQsNERBQXNDO0FBQ3RDLDhFQUF1RDtBQUN2RCxpRkFBMkQ7QUFFM0QsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUcxQiwwREFBb0M7QUFFcEMsd0hBQWtHO0FBZ0VsRyxhQUFhO0FBQ2IsTUFBTSxpQkFBa0IsU0FBUSxnQkFBUTtJQTJFdEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxnQkFBNEIsRUFDNUIsUUFBeUM7UUFFekMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsZ0JBQWdCLG9CQUNYLDRDQUFvQyxDQUFDLFFBQVEsRUFBRSxDQUNuRDtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQTFFSjs7Ozs7Ozs7O1dBU0c7UUFDSCx5QkFBb0IsR0FBMEMsRUFBRSxDQUFDO1FBRWpFOzs7Ozs7Ozs7V0FTRztRQUNILHlCQUFvQixHQUEyQixFQUFFLENBQUM7UUFnQmxEOzs7Ozs7Ozs7V0FTRztRQUNLLG9CQUFlLEdBQXNCLEVBQUUsQ0FBQztRQTRCOUMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBNUREOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksd0JBQXdCO1FBQzFCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxn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