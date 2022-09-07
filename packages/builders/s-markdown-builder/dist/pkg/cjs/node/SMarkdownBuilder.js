"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_data_file_generic_1 = __importDefault(require("@coffeekraken/s-data-file-generic"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_handlebars_1 = require("@coffeekraken/s-handlebars");
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const coffeekraken_1 = require("@coffeekraken/sugar/coffeekraken");
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const writeTmpFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeTmpFileSync"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const marked_1 = require("marked");
const path_1 = __importDefault(require("path"));
const SMarkdownBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SMarkdownBuilderBuildParamsInterface"));
class SMarkdownBuilder extends s_builder_1.default {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, deepMerge_1.default)(s_sugar_config_1.default.get('markdownBuilder'), settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
        // register layouts from config
        const config = s_sugar_config_1.default.get('markdownBuilder');
        if (config.transformers) {
            Object.keys(config.transformers).forEach((transformerName) => {
                const transformerPath = config.transformers[transformerName];
                // @ts-ignore
                this.constructor._registerTransformer(transformerName, transformerPath);
            });
        }
        if (config.helpers) {
            Object.keys(config.helpers).forEach((helperName) => {
                const helperPath = config.helpers[helperName];
                // @ts-ignore
                this.constructor.registerHelper(helperName, helperPath);
            });
        }
        if (config.layouts) {
            Object.keys(config.layouts).forEach((layoutName) => {
                const layoutObj = config.layouts[layoutName];
                // @ts-ignore
                this.constructor.registerLayout(layoutName, layoutObj);
            });
        }
        if (config.sections) {
            Object.keys(config.sections).forEach((sectionName) => {
                const sectionObj = config.sections[sectionName];
                // @ts-ignore
                this.constructor.registerSection(sectionName, sectionObj);
            });
        }
        if (config.partials) {
            Object.keys(config.partials).forEach((partialName) => {
                const partialObj = config.partials[partialName];
                // @ts-ignore
                this.constructor.registerPartial(partialName, partialObj);
            });
        }
    }
    /**
     * @name              _registerTransformer
     * @type                Function
     * @static
     * @private
     *
     * This static method allows you to register a new transformer
     *
     * @todo        Doc
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static _registerTransformer(name, transformerPath) {
        // @ts-ignore
        this._registeredTransformers[name] = transformerPath;
    }
    /**
     * @name              registerHelper
     * @type                Function
     * @static
     *
     * This static method allows you to register a new token function that returns an ISMarkdownBuilderToken object
     * used to transform your passed markdown
     *
     * @param           {String}         name           A name for your helper
     * @param           {String}                   helperPath                    The path to your helper file that MUST export a simple js function similar to [handlebars custom helper function](https://handlebarsjs.com/guide/#custom-helpers)
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerHelper(name, helperPath) {
        // @ts-ignore
        this._registeredHelpers[name] = helperPath;
    }
    /**
     * @name              registerLayout
     * @type                Function
     * @static
     *
     * This static method allows you to register a new token function that returns an ISMarkdownBuilderToken object
     * used to transform your passed markdown
     *
     * @param           {String}         name           A name for your layout
     * @param           { Record<'markdown' | 'html', string>}                   paths                    An object with your layout paths for "markdown" and/or "html"
     * @param           {Any}           data            An object with your layout data
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerLayout(name, paths, data) {
        // @ts-ignore
        this._registeredLayouts[name] = Object.assign(Object.assign({}, paths), { data });
    }
    /**
     * @name              registerPartial
     * @type                Function
     * @static
     *
     * This static method allows you to register a new token function that returns an ISMarkdownBuilderToken object
     * used to transform your passed markdown
     *
     * @param           {String}            name            The name of your partial
     * @param           {Record<'markdown'|'html',string>}      partial     The partial object with the targets properties like markdown and html that point to their proper handlebar syntax files
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerPartial(name, partial) {
        // @ts-ignore
        this._registeredPartials[name] = partial;
    }
    /**
     * @name              registerSection
     * @type                Function
     * @static
     *
     * This static method allows you to register a new section
     *
     * @param               {String}            name            The section name that will be used inside the templates
     * @param               {Record<'markdown'|'html', string>}     sectionObj          The section object with the targets properties like markdown and html that point to their proper handlebar syntax files
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerSection(name, section) {
        // @ts-ignore
        this._registeredSections[name] = Object.assign({}, section);
    }
    _load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loaded)
                return;
            this._loaded = true;
        });
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       dist/pkg/%moduleSystem/node/interface/SMarkdownBuilderBuildParamsInterface.js          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params) {
        if (params.preset && params.preset.length) {
            return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                    });
                    const newParams = ((0, deepMerge_1.default)(
                    // @ts-ignore
                    SMarkdownBuilderBuildParamsInterface_1.default.defaults(), s_sugar_config_1.default.get(`markdownBuilder.presets.${preset}`)));
                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = yield buildPromise;
                }
                resolve(buildedPresets);
            }), {
                metas: {
                    id: this.constructor.name,
                },
            });
        }
        else {
            return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                const handlebars = handlebars_1.default.create();
                // load
                yield this._load();
                // helpers
                (0, s_handlebars_1.registerHelpers)(handlebars);
                const finalParams = (0, deepMerge_1.default)(
                // @ts-ignore
                SMarkdownBuilderBuildParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {});
                const buildedFiles = [];
                if (finalParams.inRaw) {
                    finalParams.inPath = (0, writeTmpFileSync_1.default)(finalParams.inRaw);
                    // @ts-ignore
                    delete finalParams.inRaw;
                }
                if (finalParams.inPath) {
                    finalParams.inDir = (0, folderPath_1.default)(finalParams.inPath);
                    finalParams.glob = path_1.default.relative(finalParams.inDir, finalParams.inPath);
                    // @ts-ignore
                    delete finalParams.inPath;
                }
                // register helpers and layouts in handlebars
                // @ts-ignore
                Object.keys(
                // @ts-ignore
                (_a = this.constructor._registeredLayouts) !== null && _a !== void 0 ? _a : []).forEach((layoutName) => {
                    var _a;
                    // @ts-ignore
                    if (
                    // @ts-ignore
                    !((_a = this.constructor._registeredLayouts[layoutName]) === null || _a === void 0 ? void 0 : _a[finalParams.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const layoutStr = fs_1.default
                        // @ts-ignore
                        .readFileSync(
                    // @ts-ignore
                    this.constructor._registeredLayouts[layoutName][finalParams.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(`layout-${layoutName}`, layoutStr);
                });
                // @ts-ignore
                Object.keys(
                // @ts-ignore
                (_b = this.constructor._registeredSections) !== null && _b !== void 0 ? _b : []).forEach((sectionName) => {
                    var _a;
                    // @ts-ignore
                    if (
                    // @ts-ignore
                    !((_a = this.constructor._registeredSections[sectionName]) === null || _a === void 0 ? void 0 : _a[finalParams.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const sectionStr = fs_1.default
                        // @ts-ignore
                        .readFileSync(
                    // @ts-ignore
                    this.constructor._registeredSections[sectionName][finalParams.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(`section-${sectionName}`, sectionStr);
                });
                // @ts-ignore
                Object.keys(
                // @ts-ignore
                (_c = this.constructor._registeredPartials) !== null && _c !== void 0 ? _c : []).forEach((partialName) => {
                    var _a;
                    // @ts-ignore
                    if (
                    // @ts-ignore
                    !((_a = this.constructor._registeredPartials[partialName]) === null || _a === void 0 ? void 0 : _a[finalParams.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const partialStr = fs_1.default
                        // @ts-ignore
                        .readFileSync(
                    // @ts-ignore
                    this.constructor._registeredPartials[partialName][finalParams.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(partialName, partialStr);
                });
                // @ts-ignore
                for (let i = 0; i <
                    // @ts-ignore
                    Object.keys((_d = this.constructor._registeredHelpers) !== null && _d !== void 0 ? _d : [])
                        .length; i++) {
                    // @ts-ignore
                    const helperName = Object.keys(
                    // @ts-ignore
                    (_e = this.constructor._registeredHelpers) !== null && _e !== void 0 ? _e : [])[i];
                    // @ts-ignore
                    const helperFn = // @ts-ignore
                     (yield Promise.resolve().then(() => __importStar(require(
                    // @ts-ignore
                    this.constructor._registeredHelpers[helperName])))).default;
                    handlebars.registerHelper(helperName, helperFn);
                }
                // save with no output
                if (finalParams.save &&
                    !finalParams.outPath &&
                    !finalParams.outDir) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>save</yellow>" MUST be used alongside the params "<yellow>outPath</yellow>" or "<yellow>outDir</yellow>"`);
                }
                // inDir with no glob
                if (finalParams.inDir && !finalParams.glob) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>inDir</yellow>" MUST be used alongside the param "<yellow>glob</yellow>"`);
                }
                // either no outDir with inDir or inverse...
                if (finalParams.save &&
                    ((finalParams.outDir && !finalParams.inDir) ||
                        (!finalParams.outDir && finalParams.inDir))) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>outDir</yellow>" MUST be used alongside the params "<yellow>inDir</yellow>" and "<yellow>glob</yellow>"`);
                }
                let path = `${finalParams.inDir}/${finalParams.glob}`;
                const sourceObj = {
                    inputStr: '',
                    outputStr: '',
                    files: [],
                    inDir: finalParams.inDir,
                    outDir: finalParams.outDir,
                    outPath: finalParams.outPath,
                };
                if (fs_1.default.existsSync(path)) {
                    sourceObj.inputStr = path_1.default.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                }
                else if (s_glob_1.default.isGlob(path)) {
                    sourceObj.inputStr = path_1.default.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = s_glob_1.default.resolve(path, {
                        SFile: false,
                    });
                }
                else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outPath) {
                    sourceObj.outputStr =
                        path_1.default.relative(process.cwd(), sourceObj.outPath) ||
                            '.';
                }
                else if (sourceObj.outDir) {
                    sourceObj.outputStr =
                        path_1.default.relative(process.cwd(), sourceObj.outDir) ||
                            '.';
                }
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting markdown Build`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`,
                });
                if (sourceObj.outputStr) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`,
                    });
                }
                const docmap = yield new s_docmap_1.default().read();
                // take some datas like packagejson, etc...
                const viewData = (0, deepMerge_1.default)({
                    config: s_sugar_config_1.default.get('.'),
                    flatConfig: (0, flatten_1.default)(s_sugar_config_1.default.get('.')),
                    settings: this.settings,
                    params,
                    packageJson: (0, jsonSync_1.default)(),
                    docMenu: docmap.menu,
                    docmap,
                    ck: (0, coffeekraken_1.__getCoffeekrakenMetas)(),
                    time: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDay(),
                    },
                }, (_f = finalParams.data) !== null && _f !== void 0 ? _f : {});
                if (!sourceObj.files.length) {
                    return reject();
                }
                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = sourceObj.files[j];
                    const buildObj = {
                        data: '',
                        output: '',
                    };
                    const dataHandlerData = yield s_data_file_generic_1.default.load(filePath);
                    const finalViewData = (0, deepMerge_1.default)(Object.assign({}, viewData), dataHandlerData);
                    if ((0, extension_1.default)(filePath) === 'js') {
                        // @ts-ignore
                        const fn = (yield Promise.resolve().then(() => __importStar(require(filePath)))).default;
                        buildObj.data = fn(finalViewData);
                    }
                    else {
                        buildObj.data = fs_1.default
                            .readFileSync(filePath, 'utf8')
                            .toString();
                    }
                    if (sourceObj.outPath) {
                        buildObj.output = sourceObj.outPath;
                    }
                    else if (sourceObj.inDir && sourceObj.outDir) {
                        buildObj.output = `${sourceObj.outDir}/${path_1.default.relative(sourceObj.inDir, filePath)}`;
                    }
                    let currentTransformedString = buildObj.data;
                    // compile template
                    const tplFn = handlebars.compile(currentTransformedString);
                    currentTransformedString = tplFn(finalViewData);
                    // processing transformers
                    // @ts-ignore
                    for (let [transformerId, transformerObj,] of Object.entries(this.constructor._registeredTransformers)) {
                        // @ts-ignore
                        if (!transformerObj[finalParams.target])
                            return;
                        const matches = [
                            ...currentTransformedString.matchAll(transformerObj.match),
                        ];
                        if (!matches.length)
                            continue;
                        const transformerStr = fs_1.default
                            .readFileSync(transformerObj[finalParams.target], 'utf8')
                            .toString();
                        const tplFn = handlebars.compile(transformerStr);
                        for (let i = 0; i < matches.length; i++) {
                            const match = matches[i];
                            let preprocessedData = match;
                            // @ts-ignore
                            if (transformerObj.preprocessor) {
                                const preprocessorFn = yield Promise.resolve().then(() => __importStar(require(transformerObj.preprocessor)));
                                preprocessedData =
                                    yield preprocessorFn.default(match);
                            }
                            const result = tplFn({
                                data: preprocessedData,
                            });
                            currentTransformedString =
                                currentTransformedString.replace(match[0], result);
                        }
                    }
                    // protected tags like "template"
                    let protectedTagsMatches = [];
                    finalParams.protectedTags.forEach((tag) => {
                        const tagReg = new RegExp(`<${tag}[^>]*>[\\w\\W\\n]+?(?=<\\/${tag}>)<\\/${tag}>`, 'gm');
                        const tagMatches = currentTransformedString.match(tagReg);
                        if (tagMatches) {
                            protectedTagsMatches = [
                                ...protectedTagsMatches,
                                ...tagMatches,
                            ];
                        }
                    });
                    protectedTagsMatches === null || protectedTagsMatches === void 0 ? void 0 : protectedTagsMatches.forEach((match, i) => {
                        currentTransformedString =
                            currentTransformedString.replace(match, `{match:${i}}`);
                    });
                    // marked if html is the target
                    if (finalParams.target === 'html') {
                        currentTransformedString = (0, marked_1.marked)(currentTransformedString, {});
                    }
                    // puth protected tags back
                    protectedTagsMatches === null || protectedTagsMatches === void 0 ? void 0 : protectedTagsMatches.forEach((match, i) => {
                        currentTransformedString =
                            currentTransformedString.replace(`{match:${i}}`, match);
                    });
                    if (finalParams.save) {
                        (0, writeFileSync_1.default)(buildObj.output, currentTransformedString);
                        const file = new s_file_1.default(buildObj.output);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    const res = {
                        inputFile: s_file_1.default.new(filePath),
                        outputFile: finalParams.save
                            ? s_file_1.default.new(buildObj.output)
                            : undefined,
                        code: currentTransformedString,
                    };
                    buildedFiles.push(res);
                }
                resolve(buildedFiles);
            }), {
                metas: {
                    id: this.constructor.name,
                },
            });
        }
    }
}
exports.default = SMarkdownBuilder;
SMarkdownBuilder._registeredHelpers = {};
SMarkdownBuilder._registeredLayouts = {};
SMarkdownBuilder._registeredPartials = {};
SMarkdownBuilder._registeredSections = {};
SMarkdownBuilder._registeredTransformers = {};
/**
 * @name            _marked
 * @type            Object
 * @static
 * @private
 *
 * Access the marked object through this property
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SMarkdownBuilder._marked = marked_1.marked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsNEZBQW1FO0FBQ25FLHNFQUErQztBQUMvQyxrRUFBMkM7QUFDM0Msa0VBQTJDO0FBQzNDLDZEQUE2RDtBQUM3RCxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxtRUFBMEU7QUFDMUUsc0ZBQWdFO0FBQ2hFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsb0dBQThFO0FBQzlFLHlGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUsd0ZBQWtFO0FBQ2xFLDRDQUFzQjtBQUN0Qiw0REFBc0M7QUFDdEMsbUNBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQiw0SEFBc0c7QUFzRXRHLE1BQXFCLGdCQUFpQixTQUFRLG1CQUFVO0lBaUlwRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNkM7UUFDckQsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUNyRSxDQUFDO1FBNENOLFlBQU8sR0FBRyxLQUFLLENBQUM7UUExQ1osK0JBQStCO1FBQy9CLE1BQU0sTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckQsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUN6RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUM3RCxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQ2pDLGVBQWUsRUFDZixlQUFlLENBQ2xCLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMvQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO2dCQUMvQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM3QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNqRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNqRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQWhMRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBWSxFQUFFLGVBQXVCO1FBQzdELGFBQWE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFZLEVBQUUsVUFBa0I7UUFDbEQsYUFBYTtRQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsSUFBWSxFQUNaLEtBQTBDLEVBQzFDLElBQVM7UUFFVCxhQUFhO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQ0FDdEIsS0FBSyxLQUNSLElBQUksR0FDUCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFZLEVBQ1osT0FBNEM7UUFFNUMsYUFBYTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQVksRUFDWixPQUE0QztRQUU1QyxhQUFhO1FBQ2IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxxQkFDdkIsT0FBTyxDQUNiLENBQUM7SUFDTixDQUFDO0lBd0VLLEtBQUs7O1lBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQ3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNGLE1BQW9DO1FBRXBDLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFFMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUMzQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVoQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLHdDQUF3QyxNQUFNLGtDQUFrQztxQkFDMUYsQ0FBQyxDQUFDO29CQUVILE1BQU0sU0FBUyxHQUFpQyxDQUM1QyxJQUFBLG1CQUFXO29CQUNQLGFBQWE7b0JBQ2IsOENBQXNDLENBQUMsUUFBUSxFQUFFLEVBQ2pELHdCQUFjLENBQUMsR0FBRyxDQUNkLDJCQUEyQixNQUFNLEVBQUUsQ0FDdEMsQ0FDSixDQUNKLENBQUM7b0JBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuQixjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxZQUFZLENBQUM7aUJBQy9DO2dCQUVELE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUEsRUFDRDtnQkFDSSxLQUFLLEVBQUU7b0JBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtpQkFDNUI7YUFDSixDQUNKLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O2dCQUNoQyxNQUFNLFVBQVUsR0FBRyxvQkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUV6QyxPQUFPO2dCQUNQLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVuQixVQUFVO2dCQUNWLElBQUEsOEJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztnQkFFNUIsTUFBTSxXQUFXLEdBQ2IsSUFBQSxtQkFBVztnQkFDUCxhQUFhO2dCQUNiLDhDQUFzQyxDQUFDLFFBQVEsRUFBRSxFQUNqRCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztnQkFFTixNQUFNLFlBQVksR0FBOEIsRUFBRSxDQUFDO2dCQUVuRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBQSwwQkFBa0IsRUFDbkMsV0FBVyxDQUFDLEtBQUssQ0FDcEIsQ0FBQztvQkFDRixhQUFhO29CQUNiLE9BQU8sV0FBVyxDQUFDLEtBQUssQ0FBQztpQkFDNUI7Z0JBRUQsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO29CQUNwQixXQUFXLENBQUMsS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3JELFdBQVcsQ0FBQyxJQUFJLEdBQUcsY0FBTSxDQUFDLFFBQVEsQ0FDOUIsV0FBVyxDQUFDLEtBQUssRUFDakIsV0FBVyxDQUFDLE1BQU0sQ0FDckIsQ0FBQztvQkFDRixhQUFhO29CQUNiLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQztpQkFDN0I7Z0JBRUQsNkNBQTZDO2dCQUM3QyxhQUFhO2dCQUNiLE1BQU0sQ0FBQyxJQUFJO2dCQUNQLGFBQWE7Z0JBQ2IsTUFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixtQ0FBSSxFQUFFLENBQzVDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7O29CQUNyQixhQUFhO29CQUNiO29CQUNJLGFBQWE7b0JBQ2IsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsMENBQzVDLFdBQVcsQ0FBQyxNQUFNLENBQ3JCLENBQUEsRUFDSDt3QkFDRSxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG1EQUFtRCxVQUFVLHFDQUFxQyxXQUFXLENBQUMsTUFBTSwyQkFBMkIsQ0FDaEwsQ0FBQztxQkFDTDtvQkFDRCxhQUFhO29CQUNiLE1BQU0sU0FBUyxHQUFHLFlBQUk7d0JBQ2xCLGFBQWE7eUJBQ1osWUFBWTtvQkFDVCxhQUFhO29CQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQzNDLFdBQVcsQ0FBQyxNQUFNLENBQ3JCLEVBQ0QsTUFBTSxDQUNUO3lCQUNBLFFBQVEsRUFBRSxDQUFDO29CQUNoQixVQUFVLENBQUMsZUFBZSxDQUN0QixVQUFVLFVBQVUsRUFBRSxFQUN0QixTQUFTLENBQ1osQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDSCxhQUFhO2dCQUNiLE1BQU0sQ0FBQyxJQUFJO2dCQUNQLGFBQWE7Z0JBQ2IsTUFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixtQ0FBSSxFQUFFLENBQzdDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O29CQUN0QixhQUFhO29CQUNiO29CQUNJLGFBQWE7b0JBQ2IsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDakMsV0FBVyxDQUNkLDBDQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQSxFQUN6Qjt3QkFDRSxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9EQUFvRCxXQUFXLHFDQUFxQyxXQUFXLENBQUMsTUFBTSwyQkFBMkIsQ0FDbEwsQ0FBQztxQkFDTDtvQkFDRCxhQUFhO29CQUNiLE1BQU0sVUFBVSxHQUFHLFlBQUk7d0JBQ25CLGFBQWE7eUJBQ1osWUFBWTtvQkFDVCxhQUFhO29CQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQ2hDLFdBQVcsQ0FDZCxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFDckIsTUFBTSxDQUNUO3lCQUNBLFFBQVEsRUFBRSxDQUFDO29CQUNoQixVQUFVLENBQUMsZUFBZSxDQUN0QixXQUFXLFdBQVcsRUFBRSxFQUN4QixVQUFVLENBQ2IsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDSCxhQUFhO2dCQUNiLE1BQU0sQ0FBQyxJQUFJO2dCQUNQLGFBQWE7Z0JBQ2IsTUFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixtQ0FBSSxFQUFFLENBQzdDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O29CQUN0QixhQUFhO29CQUNiO29CQUNJLGFBQWE7b0JBQ2IsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FDakMsV0FBVyxDQUNkLDBDQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQSxFQUN6Qjt3QkFDRSxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9EQUFvRCxXQUFXLHFDQUFxQyxXQUFXLENBQUMsTUFBTSwyQkFBMkIsQ0FDbEwsQ0FBQztxQkFDTDtvQkFDRCxhQUFhO29CQUNiLE1BQU0sVUFBVSxHQUFHLFlBQUk7d0JBQ25CLGFBQWE7eUJBQ1osWUFBWTtvQkFDVCxhQUFhO29CQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQ2hDLFdBQVcsQ0FDZCxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFDckIsTUFBTSxDQUNUO3lCQUNBLFFBQVEsRUFBRSxDQUFDO29CQUNoQixVQUFVLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsYUFBYTtnQkFDYixLQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDO29CQUNELGFBQWE7b0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLG1DQUFJLEVBQUUsQ0FBQzt5QkFDakQsTUFBTSxFQUNYLENBQUMsRUFBRSxFQUNMO29CQUNFLGFBQWE7b0JBQ2IsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUk7b0JBQzFCLGFBQWE7b0JBQ2IsTUFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixtQ0FBSSxFQUFFLENBQzVDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsYUFBYTtvQkFDYixNQUFNLFFBQVEsR0FBRyxhQUFhO3FCQUMxQixDQUNJO29CQUNJLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDL0IsVUFBVSxDQUNiLEdBQ0osQ0FDSixDQUFDLE9BQU8sQ0FBQztvQkFDZCxVQUFVLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDbkQ7Z0JBRUQsc0JBQXNCO2dCQUN0QixJQUNJLFdBQVcsQ0FBQyxJQUFJO29CQUNoQixDQUFDLFdBQVcsQ0FBQyxPQUFPO29CQUNwQixDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQ3JCO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUkscUlBQXFJLENBQ3RLLENBQUM7aUJBQ0w7Z0JBRUQscUJBQXFCO2dCQUNyQixJQUFJLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUN4QyxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHFHQUFxRyxDQUN0SSxDQUFDO2lCQUNMO2dCQUVELDRDQUE0QztnQkFDNUMsSUFDSSxXQUFXLENBQUMsSUFBSTtvQkFDaEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO3dCQUN2QyxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDakQ7b0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxvSUFBb0ksQ0FDckssQ0FBQztpQkFDTDtnQkFFRCxJQUFJLElBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0RCxNQUFNLFNBQVMsR0FBRztvQkFDZCxRQUFRLEVBQUUsRUFBRTtvQkFDWixTQUFTLEVBQUUsRUFBRTtvQkFDYixLQUFLLEVBQUUsRUFBRTtvQkFDVCxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUs7b0JBQ3hCLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtvQkFDMUIsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPO2lCQUMvQixDQUFDO2dCQUNGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFFBQVEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUNoQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxDQUNQLENBQUM7b0JBQ0YsYUFBYTtvQkFDYixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUI7cUJBQU0sSUFBSSxnQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDN0IsU0FBUyxDQUFDLFFBQVEsR0FBRyxjQUFNLENBQUMsUUFBUSxDQUNoQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsSUFBSSxDQUNQLENBQUM7b0JBQ0YsYUFBYTtvQkFDYixTQUFTLENBQUMsS0FBSyxHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTt3QkFDcEMsS0FBSyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNILE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksa0RBQWtELElBQUksMkRBQTJELENBQ2xKLENBQUM7aUJBQ0w7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFO29CQUNuQixTQUFTLENBQUMsU0FBUzt3QkFDZixjQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDOzRCQUNqRCxHQUFHLENBQUM7aUJBQ1g7cUJBQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO29CQUN6QixTQUFTLENBQUMsU0FBUzt3QkFDZixjQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDOzRCQUNoRCxHQUFHLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSxrREFBa0Q7aUJBQzVELENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLDBDQUEwQyxTQUFTLENBQUMsUUFBUSxTQUFTO2lCQUMvRSxDQUFDLENBQUM7Z0JBRUgsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO29CQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLDBDQUEwQyxTQUFTLENBQUMsU0FBUyxTQUFTO3FCQUNoRixDQUFDLENBQUM7aUJBQ047Z0JBRUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLGtCQUFTLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFNUMsMkNBQTJDO2dCQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ3hCO29CQUNJLE1BQU0sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7b0JBQy9CLFVBQVUsRUFBRSxJQUFBLGlCQUFTLEVBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtvQkFDdkIsTUFBTTtvQkFDTixXQUFXLEVBQUUsSUFBQSxrQkFBYSxHQUFFO29CQUM1QixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUk7b0JBQ3BCLE1BQU07b0JBQ04sRUFBRSxFQUFFLElBQUEscUNBQXNCLEdBQUU7b0JBQzVCLElBQUksRUFBRTt3QkFDRixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUU7d0JBQzlCLEtBQUssRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTt3QkFDNUIsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFO3FCQUMzQjtpQkFDSixFQUNELE1BQUEsV0FBVyxDQUFDLElBQUksbUNBQUksRUFBRSxDQUN6QixDQUFDO2dCQUVGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtvQkFDekIsT0FBTyxNQUFNLEVBQUUsQ0FBQztpQkFDbkI7Z0JBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM3QyxNQUFNLFFBQVEsR0FBVyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU1QyxNQUFNLFFBQVEsR0FBRzt3QkFDYixJQUFJLEVBQUUsRUFBRTt3QkFDUixNQUFNLEVBQUUsRUFBRTtxQkFDYixDQUFDO29CQUVGLE1BQU0sZUFBZSxHQUFHLE1BQU0sNkJBQWtCLENBQUMsSUFBSSxDQUNqRCxRQUFRLENBQ1gsQ0FBQztvQkFFRixNQUFNLGFBQWEsR0FBRyxJQUFBLG1CQUFXLEVBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixlQUFlLENBQ2xCLENBQUM7b0JBRUYsSUFBSSxJQUFBLG1CQUFXLEVBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO3dCQUNoQyxhQUFhO3dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsd0RBQWEsUUFBUSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQzVDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3FCQUNyQzt5QkFBTTt3QkFDSCxRQUFRLENBQUMsSUFBSSxHQUFHLFlBQUk7NkJBQ2YsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7NkJBQzlCLFFBQVEsRUFBRSxDQUFDO3FCQUNuQjtvQkFFRCxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7d0JBQ25CLFFBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztxQkFDdkM7eUJBQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7d0JBQzVDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FDZCxTQUFTLENBQUMsTUFDZCxJQUFJLGNBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDO3FCQUNwRDtvQkFFRCxJQUFJLHdCQUF3QixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBRTdDLG1CQUFtQjtvQkFDbkIsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FDNUIsd0JBQXdCLENBQzNCLENBQUM7b0JBRUYsd0JBQXdCLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUVoRCwwQkFBMEI7b0JBQzFCLGFBQWE7b0JBQ2IsS0FBSyxJQUFJLENBQ0wsYUFBYSxFQUNiLGNBQWMsRUFDakIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsdUJBQXVCLENBQzNDLEVBQUU7d0JBQ0MsYUFBYTt3QkFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7NEJBQUUsT0FBTzt3QkFFaEQsTUFBTSxPQUFPLEdBQUc7NEJBQ1osR0FBRyx3QkFBd0IsQ0FBQyxRQUFRLENBQ2hDLGNBQWMsQ0FBQyxLQUFLLENBQ3ZCO3lCQUNKLENBQUM7d0JBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzRCQUFFLFNBQVM7d0JBRTlCLE1BQU0sY0FBYyxHQUFHLFlBQUk7NkJBQ3RCLFlBQVksQ0FDVCxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUNsQyxNQUFNLENBQ1Q7NkJBQ0EsUUFBUSxFQUFFLENBQUM7d0JBRWhCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBRWpELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNyQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pCLElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDOzRCQUM3QixhQUFhOzRCQUNiLElBQUksY0FBYyxDQUFDLFlBQVksRUFBRTtnQ0FDN0IsTUFBTSxjQUFjLEdBQUcsd0RBQ25CLGNBQWMsQ0FBQyxZQUFZLEdBQzlCLENBQUM7Z0NBQ0YsZ0JBQWdCO29DQUNaLE1BQU0sY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDM0M7NEJBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDO2dDQUNqQixJQUFJLEVBQUUsZ0JBQWdCOzZCQUN6QixDQUFDLENBQUM7NEJBQ0gsd0JBQXdCO2dDQUNwQix3QkFBd0IsQ0FBQyxPQUFPLENBQzVCLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFDUixNQUFNLENBQ1QsQ0FBQzt5QkFDVDtxQkFDSjtvQkFFRCxpQ0FBaUM7b0JBQ2pDLElBQUksb0JBQW9CLEdBQWEsRUFBRSxDQUFDO29CQUN4QyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO3dCQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FDckIsSUFBSSxHQUFHLDZCQUE2QixHQUFHLFNBQVMsR0FBRyxHQUFHLEVBQ3RELElBQUksQ0FDUCxDQUFDO3dCQUNGLE1BQU0sVUFBVSxHQUNaLHdCQUF3QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDM0MsSUFBSSxVQUFVLEVBQUU7NEJBQ1osb0JBQW9CLEdBQUc7Z0NBQ25CLEdBQUcsb0JBQW9CO2dDQUN2QixHQUFHLFVBQVU7NkJBQ2hCLENBQUM7eUJBQ0w7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsb0JBQW9CLGFBQXBCLG9CQUFvQix1QkFBcEIsb0JBQW9CLENBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN2Qyx3QkFBd0I7NEJBQ3BCLHdCQUF3QixDQUFDLE9BQU8sQ0FDNUIsS0FBSyxFQUNMLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLENBQUM7b0JBQ1YsQ0FBQyxDQUFDLENBQUM7b0JBRUgsK0JBQStCO29CQUMvQixJQUFJLFdBQVcsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFO3dCQUMvQix3QkFBd0IsR0FBRyxJQUFBLGVBQVEsRUFDL0Isd0JBQXdCLEVBQ3hCLEVBQUUsQ0FDTCxDQUFDO3FCQUNMO29CQUVELDJCQUEyQjtvQkFDM0Isb0JBQW9CLGFBQXBCLG9CQUFvQix1QkFBcEIsb0JBQW9CLENBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN2Qyx3QkFBd0I7NEJBQ3BCLHdCQUF3QixDQUFDLE9BQU8sQ0FDNUIsVUFBVSxDQUFDLEdBQUcsRUFDZCxLQUFLLENBQ1IsQ0FBQztvQkFDVixDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7d0JBQ2xCLElBQUEsdUJBQWUsRUFDWCxRQUFRLENBQUMsTUFBTSxFQUNmLHdCQUF3QixDQUMzQixDQUFDO3dCQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1IsS0FBSyxFQUFFLHVDQUF1QyxJQUFJLENBQUMsT0FBTyxzQkFBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLCtDQUErQzt5QkFDbkosQ0FBQyxDQUFDO3FCQUNOO29CQUVELE1BQU0sR0FBRyxHQUE0Qjt3QkFDakMsU0FBUyxFQUFFLGdCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzt3QkFDaEMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJOzRCQUN4QixDQUFDLENBQUMsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQzs0QkFDOUIsQ0FBQyxDQUFDLFNBQVM7d0JBQ2YsSUFBSSxFQUFFLHdCQUF3QjtxQkFDakMsQ0FBQztvQkFFRixZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxQjtnQkFFRCxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFBLEVBQ0Q7Z0JBQ0ksS0FBSyxFQUFFO29CQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7aUJBQzVCO2FBQ0osQ0FDSixDQUFDO1NBQ0w7SUFDTCxDQUFDOztBQTNxQkwsbUNBNHFCQztBQTNxQlUsbUNBQWtCLEdBQVEsRUFBRSxDQUFDO0FBQzdCLG1DQUFrQixHQUFRLEVBQUUsQ0FBQztBQUM3QixvQ0FBbUIsR0FBUSxFQUFFLENBQUM7QUFDOUIsb0NBQW1CLEdBQVEsRUFBRSxDQUFDO0FBQzlCLHdDQUF1QixHQUFRLEVBQUUsQ0FBQztBQStHekM7Ozs7Ozs7Ozs7R0FVRztBQUNJLHdCQUFPLEdBQUcsZUFBUSxDQUFDIn0=