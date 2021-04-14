"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const sails_1 = __importDefault(require("sails"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
const mime_types_1 = __importDefault(require("mime-types")); //eslint-disable-line
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
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            var _a, _b;
            const sailsConfig = {
                port: (_a = finalParams.port) !== null && _a !== void 0 ? _a : 8888,
                explicitHost: (_b = finalParams.hostname) !== null && _b !== void 0 ? _b : '127.0.0.1',
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
            const frontendServerConfig = sugar_1.default('frontendServer');
            if (frontendServerConfig.staticDirs) {
                Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
                    sailsConfig.routes[dir] = (req, res, next) => {
                        // @ts-ignore
                        const potentialFilePath = path_1.default.join(finalParams.rootDir, req.url);
                        if (fs_1.default.existsSync(potentialFilePath)) {
                            const type = mime_types_1.default.lookup(potentialFilePath);
                            res.setHeader('content-type', type);
                            fs_1.default.createReadStream(potentialFilePath).pipe(res);
                        }
                        else {
                            next();
                        }
                    };
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
                    sailsConfig.http.middleware.order.push(middlewareName);
                    sailsConfig.http.middleware[middlewareName] = middleware;
                });
            }
            // logging requests
            if (logLevelInt >= 4) {
                sailsConfig.http.middleware['logMiddleware'] = function (req, res, next) {
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
                    sailsConfig.routes[handlerObj.route] = require(handlerObj.handler).default; // eslint-disable-line
                });
            }
            // start the sails server properly with configs
            this._sails.lift(sailsConfig, (error) => {
                // handle error
                if (error)
                    throw new Error(error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsb0ZBQW9FO0FBQ3BFLDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsb0dBQThFO0FBQzlFLDREQUFxQyxDQUFDLHFCQUFxQjtBQTZCM0QsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWNuRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDM0MsTUFBTSxXQUFXLEdBQTJCLGtDQUEwQixDQUFDLEtBQUssQ0FDMUUsTUFBTSxDQUNQLENBQUMsS0FBSyxDQUFDO1FBRVIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQzVCLE1BQU0sV0FBVyxHQUFHO2dCQUNsQixJQUFJLEVBQUUsTUFBQSxXQUFXLENBQUMsSUFBSSxtQ0FBSSxJQUFJO2dCQUM5QixZQUFZLEVBQUUsTUFBQSxXQUFXLENBQUMsUUFBUSxtQ0FBSSxXQUFXO2dCQUNqRCxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFO3dCQUNWLEtBQUssRUFBRSxFQUFFO3FCQUNWO2lCQUNGO2dCQUNELE1BQU0sRUFBRSxFQUFFO2dCQUNWLEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsT0FBTztpQkFDZjthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRztnQkFDbEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNO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