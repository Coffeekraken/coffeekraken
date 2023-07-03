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
                var _a;
                const buildedPresets = {};
                for (let i = 0; i < params.preset.length; i++) {
                    const preset = params.preset[i];
                    if ((_a = this.settings.log) === null || _a === void 0 ? void 0 : _a.preset) {
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
                var _b, _c, _d, _e, _f;
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
                if ((_b = this.settings.log) === null || _b === void 0 ? void 0 : _b.summary) {
                    console.log(`<yellow>[build]</yellow> Starting markdown Build`);
                    console.log(`<yellow>○</yellow> Input       : <cyan>${sourceObj.inRelPath.replace(/\.\.\//gm, '')}</cyan>`);
                    if (sourceObj.outRelDir && this.settings.save) {
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
                }, (_c = finalParams.data) !== null && _c !== void 0 ? _c : {});
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
                        if (((_d = this.settings.log) === null || _d === void 0 ? void 0 : _d.cache) ||
                            ((_e = this.settings.log) === null || _e === void 0 ? void 0 : _e.verbose)) {
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
                    currentTransformedString = (_f = viewRendererRes.value) !== null && _f !== void 0 ? _f : '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLDRFQUFxRDtBQUNyRCxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELG9FQUE2QztBQUU3QyxvRkFBNEQ7QUFFNUQsc0ZBQThEO0FBQzlELG1FQUEwRTtBQUUxRSxtREFBK0U7QUFFL0UsK0NBTWdDO0FBQ2hDLHVEQUF1RTtBQUN2RSw0Q0FBc0I7QUFDdEIsbUNBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQiw0SEFBc0c7QUFFdEcsK0RBQW9EO0FBQ3BELDJEQUFnRDtBQXNGaEQsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFHcEQ7O09BRUc7SUFFSDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBWSxFQUFFLGVBQXVCO1FBQzdELGFBQWE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQ3pELENBQUM7SUFlRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNkM7UUFDckQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFlBQVksRUFBRSxDQUFDLFlBQWUsRUFBRSxjQUFpQixDQUFDO1lBQ2xELEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsSUFBSTtnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUUsZUFBTSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDaEM7U0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBR04sWUFBTyxHQUFHLEtBQUssQ0FBQztJQUZoQixDQUFDO0lBR0ssS0FBSzs7WUFDUCxJ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