import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';
export default function (env) {
    if (env.platform !== 'node')
        return;
    return {
        system: {
            /**
             * @name            tmpDir
             * @namespace       config.storage.system
             * @type            String
             *
             * Configure where is located the system "temp" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            tmpDir: __systemTmpDir(),
        },
        package: {
            /**
             * @name            rootDir
             * @namespace       config.storage
             * @type            String
             * @default         ${__packageRoot()}
             *
             * Configure the root directory. Usually the package root dir
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rootDir: `${__packageRoot()}`,
            /**
             * @name            localDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.rootDir]/.local
             *
             * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            localDir: `[config.storage.package.rootDir]/.local`,
            /**
             * @name            cacheDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDir]/cache
             *
             * Configure where is located the "cache" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            cacheDir: `[config.storage.package.localDir]/cache`,
            /**
             * @name            tmpDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.localDir]/cache
             *
             * Configure where is located the "temp" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            tmpDir: `[config.storage.package.localDir]/temp`,
            /**
             * @name            nodeModulesDir
             * @namespace       config.storage.package
             * @type            String
             * @default         [config.storage.package.rootDir]/node_modules
             *
             * Configure where is located the "node_modules" folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            nodeModulesDir: `[config.storage.package.rootDir]/node_modules`,
        },
        sugar: {
            /**
             * @name            rootDir
             * @namespace       config.storage
             * @type            String
             * @default         ${__packageRoot()}
             *
             * Configure where is located sugar package directory. Usually in the node_modules/@coffeekraken/sugar folder
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rootDir: `${__packageRoot(__dirname())}`,
        },
        src: {
            /**
             * @name            rootDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.package.rootDir]/src
             *
             * Configure where is located the "src" directory where are stored all the sources like js, ts, css, images, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rootDir: `[config.storage.package.rootDir]/src`,
            /**
             * @name            jsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/js
             *
             * Configure where is located the javascript/typescript source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            jsDir: `[config.storage.src.rootDir]/js`,
            /**
             * @name            nodeDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/node
             *
             * Configure where is located the javascript/typescript node source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            nodeDir: `[config.storage.src.rootDir]/node`,
            /**
             * @name            cssDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/css
             *
             * Configure where is located the css source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            cssDir: `[config.storage.src.rootDir]/css`,
            /**
             * @name            docDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/doc
             *
             * Configure where is located the documentation markdown source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            docDir: `[config.storage.src.rootDir]/doc`,
            /**
             * @name            fontsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/fonts
             *
             * Configure where is located the fonts source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            fontsDir: `[config.storage.src.rootDir]/fonts`,
            /**
             * @name            iconsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/icons
             *
             * Configure where is located the icons source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            iconsDir: `[config.storage.src.rootDir]/icons`,
            /**
             * @name            imgDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/img
             *
             * Configure where is located the images source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            imgDir: `[config.storage.src.rootDir]/img`,
            /**
             * @name            viewsDir
             * @namespace       config.storage.src
             * @type            String
             * @default         [config.storage.src.rootDir]/views
             *
             * Configure where is located the views (blade, twig, etc...) source files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            viewsDir: `[config.storage.src.rootDir]/views`,
        },
        dist: {
            /**
             * @name            rootDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.package.rootDir]/dist
             *
             * Configure where is located the "dist" folder in which are stored usually the "distribution" files like production css, js, images, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rootDir: `[config.storage.package.rootDir]/dist`,
            /**
             * @name            jsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/js
             *
             * Configure where is located the javascript/typescript distribution files
             *
             * @since           2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            jsDir: `[config.storage.dist.rootDir]/js`,
            /**
             * @name            nodeDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/node
             *
             * Configure where is located the javascript/typescript node distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            nodeDir: `[config.storage.dist.rootDir]/node`,
            /**
             * @name            cssDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/css
             *
             * Configure where is located the css distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            cssDir: `[config.storage.dist.rootDir]/css`,
            /**
             * @name            docDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/doc
             *
             * Configure where is located the doc markdown distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            docDir: `[config.storage.dist.rootDir]/doc`,
            /**
             * @name            fontsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/fonts
             *
             * Configure where is located the fonts distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            fontsDir: `[config.storage.dist.rootDir]/fonts`,
            /**
             * @name            iconsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/icons
             *
             * Configure where is located the icons distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            iconsDir: `[config.storage.dist.rootDir]/icons`,
            /**
             * @name            imgDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/img
             *
             * Configure where is located the images distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            imgDir: `[config.storage.dist.rootDir]/img`,
            /**
             * @name            viewsDir
             * @namespace       config.storage.dist
             * @type            String
             * @default         [config.storage.dist.rootDir]/views
             *
             * Configure where is located the views (blade, twig, etc...) distribution files
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            viewsDir: `[config.storage.dist.rootDir]/views`,
        },
        serve: {
            /**
             * @name            rootDir
             * @namespace       config.storage.serve
             * @type            String
             * @default         /dist
             *
             * Configure where is located the "serve" folder in which are stored usually the "distribution" files like production css, js, images, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rootDir: `/dist`,
            '@dev': {
                /**
                 * @name            rootDir
                 * @namespace       config.storage.serve.env:dev
                 * @type            String
                 * @default         /src
                 *
                 * Configure where is located the "serve" folder in which are stored usually the "distribution" files like production css, js, images, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                rootDir: `/src`,
            },
        },
        /**
         * @name            exclude
         * @namespace       config.storage
         * @type            Array<String>
         *
         * Specify which file(s) or directory(ies) you want to exclude from the major part of the functions
         * like resolveGlob, SSugarJson.search, etc...
         * This accept globs.
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        exclude: [
            '**/bin/**',
            '**/.DS_Store',
            '**/__WIP__/**',
            '**/__wip__/**',
            '**/__TESTS/**',
            '**/__tests__/**',
            '**/__tests__.wip/**',
            '**/.*/**',
            '**/node_modules/**',
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLGNBQWMsTUFBTSw0Q0FBNEMsQ0FBQztBQUV4RSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSCxNQUFNLEVBQUU7WUFDSjs7Ozs7Ozs7O2VBU0c7WUFDSCxNQUFNLEVBQUUsY0FBYyxFQUFFO1NBQzNCO1FBQ0QsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRSxFQUFFO1lBRTdCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUUseUNBQXlDO1lBRW5EOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUUseUNBQXlDO1lBRW5EOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsd0NBQXdDO1lBRWhEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsK0NBQStDO1NBQ2xFO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFO1NBQzNDO1FBRUQsR0FBRyxFQUFFO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxzQ0FBc0M7WUFFL0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxpQ0FBaUM7WUFFeEM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxtQ0FBbUM7WUFFNUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxrQ0FBa0M7WUFFMUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxrQ0FBa0M7WUFFMUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxvQ0FBb0M7WUFFOUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxvQ0FBb0M7WUFFOUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxrQ0FBa0M7WUFFMUM7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxvQ0FBb0M7U0FDakQ7UUFFRCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLHVDQUF1QztZQUVoRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLGtDQUFrQztZQUV6Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLG9DQUFvQztZQUU3Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLG1DQUFtQztZQUUzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLG1DQUFtQztZQUUzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLHFDQUFxQztZQUUvQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLHFDQUFxQztZQUUvQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLG1DQUFtQztZQUUzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLHFDQUFxQztTQUNsRDtRQUVELEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsT0FBTztZQUVoQixNQUFNLEVBQUU7Z0JBQ0o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsT0FBTyxFQUFFLE1BQU07YUFDbEI7U0FDSjtRQUVEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsV0FBVztZQUNYLGNBQWM7WUFDZCxlQUFlO1lBQ2YsZUFBZTtZQUNmLGVBQWU7WUFDZixpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLFVBQVU7WUFDVixvQkFBb0I7U0FDdkI7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9