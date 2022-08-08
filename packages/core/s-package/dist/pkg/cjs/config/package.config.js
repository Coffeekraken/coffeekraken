"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    return {
        /**
         * @name            manager
         * @namespace       config.package
         * @type            String
         * @values          npm | yarn
         * @default         npm
         *
         * Specify the package manager you want to use. Can be "npm" or "yarn"
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        manager: 'npm',
        /**
         * @name            rootDir
         * @namespace       config.package
         * @type            String
         * @default         [config.storage.package.rootDir]
         *
         * Specify a directory from where to search for files to exports using the `glob` config
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get rootDir() {
            return api.config.storage.package.rootDir;
        },
        readme: {
            /**
             * @name            path
             * @namespace       config.package.readme
             * @type            String
             * @default         [config.storage.package.rootDir]/README.md
             *
             * Specify the path to the README file
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get path() {
                return `${api.this.rootDir}/README.md`;
            },
        },
        /**
         * @name            defaultPackageJson
         * @namespace       config.package.exports
         * @type            Object
         * @default
         *
         * Specify some default packages you want to install when you run `sugar package.install`
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        defaultPackageJson: {
            scripts: {
                dev: 'sugar dev',
                prod: 'sugar prod',
                build: 'sugar build',
            },
            dependencies: {
                get '@coffeekraken/sugar'() {
                    const json = JSON.parse(fs_1.default
                        .readFileSync(`${(0, packageRoot_1.default)((0, dirname_1.default)())}/package.json`)
                        .toString());
                    return `^${json.version}`;
                },
            },
        },
        checkDependencies: {
            /**
             * @name            dirs
             * @namespace       config.package.checkDependencies
             * @type            String
             * @default         ['dist/** /exports.js']
             *
             * Specify some directories in which to check for dependencies issues, etc...
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dirs() {
                return [
                    api.config.storage.src.jsDir,
                    api.config.storage.src.nodeDir,
                    api.config.storage.src.pagesDir,
                    api.config.storage.src.configDir,
                ];
            },
            /**
             * @name            packagesMap
             * @namespace       config.package.checkDependencies
             * @type            String
             * @default         {'^@coffeekraken/'}
             *
             * Specify some patterns for packages you want to add in package.json without installing them.
             * This is usefull for monorepo.
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            packagesMap: {
                '^@coffeekraken/': '^2.0.0',
            },
        },
        exports: {
            /**
             * @name            glob
             * @namespace       config.package.exports
             * @type            String
             * @default         ['dist/** /exports.js']
             *
             * Specify a glob pattern relative to the "rootDir" to specify files you want to exports in your package.json
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            glob: ['dist/**/exports.js'],
            /**
             * @name           folderModuleMap
             * @namespace       config.package.exports
             * @type            String
             * @default         ['esm']
             *
             * Specify some folders you want to map to a specific package type like "import" or "require".
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            folderModuleMap: {
                esm: 'import',
                cjs: 'require',
            },
            /**
             * @name           folderPlatformMap
             * @namespace       config.package.exports
             * @type            String
             * @default         ['esm']
             *
             * Specify some folders you want to map to a specific platform like "node" or "browser", etc...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            folderPlatformMap: {
                node: 'node',
                shared: 'shared',
                js: 'js',
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELDRGQUFzRTtBQUN0RSw0Q0FBc0I7QUFFdEIsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQztRQUVELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLElBQUk7Z0JBQ0osT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLENBQUM7WUFDM0MsQ0FBQztTQUNKO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGtCQUFrQixFQUFFO1lBQ2hCLE9BQU8sRUFBRTtnQkFDTCxHQUFHLEVBQUUsV0FBVztnQkFDaEIsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUkscUJBQXFCO29CQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUNuQixZQUFJO3lCQUNDLFlBQVksQ0FDVCxHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxlQUFlLENBQy9DO3lCQUNBLFFBQVEsRUFBRSxDQUNsQixDQUFDO29CQUNGLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzlCLENBQUM7YUFDSjtTQUNKO1FBRUQsaUJBQWlCLEVBQUU7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU87b0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUs7b0JBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO29CQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtvQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7aUJBQ25DLENBQUM7WUFDTixDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsUUFBUTthQUM5QjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBRTVCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxlQUFlLEVBQUU7Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLFNBQVM7YUFDakI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEVBQUUsRUFBRSxJQUFJO2FBQ1g7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBdktELDRCQXVLQyJ9