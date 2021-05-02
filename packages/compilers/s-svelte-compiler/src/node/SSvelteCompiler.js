"use strict";
// @ts-nocheck
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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_compiler_1 = __importDefault(require("@coffeekraken/s-compiler"));
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const SSvelteCompilerInterface_1 = __importDefault(require("./interface/SSvelteCompilerInterface"));
const s_ts_compiler_1 = __importDefault(require("@coffeekraken/s-ts-compiler"));
const s_postcss_compiler_1 = __importDefault(require("@coffeekraken/s-postcss-compiler"));
const tmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/tmpDir"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const path_1 = __importDefault(require("path"));
const uglify_js_1 = __importDefault(require("uglify-js"));
const clean_css_1 = __importDefault(require("clean-css"));
const availableColors_1 = __importDefault(require("@coffeekraken/sugar/shared/dev/color/availableColors"));
const pickRandom_1 = __importDefault(require("@coffeekraken/sugar/shared/array/pickRandom"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
// @ts-ignore
const __svelte = require('svelte/compiler'); // eslint-disable-line
/**
 * @name                SSvelteCompiler
 * @namespace           sugar.node.svelte
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "svelte" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISSvelteCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSvelteCompiler from '@coffeekraken/sugar/node/scss/compile/SSvelteCompiler';
 * const compiler = new SSvelteCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.svelte');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompiler extends s_compiler_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(initialParams, settings) {
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, deepMerge_1.default({
            metas: {
                color: 'red'
            },
            svelteCompiler: {}
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name              _compile
         * @type              Function
         * @async
         *
         * This method is the main one that allows you to actually compile the
         * code you pass either inline, either a file path.
         *
         * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
         * @param         {Object}            [settings={}]       An object of settings to override the instance ones
         * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
         *
         * @since             2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._filesColor = {};
    }
    /**
     * @name      svelteCompilerSettings
     * @type      ISSvelteCompilerSettings
     * @get
     *
     * Access to the svelte compiler settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get svelteCompilerSettings() {
        return this._settings.svelteCompiler;
    }
    _compile(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.svelteCompilerSettings, {}, settings);
            const input = Array.isArray(params.input)
                ? params.input
                : [params.input];
            emit('log', {
                value: 'Starting <red>Svelte</red> file(s) compilation process...'
            });
            // if (params.watch) {
            //   emit('log', {
            //     value: `<blue>[watch]</blue> Watching for changes...`
            //   });
            // }
            // prod
            if (params.prod) {
                params.minify = true;
            }
            const pool = pool_1.default(input, {
                watch: params.watch
            });
            // handle cancel
            on('finally', () => {
                pool.cancel();
            });
            pool.on('files,update', (files) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const compiledFiles = [];
                const duration = new s_duration_1.default();
                files = Array.isArray(files) ? files : [files];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const color = (_a = this._filesColor[file.path]) !== null && _a !== void 0 ? _a : pickRandom_1.default(availableColors_1.default());
                    this._filesColor[file.path] = color;
                    emit('log', {
                        value: `<${color}>[${filename_1.default(file.path)}]</${color}> Starting compilation`
                    });
                    // preprocess
                    const preprocessResult = yield __svelte.preprocess(file.content, {
                        style: (input) => __awaiter(this, void 0, void 0, function* () {
                            // write a temp file to compile
                            const tmpCssFilePath = `${tmpDir_1.default()}/SSvelteCompiler/${Date.now()}.css`;
                            writeFileSync_1.default(`${tmpCssFilePath}`, input.content);
                            const compiler = new s_postcss_compiler_1.default();
                            const res = yield compiler.compile({
                                input: [tmpCssFilePath],
                                save: false
                            });
                            if (!res || !res.files || !res.files.length) {
                                return {
                                    code: input.content
                                };
                            }
                            // remove temp file
                            removeSync_1.default(tmpCssFilePath);
                            return {
                                code: res.files[0].css
                            };
                        }),
                        script: (input) => __awaiter(this, void 0, void 0, function* () {
                            if (!input.attributes ||
                                !input.attributes.type ||
                                input.attributes.type !== 'text/ts') {
                                return {
                                    code: input.content
                                };
                            }
                            // write a temp file to compile
                            const tmpTsFilePath = `${tmpDir_1.default()}/SSvelteCompiler/${Date.now()}.ts`;
                            writeFileSync_1.default(`${tmpTsFilePath}`, input.content);
                            const compiler = new s_ts_compiler_1.default();
                            const res = yield compiler.compile({
                                input: [tmpTsFilePath],
                                rootDir: `${tmpDir_1.default()}/SSvelteCompiler`,
                                config: 'js',
                                save: false
                            });
                            if (!res || !res.files || !res.files.length) {
                                return {
                                    code: input.content
                                };
                            }
                            // remove temp file
                            removeSync_1.default(tmpTsFilePath);
                            return {
                                code: res.files[0].js
                            };
                        })
                    }, {});
                    // render svelte
                    const result = __svelte.compile(preprocessResult.code, Object.assign({ filename: file.name, dev: !params.prod, customElement: true, preserveComments: !params.stripComments, preserveWhitespace: !params.prod, outputFilename: file.name, cssOutputFilename: file.name }, (params.svelte || {})));
                    result.warnings.forEach((warning) => {
                        emit('warn', {
                            value: warning.toString()
                        });
                    });
                    let outputPath = file.path;
                    if (params.outDir) {
                        const relPath = path_1.default.relative(params.inDir, file.path);
                        outputPath = `${path_1.default.resolve(params.outDir, relPath)}`;
                    }
                    outputPath = outputPath.replace(/\.svelte$/, '.js');
                    emit('log', {
                        value: `<${color}>[${filename_1.default(file.path)}]</${color}> Compilation <green>successfull</green>`
                    });
                    // check if need to save file
                    if (params.save) {
                        if (result.js.code) {
                            if (params.minify) {
                                result.js.code = uglify_js_1.default.minify(result.js.code).code;
                            }
                            emit('log', {
                                value: `<${color}>[${filename_1.default(file.path)}]</${color}> Saving <cyan>js</cyan> file under "<cyan>${path_1.default.relative(params.rootDir, outputPath)}</cyan>"`
                            });
                            writeFileSync_1.default(outputPath, result.js.code);
                            if (params.map && result.js.map) {
                                emit('log', {
                                    value: `<${color}>[${filename_1.default(file.path)}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${path_1.default.relative(params.rootDir, outputPath)}.map</cyan>"`
                                });
                                writeFileSync_1.default(outputPath + '.map', JSON.stringify(result.js.map, null, 4));
                            }
                        }
                        if (result.css.code) {
                            if (params.minify) {
                                result.css.code = new clean_css_1.default({}).minify(result.css.code);
                            }
                            emit('log', {
                                value: `<${color}>[${filename_1.default(file.path)}]</${color}> Saving <yellow>css</yellow> file under "<cyan>${path_1.default.relative(params.rootDir, outputPath.replace(/\.js$/, '.css'))}</cyan>"`
                            });
                            writeFileSync_1.default(outputPath.replace(/\.js$/, '.css'), result.css.code);
                            if (params.map && result.css.map) {
                                emit('log', {
                                    value: `<${color}>[${filename_1.default(file.path)}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${path_1.default.relative(params.rootDir, outputPath.replace(/\.js$/, '.css'))}.map</cyan>"`
                                });
                                writeFileSync_1.default(outputPath.replace(/\.js$/, '.css') + '.map', JSON.stringify(result.css.map, null, 4));
                            }
                        }
                    }
                    compiledFiles.push({
                        path: outputPath,
                        js: result.js.code,
                        css: result.css.code,
                        warnings: result.warnings
                    });
                }
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
                else {
                    resolve(Object.assign({ files: compiledFiles }, duration.end()));
                }
            }));
        }), {
            eventEmitter: {
                bind: this
            }
        });
    }
}
SSvelteCompiler.interfaces = {
    params: {
        apply: false,
        class: SSvelteCompilerInterface_1.default
    }
};
exports.default = SSvelteCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCw0RkFBc0U7QUFDdEUsMEVBQW1EO0FBQ25ELDBFQUFtRTtBQUNuRSw0RUFBd0Q7QUFDeEQsb0dBQThFO0FBQzlFLGdGQUF3RDtBQUN4RCwwRkFBa0U7QUFDbEUsa0ZBQTREO0FBQzVELDhGQUF3RTtBQUN4RSx3RkFBa0U7QUFDbEUsZ0RBQTBCO0FBQzFCLDBEQUFpQztBQUNqQywwREFBbUM7QUFDbkMsMkdBQXFGO0FBQ3JGLDZGQUF1RTtBQUN2RSxvRkFBaUU7QUFFakUsYUFBYTtBQUNiLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO0FBdUJuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGVBQWdCLFNBQVEsb0JBQVc7SUFzQnZDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0UsYUFBK0MsRUFDL0MsUUFBdUM7UUFFdkMsS0FBSyxDQUNILGFBQWEsYUFBYixhQUFhLGNBQWIsYUFBYSxHQUFJLEVBQUUsRUFDbkIsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsY0FBYyxFQUFFLEVBQUU7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBR0o7Ozs7Ozs7Ozs7Ozs7O1dBY0c7UUFDSCxnQkFBVyxHQUEyQixFQUFFLENBQUM7SUFqQnpDLENBQUM7SUF4Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDeEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztJQUM5QyxDQUFDO0lBOENELFFBQVEsQ0FDTixNQUE4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