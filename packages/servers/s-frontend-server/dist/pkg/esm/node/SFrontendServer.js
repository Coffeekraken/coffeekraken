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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isPortFree } from '@coffeekraken/sugar/network';
import { __uniqid } from '@coffeekraken/sugar/string';
import __compression from 'compression';
import __express from 'express';
import __fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import __path from 'path';
import __SFrontendServerCorsProxyParamsInterface from './interface/SFrontendServerCorsProxyParamsInterface';
import __SFrontendServerStartParamsInterface from './interface/SFrontendServerStartParamsInterface';
// import __vhost from 'vhost';
import __SDuration from '@coffeekraken/s-duration';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __pool } from '@coffeekraken/sugar/fs';
import { __onProcessExit } from '@coffeekraken/sugar/process';
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
        /**
         * This method register the passed pageConfig config object that can be specified
         * either in the "pages" folder or in the "frontendServer.pages" configuration.
         */
        this._pagesConfigsBySlug = {};
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
            const pagesFilesPaths = [];
            let _404PageFile;
            const pool = __pool(`${pagesFolder}/**/*.{ts,js}`, {
                cwd: pagesFolder,
                watch: true,
            });
            pool.on('unlink', (file) => {
                if (!pagesFilesPaths.includes(file.path)) {
                    return;
                }
                pagesFilesPaths.splice(pagesFilesPaths.indexOf(file.path), 1);
            });
            pool.on('add,change', (file) => __awaiter(this, void 0, void 0, function* () {
                // protect bad files names
                if (file.name.split('.').length > 2)
                    return false;
                // remove js files if the .ts equivalent exists
                if (file.extension === 'js' &&
                    pagesFilesPaths.includes(`${file.path.replace(/\.js$/, '.ts')}`)) {
                    return;
                }
                // add the file in the stack
                pagesFilesPaths.push(file.path);
                // handle 404 at the end
                if (file.nameWithoutExt === '404') {
                    _404PageFile = file;
                    return;
                }
                // build final path. If is a typescript,
                // it will be transpiled and override the default
                let finalPagePath = file.path, buildedFileRes;
                // compile typescript if needed
                if (file.extension === 'ts') {
                    buildedFileRes = yield __STypescriptBuilder.buildTemporary(finalPagePath);
                    finalPagePath = buildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield import(`${finalPagePath}?${__uniqid()}`);
                yield pipe(this._registerPageConfig(pageConfig, file));
            }));
            // wait until our pool is ready
            yield pool.ready;
            // handle 404 page
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
            // end of the pages registration
            resolve();
        }));
    }
    _getPageConfigBySlug(slug) {
        return this._pagesConfigsBySlug[slug];
    }
    _registerPageConfig(pageConfig, pageFile, configId) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let slug = '', slugs = (_a = pageConfig.slugs) !== null && _a !== void 0 ? _a : [];
            // generate path
            if (pageFile &&
                !pageConfig.slugs &&
                pageFile.nameWithoutExt !== 'index') {
                slug = `/${pageFile.relPath
                    .split('/')
                    .slice(0, -1)
                    .join('/')
                    .replace(/\.(t|j)s$/, '')
                    .replace(/\./g, '/')}`;
            }
            else if (!pageConfig.slugs &&
                pageFile.nameWithoutExt === 'index') {
                slug = '/';
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
            slugs.forEach((slug) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${pageFile
                        ? `<magenta>${pageFile.relPath}</magenta>`
                        : `<magenta>config.pages.${configId}</magenta>`}`,
                });
                // register the route only once by slug
                if (!this._getPageConfigBySlug(slug)) {
                    this._express.get(slug, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        const _pageConfig = (_a = this._getPageConfigBySlug(slug)) !== null && _a !== void 0 ? _a : pageConfig;
                        // handler
                        const handlerFn = yield this._getHandlerFn((_b = _pageConfig.handler) !== null && _b !== void 0 ? _b : 'generic');
                        if (_pageConfig.params) {
                            for (let [key, value] of Object.entries(req.params)) {
                                // do not process non "number" keys
                                if (typeof __autoCast(key) !== 'number') {
                                    continue;
                                }
                                const paramKey = Object.keys(_pageConfig.params)[parseInt(key)];
                                delete req.params[key];
                                req.params[paramKey] = value;
                            }
                        }
                        const handlerPro = handlerFn({
                            req,
                            res,
                            next,
                            pageConfig: _pageConfig,
                            pageFile,
                            frontendServerConfig: this._config,
                        });
                        pipe(handlerPro);
                    }));
                }
                // set the new pageConfig for this slug
                this._pagesConfigsBySlug[slug] = pageConfig;
            });
            resolve();
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHlDQUF5QyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVHLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLHdCQUF3QixNQUFNLHFDQUFxQyxD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