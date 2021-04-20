"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
exports.default = {
    resolve: {
        /**
         * @name        dirs
         * @namespace   sugar.config.module.resolve
         * @type        Array<String>
         * @default     [config.storage.rootDir]
         *
         * Specify the directories from which to try to resolve modules
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        dirs: ['[config.storage.nodeModulesDir]'],
        /**
         * @name        extensions
         * @namespace   sugar.config.module.resolve
         * @type        Array<String>
         * @default     ['js','mjs','json','node']
         *
         * Specify the extensions you want to check if a path extension free is passed
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        builtInModules: node_1.default() ? true : false,
        /**
         * @mame          preferExports
         * @namespace     sugar.config.module.resolve
         * @type          Boolean
         * @default       true
         *
         * Specify if you want to check the "exports" field before the specified ones in the "fields" setting
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        target: node_1.default() ? 'node' : 'default'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFBMEQ7QUFFMUQsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLENBQUMsaUNBQWlDLENBQUM7UUFFekM7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUV6Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFFckM7Ozs7Ozs7Ozs7V0FVRztRQUNILGNBQWMsRUFBRSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1FBRXpDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxhQUFhLEVBQUUsSUFBSTtRQUVuQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLFFBQVE7UUFFaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxjQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO0tBQ3hDO0NBQ0YsQ0FBQyJ9