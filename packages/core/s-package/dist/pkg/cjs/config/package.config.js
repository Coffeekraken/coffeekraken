"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                '@coffeekraken/sugar': '^2.0.0',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxPQUFPLEVBQUUsS0FBSztRQUVkOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLE9BQU87WUFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQztRQUVELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLElBQUk7Z0JBQ0osT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLENBQUM7WUFDM0MsQ0FBQztTQUNKO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILGtCQUFrQixFQUFFO1lBQ2hCLE9BQU8sRUFBRTtnQkFDTCxHQUFHLEVBQUUsV0FBVztnQkFDaEIsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLEtBQUssRUFBRSxhQUFhO2FBQ3ZCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHFCQUFxQixFQUFFLFFBQVE7YUFDbEM7U0FDSjtRQUVELGlCQUFpQixFQUFFO1lBQ2Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPO29CQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLO29CQUM1QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztvQkFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVE7b0JBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO2lCQUNuQyxDQUFDO1lBQ04sQ0FBQztZQUVEOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsV0FBVyxFQUFFO2dCQUNULGlCQUFpQixFQUFFLFFBQVE7YUFDOUI7U0FDSjtRQUVELE9BQU8sRUFBRTtZQUNMOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztZQUU1Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsZUFBZSxFQUFFO2dCQUNiLEdBQUcsRUFBRSxRQUFRO2dCQUNiLEdBQUcsRUFBRSxTQUFTO2FBQ2pCO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILGlCQUFpQixFQUFFO2dCQUNmLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixFQUFFLEVBQUUsSUFBSTthQUNYO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQTlKRCw0QkE4SkMifQ==