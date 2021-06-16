import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
export default {
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
     * @name            sugarDir
     * @namespace       config.storage
     * @type            String
     * @default         ${__packageRoot()}
     *
     * Configure where is located sugar package directory. Usually in the node_modules/@coffeekraken/sugar folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    sugarDir: `${__packageRoot(__dirname)}`,
    /**
     * @name            localDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/.local
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    localDir: `[config.storage.rootDir]/.local`,
    /**
     * @name            srcDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/src
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    srcDir: `[config.storage.rootDir]/src`,
    /**
     * @name            distDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/src
     *
     * Configure where is located the ".local" folder in which are stored usually some things like cache, etc...
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    distDir: `[config.storage.rootDir]/dist`,
    /**
     * @name            cacheDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.localDir]/cache
     *
     * Configure where is located the "cache" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    cacheDir: `[config.storage.localDir]/cache`,
    /**
     * @name            tmpDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.localDir]/cache
     *
     * Configure where is located the "temp" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    tmpDir: `[config.storage.localDir]/temp`,
    /**
     * @name            nodeModulesDir
     * @namespace       config.storage
     * @type            String
     * @default         [config.storage.rootDir]/node_modules
     *
     * Configure where is located the "node_modules" folder
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    nodeModulesDir: `[config.storage.rootDir]/node_modules`,
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
        '**/__tests__.wip/**'
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUV0RSxlQUFlO0lBQ2I7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSxHQUFHLGFBQWEsRUFBRSxFQUFFO0lBRTdCOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFFdkM7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxpQ0FBaUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sRUFBRSw4QkFBOEI7SUFFdEM7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwrQkFBK0I7SUFFeEM7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxpQ0FBaUM7SUFFM0M7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sRUFBRSxnQ0FBZ0M7SUFFeEM7Ozs7Ozs7Ozs7T0FVRztJQUNILGNBQWMsRUFBRSx1Q0FBdUM7SUFFdkQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLEVBQUU7UUFDUCxXQUFXO1FBQ1gsY0FBYztRQUNkLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLGlCQUFpQjtRQUNqQixxQkFBcUI7S0FDdEI7Q0FDRixDQUFDIn0=