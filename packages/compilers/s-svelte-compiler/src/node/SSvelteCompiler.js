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
const SCompiler_1 = __importDefault(require("@coffeekraken/sugar/node/compiler/SCompiler"));
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const SSvelteCompilerInterface_1 = __importDefault(require("./interface/SSvelteCompilerInterface"));
const s_ts_compiler_1 = __importDefault(require("@coffeekraken/s-ts-compiler"));
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
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
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
class SSvelteCompiler extends SCompiler_1.default {
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
        super(initialParams, deepMerge_1.default({
            svelteCompiler: {}
        }, settings || {}));
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
    /**
     * @name              _compile
     * @type              Function
     * @async
     *
     * This method is the main one that allows you to actually compile the
     * code you pass either inline, either a file path.
     *
     * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
     * @param         {Object}            [settings={}]       An object of settings to override the instance ones
     * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _compile(params, settings = {}) {
        return new s_promise_1.default(({ resolve, reject, pipe, emit, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.svelteCompilerSettings, {}, settings);
            const input = Array.isArray(params.input)
                ? params.input
                : [params.input];
            // prod
            if (params.prod) {
                params.style = 'compressed';
                params.minify = true;
                params.stripComments = true;
            }
            const pool = pool_1.default(input, {
                watch: params.watch
            });
            // handle cancel
            on('cancel', () => {
                pool.cancel();
            });
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
                files = Array.isArray(files) ? files : [files];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    console.log(file.content);
                    console.log(params);
                    // preprocess
                    const preprocessResult = yield __svelte.preprocess(file.content, {
                        style: (input) => __awaiter(this, void 0, void 0, function* () {
                            return {
                                code: input.content
                            };
                            // if (
                            //   !input.attributes ||
                            //   !input.attributes.type ||
                            //   input.attributes.type !== 'text/scss'
                            // ) {
                            //   return {
                            //     code: input.content
                            //   };
                            // }
                            // if (input.content.trim() === '') {
                            //   return '';
                            // }
                            // // create a temp file
                            // const tmpSScssFile = new __SScssFile(
                            //   '%tmpDir/svelte/compile.scss',
                            //   {
                            //     file: {
                            //       checkExistence: false
                            //     }
                            //   }
                            // );
                            // tmpSScssFile.writeSync(input.content);
                            // emit('log', {
                            //   value: `<yellow>[scss]</yellow> Processing scss`
                            // });
                            // const compileRes = await tmpSScssFile.compile({
                            //   save: false,
                            //   map: false
                            // });
                            // if (compileRes.css) {
                            //   emit('log', {
                            //     value: `<green>[scss]</green> Scss processed <green>successfully</green>`
                            //   });
                            //   return {
                            //     code: compileRes.css
                            //   };
                            // } else {
                            //   return compileRes;
                            // }
                        }),
                        script: (input) => __awaiter(this, void 0, void 0, function* () {
                            if (!input.attributes ||
                                !input.attributes.type ||
                                input.attributes.type !== 'text/ts') {
                                return {
                                    code: input.content
                                };
                            }
                            const compiler = new s_ts_compiler_1.default();
                            // // create a temp file
                            // const tmpTsFile = new __STsFile('%tmpDir/ts/compile.ts', {
                            //   file: {
                            //     checkExistence: false
                            //   }
                            // });
                            // tmpTsFile.writeSync(input.content);
                            // emit('log', {
                            //   value: `<yellow>[ts]</yellow> Processing typescript`
                            // });
                            // const compilePromise = tmpTsFile.compile({
                            //   save: false,
                            //   // @ts-ignore
                            //   target: 'browser',
                            //   map: false
                            // });
                            // // const compiler = new __STsCompiler();
                            // // const compilePromise = compiler.compile({
                            // //   input: [tmpTsFile.path],
                            // //   rootDir: tmpTsFile.dirPath,
                            // //   save: false,
                            // //   transpileOnly: true,
                            // //   target: 'browser',
                            // //   map: false
                            // // });
                            // pipe(compilePromise, {
                            //   events: 'error'
                            // });
                            // const compileRes = await compilePromise;
                            // if (compileRes.js) {
                            //   emit('log', {
                            //     value: `<green>[ts]</green> Typescript processed <green>successfully</green>`
                            //   });
                            //   return {
                            //     code: compileRes.js
                            //   };
                            // } else {
                            //   return compileRes;
                            // }
                        })
                    }, {});
                    // render svelte
                    const result = __svelte.compile(preprocessResult.code, Object.assign({ filename: file.name, dev: !params.prod, customElement: true, preserveComments: !params.stripComments, preserveWhitespace: !params.prod, outputFilename: file.name, cssOutputFilename: file.name }, (params.svelte || {})));
                    result.warnings.forEach((warning) => {
                        emit('warn', {
                            value: warning.toString()
                        });
                    });
                    // const compilePromise = file.compile(
                    //   {
                    //     ...params,
                    //     watch: false
                    //   },
                    //   settings
                    // );
                    // try {
                    //   pipe(compilePromise);
                    //   const compileRes = await compilePromise;
                    //   resultsObj[file.path] = compileRes;
                    //   aggregateStrArray.push(compileRes.js);
                    //   emit('file', compileRes);
                    // } catch (e) {
                    //   emit('warn', {
                    //     value: e.toString()
                    //   });
                    // }
                }
                // if (params.watch) {
                //   emit('log', {
                //     value: `<blue>[watch]</blue> Watching for changes...`
                //   });
                // } else {
                //   resolve({
                //     files: resultsObj,
                //     js: aggregateStrArray.join('\n'),
                //     ...duration.end()
                //   });
                // }
            }));
            // const resultsObj = {};
            // const aggregateStrArray: string[] = [];
            // const duration = new __SDuration();
            //
            // if (params.watch) {
            //   emit('log', {
            //     value: `<blue>[watch]</blue> Watching for changes...`
            //   });
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1N2ZWx0ZUNvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCw0RkFBc0U7QUFFdEUsNEZBRXFEO0FBQ3JELDRFQUF3RDtBQUN4RCxvR0FBOEU7QUFDOUUsZ0ZBQXdEO0FBRXhELGFBQWE7QUFDYixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtBQXVCbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxlQUFnQixTQUFRLG1CQUFXO0lBc0J2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQThDLEVBQzlDLFFBQXNDO1FBRXRDLEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLGNBQWMsRUFBRSxFQUFFO1NBQ25CLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3hCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7SUFDOUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE4QixFQUM5QixXQUE4QyxFQUFFO1FBRWhELE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDNUMsUUFBUSxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUVsRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZDLENBQUMs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