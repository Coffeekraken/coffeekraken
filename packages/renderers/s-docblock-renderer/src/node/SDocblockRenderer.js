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
const path_1 = __importDefault(require("path"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const handlebars_1 = __importDefault(require("handlebars"));
const promised_handlebars_1 = __importDefault(require("promised-handlebars"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const SDocblockRendererSettingsInterface_1 = __importDefault(require("./interface/SDocblockRendererSettingsInterface"));
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
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
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
            const templateObj = yield this.getTemplateObj(template);
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
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
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
            const templateObj = yield this.getTemplateObj(template);
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
     * @param         {String}        layoutPath        The template path to get
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
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUEwQjtBQUMxQixvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLHdFQUFpRDtBQUNqRCw0REFBc0M7QUFDdEMsOEVBQXVEO0FBQ3ZELDRGQUFzRTtBQUN0RSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLCtFQUF5RDtBQUV6RCx3SEFBa0c7QUFnRWxHLGFBQWE7QUFDYixNQUFNLGlCQUFrQixTQUFRLGlCQUFRO0lBMkV0Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGdCQUE0QixFQUM1QixRQUF5QztRQUV6QyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxnQkFBZ0Isb0JBQ1gsNENBQW9DLENBQUMsUUFBUSxFQUFFLENBQ25EO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBMUVKOzs7Ozs7Ozs7V0FTRztRQUNILHlCQUFvQixHQUEwQyxFQUFFLENBQUM7UUFFakU7Ozs7Ozs7OztXQVNHO1FBQ0gseUJBQW9CLEdBQTJCLEVBQUUsQ0FBQztRQWdCbEQ7Ozs7Ozs7OztXQVNHO1FBQ0ssb0JBQWUsR0FBc0IsRUFBRSxDQUFDO1FBNEI5Qyw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQzFDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUE1REQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx3QkFBd0I7UUFDMUIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFD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