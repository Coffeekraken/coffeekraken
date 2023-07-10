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
            var _a, _b, _c, _d;
            let finalCss;
            // handle prod shortcut
            if (params.target === 'production') {
                params.minify = true;
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
            console.log(`<yellow>○</yellow> Target      : ${params.target === 'production'
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            if (params.output) {
                console.log(`<yellow>○</yellow> Output      : <cyan>${path_1.default.relative(process.cwd(), params.output)}</cyan>`);
            }
            console.log(`<yellow>○</yellow> Minify      : ${params.minify ? '<green>true</green>' : '<red>false</red>'}`);
            // console.log(
            //     `<yellow>○</yellow> Purge       : ${
            //         params.purge ? '<green>true</green>' : '<red>false</red>'
            //     }`,
            // );
            console.log(`<yellow>○</yellow> Plugins     :`);
            this.settings.postcss.plugins.forEach((pluginName) => {
                var _a, _b;
                console.log(`<yellow>|------------</yellow> : ${pluginName}`);
                if (pluginName === '@coffeekraken/s-postcss-sugar-plugin') {
                    const postcssSugarPluginConfig = s_sugar_config_1.default.get('postcssSugarPlugin');
                    console.log(`              <yellow>○</yellow> Clean variables           : ${((_a = postcssSugarPluginConfig.clean) === null || _a === void 0 ? void 0 : _a.variables)
                        ? '<green>true</green>'
                        : '<red>false</red>'}`);
                    console.log(`              <yellow>○</yellow> Classmap                  : ${((_b = postcssSugarPluginConfig.classmap) === null || _b === void 0 ? void 0 : _b.enabled)
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
                    const { default: plugin } = yield import(p);
                    const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                    const options = (_b = this.settings.postcss.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                    plugins.push(fn(Object.assign({ plugins: this.settings.postcss.plugins.filter((p) => p !==
                            '@coffeekraken/s-postcss-sugar-plugin'), target: params.target }, options)));
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
                            const specsFiles = s_glob_1.default.resolveSync(`${packagePath}/**/*.spec.js`);
                            for (let file of specsFiles) {
                                try {
                                    // @ts-ignore
                                    if (!fs_2.default.existsSync(file.path))
                                        continue;
                                    // @ts-ignore
                                    const purgecss = (yield import(file.path))
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
                const srcJsFiles = s_glob_1.default.resolveSync(`${s_sugar_config_1.default.get('storage.src.jsDir')}/**/*.spec.js`);
                for (let file of srcJsFiles) {
                    try {
                        // @ts-ignore
                        if (!fs_2.default.existsSync(file.path))
                            continue;
                        // @ts-ignore
                        const purgecss = (yield import(file.path)).purgecss;
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
                const files = s_glob_1.default.resolveSync(globs);
                files.forEach((file) => {
                    content.push({
                        extension: file.extension,
                        raw: (0, html_1.__expandPleasantCssClassnames)(file.raw),
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
                (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[minify]</yellow> Minifiying css...`);
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
                }).css;
                (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELCtDQUF5RDtBQUN6RCxtREFBeUU7QUFDekUsdURBQWtFO0FBQ2xFLHVEQUF5RDtBQUN6RCx5REFBZ0U7QUFDaEUsNkNBQStCO0FBQy9CLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLHVDQUFvQztBQUNwQyxvSEFBOEY7QUFnRTlGLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLDBDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQztRQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxJQUFJLFFBQVEsQ0FBQztZQUViLHVCQUF1QjtZQUN2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUNoQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN4QjtZQUVELHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIscURBQXFEO1lBQ3JELElBQUk7WUFFSiw4QkFBOEI7WUFDOUIsT0FBTztZQUNQLCtDQUErQztZQUMvQyx5REFBeUQ7WUFDekQsUUFBUTtZQUNSLE1BQU07WUFDTiwwQ0FBMEM7WUFDMUMsMERBQTBEO1lBQzFELFNBQVM7WUFDVCxJQUFJO1lBRUosZUFBZTtZQUNmLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQ2xCLElBQUksR0FBUSxTQUFTLENBQUM7WUFDMUIsSUFBSTtnQkFDQSxHQUFHLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6RCxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxPQUFPLENBQUMsR0FBRyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCxvQ0FDSSxNQUFNLENBQUMsTUFBTSxLQUFLLFlBQVk7Z0JBQzFCLENBQUMsQ0FBQywyQkFBMkI7Z0JBQzdCLENBQUMsQ0FBQyw4QkFDVixFQUFFLENBQ0wsQ0FBQztZQUNGLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUNQLDBDQUEwQyxjQUFNLENBQUMsUUFBUSxDQUNyRCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FDaEIsU0FBUyxDQUNiLENBQUM7YUFDTDtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1Asb0NBQ0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLGtCQUM1QyxFQUFFLENBQ0wsQ0FBQztZQUNGLGVBQWU7WUFDZiwyQ0FBMkM7WUFDM0Msb0VBQW9FO1lBQ3BFLFVBQVU7WUFDVixLQUFLO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTs7Z0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzlELElBQUksVUFBVSxLQUFLLHNDQUFzQyxFQUFFO29CQUN2RCxNQUFNLHdCQUF3QixHQUMxQix3QkFBYyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO29CQUM3QyxPQUFPLENBQUMsR0FBRyxDQUNQLGdFQUNJLENBQUEsTUFBQSx3QkFBd0IsQ0FBQyxLQUFLLDBDQUFFLFNBQVM7d0JBQ3JDLENBQUMsQ0FBQyxxQkFBcUI7d0JBQ3ZCLENBQUMsQ0FBQyxrQkFDVixFQUFFLENBQ0wsQ0FBQztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUNQLGdFQUNJLENBQUEsTUFBQSx3QkFBd0IsQ0FBQyxRQUFRLDBDQUFFLE9BQU87d0JBQ3RDLENBQUMsQ0FBQyxxQkFBcUI7d0JBQ3ZCLENBQUMsQ0FBQyxrQkFDVixFQUFFLENBQ0wsQ0FBQztvQkFDRixPQUFPLENBQUMsR0FBRyxDQUNQLGdFQUNJLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxNQUFNO3dCQUMxQyxDQUFDLENBQUMsV0FBVyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQ04sV0FBVzt3QkFDZCxDQUFDLENBQUMsaUJBQ1YsRUFBRSxDQUNMLENBQUM7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnRUFDSSx3QkFBd0IsQ0FBQyxxQkFBcUI7eUJBQ3pDLE1BQU07d0JBQ1AsQ0FBQyxDQUFDLFdBQVcsd0JBQXdCLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUMxRCxHQUFHLENBQ04sV0FBVzt3QkFDZCxDQUFDLENBQUMsaUJBQ1YsRUFBRSxDQUNMLENBQUM7b0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnRUFDSSx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNO3dCQUM5QyxDQUFDLENBQUMsV0FBVyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQ3ZELEdBQUcsQ0FDTixXQUFXO3dCQUNkLENBQUMsQ0FBQyxpQkFDVixFQUFFLENBQ0wsQ0FBQztpQkFDTDtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsd0JBQXdCO1lBQ3hCLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztZQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDdkIsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxFQUFFLEdBQUcsTUFBQSxNQUFNLENBQUMsT0FBTyxtQ0FBSSxNQUFNLENBQUM7b0JBQ3BDLE1BQU0sT0FBTyxHQUNULE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7b0JBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQ1IsRUFBRSxpQkFDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDekMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNGLENBQUM7NEJBQ0Qsc0NBQXNDLENBQzdDLEVBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQ2xCLE9BQU8sRUFDWixDQUNMLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDbkI7YUFDSjtZQUVELE1BQU0sZUFBZSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQztZQUUzRCxnQkFBZ0I7WUFDaEIsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJO2dCQUNBLE1BQU0sR0FBRyxNQUFNLElBQUEsaUJBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFILEdBQUcsY0FBSCxHQUFHLEdBQUksRUFBRSxFQUFFO29CQUNqRCxJQUFJO2lCQUNQLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLENBQUM7YUFDWDtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksdUNBQXVDLENBQ3hFLENBQUM7YUFDTDtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1AsOEZBQ0ksZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUMxQixXQUFXLENBQ2QsQ0FBQztZQUVGLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBRXRCLE1BQU0sYUFBYSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRXhDLGtCQUFrQjtZQUNsQixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2dCQUV6RCxNQUFNLGdCQUFnQixtQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FDekIsUUFBUSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxFQUFFO3dCQUNaLElBQUksRUFBRSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxFQUFFO3dCQUNWLFNBQVMsRUFBRSxFQUFFO3dCQUNiLFNBQVMsRUFBRSxFQUFFO3FCQUNoQixHQUNKLENBQUM7Z0JBRUYscUJBQXFCO2dCQUNyQixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztnQkFFM0IsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0SEFBNEgsQ0FDL0gsQ0FBQztnQkFFRixTQUFTLHFCQUFxQixDQUFDLFFBQVE7b0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTt3QkFBRSxPQUFPO29CQUUvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUNsQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHOzRCQUNqQyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFROzRCQUNyQyxHQUFHLFFBQVEsQ0FBQyxRQUFRO3lCQUN2QixDQUFDO3FCQUNMO3lCQUFNO3dCQUNILElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUMzQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHO2dDQUNqQyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRO2dDQUNyQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUTs2QkFDaEMsQ0FBQzt5QkFDTDt3QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDdkMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRztnQ0FDN0IsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSTtnQ0FDakMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUk7NkJBQzVCLENBQUM7eUJBQ0w7d0JBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7NEJBQ3pDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUc7Z0NBQy9CLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU07Z0NBQ25DLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNOzZCQUM5QixDQUFDO3lCQUNMO3dCQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFOzRCQUM1QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHO2dDQUNsQyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTO2dDQUN0QyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUzs2QkFDakMsQ0FBQzt5QkFDTDt3QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDNUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRztnQ0FDbEMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUztnQ0FDdEMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVM7NkJBQ2pDLENBQUM7eUJBQ0w7cUJBQ0o7Z0JBQ0wsQ0FBQztnQkFFRCxNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7Z0JBQ3hDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtvQkFDMUIsS0FBSyxJQUFJLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUMvQixXQUFXLENBQUMsWUFBWSxDQUMzQixFQUFFO3dCQUNDLElBQUk7NEJBQ0EsTUFBTSxXQUFXLEdBQ2IsSUFBQSw2QkFBb0IsRUFBQyxXQUFXLENBQUMsQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLFdBQVc7Z0NBQUUsU0FBUzs0QkFDM0IsTUFBTSxVQUFVLEdBQUcsZ0JBQU8sQ0FBQyxXQUFXLENBQ2xDLEdBQUcsV0FBVyxlQUFlLENBQ2hDLENBQUM7NEJBQ0YsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7Z0NBQ3pCLElBQUk7b0NBQ0EsYUFBYTtvQ0FDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3dDQUFFLFNBQVM7b0NBQzFDLGFBQWE7b0NBQ2IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUNBQ3JDLFFBQVEsQ0FBQztvQ0FDZCxVQUFVO29DQUNWLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2lDQUNuQztnQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFFOzZCQUNqQjt5QkFDSjt3QkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO3FCQUNqQjtpQkFDSjtnQkFFRCxNQUFNLFVBQVUsR0FBRyxnQkFBTyxDQUFDLFdBQVcsQ0FDbEMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLENBQzVELENBQUM7Z0JBQ0YsS0FBSyxJQUFJLElBQUksSUFBSSxVQUFVLEVBQUU7b0JBQ3pCLElBQUk7d0JBQ0EsYUFBYTt3QkFDYixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUFFLFNBQVM7d0JBQzFDLGFBQWE7d0JBQ2IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7d0JBQ3BELFVBQVU7d0JBQ1YscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ25DO29CQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7aUJBQ2pCO2dCQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDbEQsSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLEVBQUU7d0JBQ2hDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzFCO3lCQUFNO3dCQUNILElBQUksVUFBVSxDQUFDLEdBQUcsRUFBRTs0QkFDaEIsVUFBVSxDQUFDLEdBQUcsR0FBRyxJQUFBLG9DQUE2QixFQUMxQyxVQUFVLENBQUMsR0FBRyxDQUNqQixDQUFDO3lCQUNMO3dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQzVCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sS0FBSyxHQUFHLGdCQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ1QsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO3dCQUN6QixHQUFHLEVBQUUsSUFBQSxvQ0FBNkIsRUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUMvQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksbUJBQVEsRUFBRSxDQUFDLEtBQUssaUNBQzFDLGdCQUFnQixLQUNuQixPQUFPLEVBQ1AsR0FBRyxFQUFFO3dCQUNEOzRCQUNJLEdBQUcsRUFBRSxRQUFRO3lCQUNoQjtxQkFDSixJQUNILENBQUM7Z0JBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0RkFDSSxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ3hCLFdBQVcsQ0FDZCxDQUFDO2dCQUNGLFFBQVEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2FBQ3BDO1lBRUQsU0FBUztZQUNULElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDZixNQUFNLGNBQWMsR0FBRyxJQUFJLG9CQUFXLEVBQUUsQ0FBQztnQkFDekMsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCw2Q0FBNkMsQ0FDaEQsQ0FBQztnQkFFRixRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUN2QyxXQUFXLEVBQUUsS0FBSztvQkFDbEIsUUFBUSxFQUFFLElBQUksRUFBRSwyQ0FBMkM7aUJBQzlELENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBRVAsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxnR0FDSSxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ3pCLFdBQVcsQ0FDZCxDQUFDO2FBQ0w7WUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBQSxvQkFBZSxFQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsdUNBQXVDLElBQUksQ0FBQyxPQUFPLHNCQUFzQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sK0NBQStDLENBQzVJLENBQUM7YUFDTDtZQUVELE1BQU0sR0FBRyxHQUEyQjtnQkFDaEMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxNQUFNO29CQUNyQixDQUFDLENBQUMsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDNUIsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2YsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDO1lBRUYsSUFBSSxJQUFJO2dCQUFFLEdBQUcsQ0FBQyxTQUFTLEdBQUcsZ0JBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFsWUQsa0NBa1lDIn0=