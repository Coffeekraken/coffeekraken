"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_docmap_1 = __importDefault(require("@coffeekraken/s-docmap"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const s_code_formatter_1 = __importDefault(require("@coffeekraken/s-code-formatter"));
const coffeekraken_1 = require("@coffeekraken/sugar/coffeekraken");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const marked_1 = require("marked");
const path_2 = __importDefault(require("path"));
const SMarkdownBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SMarkdownBuilderBuildParamsInterface"));
const code_1 = __importDefault(require("./transformers/code"));
const og_1 = __importDefault(require("./transformers/og"));
class SMarkdownBuilder extends s_builder_1.default {
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
        super((0, object_1.__deepMerge)({
            transformers: [og_1.default, code_1.default],
            log: {
                summary: true,
                preset: true,
                cache: false,
                verbose: s_env_1.default.is('verbose'),
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
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
            return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    if (this.settings.log.preset) {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                        });
                    }
                    const newParams = ((0, object_1.__deepMerge)(
                    // @ts-ignore
                    SMarkdownBuilderBuildParamsInterface_1.default.defaults(), s_sugar_config_1.default.get(`markdownBuilder.presets.${preset}`)));
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
            return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const handlebars = handlebars_1.default.create();
                // load
                yield this._load();
                const finalParams = (0, object_1.__deepMerge)(
                // @ts-ignore
                SMarkdownBuilderBuildParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {});
                finalParams.cache = false;
                // calculate final settings and params hash
                const hashSettings = Object.assign({}, this.settings);
                delete hashSettings.metas;
                const settingsHash = (0, object_1.__objectHash)(hashSettings), paramsHash = (0, object_1.__objectHash)(finalParams);
                // cache file path
                const cacheFilePath = `${(0, path_1.__packageCacheDir)()}/s-markdown-builder/cacheHashes.json`;
                // load cache file if wanted
                let cacheHashes = {};
                if (finalParams.cache) {
                    if (!fs_2.default.existsSync(cacheFilePath)) {
                        (0, fs_1.__writeFileSync)(cacheFilePath, '{}');
                    }
                    cacheHashes = (0, fs_1.__readJsonSync)(cacheFilePath);
                }
                const buildedFiles = [];
                // handle raw code passed
                if (finalParams.inRaw) {
                    finalParams.inPath = (0, fs_1.__writeTmpFileSync)(finalParams.inRaw);
                    // @ts-ignore
                    delete finalParams.inRaw;
                }
                // handle in path
                if (finalParams.inPath) {
                    finalParams.inDir = (0, fs_1.__folderPath)(finalParams.inPath);
                    finalParams.glob = path_2.default.relative(finalParams.inDir, finalParams.inPath);
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
                if (fs_2.default.existsSync(path)) {
                    sourceObj.inRelPath = path_2.default.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files.push(path);
                }
                else if (s_glob_1.default.isGlob(path)) {
                    sourceObj.inRelPath = path_2.default.relative(process.cwd(), path);
                    // @ts-ignore
                    sourceObj.files = s_glob_1.default.resolve(path, {
                        SFile: false,
                    });
                }
                else {
                    throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
                }
                if (sourceObj.outPath) {
                    sourceObj.outRelDir =
                        path_2.default.relative(process.cwd(), sourceObj.outPath) ||
                            '.';
                }
                else if (sourceObj.outDir) {
                    sourceObj.outRelDir =
                        path_2.default.relative(process.cwd(), sourceObj.outDir) ||
                            '.';
                }
                if (this.settings.log.summary) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Starting markdown Build`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`,
                    });
                    if (sourceObj.outRelDir) {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`,
                        });
                    }
                }
                // read docmap
                const docmap = yield new s_docmap_1.default().read();
                // read frontspec
                const frontspec = yield new s_frontspec_1.default().read();
                // take some datas like packagejson, etc...
                const viewData = (0, object_1.__deepMerge)({
                    config: s_sugar_config_1.default.get('.'),
                    settings: this.settings,
                    params,
                    docMenu: docmap.menu,
                    docmap,
                    frontspec,
                    ck: (0, coffeekraken_1.__getCoffeekrakenMetas)(),
                    time: {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDay(),
                    },
                }, (_a = finalParams.data) !== null && _a !== void 0 ? _a : {});
                if (!sourceObj.files.length) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[build]</yellow> No files to build...`,
                    });
                    return resolve([]);
                }
                for (let j = 0; j < sourceObj.files.length; j++) {
                    const filePath = sourceObj.files[j];
                    const fileHash = (0, fs_1.__fileHash)(filePath), finalFileHash = `${fileHash}-${paramsHash}-${settingsHash}`;
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
                        buildObj.outPath = `${sourceObj.outDir}/${path_2.default.relative(sourceObj.inDir, filePath)}`;
                    }
                    // if no outPath in the sourceObj
                    // AND that we don't want to save the file
                    // set the outPath to the temp directory
                    if (!finalParams.save) {
                        buildObj.outPath = `${(0, path_1.__packageCacheDir)()}/s-markdown-builder/${sourceObj.inRelPath.replace(/\.\.\//gm, '')}`;
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
                                type: s_log_1.default.TYPE_INFO,
                                value: `<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${path_2.default
                                    .relative((0, path_1.__packageRootDir)(), filePath)
                                    .replace(/\.\.\//gm, '')}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`,
                            });
                        }
                        const outputFile = s_file_1.default.new(buildObj.outPath);
                        const res = {
                            inputFile: s_file_1.default.new(filePath),
                            outputFile: s_file_1.default.new(buildObj.outPath),
                            code: outputFile.content,
                        };
                        // add the file in the builded stack
                        buildedFiles.push(res);
                        // next file
                        continue;
                    }
                    let currentTransformedString = buildObj.data;
                    // init the res object
                    const res = {
                        inputFile: s_file_1.default.new(filePath),
                        outputFile: s_file_1.default.new(buildObj.outPath, {
                            checkExistence: false,
                        }),
                        code: '',
                    };
                    const viewRenderer = new s_view_renderer_1.default();
                    const viewRendererRes = yield pipe(viewRenderer.render(filePath, viewData));
                    // handle error in render
                    if (viewRendererRes.error) {
                        res.error = viewRendererRes.error;
                        buildedFiles.push(res);
                        continue;
                    }
                    currentTransformedString = (_b = viewRendererRes.value) !== null && _b !== void 0 ? _b : '';
                    // format codes
                    const codeFormatter = new s_code_formatter_1.default();
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
                        currentTransformedString = (0, marked_1.marked)(currentTransformedString, {});
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
                    (0, fs_1.__writeFileSync)(buildObj.outPath, currentTransformedString);
                    if (finalParams.save) {
                        const file = new s_file_1.default(buildObj.outPath);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    // save the file hash
                    // it will be saved at the end only if the build
                    // is a success...
                    cacheHashes[`${filePath}-${outputExtension}`] =
                        finalFileHash;
                    // write the cache only at the end if the build
                    // is a success
                    (0, fs_1.__writeFileSync)(cacheFilePath, JSON.stringify(cacheHashes, null, 4));
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
exports.default = SMarkdownBuilder;
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
SMarkdownBuilder._marked = marked_1.marked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLDRFQUFxRDtBQUNyRCxrRUFBMkM7QUFDM0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFFMUQsb0ZBQTREO0FBRTVELHNGQUE4RDtBQUM5RCxtRUFBMEU7QUFFMUUsbURBQStFO0FBRS9FLCtDQU1nQztBQUNoQyx1REFBdUU7QUFDdkUsNENBQXNCO0FBQ3RCLDREQUFzQztBQUN0QyxtQ0FBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLDRIQUFzRztBQUV0RywrREFBb0Q7QUFDcEQsMkRBQWdEO0FBc0ZoRCxNQUFxQixnQkFBaUIsU0FBUSxtQkFBVTtJQXNDcEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTZDO1FBQ3JELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxZQUFZLEVBQUUsQ0FBQyxZQUFlLEVBQUUsY0FBaUIsQ0FBQztZQUNsRCxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLGVBQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ2hDO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUdOLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFGaEIsQ0FBQztJQTNERDs7T0FFRztJQUVIOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsZUFBdUI7UUFDN0QsYUFBYTtRQUNiLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUM7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