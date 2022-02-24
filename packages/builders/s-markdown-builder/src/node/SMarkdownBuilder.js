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
import __SDocmap from '@coffeekraken/s-docmap';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __writeTmpFileSync from '@coffeekraken/sugar/node/fs/writeTmpFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __fs from 'fs';
import __handlebars from 'handlebars';
import { registerHelpers } from '@coffeekraken/s-handlebars';
import __marked from 'marked';
import __path from 'path';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __SLog from '@coffeekraken/s-log';
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
        super(__deepMerge({
            markdownBuilder: Object.assign({}, __SSugarConfig.get('markdownBuilder')),
        }, settings !== null && settings !== void 0 ? settings : {}));
        // register layouts from config
        const config = __SSugarConfig.get('markdownBuilder');
        if (config.transformers) {
            Object.keys(config.transformers).forEach((transformerName) => {
                const transformerPath = config.transformers[transformerName];
                // @ts-ignore
                this.constructor.registerTransformer(transformerName, transformerPath);
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
     * @name              registerTransformer
     * @type                Function
     * @static
     *
     * This static method allows you to register a new transformer
     *
     * @param           {Function<ISMarkdownBuilderToken>>}         token           A token function that returns an ISMarkdownBuilderToken object
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerTransformer(name, transformerPath) {
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
     * @param           {Function<ISMarkdownBuilderToken>>}         token           A token function that returns an ISMarkdownBuilderToken object
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
     * @param           {Function<ISMarkdownBuilderToken>>}         token           A token function that returns an ISMarkdownBuilderToken object
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerLayout(name, layout) {
        // @ts-ignore
        this._registeredLayouts[name] = Object.assign({}, layout);
    }
    /**
     * @name              registerPartial
     * @type                Function
     * @static
     *
     * This static method allows you to register a new token function that returns an ISMarkdownBuilderToken object
     * used to transform your passed markdown
     *
     * @param           {String}            name            The name of your partial
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
     * @param               {String}            name            The section name that will be used inside the templates
     * @param               {Record<'markdown'|'html', string>}     sectionObj          The section object with the targets properties like markdown and html that point to their proper handlebar syntax files
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerSection(name, section) {
        // @ts-ignore
        this._registeredSections[name] = Object.assign({}, section);
    }
    /**
     * @name            markdownBuilderSettings
     * @type            ISMarkdownBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get markdownBuilderSettings() {
        return this._settings.markdownBuilder;
    }
    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISMarkdownBuilderBuildParams>}          [params={}]         Some params for your build
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
                    const newParams = (__deepMerge(__SMarkdownBuilderBuildParamsInterface.defaults(), __SSugarConfig.get(`markdownBuilder.presets.${preset}`)));
                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = yield buildPromise;
                }
                resolve(buildedPresets);
            }));
        }
        else {
            return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e;
                const handlebars = __handlebars.create();
                // helpers
                registerHelpers(handlebars);
                const finalParams = __deepMerge(__SMarkdownBuilderBuildParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
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
                    const helperFn = (yield import(
                    // @ts-ignore
                    this.constructor._registeredHelpers[helperName])).default;
                    handlebars.registerHelper(helperName, helperFn);
                }
                // save with no output
                if (finalParams.save && !finalParams.outPath && !finalParams.outDir) {
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
                if (sourceObj.outDir) {
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
                const viewData = {
                    config: __SSugarConfig.get('.'),
                    flatConfig: __flatten(__SSugarConfig.get('.')),
                    settings: this.markdownBuilderSettings,
                    params,
                    packageJson: __packageJson(finalParams.inDir),
                    docMenu: docmap.menu,
                    docmap,
                    time: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDay(),
                    },
                };
                if (!sourceObj.files.length) {
                    return reject();
                }
                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = sourceObj.files[j];
                    const buildObj = {
                        data: '',
                        output: '',
                    };
                    if (__extension(filePath) === 'js') {
                        const fn = (yield import(filePath)).default;
                        buildObj.data = fn(viewData);
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
                    const tplFn = handlebars.compile(currentTransformedString);
                    currentTransformedString = tplFn(viewData);
                    // processing transformers
                    // @ts-ignore
                    for (let [transformerId, transformerObj] of Object.entries(this.constructor._registeredTransformers)) {
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
                                preprocessedData = yield preprocessorFn.default(match);
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
                                ...tagMatches
                            ];
                        }
                    });
                    protectedTagsMatches === null || protectedTagsMatches === void 0 ? void 0 : protectedTagsMatches.forEach((match, i) => {
                        currentTransformedString = currentTransformedString.replace(match, `{match:${i}}`);
                    });
                    // marked if html is the target
                    if (finalParams.target === 'html') {
                        currentTransformedString = __marked(currentTransformedString, {});
                    }
                    // puth protected tags back
                    protectedTagsMatches === null || protectedTagsMatches === void 0 ? void 0 : protectedTagsMatches.forEach((match, i) => {
                        currentTransformedString = currentTransformedString.replace(`{match:${i}}`, match);
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
 * @name            marked
 * @type            Object
 * @static
 *
 * Access the marked object through this property
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SMarkdownBuilder.marked = __marked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFxQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sa0JBQWtCLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLHNDQUFzQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBeUV6QyxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUF3SXBEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFpRDtRQUN6RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ks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