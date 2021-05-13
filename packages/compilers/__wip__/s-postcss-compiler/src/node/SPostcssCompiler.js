var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SDuration from '@coffeekraken/s-duration';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __postCss from 'postcss';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __SCompiler from '@coffeekraken/s-compiler';
import __cleanCss from 'clean-css';
import __path from 'path';
import __fs from 'fs';
import __SPostcssCompilerInterface from './interface/SPostcssCompilerInterface';
/**
 * @name                SPostcssCompiler
 * @namespace           s-postcss-compiler
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * Compiler that allows you to compile css using postcss
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISPostcssCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISPostcssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SPostcssCompiler from '@coffeekraken/s-postcss-compiler';
 * const compiler = new SPostcssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.css');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SPostcssCompiler extends __SCompiler {
    /**
     * @name            constructor
     * @type             Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, __deepMerge({
            postcssCompiler: {
                env: {},
                pluginsSettings: {}
            }
        }, settings || {}));
    }
    /**
     * @name          postcssCompilerSettings
     * @type          ISPostcssCompilerSettings
     * @get
     *
     * Access the js compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get postcssCompilerSettings() {
        return this._settings.postcssCompiler;
    }
    /**
     * @name              _compile
     * @type              Function
     * @async
     *
     * This method is the main one that allows you to actually compile the
     * code you pass either inline, either a file path.
     *
     * @param         {ISPostcssCompilerParams}            params          The params to use for this compilation process
     * @param         {Partial<ISPostcssCompilerSettings>}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings = {}) {
        return new __SPromise(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            const set = __deepMerge(this.postcssCompilerSettings, {}, settings);
            const cssCompileConfig = __sugarConfig('css.compile');
            let input = Array.isArray(params.input) ? params.input : [params.input];
            emit('log', {
                group: 's-postcss-compiler',
                value: 'Starting <yellow>CSS</yellow> file(s) compilation...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
                params.beautify = false;
                params.optimize = true;
            }
            const pool = __fsPool(input, {
                watch: params.watch
            });
            on('finally', () => {
                pool.cancel();
            });
            const postCssPlugins = [];
            if (cssCompileConfig.plugins) {
                Object.keys(cssCompileConfig.plugins).forEach((pluginName) => {
                    var _a, _b, _c;
                    if (pluginName === 'cssnano' && !params.minify)
                        return;
                    if (pluginName === 'postcssImport' && !params.bundle)
                        return;
                    const pluginObj = cssCompileConfig.plugins[pluginName];
                    let required = require(pluginObj.import); // eslint-disable-line
                    required = (_a = required.default) !== null && _a !== void 0 ? _a : required;
                    postCssPlugins.push(required((_c = Object.assign(Object.assign({}, pluginObj.settings), ((_b = this.postcssCompilerSettings.pluginsSettings[pluginName]) !== null && _b !== void 0 ? _b : {}))) !== null && _c !== void 0 ? _c : {}));
                });
            }
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
                const duration = new __SDuration();
                files = Array.isArray(files) ? files : [files];
                let resObject = {
                    files: []
                };
                files.forEach((file, i) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const fileDuration = new __SDuration();
                    emit('log', {
                        group: 's-postcss-compiler',
                        type: 'verbose',
                        value: `<yellow>[compile]</yellow> Start compiling "<cyan>${file.relPath}</cyan>" file`
                    });
                    let res = yield __postCss([
                        require('@coffeekraken/s-postcss-sugar-plugin').default(Object.assign({ target: 'global' }, ((_a = this.postcssCompilerSettings.pluginsSettings.sugar) !== null && _a !== void 0 ? _a : {})))
                    ]).process(file.content, {
                        from: file.path
                    });
                    res = yield __postCss(postCssPlugins).process(res.css, {
                        from: file.path
                    });
                    const fileEnd = fileDuration.end();
                    emit('log', {
                        group: 's-postcss-compiler',
                        value: `<green>[success]</green> File "<cyan>${file.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${fileEnd.formatedDuration}</yellow>`
                    });
                    if (params.beautify && res.css) {
                        res.css = new __cleanCss({
                            format: 'beautify',
                            level: 0
                        }).minify(res.css).styles;
                    }
                    if (params.optimize && res.css) {
                        res.css = new __cleanCss({
                            level: 2
                        }).minify(res.css).styles;
                    }
                    if (res.css) {
                        resObject.files.push(Object.assign({ css: res.css, map: res.map }, fileDuration.end()));
                    }
                    if (params.save && res.css) {
                        const outPath = __path.resolve(params.outDir, __path.relative(params.inDir, file.path));
                        __fs.writeFileSync(outPath, res.css);
                        emit('log', {
                            group: 's-postcss-compiler',
                            value: `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" saved under "<magenta>${__path.relative(params.rootDir, outPath)}</magenta>"`
                        });
                    }
                    if (i >= files.length - 1) {
                        const end = duration.end();
                        resObject = Object.assign(Object.assign({}, resObject), end);
                        emit('log', {
                            group: 's-postcss-compiler',
                            value: `<green>[success]</green> Compilation finished <green>successfully</green> in <yellow>${end.formatedDuration}</yellow>`
                        });
                        if (params.watch) {
                            emit('log', {
                                group: 's-postcss-compiler',
                                value: `<blue>[watch]</blue> Watching for changes...`
                            });
                        }
                        else {
                            resolve(resObject);
                        }
                    }
                }));
            }));
            if (params.watch) {
                emit('log', {
                    group: 's-postcss-compiler',
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
}
SPostcssCompiler.interfaces = {
    params: {
        apply: false,
        class: __SPostcssCompilerInterface
    }
};
export default SPostcssCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sV0FBMkIsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLFVBQVUsTUFBTSxXQUFXLENBQUM7QUFNbkMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0QixPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBcUNoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGdCQUFpQixTQUFRLFdBQVc7SUFzQnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBZ0QsRUFDaEQsUUFBd0M7UUFFeEMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsV0FBVyxDQUNUO1lBQ0UsZUFBZSxFQUFFO2dCQUNmLEdBQUcsRUFBRSxFQUFFO2dCQUNQLGVBQWUsRUFBRSxFQUFFO2FBQ3BCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUF4Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSx1QkFBdUI7UUFDekIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztJQUMvQyxDQUFDO0lBOEJEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsUUFBUSxDQUNO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