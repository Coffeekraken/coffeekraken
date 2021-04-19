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
            const frontendServerConfig = s_sugar_config_1.default('frontendServer');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsb0dBQThFO0FBQzlFLDREQUFxQyxDQUFDLHFCQUFxQjtBQTZCM0QsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWNuRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDM0MsTUFBTSxXQUFXLEdBQTJCLGtDQUEwQixDQUFDLEtBQUssQ0FDMUUsTUFBTSxDQUNQLENBQUMsS0FBSyxDQUFDO1FBRVIsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQzVCLE1BQU0sV0FBVyxHQUFHO2dCQUNsQixJQUFJLEVBQUUsTUFBQSxXQUFXLENBQUMsSUFBSSxtQ0FBSSxJQUFJO2dCQUM5QixZQUFZLEVBQUUsTUFBQSxXQUFXLENBQUMsUUFBUSxtQ0FBSSxXQUFXO2dCQUNqRCxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFO3dCQUNWLEtBQUssRUFBRSxFQUFFO3FCQUNWO2lCQUNGO2dCQUNELE1BQU0sRUFBRSxFQUFFO2dCQUNWLEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsT0FBTztpQkFDZjthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRztnQkFDbEIsUUFBUTtnQkFDUixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxNQUFNO2dCQUNO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