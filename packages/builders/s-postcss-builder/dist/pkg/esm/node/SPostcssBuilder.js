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
import { __resolvePackagePath } from '@coffeekraken/sugar/module';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLDZCQUE2QixNQUFNLDZEQUE2RCxDQUFDO0FBQ3hHLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sS0FBSyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDcEMsT0FBTyxrQ0FBa0MsTUFBTSw4Q0FBOEMsQ0FBQztBQTBEOUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFDbkQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FDRCxXQUFXO1FBQ1AsYUFBYTtRQUNiLGtDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQztRQUVuQyxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUNoQyxJQUFJLFFBQVEsQ0FBQztZQUViLHVCQUF1QjtZQUN2QixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLHVCQUF1QjtnQkFDdkIsY0FBYyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN6RDtZQUVELHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIscURBQXFEO1lBQ3JELElBQUk7WUFFSiw4QkFBOEI7WUFDOUIsT0FBTztZQUNQLCtDQUErQztZQUMvQyx5REFBeUQ7WUFDekQsUUFBUTtZQUNSLE1BQU07WUFDTiwwQ0FBMEM7WUFDMUMsMERBQTBEO1lBQzFELFNBQVM7WUFDVCxJQUFJO1lBRUosZUFBZTtZQUNmLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQ2xCLElBQUksR0FBUSxTQUFTLENBQUM7WUFDMUIsSUFBSTtnQkFDQSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6RCxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUN2QjtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLGlEQUFpRDthQUMzRCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLG9DQUNILE1BQU0sQ0FBQyxJQUFJO29CQUNQLENBQUMsQ0FBQywyQkFBMkI7b0JBQzdCLENBQUMsQ0FBQyw4QkFDVixFQUFFO2FBQ0wsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsMENBQTBDLE1BQU0sQ0FBQyxRQUFRLENBQzVELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixNQUFNLENBQUMsTUFBTSxDQUNoQixTQUFTO2lCQUNiLENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsMENBQTBDLE1BQU0sQ0FBQyxRQUFRLENBQzVELE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQzdDLFNBQVM7aUJBQ2IsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLG9DQUNILE1BQU0sQ0FBQyxNQUFNO29CQUNULENBQUMsQ0FBQyxxQkFBcUI7b0JBQ3ZCLENBQUMsQ0FBQyxrQkFDVixFQUFFO2FBQ0wsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSxvQ0FDSCxNQUFNLENBQUMsS0FBSztvQkFDUixDQUFDLENBQUMscUJBQXFCO29CQUN2QixDQUFDLENBQUMsa0JBQ1YsRUFBRTthQUNMLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsa0NBQWtDO2FBQzVDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtnQkFDakQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSxvQ0FBb0MsVUFBVSxFQUFFO2lCQUMxRCxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxVQUFVLEtBQUssc0NBQXNDLEVBQUU7b0JBQ3ZELE1BQU0sd0JBQXdCLEdBQzFCLGNBQWMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSxnRUFDSCx3QkFBd0IsQ0FBQyxLQUFLOzRCQUMxQixDQUFDLENBQUMscUJBQXFCOzRCQUN2QixDQUFDLENBQUMsa0JBQ1YsRUFBRTtxQkFDTCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7d0JBQ3RCLEtBQUssRUFBRSxnRUFDSCx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsTUFBTTs0QkFDMUMsQ0FBQyxDQUFDLFdBQVcsd0JBQXdCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDbkQsR0FBRyxDQUNOLFdBQVc7NEJBQ2QsQ0FBQyxDQUFDLGlCQUNWLEVBQUU7cUJBQ0wsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsZ0VBQ0gsd0JBQXdCLENBQUMscUJBQXFCOzZCQUN6QyxNQUFNOzRCQUNQLENBQUMsQ0FBQyxXQUFXLHdCQUF3QixDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FDMUQsR0FBRyxDQUNOLFdBQVc7NEJBQ2QsQ0FBQyxDQUFDLGlCQUNWLEVBQUU7cUJBQ0wsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsZ0VBQ0gsd0JBQXdCLENBQUMsa0JBQWtCOzZCQUN0QyxNQUFNOzRCQUNQLENBQUMsQ0FBQyxXQUFXLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FDdkQsR0FBRyxDQUNOLFdBQVc7NEJBQ2QsQ0FBQyxDQUFDLGlCQUNWLEVBQUU7cUJBQ0wsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCx3QkFBd0I7WUFDeEIsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO1lBQzFCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUN2QixNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLEVBQUUsR0FBRyxNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLE1BQU0sQ0FBQztvQkFDcEMsTUFBTSxPQUFPLEdBQ1QsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztvQkFDbEQsT0FBTyxDQUFDLElBQUksQ0FDUixFQUFFLGlCQUNFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTs0QkFDZixDQUFDLENBQUMsWUFBWTs0QkFDZCxDQUFDLENBQUMsYUFBYSxJQUNoQixPQUFPLEVBQ1osQ0FDTCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ25CO2FBQ0o7WUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsNkNBQTZDO2FBQ3ZELENBQUMsQ0FBQztZQUVILGdCQUFnQjtZQUNoQixJQUFJLE1BQU0sQ0FBQztZQUNYLElBQUk7Z0JBQ0EsTUFBTSxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLGFBQUgsR0FBRyxjQUFILEdBQUcsR0FBSSxFQUFFLEVBQUU7b0JBQ2pELElBQUk7aUJBQ1AsQ0FBQyxDQUFDO2FBQ047WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVTtvQkFDdkIsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUU7aUJBQ3RCLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsQ0FBQzthQUNYO1lBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSx1Q0FBdUMsQ0FDeEUsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw4RkFDSCxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQzFCLFdBQVc7YUFDZCxDQUFDLENBQUM7WUFFSCxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUV0QixVQUFVO1lBQ1YsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLGVBQWUsQ0FDWCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLEVBQzNDLFFBQVEsQ0FDWCxDQUFDO2dCQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQzlDLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSwyQ0FBMkMsSUFBSSxDQUFDLE9BQU8sc0JBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSwrQ0FBK0M7aUJBQ3ZKLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUV4QyxrQkFBa0I7WUFDbEIsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsMkNBQTJDO2lCQUNyRCxDQUFDLENBQUM7Z0JBRUgsTUFBTSxnQkFBZ0IsbUNBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQ3pCLFFBQVEsRUFBRTt3QkFDTixRQUFRLEVBQUUsRUFBRTt3QkFDWixJQUFJLEVBQUUsRUFBRTt3QkFDUixNQUFNLEVBQUUsRUFBRTt3QkFDVixTQUFTLEVBQUUsRUFBRTt3QkFDYixTQUFTLEVBQUUsRUFBRTtxQkFDaEIsR0FDSixDQUFDO2dCQUVGLHFCQUFxQjtnQkFDckIsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO2dCQUMxQixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7Z0JBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsNEhBQTRIO2lCQUN0SSxDQUFDLENBQUM7Z0JBRUgsU0FBUyxxQkFBcUIsQ0FBQyxRQUFRO29CQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7d0JBQUUsT0FBTztvQkFFL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTt3QkFDbEMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRzs0QkFDakMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFDckMsR0FBRyxRQUFRLENBQUMsUUFBUTt5QkFDdkIsQ0FBQztxQkFDTDt5QkFBTTt3QkFDSCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDM0MsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRztnQ0FDakMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUTtnQ0FDckMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVE7NkJBQ2hDLENBQUM7eUJBQ0w7d0JBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQ3ZDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7Z0NBQzdCLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUk7Z0NBQ2pDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzZCQUM1QixDQUFDO3lCQUNMO3dCQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFOzRCQUN6QyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHO2dDQUMvQixHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNO2dDQUNuQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTTs2QkFDOUIsQ0FBQzt5QkFDTDt3QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTs0QkFDNUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRztnQ0FDbEMsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUztnQ0FDdEMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVM7NkJBQ2pDLENBQUM7eUJBQ0w7d0JBQ0QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7NEJBQzVDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUc7Z0NBQ2xDLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVM7Z0NBQ3RDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTOzZCQUNqQyxDQUFDO3lCQUNMO3FCQUNKO2dCQUNMLENBQUM7Z0JBRUQsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO29CQUMxQixLQUFLLElBQUksV0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQy9CLFdBQVcsQ0FBQyxZQUFZLENBQzNCLEVBQUU7d0JBQ0MsSUFBSTs0QkFDQSxNQUFNLFdBQVcsR0FDYixvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLFdBQVc7Z0NBQUUsU0FBUzs0QkFDM0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDOUIsR0FBRyxXQUFXLGVBQWUsQ0FDaEMsQ0FBQzs0QkFDRixLQUFLLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtnQ0FDekIsSUFBSTtvQ0FDQSxhQUFhO29DQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7d0NBQzNCLFNBQVM7b0NBQ2IsYUFBYTtvQ0FDYixNQUFNLFFBQVEsR0FBRyxDQUNiLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDMUIsQ0FBQyxRQUFRLENBQUM7b0NBQ1gsVUFBVTtvQ0FDVixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQ0FDbkM7Z0NBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTs2QkFDakI7eUJBQ0o7d0JBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtxQkFDakI7aUJBQ0o7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDOUIsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUNqQixtQkFBbUIsQ0FDdEIsZUFBZSxDQUNuQixDQUFDO2dCQUNGLEtBQUssSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO29CQUN6QixJQUFJO3dCQUNBLGFBQWE7d0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFBRSxTQUFTO3dCQUMxQyxhQUFhO3dCQUNiLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO3dCQUNwRCxVQUFVO3dCQUNWLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNuQztvQkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO2lCQUNqQjtnQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ2xELElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFFO3dCQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUMxQjt5QkFBTTt3QkFDSCxJQUFJLFVBQVUsQ0FBQyxHQUFHLEVBQUU7NEJBQ2hCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsNkJBQTZCLENBQzFDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLENBQUM7eUJBQ0w7d0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDNUI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNULFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUzt3QkFDekIsR0FBRyxFQUFFLDZCQUE2QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQ25ELENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLCtDQUErQztpQkFDekQsQ0FBQyxDQUFDO2dCQUNILE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxRQUFRLEVBQUUsQ0FBQyxLQUFLLGlDQUMxQyxnQkFBZ0IsS0FDbkIsT0FBTyxFQUNQLEdBQUcsRUFBRTt3QkFDRDs0QkFDSSxHQUFHLEVBQUUsUUFBUTt5QkFDaEI7cUJBQ0osSUFDSCxDQUFDO2dCQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO29CQUN0QixLQUFLLEVBQUUsNEZBQ0gsYUFBYSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUN4QixXQUFXO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUNwQztZQUVELFNBQVM7WUFDVCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsTUFBTSxjQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDekMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSw2Q0FBNkM7aUJBQ3ZELENBQUMsQ0FBQztnQkFFSCxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO29CQUN2QyxXQUFXLEVBQUUsS0FBSztvQkFDbEIsUUFBUSxFQUFFLElBQUksRUFBRSwyQ0FBMkM7aUJBQzlELENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBRVAsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSxnR0FDSCxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ3pCLFdBQVc7aUJBQ2QsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsZUFBZSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFNBQVM7b0JBQ3RCLEtBQUssRUFBRSx1Q0FBdUMsSUFBSSxDQUFDLE9BQU8sc0JBQXNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSwrQ0FBK0M7aUJBQ25KLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxHQUFHLEdBQTJCO2dCQUNoQyxVQUFVLEVBQUUsTUFBTSxDQUFDLE1BQU07b0JBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQzVCLENBQUMsQ0FBQyxTQUFTO2dCQUNmLEdBQUcsRUFBRSxRQUFRO2dCQUNiLEdBQUcsRUFBRSxJQUFJO2FBQ1osQ0FBQztZQUVGLElBQUksSUFBSTtnQkFBRSxHQUFHLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDNUI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==