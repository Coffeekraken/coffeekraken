import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __sails from 'sails';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __express from 'express';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
import { createProxyMiddleware } from 'http-proxy-middleware';
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
    start(params) {
        const finalParams = __SFrontendServerInterface.apply(params).value;
        return new __SPromise(({ resolve, reject, emit, pipe }) => {
            const express = __express();
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
            // if (frontendServerConfig.staticDirs) {
            //   Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
            //     sailsConfig.routes[dir] = (req, res, next) => {
            //       // @ts-ignore
            //       const potentialFilePath = __path.join(
            //         finalParams.rootDir,
            //         req.url
            //       );
            //       if (__fs.existsSync(potentialFilePath)) {
            //         const type = __mimeTypes.lookup(potentialFilePath);
            //         res.setHeader('content-type', type);
            //         __fs.createReadStream(potentialFilePath).pipe(res);
            //       } else {
            //         next();
            //       }
            //     };
            //   });
            // }
            if (frontendServerConfig.proxy) {
                Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
                    var _a;
                    const proxyObj = frontendServerConfig.proxy[proxyId];
                    // register the middleware inside the sails configuration
                    // @ts-ignore
                    express.use(createProxyMiddleware(proxyObj.route, (_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}));
                });
            }
            if (frontendServerConfig.middlewares) {
                Object.keys(frontendServerConfig.middlewares).forEach((middlewareName) => {
                    var _a;
                    const middlewareObj = frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path || __fs.existsSync(middlewareObj.path)) {
                        throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
                    }
                    const middlewareWrapperFn = require(middlewareObj.path).default; // eslint-disable-line
                    const middleware = middlewareWrapperFn((_a = middlewareObj.settings) !== null && _a !== void 0 ? _a : {});
                    // register the middleware inside the sails configuration
                    // @ts-ignore
                    express.use(middleware);
                });
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
            Object.keys(frontendServerConfig.handlers).forEach((handlerId) => {
                const handlerObj = frontendServerConfig.handlers[handlerId];
                const handlerFn = require(handlerObj.handler).default;
                express.get(handlerObj.route, handlerFn);
            });
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
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxTQUFTLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sMEJBQTBCLE1BQU0sc0NBQXNDLENBQUM7QUFJOUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUE2QjlELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBY25EOzs7Ozs7Ozs7T0FTRztJQUNIO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFFUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUF1QztRQUMzQyxNQUFNLFdBQVcsR0FBMkIsMEJBQTBCLENBQUMsS0FBSyxDQUMxRSxNQUFNLENBQ1AsQ0FBQyxLQUFLLENBQUM7UUFFUixPQUFPLElBQUksVUFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNsQyxNQUFNLE9BQU8sR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUU1QixNQUFNLFdBQVcsR0FBRztnQkFDbEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNOLFNBQVM7Z0JBQ1QsT0FBTzthQUNSLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxR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