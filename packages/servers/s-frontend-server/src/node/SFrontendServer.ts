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
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SFrontendServerStartParamsInterface from './interface/SFrontendServerStartParamsInterface';
import __SFrontendServerAddDefaultPagesParamsInterface from './interface/SFrontendServerAddDefaultPagesParamsInterface';
import __SFrontendServerCorsProxyParamsInterface from './interface/SFrontendServerCorsProxyParamsInterface';
// import __vhost from 'vhost';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __SBench from '@coffeekraken/s-bench';
import __SDuration from '@coffeekraken/s-duration';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __SGlob from '@coffeekraken/s-glob';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __recursiveCopy from 'recursive-copy';
import __runMiddleware from 'run-middleware';

import __viewRendererMiddleware from './middleware/viewRendererMiddleware';

import __request from 'request';
import __bodyParser from 'body-parser';

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
export interface ISFrontendServerStartParams {
    port: number;
    hostname: string;
    listen: boolean;
    rootDir: string;
    viewsDir: string;
    pagesDir: string;
    logLevel: string;
    prod: boolean;
}

export interface ISFrontendServerAddDefaultPagesParams {
    yes: boolean;
    pagesDir: string;
    viewsDir: string;
}

export interface ISFrontendServerCorsProxyParams {
    port: number;
    targetUrlHeaderName: string;
    limit: string;
}

export interface ISFrontendServerPageViewConfig {
    data?: string;
    path?: string;
}

export interface ISFrontendServerPageConfig {
    slugs?: string[];
    views?: ISFrontendServerPageViewConfig[];
    params?: any;
    handler?: string;
}

export default class SFrontendServer extends __SClass {
    /**
     * @name            _express
     * @type            Object
     * @private
     *
     * Store the express server instance
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    private _express;

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

        // instanciate a new express server
        this._express = __express();

        __runMiddleware(this._express);

        // const originalRunMiddleware = this._express.runMiddleware;
        // this._express.runMiddleware = (...args) => {
        //     try {
        //         console.log('eororor', args);
        //         originalRunMiddleware(...args);
        //     } catch (e) {
        //         console.log('EEEEE');
        //     }
        // };
    }

    /**
     * @name        start
     * @type           Function
     * @async
     *
     * This function take as parameter an Partial<ISFrontendServerStartParams> object,
     * start a server using these parameters and returns an SPromise instance
     * through which you can subscribe for events, etc...
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: Partial<ISFrontendServerStartParams> | string): Promise<any> {
        const finalParams: ISFrontendServerStartParams = __SFrontendServerStartParamsInterface.apply(
            params,
        );

        return new __SPromise(
            async ({ resolve, reject, emit, pipe, on }) => {
                // enable compression if prod
                if (finalParams.prod || __SEnv.is('production')) {
                    this._express.use(__compression());
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

                this._express.use((req, res, next) => {
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
                                this._express,
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
                            this._express.use(
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
                            this._express.use(
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

                        // register the middleware inside the express configuration
                        // @ts-ignore
                        this._express.use((req, res, next) => {
                            return pipe(middleware(req, res, next));
                        });
                    }
                }

                // viewRendererMiddleware
                this._express.use((req, res, next) => {
                    return pipe(__viewRendererMiddleware()(req, res, next));
                });

                // logging requests
                if (logLevelInt >= 4) {
                    this._express.use((req, res, next) => {
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

                // routes pages from config
                if (frontendServerConfig.pages) {
                    for (let [id, pageConfig] of Object.entries(
                        frontendServerConfig.pages,
                    )) {
                        await pipe(
                            this._registerPageConfig(
                                <ISFrontendServerPageConfig>pageConfig,
                                null,
                                id,
                            ),
                        );
                    }
                }

                // "pages" folder routes
                pipe(this._registerPagesRoutes());

                if (!(await __isPortFree(frontendServerConfig.port))) {
                    emit('log', {
                        value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`,
                    });
                    await __kill(`:${frontendServerConfig.port}`);
                }

                if (!finalParams.listen) {
                    // server started successfully
                    emit('log', {
                        group: `s-frontend-server-${this.metas.id}`,
                        value: `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                    });
                    // when no listen, we just resolve the promise to say that the server has started
                    resolve();
                } else {
                    const server = this._express.listen(
                        frontendServerConfig.port,
                        async () => {
                            await __wait(100);
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
                        },
                    );

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
                }
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }

    request(url: string) {
        return new __SPromise(({ resolve, reject }) => {
            this._express.runMiddleware(url, (code, body, headers) => {
                resolve({
                    data: body,
                });
            });
        });
    }

    corsProxy(
        params: Partial<ISFrontendServerCorsProxyParams> | string,
    ): Promise<any> {
        const finalParams: ISFrontendServerCorsProxyParams = __SFrontendServerCorsProxyParamsInterface.apply(
            params,
        );

        return new __SPromise(
            ({ resolve, reject, emit, pipe }) => {
                const app = __express();

                var myLimit = __SSugarConfig.get(
                    'frontendServer.corsProxy.limit',
                );

                app.use(__bodyParser.json({ limit: myLimit }));

                app.all('*', function (req, res, next) {
                    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
                    res.header('Access-Control-Allow-Origin', '*');
                    res.header(
                        'Access-Control-Allow-Methods',
                        'GET, PUT, PATCH, POST, DELETE',
                    );
                    res.header(
                        'Access-Control-Allow-Headers',
                        req.header('access-control-request-headers'),
                    );

                    if (req.method === 'OPTIONS') {
                        // CORS Preflight
                        res.send();
                    } else {
                        var targetURL = req.header(
                            finalParams.targetUrlHeaderName,
                        );
                        if (!targetURL) {
                            res.send(500, {
                                error: `There is no "${finalParams.targetUrlHeaderName}" header in the request`,
                            });
                            return;
                        }
                        __request(
                            {
                                url: targetURL + req.url,
                                method: req.method,
                                json: req.body,
                                headers: {
                                    Authorization: req.header('Authorization'),
                                },
                            },
                            function (error, response, body) {
                                if (error) {
                                    emit('log', {
                                        type: __SLog.TYPE_ERROR,
                                        value: error,
                                    });
                                }
                            },
                        ).pipe(res);
                    }
                });

                app.set('port', finalParams.port);

                app.listen(app.get('port'), function () {
                    emit('log', {
                        value: `<yellow>[corsProxy]</yellow> Cors proxy server running on port <cyan>${app.get(
                            'port',
                        )}</cyan>...`,
                    });
                    emit('log', {
                        value: `<yellow>[corsProxy]</yellow> Call "<cyan>http://${__SSugarConfig.get(
                            'frontendServer.hostname',
                        )}:${finalParams.port}</cyan>" with the "<magenta>${
                            finalParams.targetUrlHeaderName
                        }</magenta>" header to use it...`,
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
     * @name        addDefaultPages
     * @type           Function
     * @async
     *
     * This method will add some default pages to your project with the pages configuration in the "src/pages" folder.
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    addDefaultPages(
        params: Partial<ISFrontendServerStartParams> | string,
    ): Promise<any> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const finalParams: ISFrontendServerAddDefaultPagesParams = __SFrontendServerAddDefaultPagesParamsInterface.apply(
                    params,
                );

                // adding default pages/views
                emit('log', {
                    value: `<yellow>[add]</yellow> Adding default pages to your project...`,
                });

                if (!finalParams.yes) {
                    if (
                        !(await emit('ask', {
                            type: 'confirm',
                            message:
                                'This process will override your current pages/views if some already exists and match with the default pages/views that will be added. Are you ok with that?',
                            default: true,
                        }))
                    ) {
                        return resolve();
                    }
                }

                // source views folder path
                const sourceViewsFolderPath = __path.resolve(
                    __path.resolve(__packageRoot(__dirname())),
                    'src/views',
                );
                // source pages folder path
                const sourcePagesFolderPath = __path.resolve(
                    __path.resolve(__packageRoot(__dirname())),
                    'src/pages',
                );

                const pagesResult = await __recursiveCopy(
                    sourcePagesFolderPath,
                    finalParams.pagesDir,
                    {
                        overwrite: true,
                    },
                );
                const viewsResult = await __recursiveCopy(
                    sourceViewsFolderPath,
                    finalParams.viewsDir,
                    {
                        overwrite: true,
                    },
                );

                // adding default pages/views
                emit('log', {
                    value: `<green>[add]</green> Default pages added <green>successfully</green>`,
                });

                resolve();
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
            // @ts-ignore
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
            // @ts-ignore
            return (await import(handlersInConfig[handlerNameOrPath].path))
                .default;
        }
    }

    /**
     * This method scrap the "pages" folder and register all the routes found inside.
     */
    _registerPagesRoutes() {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const pagesFolder = __SSugarConfig.get('storage.src.pagesDir');

            const pagesFiles = __SGlob
                .resolve(`**/*.js`, {
                    cwd: pagesFolder,
                })
                .filter((file) => {
                    if (file.name.split('.').length > 2) return false;
                    return true;
                });

            let _404PageFile;

            for (let [index, pageFile] of pagesFiles.entries()) {
                // handle 404 at the end
                if (pageFile.nameWithoutExt === '404') {
                    _404PageFile = pageFile;
                    continue;
                }
                // @ts-ignore
                const { default: pageConfig } = await import(pageFile.path);
                await pipe(this._registerPageConfig(pageConfig, pageFile));
            }

            if (_404PageFile) {
                // @ts-ignore
                const { default: pageConfig } = await import(_404PageFile.path);
                await pipe(this._registerPageConfig(pageConfig, _404PageFile));
            }

            resolve();
        });
    }

    /**
     * This method register the passed pageConfig config object that can be specified
     * either in the "pages" folder or in the "frontendServer.pages" configuration.
     */
    _registerPageConfig(
        pageConfig: ISFrontendServerPageConfig,
        pageFile?: any,
        configId?: string,
    ): Promise<void> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                let handlerFn,
                    slug = '',
                    slugs: string[] = pageConfig.slugs ?? [];

                const frontendServerConfig = __SSugarConfig.get(
                    'frontendServer',
                );

                // generate path
                if (pageFile && !pageConfig.slugs) {
                    slug = `/${pageFile.relPath
                        .split('/')
                        .slice(0, -1)
                        .join('/')
                        .replace(/\.(t|j)s$/, '')
                        .replace(/\./g, '/')}`;
                }

                if (!pageConfig.slugs) {
                    if (pageConfig.params) {
                        let isOptional = false;
                        for (let [name, requiredOrStr] of Object.entries(
                            pageConfig.params,
                        )) {
                            if (typeof requiredOrStr === 'string') {
                                slug += `/${requiredOrStr}`;
                            } else if (requiredOrStr) {
                                if (isOptional) {
                                    throw new Error(
                                        `[SFrontendServer] You cannot have required params after optional onces in the page ${pageFile.path}`,
                                    );
                                }
                                slug += `/:${name}`;
                            } else {
                                isOptional = true;
                                slug += `/:${name}?`;
                            }
                        }
                    }
                    slugs = [slug];
                }

                // handler
                handlerFn = await this._getHandlerFn(
                    pageConfig.handler ?? 'generic',
                );

                slugs.forEach((slug) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${
                            pageFile
                                ? `<magenta>${pageFile.relPath}</magenta>`
                                : `<magenta>config.pages.${configId}</magenta>`
                        }`,
                    });

                    this._express.get(slug, (req, res, next) => {
                        if (pageConfig.params) {
                            for (let [key, value] of Object.entries(
                                req.params,
                            )) {
                                // do not process non "number" keys
                                if (typeof __autoCast(key) !== 'number')
                                    continue;
                                const paramKey = Object.keys(pageConfig.params)[
                                    parseInt(key)
                                ];
                                delete req.params[key];
                                req.params[paramKey] = value;
                            }
                        }

                        const handlerPro = handlerFn({
                            req,
                            res,
                            next,
                            pageConfig,
                            pageFile,
                            frontendServerConfig,
                        });
                        pipe(handlerPro);
                    });
                });

                resolve();
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
