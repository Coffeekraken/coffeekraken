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
                    sourceObj.files = s_glob_1.default.resolveSync(path, {
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
                    const fileHash = (0, fs_1.__fileHashSync)(filePath), finalFileHash = `${fileHash}-${paramsHash}-${settingsHash}`;
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
                        inputFile: s_file_1.default.new(filePath),
                        outputFile: s_file_1.default.new(buildObj.outPath, {
                            checkExistence: false,
                        }),
                        code: '',
                    };
                    const viewRenderer = new s_view_renderer_1.default();
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
                    const codeFormatter = new s_code_formatter_1.default({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLDRFQUFxRDtBQUNyRCxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELG9FQUE2QztBQUU3QyxvRkFBNEQ7QUFFNUQsc0ZBQThEO0FBQzlELG1FQUEwRTtBQUUxRSxtREFBK0U7QUFFL0UsK0NBTWdDO0FBQ2hDLHVEQUF1RTtBQUN2RSw0Q0FBc0I7QUFDdEIsbUNBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQiw0SEFBc0c7QUFFdEcsK0RBQW9EO0FBQ3BELDJEQUFnRDtBQXVGaEQsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFHcEQ7O09BRUc7SUFFSDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBWSxFQUFFLGVBQXVCO1FBQzdELGFBQWE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQ3pELENBQUM7SUFlRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNkM7UUFDckQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFlBQVksRUFBRSxDQUFDLFlBQWUsRUFBRSxjQUFpQixDQUFDO1lBQ2xELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUUsZUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBR04sWUFBTyxHQUFHLEtBQUssQ0FBQztJQUZoQixDQUFDO0lBR0ssS0FBSzs7WUFDUCxJ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