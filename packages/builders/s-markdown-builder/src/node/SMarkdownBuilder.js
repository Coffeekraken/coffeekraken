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
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __writeTmpFileSync from '@coffeekraken/sugar/node/fs/writeTmpFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __fs from 'fs';
import __handlebars from 'handlebars';
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
                        data: __fs
                            .readFileSync(filePath, 'utf8')
                            .toString(),
                        output: '',
                    };
                    if (sourceObj.outPath) {
                        buildObj.output = sourceObj.outPath;
                    }
                    else if (sourceObj.inDir && sourceObj.outDir) {
                        buildObj.output = `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`;
                    }
                    let currentTransformedString = buildObj.data;
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
                    const tplFn = handlebars.compile(currentTransformedString);
                    currentTransformedString = tplFn(viewData);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU01hcmtkb3duQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNNYXJrZG93bkJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxVQUFxQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVFLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sa0JBQWtCLE1BQU0sOENBQThDLENBQUM7QUFDOUUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFDOUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sc0NBQXNDLE1BQU0sa0RBQWtELENBQUM7QUF5RXRHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsVUFBVTtJQXdJcEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWlEO1FBQ3pELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxlQUFlLG9CQUNSLGNBQWMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FDM0M7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsK0JBQStCO1FBQy9CLE1BQU0sTUFBTSxHQUFH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