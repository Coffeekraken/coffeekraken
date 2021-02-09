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
const SScssFile_1 = __importDefault(require("../SScssFile"));
const express_1 = __importDefault(require("express"));
const SScssCompilerParamsInterface_1 = __importDefault(require("./interface/SScssCompilerParamsInterface"));
/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Partial<ISScssCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISScssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/compile/SScssCompiler';
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssCompiler extends SCompiler_1.default {
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
            scssCompiler: {}
        }, settings || {}));
    }
    /**
     * @name          scssCompilerSettings
     * @type          ISScssCompilerSettings
     * @get
     *
     * Access the scss compiler settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get scssCompilerSettings() {
        return this._settings.scssCompiler;
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
            settings = deepMerge_1.default(this.scssCompilerSettings, {}, settings);
            let input = Array.isArray(params.input) ? params.input : [params.input];
            // prod
            if (params.prod) {
                params.cache = false;
                params.style = 'compressed';
                params.minify = true;
                params.stripComments = true;
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
                if (params.serve && !SScssCompiler._serveServer) {
                    const server = express_1.default();
                    filesPaths.forEach((path) => {
                        const filename = filename_1.default(path).replace(/\.s[ac]ss$/, '.css');
                        const relPath = path_1.default
                            .relative(params.rootDir, path)
                            .replace(/\.s[ac]ss$/, '.css');
                        const destPath = path_1.default.resolve(params.outputDir, relPath);
                        server.get(`/${filename}`, (req, res) => {
                            const content = fs_1.default.readFileSync(destPath, 'utf8');
                            res.type('text/css');
                            res.status(200);
                            res.send(content);
                        });
                    });
                    const serverLogStrArray = [
                        `Your <yellow>Scss</yellow> server is <green>up and running</green>:`,
                        '',
                        `- Hostname        : <yellow>${params.host}</yellow>`,
                        `- Port            : <yellow>${params.port}</yellow>`,
                        `- URL's           : <cyan>http://${params.host}:${params.port}</cyan>`
                    ];
                    filesPaths.forEach((path) => {
                        serverLogStrArray.push(`                  : <cyan>${`http://${params.host}:${params.port}/${filename_1.default(path).replace(/\.s[ac]ss$/, '.css')}`.trim()} </cyan>`);
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
                        SScssCompiler._serveServer = undefined;
                        const string = e.toString();
                        reject(string);
                    });
                    SScssCompiler._serveServer = server;
                }
                else {
                    serverResolve(true);
                }
            });
            yield serverPromise;
            const startTime = Date.now();
            for (let i = 0; i < filesPaths.length; i++) {
                let filePath = filesPaths[i];
                let file = new SScssFile_1.default(filePath, {
                    scssFile: {
                        compile: settings
                    }
                });
                pipe(file);
                // @todo    {Clean}     remove the ts-ignore
                // @ts-ignore
                const resPromise = file.compile(params, settings);
                const res = yield resPromise;
                resultsObj[file.path] = res;
            }
            // aggregate the compiled files css
            let aggregateStrArray = [];
            Object.keys(resultsObj).forEach((path) => {
                const cssRes = resultsObj[path];
                aggregateStrArray.push(cssRes.css);
            });
            // resolve with the compilation result
            if (!params.watch) {
                resolve({
                    files: resultsObj,
                    css: aggregateStrArray.join('\n'),
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
            else {
                emit('files', {
                    files: resultsObj,
                    css: aggregateStrArray.join('\n'),
                    startTime: startTime,
                    endTime: Date.now(),
                    duration: Date.now() - startTime
                });
            }
        }));
    }
}
SScssCompiler.interfaces = {
    params: {
        apply: false,
        class: SScssCompilerParamsInterface_1.default
    }
};
exports.default = SScssCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTY3NzQ29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxnREFBMEI7QUFHMUIsdUVBQWlEO0FBQ2pELHNFQUFnRDtBQUloRCxpRUFBOEM7QUFFOUMsNENBQXNCO0FBR3RCLGdEQUEwQjtBQUUxQixzREFBK0I7QUFFL0IseUVBQW1EO0FBQ25ELG1FQUE2QztBQUU3Qyw2REFBdUM7QUFDdkMsc0RBQWdDO0FBRWhDLDRHQUFzRjtBQXNDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLGFBQWMsU0FBUSxtQkFBVztJQXdCckM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDRSxhQUE0QyxFQUM1QyxRQUFvQztRQUVwQyxLQUFLLENBQ0gsYUFBYSxFQUNiLG1CQUFXLENBQ1Q7WUFDRSxZQUFZLEVBQUUsRUFBRTtTQUNqQixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQXJDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLG9CQUFvQjtRQUN0QixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxRQUFRLENBQ04sTUFBNEIsRUFDNUIsV0FBNEMsRUFBRTtRQUU5QyxPQUFPLElBQUksa0JBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUM5RCxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRWhFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FB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