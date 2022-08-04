"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
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
             * @default         ${__packageRoot()}/docmap.json
             *
             * Specify the path of the docmap.json source file to read
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: `${(0, packageRoot_1.default)()}/docmap.json`,
            /**
             * @name          sort
             * @namespace     config.docmap.read
             * @type          String
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
             * @type          String
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLDZIQUF1RztBQUV2RyxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUcsSUFBQSxxQkFBYSxHQUFFLGNBQWM7WUFFdkM7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFFdkI7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxRQUFRLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN2QztRQUVELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLFVBQVUsQ0FBQztZQUMzRCxDQUFDO1NBQ0o7UUFFRCxlQUFlLEVBQUU7WUFDYjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWSxDQUFDO1lBQzdELENBQUM7U0FDSjtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7Ozs7O2VBYUc7WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRztnQkFDSCwwQkFBMEI7Z0JBQzFCLHlCQUF5QixJQUFBLGtDQUEwQixFQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDeEQsR0FBRyxDQUNOLEdBQUc7Z0JBQ0osZUFBZTthQUNsQjtZQUVEOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLG1CQUFtQjtnQkFDbkIsdUJBQXVCO2dCQUN2QixpQkFBaUI7YUFDcEI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLEtBQUs7WUFFaEIsT0FBTyxFQUFFO2dCQUNMOzs7Ozs7Ozs7OzttQkFXRztnQkFDSCxTQUFTLEVBQUUsTUFBTTtnQkFFakI7Ozs7Ozs7Ozs7O21CQVdHO2dCQUNILElBQUksRUFBRSx5QkFBeUI7YUFDbEM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUk7Z0JBQ0osTUFBTTtnQkFDTixJQUFJO2dCQUNKLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsYUFBYTtnQkFDYixXQUFXO2dCQUNYLFFBQVE7Z0JBQ1IsU0FBUztnQkFDVCxXQUFXO2dCQUNYLE9BQU87Z0JBQ1AsUUFBUTtnQkFDUixPQUFPO2dCQUNQLFFBQVE7YUFDWDtZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUVWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE9BQU87Z0JBQ1AsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLGNBQWMsQ0FBQztZQUMvRCxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQWxPRCw0QkFrT0MifQ==