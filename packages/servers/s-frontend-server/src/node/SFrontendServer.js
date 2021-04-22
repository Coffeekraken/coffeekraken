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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsa0ZBQXlEO0FBQ3pELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsb0dBQThFO0FBQzlFLDREQUFxQyxDQUFDLHFCQUFxQjtBQUMzRCwwREFBb0M7QUE2QnBDLE1BQXFCLGVBQWdCLFNBQVEsaUJBQVE7SUFjbkQ7Ozs7Ozs7OztPQVNHO0lBQ0g7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQXVDO1FBQzNDLE1BQU0sV0FBVyxHQUEyQixrQ0FBMEIsQ0FBQyxLQUFLLENBQzFFLE1BQU0sQ0FDUCxDQUFDLEtBQUssQ0FBQztRQUVSLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDbEMsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLElBQUksUUFBRSxXQUFXLENBQUMsSUFBSSxtQ0FBSSxJQUFJO2dCQUM5QixZQUFZLFFBQUUsV0FBVyxDQUFDLFFBQVEsbUNBQUksV0FBVztnQkFDakQsSUFBSSxFQUFFO29CQUNKLFVBQVUsRUFBRTt3QkFDVixLQUFLLEVBQUUsRUFBRTtxQkFDVjtpQkFDRjtnQkFDRCxNQUFNLEVBQUUsRUFBRTtnQkFDVixHQUFHLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLE9BQU87aUJBQ2Y7YUFDRixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUc7Z0JBQ2xCLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsTUFBTTtnQkFDTixTQUFTO2dCQUNULE9BQU87YUFDUixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFaEMsTUFBTSxvQkFBb0IsR0FBRyx3QkFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFN0QsSUFBSSxvQkFBb0IsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQzNELFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO3dCQUMzQyxhQUFhO3dCQUNiLE1BQU0saUJBQWlCLEdBQUcsY0FBTSxDQUFDLElBQUksQ0FDbkMsV0FBVyxDQUFDLE9BQU8sRUFDbkIsR0FBRyxDQUFDLEdBQUcsQ0FDUixDQUFDO3dCQUNGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFOzRCQUN0QyxNQUFNLElBQUksR0FBRyxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzRCQUNuRCxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDcEMsWUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUNwRDs2QkFBTTs0QkFDTCxJQUFJLEVBQUUsQ0FBQzt5QkFDUjtvQkFDSCxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FDbkQsQ0FBQyxjQUFjLEVBQUUsRUFBRTs7b0JBQ2pCLE1BQU0sYUFBYSxHQUNqQixvQkFBb0IsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRW5ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlEQUF5RCxjQUFjLHdEQUF3RCxDQUM5SixDQUFDO3FCQUNIO29CQUVELE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7b0JBQ3ZGLE1BQU0sVUFBVSxHQUFHLG1CQUFtQixPQUNwQyxhQUFhLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQzdCLENBQUM7b0JBRUYseURBQXlEO29CQUN6RCxhQUFhO29CQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3ZELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDM0QsQ0FBQyxDQUNGLENBQUM7YUFDSDtZQUVELG1CQUFtQjtZQUNuQixJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUU7Z0JBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFVBQzdDLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSTtvQkFFSixJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNWLEtBQUssRUFBRSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsVUFBVTtxQkFDOUMsQ0FBQyxDQUFDO29CQUNILElBQUksRUFBRSxDQUFDO2dCQUNULENBQUMsQ0FBQztnQkFDRixhQUFhO2dCQUNiLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDekQ7WUFFRCxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDakMsS0FDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUNyRCxDQUFDLEVBQUUsRUFDSDt3QkFDQSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRSxNQUFNLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzlELElBQUksbUJBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDbEQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7NEJBQ3RELE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDckIsTUFBTTt5QkFDUDtxQkFDRjtpQkFDRjtZQUNILENBQUMsQ0FBQztZQUVGLDRCQUE0QjtZQUU1QiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RDLGVBQWU7Z0JBQ2YsSUFBSSxLQUFLO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWxDLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsa0VBQWtFO2lCQUMxRSxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsdUNBQXVDLFdBQVcsQ0FBQyxRQUFRLG1CQUFtQixXQUFXLENBQUMsSUFBSSxTQUFTO2lCQUMvRyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUseUJBQXlCLFdBQVcsQ0FBQyxPQUFPLFNBQVM7aUJBQzdELENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSxzQkFBc0IsV0FBVyxDQUFDLFFBQVEsV0FBVztpQkFDN0QsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLEVBQ0Q7WUFDRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7YUFDWDtTQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXZMRCxrQ0F1TEMifQ==