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
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __dirname, __ensureDirSync, __removeSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import { __dashCase } from '@coffeekraken/sugar/string';
import __chokidar from 'chokidar';
import __express from 'express';
import __fs from 'fs';
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
                const componentFiles = __glob.sync('src/js/build/**/*.*', {
                    cwd: __packageRootDir(),
                }), components = [];
                const componentInterfacePath = __glob.sync('dist/pkg/esm/js/interface/*.*', {
                    cwd: __packageRootDir(),
                });
                let ComponentInterface, componentSpecs = {};
                if (componentInterfacePath.length) {
                    const finalComponentInterfacePath = `../../../../${__path.relative(__packageRootDir(__dirname()), `${__packageRootDir()}/${componentInterfacePath[0]}`)}`;
                    // import the interface
                    ComponentInterface = (yield import(finalComponentInterfacePath)).default;
                    // convert interface to specs
                    componentSpecs = __SSpecs.fromInterface(ComponentInterface);
                }
                for (let i = 0; i < componentFiles.length; i++) {
                    const componentFilePath = componentFiles[i];
                    const target = componentFilePath.split('/')[3], absoluteComponentFilePath = `${__packageRootDir()}/${componentFilePath}`, name = __path
                        .basename(componentFilePath)
                        .replace(__path.extname(componentFilePath), '')
                        .replace(/Component$/, '');
                    components.push({
                        target,
                        name,
                        specs: componentSpecs,
                        tagName: __dashCase(name),
                        path: `/${componentFilePath}`,
                    });
                }
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
            const viteServer = yield createServer(__deepMerge(__SSugarConfig.get('mitosis.vite'), {
                // any valid user config options, plus `mode` and `configFile`
                configFile: false,
                root: __packageRootDir(),
                resolve: {
                    dedupe: ['react', 'react-dom'],
                    alias: {
                    // vue: 'vue/dist/vue.esm-bundler.js',
                    },
                },
                optimizeDeps: {
                    esbuildOptions: {
                        // mainFields: ['module', 'main'],
                        resolveExtensions: ['.js', '.ts'],
                    },
                },
                server: {
                    port: finalParams.port,
                },
            }));
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
            const files = __glob.sync(`output/**/*.*`, {
                cwd: __packageRootDir(),
            });
            files.forEach((filePath) => {
                const absoluteFilePath = `${__packageRootDir()}/${filePath}`, target = filePath.split('/')[1], destFilePath = `${__packageRootDir()}/src/js/build/${target}/${__path.basename(filePath)}`;
                __ensureDirSync(`${__packageRootDir()}/src/js/build/${target}`);
                __fs.renameSync(absoluteFilePath, destFilePath);
                let code = __fs.readFileSync(destFilePath).toString();
                code = code.replace(/%packageRootDir\//gm, '../../../../');
                __fs.writeFileSync(destFilePath, code);
            });
            __removeSync(`${__packageRootDir()}/output`);
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
export default SMitosis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFDSCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksR0FDZixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RixPQUFPLDhCQUE4QixNQUFNLDBDQUEwQyxDQUFDO0FBcUN0RixNQUFNLFFBQVMsU0FBUSxRQUFRO0lBYTNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUNELFdBQVcsQ0FD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