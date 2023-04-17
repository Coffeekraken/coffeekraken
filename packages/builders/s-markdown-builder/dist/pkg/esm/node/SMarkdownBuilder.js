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
import { __fileHashSync, __folderPath, __readJsonSync, __writeFileSync, __writeTmpFileSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge, __objectHash } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import { marked as __marked } from 'marked';
import __path from 'path';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __codeTransformer from './transformers/code';
import __ogTransformer from './transformers/og';
export default class SMarkdownBuilder extends __SBuilder {
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
    static _registerTransformer(name, transformerPath) {
        // @ts-ignore
        this._registeredTransformers[name] = transformerPath;
    }
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
            transformers: [__ogTransformer, __codeTransformer],
            log: {
                summary: true,
                preset: true,
                cache: false,
                verbose: __SEnv.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
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
     * @return      {Promise}                                                          A Promise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params) {
        if (params.preset && params.preset.length) {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    if (this.settings.log.preset) {
                        console.log(`<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`);
                    }
                    const newParams = __deepMerge(
                    // @ts-ignore
                    __SMarkdownBuilderBuildParamsInterface.defaults(), __SSugarConfig.get(`markdownBuilder.presets.${preset}`));
                    const buildPromise = this._build(newParams);
                    buildedPresets[preset] = yield buildPromise;
                }
                resolve(buildedPresets);
            }));
        }
        else {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                // load
                yield this._load();
                const finalParams = __deepMerge(
                // @ts-ignore
                __SMarkdownBuilderBuildParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
                finalParams.cache = false;
                // calculate final settings and params hash
                const hashSettings = Object.assign({}, this.settings);
                delete hashSettings.metas;
                const settingsHash = __objectHash(hashSettings), paramsHash = __objectHash(finalParams);
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
                const buildedFiles = [];
                // handle raw code passed
                if (finalParams.inRaw) {
                    finalParams.inPath = __writeTmpFileSync(finalParams.inRaw);
                    // @ts-ignore
                    delete finalParams.inRaw;
                }
                // handle in path
                if (finalParams.inPath) {
                    finalParams.inDir = __folderPath(finalParams.inPath);
                    finalParams.glob = __path.relative(finalParams.inDir, finalParams.inPath);
                    // @ts-ignore
                    delete finalParams.inPath;
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
                }
                else if (__SGlob.isGlob(path)) {
                    sourceObj.inRelPath = __path.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = __SGlob.resolveSync(path, {
                        SFile: false,
                    });
                }
                else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outPath) {
                    sourceObj.outRelDir =
                        __path.relative(process.cwd(), sourceObj.outPath) ||
                            '.';
                }
                else if (sourceObj.outDir) {
                    sourceObj.outRelDir =
                        __path.relative(process.cwd(), sourceObj.outDir) || '.';
                }
                if (this.settings.log.summary) {
                    console.log(`<yellow>[build]</yellow> Starting markdown Build`);
                    console.log(`<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`);
                    if (sourceObj.outRelDir) {
                        console.log(`<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`);
                    }
                }
                // read docmap
                const docmap = yield new __SDocmap().read();
                // read frontspec
                const frontspec = yield new __SFrontspec().read();
                // take some datas like packagejson, etc...
                const viewData = __deepMerge({
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
                }, (_a = finalParams.data) !== null && _a !== void 0 ? _a : {});
                if (!sourceObj.files.length) {
                    console.log(`<yellow>[build]</yellow> No files to build...`);
                    return resolve([]);
                }
                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = sourceObj.files[j];
                    const fileHash = __fileHashSync(filePath), finalFileHash = `${fileHash}-${paramsHash}-${settingsHash}`;
                    const buildObj = {
                        data: '',
                        outPath: sourceObj.outPath,
                    };
                    // if no outPath in the sourceObj
                    // AND that we have a inDir and an outDir
                    // set the outPath with that
                    if (!buildObj.outPath &&
                        sourceObj.inDir &&
                        sourceObj.outDir) {
                        buildObj.outPath = `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`;
                    }
                    // if no outPath in the sourceObj
                    // AND that we don't want to save the file
                    // set the outPath to the temp directory
                    if (!finalParams.save) {
                        buildObj.outPath = `${__packageCacheDir()}/s-markdown-builder/${sourceObj.inRelPath.replace(/\.\.\//gm, '')}`;
                    }
                    // load the specs alongside the view if exists
                    const specsDir = __path.dirname(filePath), specsFileName = `${__path.basename(filePath).split('.')[0]}.spec.json`;
                    const specsFilePath = `${specsDir}/${specsFileName}`;
                    if (__fs.existsSync(specsFilePath)) {
                        // const specsInstance = new __SSpecs();
                        // viewData.specs = await specsInstance.read(
                        //     specsFilePath,
                        // );
                    }
                    // remplace the extension in the output
                    const outputExtension = finalParams.target === 'html' ? 'html' : 'md';
                    buildObj.outPath = buildObj.outPath.replace(/\.(md)(\..*)?/, `.${outputExtension}`);
                    // check if need to rebuild the file or not
                    if (finalParams.cache &&
                        cacheHashes[`${filePath}-${outputExtension}`] ===
                            finalFileHash) {
                        if (this.settings.log.cache ||
                            this.settings.log.verbose) {
                            console.log(`<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${__path
                                .relative(__packageRootDir(), filePath)
                                .replace(/\.\.\//gm, '')}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`);
                        }
                        const outputFile = __SFile.new(buildObj.outPath);
                        const res = {
                            inputFile: __SFile.new(filePath),
                            outputFile: __SFile.new(buildObj.outPath),
                            code: outputFile.raw,
                        };
                        // add the file in the builded stack
                        buildedFiles.push(res);
                        // next file
                        continue;
                    }
                    let currentTransformedString = buildObj.data;
                    // init the res object
                    const res = {
                        inputFile: __SFile.new(filePath),
                        outputFile: __SFile.new(buildObj.outPath, {
                            checkExistence: false,
                        }),
                        code: '',
                    };
                    const viewRenderer = new __SViewRenderer();
                    const viewRendererRes = yield viewRenderer.render(filePath, viewData, {
                        dataFile: true,
                    });
                    // handle error in render
                    if (viewRendererRes.error) {
                        res.error = viewRendererRes.error;
                        buildedFiles.push(res);
                        continue;
                    }
                    currentTransformedString = (_b = viewRendererRes.value) !== null && _b !== void 0 ? _b : '';
                    // format codes
                    const codeFormatter = new __SCodeFormatter({
                        log: {
                            summary: false,
                        },
                    });
                    const codeMatches = currentTransformedString.match(/```[a-zA-Z0-9]+[^```]*```/gm);
                    if (codeMatches === null || codeMatches === void 0 ? void 0 : codeMatches.length) {
                        // @ts-ignore
                        for (let [i, value] of codeMatches.entries()) {
                            const language = value
                                .trim()
                                .match(/^```([a-zA-Z0-9]+)/)[1], code = value
                                .trim()
                                .replace(/^```[a-zA-Z0-9]+/, '')
                                .replace(/```$/, '');
                            const formatedCode = yield codeFormatter.formatInline(code, language);
                            // replacing the code
                            currentTransformedString =
                                currentTransformedString.replace(value, [
                                    `\`\`\`${language}`,
                                    formatedCode,
                                    '```',
                                ].join('\n'));
                        }
                    }
                    // handle spaces at line start
                    let doNotTouchline = false, inList = false;
                    currentTransformedString = currentTransformedString
                        .split('\n')
                        .map((line) => {
                        const trimedLine = line.trim();
                        // end of protected lines
                        if (doNotTouchline &&
                            trimedLine.match(/^[\`]{3}$/)) {
                            doNotTouchline = false;
                            return trimedLine;
                        }
                        if (inList &&
                            !trimedLine.match(/^(\-|[0-9]+\.)\s/)) {
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
                            ...currentTransformedString.matchAll(transformerObj.reg),
                        ];
                        for (let match of matches) {
                            const transformerResult = yield transformerObj.transform(match.slice(1), finalParams.target);
                            if (transformerResult) {
                                transformersResults.push(transformerResult);
                                currentTransformedString =
                                    currentTransformedString.replace(match[0], `<!-- transformer:${transformersResults.length - 1} -->`);
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
                        currentTransformedString = __marked(currentTransformedString, {});
                    }
                    else if (finalParams.target === 'markdown') {
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
                            currentTransformedString.replace(`<!-- transformer:${i} -->`, transformersResults[i]);
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
                        console.log(`<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
                    }
                    // save the file hash
                    // it will be saved at the end only if the build
                    // is a success...
                    cacheHashes[`${filePath}-${outputExtension}`] =
                        finalFileHash;
                    // write the cache only at the end if the build
                    // is a success
                    __writeFileSync(cacheFilePath, JSON.stringify(cacheHashes, null, 4));
                }
                resolve(buildedFiles);
            }));
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0UsT0FBTyxFQUNILGNBQWMsRUFDZCxZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixrQkFBa0IsR0FDckIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQUV0RyxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sZUFBZSxNQUFNLG1CQUFtQixDQUFDO0FBdUZoRCxN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