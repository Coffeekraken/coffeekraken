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
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
export default class SMarkdownBuilder extends __SBuilder {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params) {
        if (params.preset && params.preset.length) {
            return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    emit('log', {
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
                const buildedFiles = [];
                if (params.inRaw) {
                    params.inPath = __writeTmpFileSync(params.inRaw);
                    // @ts-ignore
                    delete params.inRaw;
                }
                if (params.inPath) {
                    params.inDir = __folderPath(params.inPath);
                    params.glob = __path.relative(params.inDir, params.inPath);
                    // @ts-ignore
                    delete params.inPath;
                }
                // register helpers and layouts in handlebars
                // @ts-ignore
                Object.keys((_a = this.constructor._registeredLayouts) !== null && _a !== void 0 ? _a : []).forEach((layoutName) => {
                    var _a;
                    // @ts-ignore
                    if (!((_a = this.constructor._registeredLayouts[layoutName]) === null || _a === void 0 ? void 0 : _a[params.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const layoutStr = __fs
                        // @ts-ignore
                        .readFileSync(this.constructor._registeredLayouts[layoutName][params.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(`layout-${layoutName}`, layoutStr);
                });
                // @ts-ignore
                Object.keys((_b = this.constructor._registeredSections) !== null && _b !== void 0 ? _b : []).forEach((sectionName) => {
                    var _a;
                    // @ts-ignore
                    if (!((_a = this.constructor._registeredSections[sectionName]) === null || _a === void 0 ? void 0 : _a[params.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const sectionStr = __fs
                        // @ts-ignore
                        .readFileSync(this.constructor._registeredSections[sectionName][params.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(`section-${sectionName}`, sectionStr);
                });
                // @ts-ignore
                Object.keys((_c = this.constructor._registeredPartials) !== null && _c !== void 0 ? _c : []).forEach((partialName) => {
                    var _a;
                    // @ts-ignore
                    if (!((_a = this.constructor._registeredPartials[partialName]) === null || _a === void 0 ? void 0 : _a[params.target])) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const partialStr = __fs
                        // @ts-ignore
                        .readFileSync(this.constructor._registeredPartials[partialName][params.target], 'utf8')
                        .toString();
                    handlebars.registerPartial(partialName, partialStr);
                });
                // @ts-ignore
                for (let i = 0; i <
                    Object.keys((_d = this.constructor._registeredHelpers) !== null && _d !== void 0 ? _d : [])
                        .length; i++) {
                    // @ts-ignore
                    const helperName = Object.keys((_e = this.constructor._registeredHelpers) !== null && _e !== void 0 ? _e : [])[i];
                    // @ts-ignore
                    const helperFn = (yield import(this.constructor._registeredHelpers[helperName])).default;
                    handlebars.registerHelper(helperName, helperFn);
                }
                // save with no output
                if (params.save && !params.outPath && !params.outDir) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>save</yellow>" MUST be used alongside the params "<yellow>outPath</yellow>" or "<yellow>outDir</yellow>"`);
                }
                // inDir with no glob
                if (params.inDir && !params.glob) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>inDir</yellow>" MUST be used alongside the param "<yellow>glob</yellow>"`);
                }
                // either no outDir with inDir or inverse...
                if (params.save &&
                    ((params.outDir && !params.inDir) ||
                        (!params.outDir && params.inDir))) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>outDir</yellow>" MUST be used alongside the params "<yellow>inDir</yellow>" and "<yellow>glob</yellow>"`);
                }
                let path = `${params.inDir}/${params.glob}`;
                const sourceObj = {
                    inputStr: '',
                    outputStr: '',
                    files: [],
                    inDir: params.inDir,
                    outDir: params.outDir,
                    outPath: params.outPath,
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
                    value: `<yellow>[build]</yellow> Starting markdown Build`,
                });
                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`,
                });
                if (sourceObj.outputStr) {
                    emit('log', {
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`,
                    });
                }
                const docmap = yield new __SDocmap().read();
                // take some datas like packagejson, etc...
                const viewData = {
                    config: __SSugarConfig.get('.'),
                    flatConfig: __flatten(__SSugarConfig.get('.')),
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
                    Object.keys(
                    // @ts-ignore
                    this.constructor._registeredTransformers).forEach((transformerId) => {
                        const transformerObj = 
                        // @ts-ignore
                        this.constructor._registeredTransformers[transformerId];
                        if (!transformerObj[params.target])
                            return;
                        const matches = [
                            ...currentTransformedString.matchAll(transformerObj.match),
                        ];
                        if (!matches.length)
                            return;
                        const transformerStr = __fs
                            .readFileSync(transformerObj[params.target], 'utf8')
                            .toString();
                        const tplFn = handlebars.compile(transformerStr);
                        matches.forEach((match) => {
                            const result = tplFn({
                                data: match,
                            });
                            currentTransformedString =
                                currentTransformedString.replace(match[0], result);
                        });
                    });
                    // marked if html is the target
                    if (params.target === 'html') {
                        currentTransformedString = __marked(currentTransformedString, {});
                    }
                    if (params.save) {
                        __writeFileSync(buildObj.output, currentTransformedString);
                        const file = new __SFile(buildObj.output);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    const res = {
                        inputFile: __SFile.new(filePath),
                        outputFile: params.save
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SMarkdownBuilder.marked = __marked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFxQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sa0JBQWtCLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxRQUFRLE1BQU0sUUFBUSxDQUFDO0FBQzlCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNDQUFzQyxNQUFNLGtEQUFrRCxDQUFDO0FBeUV0RyxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLFVBQVU7SUF3SXBEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFpRDtRQUN6RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksZUFBZSxvQkFDUixjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQzNDO1NBQ0osRUFDRCxRQUFRLGFB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