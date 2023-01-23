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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const html_1 = require("@coffeekraken/sugar/html");
const module_1 = require("@coffeekraken/sugar/module");
const object_1 = require("@coffeekraken/sugar/object");
const package_1 = require("@coffeekraken/sugar/package");
const __csso = __importStar(require("csso"));
const fs_2 = __importDefault(require("fs"));
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
        super((0, object_1.__deepMerge)(
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
            // postcss-sugar-export-plugin
            // if (
            //     !this.settings.postcss.plugins.includes(
            //         '@coffeekraken/s-postcss-sugar-export-plugin',
            //     )
            // ) {
            //     this.settings.postcss.plugins.push(
            //         '@coffeekraken/s-postcss-sugar-export-pluging',
            //     );
            // }
            // handle input
            let src = params.input, from = undefined;
            try {
                src = fs_2.default.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            }
            catch (e) { }
            console.log(`<yellow>[build]</yellow> Starting Postcss Build`);
            console.log(`<yellow>○</yellow> Target      : ${params.prod
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            if (params.output) {
                console.log(`<yellow>○</yellow> Output      : <cyan>${path_1.default.relative(process.cwd(), params.output)}</cyan>`);
            }
            if (params.saveDev && params.output) {
                console.log(`<yellow>○</yellow> Output dev  : <cyan>${path_1.default.relative(process.cwd(), params.output.replace(/\.css/, '.dev.css'))}</cyan>`);
            }
            console.log(`<yellow>○</yellow> Minify      : ${params.minify ? '<green>true</green>' : '<red>false</red>'}`);
            console.log(`<yellow>○</yellow> Purge       : ${params.purge ? '<green>true</green>' : '<red>false</red>'}`);
            console.log(`<yellow>○</yellow> Plugins     :`);
            this.settings.postcss.plugins.forEach((pluginName) => {
                console.log(`<yellow>|------------</yellow> : ${pluginName}`);
                if (pluginName === '@coffeekraken/s-postcss-sugar-plugin') {
                    const postcssSugarPluginConfig = s_sugar_config_1.default.get('postcssSugarPlugin');
                    console.log(`              <yellow>○</yellow> Cache                     : ${postcssSugarPluginConfig.cache
                        ? '<green>true</green>'
                        : '<red>false</red>'}`);
                    console.log(`              <yellow>○</yellow> Exclude by types          : ${postcssSugarPluginConfig.excludeByTypes.length
                        ? `<yellow>${postcssSugarPluginConfig.excludeByTypes.join(',')}</yellow>`
                        : `<red>none</red>`}`);
                    console.log(`              <yellow>○</yellow> Exclude comments by types : ${postcssSugarPluginConfig.excludeCommentByTypes
                        .length
                        ? `<yellow>${postcssSugarPluginConfig.excludeCommentByTypes.join(',')}</yellow>`
                        : `<red>none</red>`}`);
                    console.log(`              <yellow>○</yellow> Exclude code by types     : ${postcssSugarPluginConfig.excludeCodeByTypes.length
                        ? `<yellow>${postcssSugarPluginConfig.excludeCodeByTypes.join(',')}</yellow>`
                        : `<red>none</red>`}`);
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
                    plugins.push(fn(Object.assign({ plugins: this.settings.postcss.plugins.filter((p) => p !==
                            '@coffeekraken/s-postcss-sugar-plugin'), target: params.prod ? 'production' : 'development' }, options)));
                }
                else {
                    plugins.push(p);
                }
            }
            const compileDuration = new s_duration_1.default();
            console.log(`<yellow>[postcss]</yellow> Compiling css...`);
            // build postcss
            let result;
            try {
                result = yield (0, postcss_1.default)(plugins).process(src !== null && src !== void 0 ? src : '', {
                    from,
                });
            }
            catch (e) {
                console.error(e.toString());
                throw e;
            }
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }
            console.log(`<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${compileDuration.end().formatedDuration}</yellow>`);
            finalCss = result.css;
            // saveDev
            if (params.saveDev && params.output) {
                (0, fs_1.__writeFileSync)(params.output.replace(/\.css$/, '.dev.css'), finalCss);
                const file = new s_file_1.default(params.output.replace(/\.css$/, '.dev.css'));
                console.log(`<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            }
            const purgeDuration = new s_duration_1.default();
            // purge if needed
            if (params.purge) {
                console.log(`<green>[purge]</green> Purging unused css`);
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
                console.log(`<yellow>[purge]</yellow> Searching for "<cyan>.spec.js</cyan>" files to grab "<magenta>purgecss</magenta>" special configs`);
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
                const packageJson = (0, package_1.__packageJsonSync)();
                if (packageJson.dependencies) {
                    for (let packageName of Object.keys(packageJson.dependencies)) {
                        try {
                            const packagePath = (0, module_1.__resolvePackagePath)(packageName);
                            if (!packagePath)
                                continue;
                            const specsFiles = s_glob_1.default.resolve(`${packagePath}/**/*.spec.js`);
                            for (let file of specsFiles) {
                                try {
                                    // @ts-ignore
                                    if (!fs_2.default.existsSync(file.path))
                                        continue;
                                    // @ts-ignore
                                    const purgecss = (yield Promise.resolve().then(() => __importStar(require(file.path))))
                                        .purgecss;
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
                        if (!fs_2.default.existsSync(file.path))
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
                            contentObj.raw = (0, html_1.__expandPleasantCssClassnames)(contentObj.raw);
                        }
                        content.push(contentObj);
                    }
                });
                const files = s_glob_1.default.resolve(globs);
                files.forEach((file) => {
                    content.push({
                        extension: file.extension,
                        raw: (0, html_1.__expandPleasantCssClassnames)(file.content),
                    });
                });
                console.log(`<yellow>[purge]</yellow> Purging final css...`);
                const purgeCssResult = yield new purgecss_1.PurgeCSS().purge(Object.assign(Object.assign({}, purgeCssSettings), { content, css: [
                        {
                            raw: finalCss,
                        },
                    ] }));
                console.log(`<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`);
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                const minifyDuration = new s_duration_1.default();
                console.log(`<yellow>[minify]</yellow> Minifiying css...`);
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
                }).css;
                console.log(`<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`);
            }
            if (params.output) {
                (0, fs_1.__writeFileSync)(params.output, finalCss);
                const file = new s_file_1.default(params.output);
                console.log(`<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
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
        }));
    }
}
exports.default = SPostcssBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELCtDQUF5RDtBQUN6RCxtREFBeUU7QUFDekUsdURBQWtFO0FBQ2xFLHVEQUF5RDtBQUN6RCx5REFBZ0U7QUFDaEUsNkNBQStCO0FBQy9CLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLHVDQUFvQztBQUNwQyxvSEFBOEY7QUEwRDlGLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLDBDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQztRQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxJQUFJLFFBQVEsQ0FBQztZQUViLHVCQUF1QjtZQUN2QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsd0JBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDekQ7WUFFRCx1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLHFEQUFxRDtZQUNyRCxJQUFJO1lBRUosOEJBQThCO1lBQzlCLE9BQU87WUFDUCwrQ0FBK0M7WUFDL0Ms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