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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9kb2NibG9jay9yZW5kZXJlcnMvU0RvY2Jsb2NrUmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7Ozs7Ozs7Ozs7O0FBRVYsZ0RBQTBCO0FBQzFCLGdFQUEwQztBQUMxQyx1RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELDREQUFzQztBQUN0Qyw4RUFBdUQ7QUFDdkQsaUZBQTJEO0FBRTNELDRDQUFzQjtBQUN0QixnREFBMEI7QUFHMUIsMERBQW9DO0FBRXBDLHdIQUFrRztBQWdFbEcsYUFBYTtBQUNiLE1BQU0saUJBQWtCLFNBQVEsZ0JBQVE7SUEyRXRDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsZ0JBQTRCLEVBQzVCLFFBQXlDO1FBRXpDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLGdCQUFnQixvQkFDWCw0Q0FBb0MsQ0FBQyxRQUFRLEVBQUUsQ0FDbkQ7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUExRUo7Ozs7Ozs7OztXQVNHO1FBQ0gseUJBQW9CLEdBQTBDLEVBQUUsQ0FBQztRQUVqRTs7Ozs7Ozs7O1dBU0c7UUFDSCx5QkFBb0IsR0FBMkIsRUFBRSxDQUFDO1FBZ0JsRDs7Ozs7Ozs7O1dBU0c7UUFDSyxvQkFBZSxHQUFzQixFQUFFLENBQUM7UUE0QjlDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUMsOEJBQThCO1FBQzlCLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixxQkFBcUI7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQTVERDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHdCQUF3QjtRQUMxQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsZ0JBQWdCLENBQUM7SUFDaEQsQ0FBQztJQWtERDs7Ozs7Ozs7OztPQVVHO0lBQ0gsa0JBQWtCO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLGNBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLElBQUksU0FBUyxXQUFXLENBQUMsQ0FBQztZQUN0RSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzdCLE1BQU0sSUFBSSxHQUFHLGNBQU07cUJBQ2hCLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO3FCQUN2QixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztxQkFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLCtEQUErRDtRQUMvRCxvQ0FBb0M7UUFDcEMseUNBQXlDO1FBQ3pDLG9EQUFvRDtRQUNwRCxpRUFBaUU7UUFDakUsaUNBQWlDO1FBQ2pDLFFBQVE7UUFDUixNQUFNO1FBQ04sT0FBTyxDQUFDLEdBQUcsU0FBUyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsU0FBUyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsZ0JBQWdCLENBQUMsSUFBWSxFQUFFLElBQVk7UUFDekMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FDYixtREFBbUQsSUFBSSxtQ0FBbUMsSUFBSSw4RUFBOEUsQ0FDN0ssQ0FBQztTQUNIO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN6RTthQUFNO1lBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN4QztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxnQkFBZ0I7UUFDZCxNQUFNLEtBQUssR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtnQkFBRSxPQUFPO1lBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO2dCQUN4RCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sRUFBRTtZQUN6QyxNQUFNLGFBQWEsR0FBRyxjQUFNLENBQUMsSUFBSSxDQUMvQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLGtCQUFrQixDQUMzRCxDQUFDO1lBQ0YsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFO29CQUN4RCxNQUFNLEdBQUcsR0FBRzt3QkFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLHdCQUF3Qjt3QkFDdkMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXO3dCQUNyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFOzRCQUM1QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDN0MsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25CLENBQUM7cUJBQ0YsQ0FBQztvQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTt3QkFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYix1Q0FBdUMsU0FBUyxDQUFDLEVBQUUscUdBQXFHLENBQ3pKLENBQUM7cUJBQ0g7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM3QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTs0QkFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzt5QkFDbEI7NkJBQU07NEJBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDM0I7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsMkJBQTJCO1FBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsNkJBQW9CLENBQUMsb0JBQVksRUFBRTtZQUNwRCxPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7UUFFSCxJQUFJLFlBQVksQ0FBQztRQUNqQixNQUFNLFlBQVksR0FBd0IsRUFBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzNDLElBQ0UsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTTtvQkFDOUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE1BQU07b0JBRXJDLE9BQU8sRUFBRSxDQUFDO2dCQUVaLGdCQUFnQjtnQkFDaEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDNUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUVsQyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTs0QkFBRSxPQUFPLEtBQUssQ0FBQzt3QkFDakMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ3BELE9BQU8sS0FBSyxDQUFDO3FCQUNoQjtvQkFFRCxNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLFlBQVksQ0FBQyxTQUFTLENBQUM7d0JBQUUsT0FBTyxLQUFLLENBQUM7b0JBRTFDLDZDQUE2QztvQkFDN0MsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDaEMsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxjQUFjLEdBQWEsRUFBRSxDQUFDO2dCQUNwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN0QyxZQUFZLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzdCO2dCQUVELE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFlBQVk7Z0JBQUUsT0FBTyxFQUFFLENBQUM7WUFDN0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDRyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxFQUFFOztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsUUFBUSxLQUFLLFVBQVU7Z0JBQzlELFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsTUFBTSxJQUFJLEdBQ1IsT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFFBQVE7Z0JBQy9CLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDN0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUVoQixNQUFNLFFBQVEsR0FDWixJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUMsSUFBSSxrQkFBa0IsQ0FBQztZQUV2QixzQkFBc0I7WUFDdEIsSUFBSSxXQUFXLEdBQVEsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTNELGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pFLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVELCtCQUErQjtZQUMvQixPQUFPLGdCQUFnQixDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0csU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLEdBQUcsU0FBUyxFQUFFLFFBQVEsR0FBRyxFQUFFOztZQUMxRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsUUFBUSxLQUFLLFVBQVU7Z0JBQzlELFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakMsTUFBTSxRQUFRLEdBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QyxJQUFJLGtCQUFrQixDQUFDO1lBRXZCLHNCQUFzQjtZQUN0QixJQUFJLFdBQVcsR0FBUSxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFM0Qsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtnQkFDakUsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFFSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sa0JBQWtCLENBQUM7Z0JBQ2hELENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQzthQUM3QixDQUFDLENBQUM7WUFDSCwrQkFBK0I7WUFDL0IsT0FBTyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0csY0FBYyxDQUNsQixVQUFrQjs7WUFFbEIsSUFBSSxLQUFLLENBQUM7WUFFVixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7YUFDaEM7aUJBQU0sSUFDTCxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcscUJBQWEsRUFBRSxpQkFBaUIsVUFBVSxFQUFFLENBQUMsRUFDaEU7Z0JBQ0EsVUFBVSxHQUFHLEdBQUcscUJBQWEsRUFBRSxpQkFBaUIsVUFBVSxFQUFFLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYiw4Q0FBOEMsVUFBVSwrQkFBK0IsQ0FDeEYsQ0FBQzthQUNIO1lBQ0QsS0FBSyxHQUFHLFlBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFbEMsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEQsTUFBTSxXQUFXLEdBQWtDO2dCQUNqRCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTztnQkFDUCxLQUFLO2FBQ04sQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU07UUFDSixvQkFBb0I7UUFDcEIsMkJBQTJCO1FBRTNCLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDNUIsaUNBQWlDO1lBQ2pDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0RCxzQkFBc0I7WUFDdEIsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLDJCQUEyQjtZQUMzQixNQUFNLElBQUksR0FDUixPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssUUFBUTtnQkFDakMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUMvQixDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2hCLE1BQU0sTUFBTSxHQUNWLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUU3QyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLE9BQU8sTUFBTSxFQUFFLENBQUM7YUFDakI7WUFFRCxzQkFBc0I7WUFDdEIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNyRSxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE1BQU0sY0FBYyxHQUFHLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQztZQUNsRCx3REFBd0Q7WUFDeEQsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQSxFQUNEO1lBQ0UsRUFBRSxFQUFFLHlCQUF5QjtTQUM5QixDQUNGLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxpQkFBaUIsQ0FBQyJ9