import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __sails from 'sails';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __path from 'path';
import __express from 'express';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
import __mimeTypes from 'mime-types'; //eslint-disable-line
import __minimatch from 'minimatch';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __compression from 'compression';
import __SEnv from '@coffeekraken/s-env';

import { createProxyMiddleware } from 'http-proxy-middleware';

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
   * @name            _sailsInstance
   * @type            Sails
   * @private
   *
   * Store the sails instance
   *
   * @see             https://sailsjs.com
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _sails;

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

    this._sails = new __sails.constructor();
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
    const finalParams: ISFrontendServerParams = __SFrontendServerInterface.apply(
      params
    );

    return new __SPromise(
      ({ resolve, reject, emit, pipe }) => {
        const express = __express();

        // enable compression if prod
        if (params.prod || __SEnv.is('production')) {
          express.use(__compression());
        }

        const logLevelInt = [
          'silent',
          'error',
          'warn',
          'debug',
          'info',
          'verbose',
          'silly'
        ].indexOf(finalParams.logLevel);

        const frontendServerConfig = __SugarConfig.get('frontendServer');

        if (frontendServerConfig.staticDirs) {
          Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {

            const fsPath = frontendServerConfig.staticDirs[dir];
            emit('log', {
              value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`
            });
            express.use(dir, __express.static(fsPath));

            // sailsConfig.routes[dir] = (req, res, next) => {
            //   // @ts-ignore
            //   const potentialFilePath = __path.join(
            //     finalParams.rootDir,
            //     req.url
            //   );
            //   if (__fs.existsSync(potentialFilePath)) {
            //     const type = __mimeTypes.lookup(potentialFilePath);
            //     res.setHeader('content-type', type);
            //     __fs.createReadStream(potentialFilePath).pipe(res);
            //   } else {
            //     next();
            //   }
            // };
          });
        }

        if (frontendServerConfig.proxy) {
          Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
            const proxyObj = frontendServerConfig.proxy[proxyId];
            // register the middleware inside the sails configuration
            // @ts-ignore
            express.use(
              createProxyMiddleware(proxyObj.route, {
                logLevel: 'silent',
                ...(proxyObj.settings ?? {})
              })
            );
          });
        }

        if (frontendServerConfig.middlewares) {
          Object.keys(frontendServerConfig.middlewares).forEach(
            (middlewareName) => {
              const middlewareObj =
                frontendServerConfig.middlewares[middlewareName];

              if (!middlewareObj.path || __fs.existsSync(middlewareObj.path)) {
                throw new Error(
                  `<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`
                );
              }

              const middlewareWrapperFn = require(middlewareObj.path).default; // eslint-disable-line
              const middleware = middlewareWrapperFn(
                middlewareObj.settings ?? {}
              );

              // register the middleware inside the sails configuration
              // @ts-ignore
              express.use((req, res, next) => {
                return pipe(middleware(res, res, next));
              });
            }
          );
        }

        // logging requests
        if (logLevelInt >= 4) {
          express.use((req, res, next) => {
            emit('log', {
              type: 'detail',
              group: `s-frontend-server-${this.metas.id}`,
              value: `Request on "<cyan>${req.url}</cyan>"`
            });
            next();
          });
        }
        // routes registration
        if (frontendServerConfig.routes) {
          Object.keys(frontendServerConfig.routes).forEach((routeSlug) => {
            const routeObj = frontendServerConfig.routes[routeSlug];

            const handlerObj = frontendServerConfig.handlers[routeObj.handler];

            const handlerFn = require(handlerObj.handler).default;
            express.get(routeSlug, (req, res, next) => {

              if (routeObj.request) {
                req = __deepMerge(req, routeObj.request);
              }

              return pipe(handlerFn(req, res, next));
            });
          });
        }

        express.listen(frontendServerConfig.port, () => {
          // server started successfully
          emit('log', {
            group: `s-frontend-server-${this.metas.id}`,
            value: `<yellow>Frontend server</yellow> started <green>successfully</green>`
          });
          emit('log', {
            group: `s-frontend-server-${this.metas.id}`,
            value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`
          });
          emit('log', {
            type: 'detail',
            group: `s-frontend-server-${this.metas.id}`,
            value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`
          });
          emit('log', {
            type: 'detail',
            group: `s-frontend-server-${this.metas.id}`,
            value: `Log level: <yellow>${finalParams.logLevel}</yellow>`
          });
        });
      },
      {
        eventEmitter: {
          bind: this
        }
      }
    );
  }
}
