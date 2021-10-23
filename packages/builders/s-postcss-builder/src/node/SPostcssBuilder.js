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
        console.log(__SSugarConfig.get('purgecss.content'));
        throw 'ff';
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
                value: `<yellow>[build]</yellow> Starting Postcss Build`,
            });
            emit('log', {
                value: `<yellow>○</yellow> Environment : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            if (params.output) {
                emit('log', {
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`,
                });
            }
            emit('log', {
                value: `<yellow>○</yellow> Minify      : ${params.minify
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                value: `<yellow>○</yellow> Purge       : ${params.purge
                    ? '<green>true</green>'
                    : '<red>false</red>'}`,
            });
            emit('log', {
                value: `<yellow>○</yellow> Plugins     :`,
            });
            this.postcssBuilderSettings.postcss.plugins.forEach((pluginName) => {
                emit('log', {
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
                    value: `<green>[build]</green> Purging unused css`,
                });
                // get content to use
                const content = [];
                const globs = [];
                console.log(params);
                console.log(this.postcssBuilderSettings.purgecss.content);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Bvc3Rjc3NCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBcUMsTUFBTSx5QkFBeUIsQ0FBQztBQUM1RSxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLDZCQUE2QixNQUFNLDZEQUE2RCxDQUFDO0FBQ3hHLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUE4RHBDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3RCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUFnRDtRQUN4RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksY0FBYyxvQkFDUCxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQzFDO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUNGLE9B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