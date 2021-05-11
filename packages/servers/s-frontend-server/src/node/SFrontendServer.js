"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sails_1 = __importDefault(require("sails"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
class SFrontendServer extends s_class_1.default {
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
        this._sails = new sails_1.default.constructor();
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
        const finalParams = SFrontendServerInterface_1.default.apply(params).value;
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => {
            const express = express_1.default();
            const logLevelInt = [
                'silent',
                'error',
                'warn',
                'debug',
                'info',
                'verbose',
                'silly'
            ].indexOf(finalParams.logLevel);
            const frontendServerConfig = s_sugar_config_1.default('frontendServer');
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
                    express.use(http_proxy_middleware_1.createProxyMiddleware(proxyObj.route, (_a = proxyObj.settings) !== null && _a !== void 0 ? _a : {}));
                });
            }
            if (frontendServerConfig.middlewares) {
                Object.keys(frontendServerConfig.middlewares).forEach((middlewareName) => {
                    var _a;
                    const middlewareObj = frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path || fs_1.default.existsSync(middlewareObj.path)) {
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
                    value: `The frontend server has been started <green>successfully</green>`
                });
                emit('log', {
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `You can access it on <yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`
                });
                emit('log', {
                    group: `s-frontend-server-${this.metas.id}`,
                    value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`
                });
                emit('log', {
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
exports.default = SFrontendServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUV0QixzREFBZ0M7QUFDaEMsb0dBQThFO0FBSTlFLGlFQUE4RDtBQTZCOUQsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWNuRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDM0MsTUFBTSxXQUFXLEdBQTJCLGtDQUEwQixDQUFDLEtBQUssQ0FDMUUsTUFBTSxDQUNQLENBQUMsS0FBSyxDQUFDO1FBRVIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLGlCQUFTLEVBQUUsQ0FBQztZQUU1QixNQUFNLFdBQVcsR0FBRztnQkFDbEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNOLFNBQVM7Z0JBQ1QsT0FBTzthQUNSLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoQyxNQUFNLG9CQUFvQixHQUFHLHdCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU3RCx5Q0FBeUM7WUFDekMsb0VBQW9FO1lBQ3BFLHNEQUFzRDtZQUN0RCxzQkFBc0I7WUFDdEIsK0NBQStDO1lBQy9DLCtCQUErQjtZQUMvQixrQkFBa0I7WUFDbEIsV0FBVztZQUNYLGtE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