"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = require("@coffeekraken/sugar/extension");
const path_1 = require("@coffeekraken/sugar/path");
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name        noExtends
         * @namespace   config.docmap
         * @type        Boolean
         * @default     false
         *
         * Specify if you want to disable the extends search process that will result in the "extends" array in the docmap.json file
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        noExtends: false,
        /**
         * @name        excludePackages
         * @namespace   config.docmap
         * @type        Boolean
         * @default     ['@website/*', '@example/*']
         *
         * Specify some package(s) name(s) (glob) to avoid extending.
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        excludePackages: ['@website/*', '@example/*', '@tests/*'],
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
            input: `${(0, path_1.__packageRootDir)()}/docmap.json`,
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
            sortDeep: ['menu.custom.styleguide', 'menu.custom.specs'],
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
                `src/!(css)/*{0,4}/*.+(${(0, extension_1.__commonTextFileExtensions)({}).join('|')})`,
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
            excludeByTags: {
                /**
                 * @name        namespace
                 * @namespace   config.docmap.build.excludeByTags
                 * @type        Regex[]
                 * @default      [/\.config\.)/]
                 *
                 * Specify some regex to apply on the namespace.
                 * All namespaces that does not match one of the specified regex will be excluded
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                // namespace: [/\.config\./],
                /**
                 * @name        type
                 * @namespace   config.docmap.build.excludeByTags
                 * @type        Regex
                 * @default       /^CssClass$/
                 *
                 * Specify some regex to apply on the type.
                 * All types that does not match one of the specified regex will be excluded
                 *
                 * @since       2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                type: [/^CssClass$/],
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
                'param',
                'setting',
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTJFO0FBQzNFLG1EQUE0RDtBQUU1RCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFLEtBQUs7UUFFaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILGVBQWUsRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxDQUFDO1FBRXpELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGNBQWM7WUFFMUM7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFFdkI7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxRQUFRLEVBQUUsQ0FBQyx3QkFBd0IsRUFBRSxtQkFBbUIsQ0FBQztTQUM1RDtRQUVELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFVBQVUsQ0FBQztZQUMzRCxDQUFDO1NBQ0o7UUFFRCxlQUFlLEVBQUU7WUFDYjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWSxDQUFDO1lBQzdELENBQUM7U0FDSjtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRztnQkFDSCx5QkFBeUIsSUFBQSxzQ0FBMEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3hELEdBQUcsQ0FDTixHQUFHO2dCQUNKLGVBQWU7YUFDbEI7WUFFRDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILE9BQU8sRUFBRTtnQkFDTCxtQkFBbUI7Z0JBQ25CLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2FBQ3BCO1lBRUQsYUFBYSxFQUFFO2dCQUNYOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCw2QkFBNkI7Z0JBRTdCOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDdkI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUk7Z0JBQ0osTUFBTTtnQkFDTixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxTQUFTO2dCQUNULE1BQU07Z0JBQ04sU0FBUztnQkFDVCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxRQUFRO2FBQ1g7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFFVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxjQUFjLENBQUM7WUFDL0QsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFoUEQsNEJBZ1BDIn0=