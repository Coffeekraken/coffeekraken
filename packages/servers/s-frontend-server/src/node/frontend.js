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
import __packageRootDir from '../../path/packageRootDir';
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
                    value: `Frontend handler "<cyan>${__path.relative(__packageRootDir(), handlerPath)}</cyan>" does not exists...`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcm9udGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFDM0QsT0FBTyxXQUFXLE1BQU0sb0JBQW9CLENBQUM7QUFDN0MsT0FBTyxnQkFBZ0IsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLEVBQUUsR0FBRyxVQUFVLElBQUksR0FBRyxFQUFFO0lBQzVCLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sR0FBRyxHQUFHLFNBQVMsRUFBRSxDQUFDO0lBRXhCLElBQUksTUFBTSxDQUFDO0lBRVgsT0FBTyxJQUFJLFVBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQzVDLHFCQUFxQjtRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxF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