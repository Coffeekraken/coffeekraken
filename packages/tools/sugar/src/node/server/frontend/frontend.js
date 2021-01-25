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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7OztBQUdkLCtEQUErQztBQUMvQyx1RUFBaUQ7QUFDakQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixzRUFBZ0Q7QUFDaEQsc0RBQWdDO0FBQ2hDLHVFQUFpRDtBQUlqRCxtRUFBNkM7QUFDN0MseUVBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sRUFBRSxHQUFHLFVBQVUsSUFBSSxHQUFHLEVBQUU7SUFDNUIsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxlQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsTUFBTSxHQUFHLEdBQUcsaUJBQVMsRUFBRSxDQUFDO0lBRXhCLElBQUksTUFBTSxDQUFDO0lBRVgsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVSxDQUFDO1FBQzdCLEVBQUUsRUFBRSxnQkFBZ0I7S0FDckIsQ0FBQyxDQUFDO0lBRUgsQ0FBQyxHQUFTLEVBQUU7UUFDVixxQkFBcUI7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO1FBQ2xELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENB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