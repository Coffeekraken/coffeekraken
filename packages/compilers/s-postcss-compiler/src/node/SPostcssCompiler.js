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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
            const cssCompileConfig = s_sugar_config_1.default('css.compile');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsc0RBQWdDO0FBQ2hDLGtGQUF5RDtBQUN6RCw0RkFFcUQ7QUFFckQsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUd0QixzR0FBZ0Y7QUFnQ2hGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sZ0JBQWlCLFNBQVEsbUJBQVc7SUFzQnhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBZ0QsRUFDaEQsUUFBd0M7UUFFeEMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLGVBQWUsRUFBRSxFQUFFO1NBQ3BCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksdUJBQXVCO1FBQ3pCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7SUFDL0MsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUErQixFQUMvQixXQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDNUMsTUFBTSxHQUFHLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXBFLE1BQU0sZ0JBQWdCLEdBQUcsd0JBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV0RCxNQUFNLEtB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