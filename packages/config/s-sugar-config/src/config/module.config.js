import __isNode from '@coffeekraken/sugar/shared/is/node';
export default function (env) {
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
            target: __isNode() ? 'node' : 'default',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vZHVsZS5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxDQUFDLHlDQUF5QyxDQUFDO1lBRWpEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFFekM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO1lBRXJDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSztZQUV6Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFLElBQUk7WUFFbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxRQUFRO1lBRWhCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUztTQUMxQztLQUNKLENBQUM7QUFDTixDQUFDIn0=