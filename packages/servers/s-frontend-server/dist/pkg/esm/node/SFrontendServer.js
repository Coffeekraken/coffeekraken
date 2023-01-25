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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            this._express.use(__compression());
            // save metas
            this.serverMetas = {
                hostname: finalParams.hostname,
                port: finalParams.port,
                sessionId: finalParams.target === 'production' ||
                    __SEnv.is('production')
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
            this._frontendServerConfig = __SSugarConfig.get('frontendServer');
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
                __viewRendererMiddleware()(req, res, next);
            });
            if (this._frontendServerConfig.modules) {
                for (let i = 0; i < Object.keys(this._frontendServerConfig.modules).length; i++) {
                    const moduleId = Object.keys(this._frontendServerConfig.modules)[i];
                    const moduleObj = this._frontendServerConfig.modules[moduleId];
                    let module;
                    try {
                        module = yield import(moduleObj.path);
                    }
                    catch (e) {
                        console.log(e);
                        throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`);
                    }
                    yield module.default(this._express, moduleObj.settings, this._frontendServerConfig);
                }
            }
            if (this._frontendServerConfig.proxy) {
                Object.keys(this._frontendServerConfig.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = this._frontendServerConfig.proxy[proxyId];
                    // @ts-ignore
                    this._express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (this._frontendServerConfig.staticDirs) {
                Object.keys(this._frontendServerConfig.staticDirs).forEach((dir) => {
                    var _a;
                    const fsPath = this._frontendServerConfig.staticDirs[dir];
                    (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`);
                    this._express.use(dir, __express.static(fsPath, { dotfiles: 'allow' }));
                });
            }
            if (this._frontendServerConfig.middlewares) {
                for (let i = 0; i <
                    Object.keys(this._frontendServerConfig.middlewares).length; i++) {
                    const middlewareName = Object.keys(this._frontendServerConfig.middlewares)[i];
                    const middlewareObj = this._frontendServerConfig.middlewares[middlewareName];
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
                        middleware(req, res, next);
                    });
                }
            }
            // logging requests
            if (logLevelInt >= 4) {
                this._express.use((req, res, next) => {
                    const duration = new __SDuration();
                    function afterResponse() {
                        var _a;
                        (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<cyan>[request]</cyan> Request on "<cyan>${req.url}</cyan>" served in <yellow>${duration.end().formatedDuration}</yellow>`);
                    }
                    res.on('finish', afterResponse);
                    next();
                });
            }
            // routes pages from config
            if (this._frontendServerConfig.pages) {
                for (let [id, pageConfig] of Object.entries(this._frontendServerConfig.pages)) {
                    yield this._registerPageConfig(pageConfig, null, id, id);
                }
            }
            // "pages" folder routes
            yield this._registerPagesRoutes();
            if (!(yield __isPortFree(this._frontendServerConfig.port))) {
                console.log(`Port <yellow>${this._frontendServerConfig.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                process.kill(1);
            }
            if (!finalParams.listen) {
                // server started successfully
                console.log(`<yellow>Frontend server</yellow> started <green>successfully</green>`);
                // when no listen, we just resolve the promise to say that the server has started
                resolve();
            }
            else {
                const server = this._express.listen(this._frontendServerConfig.port, () => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    yield __wait(100);
                    // 404
                    this._express.get('*', function (req, res) {
                        res.status(404).send('what???');
                    });
                    // server started successfully
                    console.log(`<yellow>Frontend server</yellow> started <green>successfully</green>`);
                    console.log(`<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`);
                    (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `Root directory: <cyan>${finalParams.rootDir}</cyan>`);
                    (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `Log level: <yellow>${finalParams.logLevel}</yellow>`);
                }));
                __onProcessExit(() => {
                    console.log(`<red>[kill]</red> Gracefully killing the <cyan>frontend server</cyan>...`);
                    return new Promise((resolve) => {
                        server.close(() => {
                            // @ts-ignore
                            resolve();
                        });
                    });
                });
            }
        }));
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
        return new Promise((resolve) => {
            const app = __express();
            var myLimit = __SSugarConfig.get('frontendServer.corsProxy.limit');
            app.use(__bodyParser.json({ limit: myLimit }));
            app.all('*', function (req, res, next) {
                // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
                res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));
                res.header('Cross-Origin-Embedder-Policy', 'credentialless');
                res.header('Cross-Origin-Opener-Policy', 'same-origin');
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
                            console.error(error);
                        }
                    }).pipe(res);
                }
            });
            app.set('port', finalParams.port);
            app.listen(app.get('port'), function () {
                var _a, _b;
                (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[corsProxy]</yellow> Cors proxy server running on port <cyan>${app.get('port')}</cyan>...`);
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[corsProxy]</yellow> Call "<cyan>http://${__SSugarConfig.get('frontendServer.hostname')}:${finalParams.port}</cyan>" with the "<magenta>${finalParams.targetUrlHeaderName}</magenta>" header to use it...`);
            });
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
                const handlersInConfig = this._frontendServerConfig.handlers;
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                if (!pageConfig) {
                    throw new Error(`[frontendServer] Sorry but the given "<cyan>${finalPagePath}</cyan>" page file seems to be broken. Make sure to export the page config correctly from this file...`);
                }
                yield this._registerPageConfig(pageConfig, file);
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
                yield this._registerPageConfig(pageConfig, _404PageFile);
            }
            // end of the pages registration
            resolve();
        }));
    }
    _getPageConfigBySlug(slug) {
        return this._pagesConfigsBySlug[slug];
    }
    _registerPageConfig(pageConfig, pageFile, configId) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let slug = '', slugs = (_a = pageConfig.slugs) !== null && _a !== void 0 ? _a : [];
            // generate path
            if (pageFile &&
                !pageConfig.slugs &&
                pageFile.nameWithoutExt !== 'index') {
                slug = `/${pageFile.path
                    .replace(`${__SSugarConfig.get('storage.src.pagesDir')}/`, '')
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
                var _a;
                (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${pageFile
                    ? `<magenta>${pageFile.relPath}</magenta>`
                    : `<magenta>config.pages.${configId}</magenta>`}`);
                // register the route only once by slug
                if (!this._getPageConfigBySlug(slug)) {
                    this._express.get(slug, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                        var _b, _c;
                        const _pageConfig = (_b = this._getPageConfigBySlug(slug)) !== null && _b !== void 0 ? _b : pageConfig;
                        // handler
                        const handlerFn = yield this._getHandlerFn((_c = _pageConfig.handler) !== null && _c !== void 0 ? _c : 'generic');
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
                        handlerFn({
                            req,
                            res,
                            next,
                            pageConfig: _pageConfig,
                            pageFile,
                            frontendServerConfig: this._frontendServerConfig,
                        });
                    }));
                }
                // set the new pageConfig for this slug
                this._pagesConfigsBySlug[slug] = pageConfig;
            });
            resolve();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHlDQUF5QyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVHLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLFlBQVksTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLHdCQUF3QixNQUFNLHFDQUFxQyxD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