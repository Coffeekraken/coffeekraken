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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const s_code_formatter_1 = __importDefault(require("@coffeekraken/s-code-formatter"));
const coffeekraken_1 = require("@coffeekraken/sugar/coffeekraken");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
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
                    const newParams = (0, object_1.__deepMerge)(
                    // @ts-ignore
                    SMarkdownBuilderBuildParamsInterface_1.default.defaults(), s_sugar_config_1.default.get(`markdownBuilder.presets.${preset}`));
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
                        path_2.default.relative(process.cwd(), sourceObj.outDir) || '.';
                }
                if (this.settings.log.summary) {
                    console.log(`<yellow>[build]</yellow> Starting markdown Build`);
                    console.log(`<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`);
                    if (sourceObj.outRelDir) {
                        console.log(`<yellow>○</yellow> Output      : <cyan>${sourceObj.outRelDir}</cyan>`);
                    }
                }
                // read docmap
                const docmap = yield new s_docmap_1.default().read();
                // read frontspec
                const frontspec = yield new s_frontspec_1.default().read();
                // take some datas like packagejson, etc...
                const viewData = (0, object_1.__deepMerge)({
                    theme: s_theme_1.default.get('.'),
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
                    console.log(`<yellow>[build]</yellow> No files to build...`);
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
                    // load the specs alongside the view if exists
                    const specsDir = path_2.default.dirname(filePath), specsFileName = `${path_2.default.basename(filePath).split('.')[0]}.spec.json`;
                    const specsFilePath = `${specsDir}/${specsFileName}`;
                    if (fs_2.default.existsSync(specsFilePath)) {
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
                            console.log(`<magenta>[cache]</magenta> No need to rebuild the file "<cyan>${path_2.default
                                .relative((0, path_1.__packageRootDir)(), filePath)
                                .replace(/\.\.\//gm, '')}</cyan>" for the "<yellow>${finalParams.target}</yellow>" target`);
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
                    const viewRendererRes = yield viewRenderer.render(filePath, viewData);
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
                        console.log(`<green>[save]</green> File "<cyan>${file.relPath}</cyan>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
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
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLDRFQUFxRDtBQUNyRCxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELG9FQUE2QztBQUU3QyxvRkFBNEQ7QUFFNUQsc0ZBQThEO0FBQzlELG1FQUEwRTtBQUUxRSxtREFBK0U7QUFFL0UsK0NBTWdDO0FBQ2hDLHVEQUF1RTtBQUN2RSw0Q0FBc0I7QUFDdEIsbUNBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQiw0SEFBc0c7QUFFdEcsK0RBQW9EO0FBQ3BELDJEQUFnRDtBQXNGaEQsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFzQ3BEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUE2QztRQUNyRCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksWUFBWSxFQUFFLENBQUMsWUFBZSxFQUFFLGNBQWlCLENBQUM7WUFDbEQsR0FBRyxFQUFFO2dCQUNELE9BQU8sRUFBRSxJQUFJO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxlQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUNoQztTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFHTixZQUFPLEdBQUcsS0FBSyxDQUFDO0lBRmhCLENBQUM7SUEzREQ7O09BRUc7SUFFSDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBWSxFQUFFLGVBQXVCO1FBQzdELGFBQWE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQ3pELENBQUM7SUEwQ0ssS0FBSzs7WUFD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