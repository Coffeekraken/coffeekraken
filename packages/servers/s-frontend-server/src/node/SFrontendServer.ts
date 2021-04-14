import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __sails from 'sails';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __fs from 'fs';
import __path from 'path';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
import __mimeTypes from 'mime-types'; //eslint-disable-line

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
    ).value;

    return new __SPromise(
      ({ resolve, reject, emit }) => {
        const sailsConfig = {
          port: finalParams.port ?? 8888,
          explicitHost: finalParams.hostname ?? '127.0.0.1',
          http: {
            middleware: {
              order: []
            }
          },
          routes: {},
          log: {
            level: 'error'
          }
        };

        const logLevelInt = [
          'silent',
          'error',
          'warn',
          'debug',
          'info',
          'verbose',
          'silly'
        ].indexOf(finalParams.logLevel);

        const frontendServerConfig = __sugarConfig('frontendServer');

        if (frontendServerConfig.staticDirs) {
          Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
            sailsConfig.routes[dir] = (req, res, next) => {
              // @ts-ignore
              const potentialFilePath = __path.join(
                finalParams.rootDir,
                req.url
              );
              if (__fs.existsSync(potentialFilePath)) {
                const type = __mimeTypes.lookup(potentialFilePath);
                res.setHeader('content-type', type);
                __fs.createReadStream(potentialFilePath).pipe(res);
              } else {
                next();
              }
            };
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
              sailsConfig.http.middleware.order.push(middlewareName);
              sailsConfig.http.middleware[middlewareName] = middleware;
            }
          );
        }

        // logging requests
        if (logLevelInt >= 4) {
          sailsConfig.http.middleware['logMiddleware'] = function (
            req,
            res,
            next
          ) {
            emit('log', {
              value: `Request on "<cyan>${req.url}</cyan>"`
            });
            next();
          };
          // @ts-ignore
          sailsConfig.http.middleware.order.push('logMiddleware');
        }

        if (frontendServerConfig.handlers) {
          Object.keys(frontendServerConfig.handlers).forEach((handlerName) => {
            const handlerObj = frontendServerConfig.handlers[handlerName];
            sailsConfig.routes[
              handlerObj.route
            ] = require(handlerObj.handler).default; // eslint-disable-line
          });
        }

        // start the sails server properly with configs
        this._sails.lift(sailsConfig, (error) => {
          // handle error
          if (error) throw new Error(error);

          // server started successfully
          emit('log', {
            value: `The frontend server has been started <green>successfully</green>`
          });
          emit('log', {
            value: `You can access it on <yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`
          });
          emit('log', {
            value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`
          });
          emit('log', {
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
