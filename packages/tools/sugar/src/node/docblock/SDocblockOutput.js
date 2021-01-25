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
            return new Promise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
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
        return new SPromise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrT3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY2Jsb2NrT3V0cHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFViw2REFBdUM7QUFDdkMsb0VBQThDO0FBQzlDLG1FQUE2QztBQUM3Qyw0REFBc0M7QUFDdEMsNkRBQXVDO0FBQ3ZDLHNEQUFrQztBQUNsQyw4RUFBdUQ7QUFFdkQsOEVBQXdEO0FBQ3hELG1FQUFvRDtBQUNwRCw0Q0FBc0I7QUE4QnRCLGlCQUFTLE1BQU0sZUFBZTtJQXlCNUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxnQkFBZ0IsRUFBRSxRQUFRLEdBQUcsRUFBRTtRQWxDM0M7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVmOzs7Ozs7Ozs7V0FTRztRQUNILHNCQUFpQixHQUFHLElBQUksQ0FBQztRQWF2QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsRUFBRTtTQUNiLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFDRiw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdCQUFnQixDQUFDO1FBQzFDLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCwyQkFBMkI7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyw2QkFBb0IsQ0FBQyxvQkFBWSxFQUFFO1lBQ3BELE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxX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