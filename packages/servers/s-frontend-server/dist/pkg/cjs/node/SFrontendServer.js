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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const network_1 = require("@coffeekraken/sugar/network");
const string_1 = require("@coffeekraken/sugar/string");
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const SFrontendServerCorsProxyParamsInterface_js_1 = __importDefault(require("./interface/SFrontendServerCorsProxyParamsInterface.js"));
const SFrontendServerStartParamsInterface_js_1 = __importDefault(require("./interface/SFrontendServerStartParamsInterface.js"));
// import __vhost from 'vhost';
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const fs_2 = require("@coffeekraken/sugar/fs");
const process_1 = require("@coffeekraken/sugar/process");
const string_2 = require("@coffeekraken/sugar/string");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const run_middleware_1 = __importDefault(require("run-middleware"));
const viewRendererMiddleware_js_1 = __importDefault(require("./middleware/viewRendererMiddleware.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const request_1 = __importDefault(require("request"));
class SFrontendServer extends s_class_1.default {
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
        this._express = (0, express_1.default)();
        (0, run_middleware_1.default)(this._express);
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
        const finalParams = SFrontendServerStartParamsInterface_js_1.default.apply(params);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            this._express.use((0, compression_1.default)());
            // save metas
            this.serverMetas = {
                hostname: finalParams.hostname,
                port: finalParams.port,
                sessionId: finalParams.target === 'production' ||
                    s_env_1.default.is('production')
                    ? `${(Math.random() + 1).toString(36).substring(2)}`
                    : '',
            };
            this._express.use(body_parser_1.default.json({ limit: '120mb' }));
            this._express.use((0, express_fileupload_1.default)());
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
            this._frontendServerConfig = s_sugar_config_1.default.get('frontendServer');
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
                (0, viewRendererMiddleware_js_1.default)()(req, res, next);
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
                    this._express.use((0, http_proxy_middleware_1.createProxyMiddleware)(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (this._frontendServerConfig.staticDirs) {
                Object.keys(this._frontendServerConfig.staticDirs).forEach((dir) => {
                    var _a;
                    const fsPath = this._frontendServerConfig.staticDirs[dir];
                    (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<cyan>[static]</cyan> Exposing static folder "<cyan>${path_1.default.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`);
                    this._express.use(dir, express_1.default.static(fsPath, { dotfiles: 'allow' }));
                });
            }
            if (this._frontendServerConfig.middlewares) {
                for (let i = 0; i <
                    Object.keys(this._frontendServerConfig.middlewares).length; i++) {
                    const middlewareName = Object.keys(this._frontendServerConfig.middlewares)[i];
                    const middlewareObj = this._frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path ||
                        fs_1.default.existsSync(middlewareObj.path)) {
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
                    const duration = new s_duration_1.default();
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
            if (!(yield (0, network_1.__isPortFree)(this._frontendServerConfig.port))) {
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
                    yield (0, datetime_1.__wait)(100);
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
                (0, process_1.__onProcessExit)(() => {
                    console.log(`<red>[kill]</red> Gracefully killing the <cyan>frontend server</cyan>...`);
                    return new Promise((_resolve) => {
                        server.close(() => __awaiter(this, void 0, void 0, function* () {
                            yield (0, datetime_1.__wait)(500);
                            _resolve(null);
                        }));
                    });
                });
            }
        }));
    }
    request(url) {
        return new s_promise_1.default(({ resolve, reject }) => {
            this._express.runMiddleware(url, (code, body, headers) => {
                resolve({
                    data: body,
                });
            });
        });
    }
    corsProxy(params) {
        const finalParams = SFrontendServerCorsProxyParamsInterface_js_1.default.apply(params);
        return new Promise((resolve) => {
            const app = (0, express_1.default)();
            var myLimit = s_sugar_config_1.default.get('frontendServer.corsProxy.limit');
            app.use(body_parser_1.default.json({ limit: myLimit }));
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
                    (0, request_1.default)({
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
                console.log(`<yellow>[corsProxy]</yellow> Cors proxy server running on port <cyan>${app.get('port')}</cyan>...`);
                console.log(`<yellow>[corsProxy]</yellow> Call "<cyan>http://${s_sugar_config_1.default.get('frontendServer.hostname')}:${finalParams.port}</cyan>" with the "<magenta>${finalParams.targetUrlHeaderName}</magenta>" header to use it...`);
            });
            (0, process_1.__onProcessExit)(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>cors proxy server</cyan>...`);
                return new Promise((_resolve) => {
                    var _a;
                    (_a = app.close) === null || _a === void 0 ? void 0 : _a.call(app, () => __awaiter(this, void 0, void 0, function* () {
                        yield (0, datetime_1.__wait)(500);
                        _resolve(null);
                    }));
                });
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
            if (fs_1.default.existsSync(handlerNameOrPath)) {
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
            const pagesFolder = s_sugar_config_1.default.get('storage.src.pagesDir');
            const pagesFilesPaths = [];
            let _404PageFile;
            const pool = (0, fs_2.__pool)(`${pagesFolder}/**/*.{json,ts,js}`, {
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
                    buildedFileRes = yield s_typescript_builder_1.default.buildTemporary(finalPagePath);
                    finalPagePath = buildedFileRes.path;
                }
                let pageConfig;
                if (file.extension === 'json') {
                    (_b = file.update) === null || _b === void 0 ? void 0 : _b.call(file);
                    pageConfig = file.data;
                }
                else {
                    // @ts-ignore
                    const { default: importedPageConfig } = yield import(`${finalPagePath}?${(0, string_1.__uniqid)()}`);
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
                        yield s_typescript_builder_1.default.buildTemporary(final404PagePath);
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
                        .replace(`${s_sugar_config_1.default.get('storage.src.pagesDir')}/`, '')
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
                    (_a = console.log) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${pageFile
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
                                    if (typeof (0, string_2.__parse)(key) !== 'number') {
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
exports.default = SFrontendServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCx5REFBMkQ7QUFDM0QsdURBQXNEO0FBQ3RELDhEQUF3QztBQUN4QyxzREFBZ0M7QUFDaEMsNENBQXNCO0FBQ3RCLGlFQUE4RDtBQUM5RCxnREFBMEI7QUFDMUIsd0lBQStHO0FBQy9HLGdJQUF1RztBQUN2RywrQkFBK0I7QUFDL0IsMEVBQW1EO0FBQ25ELDhGQUFzRTtBQUN0RSwrQ0FBZ0Q7QUFDaEQseURBQThEO0FBQzlELHVEQUFxRDtBQUNyRCw0RUFBOEM7QUFDOUMsb0VBQTZDO0FBRTdDLHVHQUE4RTtBQUU5RSw4REFBdUM7QUFDdkMsc0RBQWdDO0FBd0VoQyxNQUFxQixlQUFnQixTQUFRLGlCQUFRO0lBd0JqRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBUVosWUFBTyxHQUFRLEVBQUUsQ0FBQztRQXlmbEI7OztXQUdHO1FBQ0gsd0JBQW1CLEdBQUcsRUFBRSxDQUFDO1FBbmdCckIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxpQkFBUyxHQUFFLENBQUM7UUFFNUIsSUFBQSx3QkFBZSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBSUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FDRCxNQUFxRDtRQUVyRCxNQUFNLFdBQVcsR0FDYixnREFBcUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBQSxxQkFBYSxH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