import type { ISBuilderSettings } from '@coffeekraken/s-builder';
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
import __getCoffeekrakenMetas from '@coffeekraken/sugar/node/coffeekraken/getCoffeekrakenMetas';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';

/**
 * @name                SMarkdownBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent the markdown builder that helps you create and maintain multiple README for example
 * with a common style and some common sections like footer, etc...
 *
 * @param           {ISMarkdownBuilderSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import SMarkdownBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new SMarkdownBuilder({
 *      markdownBuilder: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      inPath: 'my-cool-file.md',
 *      outPath: 'my/cool/file-output.md'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISMarkdownBuilderSettings extends ISBuilderSettings {}

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
    target: 'html' | 'markdown';
    preset: string[];
    protectedTags: string[];
}

export default class SMarkdownBuilder extends __SBuilder {
    static _registeredHelpers: any = {};
    static _registeredLayouts: any = {};
    static _registeredPartials: any = {};
    static _registeredSections: any = {};
    static _registeredTransformers: any = {};

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
    static _registerTransformer(name: string, transformerPath: string): void {
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
    static registerHelper(name: string, helperPath: string): void {
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
    static registerLayout(
        name: string,
        paths: Record<'markdown' | 'html', string>,
        data: any,
    ): void {
        // @ts-ignore
        this._registeredLayouts[name] = {
            ...paths,
            data,
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
     * @param           {String}            name            The name of your partial
     * @param           {Record<'markdown'|'html',string>}      partial     The partial object with the targets properties like markdown and html that point to their proper handlebar syntax files
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerPartial(
        name: string,
        partial: Record<'markdown' | 'html', string>,
    ): void {
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
    static registerSection(
        name: string,
        section: Record<'markdown' | 'html', string>,
    ): void {
        // @ts-ignore
        this._registeredSections[name] = {
            ...section,
        };
    }

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
    static _marked = __marked;

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISMarkdownBuilderSettings>) {
        super(
            __deepMerge(__SSugarConfig.get('markdownBuilder'), settings ?? {}),
        );

        // register layouts from config
        const config = __SSugarConfig.get('markdownBuilder');
        if (config.transformers) {
            Object.keys(config.transformers).forEach((transformerName) => {
                const transformerPath = config.transformers[transformerName];
                // @ts-ignore
                this.constructor._registerTransformer(
                    transformerName,
                    transformerPath,
                );
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

    _loaded = false;
    async _load() {
        if (this._loaded) return;
        this._loaded = true;
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
    _build(
        params: ISMarkdownBuilderBuildParams,
    ): Promise<ISMarkdownBuilderResult[]> {
        if (params.preset && params.preset.length) {
            return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
                const buildedPresets = {};

                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                    });

                    const newParams = <ISMarkdownBuilderBuildParams>__deepMerge(
                        // @ts-ignore
                        __SMarkdownBuilderBuildParamsInterface.defaults(),
                        __SSugarConfig.get(`markdownBuilder.presets.${preset}`),
                    );

                    const buildPromise = this._build(newParams);
                    pipe(buildPromise);
                    buildedPresets[preset] = await buildPromise;
                }

                resolve(buildedPresets);
            });
        } else {
            return new __SPromise(
                async ({ resolve, reject, emit }) => {
                    const handlebars = __handlebars.create();

                    // load
                    await this._load();

                    // helpers
                    registerHelpers(handlebars);

                    const finalParams: ISMarkdownBuilderBuildParams = __deepMerge(
                        // @ts-ignore
                        __SMarkdownBuilderBuildParamsInterface.defaults(),
                        params ?? {},
                    );

                    const buildedFiles: ISMarkdownBuilderResult[] = [];

                    if (finalParams.inRaw) {
                        finalParams.inPath = __writeTmpFileSync(
                            finalParams.inRaw,
                        );
                        // @ts-ignore
                        delete finalParams.inRaw;
                    }

                    if (finalParams.inPath) {
                        finalParams.inDir = __folderPath(finalParams.inPath);
                        finalParams.glob = __path.relative(
                            finalParams.inDir,
                            finalParams.inPath,
                        );
                        // @ts-ignore
                        delete finalParams.inPath;
                    }

                    // register helpers and layouts in handlebars
                    // @ts-ignore
                    Object.keys(
                        // @ts-ignore
                        this.constructor._registeredLayouts ?? [],
                    ).forEach((layoutName) => {
                        // @ts-ignore
                        if (
                            // @ts-ignore
                            !this.constructor._registeredLayouts[layoutName]?.[
                                finalParams.target
                            ]
                        ) {
                            throw new Error(
                                `<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`,
                            );
                        }
                        // @ts-ignore
                        const layoutStr = __fs
                            // @ts-ignore
                            .readFileSync(
                                // @ts-ignore
                                this.constructor._registeredLayouts[layoutName][
                                    finalParams.target
                                ],
                                'utf8',
                            )
                            .toString();
                        handlebars.registerPartial(
                            `layout-${layoutName}`,
                            layoutStr,
                        );
                    });
                    // @ts-ignore
                    Object.keys(
                        // @ts-ignore
                        this.constructor._registeredSections ?? [],
                    ).forEach((sectionName) => {
                        // @ts-ignore
                        if (
                            // @ts-ignore
                            !this.constructor._registeredSections[
                                sectionName
                            ]?.[finalParams.target]
                        ) {
                            throw new Error(
                                `<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`,
                            );
                        }
                        // @ts-ignore
                        const sectionStr = __fs
                            // @ts-ignore
                            .readFileSync(
                                // @ts-ignore
                                this.constructor._registeredSections[
                                    sectionName
                                ][finalParams.target],
                                'utf8',
                            )
                            .toString();
                        handlebars.registerPartial(
                            `section-${sectionName}`,
                            sectionStr,
                        );
                    });
                    // @ts-ignore
                    Object.keys(
                        // @ts-ignore
                        this.constructor._registeredPartials ?? [],
                    ).forEach((partialName) => {
                        // @ts-ignore
                        if (
                            // @ts-ignore
                            !this.constructor._registeredPartials[
                                partialName
                            ]?.[finalParams.target]
                        ) {
                            throw new Error(
                                `<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`,
                            );
                        }
                        // @ts-ignore
                        const partialStr = __fs
                            // @ts-ignore
                            .readFileSync(
                                // @ts-ignore
                                this.constructor._registeredPartials[
                                    partialName
                                ][finalParams.target],
                                'utf8',
                            )
                            .toString();
                        handlebars.registerPartial(partialName, partialStr);
                    });
                    // @ts-ignore
                    for (
                        let i = 0;
                        i <
                        // @ts-ignore
                        Object.keys(this.constructor._registeredHelpers ?? [])
                            .length;
                        i++
                    ) {
                        // @ts-ignore
                        const helperName = Object.keys(
                            // @ts-ignore
                            this.constructor._registeredHelpers ?? [],
                        )[i];
                        // @ts-ignore
                        const helperFn = ( // @ts-ignore
                            await import(
                                // @ts-ignore
                                this.constructor._registeredHelpers[helperName]
                            )
                        ).default;
                        handlebars.registerHelper(helperName, helperFn);
                    }

                    // save with no output
                    if (
                        finalParams.save &&
                        !finalParams.outPath &&
                        !finalParams.outDir
                    ) {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> The param "<yellow>save</yellow>" MUST be used alongside the params "<yellow>outPath</yellow>" or "<yellow>outDir</yellow>"`,
                        );
                    }

                    // inDir with no glob
                    if (finalParams.inDir && !finalParams.glob) {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> The param "<yellow>inDir</yellow>" MUST be used alongside the param "<yellow>glob</yellow>"`,
                        );
                    }

                    // either no outDir with inDir or inverse...
                    if (
                        finalParams.save &&
                        ((finalParams.outDir && !finalParams.inDir) ||
                            (!finalParams.outDir && finalParams.inDir))
                    ) {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> The param "<yellow>outDir</yellow>" MUST be used alongside the params "<yellow>inDir</yellow>" and "<yellow>glob</yellow>"`,
                        );
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
                        sourceObj.inputStr = __path.relative(
                            process.cwd(),
                            path,
                        );
                        // @ts-ignore
                        sourceObj.files.push(path);
                    } else if (__SGlob.isGlob(path)) {
                        sourceObj.inputStr = __path.relative(
                            process.cwd(),
                            path,
                        );
                        // @ts-ignore
                        sourceObj.files = __SGlob.resolve(path, {
                            SFile: false,
                        });
                    } else {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`,
                        );
                    }
                    if (sourceObj.outPath) {
                        sourceObj.outputStr =
                            __path.relative(process.cwd(), sourceObj.outPath) ||
                            '.';
                    } else if (sourceObj.outDir) {
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

                    const docmap = await new __SDocmap().read();

                    // take some datas like packagejson, etc...
                    const viewData = {
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
                    };

                    if (!sourceObj.files.length) {
                        return reject();
                    }

                    for (let j = 0; j < sourceObj.files.length; j++) {
                        const filePath = <string>sourceObj.files[j];

                        const buildObj = {
                            data: '',
                            output: '',
                        };

                        const dataHandlerData = await __SDataFileGeneric.load(
                            filePath,
                        );

                        const finalViewData = __deepMerge(
                            Object.assign({}, viewData),
                            dataHandlerData,
                        );

                        if (__extension(filePath) === 'js') {
                            // @ts-ignore
                            const fn = (await import(filePath)).default;
                            buildObj.data = fn(finalViewData);
                        } else {
                            buildObj.data = __fs
                                .readFileSync(filePath, 'utf8')
                                .toString();
                        }

                        if (sourceObj.outPath) {
                            buildObj.output = sourceObj.outPath;
                        } else if (sourceObj.inDir && sourceObj.outDir) {
                            buildObj.output = `${
                                sourceObj.outDir
                            }/${__path.relative(sourceObj.inDir, filePath)}`;
                        }

                        let currentTransformedString = buildObj.data;

                        // compile template
                        const tplFn = handlebars.compile(
                            currentTransformedString,
                        );

                        currentTransformedString = tplFn(finalViewData);

                        // processing transformers
                        // @ts-ignore
                        for (let [
                            transformerId,
                            transformerObj,
                        ] of Object.entries(
                            this.constructor._registeredTransformers,
                        )) {
                            // @ts-ignore
                            if (!transformerObj[finalParams.target]) return;

                            const matches = [
                                ...currentTransformedString.matchAll(
                                    transformerObj.match,
                                ),
                            ];

                            if (!matches.length) continue;

                            const transformerStr = __fs
                                .readFileSync(
                                    transformerObj[finalParams.target],
                                    'utf8',
                                )
                                .toString();

                            const tplFn = handlebars.compile(transformerStr);

                            for (let i = 0; i < matches.length; i++) {
                                const match = matches[i];
                                let preprocessedData = match;
                                // @ts-ignore
                                if (transformerObj.preprocessor) {
                                    const preprocessorFn = await import(
                                        transformerObj.preprocessor
                                    );
                                    preprocessedData = await preprocessorFn.default(
                                        match,
                                    );
                                }

                                const result = tplFn({
                                    data: preprocessedData,
                                });
                                currentTransformedString = currentTransformedString.replace(
                                    match[0],
                                    result,
                                );
                            }
                        }

                        // protected tags like "template"
                        let protectedTagsMatches: string[] = [];
                        finalParams.protectedTags.forEach((tag) => {
                            const tagReg = new RegExp(
                                `<${tag}[^>]*>[\\w\\W\\n]+?(?=<\\/${tag}>)<\\/${tag}>`,
                                'gm',
                            );
                            const tagMatches = currentTransformedString.match(
                                tagReg,
                            );
                            if (tagMatches) {
                                protectedTagsMatches = [
                                    ...protectedTagsMatches,
                                    ...tagMatches,
                                ];
                            }
                        });
                        protectedTagsMatches?.forEach((match, i) => {
                            currentTransformedString = currentTransformedString.replace(
                                match,
                                `{match:${i}}`,
                            );
                        });

                        // marked if html is the target
                        if (finalParams.target === 'html') {
                            currentTransformedString = __marked(
                                currentTransformedString,
                                {},
                            );
                        }

                        // puth protected tags back
                        protectedTagsMatches?.forEach((match, i) => {
                            currentTransformedString = currentTransformedString.replace(
                                `{match:${i}}`,
                                match,
                            );
                        });

                        if (finalParams.save) {
                            __writeFileSync(
                                buildObj.output,
                                currentTransformedString,
                            );
                            const file = new __SFile(buildObj.output);
                            emit('log', {
                                value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                            });
                        }

                        const res: ISMarkdownBuilderResult = {
                            inputFile: __SFile.new(filePath),
                            outputFile: finalParams.save
                                ? __SFile.new(buildObj.output)
                                : undefined,
                            code: currentTransformedString,
                        };

                        buildedFiles.push(res);
                    }

                    resolve(buildedFiles);
                },
                {
                    metas: {
                        id: this.constructor.name,
                    },
                },
            );
        }
    }
}
