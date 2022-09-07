var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SDocmap from '@coffeekraken/s-docmap';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import { registerHelpers } from '@coffeekraken/s-handlebars';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __getCoffeekrakenMetas } from '@coffeekraken/sugar/coffeekraken';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __writeTmpFileSync from '@coffeekraken/sugar/node/fs/writeTmpFileSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __fs from 'fs';
import __handlebars from 'handlebars';
import { marked as __marked } from 'marked';
import __path from 'path';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
export default class SMarkdownBuilder extends __SBuilder {
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
        super(__deepMerge(__SSugarConfig.get('markdownBuilder'), settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
        // register layouts from config
        const config = __SSugarConfig.get('markdownBuilder');
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
            return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                    });
                    const newParams = (__deepMerge(
                    // @ts-ignore
                    __SMarkdownBuilderBuildParamsInterface.defaults(), __SSugarConfig.get(`markdownBuilder.presets.${preset}`)));
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
            return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                const handlebars = __handlebars.create();
                // load
                yield this._load();
                // helpers
                registerHelpers(handlebars);
                const finalParams = __deepMerge(
                // @ts-ignore
                __SMarkdownBuilderBuildParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
                const buildedFiles = [];
                if (finalParams.inRaw) {
                    finalParams.inPath = __writeTmpFileSync(finalParams.inRaw);
                    // @ts-ignore
                    delete finalParams.inRaw;
                }
                if (finalParams.inPath) {
                    finalParams.inDir = __folderPath(finalParams.inPath);
                    finalParams.glob = __path.relative(finalParams.inDir, finalParams.inPath);
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
                    const layoutStr = __fs
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
                    const sectionStr = __fs
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
                    const partialStr = __fs
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
                     (yield import(
                    // @ts-ignore
                    this.constructor._registeredHelpers[helperName])).default;
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
                if (__fs.existsSync(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                }
                else if (__SGlob.isGlob(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolve(path, {
                        SFile: false,
                    });
                }
                else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outPath) {
                    sourceObj.outputStr =
                        __path.relative(process.cwd(), sourceObj.outPath) ||
                            '.';
                }
                else if (sourceObj.outDir) {
                    sourceObj.outputStr =
                        __path.relative(process.cwd(), sourceObj.outDir) ||
                            '.';
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting markdown Build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`,
                });
                if (sourceObj.outputStr) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`,
                    });
                }
                const docmap = yield new __SDocmap().read();
                // take some datas like packagejson, etc...
                const viewData = __deepMerge({
                    config: __SSugarConfig.get('.'),
                    flatConfig: __flatten(__SSugarConfig.get('.')),
                    settings: this.settings,
                    params,
                    packageJson: __packageJson(),
                    docMenu: docmap.menu,
                    docmap,
                    ck: __getCoffeekrakenMetas(),
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
                    const dataHandlerData = yield __SDataFileGeneric.load(filePath);
                    const finalViewData = __deepMerge(Object.assign({}, viewData), dataHandlerData);
                    if (__extension(filePath) === 'js') {
                        // @ts-ignore
                        const fn = (yield import(filePath)).default;
                        buildObj.data = fn(finalViewData);
                    }
                    else {
                        buildObj.data = __fs
                            .readFileSync(filePath, 'utf8')
                            .toString();
                    }
                    if (sourceObj.outPath) {
                        buildObj.output = sourceObj.outPath;
                    }
                    else if (sourceObj.inDir && sourceObj.outDir) {
                        buildObj.output = `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`;
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
                        const transformerStr = __fs
                            .readFileSync(transformerObj[finalParams.target], 'utf8')
                            .toString();
                        const tplFn = handlebars.compile(transformerStr);
                        for (let i = 0; i < matches.length; i++) {
                            const match = matches[i];
                            let preprocessedData = match;
                            // @ts-ignore
                            if (transformerObj.preprocessor) {
                                const preprocessorFn = yield import(transformerObj.preprocessor);
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
                        currentTransformedString = __marked(currentTransformedString, {});
                    }
                    // puth protected tags back
                    protectedTagsMatches === null || protectedTagsMatches === void 0 ? void 0 : protectedTagsMatches.forEach((match, i) => {
                        currentTransformedString =
                            currentTransformedString.replace(`{match:${i}}`, match);
                    });
                    if (finalParams.save) {
                        __writeFileSync(buildObj.output, currentTransformedString);
                        const file = new __SFile(buildObj.output);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    const res = {
                        inputFile: __SFile.new(filePath),
                        outputFile: finalParams.save
                            ? __SFile.new(buildObj.output)
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
SMarkdownBuilder._marked = __marked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sa0JBQWtCLE1BQU0sbUNBQW1DLENBQUM7QUFDbkUsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sa0JBQWtCLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQXNFdEcsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFB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