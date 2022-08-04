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
import __SEnv from '@coffeekraken/s-env';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __compression from 'compression';
import __express from 'express';
import __fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import __path from 'path';
import __SFrontendServerCorsProxyParamsInterface from './interface/SFrontendServerCorsProxyParamsInterface';
import __SFrontendServerStartParamsInterface from './interface/SFrontendServerStartParamsInterface';
// import __vhost from 'vhost';
import __SDuration from '@coffeekraken/s-duration';
import __SGlob from '@coffeekraken/s-glob';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __runMiddleware from 'run-middleware';
import __viewRendererMiddleware from './middleware/viewRendererMiddleware';
import __bodyParser from 'body-parser';
import __request from 'request';
export default class SFrontendServer extends __SClass {
    /**
     * @name					constructor
     * @type 					Function
     * @constructor
     *
     * Constructor
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor() {
        super();
        this._config = {};
        // instanciate a new express server
        this._express = __express();
        __runMiddleware(this._express);
    }
    /**
     * @name        start
     * @type           Function
     * @async
     *
     * This function take as parameter an Partial<ISFrontendServerStartParams> object,
     * start a server using these parameters and returns an SPromise instance
     * through which you can subscribe for events, etc...
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = __SFrontendServerStartParamsInterface.apply(params);
        return new __SPromise(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // enable compression if prod
            if (finalParams.prod || __SEnv.is('production')) {
                this._express.use(__compression());
            }
            const logLevelInt = [
                'silent',
                'error',
                'warn',
                'debug',
                'info',
                'verbose',
                'silly',
            ].indexOf(finalParams.logLevel);
            this._config = __SSugarConfig.get('frontendServer');
            this._express.use((req, res, next) => {
                if (req.path.substr(-1) == '/' && req.path.length > 1) {
                    const query = req.url.slice(req.path.length);
                    res.redirect(301, req.path.slice(0, -1) + query);
                }
                else {
                    next();
                }
            });
            if (this._config.modules) {
                for (let i = 0; i < Object.keys(this._config.modules).length; i++) {
                    const moduleId = Object.keys(this._config.modules)[i];
                    const moduleObj = this._config.modules[moduleId];
                    let module;
                    try {
                        module = yield import(moduleObj.path);
                    }
                    catch (e) {
                        console.log(e);
                        throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`);
                    }
                    yield pipe(module.default(this._express, moduleObj.settings, this._config));
                }
            }
            if (this._config.proxy) {
                Object.keys(this._config.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = this._config.proxy[proxyId];
                    // @ts-ignore
                    this._express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (this._config.staticDirs) {
                Object.keys(this._config.staticDirs).forEach((dir) => {
                    const fsPath = this._config.staticDirs[dir];
                    emit('log', {
                        value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                    });
                    this._express.use(dir, __express.static(fsPath, { dotfiles: 'allow' }));
                });
            }
            if (this._config.middlewares) {
                for (let i = 0; i < Object.keys(this._config.middlewares).length; i++) {
                    const middlewareName = Object.keys(this._config.middlewares)[i];
                    const middlewareObj = this._config.middlewares[middlewareName];
                    if (!middlewareObj.path ||
                        __fs.existsSync(middlewareObj.path)) {
                        throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
                    }
                    // @ts-ignore
                    const { default: middlewareWrapperFn } = yield import(middlewareObj.path); // eslint-disable-line
                    const middleware = middlewareWrapperFn((_a = middlewareObj.settings) !== null && _a !== void 0 ? _a : {});
                    // register the middleware inside the express configuration
                    // @ts-ignore
                    this._express.use((req, res, next) => {
                        return pipe(middleware(req, res, next));
                    });
                }
            }
            // viewRendererMiddleware
            this._express.use((req, res, next) => {
                return pipe(__viewRendererMiddleware()(req, res, next));
            });
            // logging requests
            if (logLevelInt >= 4) {
                this._express.use((req, res, next) => {
                    // emit('log', {
                    //     type: 'detail',
                    //     group: `s-frontend-server-${this.metas.id}`,
                    //     value: `Request on "<cyan>${req.url}</cyan>"`,
                    // });
                    const duration = new __SDuration();
                    function afterResponse() {
                        emit('log', {
                            value: `<cyan>[request]</cyan> Request on "<cyan>${req.url}</cyan>" served in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                    }
                    res.on('finish', afterResponse);
                    next();
                });
            }
            // routes pages from config
            if (this._config.pages) {
                for (let [id, pageConfig] of Object.entries(this._config.pages)) {
                    yield pipe(this._registerPageConfig(pageConfig, null, id));
                }
            }
            // "pages" folder routes
            pipe(this._registerPagesRoutes());
            if (!(yield __isPortFree(this._config.port))) {
                emit('log', {
                    value: `Port <yellow>${this._config.port}</yellow> already in use. Try to kill it before continue...`,
                });
                yield __kill(`:${this._config.port}`);
            }
            if (!finalParams.listen) {
                // server started successfully
                emit('log', {
                    value: `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                });
                // when no listen, we just resolve the promise to say that the server has started
                resolve();
            }
            else {
                const server = this._express.listen(this._config.port, () => __awaiter(this, void 0, void 0, function* () {
                    yield __wait(100);
                    // server started successfully
                    emit('log', {
                        value: `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                    });
                    emit('log', {
                        value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_VERBOSE,
                        // group: `s-frontend-server-${this.metas.id}`,
                        value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_VERBOSE,
                        // group: `s-frontend-server-${this.metas.id}`,
                        value: `Log level: <yellow>${finalParams.logLevel}</yellow>`,
                    });
                }));
                __onProcessExit(() => {
                    emit('log', {
                        value: `<red>[kill]</red> Gracefully killing the frontend server...`,
                    });
                    return new Promise((resolve) => {
                        server.close(() => {
                            // @ts-ignore
                            resolve();
                        });
                    });
                });
            }
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
    request(url) {
        return new __SPromise(({ resolve, reject }) => {
            this._express.runMiddleware(url, (code, body, headers) => {
                resolve({
                    data: body,
                });
            });
        });
    }
    corsProxy(params) {
        const finalParams = __SFrontendServerCorsProxyParamsInterface.apply(params);
        return new __SPromise(({ resolve, reject, emit, pipe }) => {
            const app = __express();
            var myLimit = __SSugarConfig.get('frontendServer.corsProxy.limit');
            app.use(__bodyParser.json({ limit: myLimit }));
            app.all('*', function (req, res, next) {
                // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
                res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));
                if (req.method === 'OPTIONS') {
                    // CORS Preflight
                    res.send();
                }
                else {
                    var targetURL = req.header(finalParams.targetUrlHeaderName);
                    if (!targetURL) {
                        res.send(500, {
                            error: `There is no "${finalParams.targetUrlHeaderName}" header in the request`,
                        });
                        return;
                    }
                    __request({
                        url: targetURL + req.url,
                        method: req.method,
                        json: req.body,
                        headers: {
                            Authorization: req.header('Authorization'),
                        },
                    }, function (error, response, body) {
                        if (error) {
                            emit('log', {
                                type: __SLog.TYPE_ERROR,
                                value: error,
                            });
                        }
                    }).pipe(res);
                }
            });
            app.set('port', finalParams.port);
            app.listen(app.get('port'), function () {
                emit('log', {
                    value: `<yellow>[corsProxy]</yellow> Cors proxy server running on port <cyan>${app.get('port')}</cyan>...`,
                });
                emit('log', {
                    value: `<yellow>[corsProxy]</yellow> Call "<cyan>http://${__SSugarConfig.get('frontendServer.hostname')}:${finalParams.port}</cyan>" with the "<magenta>${finalParams.targetUrlHeaderName}</magenta>" header to use it...`,
                });
            });
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    }
    /**
     * Get the handler function for the given handler name or directly a path
     */
    _getHandlerFn(handlerNameOrPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (__fs.existsSync(handlerNameOrPath)) {
                // @ts-ignore
                return (yield import(pageConfig.handler)).default;
            }
            else {
                const handlersInConfig = this._config.handlers;
                if (!handlersInConfig[handlerNameOrPath]) {
                    throw new Error(`[SFrontendServer] Sorry but the handler named "<yellow>${handlerNameOrPath}</yellow>" seems to not exists or is missconfigured...`);
                }
                // @ts-ignore
                return (yield import(handlersInConfig[handlerNameOrPath].path))
                    .default;
            }
        });
    }
    /**
     * This method scrap the "pages" folder and register all the routes found inside.
     */
    _registerPagesRoutes() {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pagesFolder = __SSugarConfig.get('storage.src.pagesDir');
            let pagesFiles = __SGlob.resolve(`**/*.{ts,js}`, {
                cwd: pagesFolder,
            });
            const pagesFilesPaths = pagesFiles.map((f) => f.path);
            pagesFiles = pagesFiles.filter((file) => {
                if (file.name.split('.').length > 2)
                    return false;
                // remove js files if the .ts equivalent exists
                if (file.extension === 'js' &&
                    pagesFilesPaths.includes(`${file.path.replace(/\.js$/, '.ts')}`)) {
                    return false;
                }
                return true;
            });
            let _404PageFile;
            for (let [index, pageFile] of pagesFiles.entries()) {
                // handle 404 at the end
                if (pageFile.nameWithoutExt === '404') {
                    _404PageFile = pageFile;
                    continue;
                }
                // build final path. If is a typescript,
                // it will be transpiled and override the default
                let finalPagePath = pageFile.path, buildedFileRes;
                // compile typescript if needed
                if (pageFile.extension === 'ts') {
                    buildedFileRes = yield __STypescriptBuilder.buildTemporary(finalPagePath);
                    finalPagePath = buildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield import(finalPagePath);
                yield pipe(this._registerPageConfig(pageConfig, pageFile));
            }
            if (_404PageFile) {
                let _404BuildedFileRes, final404PagePath = _404PageFile.path;
                // compile typescript if needed
                if (_404PageFile.extension === 'ts') {
                    _404BuildedFileRes = yield __STypescriptBuilder.buildTemporary(final404PagePath);
                    final404PagePath = _404BuildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield import(final404PagePath);
                (_a = _404BuildedFileRes === null || _404BuildedFileRes === void 0 ? void 0 : _404BuildedFileRes.remove) === null || _a === void 0 ? void 0 : _a.call(_404BuildedFileRes);
                yield pipe(this._registerPageConfig(pageConfig, _404PageFile));
            }
            resolve();
        }));
    }
    /**
     * This method register the passed pageConfig config object that can be specified
     * either in the "pages" folder or in the "frontendServer.pages" configuration.
     */
    _registerPageConfig(pageConfig, pageFile, configId) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let handlerFn, slug = '', slugs = (_a = pageConfig.slugs) !== null && _a !== void 0 ? _a : [];
            // generate path
            if (pageFile && !pageConfig.slugs) {
                slug = `/${pageFile.relPath
                    .split('/')
                    .slice(0, -1)
                    .join('/')
                    .replace(/\.(t|j)s$/, '')
                    .replace(/\./g, '/')}`;
            }
            if (!pageConfig.slugs) {
                if (pageConfig.params) {
                    let isOptional = false;
                    for (let [name, requiredOrStr] of Object.entries(pageConfig.params)) {
                        if (typeof requiredOrStr === 'string') {
                            slug += `/${requiredOrStr}`;
                        }
                        else if (requiredOrStr) {
                            if (isOptional) {
                                throw new Error(`[SFrontendServer] You cannot have required params after optional onces in the page ${pageFile.path}`);
                            }
                            slug += `/:${name}`;
                        }
                        else {
                            isOptional = true;
                            slug += `/:${name}?`;
                        }
                    }
                }
                slugs = [slug];
            }
            // handler
            handlerFn = yield this._getHandlerFn((_b = pageConfig.handler) !== null && _b !== void 0 ? _b : 'generic');
            slugs.forEach((slug) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${pageFile
                        ? `<magenta>${pageFile.relPath}</magenta>`
                        : `<magenta>config.pages.${configId}</magenta>`}`,
                });
                this._express.get(slug, (req, res, next) => {
                    if (pageConfig.params) {
                        for (let [key, value] of Object.entries(req.params)) {
                            // do not process non "number" keys
                            if (typeof __autoCast(key) !== 'number')
                                continue;
                            const paramKey = Object.keys(pageConfig.params)[parseInt(key)];
                            delete req.params[key];
                            req.params[paramKey] = value;
                        }
                    }
                    const handlerPro = handlerFn({
                        req,
                        res,
                        next,
                        pageConfig,
                        pageFile,
                        config: this._config,
                    });
                    pipe(handlerPro);
                });
            });
            resolve();
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHlDQUF5QyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVHLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sdUNBQXVDLENBQUM7QUFDM0QsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFDN0UsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFDcEUsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyx3QkFBd0IsTUFBTSxxQ0FBcUMsQ0FBQztBQUUzRSxPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBd0RoQyxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsUUFBUTtJQWFqRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBUVosWUFBTyxHQUFRLEVBQUUsQ0FBQztRQU5kLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsRUFBRSxDQUFDO1FBRTVCLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUlEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQXFEO1FBQ3ZELE1BQU0sV0FBVyxHQUFnQyxxQ0FBcUMsQ0FBQyxLQUFLLENBQ3hGLE1BQU0sQ0FDVCxDQUFDO1FBRUYsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFOztZQUMxQyw2QkFBNkI7WUFDN0IsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7YUFDdEM7WUFFRCxNQUFNLFdBQVcsR0FBRztnQkFDaEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNOLFNBQVM7Z0JBQ1QsT0FBTzthQUNWLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuRCxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztpQkFDcEQ7cUJBQU07b0JBQ0gsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUM1QyxDQUFDLEVBQUUsRUFDTDtvQkFDRSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNqRCxJQUFJLE1BQU0sQ0FBQztvQkFFWCxJQUFJO3dCQUNBLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3pDO29CQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FDWCxRQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSx5REFBeUQsUUFBUSxtRUFBbUUsU0FBUyxDQUFDLElBQUksVUFBVSxDQUM1TCxDQUFDO3FCQUNMO29CQUNELE1BQU0sSUFBSSxDQUNOLE1BQU0sQ0FBQyxPQUFPLENBQ1YsSUFBSSxDQUFDLFFBQVEsRUFDYixTQUFTLENBQUMsUUFBUSxFQUNsQixJQUFJLENBQUMsT0FBTyxDQUNmLENBQ0osQ0FBQztpQkFDTDthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztvQkFDaEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdDLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQ2IscUJBQXFCLENBQUMsUUFBUSxDQUFDLEtBQUssa0JBQ2hDLFFBQVEsRUFBRSxRQUFRLElBQ2YsQ0FBQyxNQUFBLFFBQVEsQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxFQUM5QixDQUNMLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLHVEQUF1RCxNQUFNLENBQUMsUUFBUSxDQUN6RSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsTUFBTSxDQUNULDRCQUE0QixHQUFHLGdCQUFnQjtxQkFDbkQsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNiLEdBQUcsRUFDSCxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUNsRCxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUMxQixLQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFDaEQsQ0FBQyxFQUFFLEVBQ0w7b0JBQ0UsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQzNCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQzFDLGNBQWMsQ0FDakIsQ0FBQztvQkFFRixJQUNJLENBQUMsYUFBYSxDQUFDLElBQUk7d0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUNyQzt3QkFDRSxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlEQUF5RCxjQUFjLHdEQUF3RCxDQUNoSyxDQUFDO3FCQUNMO29CQUVELGFBQWE7b0JBQ2IsTUFBTSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUNqRCxhQUFhLENBQUMsSUFBSSxDQUNyQixDQUFDLENBQUMsc0JBQXNCO29CQUN6QixNQUFNLFVBQVUsR0FBRyxtQkFBbUIsQ0FDbEMsTUFBQSxhQUFhLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQy9CLENBQUM7b0JBRUYsMkRBQTJEO29CQUMzRCxhQUFhO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTt3QkFDakMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDNUMsQ0FBQyxDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELHlCQUF5QjtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1lBRUgsbUJBQW1CO1lBQ25CLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUNqQyxnQkFBZ0I7b0JBQ2hCLHNCQUFzQjtvQkFDdEIsbURBQW1EO29CQUNuRCxxREFBcUQ7b0JBQ3JELE1BQU07b0JBRU4sTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztvQkFFbkMsU0FBUyxhQUFhO3dCQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNSLEtBQUssRUFBRSw0Q0FDSCxHQUFHLENBQUMsR0FDUiw4QkFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVc7eUJBQ2QsQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBRUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBRWhDLElBQUksRUFBRSxDQUFDO2dCQUNYLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCwyQkFBMkI7WUFDM0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDcEIsS0FBSyxJQUFJLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUNyQixFQUFFO29CQUNDLE1BQU0sSUFBSSxDQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FDUSxVQUFVLEVBQ3RDLElBQUksRUFDSixFQUFFLENBQ0wsQ0FDSixDQUFDO2lCQUNMO2FBQ0o7WUFFRCx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7WUFFbEMsSUFBSSxDQUFDLENBQUMsTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLDZEQUE2RDtpQkFDeEcsQ0FBQyxDQUFDO2dCQUNILE1BQU0sTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsc0VBQXNFO2lCQUNoRixDQUFDLENBQUM7Z0JBQ0gsaUZBQWlGO2dCQUNqRixPQUFPLEVBQUUsQ0FBQzthQUNiO2lCQUFNO2dCQUNILE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFDakIsR0FBUyxFQUFFO29CQUNQLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNsQiw4QkFBOEI7b0JBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLHNFQUFzRTtxQkFDaEYsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsS0FBSyxFQUFFLGtCQUFrQixXQUFXLENBQUMsUUFBUSxtQkFBbUIsV0FBVyxDQUFDLElBQUksU0FBUztxQkFDNUYsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZO3dCQUN6QiwrQ0FBK0M7d0JBQy9DLEtBQUssRUFBRSx5QkFBeUIsV0FBVyxDQUFDLE9BQU8sU0FBUztxQkFDL0QsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZO3dCQUN6QiwrQ0FBK0M7d0JBQy9DLEtBQUssRUFBRSxzQkFBc0IsV0FBVyxDQUFDLFFBQVEsV0FBVztxQkFDL0QsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQSxDQUNKLENBQUM7Z0JBRUYsZUFBZSxDQUFDLEdBQUcsRUFBRTtvQkFDakIsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixLQUFLLEVBQUUsNkRBQTZEO3FCQUN2RSxDQUFDLENBQUM7b0JBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTs0QkFDZCxhQUFhOzRCQUNiLE9BQU8sRUFBRSxDQUFDO3dCQUNkLENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtnQkFDckQsT0FBTyxDQUFDO29CQUNKLElBQUksRUFBRSxJQUFJO2lCQUNiLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUyxDQUNMLE1BQXlEO1FBRXpELE1BQU0sV0FBVyxHQUFvQyx5Q0FBeUMsQ0FBQyxLQUFLLENBQ2hHLE1BQU0sQ0FDVCxDQUFDO1FBRUYsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDaEMsTUFBTSxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUM7WUFFeEIsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FDNUIsZ0NBQWdDLENBQ25DLENBQUM7WUFFRixHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRS9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO2dCQUNqQyx3SEFBd0g7Z0JBQ3hILEdBQUcsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLEdBQUcsQ0FBQyxNQUFNLENBQ04sOEJBQThCLEVBQzlCLCtCQUErQixDQUNsQyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLENBQ04sOEJBQThCLEVBQzlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0NBQWdDLENBQUMsQ0FDL0MsQ0FBQztnQkFFRixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMxQixpQkFBaUI7b0JBQ2pCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDZDtxQkFBTTtvQkFDSCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUN0QixXQUFXLENBQUMsbUJBQW1CLENBQ2xDLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDWixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDVixLQUFLLEVBQUUsZ0JBQWdCLFdBQVcsQ0FBQyxtQkFBbUIseUJBQXlCO3lCQUNsRixDQUFDLENBQUM7d0JBQ0gsT0FBTztxQkFDVjtvQkFDRCxTQUFTLENBQ0w7d0JBQ0ksR0FBRyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRzt3QkFDeEIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO3dCQUNsQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7d0JBQ2QsT0FBTyxFQUFFOzRCQUNMLGFBQWEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQzt5QkFDN0M7cUJBQ0osRUFDRCxVQUFVLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSTt3QkFDM0IsSUFBSSxLQUFLLEVBQUU7NEJBQ1AsSUFBSSxDQUFDLEtBQUssRUFBRTtnQ0FDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVU7Z0NBQ3ZCLEtBQUssRUFBRSxLQUFLOzZCQUNmLENBQUMsQ0FBQzt5QkFDTjtvQkFDTCxDQUFDLENBQ0osQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2Y7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVsQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHdFQUF3RSxHQUFHLENBQUMsR0FBRyxDQUNsRixNQUFNLENBQ1QsWUFBWTtpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLG1EQUFtRCxjQUFjLENBQUMsR0FBRyxDQUN4RSx5QkFBeUIsQ0FDNUIsSUFBSSxXQUFXLENBQUMsSUFBSSwrQkFDakIsV0FBVyxDQUFDLG1CQUNoQixpQ0FBaUM7aUJBQ3BDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDRyxhQUFhLENBQUMsaUJBQXlCOztZQUN6QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsRUFBRTtnQkFDcEMsYUFBYTtnQkFDYixPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNILE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO29CQUN0QyxNQUFNLElBQUksS0FBSyxDQUNYLDBEQUEwRCxpQkFBaUIsd0RBQXdELENBQ3RJLENBQUM7aUJBQ0w7Z0JBQ0QsYUFBYTtnQkFDYixPQUFPLENBQUMsTUFBTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDMUQsT0FBTyxDQUFDO2FBQ2hCO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxvQkFBb0I7UUFDaEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDNUQsTUFBTSxXQUFXLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRS9ELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO2dCQUM3QyxHQUFHLEVBQUUsV0FBVzthQUNuQixDQUFDLENBQUM7WUFDSCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEQsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFFbEQsK0NBQStDO2dCQUMvQyxJQUNJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSTtvQkFDdkIsZUFBZSxDQUFDLFFBQVEsQ0FDcEIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FDekMsRUFDSDtvQkFDRSxPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBRUQsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLFlBQVksQ0FBQztZQUVqQixLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNoRCx3QkFBd0I7Z0JBQ3hCLElBQUksUUFBUSxDQUFDLGNBQWMsS0FBSyxLQUFLLEVBQUU7b0JBQ25DLFlBQVksR0FBRyxRQUFRLENBQUM7b0JBQ3hCLFNBQVM7aUJBQ1o7Z0JBRUQsd0NBQXdDO2dCQUN4QyxpREFBaUQ7Z0JBQ2pELElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQzdCLGNBQWMsQ0FBQztnQkFFbkIsK0JBQStCO2dCQUMvQixJQUFJLFFBQVEsQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO29CQUM3QixjQUFjLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxjQUFjLENBQ3RELGFBQWEsQ0FDaEIsQ0FBQztvQkFDRixhQUFhLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztpQkFDdkM7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDOUQ7WUFFRCxJQUFJLFlBQVksRUFBRTtnQkFDZCxJQUFJLGtCQUFrQixFQUNsQixnQkFBZ0IsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUN6QywrQkFBK0I7Z0JBQy9CLElBQUksWUFBWSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQ2pDLGtCQUFrQixHQUFHLE1BQU0sb0JBQW9CLENBQUMsY0FBYyxDQUMxRCxnQkFBZ0IsQ0FDbkIsQ0FBQztvQkFDRixnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7aUJBQzlDO2dCQUVELGFBQWE7Z0JBQ2IsTUFBTSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMvRCxNQUFBLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLE1BQU0sa0VBQUksQ0FBQztnQkFDL0IsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILG1CQUFtQixDQUNmLFVBQXNDLEVBQ3RDLFFBQWMsRUFDZCxRQUFpQjtRQUVqQixPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEMsSUFBSSxTQUFTLEVBQ1QsSUFBSSxHQUFHLEVBQUUsRUFDVCxLQUFLLEdBQWEsTUFBQSxVQUFVLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7WUFFN0MsZ0JBQWdCO1lBQ2hCLElBQUksUUFBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDL0IsSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU87cUJBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDO3FCQUNULE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDO3FCQUN4QixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFDOUI7WUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDbkIsSUFBSSxVQUFVLENBQUMsTUFBTSxFQUFFO29CQUNuQixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUM1QyxVQUFVLENBQUMsTUFBTSxDQUNwQixFQUFFO3dCQUNDLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxFQUFFOzRCQUNuQyxJQUFJLElBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQzt5QkFDL0I7NkJBQU0sSUFBSSxhQUFhLEVBQUU7NEJBQ3RCLElBQUksVUFBVSxFQUFFO2dDQUNaLE1BQU0sSUFBSSxLQUFLLENBQ1gsc0ZBQXNGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FDeEcsQ0FBQzs2QkFDTDs0QkFDRCxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQzt5QkFDdkI7NkJBQU07NEJBQ0gsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDbEIsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUM7eUJBQ3hCO3FCQUNKO2lCQUNKO2dCQUNELEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xCO1lBRUQsVUFBVTtZQUNWLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ2hDLE1BQUEsVUFBVSxDQUFDLE9BQU8sbUNBQUksU0FBUyxDQUNsQyxDQUFDO1lBRUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLGtDQUFrQyxJQUFJLDZEQUN6QyxRQUFRO3dCQUNKLENBQUMsQ0FBQyxZQUFZLFFBQVEsQ0FBQyxPQUFPLFlBQVk7d0JBQzFDLENBQUMsQ0FBQyx5QkFBeUIsUUFBUSxZQUMzQyxFQUFFO2lCQUNMLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO29CQUN2QyxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7d0JBQ25CLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNuQyxHQUFHLENBQUMsTUFBTSxDQUNiLEVBQUU7NEJBQ0MsbUNBQW1DOzRCQUNuQyxJQUFJLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVE7Z0NBQ25DLFNBQVM7NEJBQ2IsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQzNDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FDaEIsQ0FBQzs0QkFDRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ3ZCLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO3lCQUNoQztxQkFDSjtvQkFFRCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7d0JBQ3pCLEdBQUc7d0JBQ0gsR0FBRzt3QkFDSCxJQUFJO3dCQUNKLFVBQVU7d0JBQ1YsUUFBUTt3QkFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU87cUJBQ3ZCLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==