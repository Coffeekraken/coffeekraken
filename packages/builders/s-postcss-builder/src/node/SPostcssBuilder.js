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
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SLog from '@coffeekraken/s-log';
import __csso from 'csso';
import __path from 'path';
import __fs from 'fs';
import __SPostcssBuilderBuildParamsInterface from './interface/SPostcssBuilderBuildParamsInterface';
import __postcss from 'postcss';
import { PurgeCSS } from 'purgecss';
export default class SPostcssBuilder extends __SBuilder {
    /**
     * @name            postcssBuilderSettings
     * @type            ISPostcssBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get postcssBuilderSettings() {
        return this._settings.postcssBuilder;
    }
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(__deepMerge({
            postcssBuilder: Object.assign({}, __SSugarConfig.get('postcssBuilder')),
        }, settings !== null && settings !== void 0 ? settings : {}));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let finalCss;
            const defaultParams = (__SPostcssBuilderBuildParamsInterface.defaults());
            // handle prod shortcut
            if (params.prod) {
                params.minify = true;
                params.purge = true;
            }
            // handle default output
            if (params.output && params.output === defaultParams.output) {
                if (params.prod) {
                    params.output = params.output.replace(/\.css/, '.prod.css');
                }
            }
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
                value: `<yellow>○</yellow> Environment : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            if (params.output) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`,
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
            this.postcssBuilderSettings.postcss.plugins.forEach((pluginName) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>|------------</yellow> : ${pluginName}`,
                });
            });
            // resolve plugins paths
            const plugins = [];
            for (let i = 0; i < this.postcssBuilderSettings.postcss.plugins.length; i++) {
                const p = this.postcssBuilderSettings.postcss.plugins[i];
                if (typeof p === 'string') {
                    const { default: plugin } = yield import(p);
                    const fn = (_a = plugin.default) !== null && _a !== void 0 ? _a : plugin;
                    const options = (_b = this.postcssBuilderSettings.postcss.pluginsOptions[p]) !== null && _b !== void 0 ? _b : {};
                    plugins.push(fn(options));
                }
                else {
                    plugins.push(p);
                }
            }
            // build postcss
            let result;
            result = yield __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
                from,
            });
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }
            finalCss = result.css;
            // purge if needed
            if (params.purge) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[build]</green> Purging unused css`,
                });
                // get content to use
                const content = [];
                const globs = [];
                this.postcssBuilderSettings.purgecss.content.forEach((contentObj) => {
                    if (typeof contentObj === 'string') {
                        globs.push(contentObj);
                    }
                    else {
                        if (contentObj.raw) {
                            contentObj.raw =
                                __expandPleasantCssClassnames(contentObj.raw);
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
                const purgeCssResult = yield new PurgeCSS().purge(Object.assign(Object.assign({}, this.postcssBuilderSettings.purgecss), { content, css: [
                        {
                            raw: finalCss,
                        },
                    ] }));
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[build]</green> Minifying css`,
                });
                finalCss = __csso.minify(finalCss, {
                    restructure: true,
                }).css;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Bvc3Rjc3NCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBcUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLDZCQUE2QixNQUFNLDZEQUE2RCxDQUFDO0FBQ3hHLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUE2RHBDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3RCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksY0FBYyxvQkFDUCxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQzFDO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEs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