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
 * @status              wip
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
    return new SPromise_1.default(({ resolve, reject, on, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // static directories
        Object.keys(settings.staticDirs).forEach((path) => {
            const fsPath = settings.staticDirs[path];
            console.log(path, fsPath);
            app.use(path, express_1.default.static(fsPath));
        });
        // load the middlewares
        const middlewaresObj = settings.middlewares || {};
        for (const [key, middleware] of Object.entries(middlewaresObj)) {
            if (middleware.path.slice(-3) !== '.js')
                middleware.path += '.js';
            middleware.path = path_1.default.resolve(middleware.path);
            if (!fs_1.default.existsSync(middleware.path)) {
                return reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
            }
            // register the middleware
            const middlewareData = require(middleware.path);
            app.use((middlewareData.default || middlewareData)(middleware.settings || {}));
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
                emit('warn', {
                    value: `Frontend handler "<cyan>${path_1.default.relative(packageRoot_1.default(), handlerPath)}</cyan>" does not exists...`
                });
            }
            else {
                let handlerFn = require(handlerPath);
                handlerFn = handlerFn.default || handlerFn;
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
                    emit('log', {
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
                    pipe(handlerPromise);
                }));
            }
        }));
        server = app
            .listen(settings.port, settings.hostname, () => {
            setTimeout(() => {
                emit('notification', {
                    type: 'success',
                    title: `frontendServer started`
                });
                emit('log', {
                    type: 'time'
                });
                emit('log', {
                    type: 'heading',
                    mb: 1,
                    value: trimLines_1.default(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:
              
                - Hostname        : <yellow>${settings.hostname}</yellow>
                - Port            : <yellow>${settings.port}</yellow>
                - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
                });
            }, 0);
        })
            .on('error', (e) => {
            const string = e.toString();
            emit('notification', {
                type: 'error',
                title: `frontendServer errpr`
            });
            reject(string);
        });
        on('finally', () => {
            server.close();
        });
    }), {
        id: 'frontendServer'
    });
};
exports.default = fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7QUFHZCwrREFBK0M7QUFDL0MsdUVBQWlEO0FBQ2pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0VBQWdEO0FBQ2hELHNEQUFnQztBQUNoQyx1RUFBaUQ7QUFJakQsbUVBQTZDO0FBQzdDLHlFQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLEVBQUUsR0FBRyxVQUFVLElBQUksR0FBRyxFQUFFO0lBQzVCLE1BQU0sUUFBUSxHQUFHLG1CQUFXLENBQUMsZUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELE1BQU0sR0FBRyxHQUFHLGlCQUFTLEVBQUUsQ0FBQztJQUV4QixJQUFJLE1BQU0sQ0FBQztJQUVYLE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDNUMscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsaUJBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUNILHVCQUF1QjtRQUN2QixNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FB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