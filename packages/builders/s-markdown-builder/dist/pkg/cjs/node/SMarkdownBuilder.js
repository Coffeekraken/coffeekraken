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
const SMarkdownBuilderBuildParamsInterface_js_1 = __importDefault(require("./interface/SMarkdownBuilderBuildParamsInterface.js"));
const code_js_1 = __importDefault(require("./transformers/code.js"));
const og_js_1 = __importDefault(require("./transformers/og.js"));
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
            transformers: [og_js_1.default, code_js_1.default],
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
                    SMarkdownBuilderBuildParamsInterface_js_1.default.defaults(), s_sugar_config_1.default.get(`markdownBuilder.presets.${preset}`));
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
                SMarkdownBuilderBuildParamsInterface_js_1.default.defaults(), params !== null && params !== void 0 ? params : {});
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
                    console.log(`<red>[SMarkdownBuilder]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELHNFQUErQztBQUMvQyxnRUFBeUM7QUFDekMsa0VBQTJDO0FBQzNDLDRFQUFxRDtBQUNyRCxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELG9FQUE2QztBQUU3QyxvRkFBNEQ7QUFFNUQsc0ZBQThEO0FBQzlELG1FQUEwRTtBQUUxRSxtREFBK0U7QUFFL0UsK0NBTWdDO0FBQ2hDLHVEQUF1RTtBQUN2RSw0Q0FBc0I7QUFDdEIsbUNBQTRDO0FBQzVDLGdEQUEwQjtBQUMxQixrSUFBeUc7QUFFekcscUVBQXVEO0FBQ3ZELGlFQUFtRDtBQXNGbkQsTUFBcUIsZ0JBQWlCLFNBQVEsbUJBQVU7SUFHcEQ7O09BRUc7SUFFSDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBWSxFQUFFLGVBQXVCO1FBQzdELGFBQWE7UUFDYixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDO0lBQ3pELENBQUM7SUFlRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNkM7UUFDckQsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQztZQUNsRCxHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLGVBQU0sQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ2hDO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUdOLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFGaEIsQ0FBQztJQUdLLEtBQUs7O1lBQ1As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