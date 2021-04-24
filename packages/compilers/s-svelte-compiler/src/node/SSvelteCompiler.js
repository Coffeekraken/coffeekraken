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
                value: 'Starting <red>Svelte</red> file(s) compilation...'
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
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
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
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
                            return {
                                code: input.content
                            };
                        }),
                        script: (input) => __awaiter(this, void 0, void 0, function* () {
                            // return {
                            //   code: input.content
                            // };
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
                                code: res.files[0].content
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCw0RkFBc0U7QUFDdEUsMEVBQW1EO0FBQ25ELDBFQUFtRTtBQUNuRSw0RUFBd0Q7QUFDeEQsb0dBQThFO0FBQzlFLGdGQUF3RDtBQUN4RCxrRkFBNEQ7QUFDNUQsOEZBQXdFO0FBQ3hFLHdGQUFrRTtBQUNsRSxnREFBMEI7QUFDMUIsMERBQWlDO0FBQ2pDLDBEQUFtQztBQUNuQywyR0FBcUY7QUFDckYsNkZBQXVFO0FBQ3ZFLG9GQUFpRTtBQUVqRSxhQUFhO0FBQ2IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxzQkFBc0I7QUF1Qm5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sZUFBZ0IsU0FBUSxvQkFBVztJQXNCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUErQyxFQUMvQyxRQUF1QztRQUV2QyxLQUFLLENBQ0gsYUFBYSxhQUFiLGFBQWEsY0FBYixhQUFhLEdBQUksRUFBRSxFQUNuQixtQkFBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxLQUFLO2FBQ2I7WUFDRCxjQUFjLEVBQUUsRUFBRTtTQUNuQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFHSjs7Ozs7Ozs7Ozs7Ozs7V0FjRztRQUNILGdCQUFXLEdBQTJCLEVBQUUsQ0FBQztJQWpCekMsQ0FBQztJQXhDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHNCQUFzQjtRQUN4QixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUE4Q0QsUUFBUSxDQUNOLE1BQThCLEVBQzlCLFdBQThD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