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
import { __parse } from '@coffeekraken/sugar/string';
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
     * @return      Promise<Function>           A promise that will be resolved when the server has started with a function to stop it
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = __SFrontendServerStartParamsInterface.apply(params);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                    yield module.default({
                        express: this._express,
                        settings: moduleObj.settings,
                        config: this._frontendServerConfig,
                        startParams: finalParams,
                    });
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
                    yield this._registerPageConfig(pageConfig, null, id);
                }
            }
            // "pages" folder routes
            yield this._registerPagesRoutes();
            if (!(yield __isPortFree(this._frontendServerConfig.port))) {
                console.log(`Port <yellow>${this._frontendServerConfig.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                return reject();
            }
            if (!finalParams.listen) {
                // server started successfully
                console.log(`<yellow>Frontend server</yellow> started <green>successfully</green>`);
                // when no listen, we just resolve the promise to say that the server has started
                reject();
            }
            else {
                const server = this._express.listen(this._frontendServerConfig.port, () => __awaiter(this, void 0, void 0, function* () {
                    var _b, _c;
                    yield __wait(100);
                    // 404
                    this._express.get('*', function (req, res) {
                        res.status(404).send(`╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`);
                    });
                    // server started successfully
                    console.log(`<yellow>Frontend server</yellow> started <green>successfully</green>`);
                    console.log(`<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`);
                    (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `Root directory: <cyan>${finalParams.rootDir}</cyan>`);
                    (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `Log level: <yellow>${finalParams.logLevel}</yellow>`);
                    resolve(() => {
                        return new Promise((_resolve) => {
                            server.close(() => {
                                _resolve(null);
                            });
                        });
                    });
                }));
                __onProcessExit(() => {
                    console.log(`<red>[kill]</red> Gracefully killing the <cyan>frontend server</cyan>...`);
                    return new Promise((_resolve) => {
                        server.close(() => {
                            // @ts-ignore
                            _resolve();
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
            if (typeof handlerNameOrPath === 'function') {
                return handlerNameOrPath;
            }
            if (__fs.existsSync(handlerNameOrPath)) {
                // @ts-ignore
                return (yield import(pageConfig.handler)).default;
            }
            const handlersInConfig = this._frontendServerConfig.handlers;
            if (!handlersInConfig[handlerNameOrPath]) {
                throw new Error(`[SFrontendServer] Sorry but the handler named "<yellow>${handlerNameOrPath}</yellow>" seems to not exists or is missconfigured...`);
            }
            // @ts-ignore
            return (yield import(handlersInConfig[handlerNameOrPath].path)).default;
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
            const pool = __pool(`${pagesFolder}/**/*.{json,ts,js}`, {
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
                var _b;
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
                let pageConfig;
                if (file.extension === 'json') {
                    (_b = file.update) === null || _b === void 0 ? void 0 : _b.call(file);
                    pageConfig = file.data;
                }
                else {
                    // @ts-ignore
                    const { default: importedPageConfig } = yield import(`${finalPagePath}?${__uniqid()}`);
                    if (!importedPageConfig) {
                        throw new Error(`[frontendServer] Sorry but the given "<cyan>${finalPagePath}</cyan>" page file seems to be broken. Make sure to export the page config correctly from this file...`);
                    }
                    pageConfig = importedPageConfig;
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
            // ensure array
            if (!Array.isArray(pageConfig)) {
                pageConfig = [pageConfig];
            }
            for (let pageConfigObj of pageConfig) {
                let slug = '', slugs = (_a = pageConfigObj.slugs) !== null && _a !== void 0 ? _a : [];
                // generate path
                if (pageFile &&
                    !pageConfigObj.slugs &&
                    pageFile.nameWithoutExt !== 'index') {
                    slug = `/${pageFile.path
                        .replace(`${__SSugarConfig.get('storage.src.pagesDir')}/`, '')
                        .split('/')
                        .slice(0, -1)
                        .join('/')
                        .replace(/\.(t|j)s$/, '')
                        .replace(/\./g, '/')}`;
                }
                else if (!pageConfigObj.slugs &&
                    pageFile.nameWithoutExt === 'index') {
                    slug = '/';
                }
                if (!pageConfigObj.slugs) {
                    if (pageConfigObj.params) {
                        let isOptional = false;
                        for (let [name, requiredOrStr] of Object.entries(pageConfigObj.params)) {
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
                    let slugParts = slug.split('/');
                    const requiredParams = [];
                    slugParts = slugParts.map((p) => {
                        if (p.endsWith('!')) {
                            const newParam = p.replace(/\!$/, '');
                            requiredParams.push(newParam);
                            return newParam;
                        }
                        return p;
                    });
                    const newSlug = slugParts.join('/');
                    // register the route only once by slug
                    if (!this._getPageConfigBySlug(newSlug)) {
                        this._express.get(newSlug, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                            var _b, _c;
                            const _pageConfig = (_b = this._getPageConfigBySlug(slug)) !== null && _b !== void 0 ? _b : pageConfigObj;
                            // handler
                            const handlerFn = yield this._getHandlerFn((_c = _pageConfig.handler) !== null && _c !== void 0 ? _c : 'generic');
                            if (_pageConfig.params) {
                                for (let [key, value] of Object.entries(req.params)) {
                                    // do not process non "number" keys
                                    if (typeof __parse(key) !== 'number') {
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
                                config: this._frontendServerConfig,
                                frontendServerConfig: this._frontendServerConfig,
                            });
                        }));
                    }
                    // set the new pageConfig for this slug
                    this._pagesConfigsBySlug[slug] = pageConfigObj;
                });
            }
            resolve();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHlDQUF5QyxNQUFNLHFEQUFxRCxDQUFDO0FBQzVHLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDckQsT0FBTyxZQUFZLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyx3QkFBd0IsTUFB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