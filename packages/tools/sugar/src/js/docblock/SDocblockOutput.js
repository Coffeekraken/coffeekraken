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
        define(["require", "exports", "../error/SError", "../object/deepMerge", "../promise/SPromise", "handlebars", "../cache/SCache", "../is/node", "promised-handlebars", "../../node/path/packageRoot", "../../node/package/json", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    var SError_1 = __importDefault(require("../error/SError"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var handlebars_1 = __importDefault(require("handlebars"));
    var SCache_1 = __importDefault(require("../cache/SCache"));
    var node_1 = __importDefault(require("../is/node"));
    var promised_handlebars_1 = __importDefault(require("promised-handlebars"));
    var packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
    var json_1 = __importDefault(require("../../node/package/json"));
    var fs_1 = __importDefault(require("fs"));
    return /** @class */ (function () {
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
        function SDocblockOutput(docblockInstance, settings) {
            if (settings === void 0) { settings = {}; }
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
        SDocblockOutput.prototype._registerHandlerbarsHelpers = function () {
            var _this = this;
            this._handlebars = promised_handlebars_1.default(handlebars_1.default, {
                promise: Promise
            });
            this._handlebars.registerHelper('include', function (type) {
                return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var blocks, renderedBlocks, i, block, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this._docblockInstance.blocks ||
                                    !this._docblockInstance.blocks.length)
                                    return [2 /*return*/, ''];
                                blocks = this._docblockInstance.blocks.filter(function (block) {
                                    if (!block.toObject().type)
                                        return false;
                                    var rendered = block._rendered;
                                    block._rendered = true;
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
        SDocblockOutput.prototype.renderBlock = function (blockObj, settings) {
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
                            templateObj = {};
                            if (!node_1.default()) return [3 /*break*/, 5];
                            // get template object
                            templateObj = this.getTemplateObj(template);
                            cacheObj = {
                                partialsTemplateObj: this._partialsTemplateObj,
                                template: templateObj,
                                data: blockObj
                            };
                            return [4 /*yield*/, this._cache.get(cacheObj)];
                        case 1:
                            cachedValue = _a.sent();
                            if (!!cachedValue) return [3 /*break*/, 3];
                            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                                noEscape: true
                            });
                            return [4 /*yield*/, compiledTemplateFn(blockObj)];
                        case 2:
                            renderedTemplate = _a.sent();
                            // save in chache
                            this._cache.set(cacheObj, renderedTemplate);
                            // return the rendered template
                            return [2 /*return*/, renderedTemplate];
                        case 3: return [2 /*return*/, cachedValue];
                        case 4: return [3 /*break*/, 6];
                        case 5: 
                        // return rendered template
                        return [2 /*return*/, 'Support for javascript is not available yet...'];
                        case 6: return [2 /*return*/];
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
        SDocblockOutput.prototype.getPartialsTemplateObj = function () {
            var _this = this;
            var partialsTemplateObj = {};
            Object.keys(this._settings.partials).forEach(function (partialName) {
                var partialPath = _this._settings.partials[partialName];
                partialsTemplateObj[partialName] = _this.getTemplateObj(partialPath);
                // register partials
                _this._handlebars.unregisterPartial(partialName);
                _this._handlebars.registerPartial(partialName, partialsTemplateObj[partialName].content);
            });
            return partialsTemplateObj;
        };
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
        SDocblockOutput.prototype.getTemplateObj = function (template) {
            return __awaiter(this, void 0, void 0, function () {
                var templateObj, json, templatePath, stats, content;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            templateObj = {};
                            if (!node_1.default()) return [3 /*break*/, 2];
                            json = json_1.default();
                            templatePath = void 0;
                            if (fs_1.default.existsSync(template)) {
                                templatePath = template;
                            }
                            else if (fs_1.default.existsSync(packageRoot_1.default() + "/node_modules/" + template)) {
                                templatePath = packageRoot_1.default() + "/node_modules/" + template;
                            }
                            else {
                                throw new SError_1.default("Sorry but the passed template url \"<yellow>" + template + "</yellow>\" does not exists...");
                            }
                            stats = fs_1.default.statSync(templatePath);
                            delete require.cache[require.resolve(templatePath)];
                            return [4 /*yield*/, __syncRequire ? Promise.resolve().then(function () { return __importStar(require(templatePath)); }) : new Promise(function (resolve_1, reject_1) { require([templatePath], resolve_1, reject_1); }).then(__importStar)];
                        case 1:
                            content = _a.sent();
                            templateObj = {
                                path: templatePath,
                                content: content,
                                mtime: stats.mtime
                            };
                            _a.label = 2;
                        case 2: return [2 /*return*/, templateObj];
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
        SDocblockOutput.prototype.render = function (settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
            this._partialsTemplateObj = this.getPartialsTemplateObj();
            return new SPromise_1.default(function (resolve, reject, trigger, cancel) { return __awaiter(_this, void 0, void 0, function () {
                var blocksArray, firstBlock, type, template, templateObj, compiledTemplateFn, compiledTemplateFn, renderedTemplate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
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
                            templateObj = this.getTemplateObj(template);
                            compiledTemplateFn = this._handlebars.compile(templateObj.content, {
                                noEscape: true
                            });
                            return [4 /*yield*/, compiledTemplateFn()];
                        case 1:
                            renderedTemplate = _a.sent();
                            // resolve the rendering process with the rendered stack
                            resolve(renderedTemplate);
                            return [2 /*return*/];
                    }
                });
            }); }, {
                id: 'SDocblockOutputRender'
            });
        };
        return SDocblockOutput;
    }());
});
