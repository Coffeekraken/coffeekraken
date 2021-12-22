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
                    plugins.push(fn(Object.assign({ target: 'prod' }, options)));
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