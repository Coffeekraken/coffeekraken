import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __isPortFree } from '@coffeekraken/sugar/network';
import { __uniqid } from '@coffeekraken/sugar/string';
import __compression from 'compression';
import __express from 'express';
import __fs from 'fs';
import { createProxyMiddleware } from 'http-proxy-middleware';
import __path from 'path';
import __SFrontendServerCorsProxyParamsInterface from './interface/SFrontendServerCorsProxyParamsInterface';
import __SFrontendServerStartParamsInterface from './interface/SFrontendServerStartParamsInterface';
// import __vhost from 'vhost';
import __SDuration from '@coffeekraken/s-duration';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __pool } from '@coffeekraken/sugar/fs';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __fileUpload from 'express-fileupload';
import __runMiddleware from 'run-middleware';

import __viewRendererMiddleware from './middleware/viewRendererMiddleware';

import __bodyParser from 'body-parser';
import __request from 'request';

/**
 * @name            SFrontendServer
 * @namespace       node
 * @type            Class
 * @extends         SEventEmitter
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent a frontend server that handle features like documentation, views rendering,
 * frontspec reading middleware, packageJson middleware and more...
 *
 * @param       {ISFrontendSettings}        [settings={}]           Some settings to configure your frontend server
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
    target: 'development' | 'production';
}

export interface ISFrontendServerModuleApi {
    express: __express;
    settings: any;
    config: any;
    startParams: ISFrontendServerStartParams;
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

export interface ISFrontendServerMetas {
    hostname: string;
    port: number;
    sessionId: string;
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
     * @name                    serverMetas
     * @type                    ISFrontendServerMetas
     *
     * Store some information about the current server like the host, port, etc...
     *
     * @since               2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    serverMetas: ISFrontendServerMetas;

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
    }

    _config: any = {};

    /**
     * @name        start
     * @type           Function
     * @async
     *
     * This function take as parameter an Partial<ISFrontendServerStartParams> object,
     * start a server using these parameters and returns an SPromise instance
     * through which you can subscribe for events, etc...
     *
     * @return      Promise<Function>           A promise that will be resolved when the server has started with a function to stop it
     *
     * @since       2.0.0
     * @author					Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(
        params: Partial<ISFrontendServerStartParams> | string,
    ): Promise<any | Function> {
        const finalParams: ISFrontendServerStartParams =
            __SFrontendServerStartParamsInterface.apply(params);

        return new Promise(async (resolve, reject) => {
            this._express.use(__compression());

            // save metas
            this.serverMetas = {
                hostname: finalParams.hostname,
                port: finalParams.port,
                sessionId:
                    finalParams.target === 'production' ||
                    __SEnv.is('production')
                        ? `${(Math.random() + 1).toString(36).substring(2)}`
                        : '',
            };

            this._express.use(__bodyParser.json({ limit: '120mb' }));
            this._express.use(__fileUpload());

            this._express.use((req, res, next) => {
                if (!res.templateData) res.templateData = {};
                if (!res.templateData.shared) res.templateData.shared = {};
                res.templateData.shared.server = this.serverMetas;
                next();
            });

            const logLevelInt = [
                'silent',
                'error',
                'warn',
                'debug',
                'info',
                'verbose',
                'silly',
            ].indexOf(finalParams.logLevel);

            this._frontendServerConfig = __SSugarConfig.get('frontendServer');

            this._express.use((req, res, next) => {
                if (req.path.substr(-1) == '/' && req.path.length > 1) {
                    const query = req.url.slice(req.path.length);
                    res.redirect(301, req.path.slice(0, -1) + query);
                } else {
                    next();
                }
            });

            // viewRendererMiddleware
            this._express.use((req, res, next) => {
                __viewRendererMiddleware()(req, res, next);
            });

            if (this._frontendServerConfig.modules) {
                for (
                    let i = 0;
                    i < Object.keys(this._frontendServerConfig.modules).length;
                    i++
                ) {
                    const moduleId = Object.keys(
                        this._frontendServerConfig.modules,
                    )[i];
                    const moduleObj =
                        this._frontendServerConfig.modules[moduleId];
                    let module;

                    try {
                        module = await import(moduleObj.path);
                    } catch (e) {
                        console.log(e);
                        throw new Error(
                            `<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`,
                        );
                    }
                    await module.default(<ISFrontendServerModuleApi>{
                        express: this._express,
                        settings: moduleObj.settings,
                        config: this._frontendServerConfig,
                        startParams: finalParams,
                    });
                }
            }

            if (this._frontendServerConfig.proxy) {
                Object.keys(this._frontendServerConfig.proxy).forEach(
                    (proxyId) => {
                        const proxyObj =
                            this._frontendServerConfig.proxy[proxyId];
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

            if (this._frontendServerConfig.staticDirs) {
                Object.keys(this._frontendServerConfig.staticDirs).forEach(
                    (dir) => {
                        const fsPath =
                            this._frontendServerConfig.staticDirs[dir];
                        console.verbose?.(
                            `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(
                                process.cwd(),
                                fsPath,
                            )}</cyan>" behind "<yellow>${dir}</yellow>" url`,
                        );
                        this._express.use(
                            dir,
                            __express.static(fsPath, { dotfiles: 'allow' }),
                        );
                    },
                );
            }

            if (this._frontendServerConfig.middlewares) {
                for (
                    let i = 0;
                    i <
                    Object.keys(this._frontendServerConfig.middlewares).length;
                    i++
                ) {
                    const middlewareName = Object.keys(
                        this._frontendServerConfig.middlewares,
                    )[i];
                    const middlewareObj =
                        this._frontendServerConfig.middlewares[middlewareName];

                    if (
                        !middlewareObj.path ||
                        __fs.existsSync(middlewareObj.path)
                    ) {
                        throw new Error(
                            `<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`,
                        );
                    }

                    // @ts-ignore
                    const { default: middlewareWrapperFn } = await import(
                        middlewareObj.path
                    ); // eslint-disable-line
                    const middleware = middlewareWrapperFn(
                        middlewareObj.settings ?? {},
                    );

                    // register the middleware inside the express configuration
                    // @ts-ignore
                    this._express.use((req, res, next) => {
                        middleware(req, res, next);
                    });
                }
            }

            // logging requests
            if (logLevelInt >= 4) {
                this._express.use((req, res, next) => {
                    const duration = new __SDuration();

                    function afterResponse() {
                        console.verbose?.(
                            `<cyan>[request]</cyan> Request on "<cyan>${
                                req.url
                            }</cyan>" served in <yellow>${
                                duration.end().formatedDuration
                            }</yellow>`,
                        );
                    }

                    res.on('finish', afterResponse);

                    next();
                });
            }

            // routes pages from config
            if (this._frontendServerConfig.pages) {
                for (let [id, pageConfig] of Object.entries(
                    this._frontendServerConfig.pages,
                )) {
                    await this._registerPageConfig(
                        <ISFrontendServerPageConfig>pageConfig,
                        null,
                        id,
                    );
                }
            }

            // "pages" folder routes
            await this._registerPagesRoutes();

            if (!(await __isPortFree(this._frontendServerConfig.port))) {
                console.log(
                    `Port <yellow>${this._frontendServerConfig.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                );
                return reject();
            }

            if (!finalParams.listen) {
                // server started successfully
                console.log(
                    `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                );
                // when no listen, we just resolve the promise to say that the server has started
                reject();
            } else {
                const server = this._express.listen(
                    this._frontendServerConfig.port,
                    async () => {
                        await __wait(100);

                        // 404
                        this._express.get('*', function (req, res) {
                            res.status(404).send(
                                `╰◝◟≖◞౪◟≖◞◜╯ Lost in the darkness your "${req.url}" certainly is...`,
                            );
                        });

                        // server started successfully
                        console.log(
                            `<yellow>Frontend server</yellow> started <green>successfully</green>`,
                        );
                        console.log(
                            `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`,
                        );
                        console.verbose?.(
                            `Root directory: <cyan>${finalParams.rootDir}</cyan>`,
                        );
                        console.verbose?.(
                            `Log level: <yellow>${finalParams.logLevel}</yellow>`,
                        );

                        resolve(() => {
                            return new Promise((_resolve) => {
                                server.close(() => {
                                    _resolve(null);
                                });
                            });
                        });
                    },
                );

                __onProcessExit(() => {
                    console.log(
                        `<red>[kill]</red> Gracefully killing the <cyan>frontend server</cyan>...`,
                    );
                    return new Promise((_resolve) => {
                        server.close(() => {
                            // @ts-ignore
                            _resolve();
                        });
                    });
                });
            }
        });
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
        const finalParams: ISFrontendServerCorsProxyParams =
            __SFrontendServerCorsProxyParamsInterface.apply(params);

        return new Promise((resolve) => {
            const app = __express();

            var myLimit = __SSugarConfig.get('frontendServer.corsProxy.limit');

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

                res.header('Cross-Origin-Embedder-Policy', 'credentialless');
                res.header('Cross-Origin-Opener-Policy', 'same-origin');

                if (req.method === 'OPTIONS') {
                    // CORS Preflight
                    res.send();
                } else {
                    var targetURL = req.header(finalParams.targetUrlHeaderName);
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
                                console.error(error);
                            }
                        },
                    ).pipe(res);
                }
            });

            app.set('port', finalParams.port);

            app.listen(app.get('port'), function () {
                console.verbose?.(
                    `<yellow>[corsProxy]</yellow> Cors proxy server running on port <cyan>${app.get(
                        'port',
                    )}</cyan>...`,
                );
                console.verbose?.(
                    `<yellow>[corsProxy]</yellow> Call "<cyan>http://${__SSugarConfig.get(
                        'frontendServer.hostname',
                    )}:${finalParams.port}</cyan>" with the "<magenta>${
                        finalParams.targetUrlHeaderName
                    }</magenta>" header to use it...`,
                );
            });
        });
    }

    /**
     * Get the handler function for the given handler name or directly a path
     */
    async _getHandlerFn(handlerNameOrPath: string) {
        if (typeof handlerNameOrPath === 'function') {
            return handlerNameOrPath;
        }
        if (__fs.existsSync(handlerNameOrPath)) {
            // @ts-ignore
            return (await import(pageConfig.handler)).default;
        }

        const handlersInConfig = this._frontendServerConfig.handlers;
        if (!handlersInConfig[handlerNameOrPath]) {
            throw new Error(
                `[SFrontendServer] Sorry but the handler named "<yellow>${handlerNameOrPath}</yellow>" seems to not exists or is missconfigured...`,
            );
        }
        // @ts-ignore
        return (await import(handlersInConfig[handlerNameOrPath].path)).default;
    }

    /**
     * This method scrap the "pages" folder and register all the routes found inside.
     */
    _registerPagesRoutes(): Promise<void> {
        return new Promise(async (resolve) => {
            const pagesFolder = __SSugarConfig.get('storage.src.pagesDir');

            const pagesFilesPaths: string[] = [];
            let _404PageFile;

            const pool = __pool(`${pagesFolder}/**/*.{ts,js}`, {
                cwd: pagesFolder,
                watch: true,
            });
            pool.on('unlink', (file) => {
                if (!pagesFilesPaths.includes(file.path)) {
                    return;
                }
                pagesFilesPaths.splice(pagesFilesPaths.indexOf(file.path), 1);
            });
            pool.on('add,change', async (file) => {
                // protect bad files names
                if (file.name.split('.').length > 2) return false;

                // remove js files if the .ts equivalent exists
                if (
                    file.extension === 'js' &&
                    pagesFilesPaths.includes(
                        `${file.path.replace(/\.js$/, '.ts')}`,
                    )
                ) {
                    return;
                }

                // add the file in the stack
                pagesFilesPaths.push(file.path);

                // handle 404 at the end
                if (file.nameWithoutExt === '404') {
                    _404PageFile = file;
                    return;
                }

                // build final path. If is a typescript,
                // it will be transpiled and override the default
                let finalPagePath = file.path,
                    buildedFileRes;

                // compile typescript if needed
                if (file.extension === 'ts') {
                    buildedFileRes = await __STypescriptBuilder.buildTemporary(
                        finalPagePath,
                    );
                    finalPagePath = buildedFileRes.path;
                }

                // @ts-ignore
                const { default: pageConfig } = await import(
                    `${finalPagePath}?${__uniqid()}`
                );
                if (!pageConfig) {
                    throw new Error(
                        `[frontendServer] Sorry but the given "<cyan>${finalPagePath}</cyan>" page file seems to be broken. Make sure to export the page config correctly from this file...`,
                    );
                }
                await this._registerPageConfig(pageConfig, file);
            });

            // wait until our pool is ready
            await pool.ready;

            // handle 404 page
            if (_404PageFile) {
                let _404BuildedFileRes,
                    final404PagePath = _404PageFile.path;
                // compile typescript if needed
                if (_404PageFile.extension === 'ts') {
                    _404BuildedFileRes =
                        await __STypescriptBuilder.buildTemporary(
                            final404PagePath,
                        );
                    final404PagePath = _404BuildedFileRes.path;
                }

                // @ts-ignore
                const { default: pageConfig } = await import(final404PagePath);
                _404BuildedFileRes?.remove?.();
                await this._registerPageConfig(pageConfig, _404PageFile);
            }

            // end of the pages registration
            resolve();
        });
    }

    /**
     * This method register the passed pageConfig config object that can be specified
     * either in the "pages" folder or in the "frontendServer.pages" configuration.
     */
    _pagesConfigsBySlug = {};
    _getPageConfigBySlug(slug) {
        return this._pagesConfigsBySlug[slug];
    }
    _registerPageConfig(
        pageConfig: ISFrontendServerPageConfig | ISFrontendServerPageConfig[],
        pageFile?: any,
        configId?: string,
    ): Promise<void> {
        return new Promise(async (resolve) => {
            // ensure array
            if (!Array.isArray(pageConfig)) {
                pageConfig = [pageConfig];
            }

            for (let pageConfigObj of pageConfig) {
                let slug = '',
                    slugs: string[] = pageConfigObj.slugs ?? [];

                // generate path
                if (
                    pageFile &&
                    !pageConfigObj.slugs &&
                    pageFile.nameWithoutExt !== 'index'
                ) {
                    slug = `/${pageFile.path
                        .replace(
                            `${__SSugarConfig.get('storage.src.pagesDir')}/`,
                            '',
                        )
                        .split('/')
                        .slice(0, -1)
                        .join('/')
                        .replace(/\.(t|j)s$/, '')
                        .replace(/\./g, '/')}`;
                } else if (
                    !pageConfigObj.slugs &&
                    pageFile.nameWithoutExt === 'index'
                ) {
                    slug = '/';
                }

                if (!pageConfigObj.slugs) {
                    if (pageConfigObj.params) {
                        let isOptional = false;
                        for (let [name, requiredOrStr] of Object.entries(
                            pageConfigObj.params,
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

                slugs.forEach((slug) => {
                    console.verbose?.(
                        `<yellow>[route]</yellow> <cyan>${slug}</cyan> route registered <green>successfully</green> from ${
                            pageFile
                                ? `<magenta>${pageFile.relPath}</magenta>`
                                : `<magenta>config.pages.${configId}</magenta>`
                        }`,
                    );

                    let slugParts = slug.split('/');
                    const requiredParams = [];
                    slugParts = slugParts.map((p) => {
                        if (p.endsWith('!')) {
                            const newParam = p.replace(/\!$/, '');
                            requiredParams.push(newParam);
                            return newParam;
                        }
                        return p;
                    });
                    const newSlug = slugParts.join('/');

                    // register the route only once by slug
                    if (!this._getPageConfigBySlug(newSlug)) {
                        this._express.get(newSlug, async (req, res, next) => {
                            const _pageConfig =
                                this._getPageConfigBySlug(slug) ??
                                pageConfigObj;

                            // handler
                            const handlerFn = await this._getHandlerFn(
                                _pageConfig.handler ?? 'generic',
                            );

                            if (_pageConfig.params) {
                                for (let [key, value] of Object.entries(
                                    req.params,
                                )) {
                                    // do not process non "number" keys
                                    if (typeof __autoCast(key) !== 'number') {
                                        continue;
                                    }
                                    const paramKey = Object.keys(
                                        _pageConfig.params,
                                    )[parseInt(key)];
                                    delete req.params[key];
                                    req.params[paramKey] = value;
                                }
                            }

                            handlerFn({
                                req,
                                res,
                                next,
                                pageConfig: _pageConfig,
                                pageFile,
                                config: this._frontendServerConfig,
                                frontendServerConfig:
                                    this._frontendServerConfig,
                            });
                        });
                    }

                    // set the new pageConfig for this slug
                    this._pagesConfigsBySlug[slug] = pageConfigObj;
                });
            }

            resolve();
        });
    }
}
