import __SClass from '@coffeekraken/s-class';
import __SPromise from '@coffeekraken/s-promise';
import __sails from 'sails';
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
            const frontendServerConfig = __SugarConfig.get('frontendServer');
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
                    express.use(createProxyMiddleware(proxyObj.route, Object.assign({ logLevel: 'silent' }, ((_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}))));
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
                    express.use((req, res, next) => {
                        return pipe(middleware(res, res, next));
                    });
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
            // handlers registration
            Object.keys(frontendServerConfig.handlers).forEach((handlerId) => {
                const handlerObj = frontendServerConfig.handlers[handlerId];
                const handlerFn = require(handlerObj.handler).default;
                express.get(handlerObj.route, (req, res, next) => {
                    return pipe(handlerFn(req, res, next));
                });
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