"use strict";
// @ts-nocheck
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
/**
 * @name                express
 * @namespace           sugar.node.server.frontend
 * @type                Function
 * @wip
 *
 * This function take care of starting a frontend express based server
 *
 * @param         {Object}          [args={}]         The args object to configure the build process. Check the PhpSCli class definition object for available arguments
 * @return        {express}                       The server instance started
 *
 * @event         log       Some informations that you can or not display to your users
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import frontendServer from '@coffeekraken/sugar/node/server/frontend/frontend';
 * frontendServer({});
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
const fn = function (args = {}) {
    const settings = deepMerge_1.default(sugar_1.default('frontend'), args);
    const app = express_1.default();
    let server;
    const promise = new SPromise_1.default({
        id: 'frontendServer'
    });
    (() => __awaiter(this, void 0, void 0, function* () {
        // static directories
        Object.keys(settings.staticDirs).forEach((path) => {
            const fsPath = settings.staticDirs[path];
            app.use(path, express_1.default.static(fsPath));
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
            app.use(require(middleware.path)(middleware.settings || {}));
        }
        // loop on handlers
        Object.keys(settings.handlers).forEach((pageName) => __awaiter(this, void 0, void 0, function* () {
            const handlerSettings = deepMerge_1.default({
                log: true
            }, settings.handlers[pageName]);
            let handlerPath = handlerSettings.handler;
            if (handlerPath.slice(-3) !== '.js')
                handlerPath += '.js';
            if (!fs_1.default.existsSync(handlerPath)) {
                promise.emit('warn', {
                    value: `Frontend handler "<cyan>${path_1.default.relative(packageRoot_1.default(), handlerPath)}</cyan>" does not exists...`
                });
            }
            else {
                const handlerFn = require(handlerPath);
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
                setTimeout(() => {
                    promise.emit('log', {
                        value: `Handler <cyan>${pageName}</cyan> "<yellow>${method}:${slug}</yellow>" registered <green>successfully</green>`
                    });
                }, 1000);
                app[method](slug, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                    const reqPathExtension = extension_1.default(req.path);
                    if (extension) {
                        if (extension.indexOf(reqPathExtension) === -1 &&
                            extension.indexOf('.' + reqPathExtension) === -1) {
                            return next();
                        }
                    }
                    const handlerPromise = handlerFn(req, res, handlerSettings);
                    SPromise_1.default.pipe(handlerPromise, promise);
                }));
            }
        }));
        server = app
            .listen(settings.port, settings.hostname, () => {
            setTimeout(() => {
                promise.emit('log', {
                    type: 'heading',
                    clear: true,
                    value: trimLines_1.default(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:

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
    }))();
    promise.on('finally', () => {
        server.close();
    });
    return promise;
};
module.exports = fn;
//# sourceMappingURL=frontend.js.map