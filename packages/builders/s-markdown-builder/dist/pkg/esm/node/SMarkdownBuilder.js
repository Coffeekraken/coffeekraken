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
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface.js';
import __codeTransformer from './transformers/code.js';
import __ogTransformer from './transformers/og.js';
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
                var _a;
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    if ((_a = this.settings.log) === null || _a === void 0 ? void 0 : _a.preset) {
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
                var _b, _c, _d, _e, _f;
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
                    console.log(`<red>[SMarkdownBuilder]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
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
                if ((_b = this.settings.log) === null || _b === void 0 ? void 0 : _b.summary) {
                    console.log(`<yellow>[build]</yellow> Starting markdown Build`);
                    console.log(`<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`);
                    if (sourceObj.outRelDir && this.settings.save) {
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
                }, (_c = finalParams.data) !== null && _c !== void 0 ? _c : {});
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
                        if (((_d = this.settings.log) === null || _d === void 0 ? void 0 : _d.cache) ||
                            ((_e = this.settings.log) === null || _e === void 0 ? void 0 : _e.verbose)) {
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
                        throw new Error(viewRendererRes.error);
                    }
                    currentTransformedString = (_f = viewRendererRes.value) !== null && _f !== void 0 ? _f : '';
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
                // check if we need to print the output
                if (finalParams.print) {
                    buildedFiles.forEach((res) => {
                        console.log(res.code);
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0UsT0FBTyxFQUNILGNBQWMsRUFDZCxZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixrQkFBa0IsR0FDckIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUsTUFBTSxJQUFJLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxzQ0FBc0MsTUFBTSxxREFBcUQsQ0FBQztBQUV6RyxPQUFPLGlCQUFpQixNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sZUFBZSxNQUFNLHNCQUFzQixDQUFDO0FBcUZuRCxN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