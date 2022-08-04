"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        namespace: {
            /**
             * @name            pattern
             * @namespace       config.core.namespace
             * @type            String
             * @default         {path}
             *
             * Specify a generation pattern to generate the namespace. Here's the available tokens:
             * - {package.name}: The package name specified in the package.json
             * - {package.version}: The package version specified in the package.json
             * - {path}: The passed path parameter
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            pattern: '{path}',
            /**
             * @name            context
             * @namespace       config.core.namespace
             * @type            String
             * @default         __packageRoot()
             *
             * Specify the context in which to generate the namespace.
             * The context is simply a root folder from which to search for the package.json
             * file to get the name that serve to the namespace generation
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            context: (0, packageRoot_1.default)(),
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBRXRFLG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILFNBQVMsRUFBRTtZQUNQOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxPQUFPLEVBQUUsUUFBUTtZQUVqQjs7Ozs7Ozs7Ozs7O2VBWUc7WUFDSCxPQUFPLEVBQUUsSUFBQSxxQkFBYSxHQUFFO1NBQzNCO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFyQ0QsNEJBcUNDIn0=