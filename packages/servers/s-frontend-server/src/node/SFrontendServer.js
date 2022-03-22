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
import __path from 'path';
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            setTimeout(() => {
                emit('info', {
                    value: 'COCO'
                });
            }, 3000);
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
            if (frontendServerConfig.proxy) {
                Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = frontendServerConfig.proxy[proxyId];
                    // @ts-ignore
                    express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (frontendServerConfig.staticDirs) {
                Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
                    const fsPath = frontendServerConfig.staticDirs[dir];
                    emit('log', {
                        value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                    });
                    express.use(dir, __express.static(fsPath));
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
                    const handlerObj = frontendServerConfig.handlers[routeObj.handler];
                    const handlerPath = handlerObj.path;
                    if (!handlerPath) {
                        return;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3BHLCtCQUErQjtBQUMvQixPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQUUzRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGVBQWUsTUFBTSxnREFBZ0QsQ0FBQztBQThCN0UsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFFBQVE7SUFDakQ7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUFnRDtRQUNsRCxNQUFNLFdBQVcsR0FDYixxQ0FBcUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFF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