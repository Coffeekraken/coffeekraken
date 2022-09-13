import { __commonTextFileExtensions } from '@coffeekraken/sugar/extension';
import { __packageRootDir } from '@coffeekraken/sugar/path';
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        read: {
            /**
             * @name          input
             * @namespace     config.docmap.read
             * @type          String
             * @default         ${__packageRootDir()}/docmap.json
             *
             * Specify the path of the docmap.json source file to read
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: `${__packageRootDir()}/docmap.json`,
            /**
             * @name          sort
             * @namespace     config.docmap.read
             * @type          Array<String>
             * @default
             *
             * Specify which of the docmap entries has to be sorted alphabetically.
             * These array values has to be a dotPath like 'menu.documentation'
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            sort: ['menu.packages'],
            /**
             * @name          sortDeep
             * @namespace     config.docmap.read
             * @type          Array<String>
             * @default
             *
             * Specify which of the docmap entries has to be sorted alphabetically and deeply.
             * These array values has to be a dotPath like 'menu.documentation'
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            sortDeep: ['menu.custom.styleguide'],
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
            get outDir() {
                return `${api.config.storage.package.rootDir}/.docmap`;
            },
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
            get glob() {
                return `${api.config.storage.package.rootDir}/.docmap/*`;
            },
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
                // 'dist/pkg/esm/**/*.js',
                `src/!(css)/*{0,4}/*.+(${__commonTextFileExtensions({}).join('|')})`,
                `dist/+(css)/*`,
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
                 * @type        Regex
                 * @default      /^.*$/
                 *
                 * Specify some regex to apply on different docblock properties
                 * to exclude some files from the builded docmap json
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                namespace: /^.*$/,
                /**
                 * @name        type
                 * @namespace   config.docmap.build.filters
                 * @type        Regex
                 * @default       /^(?!CssClass)[a-zA-Z]+$/
                 *
                 * Specify some regex to apply on different docblock properties
                 * to exclude some files from the builded docmap json
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                type: /^(?!CssClass)[a-zA-Z]+$/,
            },
            /**
             * @name        tags
             * @namespace     config.docmap.build
             * @type        Array<String>
             * @default     ['id','name','type','menu','default','platform','description','namespace','status','example','interface','styleguide','static','since','author']
             *
             * Specify which docblock tags you want to integrate to your docmap.json items
             *
             * @since     2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            tags: [
                'id',
                'name',
                'as',
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
            get outPath() {
                return `${api.config.storage.package.rootDir}/docmap.json`;
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUcsZ0JBQWdCLEVBQUUsY0FBYztZQUUxQzs7Ozs7Ozs7Ozs7ZUFXRztZQUNILElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQztZQUV2Qjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILFFBQVEsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3ZDO1FBRUQsUUFBUSxFQUFFO1lBQ047Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sVUFBVSxDQUFDO1lBQzNELENBQUM7U0FDSjtRQUVELGVBQWUsRUFBRTtZQUNiOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxZQUFZLENBQUM7WUFDN0QsQ0FBQztTQUNKO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7Ozs7ZUFhRztZQUNILEtBQUssRUFBRTtnQkFDSCxHQUFHO2dCQUNILDBCQUEwQjtnQkFDMUIseUJBQXlCLDBCQUEwQixDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDeEQsR0FBRyxDQUNOLEdBQUc7Z0JBQ0osZUFBZTthQUNsQjtZQUVEOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixpQkFBaUI7YUFDcEI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLEtBQUs7WUFFaEIsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxTQUFTLEVBQUUsTUFBTTtnQkFFakI7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILElBQUksRUFBRSx5QkFBeUI7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUk7Z0JBQ0osTUFBTTtnQkFDTixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsYUFBYTtnQkFDYixXQUFXO2dCQUNYLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCxXQUFXO2dCQUNYLE9BQU87Z0JBQ1AsUUFBUTtnQkFDUixPQUFPO2dCQUNQLFFBQVE7YUFDWDtZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE9BQU87Z0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLGNBQWMsQ0FBQztZQUMvRCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9