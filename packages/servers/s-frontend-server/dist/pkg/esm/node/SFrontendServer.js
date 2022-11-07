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
import __fileUpload from 'express-fileupload';
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
            this._express.use(__bodyParser.json({ limit: '120mb' }));
            this._express.use(__fileUpload());
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
            // viewRendererMiddleware
            this._express.use((req, res, next) => {
                pipe(__viewRendererMiddleware()(req, res, next));
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
                        pipe(middleware(req, res, next));
                    });
                }
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHlDQUF5QyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVHLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLGVBQWUsTUFBTSxnQkFBZ0IsQ0FB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