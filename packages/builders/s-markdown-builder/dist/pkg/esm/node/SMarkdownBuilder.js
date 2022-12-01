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
            cache: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
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
                if (this.settings.cache) {
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
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting markdown Build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath}</cyan>`,
                });
                if (sourceObj.outRelDir) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`,
                    });
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
                        buildObj.outPath = `${__packageCacheDir()}/s-markdown-builder/${sourceObj.inRelPath}`;
                    }
                    // remplace the extension in the output
                    const outputExtension = finalParams.target === 'html' ? 'html' : 'md';
                    buildObj.outPath = buildObj.outPath.replace(/\.(md)(\..*)?/, `.${outputExtension}`);
                    // check if need to rebuild the file or not
                    if (cacheHashes[`${filePath}-${outputExtension}`] ===
                        finalFileHash) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${__path.relative(__packageRootDir(), filePath)}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`,
                        });
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
                    const viewRenderer = new __SViewRenderer();
                    const viewRendererRes = yield viewRenderer.render(filePath, viewData);
                    currentTransformedString = (_b = viewRendererRes.value) !== null && _b !== void 0 ? _b : '';
                    // format codes
                    const codeFormatter = new __SCodeFormatter();
                    const codeMatches = currentTransformedString.match(/```[a-zA-Z0-9]+[^```]*```/gm);
                    if (codeMatches.length) {
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
                    // add the "warning" on top of the file
                    currentTransformedString = [
                        `<!-- This file has been generated using`,
                        `     the "@coffeekraken/s-markdown-builder" package.`,
                        '     !!! Do not edit it directly... -->',
                        '',
                        currentTransformedString,
                    ].join('\n');
                    // write file on disk
                    __writeFileSync(buildObj.outPath, currentTransformedString);
                    if (finalParams.save) {
                        const file = new __SFile(buildObj.outPath);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    const res = {
                        inputFile: __SFile.new(filePath),
                        outputFile: __SFile.new(buildObj.outPath),
                        code: currentTransformedString,
                    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFMUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFL0UsT0FBTyxFQUNILFVBQVUsRUFDVixZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixrQkFBa0IsR0FDckIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEdBQ2YsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLElBQUksUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHNDQUFzQyxNQUFNLGtEQUFrRCxDQUFDO0FBdUV0RyxNQUFNLENBQUMsT0FBTyxP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