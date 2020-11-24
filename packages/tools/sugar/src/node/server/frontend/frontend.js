"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const sugar_1 = __importDefault(require("../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const express_1 = __importDefault(require("express"));
const trimLines_1 = __importDefault(require("../../string/trimLines"));
const extension_1 = __importDefault(require("../../fs/extension"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
module.exports = (args = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const settings = deepMerge_1.default(sugar_1.default('frontend'), args);
    const server = express_1.default();
    const promise = new SPromise_1.default({
        id: 'frontendServer'
    });
    // static directories
    Object.keys(settings.staticDirs).forEach((path) => {
        const fsPath = settings.staticDirs[path];
        server.use(path, express_1.default.static(fsPath));
    });
    // load the middlewares
    const middlewaresObj = settings.middlewares || {};
    for (const [key, middleware] of Object.entries(middlewaresObj)) {
        if (middleware.path.slice(-3) !== '.js')
            middleware.path += '.js';
        middleware.path = path_1.default.resolve(middleware.path);
        if (!fs_1.default.existsSync(middleware.path)) {
            return promise.reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
        }
        // register the middleware
        server.use(yield Promise.resolve().then(() => __importStar(require(middleware.path)))(middleware.settings || {}));
    }
    // loop on handlers
    Object.keys(settings.handlers).forEach((pageName) => __awaiter(void 0, void 0, void 0, function* () {
        const handlerSettings = deepMerge_1.default({
            log: true
        }, settings.handlers[pageName]);
        let handlerPath = handlerSettings.handler;
        if (handlerPath.slice(-3) !== '.js')
            handlerPath += '.js';
        if (!fs_1.default.existsSync(handlerPath)) {
            console.warn(`Frontend handler "<cyan>${path_1.default.relative(packageRoot_1.default(), handlerPath)}</cyan>" does not exists...`);
        }
        else {
            const handlerFn = yield Promise.resolve().then(() => __importStar(require(handlerPath)));
            const method = handlerSettings.method || 'get';
            let slug = handlerSettings.slug || '*';
            const extension = handlerSettings.extension
                ? Array.isArray(handlerSettings.extension)
                    ? Array.isArray(handlerSettings.extension)
                    : [handlerSettings.extension]
                : null;
            if (slug !== '*') {
                slug = [`${slug}/*`, `${slug}`];
            }
            server[method](slug, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
                const reqPathExtension = extension_1.default(req.path);
                if (extension) {
                    if (extension.indexOf(reqPathExtension) === -1 &&
                        extension.indexOf('.' + reqPathExtension) === -1) {
                        return next();
                    }
                }
                handlerFn(req, res, handlerSettings);
            }));
        }
    }));
    server
        .listen(settings.port, settings.hostname, () => {
        setTimeout(() => {
            promise.trigger('log', {
                type: 'header',
                value: trimLines_1.default(`Your <primary>Frontend Express</primary> server is <green>up and running</green>:

              - Hostname        : <yellow>${settings.hostname}</yellow>
              - Port            : <yellow>${settings.port}</yellow>
              - Root directory  : <yellow>${settings.rootDir}</yellow>
              - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
            });
        }, 200);
    })
        .on('error', (e) => {
        const string = e.toString();
        promise.reject(string);
    });
    return promise;
});
