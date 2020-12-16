"use strict";
// @ts-nocheck
// @shared
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const SError_1 = __importDefault(require("../error/SError"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const handlebars_1 = __importDefault(require("handlebars"));
const SCache_1 = __importDefault(require("../cache/SCache"));
const node_1 = __importDefault(require("../is/node"));
const promised_handlebars_1 = __importDefault(require("promised-handlebars"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const json_1 = __importDefault(require("../../node/package/json"));
const fs_1 = __importDefault(require("fs"));
module.exports = class SDocblockOutput {
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
    constructor(docblockInstance, settings = {}) {
        /**
         * @name      _settings
         * @type      Object
         * @private
         *
         * Store the settings
         *
         * @since     2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name      _docblockInstance
         * @type      SDocblock
         * @private
         *
         * Store the SDocblock instance to render
         *
         * @since     2.0.0
         * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._docblockInstance = null;
        // save the settings
        this._settings = deepMerge_1.default({
            templates: {},
            blocks: {},
            partials: {}
        }, settings);
        // save the docblock instance
        this._docblockInstance = docblockInstance;
        // init the handlebars helpers
        this._registerHandlerbarsHelpers();
        this._cache = new SCache_1.default('SDocblockOutput');
    }
    /**
     * @name          _registerHandlerbarsHelpers
     * @type          Function
     * @private
     *
     * This method init the handlebar instance that will be used during the rendering process
     *
     * @since       2.0.0
     *
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
                    const rendered = block._rendered;
                    block._rendered = true;
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
            const template = this._settings.blocks[type] || this._settings.blocks.default;
            let compiledTemplateFn;
            let templateObj = {};
            if (node_1.default()) {
                // get template object
                templateObj = this.getTemplateObj(template);
                const cacheObj = {
                    partialsTemplateObj: this._partialsTemplateObj,
                    template: templateObj,
                    data: blockObj
                };
                // check the cache
                const cachedValue = yield this._cache.get(cacheObj);
                if (!cachedValue) {
                    compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                        noEscape: true
                    });
                    const renderedTemplate = yield compiledTemplateFn(blockObj);
                    // save in chache
                    this._cache.set(cacheObj, renderedTemplate);
                    // return the rendered template
                    return renderedTemplate;
                }
                else {
                    return cachedValue;
                }
            }
            else {
                // return rendered template
                return 'Support for javascript is not available yet...';
            }
        });
    }
    /**
     * @name          getPartialsTemplateObj
     * @type        Function
     * @async
     *
     * This method loop on all the partials and read them with their stats if we are in node context
     *
     * @return      {Object}          The template object of all the partials
     *
     * @since       2.0.0
     *  @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */
    getPartialsTemplateObj() {
        const partialsTemplateObj = {};
        Object.keys(this._settings.partials).forEach((partialName) => {
            const partialPath = this._settings.partials[partialName];
            partialsTemplateObj[partialName] = this.getTemplateObj(partialPath);
            // register partials
            this._handlebars.unregisterPartial(partialName);
            this._handlebars.registerPartial(partialName, partialsTemplateObj[partialName].content);
        });
        return partialsTemplateObj;
    }
    /**
     * @name          getTemplateObj
     * @type          Function
     * @async
     *
     * This method take the template url setted in the settings object and
     * resolve it to get back a full template object with the path and the stats is we are in node context
     *
     * @param         {String}        template        The template path to get
     * @return      {Object}                          The template object with the path and the stats if we are in node context
     *
     * @since       2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
     */
    getTemplateObj(template) {
        return __awaiter(this, void 0, void 0, function* () {
            let templateObj = {};
            if (node_1.default()) {
                const json = json_1.default();
                let templatePath;
                if (fs_1.default.existsSync(template)) {
                    templatePath = template;
                }
                else if (fs_1.default.existsSync(`${packageRoot_1.default()}/node_modules/${template}`)) {
                    templatePath = `${packageRoot_1.default()}/node_modules/${template}`;
                }
                else {
                    throw new SError_1.default(`Sorry but the passed template url "<yellow>${template}</yellow>" does not exists...`);
                }
                const stats = fs_1.default.statSync(templatePath);
                delete require.cache[require.resolve(templatePath)];
                const content = yield Promise.resolve().then(() => __importStar(require(templatePath)));
                templateObj = {
                    path: templatePath,
                    content: content,
                    mtime: stats.mtime
                };
            }
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
     * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
     * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(settings = {}) {
        this._partialsTemplateObj = this.getPartialsTemplateObj();
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
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
            const template = this._settings.templates[type] || this._settings.templates.default;
            const templateObj = this.getTemplateObj(template);
            // render the template
            let compiledTemplateFn;
            const compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                noEscape: true
            });
            const renderedTemplate = yield compiledTemplateFn();
            // resolve the rendering process with the rendered stack
            resolve(renderedTemplate);
        }), {
            id: 'SDocblockOutputRender'
        });
    }
};
//# sourceMappingURL=SDocblockOutput.js.map