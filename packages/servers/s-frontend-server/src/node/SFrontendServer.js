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
        return new s_promise_1.default(({ resolve, reject, emit }) => {
            var _a, _b;
            const sailsConfig = {
                port: (_a = params.port) !== null && _a !== void 0 ? _a : 8888,
                explicitHost: (_b = params.hostname) !== null && _b !== void 0 ? _b : '127.0.0.1',
                http: {
                    middleware: {
                        order: []
                    }
                },
                log: {
                    level: 'error'
                }
            };
            const frontendServerConfig = sugar_1.default('frontendServer');
            if (frontendServerConfig.middlewares) {
                Object.keys(frontendServerConfig.middlewares).forEach((middlewareName) => {
                    var _a;
                    const middlewareObj = frontendServerConfig.middlewares[middlewareName];
                    if (!middlewareObj.path || fs_1.default.existsSync(middlewareObj.path)) {
                        throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
                    }
                    const middlewareWrapperFn = require(middlewareObj.path).default;
                    const middleware = middlewareWrapperFn((_a = middlewareObj.settings) !== null && _a !== void 0 ? _a : {});
                    // register the middleware inside the sails configuration
                    sailsConfig.http.middleware.order.push(middlewareName);
                    sailsConfig.http.middleware[middlewareName] = middleware;
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
                    value: `You can access it on <yellow>http://${params.hostname}</yellow>:<cyan>${params.port}</cyan>`
                });
            });
            resolve(true);
        }, {
            eventEmitter: {
                bind: this
            }
        });
    }
}
exports.default = SFrontendServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250ZW5kU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zyb250ZW5kU2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHdFQUFpRDtBQUNqRCxrREFBNEI7QUFDNUIsb0ZBQW9FO0FBQ3BFLDRDQUFzQjtBQTRCdEIsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWNuRDs7Ozs7Ozs7O09BU0c7SUFDSDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBRVIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDM0MsT0FBTyxJQUFJLG1CQUFVLENBQ25CLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQzVCLE1BQU0sV0FBVyxHQUFHO2dCQUNsQixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO2dCQUN6QixZQUFZLEVBQUUsTUFBQSxNQUFNLENBQUMsUUFBUSxtQ0FBSSxXQUFXO2dCQUM1QyxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFO3dCQUNWLEtBQUssRUFBRSxFQUFFO3FCQUNWO2lCQUNGO2dCQUNELEdBQUcsRUFBRTtvQkFDSCxLQUFLLEVBQUUsT0FBTztpQkFDZjthQUNGLENBQUM7WUFFRixNQUFNLG9CQUFvQixHQUFHLGVBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTdELElBQUksb0JBQW9CLENBQUMsV0FBVyxFQUFFO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FDbkQsQ0FBQyxjQUFjLEVBQUUsRUFBRTs7b0JBQ2pCLE1BQU0sYUFBYSxHQUNqQixvQkFBb0IsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBRW5ELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHlEQUF5RCxjQUFjLHdEQUF3RCxDQUM5SixDQUFDO3FCQUNIO29CQUVELE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ2hFLE1BQU0sVUFBVSxHQUFHLG1CQUFtQixDQUNwQyxNQUFBLGFBQWEsQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FDN0IsQ0FBQztvQkFFRix5REFBeUQ7b0JBQ3pELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3ZELFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDM0QsQ0FBQyxDQUNGLENBQUM7YUFDSDtZQUVELCtDQUErQztZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdEMsZUFBZTtnQkFDZixJQUFJLEtBQUs7b0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbEMsOEJBQThCO2dCQUM5QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSxrRUFBa0U7aUJBQzFFLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSx1Q0FBdUMsTUFBTSxDQUFDLFFBQVEsbUJBQW1CLE1BQU0sQ0FBQyxJQUFJLFNBQVM7aUJBQ3JHLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsRUFDRDtZQUNFLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTthQUNYO1NBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBM0dELGtDQTJHQyJ9