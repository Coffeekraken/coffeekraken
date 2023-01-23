var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __expandPleasantCssClassnames } from '@coffeekraken/sugar/html';
import { __resolvePackagePath } from '@coffeekraken/sugar/module';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import * as __csso from 'csso';
import __fs from 'fs';
import __path from 'path';
import __postcss from 'postcss';
import { PurgeCSS } from 'purgecss';
import __SPostcssBuilderSettingsInterface from './interface/SPostcssBuilderSettingsInterface';
export default class SPostcssBuilder extends __SBuilder {
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
        super(__deepMerge(
        // @ts-ignore
        __SPostcssBuilderSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
                __SSugarConfig.set('postcssSugarPlugin.cache', false);
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
                src = __fs.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            }
            catch (e) { }
            console.log(`<yellow>[build]</yellow> Starting Postcss Build`);
            console.log(`<yellow>○</yellow> Target      : ${params.prod
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            if (params.output) {
                console.log(`<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`);
            }
            if (params.saveDev && params.output) {
                console.log(`<yellow>○</yellow> Output dev  : <cyan>${__path.relative(process.cwd(), params.output.replace(/\.css/, '.dev.css'))}</cyan>`);
            }
            console.log(`<yellow>○</yellow> Minify      : ${params.minify ? '<green>true</green>' : '<red>false</red>'}`);
            console.log(`<yellow>○</yellow> Purge       : ${params.purge ? '<green>true</green>' : '<red>false</red>'}`);
            console.log(`<yellow>○</yellow> Plugins     :`);
            this.settings.postcss.plugins.forEach((pluginName) => {
                console.log(`<yellow>|------------</yellow> : ${pluginName}`);
                if (pluginName === '@coffeekraken/s-postcss-sugar-plugin') {
                    const postcssSugarPluginConfig = __SSugarConfig.get('postcssSugarPlugin');
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
                    const { default: plugin } = yield import(p);
                    const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                    const options = (_b = this.settings.postcss.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                    plugins.push(fn(Object.assign({ plugins: this.settings.postcss.plugins.filter((p) => p !==
                            '@coffeekraken/s-postcss-sugar-plugin'), target: params.prod ? 'production' : 'development' }, options)));
                }
                else {
                    plugins.push(p);
                }
            }
            const compileDuration = new __SDuration();
            console.log(`<yellow>[postcss]</yellow> Compiling css...`);
            // build postcss
            let result;
            try {
                result = yield __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
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
                __writeFileSync(params.output.replace(/\.css$/, '.dev.css'), finalCss);
                const file = new __SFile(params.output.replace(/\.css$/, '.dev.css'));
                console.log(`<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            }
            const purgeDuration = new __SDuration();
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
                const packageJson = __packageJsonSync();
                if (packageJson.dependencies) {
                    for (let packageName of Object.keys(packageJson.dependencies)) {
                        try {
                            const packagePath = __resolvePackagePath(packageName);
                            if (!packagePath)
                                continue;
                            const specsFiles = __SGlob.resolve(`${packagePath}/**/*.spec.js`);
                            for (let file of specsFiles) {
                                try {
                                    // @ts-ignore
                                    if (!__fs.existsSync(file.path))
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
                const srcJsFiles = __SGlob.resolve(`${__SSugarConfig.get('storage.src.jsDir')}/**/*.spec.js`);
                for (let file of srcJsFiles) {
                    try {
                        // @ts-ignore
                        if (!__fs.existsSync(file.path))
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
                            contentObj.raw = __expandPleasantCssClassnames(contentObj.raw);
                        }
                        content.push(contentObj);
                    }
                });
                const files = __SGlob.resolve(globs);
                files.forEach((file) => {
                    content.push({
                        extension: file.extension,
                        raw: __expandPleasantCssClassnames(file.content),
                    });
                });
                console.log(`<yellow>[purge]</yellow> Purging final css...`);
                const purgeCssResult = yield new PurgeCSS().purge(Object.assign(Object.assign({}, purgeCssSettings), { content, css: [
                        {
                            raw: finalCss,
                        },
                    ] }));
                console.log(`<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`);
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                const minifyDuration = new __SDuration();
                console.log(`<yellow>[minify]</yellow> Minifiying css...`);
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
                }).css;
                console.log(`<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`);
            }
            if (params.output) {
                __writeFileSync(params.output, finalCss);
                const file = new __SFile(params.output);
                console.log(`<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
            }
            const res = {
                outputFile: params.output
                    ? __SFile.new(params.output)
                    : undefined,
                css: finalCss,
                map: null,
            };
            if (from)
                res.inputFile = __SFile.new(from);
            resolve(res);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBMEQ5RixNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsVUFBVTtJQUNuRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUNELFdBQVc7UUFDUCxhQUFhO1FBQ2Isa0NBQWtDLENBQUMsUUFBUSxFQUFFLEVBQzdDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVE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