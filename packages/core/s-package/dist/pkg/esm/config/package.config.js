import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
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
                get '@coffeekraken/sugar'() {
                    const json = JSON.parse(__fs
                        .readFileSync(`${__packageRootDir(__dirname())}/package.json`)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTztRQUNIOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFLEtBQUs7UUFFZDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxPQUFPO1lBQ1AsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQzlDLENBQUM7UUFFRCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSxDQUFDO1lBQzNDLENBQUM7U0FDSjtRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxrQkFBa0IsRUFBRTtZQUNoQixPQUFPLEVBQUU7Z0JBQ0wsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLElBQUksRUFBRSxZQUFZO2dCQUNsQixLQUFLLEVBQUUsYUFBYTthQUN2QjtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLHFCQUFxQjtvQkFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDbkIsSUFBSTt5QkFDQyxZQUFZLENBQ1QsR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQ2xEO3lCQUNBLFFBQVEsRUFBRSxDQUNsQixDQUFDO29CQUNGLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzlCLENBQUM7YUFDSjtTQUNKO1FBRUQsaUJBQWlCLEVBQUU7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU87b0JBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUs7b0JBQzVCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO29CQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUTtvQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVM7aUJBQ25DLENBQUM7WUFDTixDQUFDO1lBRUQ7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxXQUFXLEVBQUU7Z0JBQ1QsaUJBQWlCLEVBQUUsUUFBUTthQUM5QjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDO1lBRTVCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxlQUFlLEVBQUU7Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsR0FBRyxFQUFFLFNBQVM7YUFDakI7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsaUJBQWlCLEVBQUU7Z0JBQ2YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLEVBQUUsRUFBRSxJQUFJO2FBQ1g7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=