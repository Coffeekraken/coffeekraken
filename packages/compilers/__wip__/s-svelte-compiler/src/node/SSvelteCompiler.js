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
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SDuration from '@coffeekraken/s-duration';
import __SCompiler from '@coffeekraken/s-compiler';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SSvelteCompilerInterface from './interface/SSvelteCompilerInterface';
import __STsCompiler from '@coffeekraken/s-ts-compiler';
import __SPostcssCompiler from '@coffeekraken/s-postcss-compiler';
import __tmpDir from '@coffeekraken/sugar/node/path/tmpDir';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __path from 'path';
import __uglify from 'uglify-js';
import __cleanCss from 'clean-css';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
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
class SSvelteCompiler extends __SCompiler {
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
        super(initialParams !== null && initialParams !== void 0 ? initialParams : {}, __deepMerge({
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
        return new __SPromise(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = __deepMerge(this.svelteCompilerSettings, {}, settings);
            let result;
            const input = Array.isArray(params.input)
                ? params.input
                : [params.input];
            emit('log', {
                group: 's-svelte-compiler',
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
            const pool = __fsPool(input, {
                watch: params.watch
            });
            on('finally', () => {
                pool.cancel();
            });
            pool.on('files,update', (files) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const compiledFiles = [];
                const duration = new __SDuration();
                files = Array.isArray(files) ? files : [files];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const color = (_a = this._filesColor[file.path]) !== null && _a !== void 0 ? _a : __pickRandom(__availableColors());
                    this._filesColor[file.path] = color;
                    emit('log', {
                        group: 's-svelte-compiler',
                        value: `<${color}>[${__getFilename(file.path)}]</${color}> Starting compilation`
                    });
                    // preprocess
                    try {
                        const preprocessResult = yield __svelte.preprocess(file.content, {
                            style: (input) => __awaiter(this, void 0, void 0, function* () {
                                // write a temp file to compile
                                const tmpCssFilePath = `${__tmpDir()}/SSvelteCompiler/${Date.now()}.css`;
                                __writeFileSync(`${tmpCssFilePath}`, input.content);
                                const compiler = new __SPostcssCompiler({}, {
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
                                __removeSync(tmpCssFilePath);
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
                                const tmpTsFilePath = `${__tmpDir()}/SSvelteCompiler/${Date.now()}.ts`;
                                __writeFileSync(`${tmpTsFilePath}`, input.content);
                                const compiler = new __STsCompiler();
                                const res = yield compiler.compile({
                                    input: [tmpTsFilePath],
                                    rootDir: `${__tmpDir()}/SSvelteCompiler`,
                                    config: 'js',
                                    save: false
                                });
                                if (!res || !res.files || !res.files.length) {
                                    return {
                                        code: input.content
                                    };
                                }
                                // remove temp file
                                __removeSync(tmpTsFilePath);
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
                            group: 's-svelte-compiler',
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
                        const relPath = __path.relative(params.inDir, file.path);
                        outputPath = `${__path.resolve(params.outDir, relPath)}`;
                    }
                    outputPath = outputPath.replace(/\.svelte$/, '.js');
                    emit('log', {
                        group: 's-svelte-compiler',
                        value: `<${color}>[${__getFilename(file.path)}]</${color}> Compilation <green>successfull</green>`
                    });
                    // check if need to save file
                    if (params.save) {
                        if (result.js.code) {
                            if (params.minify) {
                                result.js.code = __uglify.minify(result.js.code).code;
                            }
                            emit('log', {
                                group: 's-svelte-compiler',
                                value: `<${color}>[${__getFilename(file.path)}]</${color}> Saving <cyan>js</cyan> file under "<cyan>${__path.relative(params.rootDir, outputPath)}</cyan>"`
                            });
                            __writeFileSync(outputPath, result.js.code);
                            if (params.map && result.js.map) {
                                emit('log', {
                                    group: 's-svelte-compiler',
                                    value: `<${color}>[${__getFilename(file.path)}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${__path.relative(params.rootDir, outputPath)}.map</cyan>"`
                                });
                                __writeFileSync(outputPath + '.map', JSON.stringify(result.js.map, null, 4));
                            }
                        }
                        if (result.css.code) {
                            if (params.minify) {
                                result.css.code = new __cleanCss({}).minify(result.css.code);
                            }
                            emit('log', {
                                group: 's-svelte-compiler',
                                value: `<${color}>[${__getFilename(file.path)}]</${color}> Saving <yellow>css</yellow> file under "<cyan>${__path.relative(params.rootDir, outputPath.replace(/\.js$/, '.css'))}</cyan>"`
                            });
                            __writeFileSync(outputPath.replace(/\.js$/, '.css'), result.css.code);
                            if (params.map && result.css.map) {
                                emit('log', {
                                    group: 's-svelte-compiler',
                                    value: `<${color}>[${__getFilename(file.path)}]</${color}> Saving <yellow>map</yellow> file under "<cyan>${__path.relative(params.rootDir, outputPath.replace(/\.js$/, '.css'))}.map</cyan>"`
                                });
                                __writeFileSync(outputPath.replace(/\.js$/, '.css') + '.map', JSON.stringify(result.css.map, null, 4));
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
                        group: 's-svelte-compiler',
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
        class: __SSvelteCompilerInterface
    }
};
export default SSvelteCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFdBQTJCLE1BQU0sMEJBQTBCLENBQUM7QUFDbkUsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTywwQkFBMEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLGFBQWEsTUFBTSw2QkFBNkIsQ0FBQztBQUN4RCxPQUFPLGtCQUFrQixNQUFNLGtDQUFrQyxDQUFDO0FBQ2xFLE9BQU8sUUFBUSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8saUJBQWlCLE1BQU0sc0RBQXNELENBQUM7QUFDckYsT0FBTyxZQUFZLE1BQU0sNkNBQTZDLENBQUM7QUFDdkUsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsYUFBYTtBQUNiLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO0FBdUJuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLGVBQWdCLFNBQVEsV0FBVztJQXNCdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUErQyxFQUMvQyxRQUF1QztRQUV2QyxLQUFLLENBQ0gsYUFBYSxhQUFi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