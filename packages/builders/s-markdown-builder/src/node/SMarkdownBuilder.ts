import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SDocmap from '@coffeekraken/s-docmap';
import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STheme from '@coffeekraken/s-theme';

import __SViewRenderer from '@coffeekraken/s-view-renderer';

import __SCodeFormatter from '@coffeekraken/s-code-formatter';
import { __getCoffeekrakenMetas } from '@coffeekraken/sugar/coffeekraken';

import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';

import {
    __fileHashSync,
    __folderPath,
    __readJsonSync,
    __writeFileSync,
    __writeTmpFileSync,
} from '@coffeekraken/sugar/fs';
import { __deepMerge, __objectHash } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import { marked as __marked } from 'marked';
import __path from 'path';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';

import __codeTransformer from './transformers/code';
import __ogTransformer from './transformers/og';

/**
 * @name                SMarkdownBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 * @private
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

export interface ISMarkdownBuilderLogSettings {
    summary: boolean;
    preset: boolean;
    cache: boolean;
    verbose: boolean;
}

export interface ISMarkdownBuilderTransformer {
    reg: RegExp;
    transform(data: any, target: 'html' | 'markdown'): string;
}

export interface ISMarkdownBuilderSettings extends ISBuilderSettings {
    transformers: ISMarkdownBuilderTransformer[];
    log: Partial<ISMarkdownBuilderLogSettings>;
}

export interface ISMarkdownBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    code: string;
    error?: string;
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
    data: any;
    save: boolean;
    cache: boolean;
    target: 'html' | 'markdown';
    preset: string[];
}

export default class SMarkdownBuilder extends __SBuilder {
    static _registeredTransformers: any = {};

    /**
     * Store the package hash to rebuild files
     */

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
            __deepMerge(
                {
                    transformers: [__ogTransformer, __codeTransformer],
                    log: {
                        summary: true,
                        preset: true,
                        cache: false,
                        verbose: __SEnv.is('verbose'),
                    },
                },
                settings ?? {},
            ),
        );
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
     * @return      {Promise}                                                          A Promise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(
        params: ISMarkdownBuilderBuildParams,
    ): Promise<ISMarkdownBuilderResult[]> {
        if (params.preset && params.preset.length) {
            return new Promise(async (resolve) => {
                const buildedPresets = {};

                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];

                    if (this.settings.log.preset) {
                        console.log(
                            `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                        );
                    }

                    const newParams = <ISMarkdownBuilderBuildParams>__deepMerge(
                        // @ts-ignore
                        __SMarkdownBuilderBuildParamsInterface.defaults(),
                        __SSugarConfig.get(`markdownBuilder.presets.${preset}`),
                    );

                    const buildPromise = this._build(newParams);
                    buildedPresets[preset] = await buildPromise;
                }

                resolve(buildedPresets);
            });
        } else {
            return new Promise(async (resolve) => {
                // load
                await this._load();

                const finalParams: ISMarkdownBuilderBuildParams = __deepMerge(
                    // @ts-ignore
                    __SMarkdownBuilderBuildParamsInterface.defaults(),
                    params ?? {},
                );

                finalParams.cache = false;

                // calculate final settings and params hash
                const hashSettings = Object.assign({}, this.settings);
                delete hashSettings.metas;
                const settingsHash = __objectHash(hashSettings),
                    paramsHash = __objectHash(finalParams);

                // cache file path
                const cacheFilePath = `${__packageCacheDir()}/s-markdown-builder/cacheHashes.json`;

                // load cache file if wanted
                let cacheHashes = {};
                if (finalParams.cache) {
                    if (!__fs.existsSync(cacheFilePath)) {
                        __writeFileSync(cacheFilePath, '{}');
                    }
                    cacheHashes = __readJsonSync(cacheFilePath);
                }

                const buildedFiles: ISMarkdownBuilderResult[] = [];

                // handle raw code passed
                if (finalParams.inRaw) {
                    finalParams.inPath = __writeTmpFileSync(finalParams.inRaw);
                    // @ts-ignore
                    delete finalParams.inRaw;
                }

                // handle in path
                if (finalParams.inPath) {
                    finalParams.inDir = __folderPath(finalParams.inPath);
                    finalParams.glob = __path.relative(
                        finalParams.inDir,
                        finalParams.inPath,
                    );
                    // @ts-ignore
                    delete finalParams.inPath;
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
                    inRelPath: '',
                    outRelDir: '',
                    files: [],
                    inDir: finalParams.inDir,
                    outDir: finalParams.outDir,
                    outPath: finalParams.outPath,
                };
                if (__fs.existsSync(path)) {
                    sourceObj.inRelPath = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                } else if (__SGlob.isGlob(path)) {
                    sourceObj.inRelPath = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolveSync(path, {
                        SFile: false,
                    });
                } else {
                    throw new Error(
                        `<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`,
                    );
                }
                if (sourceObj.outPath) {
                    sourceObj.outRelDir =
                        __path.relative(process.cwd(), sourceObj.outPath) ||
                        '.';
                } else if (sourceObj.outDir) {
                    sourceObj.outRelDir =
                        __path.relative(process.cwd(), sourceObj.outDir) || '.';
                }

                if (this.settings.log.summary) {
                    console.log(
                        `<yellow>[build]</yellow> Starting markdown Build`,
                    );

                    console.log(
                        `<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(
                            /\.\.\//gm,
                            '',
                        )}</cyan>`,
                    );

                    if (sourceObj.outRelDir) {
                        console.log(
                            `<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`,
                        );
                    }
                }

                // read docmap
                const docmap = await new __SDocmap().read();

                // read frontspec
                const frontspec = await new __SFrontspec().read();

                // take some datas like packagejson, etc...
                const viewData = __deepMerge(
                    {
                        theme: __STheme.get('.'),
                        config: __SSugarConfig.get('.'),
                        settings: this.settings,
                        params,
                        docMenu: docmap.menu,
                        docmap,
                        frontspec,
                        ck: __getCoffeekrakenMetas(),
                        time: {
                            year: new Date().getFullYear(),
                            month: new Date().getMonth(),
                            day: new Date().getDay(),
                        },
                    },
                    finalParams.data ?? {},
                );

                if (!sourceObj.files.length) {
                    console.log(
                        `<yellow>[build]</yellow> No files to build...`,
                    );
                    return resolve([]);
                }

                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = <string>sourceObj.files[j];

                    const fileHash = __fileHashSync(filePath),
                        finalFileHash = `${fileHash}-${paramsHash}-${settingsHash}`;

                    const buildObj = {
                        data: '',
                        outPath: sourceObj.outPath,
                    };

                    // if no outPath in the sourceObj
                    // AND that we have a inDir and an outDir
                    // set the outPath with that
                    if (
                        !buildObj.outPath &&
                        sourceObj.inDir &&
                        sourceObj.outDir
                    ) {
                        buildObj.outPath = `${
                            sourceObj.outDir
                        }/${__path.relative(sourceObj.inDir, filePath)}`;
                    }

                    // if no outPath in the sourceObj
                    // AND that we don't want to save the file
                    // set the outPath to the temp directory
                    if (!finalParams.save) {
                        buildObj.outPath = `${__packageCacheDir()}/s-markdown-builder/${sourceObj.inRelPath.replace(
                            /\.\.\//gm,
                            '',
                        )}`;
                    }

                    // load the specs alongside the view if exists
                    const specsDir = __path.dirname(filePath),
                        specsFileName = `${
                            __path.basename(filePath).split('.')[0]
                        }.spec.json`;
                    const specsFilePath = `${specsDir}/${specsFileName}`;
                    if (__fs.existsSync(specsFilePath)) {
                        // const specsInstance = new __SSpecs();
                        // viewData.specs = await specsInstance.read(
                        //     specsFilePath,
                        // );
                    }

                    // remplace the extension in the output
                    const outputExtension =
                        finalParams.target === 'html' ? 'html' : 'md';
                    buildObj.outPath = buildObj.outPath.replace(
                        /\.(md)(\..*)?/,
                        `.${outputExtension}`,
                    );

                    // check if need to rebuild the file or not
                    if (
                        finalParams.cache &&
                        cacheHashes[`${filePath}-${outputExtension}`] ===
                            finalFileHash
                    ) {
                        if (
                            this.settings.log.cache ||
                            this.settings.log.verbose
                        ) {
                            console.log(
                                `<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${__path
                                    .relative(__packageRootDir(), filePath)
                                    .replace(
                                        /\.\.\//gm,
                                        '',
                                    )}</cyan>" for the "<yellow>${
                                    finalParams.target
                                }</yellow>" target`,
                            );
                        }

                        const outputFile = __SFile.new(buildObj.outPath);
                        const res: ISMarkdownBuilderResult = {
                            inputFile: __SFile.new(filePath),
                            outputFile: __SFile.new(buildObj.outPath),
                            code: outputFile.content,
                        };

                        // add the file in the builded stack
                        buildedFiles.push(res);

                        // next file
                        continue;
                    }

                    let currentTransformedString = buildObj.data;

                    // init the res object
                    const res: ISMarkdownBuilderResult = {
                        inputFile: __SFile.new(filePath),
                        outputFile: __SFile.new(buildObj.outPath, {
                            checkExistence: false,
                        }),
                        code: '',
                    };

                    const viewRenderer = new __SViewRenderer();
                    const viewRendererRes = await viewRenderer.render(
                        filePath,
                        viewData,
                    );

                    // handle error in render
                    if (viewRendererRes.error) {
                        res.error = viewRendererRes.error;
                        buildedFiles.push(res);
                        continue;
                    }

                    currentTransformedString = viewRendererRes.value ?? '';

                    // format codes
                    const codeFormatter = new __SCodeFormatter({
                        log: {
                            summary: false,
                        },
                    });
                    const codeMatches = currentTransformedString.match(
                        /```[a-zA-Z0-9]+[^```]*```/gm,
                    );
                    if (codeMatches?.length) {
                        // @ts-ignore
                        for (let [i, value] of codeMatches.entries()) {
                            const language = value
                                    .trim()
                                    .match(/^```([a-zA-Z0-9]+)/)[1],
                                code = value
                                    .trim()
                                    .replace(/^```[a-zA-Z0-9]+/, '')
                                    .replace(/```$/, '');
                            const formatedCode =
                                await codeFormatter.formatInline(
                                    code,
                                    language,
                                );
                            // replacing the code
                            currentTransformedString =
                                currentTransformedString.replace(
                                    value,
                                    [
                                        `\`\`\`${language}`,
                                        formatedCode,
                                        '```',
                                    ].join('\n'),
                                );
                        }
                    }

                    // handle spaces at line start
                    let doNotTouchline = false,
                        inList = false;
                    currentTransformedString = currentTransformedString
                        .split('\n')
                        .map((line) => {
                            const trimedLine = line.trim();

                            // end of protected lines
                            if (
                                doNotTouchline &&
                                trimedLine.match(/^[\`]{3}$/)
                            ) {
                                doNotTouchline = false;
                                return trimedLine;
                            }
                            if (
                                inList &&
                                !trimedLine.match(/^(\-|[0-9]+\.)\s/)
                            ) {
                                inList = false;
                                return line;
                            }

                            // check if dont want to touch line
                            if (doNotTouchline || inList) {
                                return line;
                            }

                            // start of protected lines
                            if (trimedLine.match(/^[\`]{3}/)) {
                                doNotTouchline = true;
                            }
                            if (trimedLine.match(/^(\-|[0-9]+\.)\s/)) {
                                inList = true;
                            }

                            // return the trimed line
                            return trimedLine;
                        })
                        .join('\n');

                    // transformers
                    const transformersResults = [];
                    for (let transformerObj of this.settings.transformers) {
                        let m;

                        const matches = [
                            ...currentTransformedString.matchAll(
                                transformerObj.reg,
                            ),
                        ];

                        for (let match of matches) {
                            const transformerResult =
                                await transformerObj.transform(
                                    match.slice(1),
                                    finalParams.target,
                                );

                            if (transformerResult) {
                                transformersResults.push(transformerResult);
                                currentTransformedString =
                                    currentTransformedString.replace(
                                        match[0],
                                        `<!-- transformer:${
                                            transformersResults.length - 1
                                        } -->`,
                                    );
                            }
                        }
                    }

                    // marked if html is the target
                    if (finalParams.target === 'html') {
                        // __marked.setOptions({
                        //     // disable escaping code
                        //     highlight: function (code, lang) {
                        //         return code;
                        //     },
                        // });
                        currentTransformedString = __marked(
                            currentTransformedString,
                            {},
                        );
                    } else if (finalParams.target === 'markdown') {
                        // currentTransformedString = currentTransformedString
                        //     // .split('\n')
                        //     // .map((line) => {
                        //     //     return line.trim();
                        //     // })
                        //     // .join('\n');
                    }

                    // replace the transformers results by the actual result
                    transformersResults.forEach((transformerResultStr, i) => {
                        currentTransformedString =
                            currentTransformedString.replace(
                                `<!-- transformer:${i} -->`,
                                transformersResults[i],
                            );
                    });

                    // add the "warning" on top of the file
                    currentTransformedString = [
                        `<!-- This file has been generated using`,
                        `     the "@coffeekraken/s-markdown-builder" package.`,
                        '     !!! Do not edit it directly... -->',
                        '',
                        currentTransformedString,
                    ].join('\n');

                    // set the code in the res object
                    res.code = currentTransformedString;

                    // add the file in the builded stack
                    buildedFiles.push(res);

                    // make sure we have something to write
                    if (!currentTransformedString) {
                        // pass to the next file
                        continue;
                    }

                    // write file on disk
                    __writeFileSync(buildObj.outPath, currentTransformedString);
                    if (finalParams.save) {
                        const file = new __SFile(buildObj.outPath);
                        console.log(
                            `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        );
                    }

                    // save the file hash
                    // it will be saved at the end only if the build
                    // is a success...
                    cacheHashes[`${filePath}-${outputExtension}`] =
                        finalFileHash;

                    // write the cache only at the end if the build
                    // is a success
                    __writeFileSync(
                        cacheFilePath,
                        JSON.stringify(cacheHashes, null, 4),
                    );
                }

                resolve(buildedFiles);
            });
        }
    }
}
