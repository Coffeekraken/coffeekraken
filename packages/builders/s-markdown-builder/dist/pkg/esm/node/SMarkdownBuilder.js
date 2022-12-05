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
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import __SCodeFormatter from '@coffeekraken/s-code-formatter';
import { __getCoffeekrakenMetas } from '@coffeekraken/sugar/coffeekraken';
import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';
import { __fileHash, __folderPath, __readJsonSync, __writeFileSync, __writeTmpFileSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge, __flatten, __objectHash, } from '@coffeekraken/sugar/object';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import __fs from 'fs';
import __handlebars from 'handlebars';
import { marked as __marked } from 'marked';
import __path from 'path';
import __SMarkdownBuilderBuildParamsInterface from './interface/SMarkdownBuilderBuildParamsInterface';
import __codeTransformer from './transformers/code';
import __ogTransformer from './transformers/og';
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
            transformers: [__ogTransformer, __codeTransformer],
            log: {
                summary: true,
                preset: true,
                cache: false,
                verbose: __SEnv.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
        // // load package transformers
        // const transformersFolderPath = `${__dirname()}/transformers`;
        // __fs.readdirSync(transformersFolderPath).forEach(async (path) => {
        //     const transformerPath = `${transformersFolderPath}/${path}`;
        //     const transformer = await import(transformerPath);
        //     this.settings.transformers.push(transformer);
        //     console.log(this.settings.transformers);
        // });
    }
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
                    if (this.settings.log.preset) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                        });
                    }
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
            return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const handlebars = __handlebars.create();
                // load
                yield this._load();
                const finalParams = __deepMerge(
                // @ts-ignore
                __SMarkdownBuilderBuildParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
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
                    sourceObj.files = __SGlob.resolve(path, {
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
                        __path.relative(process.cwd(), sourceObj.outDir) ||
                            '.';
                }
                if (this.settings.log.summary) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Starting markdown Build`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`,
                    });
                    if (sourceObj.outRelDir) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`,
                        });
                    }
                }
                const docmap = yield new __SDocmap().read();
                // take some datas like packagejson, etc...
                const viewData = __deepMerge({
                    config: __SSugarConfig.get('.'),
                    flatConfig: __flatten(__SSugarConfig.get('.')),
                    settings: this.settings,
                    params,
                    packageJson: __packageJsonSync(),
                    docMenu: docmap.menu,
                    docmap,
                    ck: __getCoffeekrakenMetas(),
                    time: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDay(),
                    },
                }, (_a = finalParams.data) !== null && _a !== void 0 ? _a : {});
                if (!sourceObj.files.length) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> No files to build...`,
                    });
                    return resolve([]);
                }
                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = sourceObj.files[j];
                    const fileHash = __fileHash(filePath), finalFileHash = `${fileHash}-${paramsHash}-${settingsHash}`;
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
                    // remplace the extension in the output
                    const outputExtension = finalParams.target === 'html' ? 'html' : 'md';
                    buildObj.outPath = buildObj.outPath.replace(/\.(md)(\..*)?/, `.${outputExtension}`);
                    // check if need to rebuild the file or not
                    if (finalParams.cache &&
                        cacheHashes[`${filePath}-${outputExtension}`] ===
                            finalFileHash) {
                        if (this.settings.log.cache ||
                            this.settings.log.verbose) {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${__path
                                    .relative(__packageRootDir(), filePath)
                                    .replace(/\.\.\//gm, '')}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`,
                            });
                        }
                        const outputFile = __SFile.new(buildObj.outPath);
                        const res = {
                            inputFile: __SFile.new(filePath),
                            outputFile: __SFile.new(buildObj.outPath),
                            code: outputFile.content,
                        };
                        // add the file in the builded stack
                        buildedFiles.push(res);
                        continue;
                    }
                    else {
                        // save the file hash
                        // it will be saved at the end only if the build
                        // is a success...
                        cacheHashes[`${filePath}-${outputExtension}`] =
                            finalFileHash;
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
                    const viewRendererRes = yield pipe(viewRenderer.render(filePath, viewData));
                    // handle error in render
                    if (viewRendererRes.error) {
                        res.error = viewRendererRes.error;
                        buildedFiles.push(res);
                        continue;
                    }
                    currentTransformedString = (_b = viewRendererRes.value) !== null && _b !== void 0 ? _b : '';
                    // format codes
                    const codeFormatter = new __SCodeFormatter();
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
                        while ((m = transformerObj.reg.exec(currentTransformedString))) {
                            const transformerResult = yield transformerObj.transform(m.slice(1), finalParams.target);
                            if (transformerResult) {
                                transformersResults.push(transformerResult);
                                currentTransformedString =
                                    currentTransformedString.replace(m[0], `<!-- transformer:${transformersResults.length - 1} -->`);
                            }
                        }
                    }
                    // marked if html is the target
                    if (finalParams.target === 'html') {
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
                    // write file on disk
                    __writeFileSync(buildObj.outPath, currentTransformedString);
                    if (finalParams.save) {
                        const file = new __SFile(buildObj.outPath);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    // write the cache only at the end if the build
                    // is a success
                    __writeFileSync(cacheFilePath, JSON.stringify(cacheHashes, null, 4));
                    // add the file in the builded stack
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0UsT0FBTyxFQUNILFVBQVUsRUFDVixZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixrQkFBa0IsR0FDckIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEdBQ2YsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNDQUFzQyxNQUFNLGtE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