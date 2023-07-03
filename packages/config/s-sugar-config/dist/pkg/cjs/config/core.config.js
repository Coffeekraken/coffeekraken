"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
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
             * @default         __packageRootDir()
             *
             * Specify the context in which to generate the namespace.
             * The context is simply a root folder from which to search for the package.json
             * file to get the name that serve to the namespace generation
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            context: (0, path_1.__packageRootDir)(),
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBRTVELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNILFNBQVMsRUFBRTtZQUNQOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxPQUFPLEVBQUUsUUFBUTtZQUVqQjs7Ozs7Ozs7Ozs7O2VBWUc7WUFDSCxPQUFPLEVBQUUsSUFBQSx1QkFBZ0IsR0FBRTtTQUM5QjtLQUNKLENBQUM7QUFDTixDQUFDO0FBckNELDRCQXFDQyJ9