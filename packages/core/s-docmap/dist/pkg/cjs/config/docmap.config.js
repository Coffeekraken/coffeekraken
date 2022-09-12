"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("@coffeekraken/sugar/path");
const commonTextFileExtensions_1 = __importDefault(require("@coffeekraken/sugar/shared/extension/commonTextFileExtensions"));
function default_1(api) {
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
                `src/!(css)/*{0,4}/*.+(${(0, commonTextFileExtensions_1.default)({}).join('|')})`,
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELDZIQUF1RztBQUV2RyxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxjQUFjO1lBRTFDOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsSUFBSSxFQUFFLENBQUMsZUFBZSxDQUFDO1lBRXZCOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsUUFBUSxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdkM7UUFFRCxRQUFRLEVBQUU7WUFDTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxNQUFNO2dCQUNOLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxVQUFVLENBQUM7WUFDM0QsQ0FBQztTQUNKO1FBRUQsZUFBZSxFQUFFO1lBQ2I7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLElBQUk7Z0JBQ0osT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFlBQVksQ0FBQztZQUM3RCxDQUFDO1NBQ0o7UUFFRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7Ozs7OztlQWFHO1lBQ0gsS0FBSyxFQUFFO2dCQUNILEdBQUc7Z0JBQ0gsMEJBQTBCO2dCQUMxQix5QkFBeUIsSUFBQSxrQ0FBMEIsRUFBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQ3hELEdBQUcsQ0FDTixHQUFHO2dCQUNKLGVBQWU7YUFDbEI7WUFFRDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILE9BQU8sRUFBRTtnQkFDTCxtQkFBbUI7Z0JBQ25CLHVCQUF1QjtnQkFDdkIsaUJBQWlCO2FBQ3BCO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILFNBQVMsRUFBRSxLQUFLO1lBRWhCLE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7Ozs7bUJBV0c7Z0JBQ0gsU0FBUyxFQUFFLE1BQU07Z0JBRWpCOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxJQUFJLEVBQUUseUJBQXlCO2FBQ2xDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsV0FBVztnQkFDWCxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxPQUFPO2dCQUNQLFFBQVE7Z0JBQ1IsT0FBTztnQkFDUCxRQUFRO2FBQ1g7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFFVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxjQUFjLENBQUM7WUFDL0QsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUFsT0QsNEJBa09DIn0=