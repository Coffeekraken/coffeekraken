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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const isPortFree_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/isPortFree"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const path_1 = __importDefault(require("path"));
const SFrontendServerCorsProxyParamsInterface_1 = __importDefault(require("./interface/SFrontendServerCorsProxyParamsInterface"));
const SFrontendServerStartParamsInterface_1 = __importDefault(require("./interface/SFrontendServerStartParamsInterface"));
// import __vhost from 'vhost';
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_typescript_builder_1 = __importDefault(require("@coffeekraken/s-typescript-builder"));
const kill_1 = __importDefault(require("@coffeekraken/sugar/node/process/kill"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const autoCast_1 = __importDefault(require("@coffeekraken/sugar/shared/string/autoCast"));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // enable compression if prod
            if (finalParams.prod || s_env_1.default.is('production')) {
                this._express.use((0, compression_1.default)());
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
            this._config = s_sugar_config_1.default.get('frontendServer');
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
                        module = yield Promise.resolve().then(() => __importStar(require(moduleObj.path)));
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
                    this._express.use((0, http_proxy_middleware_1.createProxyMiddleware)(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (this._config.staticDirs) {
                Object.keys(this._config.staticDirs).forEach((dir) => {
                    const fsPath = this._config.staticDirs[dir];
                    emit('log', {
                        value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${path_1.default.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                    });
                    this._express.use(dir, express_1.default.static(fsPath, { dotfiles: 'allow' }));
                });
            }
            if (this._config.middlewares) {
                for (let i = 0; i < Object.keys(this._config.middlewares).length; i++) {
                    const middlewareName = Object.keys(this._config.middlewares)[i];
                    const middlewareObj = this._config.middlewares[middlewareName];
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
                        return pipe(middleware(req, res, next));
                    });
                }
            }
            // viewRendererMiddleware
            this._express.use((req, res, next) => {
                return pipe((0, viewRendererMiddleware_1.default)()(req, res, next));
            });
            // logging requests
            if (logLevelInt >= 4) {
                this._express.use((req, res, next) => {
                    // emit('log', {
                    //     type: 'detail',
                    //     group: `s-frontend-server-${this.metas.id}`,
                    //     value: `Request on "<cyan>${req.url}</cyan>"`,
                    // });
                    const duration = new s_duration_1.default();
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
            if (!(yield (0, isPortFree_1.default)(this._config.port))) {
                emit('log', {
                    value: `Port <yellow>${this._config.port}</yellow> already in use. Try to kill it before continue...`,
                });
                yield (0, kill_1.default)(`:${this._config.port}`);
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
                    yield (0, wait_1.default)(100);
                    // server started successfully
                    emit('log', {
                        value: `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                    });
                    emit('log', {
                        value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_VERBOSE,
                        // group: `s-frontend-server-${this.metas.id}`,
                        value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                    });
                    emit('log', {
                        type: s_log_1.default.TYPE_VERBOSE,
                        // group: `s-frontend-server-${this.metas.id}`,
                        value: `Log level: <yellow>${finalParams.logLevel}</yellow>`,
                    });
                }));
                (0, onProcessExit_1.default)(() => {
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
            const app = (0, express_1.default)();
            var myLimit = s_sugar_config_1.default.get('frontendServer.corsProxy.limit');
            app.use(body_parser_1.default.json({ limit: myLimit }));
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
                    (0, request_1.default)({
                        url: targetURL + req.url,
                        method: req.method,
                        json: req.body,
                        headers: {
                            Authorization: req.header('Authorization'),
                        },
                    }, function (error, response, body) {
                        if (error) {
                            emit('log', {
                                type: s_log_1.default.TYPE_ERROR,
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
                    value: `<yellow>[corsProxy]</yellow> Call "<cyan>http://${s_sugar_config_1.default.get('frontendServer.hostname')}:${finalParams.port}</cyan>" with the "<magenta>${finalParams.targetUrlHeaderName}</magenta>" header to use it...`,
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
            if (fs_1.default.existsSync(handlerNameOrPath)) {
                // @ts-ignore
                return (yield Promise.resolve().then(() => __importStar(require(pageConfig.handler)))).default;
            }
            else {
                const handlersInConfig = this._config.handlers;
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const pagesFolder = s_sugar_config_1.default.get('storage.src.pagesDir');
            let pagesFiles = s_glob_1.default.resolve(`**/*.{ts,js}`, {
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
                    buildedFileRes = yield s_typescript_builder_1.default.buildTemporary(finalPagePath);
                    finalPagePath = buildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield Promise.resolve().then(() => __importStar(require(finalPagePath)));
                yield pipe(this._registerPageConfig(pageConfig, pageFile));
            }
            if (_404PageFile) {
                let _404BuildedFileRes, final404PagePath = _404PageFile.path;
                // compile typescript if needed
                if (_404PageFile.extension === 'ts') {
                    _404BuildedFileRes = yield s_typescript_builder_1.default.buildTemporary(final404PagePath);
                    final404PagePath = _404BuildedFileRes.path;
                }
                // @ts-ignore
                const { default: pageConfig } = yield Promise.resolve().then(() => __importStar(require(final404PagePath)));
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${pageFile
                        ? `<magenta>${pageFile.relPath}</magenta>`
                        : `<magenta>config.pages.${configId}</magenta>`}`,
                });
                this._express.get(slug, (req, res, next) => {
                    if (pageConfig.params) {
                        for (let [key, value] of Object.entries(req.params)) {
                            // do not process non "number" keys
                            if (typeof (0, autoCast_1.default)(key) !== 'number')
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
exports.default = SFrontendServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELG1HQUE2RTtBQUM3RSxnRkFBMEQ7QUFDMUQsOERBQXdDO0FBQ3hDLHNEQUFnQztBQUNoQyw0Q0FBc0I7QUFDdEIsaUVBQThEO0FBQzlELGdEQUEwQjtBQUMxQixrSUFBNEc7QUFDNUcsMEhBQW9HO0FBQ3BHLCtCQUErQjtBQUMvQiwwRUFBbUQ7QUFDbkQsa0VBQTJDO0FBQzNDLDhGQUFzRTtBQUN0RSxpRkFBMkQ7QUFDM0QsbUdBQTZFO0FBQzdFLDBGQUFvRTtBQUNwRSxvRUFBNkM7QUFFN0MsaUdBQTJFO0FBRTNFLDhEQUF1QztBQUN2QyxzREFBZ0M7QUF3RGhDLE1BQXFCLGVBQWdCLFNBQVEsaUJBQVE7SUFhakQ7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQVFaLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFOZCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFBLGlCQUFTLEdBQUUsQ0FBQztRQUU1QixJQUFBLHdCQUFlLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFJRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUFxRDtRQUN2RCxNQUFNLFdBQVcsR0FBZ0MsNkNBQXFDLENBQUMsS0FBSyxDQUN4RixNQUFNLENBQ1QsQ0FBQztRQUVGLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7O1lBQzFDLDZCQUE2QjtZQUM3QixJQUFJLFdBQVcs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