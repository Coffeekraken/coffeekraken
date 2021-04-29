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
const minimatch_1 = __importDefault(require("minimatch"));
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
            sailsConfig.routes['/*'] = (req, res) => {
                if (frontendServerConfig.handlers) {
                    for (let i = 0; i < Object.keys(frontendServerConfig.handlers).length; i++) {
                        const handlerName = Object.keys(frontendServerConfig.handlers)[i];
                        const handlerObj = frontendServerConfig.handlers[handlerName];
                        if (minimatch_1.default(req.originalUrl, handlerObj.route)) {
                            const handlerFn = require(handlerObj.handler).default;
                            const handlerPromise = handlerFn(req, res);
                            pipe(handlerPromise);
                            break;
                        }
                    }
                }
            };
            // console.log(this._sails);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsb0dBQThFO0FBQzlFLDREQUFxQyxDQUFDLHFCQUFxQjtBQUMzRCwwREFBb0M7QUE2QnBDLE1BQXFCLGVBQWdCLFNBQVEsaUJBQVE7SUFjbkQ7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQXVDO1FBQzNDLE1BQU0sV0FBVyxHQUEyQixrQ0FBMEIsQ0FBQyxLQUFLLENBQzFFLE1BQU0sQ0FDUCxDQUFDLEtBQUssQ0FBQztRQUVSLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDbEMsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLElBQUksRUFBRSxNQUFBLFdBQVcsQ0FBQyxJQUFJLG1DQUFJLElBQUk7Z0JBQzlCLFlBQVksRUFBRSxNQUFBLFdBQVcsQ0FBQyxRQUFRLG1DQUFJLFdBQVc7Z0JBQ2pELElBQUksRUFBRTtvQkFDSixVQUFVLEVBQUU7d0JBQ1YsS0FBSyxFQUFFLEVBQUU7cUJBQ1Y7aUJBQ0Y7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFO29CQUNILEtBQUssRUFBRSxPQUFPO2lCQUNmO2FBQ0YsQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUFHO2dCQUNsQixRQUFRO2dCQUNSLE9BQU87Z0JBQ1AsTUFBTTtnQkFD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