// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../class/SClass", "../../object/deepMerge", "../../promise/SPromise", "handlebars", "../../cache/SCache", "../../is/node", "promised-handlebars", "../../../node/path/packageRoot", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../../class/SClass"));
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../../promise/SPromise"));
    var handlebars_1 = __importDefault(require("handlebars"));
    var SCache_1 = __importDefault(require("../../cache/SCache"));
    var node_1 = __importDefault(require("../../is/node"));
    var promised_handlebars_1 = __importDefault(require("promised-handlebars"));
    var packageRoot_1 = __importDefault(require("../../../node/path/packageRoot"));
    var fs_1 = __importDefault(require("fs"));
    // @ts-ignore
    var SDocblockRenderer = /** @class */ (function (_super) {
        __extends(SDocblockRenderer, _super);
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
        function SDocblockRenderer(docblockInstance, settings) {
            var _this = 
            // save the settings
            _super.call(this, deepMerge_1.default({
                docblockRenderer: {
                    templates: {},
                    blocks: {},
                    partials: {}
                }
            }, settings)) || this;
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
            _this._partialsTemplateObj = {};
            /**
             * @name        _registered
             * @type        ISDocblockRendererRegisteredStacks
             * @private
             *
             * Store the registered templates, blocks and partials
             *
             * @since       2.0.0
             */
            _this._registered = {
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
            _this._renderedBlocks = [];
            // save the docblock instance
            _this._docblockInstance = docblockInstance;
            // init the handlebars helpers
            _this._registerHandlerbarsHelpers();
            _this._cache = new SCache_1.default('SDocblockRenderer');
            return _this;
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
        SDocblockRenderer.prototype.registerTemplate = function (name, path) {
            if (node_1.default()) {
                var template = require(path);
                if (!template || !template.default) {
                    throw new Error("You try to register the template named \"<yellow>" + name + "</yellow>\" with the path \"<cyan>" + path + "</cyan>\" but it seems that this template is either inexistant, or invalid...");
                }
            }
            this._registered.templates[name] = path;
        };
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
        SDocblockRenderer.prototype.registerBlock = function (name, path) {
            if (node_1.default()) {
                var block = require(path);
                if (!block || !block.default) {
                    throw new Error("You try to register the block named \"<yellow>" + name + "</yellow>\" with the path \"<cyan>" + path + "</cyan>\" but it seems that this block is either inexistant, or invalid...");
                }
            }
            this._registered.blocks[name] = path;
        };
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
        SDocblockRenderer.prototype.registerPartial = function (name, path) {
            if (node_1.default()) {
                var partial = require(path);
                if (!partial || !partial.default) {
                    throw new Error("You try to register the partial named \"<yellow>" + name + "</yellow>\" with the path \"<cyan>" + path + "</cyan>\" but it seems that this partial is either inexistant, or invalid...");
                }
            }
            this._registered.partials[name] = path;
        };
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
        SDocblockRenderer.prototype._registerHandlerbarsHelpers = function () {
            var _this = this;
            this._handlebars = promised_handlebars_1.default(handlebars_1.default, {
                promise: Promise
            });
            this._handlebars.registerHelper('include', function (type) {
                return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var blocks, renderedBlocks, i, block, result;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._docblockInstance.blocks ||
                                    !this._docblockInstance.blocks.length)
                                    return [2 /*return*/, ''];
                                blocks = this._docblockInstance.blocks.filter(function (block) {
                                    if (!block.toObject().type)
                                        return false;
                                    var rendered = _this._renderedBlocks.indexOf(block) !== -1;
                                    _this._renderedBlocks.push(block);
                                    return rendered !== true;
                                });
                                renderedBlocks = [];
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < blocks.length)) return [3 /*break*/, 4];
                                block = blocks[i];
                                return [4 /*yield*/, this.renderBlock(block.toObject())];
                            case 2:
                                result = _a.sent();
                                renderedBlocks.push(result);
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4:
                                resolve(renderedBlocks.join('\n\n'));
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
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
        SDocblockRenderer.prototype.renderBlock = function (blockObj, settings) {
            if (settings === void 0) { settings = {}; }
            return __awaiter(this, void 0, void 0, function () {
                var type, template, compiledTemplateFn, templateObj, cacheObj, cachedValue, renderedTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (blockObj.toObject && typeof blockObj.toObject === 'function')
                                blockObj = blockObj.toObject();
                            type = typeof blockObj.type === 'string'
                                ? blockObj.type.toLowerCase()
                                : 'default';
                            template = this._settings.blocks[type] || this._settings.blocks.default;
                            if (!node_1.default()) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.getTemplateObj(template)];
                        case 1:
                            templateObj = _a.sent();
                            cacheObj = {
                                partialsTemplateObj: this._partialsTemplateObj,
                                template: templateObj,
                                data: blockObj
                            };
                            return [4 /*yield*/, this._cache.get(cacheObj)];
                        case 2:
                            cachedValue = _a.sent();
                            if (!!cachedValue) return [3 /*break*/, 4];
                            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                                noEscape: true
                            });
                            return [4 /*yield*/, compiledTemplateFn(blockObj)];
                        case 3:
                            renderedTemplate = _a.sent();
                            // save in chache
                            this._cache.set(cacheObj, renderedTemplate);
                            // return the rendered template
                            return [2 /*return*/, renderedTemplate];
                        case 4: return [2 /*return*/, cachedValue];
                        case 5: return [3 /*break*/, 7];
                        case 6: 
                        // return rendered template
                        return [2 /*return*/, 'Support for javascript is not available yet...'];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
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
        SDocblockRenderer.prototype.getPartialsTemplateObj = function () {
            var _this = this;
            var partialsTemplateObj = {};
            Object.keys(this._settings.partials).forEach(function (partialName) { return __awaiter(_this, void 0, void 0, function () {
                var partialPath, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            partialPath = this._settings.partials[partialName];
                            _a = partialsTemplateObj;
                            _b = partialName;
                            return [4 /*yield*/, this.getTemplateObj(partialPath)];
                        case 1:
                            _a[_b] = _c.sent();
                            // register partials
                            this._handlebars.unregisterPartial(partialName);
                            this._handlebars.registerPartial(partialName, partialsTemplateObj[partialName].content);
                            return [2 /*return*/];
                    }
                });
            }); });
            return partialsTemplateObj;
        };
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
        SDocblockRenderer.prototype.getTemplateObj = function (templatePath) {
            return __awaiter(this, void 0, void 0, function () {
                var stats, content, templateObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (node_1.default()) {
                                if (fs_1.default.existsSync(templatePath)) {
                                }
                                else if (fs_1.default.existsSync(packageRoot_1.default() + "/node_modules/" + templatePath)) {
                                    templatePath = packageRoot_1.default() + "/node_modules/" + templatePath;
                                }
                                else {
                                    throw new Error("Sorry but the passed template url \"<yellow>" + templatePath + "</yellow>\" does not exists...");
                                }
                                stats = fs_1.default.statSync(templatePath);
                                delete require.cache[require.resolve(templatePath)];
                            }
                            return [4 /*yield*/, __syncRequire ? Promise.resolve().then(function () { return __importStar(require(templatePath)); }) : new Promise(function (resolve_1, reject_1) { require([templatePath], resolve_1, reject_1); }).then(__importStar)];
                        case 1:
                            content = _a.sent();
                            templateObj = {
                                path: templatePath,
                                content: content,
                                stats: stats
                            };
                            return [2 /*return*/, templateObj];
                    }
                });
            });
        };
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
        SDocblockRenderer.prototype.render = function (settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            this._partialsTemplateObj = this.getPartialsTemplateObj();
            return new SPromise_1.default(function (_a) {
                var resolve = _a.resolve, reject = _a.reject;
                return __awaiter(_this, void 0, void 0, function () {
                    var blocksArray, firstBlock, type, template, templateObj, compiledTemplateFn, renderedTemplate;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                blocksArray = this._docblockInstance.toObject();
                                // reset all blocks rendered state
                                blocksArray.forEach(function (block) {
                                    block._rendered = false;
                                });
                                firstBlock = blocksArray[0];
                                type = typeof firstBlock.type === 'string'
                                    ? firstBlock.type.toLowerCase()
                                    : 'default';
                                template = this._settings.templates[type] || this._settings.templates.default;
                                return [4 /*yield*/, this.getTemplateObj(template)];
                            case 1:
                                templateObj = _b.sent();
                                if (!templateObj || !templateObj.content) {
                                    return [2 /*return*/, reject()];
                                }
                                compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                                    noEscape: true
                                });
                                return [4 /*yield*/, compiledTemplateFn()];
                            case 2:
                                renderedTemplate = _b.sent();
                                // resolve the rendering process with the rendered stack
                                resolve(renderedTemplate);
                                return [2 /*return*/];
                        }
                    });
                });
            }, {
                id: 'SDocblockRendererRender'
            });
        };
        return SDocblockRenderer;
    }(SClass_1.default));
    exports.default = SDocblockRenderer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jYmxvY2tSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFViw4REFBMEM7SUFDMUMscUVBQWlEO0lBQ2pELG9FQUFnRDtJQUNoRCwwREFBc0M7SUFDdEMsOERBQTBDO0lBQzFDLHVEQUFxQztJQUNyQyw0RUFBdUQ7SUFDdkQsK0VBQTJEO0lBRTNELDBDQUFzQjtJQWdFdEIsYUFBYTtJQUNiO1FBQWdDLHFDQUFRO1FBNEV0Qzs7Ozs7Ozs7O1dBU0c7UUFDSCwyQkFDRSxnQkFBNEIsRUFDNUIsUUFBeUM7WUFGM0M7WUFJRSxvQkFBb0I7WUFDcEIsa0JBQ0UsbUJBQVcsQ0FDVDtnQkFDRSxnQkFBZ0IsRUFBRTtvQkFDaEIsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUNGLFNBT0Y7WUF4RUQ7Ozs7Ozs7OztlQVNHO1lBQ0gsMEJBQW9CLEdBQTBDLEVBQUUsQ0FBQztZQUVqRTs7Ozs7Ozs7ZUFRRztZQUNILGlCQUFXLEdBQXVDO2dCQUNoRCxTQUFTLEVBQUUsRUFBRTtnQkFDYixNQUFNLEVBQUUsRUFBRTtnQkFDVixRQUFRLEVBQUUsRUFBRTthQUNiLENBQUM7WUFFRjs7Ozs7Ozs7O2VBU0c7WUFDSyxxQkFBZSxHQUFzQixFQUFFLENBQUM7WUE2QjlDLDZCQUE2QjtZQUM3QixLQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7WUFDMUMsOEJBQThCO1lBQzlCLEtBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBRW5DLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFB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