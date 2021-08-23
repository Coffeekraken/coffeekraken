var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
// import __vhost from 'vhost';
import __kill from '@coffeekraken/sugar/node/process/kill';
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
        const finalParams = __SFrontendServerInterface.apply(params);
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const express = __express();
            // enable compression if prod
            if (finalParams.prod || __SEnv.is('production')) {
                express.use(__compression());
            }
            const logLevelInt = ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'].indexOf(finalParams.logLevel);
            const frontendServerConfig = __SugarConfig.get('frontendServer');
            if (frontendServerConfig.modules) {
                for (let i = 0; i < Object.keys(frontendServerConfig.modules).length; i++) {
                    const moduleId = Object.keys(frontendServerConfig.modules)[i];
                    const modulePath = __path.resolve(frontendServerConfig.modules[moduleId]);
                    let module;
                    try {
                        module = yield import(modulePath);
                    }
                    catch (e) {
                        console.log(e);
                        throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${modulePath}</cyan>"`);
                    }
                    yield module.default(express, frontendServerConfig);
                }
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
            if (frontendServerConfig.proxy) {
                Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = frontendServerConfig.proxy[proxyId];
                    // @ts-ignore
                    express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
                });
            }
            if (frontendServerConfig.middlewares) {
                for (let i = 0; i < Object.keys(frontendServerConfig.middlewares).length; i++) {
                    const middlewareName = Object.keys(frontendServerConfig.middlewares)[i];
                    const middlewareObj = frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path || __fs.existsSync(middlewareObj.path)) {
                        throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
                    }
                    const { default: middlewareWrapperFn } = yield import(middlewareObj.path); // eslint-disable-line
                    const middleware = middlewareWrapperFn((_a = middlewareObj.settings) !== null && _a !== void 0 ? _a : {});
                    // register the middleware inside the sails configuration
                    // @ts-ignore
                    express.use((req, res, next) => {
                        return pipe(middleware(res, res, next));
                    });
                }
            }
            // logging requests
            if (logLevelInt >= 4) {
                express.use((req, res, next) => {
                    emit('log', {
                        type: 'detail',
                        group: `s-frontend-server-${this.metas.id}`,
                        value: `Request on "<cyan>${req.url}</cyan>"`,
                    });
                    next();
                });
            }
            // routes registration
            if (frontendServerConfig.routes) {
                Object.keys(frontendServerConfig.routes).forEach((routeSlug) => __awaiter(this, void 0, void 0, function* () {
                    const routeObj = frontendServerConfig.routes[routeSlug];
                    const handlerObj = frontendServerConfig.handlers[routeObj.handler];
                    const { default: handlerFn } = yield import(handlerObj.handler);
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
            express.listen(frontendServerConfig.port, () => {
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
                    type: 'detail',
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                });
                emit('log', {
                    type: 'detail',
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `Log level: <yellow>${finalParams.logLevel}</yellow>`,
                });
            });
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sYUFBYSxNQUFNLGFBQWEsQ0FBQztBQUN4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLG1EQUFtRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDBCQUEwQixNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLCtCQUErQjtBQUMvQixPQUFPLE1BQU0sTUFBTSx1Q0FBdUMsQ0FBQztBQThCM0QsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFFBQVE7SUFDakQ7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDSSxLQUFLLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUFnRDtRQUNsRCxNQUFNLFdBQVcsR0FBMkIsMEJBQTBCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJGLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxNQUFNLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUU1Qiw2QkFB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