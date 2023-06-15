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
                        referrerPolicy: 'no-referrer',
                        cache: 'no-cache',
                        headers: {
                            Authorization: req.header('Authorization'),
                            'Content-Type': 'application/json',
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