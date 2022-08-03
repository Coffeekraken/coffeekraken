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
            const { default: middlewareData } = yield import(middleware.path);
            app.use((middlewareData.default || middlewareData)(middleware.settings || {}));
        }
        // loop on handlers
        Object.keys(settings.handlers).forEach((pageName) => __awaiter(this, void 0, void 0, function* () {
            const handlerSettings = __deepMerge({
                log: true,
            }, settings.handlers[pageName]);
            let handlerPath = handlerSettings.handler;
            if (handlerPath.slice(-3) !== '.js')
                handlerPath += '.js';
            if (!__fs.existsSync(handlerPath)) {
                emit('warn', {
                    value: `Frontend handler "<cyan>${__path.relative(__packageRootDir(), handlerPath)}</cyan>" does not exists...`,
                });
            }
            else {
                let { default: handlerFn } = yield import(handlerPath);
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
                        value: `Handler <cyan>${pageName}</cyan> "<yellow>${method}:${slug}</yellow>" registered <green>successfully</green>`,
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
                    title: `frontendServer started`,
                });
                emit('log', {
                    type: 'time',
                });
                emit('log', {
                    type: 'heading',
                    mb: 1,
                    value: __trimLines(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:
              
                - Hostname        : <yellow>${settings.hostname}</yellow>
                - Port            : <yellow>${settings.port}</yellow>
                - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`),
                });
            }, 0);
        })
            .on('error', (e) => {
            const string = e.toString();
            emit('notification', {
                type: 'error',
                title: `frontendServer errpr`,
            });
            reject(string);
        });
        on('finally', () => {
            server.close();
        });
    }), {
        id: 'frontendServer',
    });
};
export default fn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLFdBQVcsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLGdCQUFnQixNQUFNLDJCQUEyQixDQUFDO0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sRUFBRSxHQUFHLFVBQVUsSUFBSSxHQUFHLEVBQUU7SUFDMUIsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEUsTUFBTSxHQUFHLEdBQUcsU0FBUyxFQUFFLENBQUM7SUFFeEIsSUFBSSxNQUFNLENBQUM7SUFFWCxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDMUMscUJBQXFCO1FBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUs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