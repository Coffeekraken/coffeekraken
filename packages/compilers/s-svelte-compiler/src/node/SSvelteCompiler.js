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
            let result;
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
                    try {
                        const preprocessResult = yield __svelte.preprocess(file.content, {
                            style: (input) => __awaiter(this, void 0, void 0, function* () {
                                // write a temp file to compile
                                const tmpCssFilePath = `${tmpDir_1.default()}/SSvelteCompiler/${Date.now()}.css`;
                                writeFileSync_1.default(`${tmpCssFilePath}`, input.content);
                                const compiler = new s_postcss_compiler_1.default({}, {
                                    postcssCompiler: {
                                        pluginsSettings: {
                                            sugar: {
                                                target: 'component'
                                            }
                                        }
                                    }
                                });
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
                        result = __svelte.compile(preprocessResult.code, Object.assign({ filename: file.name, dev: !params.prod, customElement: true, preserveComments: !params.stripComments, preserveWhitespace: !params.prod, outputFilename: file.name, cssOutputFilename: file.name }, (params.svelte || {})));
                    }
                    catch (e) {
                        emit('error', {
                            value: [
                                e.message,
                                `<yellow>${e.filename}</yellow>`,
                                e.frame
                            ].join('\n')
                        });
                    }
                    if (result && result.warnings) {
                        result.warnings.forEach((warning) => {
                            emit('warn', {
                                value: warning.toString()
                            });
                        });
                    }
                    if (!result)
                        return;
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