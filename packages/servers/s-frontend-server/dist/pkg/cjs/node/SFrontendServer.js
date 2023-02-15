"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const SFrontendServerCorsProxyParamsInterface_1 = __importDefault(require("./interface/SFrontendServerCorsProxyParamsInterface"));
const SFrontendServerStartParamsInterface_1 = __importDefault(require("./interface/SFrontendServerStartParamsInterface"));
// import __vhost from 'vhost';
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const fs_2 = require("@coffeekraken/sugar/fs");
const process_1 = require("@coffeekraken/sugar/process");
const autoCast_1 = __importDefault(require("@coffeekraken/sugar/shared/string/autoCast"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const run_middleware_1 = __importDefault(require("run-middleware"));
const viewRendererMiddleware_1 = __importDefault(require("./middleware/viewRendererMiddleware"));
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
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = SFrontendServerStartParamsInterface_1.default.apply(params);
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                (0, viewRendererMiddleware_1.default)()(req, res, next);
            });
            if (this._frontendServerConfig.modules) {
                for (let i = 0; i < Object.keys(this._frontendServerConfig.modules).length; i++) {
                    const moduleId = Object.keys(this._frontendServerConfig.modules)[i];
                    const moduleObj = this._frontendServerConfig.modules[moduleId];
                    let module;
                    try {
                        module = yield Promise.resolve().then(() => __importStar(require(moduleObj.path)));
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
                    const { default: middlewareWrapperFn } = yield Promise.resolve().then(() => __importStar(require(middlewareObj.path))); // eslint-disable-line
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
                    yield (0, datetime_1.__wait)(100);
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
                (0, process_1.__onProcessExit)(() => {
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
        return new s_promise_1.default(({ resolve, reject }) => {
            this._express.runMiddleware(url, (code, body, headers) => {
                resolve({
                    data: body,
                });
            });
        });
    }
    corsProxy(params) {
        const finalParams = SFrontendServerCorsProxyParamsInterface_1.default.apply(params);
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
                (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[corsProxy]</yellow> Call "<cyan>http://${s_sugar_config_1.default.get('frontendServer.hostname')}:${finalParams.port}</cyan>" with the "<magenta>${finalParams.targetUrlHeaderName}</magenta>" header to use it...`);
            });
        });
    }
    /**
     * Get the handler function for the given handler name or directly a path
     */
    _getHandlerFn(handlerNameOrPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (fs_1.default.existsSync(handlerNameOrPath)) {
                // @ts-ignore
                return (yield Promise.resolve().then(() => __importStar(require(pageConfig.handler)))).default;
            }
            else {
                const handlersInConfig = this._frontendServerConfig.handlers;
                if (!handlersInConfig[handlerNameOrPath]) {
                    throw new Error(`[SFrontendServer] Sorry but the handler named "<yellow>${handlerNameOrPath}</yellow>" seems to not exists or is missconfigured...`);
                }
                // @ts-ignore
                return (yield Promise.resolve().then(() => __importStar(require(handlersInConfig[handlerNameOrPath].path))))
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
            const pagesFolder = s_sugar_config_1.default.get('storage.src.pagesDir');
            const pagesFilesPaths = [];
            let _404PageFile;
            const pool = (0, fs_2.__pool)(`${pagesFolder}/**/*.{ts,js}`, {
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
                    buildedFileRes = yield s_typescript_builder_1.default.buildTemporary(finalPagePath);
                    finalPagePath = buildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield Promise.resolve().then(() => __importStar(require(`${finalPagePath}?${(0, string_1.__uniqid)()}`)));
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
                        yield s_typescript_builder_1.default.buildTemporary(final404PagePath);
                    final404PagePath = _404BuildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield Promise.resolve().then(() => __importStar(require(final404PagePath)));
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
                                    if (typeof (0, autoCast_1.default)(key) !== 'number') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsMkRBQXNEO0FBQ3RELHlEQUEyRDtBQUMzRCx1REFBc0Q7QUFDdEQsOERBQXdDO0FBQ3hDLHNEQUFnQztBQUNoQyw0Q0FBc0I7QUFDdEIsaUVBQThEO0FBQzlELGdEQUEwQjtBQUMxQixrSUFBNEc7QUFDNUcsMEhBQW9HO0FBQ3BHLCtCQUErQjtBQUMvQiwwRUFBbUQ7QUFDbkQsOEZBQXNFO0FBQ3RFLCtDQUFnRDtBQUNoRCx5REFBOEQ7QUFDOUQsMEZBQW9FO0FBQ3BFLDRFQUE4QztBQUM5QyxvRUFBNkM7QUFFN0MsaUdBQTJFO0FBRTNFLDhEQUF1QztBQUN2QyxzREFBZ0M7QUFxRWhDLE1BQXFCLGVBQWdCLFNBQVEsaUJBQVE7SUF3QmpEOzs7Ozs7Ozs7T0FTRztJQUNIO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFRWixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBbWRsQjs7O1dBR0c7UUFDSCx3QkFBbUIsR0FBRyxFQUFFLENBQUM7UUE3ZHJCLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUEsaUJBQVMsR0FBRSxDQUFDO1FBRTVCLElBQUEsd0JBQWUsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUlEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUNELE1BQXFEO1FBRXJELE1BQU0sV0FBVyxHQUNiLDZDQUFxQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElB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