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
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '../../../shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SPromise from '@coffeekraken/s-promise';
import __express from 'express';
import __trimLines from '../../../shared/string/trimLines';
import __extension from '../../fs/extension';
import __packageRoot from '../../path/packageRoot';
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
    const settings = __deepMerge(__SugarConfig.get('frontend'), args);
    const app = __express();
    let server;
    return new __SPromise(({ resolve, reject, on, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
        // static directories
        Object.keys(settings.staticDirs).forEach((path) => {
            const fsPath = settings.staticDirs[path];
            console.log(path, fsPath);
            app.use(path, __express.static(fsPath));
        });
        // load the middlewares
        const middlewaresObj = settings.middlewares || {};
        for (const [key, middleware] of Object.entries(middlewaresObj)) {
            if (middleware.path.slice(-3) !== '.js')
                middleware.path += '.js';
            middleware.path = __path.resolve(middleware.path);
            if (!__fs.existsSync(middleware.path)) {
                return reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
            }
            // register the middleware
            const middlewareData = require(middleware.path);
            app.use((middlewareData.default || middlewareData)(middleware.settings || {}));
        }
        // loop on handlers
        Object.keys(settings.handlers).forEach((pageName) => __awaiter(this, void 0, void 0, function* () {
            const handlerSettings = __deepMerge({
                log: true
            }, settings.handlers[pageName]);
            let handlerPath = handlerSettings.handler;
            if (handlerPath.slice(-3) !== '.js')
                handlerPath += '.js';
            if (!__fs.existsSync(handlerPath)) {
                emit('warn', {
                    value: `Frontend handler "<cyan>${__path.relative(__packageRoot(), handlerPath)}</cyan>" does not exists...`
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
                    const reqPathExtension = __extension(req.path);
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
                    value: __trimLines(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:
              
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
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxFQUFFLEdBQUcsVUFBVSxJQUFJLEdBQUcsRUFBRTtJQUM1QixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxNQUFNLEdBQUcsR0FBRyxTQUFTLEVBQUUsQ0FBQztJQUV4QixJQUFJLE1BQU0sQ0FBQztJQUVYLE9BQU8sSUFBSSxVQUFVLENBQ25CLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtRQUM1QyxxQkFBcUI7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFB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