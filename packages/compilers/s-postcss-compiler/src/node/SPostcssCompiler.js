"use strict";
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
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const postcss_1 = __importDefault(require("postcss"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const SCompiler_1 = __importDefault(require("@coffeekraken/sugar/node/compiler/SCompiler"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const SPostcssCompilerInterface_1 = __importDefault(require("./interface/SPostcssCompilerInterface"));
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
class SPostcssCompiler extends SCompiler_1.default {
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, deepMerge_1.default({
            postcssCompiler: {}
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
        return new s_promise_1.default(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            const set = deepMerge_1.default(this.postcssCompilerSettings, {}, settings);
            const cssCompileConfig = sugar_1.default('css.compile');
            const input = Array.isArray(params.input)
                ? params.input
                : [params.input];
            emit('log', {
                value: 'Starting <yellow>CSS</yellow> file(s) compilation...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
            }
            const pool = pool_1.default(input, {
                watch: params.watch
            });
            on('finally', () => {
                pool.cancel();
            });
            const postCssPlugins = [];
            if (cssCompileConfig.plugins) {
                Object.keys(cssCompileConfig.plugins).forEach((pluginName) => {
                    var _a, _b;
                    if (pluginName === 'cssnano' && !params.minify)
                        return;
                    if (pluginName === 'postcssImport' && !params.bundle)
                        return;
                    const pluginObj = cssCompileConfig.plugins[pluginName];
                    let required = require(pluginObj.import); // eslint-disable-line
                    required = (_a = required.default) !== null && _a !== void 0 ? _a : required;
                    postCssPlugins.push(required((_b = pluginObj.settings) !== null && _b !== void 0 ? _b : {}));
                });
            }
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
                const duration = new s_duration_1.default();
                files = Array.isArray(files) ? files : [files];
                files.forEach((file, i) => __awaiter(this, void 0, void 0, function* () {
                    const fileDuration = new s_duration_1.default();
                    const res = yield postcss_1.default(postCssPlugins).process(file.content, {
                        from: file.path
                    });
                    const outPath = path_1.default.resolve(params.outDir, path_1.default.relative(params.inDir, file.path));
                    const fileEnd = fileDuration.end();
                    emit('log', {
                        value: `<green>[success]</green> File "<cyan>${file.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${fileEnd.formatedDuration}</yellow>`
                    });
                    if (params.save && res.css) {
                        fs_1.default.writeFileSync(outPath, res.css);
                        emit('log', {
                            type: 'file',
                            action: 'save',
                            file,
                            to: path_1.default.relative(params.rootDir, outPath)
                        });
                    }
                    if (i >= files.length - 1) {
                        const end = duration.end();
                        if (params.watch) {
                            emit('log', {
                                value: `<blue>[watch]</blue> Watching for changes...`
                            });
                        }
                        else {
                            emit('log', {
                                value: `<green>[success]</green> Compilation finished <green>successfully</green> in <yellow>${end.formatedDuration}</yellow>`
                            });
                        }
                    }
                }));
                //   emit('log', {
                //     value: `<${color}>[${
                //       files.length === 1
                //         ? __getFilename(files[0].path)
                //         : files.length + ' files'
                //     }]</${color}> Starting compilation`
                //   });
                //
                // let resultObj;
                // try {
                //   // resultObj = await __esbuild.build(esbuildParams);
                // } catch (e) {
                //   return reject(e);
                // }
                //   emit('log', {
                //     value: `<green>[success]</green> <${color}>${
                //       files.length === 1
                //         ? __getFilename(files[0].path)
                //         : files.length + ' files'
                //     }</${color}> compiled`
                //   });
            }));
            if (params.watch) {
                emit('log', {
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
        class: SPostcssCompilerInterface_1.default
    }
};
exports.default = SPostcssCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsc0RBQWdDO0FBQ2hDLG9GQUFvRTtBQUNwRSw0RkFFcUQ7QUFFckQsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUd0QixzR0FBZ0Y7QUFnQ2hGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sZ0JBQWlCLFNBQVEsbUJBQVc7SUFzQnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBZ0QsRUFDaEQsUUFBd0M7UUFFeEMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLGVBQWUsRUFBRSxFQUFFO1NBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksdUJBQXVCO1FBQ3pCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUErQixFQUMvQixXQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXBFLE1BQU0sZ0JBQWdCLEdBQUcsZUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXRELE1BQU0sS0FB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