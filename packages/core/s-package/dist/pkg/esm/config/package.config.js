export default function (api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSDs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sRUFBRSxLQUFLO1FBRWQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBRUQsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksQ0FBQztZQUMzQyxDQUFDO1NBQ0o7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsa0JBQWtCLEVBQUU7WUFDaEIsT0FBTyxFQUFFO2dCQUNMLEdBQUcsRUFBRSxXQUFXO2dCQUNoQixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLGFBQWE7YUFDdkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YscUJBQXFCLEVBQUUsUUFBUTthQUNsQztTQUNKO1FBRUQsaUJBQWlCLEVBQUU7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU87b0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUs7b0JBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO29CQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtvQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7aUJBQ25DLENBQUM7WUFDTixDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsUUFBUTthQUM5QjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBRTVCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxlQUFlLEVBQUU7Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLFNBQVM7YUFDakI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEVBQUUsRUFBRSxJQUFJO2FBQ1g7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=