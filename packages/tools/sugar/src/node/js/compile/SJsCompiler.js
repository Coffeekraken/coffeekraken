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
const path_1 = __importDefault(require("path"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const filename_1 = __importDefault(require("../../fs/filename"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const is_glob_1 = __importDefault(require("is-glob"));
const SCompiler_1 = __importDefault(require("../../compiler/SCompiler"));
const absolute_1 = __importDefault(require("../../path/absolute"));
const SJsFile_1 = __importDefault(require("../SJsFile"));
const express_1 = __importDefault(require("express"));
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
        return new SPromise_1.default(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const compileSettings = deepMerge_1.default(this.jsCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            // prod
            if (params.prod) {
                params.minify = true;
                params.stripComments = true;
                params.map = false;
            }
            const resultsObj = {};
            let filesPaths = [];
            // make input absolute
            input = absolute_1.default(input);
            // process inputs
            input.forEach((inputStr) => {
                if (is_glob_1.default(inputStr)) {
                    filesPaths = [...filesPaths, ...glob_1.default.sync(inputStr)];
                }
                else {
                    filesPaths.push(inputStr);
                }
            });
            const serverPromise = new Promise((serverResolve, serverReject) => {
                if (params.serve && !SJsCompiler._serveServer) {
                    const server = express_1.default();
                    filesPaths.forEach((path) => {
                        const filename = filename_1.default(path);
                        const relPath = path_1.default.relative(params.rootDir, path);
                        const destPath = path_1.default.resolve(params.outputDir, relPath);
                        server.get(`/${filename}`, (req, res) => {
                            const content = fs_1.default.readFileSync(destPath, 'utf8');
                            res.type('text/javascript');
                            res.status(200);
                            res.send(content);
                        });
                    });
                    const serverLogStrArray = [
                        `Your <yellow>Js</yellow> server is <green>up and running</green>:`,
                        '',
                        `- Hostname        : <yellow>${params.host}</yellow>`,
                        `- Port            : <yellow>${params.port}</yellow>`,
                        `- URL's           : <cyan>http://${params.host}:${params.port}</cyan>`
                    ];
                    filesPaths.forEach((path) => {
                        serverLogStrArray.push(`                  : <cyan>${`http://${params.host}:${params.port}/${filename_1.default(path)}`.trim()} </cyan>`);
                    });
                    server
                        .listen(params.port, () => {
                        emit('log', {
                            type: 'time'
                        });
                        emit('log', {
                            clear: true,
                            mb: 1,
                            type: 'heading',
                            value: serverLogStrArray.join('\n')
                        });
                        setTimeout(() => {
                            serverResolve(true);
                        }, 500);
                    })
                        .on('error', (e) => {
                        SJsCompiler._serveServer = undefined;
                        const string = e.toString();
                        reject(string);
                    });
                    SJsCompiler._serveServer = server;
                }
                else {
                    serverResolve(true);
                }
            });
            yield serverPromise;
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SJsFile_1.default(filePath, {
                    jsFile: {
                        compile: compileSettings
                    }
                });
                pipe(file);
                // @todo    {Clean}     remove the ts-ignore
                // @ts-ignore
                const resPromise = file.compile(params, compileSettings);
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // aggregate the compiled files css
            let aggregateStrArray = [];
            Object.keys(resultsObj).forEach((path) => {
                const jsRes = resultsObj[path];
                aggregateStrArray.push(jsRes.js);
            });
            // resolve with the compilation result
            if (!params.watch) {
                resolve({
                    files: resultsObj,
                    js: aggregateStrArray.join('\n'),
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
            else {
                emit('files', {
                    files: resultsObj,
                    js: aggregateStrArray.join('\n'),
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzQ29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSnNDb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUlBLGdEQUEwQjtBQUcxQix1RUFBaUQ7QUFDakQsc0VBQWdEO0FBSWhELGlFQUE4QztBQUU5Qyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBRTFCLHNEQUErQjtBQUUvQix5RUFBbUQ7QUFDbkQsbUVBQTZDO0FBRTdDLHlEQUFtQztBQUNuQyxzREFBZ0M7QUFFaEMsd0dBQWtGO0FBZ0NsRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLFdBQVksU0FBUSxtQkFBVztJQXlFbkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUEwQyxFQUMxQyxRQUFrQztRQUVsQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxVQUFVLEVBQUUsRUFBRTtTQUNmLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUEwQixFQUMxQixXQUEwQyxFQUFFO1FBRTVDLE9BQU8sSUFBSSxrQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlELE1BQU0sZUFBZSxHQUFHLG1CQUFXLENBQ2pDLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsRUFBRSxFQUNGLFFBQVEsQ0FDVCxDQUFDO1lBRUYsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFL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