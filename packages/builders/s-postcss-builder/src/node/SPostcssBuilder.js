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
            postcssBuilder: Object.assign({}, __SSugarConfig.get('postcssBuilder'))
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
            const defaultParams = __SPostcssBuilderBuildParamsInterface.defaults();
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
                value: `<yellow>[build]</yellow> Starting Postcss Build`
            });
            emit('log', {
                value: `<yellow>○</yellow> Environment : ${params.prod ? '<green>production</green>' : '<yellow>development</yellow>'}`
            });
            if (params.output) {
                emit('log', {
                    value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`
                });
            }
            emit('log', {
                value: `<yellow>○</yellow> Minify      : ${params.minify ? '<green>true</green>' : '<red>false</red>'}`
            });
            emit('log', {
                value: `<yellow>○</yellow> Purge       : ${params.purge ? '<green>true</green>' : '<red>false</red>'}`
            });
            emit('log', {
                value: `<yellow>○</yellow> Plugins     :`
            });
            this.postcssBuilderSettings.postcss.plugins.forEach(pluginName => {
                emit('log', {
                    value: `<yellow>|------------</yellow> : ${pluginName}`
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
            const result = yield __postcss(plugins).process(src !== null && src !== void 0 ? src : '', {
                from
            });
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }
            finalCss = result.css;
            // purge if needed
            if (params.purge) {
                emit('log', {
                    value: `<green>[build]</green> Purging unused css`
                });
                // get content to use
                const content = [];
                const globs = [];
                this.postcssBuilderSettings.purgecss.content.forEach(contentObj => {
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
                files.forEach(file => {
                    content.push({
                        extension: file.extension,
                        raw: __expandPleasantCssClassnames(file.content)
                    });
                });
                const purgeCssResult = yield new PurgeCSS().purge(Object.assign(Object.assign({}, this.postcssBuilderSettings.purgecss), { content, css: [{
                            raw: finalCss
                        }] }));
                finalCss = purgeCssResult[0].css;
            }
            // minify
            if (params.minify) {
                emit('log', {
                    value: `<green>[build]</green> Minifying css`
                });
                finalCss = __csso.minify(finalCss, {
                    restructure: true
                }).css;
            }
            if (params.output) {
                __writeFileSync(params.output, finalCss);
                const file = new __SFile(params.output);
                emit('log', {
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                });
            }
            const res = {
                outputFile: params.output ? __SFile.new(params.output) : undefined,
                css: finalCss,
                map: null
            };
            if (from)
                res.inputFile = __SFile.new(from);
            resolve(res);
        }), {
            metas: {
                id: this.constructor.name
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1Bvc3Rjc3NCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sNkJBQTZCLE1BQU0sNkRBQTZELENBQUM7QUFDeEcsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxxQ0FBcUMsTUFBTSxpREFBaUQsQ0FBQztBQUNwRyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQThEcEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFFbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDdEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQWdEO1FBQ3hELEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDZCxjQUFjLG9CQUNQLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FDMUM7U0FDSixFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FB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