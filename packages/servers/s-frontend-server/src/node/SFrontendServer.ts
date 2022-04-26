import __SLog from '@coffeekraken/s-log';
import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
import __SBench from '@coffeekraken/s-bench';
import __SDuration from '@coffeekraken/s-duration';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __SGlob from '@coffeekraken/s-glob';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    start(params: Partial<ISFrontendServerParams> | string): Promise<any> {
        const finalParams: ISFrontendServerParams = __SFrontendServerStartParamsInterface.apply(
            params,
        );

        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const express = __express();

                // enable compression if prod
                if (finalParams.prod || __SEnv.is('production')) {
                    express.use(__compression());
                }

                setTimeout(() => {
                    emit('info', {
                        value: 'COCO',
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

                const frontendServerConfig = __SSugarConfig.get(
                    'frontendServer',
                );

                express.use((req, res, next) => {
                    if (req.path.substr(-1) == '/' && req.path.length > 1) {
                        const query = req.url.slice(req.path.length);
                        res.redirect(301, req.path.slice(0, -1) + query);
                    } else {
                        next();
                    }
                });

                if (frontendServerConfig.modules) {
                    for (
                        let i = 0;
                        i < Object.keys(frontendServerConfig.modules).length;
                        i++
                    ) {
                        const moduleId = Object.keys(
                            frontendServerConfig.modules,
                        )[i];
                        const moduleObj =
                            frontendServerConfig.modules[moduleId];
                        let module;

                        try {
                            module = await import(moduleObj.path);
                        } catch (e) {
                            console.log(e);
                            throw new Error(
                                `<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`,
                            );
                        }
                        await pipe(
                            module.default(
                                express,
                                moduleObj.settings,
                                frontendServerConfig,
                            ),
                        );
                    }
                }

                if (frontendServerConfig.proxy) {
                    Object.keys(frontendServerConfig.proxy).forEach(
                        (proxyId) => {
                            const proxyObj =
                                frontendServerConfig.proxy[proxyId];
                            // @ts-ignore
                            express.use(
                                createProxyMiddleware(proxyObj.route, {
                                    logLevel: 'silent',
                                    ...(proxyObj.settings ?? {}),
                                }),
                            );
                        },
                    );
                }

                if (frontendServerConfig.staticDirs) {
                    Object.keys(frontendServerConfig.staticDirs).forEach(
                        (dir) => {
                            const fsPath = frontendServerConfig.staticDirs[dir];
                            emit('log', {
                                value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(
                                    process.cwd(),
                                    fsPath,
                                )}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                            });
                            express.use(
                                dir,
                                __express.static(fsPath, { dotfiles: 'allow' }),
                            );
                        },
                    );
                }

                if (frontendServerConfig.middlewares) {
                    for (
                        let i = 0;
                        i <
                        Object.keys(frontendServerConfig.middlewares).length;
                        i++
                    ) {
                        const middlewareName = Object.keys(
                            frontendServerConfig.middlewares,
                        )[i];
                        const middlewareObj =
                            frontendServerConfig.middlewares[middlewareName];

                        if (
                            !middlewareObj.path ||
                            __fs.existsSync(middlewareObj.path)
                        ) {
                            throw new Error(
                                `<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`,
                            );
                        }

                        const { default: middlewareWrapperFn } = await import(
                            middlewareObj.path
                        ); // eslint-disable-line
                        const middleware = middlewareWrapperFn(
                            middlewareObj.settings ?? {},
                        );

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
                                value: `<cyan>[request]</cyan> Request on "<cyan>${
                                    req.url
                                }</cyan>" served in <yellow>${
                                    duration.end().formatedDuration
                                }</yellow>`,
                            });
                        }

                        res.on('finish', afterResponse);

                        next();
                    });
                }

                // routes registration
                if (frontendServerConfig.routes) {
                    Object.keys(frontendServerConfig.routes).forEach(
                        async (routeSlug) => {
                            const routeObj =
                                frontendServerConfig.routes[routeSlug];

                            const handlerObj =
                                frontendServerConfig.handlers[routeObj.handler];
                            const handlerPath = handlerObj.path;
                            if (!handlerPath) {
                                return;
                            }

                            const handlerFn = await this._getHandlerFn(
                                routeObj.handler,
                            );
                            express.get(routeSlug, (req, res, next) => {
                                if (routeObj.request) {
                                    req = __deepMerge(req, routeObj.request);
                                }

                                return pipe(handlerFn(req, res, next));
                            });
                        },
                    );
                }

                // "pages" folder routes
                pipe(this._registerPagesRoutes(express));

                if (!(await __isPortFree(frontendServerConfig.port))) {
                    emit('log', {
                        value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`,
                    });
                    await __kill(`:${frontendServerConfig.port}`);
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
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }

    /**
     * Get the handler function for the given handler name or directly a path
     */
    async _getHandlerFn(handlerNameOrPath: string) {
        if (__fs.existsSync(handlerNameOrPath)) {
            return (await import(pageConfig.handler)).default;
        } else {
            const handlersInConfig = __SSugarConfig.get(
                'frontendServer.handlers',
            );
            if (!handlersInConfig[handlerNameOrPath]) {
                throw new Error(
                    `[SFrontendServer] Sorry but the handler named "<yellow>${handlerNameOrPath}</yellow>" seems to not exists or is missconfigured...`,
                );
            }
            return (await import(handlersInConfig[handlerNameOrPath].path))
                .default;
        }
    }

    /**
     * This method scrap the "pages" folder and register all the routes found inside.
     */
    async _registerPagesRoutes(express) {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const pagesFolder = __SSugarConfig.get('storage.src.pagesDir');

            const pagesFiles = __SGlob.resolve(`**/*.js`, {
                cwd: pagesFolder,
            });

            for (let [index, pageFile] of pagesFiles.entries()) {
                const { default: pageConfig } = await import(pageFile.path);

                let handlerFn;

                // generate path
                let path = `/${pageFile.relPath
                    .split('/')
                    .slice(0, -1)
                    .join('/')
                    .replace(/\.(t|j)s$/, '')
                    .replace(/\./g, '/')}`;

                if (pageConfig.params) {
                    let isOptional = false;
                    for (let [name, required] of Object.entries(
                        pageConfig.params,
                    )) {
                        if (required) {
                            if (isOptional) {
                                throw new Error(
                                    `[SFrontendServer] You cannot have required params after optional onces in the page ${pageFile.path}`,
                                );
                            }
                            path += `/:${name}`;
                        } else {
                            isOptional = true;
                            path += `/:${name}?`;
                        }
                    }
                }

                // handler

                console.log('PATH', path);

                handlerFn = await this._getHandlerFn(pageConfig.handler);

                express.get(path, (req, res, next) => {
                    console.log('request');
                    return pipe(handlerFn(req, res, next));
                });

                // console.log('pa', path);

                // // views
                // if (pageConfig.views) {
                //     for (let [idx, dotPath] of Object.entries(pageConfig.views)) {
                //         console.log('f', dotPath);
                //     }
                // }
            }
        });
    }
}
