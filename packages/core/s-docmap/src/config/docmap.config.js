import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __commonTextFileExtensions from '@coffeekraken/sugar/shared/extension/commonTextFileExtensions';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        read: {
            /**
             * @name          input
             * @namespace     config.docmap.read
             * @type          String
             * @default         ${__packageRoot()}/docmap.json
             *
             * Specify the path of the docmap.json source file to read
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: `${__packageRoot()}/docmap.json`,
        },
        snapshot: {
            /**
             * @name          outDir
             * @namespace     config.docmap.snapshot
             * @type          String
             * @default       [config.storage.package.rootDir]/.docmap
             *
             * Specify where to save the generated snapshot
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outDir: `[config.storage.package.rootDir]/.docmap`,
        },
        installSnapshot: {
            /**
             * @name          glob
             * @namespace     config.docmap.installSnapshot
             * @type          String
             * @default       [config.storage.package.rootDir]/.docmap/*
             *
             * Specify where to find the snapshot(s) to install. It must refer
             * to folder(s) where a docmap.json and a package.json exists...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            glob: `[config.storage.package.rootDir]/.docmap/*`,
        },
        build: {
            /**
             * @name            globs
             * @namespace       config.docmap.build
             * @type                Array<String>
             * @default             ['*',`src/!(css)/** /*.+(${__commonTextFileExtensions(false).join('|')})`,`dist/+(css)/*`]
             *
             * Specify the input globs to use in order to find files that will
             * be used for docmap generation.
             * The syntax is standard glob with an additional feature which is:
             * - [glob]:[regex] -> This will search for files using the [glob] part, and search inside them using the [regex] part
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            globs: [
                '*',
                `src/!(css)/*{0,4}/*.+(${__commonTextFileExtensions(false).join('|')})`,
                `dist/+(css)/*`
            ],
            /**
             * @name        exclude
             * @namespace   config.docmap.build
             * @type        Array<String>
             * @default         ['**\/__tests__/**\/*','**\/__tests__.wip/**\/*','**\/__wip__/**\/*']
             *
             * Specify some regex to apply on different docblock and path properties
             * to exclude some files from the buildd docMap json
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            exclude: [
                '**/__tests__/**/*',
                '**/__tests__.wip/**/*',
                '**/__wip__/**/*',
            ],
            /**
             * @name        noExtends
             * @namespace   config.docmap.build
             * @type        Boolean
             * @default     false
             *
             * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            noExtends: false,
            filters: {
                /**
                 * @name        namespace
                 * @namespace   config.docmap.build.filters
                 * @type        Object<String>
                 * @default       /#\{.*\}/gm
                 *
                 * Specify some regex to apply on different docblock properties
                 * to exclude some files from the buildd docmap json
                 *
                 * @example     js
                 * {
                 *    namespace: /#\{.*\}/gm
                 * }
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                namespace: /#\{.*\}/gm,
            },
            /**
             * @name        tags
             * @namespace     config.docmap.build
             * @type        Array<String>
             * @default     ['name','type','menu','default','platform','description','namespace','status','example','interface','styleguide','static','since','author']
             *
             * Specify which docblock tags you want to integrate to your docmap.json items
             *
             * @since     2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            tags: [
                'name',
                'type',
                'menu',
                'default',
                'platform',
                'description',
                'namespace',
                'status',
                'example',
                'interface',
                'async',
                'static',
                'since',
                'author',
            ],
            /**
             * @name      save
             * @namespace       config.docmap.build
             * @type        Boolean
             * @default     true
             *
             * Specify if you want to save the buildd docmap.json file under the ```outPath``` path
             *
             * @since     2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            save: true,
            /**
             * @name        outPath
             * @namespace   config.docmap.build
             * @type         String
             * @default       [config.storage.package.rootDir]/docmap.json
             *
             * Specify where you want to outPath the file
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outPath: `[config.storage.package.rootDir]/docmap.json`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jbWFwLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRvY21hcC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFFdEUsT0FBTywwQkFBMEIsTUFBTSwrREFBK0QsQ0FBQztBQUV2RyxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxHQUFHLGFBQWEsRUFBRSxjQUFjO1NBQzFDO1FBRUQsUUFBUSxFQUFFO1lBQ047Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSwwQ0FBMEM7U0FDckQ7UUFFRCxlQUFlLEVBQUU7WUFDYjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILElBQUksRUFBRSw0Q0FBNEM7U0FDckQ7UUFFRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsS0FBSyxFQUFFO2dCQUNILEdBQUc7Z0JBQ0gseUJBQXlCLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRztnQkFDdkUsZUFBZTthQUNsQjtZQUVEOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixpQkFBaUI7YUFDcEI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLEtBQUs7WUFFaEIsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7Ozs7Ozs7O21CQWdCRztnQkFDSCxTQUFTLEVBQUUsV0FBVzthQUN6QjtZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTTtnQkFDTixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxRQUFRO2FBQ1g7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFFVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLDhDQUE4QztTQUMxRDtLQUNKLENBQUM7QUFDTixDQUFDIn0=