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
const pool_1 = __importDefault(require("../../fs/pool"));
const SDuration_1 = __importDefault(require("../../time/SDuration"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const SJsCompilerParamsInterface_1 = __importDefault(require("./interface/SJsCompilerParamsInterface"));
/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "js" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISJsCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/js/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends SCompiler_1.default {
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
        super(initialParams, deepMerge_1.default({
            jsCompiler: {}
        }, settings || {}));
    }
    /**
     * @name          jsCompilerSettings
     * @type          ISJsCompilerSettings
     * @get
     *
     * Access the js compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsCompilerSettings() {
        return this._settings.jsCompiler;
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
            const compileSettings = deepMerge_1.default(this.jsCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            // prod
            if (params.prod) {
                params.minify = true;
                params.stripComments = true;
                params.map = false;
            }
            const duration = new SDuration_1.default();
            const pool = pool_1.default(input, {
                watch: params.watch
            });
            on('cancel', () => {
                pool.cancel();
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch]</blue> Watching for changes...`
                });
            }
            pool.on(params.watch ? 'update' : 'files', (files) => __awaiter(this, void 0, void 0, function* () {
                files = Array.isArray(files) ? files : [files];
                const resultsObj = {};
                let aggregateStrArray = [];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const compilePromise = file.compile(Object.assign(Object.assign({}, params), { watch: false }), settings);
                    try {
                        pipe(compilePromise);
                        let compileRes = yield compilePromise;
                        resultsObj[file.path] = compileRes;
                        aggregateStrArray.push(compileRes.js);
                        emit('file', compileRes);
                    }
                    catch (e) {
                        emit('warn', {
                            value: e.toString()
                        });
                    }
                }
                if (params.watch) {
                    emit('log', {
                        value: `<blue>[watch]</blue> Watching for changes...`
                    });
                }
                else {
                    resolve(Object.assign({ files: resultsObj, js: aggregateStrArray.join('\n') }, duration.end()));
                }
            }));
        }));
    }
}
SJsCompiler.interfaces = {
    params: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    }
};
/**
 * @name            _esbuildAcceptedSettings
 * @type            Array
 * @static
 *
 * This static property store all the accepted esbuild options keys
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SJsCompiler._esbuildAcceptedSettings = [
    'bundle',
    'define',
    'external',
    'format',
    'globalName',
    'inject',
    'jsxFactory',
    'jsxFragment',
    'platform',
    'loader',
    'minify',
    'outdir',
    'outfile',
    'sourcemap',
    'target',
    'write',
    'avoidTDZ',
    // 'banner',
    'charset',
    'color',
    'errorLimit',
    'footer',
    'keepNames',
    'logLevel',
    'mainFields',
    'metafile',
    'outExtension',
    'plugins',
    'outbase',
    'publicPath',
    'pure',
    'resolveExtensions',
    'sourcefile',
    'stdin',
    'tsconfig',
    'tsconfigRaw'
];
exports.default = SJsCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHlEQUFxQztBQUNyQyxxRUFBK0M7QUFPL0MsdUVBQWlEO0FBQ2pELHdFQUFpRDtBQVdqRCx5RUFBbUQ7QUFNbkQsd0dBQWtGO0FBOEJsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXlFbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEwQyxFQUMxQyxRQUFrQztRQUVsQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUEwQixFQUMxQixXQUEwQyxFQUFFO1FBRTVDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUNsRSxNQUFNLGVBQWUsR0FBRyxtQkFBVyxDQUNqQyxJQUFJLENBQUMsa0JBQWtCLEVBQ3ZCLEVBQUUsRUFDRixRQUFRLENBQ1QsQ0FBQztZQUVGLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4RSxPQUFPO1lBQ1AsSUFBSSxN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