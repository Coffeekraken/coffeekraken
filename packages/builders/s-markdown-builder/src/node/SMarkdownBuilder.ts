import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __fs from 'fs';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __marked from 'marked';
import __unescapeHtml from '@coffeekraken/sugar/shared/html/unescapeHtml';
import __handlebars from 'handlebars';
import __SMarkdownBuilderSCodeExampleHandlebarsHelper from './helpers/sCodeExampleHandlebarsHelper';
import __SMarkdownBuilderShieldsioHandlebarsHelper from './helpers/shieldsioHandlebarsHelper';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __isDirectory from '@coffeekraken/sugar/node/is/directory';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __writeTmpFileSync from '@coffeekraken/sugar/node/fs/writeTmpFileSync';

import __sCodeExampleToken from './tokens/sCodeExampleToken';

/**
 * @name                SMarkdownBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @platform            ts
 * @status              beta
 * 
 * This class represent the markdown builder that helps you create and maintain multiple README for example
 * with a common style and some common sections like footer, etc...
 * 
 * @param           {ISMarkdownBuilderCtorSettings}          [settings={}]           Some settings to configure your builder instance
 * 
 * @example         js
 * import SMarkdownBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new SMarkdownBuilder({
 *      markdownBuilder: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      input: 'my-cool-file.md',
 *      output: 'my/cool/file-output.md'
 * });
 * 
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISMarkdownBuilderSettings {
}

export interface ISMarkdownBuilderCtorSettings {
    markdownBuilder: Partial<ISMarkdownBuilderSettings>
}

export interface ISMarkdownBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    code: string;
}

export interface ISMarkdownBuilderTokenExtractResult {
    raw: string;
    [key: string]: any;
}

export interface ISMarkdownBuilderTokenExtractFn {
    (source: string): ISMarkdownBuilderTokenExtractResult[];
}
export interface ISMarkdownBuilderTokenRenderFn {
    (params: any, target: 'html' | 'markdown'): string;
}

export interface ISMarkdownBuilderToken {
    extract: ISMarkdownBuilderTokenExtractFn;
    render: ISMarkdownBuilderTokenRenderFn;
}

export interface ISMarkdownBuilderBuildParams {
    glob: string;
    inDir: string;
    inPath: string;
    inRaw: string;
    outDir: string;
    outPath: string;
    save: boolean;
    target: 'html' | 'markdown',
    preset: string[];
}

export default class SMarkdownBuilder extends __SBuilder {

    static _registeredHelpers: any = {};
    static _registeredLayouts: any = {};
    static _registeredPartials: any = {};
    static _registeredSections: any = {};

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
    static registerHelper(name: string, helperPath: string): void {
        // @ts-ignore
        this._registeredHelpers[name] = helperPath
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
    static registerLayout(name: string, layout: Record<'markdown' | 'html', string>): void {
        // @ts-ignore
        this._registeredLayouts[name] = {
            ...layout
        };
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
    static registerPartial(name: string, partial: Record<'markdown' | 'html', string>): void {
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
    static registerSection(name: string, section: Record<'markdown' | 'html', string>): void {
        // @ts-ignore
        this._registeredSections[name] = {
            ...section
        };
    }

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
    static marked = __marked;

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
    get markdownBuilderSettings(): ISMarkdownBuilderSettings {
        return (<any>this)._settings.markdownBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     * 
     * Constructor
     * 
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings?: Partial<ISMarkdownBuilderCtorSettings>) {
        super(__deepMerge({
            markdownBuilder: {
                ...__SSugarConfig.get('markdownBuilder')
            }
        }, settings ?? {}));

        // register layouts from config
        const config = __SSugarConfig.get('markdownBuilder');
        if (config.helpers) {
            Object.keys(config.helpers).forEach(helperName => {
                const helperPath = config.helpers[helperName];
                // @ts-ignore
                this.constructor.registerHelper(helperName, helperPath);
            });
        }
        if (config.layouts) {
            Object.keys(config.layouts).forEach(layoutName => {
                const layoutObj = config.layouts[layoutName];
                // @ts-ignore
                this.constructor.registerLayout(layoutName, layoutObj);
            });
        }
        if (config.sections) {
            Object.keys(config.sections).forEach(sectionName => {
                const sectionObj = config.sections[sectionName];
                // @ts-ignore
                this.constructor.registerSection(sectionName, sectionObj);
            });
        }
        if (config.partials) {
            Object.keys(config.partials).forEach(partialName => {
                const partialObj = config.partials[partialName];
                // @ts-ignore
                this.constructor.registerPartial(partialName, partialObj);
            });
        }


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
    _build(params: ISMarkdownBuilderBuildParams): Promise<ISMarkdownBuilderResult[]> {

        if (params.preset && params.preset.length) {

            return new __SPromise(async ({resolve, reject, emit, pipe}) => {

                const buildedPresets = {};

                for (let i=0; i<params.preset.length; i++) {
                    const preset = params.preset[i];
                    
                    emit('log', {
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`
                    });

                    const newParams = <ISMarkdownBuilderBuildParams>__deepMerge(
                        __SMarkdownBuilderBuildParamsInterface.defaults(),
                        __SSugarConfig.get(`markdownBuilder.presets.${preset}`)
                    );

                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = await buildPromise;

                }

                resolve(buildedPresets);

            });

        } else {

            return new __SPromise(async ({resolve, reject, emit}) => {

                const handlebars = __handlebars.create();

                const buildedFiles: ISMarkdownBuilderResult[] = [];

                if (params.inRaw) {
                    params.inPath = __writeTmpFileSync(params.inRaw);
                    delete params.inRaw;
                }

                if (params.inPath) {
                    params.inDir = __folderPath(params.inPath);
                    params.glob = __path.relative(params.inDir, params.inPath);
                    delete params.inPath;
                }  

                // register helpers and layouts in handlebars
                // @ts-ignore
                Object.keys(this.constructor._registeredLayouts ?? []).forEach(layoutName => {
                    // @ts-ignore
                    if (!this.constructor._registeredLayouts[layoutName]?.[params.target]) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const layoutStr = __fs.readFileSync(this.constructor._registeredLayouts[layoutName][params.target], 'utf8').toString();
                    handlebars.registerPartial(`layout-${layoutName}`, layoutStr);
                });
                 // @ts-ignore
                Object.keys(this.constructor._registeredSections ?? []).forEach(sectionName => {
                    // @ts-ignore
                    if (!this.constructor._registeredSections[sectionName]?.[params.target]) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const sectionStr = __fs.readFileSync(this.constructor._registeredSections[sectionName][params.target], 'utf8').toString();
                    handlebars.registerPartial(`section-${sectionName}`, sectionStr);
                });
                // @ts-ignore
                Object.keys(this.constructor._registeredPartials ?? []).forEach(partialName => {
                    // @ts-ignore
                    if (!this.constructor._registeredPartials[partialName]?.[params.target]) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${params.target}</cyan>" target option...`);
                    }
                    // @ts-ignore
                    const partialStr = __fs.readFileSync(this.constructor._registeredPartials[partialName][params.target], 'utf8').toString();
                    handlebars.registerPartial(partialName, partialStr);
                });
                // @ts-ignore
                for (let i=0; i<Object.keys(this.constructor._registeredHelpers ?? []).length; i++) {
                    // @ts-ignore
                    const helperName = Object.keys(this.constructor._registeredHelpers ?? [])[i];
                    // @ts-ignore
                    const helperFn = (await import(this.constructor._registeredHelpers[helperName])).default;
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
                if (params.save && ((params.outDir && !params.inDir) || (!params.outDir && params.inDir))) {
                    throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>outDir</yellow>" MUST be used alongside the params "<yellow>inDir</yellow>" and "<yellow>glob</yellow>"`);
                }

                let path = `${params.inDir}/${params.glob}`;
                const sourceObj = {
                    inputStr: '',
                    outputStr: '',
                    files: [],
                    inDir: params.inDir,
                    outDir: params.outDir,
                    outPath: params.outPath
                }
                if (__fs.existsSync(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                } else if (__SGlob.isGlob(path)) {
                    sourceObj.inputStr = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolve(path, {
                        SFile: false
                    });
                } else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outDir) {
                    sourceObj.outputStr = __path.relative(process.cwd(), sourceObj.outDir) || '.';
                }

                emit('log', {
                    value: `<yellow>[build]</yellow> Starting markdown Build`
                });

                emit('log', {
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`
                });

                if (sourceObj.outputStr) {
                    emit('log', {
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`
                    });
                }

                // take some datas like packagejson, etc...
                const viewData = {
                    config: __SSugarConfig.get('.'),
                    time: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDay()
                    }
                };

                if (!sourceObj.files.length) {
                    return reject();
                };

                for (let j=0; j<sourceObj.files.length; j++) {

                    const filePath = sourceObj.files[j];

                    const buildObj = {
                        data: __fs.readFileSync(filePath, 'utf8').toString(),
                        output: ''
                    };
                    if (sourceObj.outPath) {
                        buildObj.output = sourceObj.outPath;
                    } else if (sourceObj.inDir && sourceObj.outDir) {
                        buildObj.output = `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`;
                    }

                    let currentTransformedString = buildObj.data;

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
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                        });
                    }

                    const res: ISMarkdownBuilderResult = {
                        inputFile: __SFile.new(filePath),
                        outputFile: params.save ? __SFile.new(buildObj.output) : undefined,
                        code: currentTransformedString
                    };

                    buildedFiles.push(res);

                }

                resolve(buildedFiles);
            }, {
                metas: {
                    id: this.constructor.name
                }
            });
        }
    }

}