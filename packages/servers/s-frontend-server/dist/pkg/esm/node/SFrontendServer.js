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
import { __isPortFree } from '@coffeekraken/sugar/network';
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
            // save metas
            this.serverMetas = {
                hostname: finalParams.hostname,
                port: finalParams.port,
                sessionId: finalParams.prod || __SEnv.is('production')
                    ? `${(Math.random() + 1).toString(36).substring(2)}`
                    : '',
            };
            this._express.use((req, res, next) => {
                if (!res.templateData)
                    res.templateData = {};
                if (!res.templateData.shared)
                    res.templateData.shared = {};
                res.templateData.shared.server = this.serverMetas;
                next();
            });
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
                    type: __SLog.TYPE_ERROR,
                    value: `Port <yellow>${this._config.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                });
                process.kill(1);
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
                        value: `<red>[kill]</red> Gracefully killing the <cyan>frontend server</cyan>...`,
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
                id: this.constructor.name,
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
                    _404BuildedFileRes =
                        yield __STypescriptBuilder.buildTemporary(final404PagePath);
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
                        frontendServerConfig: this._config,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLGFBQWEsTUFBTSxhQUFhLENBQUM7QUFDeEMsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyx5Q0FBeUMsTUFBTSxxREFBcUQsQ0FBQztBQUM1RyxPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3BHLCtCQUErQjtBQUMvQixPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLG9CQUFvQixNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBQzdFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sZUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sd0JBQXdCLE1BQU0scUNBQXFDLENBQUM7QUFFM0UsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQThEaEMs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