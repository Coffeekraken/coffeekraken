import __isNode from '@coffeekraken/sugar/shared/is/node';
export default {
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        builtInModules: __isNode() ? true : false,
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
        target: __isNode() ? 'node' : 'default'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsZUFBZTtJQUNiLE9BQU8sRUFBRTtRQUNQOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztRQUVqRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBRXpDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUVyQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsY0FBYyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUs7UUFFekM7Ozs7Ozs7Ozs7V0FVRztRQUNILGFBQWEsRUFBRSxJQUFJO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsUUFBUTtRQUVoQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDeEM7Q0FDRixDQUFDIn0=