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
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
const clean_css_1 = __importDefault(require("clean-css"));
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
class SPostcssCompiler extends s_compiler_1.default {
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
            let input = Array.isArray(params.input) ? params.input : [params.input];
            emit('log', {
                value: 'Starting <yellow>CSS</yellow> file(s) compilation...'
            });
            // prod
            if (params.prod) {
                params.minify = true;
                params.beautify = false;
                params.optimize = true;
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
                    postCssPlugins.push(required((_b = Object.assign({}, pluginObj.settings)) !== null && _b !== void 0 ? _b : {}));
                });
            }
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
                const duration = new s_duration_1.default();
                files = Array.isArray(files) ? files : [files];
                let resObject = {
                    files: []
                };
                files.forEach((file, i) => __awaiter(this, void 0, void 0, function* () {
                    const fileDuration = new s_duration_1.default();
                    emit('log', {
                        value: `<yellow>[compile]</yellow> Start compiling "<cyan>${file.relPath}</cyan>" file`
                    });
                    let res = yield postcss_1.default([
                        require('@coffeekraken/s-postcss-sugar-plugin').default
                    ]).process(file.content, {
                        from: file.path
                    });
                    res = yield postcss_1.default(postCssPlugins).process(res.css, {
                        from: file.path
                    });
                    const fileEnd = fileDuration.end();
                    emit('log', {
                        value: `<green>[success]</green> File "<cyan>${file.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${fileEnd.formatedDuration}</yellow>`
                    });
                    if (params.beautify && res.css) {
                        res.css = new clean_css_1.default({
                            format: 'beautify',
                            level: 0
                        }).minify(res.css).styles;
                    }
                    if (params.optimize && res.css) {
                        res.css = new clean_css_1.default({
                            level: 2
                        }).minify(res.css).styles;
                    }
                    if (res.css) {
                        resObject.files.push(Object.assign({ css: res.css, map: res.map }, fileDuration.end()));
                    }
                    if (params.save && res.css) {
                        const outPath = path_1.default.resolve(params.outDir, path_1.default.relative(params.inDir, file.path));
                        fs_1.default.writeFileSync(outPath, res.css);
                        emit('log', {
                            value: `<green>[save]</green> File "<cyan>${file.relPath}</cyan>" saved under "<magenta>${path_1.default.relative(params.rootDir, outPath)}</magenta>"`
                        });
                    }
                    if (i >= files.length - 1) {
                        const end = duration.end();
                        resObject = Object.assign(Object.assign({}, resObject), end);
                        emit('log', {
                            value: `<green>[success]</green> Compilation finished <green>successfully</green> in <yellow>${end.formatedDuration}</yellow>`
                        });
                        if (params.watch) {
                            emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Bvc3Rjc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNQb3N0Y3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBQ25ELDRGQUFzRTtBQUN0RSx3RUFBaUQ7QUFDakQsc0RBQWdDO0FBQ2hDLGtGQUF5RDtBQUN6RCwwRUFBbUU7QUFDbkUsMERBQW1DO0FBTW5DLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFHdEIsc0dBQWdGO0FBa0NoRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGdCQUFpQixTQUFRLG9CQUFXO0lBc0J4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQWdELEVBQ2hELFFBQXdDO1FBRXhDLEtBQUssQ0FDSCxhQUFhLGFBQWIsYUFBYSxjQUFiLGFBQWEsR0FBSSxFQUFFLEVBQ25CLG1CQUFXLENBQ1Q7WUFDRSxlQUFlLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHVCQUF1QjtRQUN6QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDO0lBQy9DLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBK0IsRUFDL0IsV0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQzVDLE1BQU0sR0FBRyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVwRSxNQUFNLGdCQUFnQixHQUFHLHdCQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7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