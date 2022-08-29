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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __resolvePackagePath from '@coffeekraken/sugar/node/esm/resolvePackagePath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Starting Postcss Build`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Target      : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            if (params.output) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`,
                });
            }
            if (params.saveDev && params.output) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Output dev  : <cyan>${__path.relative(process.cwd(), params.output.replace(/\.css/, '.dev.css'))}</cyan>`,
                });
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Minify      : ${params.minify
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Purge       : ${params.purge
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Plugins     :`,
            });
            this.settings.postcss.plugins.forEach((pluginName) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>|------------</yellow> : ${pluginName}`,
                });
                if (pluginName === '@coffeekraken/s-postcss-sugar-plugin') {
                    const postcssSugarPluginConfig = __SSugarConfig.get('postcssSugarPlugin');
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `              <yellow>○</yellow> Cache                     : ${postcssSugarPluginConfig.cache
                            ? '<green>true</green>'
                            : '<red>false</red>'}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `              <yellow>○</yellow> Exclude by types          : ${postcssSugarPluginConfig.excludeByTypes.length
                            ? `<yellow>${postcssSugarPluginConfig.excludeByTypes.join(',')}</yellow>`
                            : `<red>none</red>`}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `              <yellow>○</yellow> Exclude comments by types : ${postcssSugarPluginConfig.excludeCommentByTypes
                            .length
                            ? `<yellow>${postcssSugarPluginConfig.excludeCommentByTypes.join(',')}</yellow>`
                            : `<red>none</red>`}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
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
                    const { default: plugin } = yield import(p);
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
            const compileDuration = new __SDuration();
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[postcss]</yellow> Compiling css...`,
            });
            // build postcss
            let result;
            try {
                result = yield __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
                    from,
                });
            }
            catch (e) {
                emit('log', {
                    type: __SLog.TYPE_ERROR,
                    value: e.toString(),
                });
                throw e;
            }
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${compileDuration.end().formatedDuration}</yellow>`,
            });
            finalCss = result.css;
            // saveDev
            if (params.saveDev && params.output) {
                __writeFileSync(params.output.replace(/\.css$/, '.dev.css'), finalCss);
                const file = new __SFile(params.output.replace(/\.css$/, '.dev.css'));
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                });
            }
            const purgeDuration = new __SDuration();
            // purge if needed
            if (params.purge) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
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
                    type: __SLog.TYPE_INFO,
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
                const packageJson = __packageJson();
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
                                    const purgecss = (yield import(file.path)).purgecss;
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
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[purge]</yellow> Purging final css...`,
                });
                const purgeCssResult = yield new PurgeCSS().purge(Object.assign(Object.assign({}, purgeCssSettings), { content, css: [
                        {
                            raw: finalCss,
                        },
                    ] }));
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`,
                });
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                const minifyDuration = new __SDuration();
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[minify]</yellow> Minifiying css...`,
                });
                finalCss = __csso.default.minify(finalCss, {
                    restructure: false,
                    comments: true, // leave all exlamation comments /*! ... */
                }).css;
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`,
                });
            }
            if (params.output) {
                __writeFileSync(params.output, finalCss);
                const file = new __SFile(params.output);
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                });
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
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sb0JBQW9CLE1BQU0saURBQWlELENBQUM7QUFDbkYsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyw2QkFBNkIsTUFBTSw2REFBNkQsQ0FBQztBQUN4RyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3BDLE9BQU8sa0NBQWtDLE1BQU0sOENBQThDLENBQUM7QUEwRDlGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUE0QztRQUNwRCxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYixrQ0FBa0MsQ0FBQyxRQUFRLEVBQUUsRUFDN0MsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7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