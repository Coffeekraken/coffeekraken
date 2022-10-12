var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import { __dashCase } from '@coffeekraken/sugar/string';
import __chokidar from 'chokidar';
import __express from 'express';
import __glob from 'glob';
import __path from 'path';
import { createServer } from 'vite';
import __SMitosisBuildParamsInterface from './interface/SMitosisBuildParamsInterface';
import __SMitosisStartParamsInterface from './interface/SMitosisStartParamsInterface';
class SMitosis extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            metas: {
                id: 'SMitosis',
            },
        }, settings || {}));
        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = __chokidar.watch(__SSugarConfig.get('docmap.read.input'));
            // @ts-ignore
            this.constructor.watcher.on('change', () => {
                // @ts-ignore
                delete this.constructor._cachedDocmapJson.current;
            });
        }
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order to develop your mitosis component easily
     * with feature like multiple frameworks testing, auto compilation, etc...
     *
     * @param         {Partial<ISMitosisStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = (__deepMerge(__SMitosisStartParamsInterface.defaults(), params));
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new mitosis server...`,
            });
            const app = __express();
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const viewRenderer = new __SViewRenderer({
                    rootDirs: [`${__packageRootDir(__dirname())}/src/views`],
                });
                const componentFiles = __glob.sync('output/**/*.*', {
                    cwd: __packageRootDir(),
                }), components = [];
                componentFiles.forEach((componentFilePath) => {
                    const target = componentFilePath.split('/')[1], absoluteComponentFilePath = `${__packageRootDir()}/${componentFilePath}`, name = __path
                        .basename(componentFilePath)
                        .replace(__path.extname(componentFilePath), '')
                        .replace(/Component$/, '');
                    components.push({
                        target,
                        name,
                        tagName: __dashCase(name),
                        path: `/${componentFilePath}`,
                    });
                });
                const result = yield viewRenderer.render('index', Object.assign(Object.assign({}, params), { components }));
                // const htmlFilePath = `${__packageRootDir(
                //     __dirname(),
                // )}/src/public/index.html`;
                res.type('text/html');
                res.send(result.value);
            }));
            app.get('/dist/css/index.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${__packageRootDir(__dirname())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/dist/js/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${__packageRootDir(__dirname())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(8082, () => {
                    _resolve();
                });
            });
            const viteServer = yield createServer({
                // any valid user config options, plus `mode` and `configFile`
                configFile: false,
                root: __packageRootDir(),
                optimizeDeps: {
                    esbuildOptions: {
                        // mainFields: ['module', 'main'],
                        resolveExtensions: ['.js', '.ts'],
                    },
                },
                // plugins: [__dynamicImportPlugin()],
                server: {
                    port: finalParams.port,
                    proxy: __SSugarConfig.get('mitosis.server.proxy'),
                },
            });
            yield viteServer.listen();
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> Your mitosis server is available at:`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`,
            });
            __onProcessExit(() => {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`,
                });
                return new Promise((resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield viteServer.close();
                        // @ts-ignore
                        resolve();
                    }));
                });
            });
        }));
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISMitosisBuildParams>}          params        The params to use to build your docmap
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = (__deepMerge(__SMitosisBuildParamsInterface.defaults(), params));
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            this._mitosisConfig = (yield import(`${__packageRootDir()}/mitosis.config.js`)).default;
            // build first
            yield pipe(this._build(finalParams));
            // watch
            if (finalParams.watch) {
                const watcher = __chokidar.watch(this._mitosisConfig.files, {
                    cwd: __packageRootDir(),
                    ignoreInitial: true,
                });
                watcher.on('add', () => {
                    pipe(this._build(finalParams));
                });
                watcher.on('change', () => {
                    pipe(this._build(finalParams));
                });
                __onProcessExit(() => __awaiter(this, void 0, void 0, function* () {
                    yield watcher.close();
                }));
                on('cancel', () => {
                    watcher.close();
                });
            }
            if (!finalParams.watch) {
                resolve();
            }
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _build(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your component(s)`,
            });
            const pro = __spawn('npm exec mitosis build');
            pro.on('log', (data) => {
                console.log(data._logObj.value);
            });
            yield pro;
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[build]</green> Component(s) builded <green>successfully</green>!`,
            });
            if (params.watch) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching for files changes...`,
                });
            }
            // const files = __glob.sync(`output/**/*.*`, {
            //     cwd: __packageRootDir(),
            // });
            // files.forEach((filePath) => {
            //     const absoluteFilePath = `${__packageRootDir()}/${filePath}`,
            //         target = filePath.split('/')[1];
            //     __ensureDirSync(
            //         `${__packageRootDir()}/src/js/build/${target}`,
            //     );
            //     __fs.renameSync(
            //         absoluteFilePath,
            //         `${__packageRootDir()}/src/js/build/${target}/${__path.basename(
            //             filePath,
            //         )}`,
            //     );
            // });
            // __removeSync(`${__packageRootDir()}/output`);
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
export default SMitosis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLDhCQUE4QixNQUFNLDBDQUEwQyxDQUFDO0FBdUN0RixNQUFNLFFBQVMsU0FBUSxRQUFRO0lBYTNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsVUFBVTthQUNqQjtTQUNKLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsYUFBYTtRQUNiLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQ3ZDLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FDMUMsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDdkMsYUFBYTtnQkFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLE1BQXFDO1FBQ3ZDLE1BQU0sV0FBVyxHQUF5QixDQUN0QyxXQUFXLENBQUMsOEJBQThCLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ2pFLENBQUM7UUFDRixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsMkRBQTJEO2FBQ3JFLENBQUMsQ0FBQztZQUVILE1BQU0sR0FBRyxHQUFRLFNBQVMsRUFBRSxDQUFDO1lBRTdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM1QixNQUFNLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQztvQkFDckMsUUFBUSxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQzNELENBQUMsQ0FBQztnQkFFSCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDNUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFO2lCQUMxQixDQUFDLEVBQ0YsVUFBVSxHQUFVLEVBQUUsQ0FBQztnQkFFM0IsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUMseUJBQXlCLEdBQUcsR0FBRyxnQkFBZ0IsRUFBRSxJQUFJLGlCQUFpQixFQUFFLEVBQ3hFLElBQUksR0FBRyxNQUFNO3lCQUNSLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDM0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLENBQUM7eUJBQzlDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBRW5DLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ1osTUFBTTt3QkFDTixJQUFJO3dCQUNKLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDO3dCQUN6QixJQUFJLEVBQUUsSUFBSSxpQkFBaUIsRUFBRTtxQkFDaEMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGtDQUN6QyxNQUFNLEtBQ1QsVUFBVSxJQUNaLENBQUM7Z0JBRUgsNENBQTRDO2dCQUM1QyxtQkFBbUI7Z0JBQ25CLDZCQUE2QjtnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzlDLE1BQU0sV0FBVyxHQUFHLEdBQUcsZ0JBQWdCLENBQ25DLFNBQVMsRUFBRSxDQUNkLHFCQUFxQixDQUFDO2dCQUN2QixHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNoRCxNQUFNLFVBQVUsR0FBRyxHQUFHLGdCQUFnQixDQUNsQyxTQUFTLEVBQUUsQ0FDZCx1QkFBdUIsQ0FBQztnQkFDekIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBRUgsSUFBSSxNQUFNLENBQUM7WUFDWCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7b0JBQzNCLFFBQVEsRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLFVBQVUsR0FBRyxNQUFNLFlBQVksQ0FBQztnQkFDbEMsOERBQThEO2dCQUM5RCxVQUFVLEVBQUUsS0FBSztnQkFDakIsSUFBSSxFQUFFLGdCQUFnQixFQUFFO2dCQUN4QixZQUFZLEVBQUU7b0JBQ1YsY0FBYyxFQUFFO3dCQUNaLGtDQUFrQzt3QkFDbEMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO3FCQUNwQztpQkFDSjtnQkFDRCxzQ0FBc0M7Z0JBQ3RDLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7b0JBQ3RCLEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2lCQUNwRDthQUNKLENBQUMsQ0FBQztZQUNILE1BQU0sVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRTFCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsNkRBQTZEO2FBQ3ZFLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsaURBQWlELFdBQVcsQ0FBQyxJQUFJLFNBQVM7YUFDcEYsQ0FBQyxDQUFDO1lBRUgsZUFBZSxDQUFDLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUseUVBQXlFO2lCQUNuRixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQVMsRUFBRTt3QkFDcEIsTUFBTSxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ3pCLGFBQWE7d0JBQ2IsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQUMsTUFBcUM7UUFDdkMsTUFBTSxXQUFXLEdBQXlCLENBQ3RDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FDakUsQ0FBQztRQUNGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQ2xCLE1BQU0sTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FDMUQsQ0FBQyxPQUFPLENBQUM7WUFFVixjQUFjO1lBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRXJDLFFBQVE7WUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25CLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUN6QjtvQkFDSSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7b0JBQ3ZCLGFBQWEsRUFBRSxJQUFJO2lCQUN0QixDQUNKLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDO2dCQUNILGVBQWUsQ0FBQyxHQUFTLEVBQUU7b0JBQ3ZCLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMxQixDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNILEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO29CQUNkLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNwQixPQUFPLEVBQUUsQ0FBQzthQUNiO1FBQ0wsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBNEI7UUFDL0IsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLDJEQUEyRDthQUNyRSxDQUFDLENBQUM7WUFFSCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUU5QyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLEdBQUcsQ0FBQztZQUVWLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsMEVBQTBFO2FBQ3BGLENBQUMsQ0FBQztZQUVILElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLHdEQUF3RDtpQkFDbEUsQ0FBQyxDQUFDO2FBQ047WUFFRCwrQ0FBK0M7WUFDL0MsK0JBQStCO1lBQy9CLE1BQU07WUFFTixnQ0FBZ0M7WUFDaEMsb0VBQW9FO1lBQ3BFLDJDQUEyQztZQUUzQyx1QkFBdUI7WUFDdkIsMERBQTBEO1lBQzFELFNBQVM7WUFDVCx1QkFBdUI7WUFDdkIsNEJBQTRCO1lBQzVCLDJFQUEyRTtZQUMzRSx3QkFBd0I7WUFDeEIsZUFBZTtZQUNmLFNBQVM7WUFDVCxNQUFNO1lBQ04sZ0RBQWdEO1lBRWhELE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELGVBQWUsUUFBUSxDQUFDIn0=