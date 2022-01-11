var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __compression from 'compression';
import __express from 'express';
import __fs from 'fs';
import __isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
import { createProxyMiddleware } from 'http-proxy-middleware';
import __SFrontendServerStartParamsInterface from './interface/SFrontendServerStartParamsInterface';
// import __vhost from 'vhost';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __SDuration from '@coffeekraken/s-duration';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
export default class SFrontendServer extends __SClass {
    /**
     * @name					constructor
     * @type 					Function
     * @constructor
     *
     * Constructor
     *
     * @since 					2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor() {
        super();
    }
    /**
     * @name        start
     * @type           Function
     * @async
     *
     * This function take as parameter an Partial<ISFrontendServerParams> object,
     * start a server using these parameters and returns an SPromise instance
     * through which you can subscribe for events, etc...
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params) {
        const finalParams = __SFrontendServerStartParamsInterface.apply(params);
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const express = __express();
            // enable compression if prod
            if (finalParams.prod || __SEnv.is('production')) {
                express.use(__compression());
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
            const frontendServerConfig = __SugarConfig.get('frontendServer');
            express.use((req, res, next) => {
                if (req.path.substr(-1) == '/' && req.path.length > 1) {
                    const query = req.url.slice(req.path.length);
                    res.redirect(301, req.path.slice(0, -1) + query);
                }
                else {
                    next();
                }
            });
            if (frontendServerConfig.modules) {
                for (let i = 0; i < Object.keys(frontendServerConfig.modules).length; i++) {
                    const moduleId = Object.keys(frontendServerConfig.modules)[i];
                    const moduleObj = frontendServerConfig.modules[moduleId];
                    let module;
                    try {
                        module = yield import(moduleObj.path);
                    }
                    catch (e) {
                        console.log(e);
                        throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`);
                    }
                    yield pipe(module.default(express, moduleObj.settings, frontendServerConfig));
                }
            }
            // if (frontendServerConfig.staticDirs) {
            //     Object.keys(frontendServerConfig.staticDirs).forEach(
            //         (dir) => {
            //             const fsPath = frontendServerConfig.staticDirs[dir];
            //             emit('log', {
            //                 value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(
            //                     process.cwd(),
            //                     fsPath,
            //                 )}</cyan>" behind "<yellow>${dir}</yellow>" url`,
            //             });
            //             express.use(dir, __express.static(fsPath));
            //         },
            //     );
            // }
            if (frontendServerConfig.proxy) {
                Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = frontendServerConfig.proxy[proxyId];
                    // @ts-ignore
                    express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (frontendServerConfig.middlewares) {
                for (let i = 0; i <
                    Object.keys(frontendServerConfig.middlewares).length; i++) {
                    const middlewareName = Object.keys(frontendServerConfig.middlewares)[i];
                    const middlewareObj = frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path ||
                        __fs.existsSync(middlewareObj.path)) {
                        throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
                    }
                    const { default: middlewareWrapperFn } = yield import(middlewareObj.path); // eslint-disable-line
                    const middleware = middlewareWrapperFn((_a = middlewareObj.settings) !== null && _a !== void 0 ? _a : {});
                    // register the middleware inside the sails configuration
                    // @ts-ignore
                    express.use((req, res, next) => {
                        return pipe(middleware(req, res, next));
                    });
                }
            }
            // logging requests
            if (logLevelInt >= 4) {
                express.use((req, res, next) => {
                    // emit('log', {
                    //     type: 'detail',
                    //     group: `s-frontend-server-${this.metas.id}`,
                    //     value: `Request on "<cyan>${req.url}</cyan>"`,
                    // });
                    const duration = new __SDuration();
                    function afterResponse() {
                        emit('log', {
                            value: `<cyan>[request]</cyan> Request on "<cyan>${req.url}</cyan>" served in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                    }
                    res.on('finish', afterResponse);
                    next();
                });
            }
            // routes registration
            if (frontendServerConfig.routes) {
                Object.keys(frontendServerConfig.routes).forEach((routeSlug) => __awaiter(this, void 0, void 0, function* () {
                    const routeObj = frontendServerConfig.routes[routeSlug];
                    const handlerPath = frontendServerConfig.handlers[routeObj.handler];
                    if (!handlerPath)
                        return;
                    const { default: handlerFn } = yield import(handlerPath);
                    express.get(routeSlug, (req, res, next) => {
                        if (routeObj.request) {
                            req = __deepMerge(req, routeObj.request);
                        }
                        return pipe(handlerFn(req, res, next));
                    });
                }));
            }
            if (!(yield __isPortFree(frontendServerConfig.port))) {
                emit('log', {
                    value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`,
                });
                yield __kill(`:${frontendServerConfig.port}`);
            }
            const server = express.listen(frontendServerConfig.port, () => {
                // server started successfully
                emit('log', {
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                });
                emit('log', {
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                });
                emit('log', {
                    type: __SLog.TYPE_VERBOSE,
                    // group: `s-frontend-server-${this.metas.id}`,
                    value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                });
                emit('log', {
                    type: __SLog.TYPE_VERBOSE,
                    // group: `s-frontend-server-${this.metas.id}`,
                    value: `Log level: <yellow>${finalParams.logLevel}</yellow>`,
                });
                // setTimeout(() => {
                //     emit('log', {
                //         type: 'summary',
                //         value: {
                //             status: 'success',
                //             value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                //             collapse: true,
                //         },
                //     });
                // }, 2000);
            });
            __onProcessExit(() => {
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
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsK0JBQStCO0FBQy9CLE9BQU8sTUFBTSxNQUFNLHVDQUF1QyxDQUFDO0FBRTNELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBOEI3RSxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsUUFBUTtJQUNqRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQWdEO1FBQ2xELE1BQU0sV0FBVyxHQUNiLHFDQUFxQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUs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