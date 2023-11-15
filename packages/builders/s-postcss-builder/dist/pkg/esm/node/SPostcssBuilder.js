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
import __SPostcssBuilderSettingsInterface from './interface/SPostcssBuilderSettingsInterface.js';
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
                src = __fs.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            }
            catch (e) { }
            console.log(`<yellow>[build]</yellow> Starting Postcss Build`);
            console.log(`<yellow>○</yellow> Target      : ${params.target === 'production'
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            if (params.output) {
                console.log(`<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`);
            }
            console.log(`<yellow>○</yellow> Minify      : ${params.minify ? '<green>true</green>' : '<red>false</red>'}`);
            // console.log(
            //     `<yellow>○</yellow> Purge       : ${
            //         params.purge ? '<green>true</green>' : '<red>false</red>'
            //     }`,
            // );
            console.log(`<yellow>○</yellow> Plugins     :`);
            this.settings.postcss.plugins.forEach((pluginName) => {
                var _a;
                console.log(`<yellow>|------------</yellow> : ${pluginName}`);
                if (pluginName === '@coffeekraken/s-sugarcss-plugin') {
                    const sugarcssPluginConfig = __SSugarConfig.get('sugarcssPlugin');
                    console.log(`              <yellow>○</yellow> Clean variables           : ${((_a = sugarcssPluginConfig.clean) === null || _a === void 0 ? void 0 : _a.variables)
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
                            const specsFiles = __SGlob.resolveSync(`${packagePath}/**/*.spec.js`);
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
                const srcJsFiles = __SGlob.resolveSync(`${__SSugarConfig.get('storage.src.jsDir')}/**/*.spec.js`);
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
                const files = __SGlob.resolveSync(globs);
                files.forEach((file) => {
                    content.push({
                        extension: file.extension,
                        raw: __expandPleasantCssClassnames(file.raw),
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
                (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[minify]</yellow> Minifiying css...`);
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
                }).css;
                (_d = console.verbose) === null || _d === void 0 ? void 0 : _d.call(console, `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxLQUFLLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLGtDQUFrQyxNQUFNLGlEQUFpRCxDQUFDO0FBZ0VqRyxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsVUFBVTtJQUNuRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUNELFdBQVc7UUFDUCxhQUFhO1FBQ2Isa0NBQWtDLENBQUMsUUFBUSxFQUFFLEVBQzdDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVE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