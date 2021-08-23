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

/**
 * @name            SFrontendServer
 * @namespace       s-frontend-server
 * @type            Class
 * @extends         SEventEmitter
 *
 * This class represent a frontend server that handle features like documentation, views rendering,
 * frontspec reading middleware, packageJson middleware and more...
 *
 * @param       {ISFrontendCtorSettings}        [settings={}]           Some settings to configure your frontend server
 *
 * @example         js
 * import SFrontendServer from '@coffeekraken/s-frontend-server';
 * const server = new SFrontendServer();
 * server.run();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISFrontendServerParams {
    port: number;
    hostname: string;
    rootDir: string;
    viewsDir: string;
    logLevel: string;
    prod: boolean;
}

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
    start(params: Partial<ISFrontendServerParams>): Promise<any> {
        const finalParams: ISFrontendServerParams = __SFrontendServerInterface.apply(params);

        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const express = __express();

                // enable compression if prod
                if (params.prod || __SEnv.is('production')) {
                    express.use(__compression());
                }

                const logLevelInt = ['silent', 'error', 'warn', 'debug', 'info', 'verbose', 'silly'].indexOf(
                    finalParams.logLevel,
                );

                const frontendServerConfig = __SugarConfig.get('frontendServer');

                if (frontendServerConfig.modules) {
                    for (let i = 0; i < Object.keys(frontendServerConfig.modules).length; i++) {
                        const moduleId = Object.keys(frontendServerConfig.modules)[i];
                        const modulePath = __path.resolve(frontendServerConfig.modules[moduleId]);
                        let module;
                        try {
                            module = await import(modulePath);
                        } catch (e) {
                            console.log(e);
                            throw new Error(
                                `<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${modulePath}</cyan>"`,
                            );
                        }
                        await module.default(express, frontendServerConfig);
                    }
                }

                if (frontendServerConfig.staticDirs) {
                    Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
                        const fsPath = frontendServerConfig.staticDirs[dir];
                        emit('log', {
                            value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(
                                process.cwd(),
                                fsPath,
                            )}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                        });
                        express.use(dir, __express.static(fsPath));
                    });
                }

                if (frontendServerConfig.proxy) {
                    Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
                        const proxyObj = frontendServerConfig.proxy[proxyId];
                        // @ts-ignore
                        express.use(
                            createProxyMiddleware(proxyObj.route, {
                                logLevel: 'silent',
                                ...(proxyObj.settings ?? {}),
                            }),
                        );
                    });
                }

                if (frontendServerConfig.middlewares) {
                    for (let i = 0; i < Object.keys(frontendServerConfig.middlewares).length; i++) {
                        const middlewareName = Object.keys(frontendServerConfig.middlewares)[i];
                        const middlewareObj = frontendServerConfig.middlewares[middlewareName];

                        if (!middlewareObj.path || __fs.existsSync(middlewareObj.path)) {
                            throw new Error(
                                `<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`,
                            );
                        }

                        const { default: middlewareWrapperFn } = await import(middlewareObj.path); // eslint-disable-line
                        const middleware = middlewareWrapperFn(middlewareObj.settings ?? {});

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
                    Object.keys(frontendServerConfig.routes).forEach(async (routeSlug) => {
                        const routeObj = frontendServerConfig.routes[routeSlug];

                        const handlerObj = frontendServerConfig.handlers[routeObj.handler];

                        const { default: handlerFn } = await import(handlerObj.handler);
                        express.get(routeSlug, (req, res, next) => {
                            if (routeObj.request) {
                                req = __deepMerge(req, routeObj.request);
                            }

                            return pipe(handlerFn(req, res, next));
                        });
                    });
                }

                if (!(await __isPortFree(frontendServerConfig.port))) {
                    emit('log', {
                        value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`,
                    });
                    await __kill(`:${frontendServerConfig.port}`);
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
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
