"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../../promise/SPromise"));
const express_1 = __importDefault(require("express"));
const trimLines_1 = __importDefault(require("../../string/trimLines"));
const extension_1 = __importDefault(require("../../fs/extension"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
/**
 * @name                express
 * @namespace           sugar.node.server.frontend
 * @type                Function
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @example       js
 * import frontendServer from '@coffeekraken/sugar/node/server/frontend/frontend';
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
exports.default = (args = {}) => {
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
    for (let [key, middleware] of Object.entries(middlewaresObj)) {
        if (middleware.path.slice(-3) !== '.js')
            middleware.path += '.js';
        middleware.path = path_1.default.resolve(middleware.path);
        if (!fs_1.default.existsSync(middleware.path)) {
            return promise.reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
        }
        // register the middleware
        server.use(require(middleware.path)(middleware.settings || {}));
    }
    // loop on handlers
    Object.keys(settings.handlers).forEach(async (pageName) => {
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
            const handlerFn = require(handlerPath);
            let method = handlerSettings.method || 'get', slug = handlerSettings.slug || '*', extension = handlerSettings.extension
                ? Array.isArray(handlerSettings.extension)
                    ? Array.isArray(handlerSettings.extension)
                    : [handlerSettings.extension]
                : null;
            if (slug !== '*') {
                slug = [`${slug}/*`, `${slug}`];
            }
            server[method](slug, async (req, res, next) => {
                const reqPathExtension = extension_1.default(req.path);
                if (extension) {
                    if (extension.indexOf(reqPathExtension) === -1 &&
                        extension.indexOf('.' + reqPathExtension) === -1) {
                        return next();
                    }
                }
                handlerFn(req, res, handlerSettings);
            });
        }
    });
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
};
