"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
function default_1(env) {
    if (env.platform !== 'node')
        return;
    return {
        resolve: {
            /**
             * @name        dirs
             * @namespace   sugar.config.module.resolve
             * @type        Array<String>
             * @default     [config.storage.package.nodeModulesDir]
             *
             * Specify the directories from which to try to resolve modules
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            dirs: ['[config.storage.package.nodeModulesDir]'],
            /**
             * @name        extensions
             * @namespace   sugar.config.module.resolve
             * @type        Array<String>
             * @default     ['js','mjs','json','node']
             *
             * Specify the extensions you want to check if a path extension free is passed
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            extensions: ['js', 'mjs', 'json', 'node'],
            /**
             * @mame          fields
             * @namespace     sugar.config.module.resolve
             * @type          Array<String>
             * @default       ['main','module','browser']
             *
             * Specify which fields to check first to resolve the package file
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            fields: ['main', 'module', 'browser'],
            /**
             * @mame          builtInModules
             * @namespace     sugar.config.module.resolve
             * @type          Boolean
             * @default       isNode() ? true : false
             *
             * Specify if you want to take care of built-in modules for node like "fs", "path", etc...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            builtInModules: (0, node_1.default)() ? true : false,
            /**
             * @mame          preferExports
             * @namespace     sugar.config.module.resolve
             * @type          Boolean
             * @default       true
             *
             * Specify if you want to check the "exports" field before the specified ones in the "fields" setting
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            preferExports: true,
            /**
             * @mame          method
             * @namespace     sugar.config.module.resolve
             * @type          String
             * @default       import
             *
             * Specify the default method to use when requesting to resolve a path. Can be "import" or "require"
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            method: 'import',
            /**
             * @mame          target
             * @namespace     sugar.config.module.resolve
             * @type          String
             * @default       isNode() ? 'node' : 'default'
             *
             * Specify the default target to use when requesting to resolve a path. Can be "node" or "default"
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            target: (0, node_1.default)() ? 'node' : 'default',
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBQTBEO0FBRTFELG1CQUF5QixHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1lBRWpEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFFekM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO1lBRXJDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsSUFBQSxjQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBRXpDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUUsSUFBSTtZQUVuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLFFBQVE7WUFFaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxJQUFBLGNBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7U0FDMUM7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWpHRCw0QkFpR0MifQ==