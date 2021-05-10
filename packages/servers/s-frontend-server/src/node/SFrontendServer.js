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
                express.use(function (req, res, next) {
                    emit('log', {
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
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
exports.default = SFrontendServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUV0QixzREFBZ0M7QUFDaEMsb0dBQThFO0FBSTlFLGlFQUE4RDtBQTZCOUQsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWNuRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDM0MsTUFBTSxXQUFXLEdBQTJCLGtDQUEwQixDQUFDLEtBQUssQ0FDMUUsTUFBTSxDQUNQLENBQUMsS0FBSyxDQUFDO1FBRVIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sT0FBTyxHQUFHLGlCQUFTLEVBQUUsQ0FBQztZQUU1QixNQUFNLFdBQVcsR0FBRztnQkFDbEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNOLFNBQVM7Z0JBQ1QsT0FBTzthQUNSLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoQyxNQUFNLG9CQUFvQixHQUFHLHdCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU3RCx5Q0FBeUM7WUFDekMsb0VBQW9FO1lBQ3BFLHNEQUFzRDtZQUN0RCxzQkFBc0I7WUFDdEIsK0NBQStDO1lBQy9DLCtCQUErQjtZQUMvQixrQkFBa0I7WUFDbEIsV0FBVztZQUNYLGtE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