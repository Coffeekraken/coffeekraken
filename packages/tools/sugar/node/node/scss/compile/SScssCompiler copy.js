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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
        return new s_promise_1.default(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Njc3NDb21waWxlciBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL25vZGUvc2Nzcy9jb21waWxlL1NTY3NzQ29tcGlsZXIgY29weS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLGdEQUEwQjtBQUcxQix1RUFBaUQ7QUFDakQsd0VBQWlEO0FBSWpELGlFQUE4QztBQUU5Qyw0Q0FBc0I7QUFHdEIsZ0RBQTBCO0FBRTFCLHNEQUErQjtBQUUvQix5RUFBbUQ7QUFDbkQsbUVBQTZDO0FBRTdDLDZEQUF1QztBQUN2QyxzREFBZ0M7QUFFaEMsNEdBQXNGO0FBc0N0Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sYUFBYyxTQUFRLG1CQUFXO0lBd0JyQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLGFBQTRDLEVBQzVDLFFBQW9DO1FBRXBDLEtBQUssQ0FDSCxhQUFhLEVBQ2IsbUJBQVcsQ0FDVDtZQUNFLFlBQVksRUFBRSxFQUFFO1NBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7SUFDSixDQUFDO0lBckNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksb0JBQW9CO1FBQ3RCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxZQUFZLENBQUM7SUFDNUMsQ0FBQztJQTJCRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILFFBQVEsQ0FDTixNQUE0QixFQUM1QixXQUE0QyxFQUFFO1FBRTlDLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlELFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFaEUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXhFLE9BQU87WUFDUCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ2YsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO2dCQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7YUFDN0I7WUFFRCxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFdEIsSUFBSSxVQUFVLEdBQWEsRUFBRSxDQUFDO1lBRTlCLHNCQUFzQjtZQUN0QixLQUFLLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQixpQkFBaUI7WUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN6QixJQUFJLGlCQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3RCLFVBQVUsR0FBRyxDQUFDLEdBQUcsVUFBVSxFQUFFLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2lCQUN4RDtxQkFBTTtvQkFDTCxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hFLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7b0JBQy9DLE1BQU0sTUFBTSxHQUFHLGlCQUFTLEVBQUUsQ0FBQztvQkFFM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUMxQixNQUFNLFFBQVEsR0FBRyxrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBRW5FLE1BQU0sT0FBTyxHQUFHLGNBQU07NkJBQ25CLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQzs2QkFDOUIsT0FBTyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDakMsTUFBTSxRQUFRLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUUzRCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ3RDLE1BQU0sT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzRCQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNwQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxNQUFNLGlCQUFpQixHQUFhO3dCQUNsQyxxRUFBcUU7d0JBQ3JFLEVBQUU7d0JBQ0YsK0JBQStCLE1BQU0sQ0FBQyxJQUFJLFdBQVc7d0JBQ3JELCtCQUErQixNQUFNLENBQUMsSUFBSSxXQUFXO3dCQUNyRCxvQ0FBb0MsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxTQUFTO3FCQUN4RSxDQUFDO29CQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDMUIsaUJBQWlCLENBQUMsSUFBSSxDQUNwQiw2QkFBNkIsVUFBVSxNQUFNLENBQUMsSUFBSSxJQUNoRCxNQUFNLENBQUMsSUFDVCxJQUFJLGtCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUM3QixZQUFZLEVBQ1osTUFBTSxDQUNQLEVBQUUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUNyQixDQUFDO29CQUNKLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU07eUJBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO3dCQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLElBQUksRUFBRSxNQUFNO3lCQUNiLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNWLEtBQUssRUFBRSxJQUFJOzRCQUNYLEVBQUUsRUFBRSxDQUFDOzRCQUNMLElBQUksRUFBRSxTQUFTOzRCQUNmLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNwQyxDQUFDLENBQUM7d0JBRUgsVUFBVSxDQUFDLEdBQUcsRUFBRTs0QkFDZCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDVixDQUFDLENBQUM7eUJBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNqQixhQUFhLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQzt3QkFDdkMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUM1QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDO29CQUVMLGFBQWEsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2lCQUNyQztxQkFBTTtvQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLGFBQWEsQ0FBQztZQUVwQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFDLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxtQkFBVyxDQUFDLFFBQVEsRUFBRTtvQkFDbkMsUUFBUSxFQUFFO3dCQUNSLE9BQU8sRUFBRSxRQUFRO3FCQUNsQjtpQkFDRixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVYLDRDQUE0QztnQkFDNUMsYUFBYTtnQkFDYixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxVQUFVLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQzdCO1lBRUQsbUNBQW1DO1lBQ25DLElBQUksaUJBQWlCLEdBQWEsRUFBRSxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUVILHNDQUFzQztZQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDakIsT0FBTyxDQUFDO29CQUNOLEtBQUssRUFBRSxVQUFVO29CQUNqQixHQUFHLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDakMsU0FBUyxFQUFFLFNBQVM7b0JBQ3BCLE9BQU8sRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVM7aUJBQ2pDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNqQyxTQUFTLEVBQUUsU0FBUztvQkFDcEIsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUztpQkFDakMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFqTk0sd0JBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixLQUFLLEVBQUUsS0FBSztRQUNaLEtBQUssRUFBRSxzQ0FBOEI7S0FDdEM7Q0FDRixDQUFDO0FBK01KLGtCQUFlLGFBQWEsQ0FBQyJ9