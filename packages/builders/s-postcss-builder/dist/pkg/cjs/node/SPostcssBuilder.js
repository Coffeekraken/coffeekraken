"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const resolvePackagePath_1 = __importDefault(require("@coffeekraken/sugar/node/esm/resolvePackagePath"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const expandPleasantCssClassnames_1 = __importDefault(require("@coffeekraken/sugar/shared/html/expandPleasantCssClassnames"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const __csso = __importStar(require("csso"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const purgecss_1 = require("purgecss");
const SPostcssBuilderSettingsInterface_1 = __importDefault(require("./interface/SPostcssBuilderSettingsInterface"));
class SPostcssBuilder extends s_builder_1.default {
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
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SPostcssBuilderSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISPostcssBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let finalCss;
            // handle prod shortcut
            if (params.prod) {
                params.minify = true;
                // params.purge = true;
                s_sugar_config_1.default.set('postcssSugarPlugin.cache', false);
            }
            // minify using cssnano
            // if (params.minify) {
            //     this.settings.postcss.plugins.push('cssnano');
            // }
            // handle input
            let src = params.input, from = undefined;
            try {
                src = fs_1.default.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            }
            catch (e) { }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Starting Postcss Build`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Target      : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            if (params.output) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Output      : <cyan>${path_1.default.relative(process.cwd(), params.output)}</cyan>`,
                });
            }
            if (params.saveDev && params.output) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Output dev  : <cyan>${path_1.default.relative(process.cwd(), params.output.replace(/\.css/, '.dev.css'))}</cyan>`,
                });
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Minify      : ${params.minify
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Purge       : ${params.purge
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Plugins     :`,
            });
            this.settings.postcss.plugins.forEach((pluginName) => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>|------------</yellow> : ${pluginName}`,
                });
                if (pluginName === '@coffeekraken/s-postcss-sugar-plugin') {
                    const postcssSugarPluginConfig = s_sugar_config_1.default.get('postcssSugarPlugin');
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `              <yellow>○</yellow> Cache                     : ${postcssSugarPluginConfig.cache
                            ? '<green>true</green>'
                            : '<red>false</red>'}`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `              <yellow>○</yellow> Exclude by types          : ${postcssSugarPluginConfig.excludeByTypes.length
                            ? `<yellow>${postcssSugarPluginConfig.excludeByTypes.join(',')}</yellow>`
                            : `<red>none</red>`}`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `              <yellow>○</yellow> Exclude comments by types : ${postcssSugarPluginConfig.excludeCommentByTypes
                            .length
                            ? `<yellow>${postcssSugarPluginConfig.excludeCommentByTypes.join(',')}</yellow>`
                            : `<red>none</red>`}`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `              <yellow>○</yellow> Exclude code by types     : ${postcssSugarPluginConfig.excludeCodeByTypes
                            .length
                            ? `<yellow>${postcssSugarPluginConfig.excludeCodeByTypes.join(',')}</yellow>`
                            : `<red>none</red>`}`,
                    });
                }
            });
            // resolve plugins paths
            const plugins = [];
            for (let i = 0; i < this.settings.postcss.plugins.length; i++) {
                const p = this.settings.postcss.plugins[i];
                if (typeof p === 'string') {
                    const { default: plugin } = yield Promise.resolve().then(() => __importStar(require(p)));
                    const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                    const options = (_b = this.settings.postcss.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                    plugins.push(fn(Object.assign({ target: params.prod
                            ? 'production'
                            : 'development' }, options)));
                }
                else {
                    plugins.push(p);
                }
            }
            const compileDuration = new s_duration_1.default();
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[postcss]</yellow> Compiling css...`,
            });
            // build postcss
            let result;
            try {
                result = yield (0, postcss_1.default)(plugins).process(src !== null && src !== void 0 ? src : '', {
                    from,
                });
            }
            catch (e) {
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: e.toString(),
                });
                throw e;
            }
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${compileDuration.end().formatedDuration}</yellow>`,
            });
            finalCss = result.css;
            // saveDev
            if (params.saveDev && params.output) {
                (0, writeFileSync_1.default)(params.output.replace(/\.css$/, '.dev.css'), finalCss);
                const file = new s_file_1.default(params.output.replace(/\.css$/, '.dev.css'));
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                });
            }
            const purgeDuration = new s_duration_1.default();
            // purge if needed
            if (params.purge) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[purge]</green> Purging unused css`,
                });
                const purgeCssSettings = Object.assign(Object.assign({}, this.settings.purgecss), { safelist: {
                        standard: [],
                        deep: [],
                        greedy: [],
                        keyframes: [],
                        variables: [],
                    } });
                // get content to use
                const content = [];
                const globs = [];
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[purge]</yellow> Searching for "<cyan>.spec.js</cyan>" files to grab "<magenta>purgecss</magenta>" special configs`,
                });
                function mergePurgecssSettings(purgecss) {
                    if (!purgecss.safelist)
                        return;
                    if (Array.isArray(purgecss.safelist)) {
                        purgeCssSettings.safelist.standard = [
                            ...purgeCssSettings.safelist.standard,
                            ...purgecss.safelist,
                        ];
                    }
                    else {
                        if (Array.isArray(purgecss.safelist.standard)) {
                            purgeCssSettings.safelist.standard = [
                                ...purgeCssSettings.safelist.standard,
                                ...purgecss.safelist.standard,
                            ];
                        }
                        if (Array.isArray(purgecss.safelist.deep)) {
                            purgeCssSettings.safelist.deep = [
                                ...purgeCssSettings.safelist.deep,
                                ...purgecss.safelist.deep,
                            ];
                        }
                        if (Array.isArray(purgecss.safelist.greedy)) {
                            purgeCssSettings.safelist.greedy = [
                                ...purgeCssSettings.safelist.greedy,
                                ...purgecss.safelist.greedy,
                            ];
                        }
                        if (Array.isArray(purgecss.safelist.keyframes)) {
                            purgeCssSettings.safelist.keyframes = [
                                ...purgeCssSettings.safelist.keyframes,
                                ...purgecss.safelist.keyframes,
                            ];
                        }
                        if (Array.isArray(purgecss.safelist.variables)) {
                            purgeCssSettings.safelist.variables = [
                                ...purgeCssSettings.safelist.variables,
                                ...purgecss.safelist.variables,
                            ];
                        }
                    }
                }
                const packageJson = (0, jsonSync_1.default)();
                if (packageJson.dependencies) {
                    for (let packageName of Object.keys(packageJson.dependencies)) {
                        try {
                            const packagePath = (0, resolvePackagePath_1.default)(packageName);
                            if (!packagePath)
                                continue;
                            const specsFiles = s_glob_1.default.resolve(`${packagePath}/**/*.spec.js`);
                            for (let file of specsFiles) {
                                try {
                                    // @ts-ignore
                                    if (!fs_1.default.existsSync(file.path))
                                        continue;
                                    // @ts-ignore
                                    const purgecss = (yield Promise.resolve().then(() => __importStar(require(file.path)))).purgecss;
                                    // merging
                                    mergePurgecssSettings(purgecss);
                                }
                                catch (e) { }
                            }
                        }
                        catch (e) { }
                    }
                }
                const srcJsFiles = s_glob_1.default.resolve(`${s_sugar_config_1.default.get('storage.src.jsDir')}/**/*.spec.js`);
                for (let file of srcJsFiles) {
                    try {
                        // @ts-ignore
                        if (!fs_1.default.existsSync(file.path))
                            continue;
                        // @ts-ignore
                        const purgecss = (yield Promise.resolve().then(() => __importStar(require(file.path)))).purgecss;
                        // merging
                        mergePurgecssSettings(purgecss);
                    }
                    catch (e) { }
                }
                this.settings.purgecss.content.forEach((contentObj) => {
                    if (typeof contentObj === 'string') {
                        globs.push(contentObj);
                    }
                    else {
                        if (contentObj.raw) {
                            contentObj.raw = (0, expandPleasantCssClassnames_1.default)(contentObj.raw);
                        }
                        content.push(contentObj);
                    }
                });
                const files = s_glob_1.default.resolve(globs);
                files.forEach((file) => {
                    content.push({
                        extension: file.extension,
                        raw: (0, expandPleasantCssClassnames_1.default)(file.content),
                    });
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[purge]</yellow> Purging final css...`,
                });
                const purgeCssResult = yield new purgecss_1.PurgeCSS().purge(Object.assign(Object.assign({}, purgeCssSettings), { content, css: [
                        {
                            raw: finalCss,
                        },
                    ] }));
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`,
                });
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                const minifyDuration = new s_duration_1.default();
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[minify]</yellow> Minifiying css...`,
                });
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: false,
                }).css;
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`,
                });
            }
            if (params.output) {
                (0, writeFileSync_1.default)(params.output, finalCss);
                const file = new s_file_1.default(params.output);
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                });
            }
            const res = {
                outputFile: params.output
                    ? s_file_1.default.new(params.output)
                    : undefined,
                css: finalCss,
                map: null,
            };
            if (from)
                res.inputFile = s_file_1.default.new(from);
            resolve(res);
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
exports.default = SPostcssBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxrRUFBMkM7QUFDM0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQseUdBQW1GO0FBQ25GLDhGQUF3RTtBQUN4RSx5RkFBc0U7QUFDdEUsOEhBQXdHO0FBQ3hHLDRGQUFzRTtBQUN0RSw2Q0FBK0I7QUFDL0IsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsdUNBQW9DO0FBQ3BDLG9IQUE4RjtBQTBEOUYsTUFBcUIsZUFBZ0IsU0FBUSxtQkFBVTtJQUNuRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUNELElBQUEsbUJBQVc7UUFDUCxhQUFhO1FBQ2IsMENBQWtDLENBQUMsUUFBUSxFQUFFLEVBQzdDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNGLE1BQW1DO1FBRW5DLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUNoQyxJQUFJLFFBQVEsQ0FBQztZQUViLHVCQUF1QjtZQUN2QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekQ7WUFFRCx1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHFEQUFxRDtZQUNy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