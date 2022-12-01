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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
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
const package_1 = require("@coffeekraken/sugar/package");
const fs_2 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const marked_1 = require("marked");
const path_2 = __importDefault(require("path"));
const SMarkdownBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SMarkdownBuilderBuildParamsInterface"));
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
            cache: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._loaded = false;
        // register layouts from config
        const config = s_sugar_config_1.default.get('markdownBuilder');
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
            return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`,
                    });
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
                // calculate final settings and params hash
                const hashSettings = Object.assign({}, this.settings);
                delete hashSettings.metas;
                const settingsHash = (0, object_1.__objectHash)(hashSettings), paramsHash = (0, object_1.__objectHash)(finalParams);
                // cache file path
                const cacheFilePath = `${(0, path_1.__packageCacheDir)()}/s-markdown-builder/cacheHashes.json`;
                // load cache file if wanted
                let cacheHashes = {};
                if (this.settings.cache) {
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
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting markdown Build`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath}</cyan>`,
                });
                if (sourceObj.outRelDir) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`,
                    });
                }
                const docmap = yield new s_docmap_1.default().read();
                // take some datas like packagejson, etc...
                const viewData = (0, object_1.__deepMerge)({
                    config: s_sugar_config_1.default.get('.'),
                    flatConfig: (0, object_1.__flatten)(s_sugar_config_1.default.get('.')),
                    settings: this.settings,
                    params,
                    packageJson: (0, package_1.__packageJsonSync)(),
                    docMenu: docmap.menu,
                    docmap,
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
                        buildObj.outPath = `${(0, path_1.__packageCacheDir)()}/s-markdown-builder/${sourceObj.inRelPath}`;
                    }
                    // remplace the extension in the output
                    const outputExtension = finalParams.target === 'html' ? 'html' : 'md';
                    buildObj.outPath = buildObj.outPath.replace(/\.(md)(\..*)?/, `.${outputExtension}`);
                    // check if need to rebuild the file or not
                    if (cacheHashes[`${filePath}-${outputExtension}`] ===
                        finalFileHash) {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), filePath)}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`,
                        });
                        const outputFile = s_file_1.default.new(buildObj.outPath);
                        const res = {
                            inputFile: s_file_1.default.new(filePath),
                            outputFile: s_file_1.default.new(buildObj.outPath),
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
                    const viewRenderer = new s_view_renderer_1.default();
                    const viewRendererRes = yield viewRenderer.render(filePath, viewData);
                    currentTransformedString = (_b = viewRendererRes.value) !== null && _b !== void 0 ? _b : '';
                    // format codes
                    const codeFormatter = new s_code_formatter_1.default();
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
                    // add the "warning" on top of the file
                    currentTransformedString = [
                        `<!-- This file has been generated using`,
                        `     the "@coffeekraken/s-markdown-builder" package.`,
                        '     !!! Do not edit it directly... -->',
                        '',
                        currentTransformedString,
                    ].join('\n');
                    // write file on disk
                    (0, fs_1.__writeFileSync)(buildObj.outPath, currentTransformedString);
                    if (finalParams.save) {
                        const file = new s_file_1.default(buildObj.outPath);
                        emit('log', {
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                    const res = {
                        inputFile: s_file_1.default.new(filePath),
                        outputFile: s_file_1.default.new(buildObj.outPath),
                        code: currentTransformedString,
                    };
                    // write the cache only at the end if the build
                    // is a success
                    (0, fs_1.__writeFileSync)(cacheFilePath, JSON.stringify(cacheHashes, null, 4));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxrRUFBMkM7QUFDM0Msa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBRTFELG9GQUE0RDtBQUU1RCxzRkFBOEQ7QUFDOUQsbUVBQTBFO0FBRTFFLG1EQUErRTtBQUUvRSwrQ0FNZ0M7QUFDaEMsdURBSW9DO0FBQ3BDLHlEQUFnRTtBQUNoRSw0Q0FBc0I7QUFDdEIsNERBQXNDO0FBQ3RDLG1DQUE0QztBQUM1QyxnREFBMEI7QUFDMUIsNEhBQXNHO0FBdUV0RyxNQUFxQixnQkFBaUIsU0FBUSxtQkFBVTtJQXNDcEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTZDO1FBQ3JELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUUsSUFBSTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFnQk4sWUFBTyxHQUFHLEtBQUssQ0FBQztRQWRaLCtCQUErQjtRQUMvQixNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3JELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDekQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0QsYUFBYTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixDQUNqQyxlQUFlLEVBQ2YsZUFBZSxDQUNsQixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7U0FD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