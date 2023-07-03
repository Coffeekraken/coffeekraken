import { __isNode } from '@coffeekraken/sugar/is';
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
            target: __isNode() ? 'node' : 'default',
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVsRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLENBQUMseUNBQXlDLENBQUM7WUFFakQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUV6Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7WUFFckM7Ozs7Ozs7Ozs7ZUFVRztZQUNILGNBQWMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBRXpDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUUsSUFBSTtZQUVuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLFFBQVE7WUFFaEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTO1NBQzFDO0tBQ0osQ0FBQztBQUNOLENBQUMifQ==