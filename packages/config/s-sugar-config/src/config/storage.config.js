import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
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
         * @since         2.0.0
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
         * @default         [config.storage.package.rootDir]/serve
         *
         * Configure where is located the "serve" folder in which are stored usually the "distribution" files like production css, js, images, etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: `/dist`,
        'rootDir@dev': '/src',
        /**
         * @name            jsDir
         * @namespace       config.storage.serve
         * @type            String
         * @default         /dist/js
         *
         * Configure where is located the javascript/typescript served files
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        jsDir: `/dist/js`,
        'jsDir@dev': `/src/js`,
        /**
         * @name            cssDir
         * @namespace       config.storage.serve
         * @type            String
         * @default         /dist/css
         *
         * Configure where is located the css served files
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        cssDir: `/dist/css`,
        'cssDir@dev': `/src/css`,
        /**
         * @name            fontsDir
         * @namespace       config.storage.serve
         * @type            String
         * @default         /dist/fonts
         *
         * Configure where is located the fonts served files
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        fontsDir: `/dist/fonts`,
        'fontsDir@dev': `/src/fonts`,
        /**
         * @name            imgDir
         * @namespace       config.storage.serve
         * @type            String
         * @default         /dist/img
         *
         * Configure where is located the images served files
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        imgDir: `/dist/img`,
        'imgDir@dev': `/src/img`
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
        '**/node_modules/**'
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RCxlQUFlO0lBRWIsT0FBTyxFQUFFO1FBRVA7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRSxFQUFFO1FBRTdCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUseUNBQXlDO1FBRW5EOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUseUNBQXlDO1FBRW5EOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsd0NBQXdDO1FBRWhEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxjQUFjLEVBQUUsK0NBQStDO0tBRWhFO0lBRUQsS0FBSyxFQUFFO1FBQ0w7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFO0tBQ3pDO0lBRUQsR0FBRyxFQUFFO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxzQ0FBc0M7UUFFL0M7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxpQ0FBaUM7UUFFeEM7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxtQ0FBbUM7UUFFNUM7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxrQ0FBa0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxrQ0FBa0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxrQ0FBa0M7UUFFMUM7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7S0FDL0M7SUFFRCxJQUFJLEVBQUU7UUFFSjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLHVDQUF1QztRQUVoRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLGtDQUFrQztRQUV6Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLG9DQUFvQztRQUU3Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLG1DQUFtQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLG1DQUFtQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLHFDQUFxQztRQUUvQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLHFDQUFxQztRQUUvQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLG1DQUFtQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLHFDQUFxQztLQUVoRDtJQUVELEtBQUssRUFBRTtRQUVMOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUUsT0FBTztRQUNoQixhQUFhLEVBQUUsTUFBTTtRQUVyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsS0FBSyxFQUFFLFVBQVU7UUFDakIsV0FBVyxFQUFFLFNBQVM7UUFFdEI7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSxXQUFXO1FBQ25CLFlBQVksRUFBRSxVQUFVO1FBRXhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsYUFBYTtRQUN2QixjQUFjLEVBQUUsWUFBWTtRQUU1Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLFdBQVc7UUFDbkIsWUFBWSxFQUFFLFVBQVU7S0FFekI7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sRUFBRTtRQUNQLFdBQVc7UUFDWCxjQUFjO1FBQ2QsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLHFCQUFxQjtRQUNyQixVQUFVO1FBQ1Ysb0JBQW9CO0tBQ3JCO0NBQ0YsQ0FBQyJ9