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
const SPostcssBuilderSettingsInterface_js_1 = __importDefault(require("./interface/SPostcssBuilderSettingsInterface.js"));
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
        SPostcssBuilderSettingsInterface_js_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
                if (pluginName === '@coffeekraken/s-sugarcss-plugin') {
                    const sugarcssPluginConfig = s_sugar_config_1.default.get('sugarcssPlugin');
                    console.log(`              <yellow>○</yellow> Clean variables           : ${((_a = sugarcssPluginConfig.clean) === null || _a === void 0 ? void 0 : _a.variables)
                        ? '<green>true</green>'
                        : '<red>false</red>'}`);
                    console.log(`              <yellow>○</yellow> Classmap                  : ${((_b = sugarcssPluginConfig.classmap) === null || _b === void 0 ? void 0 : _b.enabled)
                        ? '<green>true</green>'
                        : '<red>false</red>'}`);
                    console.log(`              <yellow>○</yellow> Exclude by types          : ${sugarcssPluginConfig.excludeByTypes.length
                        ? `<yellow>${sugarcssPluginConfig.excludeByTypes.join(',')}</yellow>`
                        : `<red>none</red>`}`);
                    console.log(`              <yellow>○</yellow> Exclude comments by types : ${sugarcssPluginConfig.excludeCommentByTypes.length
                        ? `<yellow>${sugarcssPluginConfig.excludeCommentByTypes.join(',')}</yellow>`
                        : `<red>none</red>`}`);
                    console.log(`              <yellow>○</yellow> Exclude code by types     : ${sugarcssPluginConfig.excludeCodeByTypes.length
                        ? `<yellow>${sugarcssPluginConfig.excludeCodeByTypes.join(',')}</yellow>`
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
                    plugins.push(fn(Object.assign({ plugins: this.settings.postcss.plugins.filter((p) => p !== '@coffeekraken/s-sugarcss-plugin'), target: params.target }, options)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx3RUFBaUQ7QUFDakQsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELCtDQUF5RDtBQUN6RCxtREFBeUU7QUFDekUsdURBQWtFO0FBQ2xFLHVEQUF5RDtBQUN6RCx5REFBZ0U7QUFDaEUsNkNBQStCO0FBQy9CLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0RBQWdDO0FBQ2hDLHVDQUFvQztBQUNwQywwSEFBaUc7QUFnRWpHLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLDZDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQztRQUVuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxJQUFJLFFBQVEsQ0FBQztZQUViLHVCQUF1QjtZQUN2QixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssWUFBWSxFQUFFO2dCQUNoQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN4QjtZQUVELHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIscURBQXFEO1lBQ3JELElBQUk7WUFFSiw4QkFBOEI7WUFDOUIsT0FBTztZQUNQLCtDQUErQztZQUMvQyx5REFBeUQ7WUFDekQsUUFBUTtZQUNSLE1BQU07WUFDTiwwQ0FBMEM7WUFDMUMsMERBQTBEO1lBQzFE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