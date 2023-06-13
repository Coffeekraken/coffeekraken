"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const fs_1 = require("@coffeekraken/sugar/fs");
const load_1 = require("@coffeekraken/sugar/load");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = __importDefault(require("path"));
const config_1 = require("vitest/config");
const package_json_1 = __importDefault(require("@coffeekraken/sugar/package.json"));
function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield (0, load_1.__loadConfigFile)('vite.config.js'))) !== null && _a !== void 0 ? _a : {};
        return (0, object_1.__deepMerge)(api.this, config);
    });
}
exports.preprocess = preprocess;
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    const optimizeDepsInclude = [];
    // const packageJsonPath = `${api.config.storage.package.rootDir}/package.json`;
    // if (__fs.existsSync(packageJsonPath)) {
    //     const packageJson = __readJsonSync(packageJsonPath),
    //         deps = {
    //             ...(packageJson.dependencies ?? {}),
    //             ...(packageJson.devDependencies ?? {}),
    //         };
    //     for (let [packageName, version] of Object.entries(deps)) {
    //         if (
    //             !optimizeDepsInclude.includes(packageName) &&
    //             ![
    //                 '@coffeekraken/sugar',
    //                 '@coffeekraken/cli',
    //                 '@coffeekraken/s-kitchen',
    //                 '@coffeekraken/s-glob',
    //                 '@coffeekraken/s-docblock',
    //                 '@coffeekraken/s-docmap',
    //                 '@coffeekraken/s-favicon-builder',
    //                 '@coffeekraken/s-timer',
    //                 '@coffeekraken/s-vite-sugar-plugin',
    //             ].includes(packageName) &&
    //             packageName.startsWith('@coffeekraken/')
    //         ) {
    //             // optimizeDepsInclude.push(packageName);
    //         }
    //     }
    // }
    for (let [path, value] of Object.entries(package_json_1.default.exports)) {
        if ([
            'cli',
            'coffeekraken',
            'composer',
            'error',
            'exec',
            'github',
            'hash',
            'load',
            'monorepo',
            'npm',
            'network',
            'og',
            'path',
            'php',
            'process',
            'project',
            'terminal',
            'fs',
            'is',
        ].includes(path.replace('./', ''))) {
            continue;
        }
        optimizeDepsInclude.push(`@coffeekraken/sugar/${path.replace('./', '')}`);
    }
    return (0, config_1.defineConfig)({
        /**
         * @name          root
         * @namespace     config.vite
         * @type          String
         * @default      [config.storage.package.rootDir]
         *
         * Specify the root directory to work with
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get root() {
            return api.config.storage.package.rootDir;
        },
        /**
         * @name          base
         * @namespace     config.vite
         * @type          String
         * @default      /
         *
         * Specify the base directory to work with
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        base: '/',
        /**
         * @name          logLevel
         * @namespace     config.vite
         * @type          String
         * @default      error
         *
         * Specify the log level
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        logLevel: 'error',
        /**
         * @name          mode
         * @namespace     config.vite
         * @type          String
         * @values        development, production
         * @default      development
         *
         * Specify the mode to work with. Can be "development" or "production"
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        mode: 'development',
        resolve: {
            dedupe: ['react', 'react-dom'],
            // preserveSymlinks: true,
            alias: {
            /**
             * @name          vue
             * @namespace     config.vite.resolve.alias
             * @type          String
             * @default      vue/dist/vue.esm-bundler.js
             *
             * Specify the esm builder alias resolution path
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            // vue: 'vue/dist/vue.esm-bundler.js',
            // vue: 'vue/dist/vue.global.js',
            },
        },
        /**
         * @name          plugins
         * @namespace     config.vite
         * @type          String[]
         * @default      [__path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`), __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`)]
         *
         * Specify the plugins to use
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        plugins: [
            path_1.default.resolve(`${(0, fs_1.__dirname)()}/../node/plugins/sugarPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
            path_1.default.resolve(`${(0, fs_1.__dirname)()}/../node/plugins/postcssPlugin`),
            path_1.default.resolve(`${(0, fs_1.__dirname)()}/../node/plugins/plainTextPlugin`),
        ],
        /**
         * @name          publicDir
         * @namespace     config.vite
         * @type          String
         * @default      [config.storage.src.rootDir]/public
         *
         * Specify the public directory to use
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get publicDir() {
            return api.config.storage.src.publicDir;
        },
        /**
         * @name          cacheDir
         * @namespace     config.vite
         * @type          String
         * @default      [config.storage.package.cacheDir]/vite'
         *
         * Specify the cache directory to use
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get cacheDir() {
            return `${api.config.storage.package.cacheDir}/vite`;
        },
        /**
         * @name          clearScreen
         * @namespace     config.vite
         * @type          Boolean
         * @default      false
         *
         * Specify if the terminal screen has to be cleared or not
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        clearScreen: false,
        optimizeDeps: {
            /**
             * @name          exclude
             * @namespace     config.vite.optimizeDeps
             * @type          String[]
             * @default      false
             *
             * Specify some packages to exclude from build
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            // exclude: ['static'],
            entries: ['index.html'],
            include: optimizeDepsInclude,
            exclude: ['fsevents'],
            esbuildOptions: {
                platform: 'browser',
                // mainFields: ['module', 'main'],
                resolveExtensions: ['.js', '.ts'],
            },
        },
        build: {
            /**
             * @name          outDir
             * @namespace     config.vite.build
             * @type          String
             * @default      [config.storage.dist.jsDir]
             *
             * Specify the output directory for the build
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outDir() {
                return api.config.storage.dist.jsDir;
            },
            /**
             * @name          assetsDir
             * @namespace     config.vite.build
             * @type          String
             * @default      '''
             *
             * Specify the output assets directory for the build relative to the "outDir"
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get assetsDir() {
                return '';
            },
        },
        server: {
            // watch: {
            //     usePolling: true
            //     },
            /**
             * @name          host
             * @namespace     config.vite.server
             * @type          String
             * @default      0.0.0.0
             *
             * Specify the hostname for the vite server
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            host: '0.0.0.0',
            /**
             * @name          post
             * @namespace     config.vite.server
             * @type          Number
             * @default      3000
             *
             * Specify the port for the vite server
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 3000,
            /**
             * @name          hostname
             * @namespace     config.vite.server
             * @type          String
             * @default      http://[config.vite.server.host]:[config.vite.server.port]
             *
             * Specify the full hostname for the vite server
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get hostname() {
                return `http://${api.config.vite.server.host}:${api.config.vite.server.port}`;
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cross-Origin-Embedder-Policy': 'credentialless',
                'Cross-Origin-Opener-Policy': 'same-origin',
            },
            proxy: {
                // all exported css in the /css/(partials|lod) folder
                // @TODO            find a better way...
                '^\\/dist\\/css\\/(partials|lod)\\/.*\\.css(\\?.*)?$': {
                    target: `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`,
                    changeOrigin: true,
                    rewrite: (path) => {
                        return path;
                    },
                },
                // all files that match /dist/...css|ts|tsx|etc...
                // have to target the "src" directory
                '^\\/dist\\/.*(\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs)(\\?.*)?$': {
                    target: `http://localhost:3000`,
                    changeOrigin: true,
                    rewrite: (path) => {
                        return path.replace(/\/dist\//, '/src/');
                    },
                },
                get '^.*\\.(js(?!on)|css)(?!.map)(?!\\?)(.+){1,99999}$'() {
                    return {
                        target: `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`,
                        changeOrigin: true,
                        rewrite: (path) => {
                            return path;
                        },
                    };
                },
                // all none css, js, ts, etc...
                // have to go to frontend server
                get '^\\/dist\\/(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs).)*(\\?.*)?$'() {
                    return {
                        target: `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`,
                        changeOrigin: true,
                        rewrite: (path) => {
                            return path;
                        },
                    };
                },
                get '^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|\\@fs|\\@id|__vite_ping|index.html).)*$'() {
                    return {
                        target: `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`,
                        changeOrigin: true,
                        rewrite: (path) => {
                            return path;
                        },
                    };
                },
            },
        },
        rewrites: [
            path_1.default.resolve(`${(0, fs_1.__dirname)()}/../node/rewrites/handlebars`),
        ],
        test: {
            /**
             * @name          dir
             * @namespace     config.vite.test
             * @type          String
             * @default      [config.storage.src.rootDir]
             *
             * Specify the directory to include for the tests
             *
             * @see         https://vitest.dev/config/#configuration
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dir() {
                return api.config.storage.src.rootDir;
            },
            include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
            setupFiles: [
                path_1.default.resolve(`${(0, fs_1.__dirname)()}/../node/test/globalSetup`),
            ],
            watchExclude: [
                ...config_1.configDefaults.watchExclude,
                '**/node_modules/**',
                '**/dist/**',
                '**/__tests__.wip/**',
                '**/__wip__/**',
                // '**/sugar/**',
            ],
            exclude: [
                ...config_1.configDefaults.exclude,
                '**/node_modules/**',
                '**/dist/**',
                '**/__tests__.wip/**',
                '**/__wip__/**',
                // '**/sugar/**',
            ],
            deps: {
                inline: true,
            },
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFtRDtBQUNuRCxtREFBNEQ7QUFDNUQsdURBQXlEO0FBQ3pELGdEQUEwQjtBQUMxQiwwQ0FBNkQ7QUFFN0Qsb0ZBQTBGO0FBRTFGLFNBQXNCLFVBQVUsQ0FBQyxHQUFHOzs7UUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBQSxDQUFDLE1BQU0sSUFBQSx1QkFBZ0IsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNoRSxPQUFPLElBQUEsb0JBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQUhELGdDQUdDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUV4QyxNQUFNLG1CQUFtQixHQUFhLEVBQUUsQ0FBQztJQUV6QyxnRkFBZ0Y7SUFDaEYsMENBQTBDO0lBQzFDLDJEQUEyRDtJQUMzRCxtQkFBbUI7SUFDbkIsbURBQW1EO0lBQ25ELHNEQUFzRDtJQUN0RCxhQUFhO0lBQ2IsaUVBQWlFO0lBQ2pFLGVBQWU7SUFDZiw0REFBNEQ7SUFDNUQsaUJBQWlCO0lBQ2pCLHlDQUF5QztJQUN6Qyx1Q0FBdUM7SUFDdkMsNkNBQTZDO0lBQzdDLDBDQUEwQztJQUMxQyw4Q0FBOEM7SUFDOUMsNENBQTRDO0lBQzVDLHFEQUFxRDtJQUNyRCwyQ0FBMkM7SUFDM0MsdURBQXVEO0lBQ3ZELHlDQUF5QztJQUN6Qyx1REFBdUQ7SUFDdkQsY0FBYztJQUNkLHdEQUF3RDtJQUN4RCxZQUFZO0lBQ1osUUFBUTtJQUNSLElBQUk7SUFFSixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNsRSxJQUNJO1lBQ0ksS0FBSztZQUNMLGNBQWM7WUFDZCxVQUFVO1lBQ1YsT0FBTztZQUNQLE1BQU07WUFDTixRQUFRO1lBQ1IsTUFBTTtZQUNOLE1BQU07WUFDTixVQUFVO1lBQ1YsS0FBSztZQUNMLFNBQVM7WUFDVCxJQUFJO1lBQ0osTUFBTTtZQUNOLEtBQUs7WUFDTCxTQUFTO1lBQ1QsU0FBUztZQUNULFVBQVU7WUFDVixJQUFJO1lBQ0osSUFBSTtTQUNQLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ3BDO1lBQ0UsU0FBUztTQUNaO1FBQ0QsbUJBQW1CLENBQUMsSUFBSSxDQUNwQix1QkFBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FDbEQsQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFBLHFCQUFZLEVBQUM7UUFDaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksSUFBSTtZQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxHQUFHO1FBRVQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxPQUFPO1FBRWpCOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFLGFBQWE7UUFDbkIsT0FBTyxFQUFFO1lBQ0wsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztZQUM5QiwwQkFBMEI7WUFDMUIsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILHNDQUFzQztZQUN0QyxpQ0FBaUM7YUFDcEM7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTCxjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxjQUFTLEdBQUUsOEJBQThCLENBQUM7WUFDNUQsaUVBQWlFO1lBQ2pFLGdFQUFnRTtZQUNoRSxpRUFBaUU7WUFDakUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUEsY0FBUyxHQUFFLGdDQUFnQyxDQUFDO1lBQzlELGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLGNBQVMsR0FBRSxrQ0FBa0MsQ0FBQztTQUNuRTtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFNBQVM7WUFDVCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDNUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLFFBQVE7WUFDUixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsT0FBTyxDQUFDO1FBQ3pELENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUFFLEtBQUs7UUFDbEIsWUFBWSxFQUFFO1lBQ1Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILHVCQUF1QjtZQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFFdkIsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDckIsY0FBYyxFQUFFO2dCQUNaLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixrQ0FBa0M7Z0JBQ2xDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzthQUNwQztTQUNKO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1NBQ0o7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXO1lBQ1gsdUJBQXVCO1lBQ3ZCLFNBQVM7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxRQUFRO2dCQUNSLE9BQU8sVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRixDQUFDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGdCQUFnQjtnQkFDaEQsNEJBQTRCLEVBQUUsYUFBYTthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDSCxxREFBcUQ7Z0JBQ3JELHdDQUF3QztnQkFDeEMscURBQXFELEVBQUU7b0JBQ25ELE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3hGLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDZCxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjtnQkFDRCxrREFBa0Q7Z0JBQ2xELHFDQUFxQztnQkFDckMsdUVBQXVFLEVBQ25FO29CQUNJLE1BQU0sRUFBRSx1QkFBdUI7b0JBQy9CLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM3QyxDQUFDO2lCQUNKO2dCQUNMLElBQUksbURBQW1EO29CQUNuRCxPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hGLFlBQVksRUFBRSxJQUFJO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDZCxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7Z0JBQ0QsK0JBQStCO2dCQUMvQixnQ0FBZ0M7Z0JBQ2hDLElBQUksNkVBQTZFO29CQUM3RSxPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hGLFlBQVksRUFBRSxJQUFJO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDZCxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7Z0JBQ0QsSUFBSSw2R0FBNkc7b0JBQzdHLE9BQU87d0JBQ0gsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTt3QkFDeEYsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNkLE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1NBQ0o7UUFDRCxRQUFRLEVBQUU7WUFDTixjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxjQUFTLEdBQUUsOEJBQThCLENBQUM7U0FDL0Q7UUFDRCxJQUFJLEVBQUU7WUFDRjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILElBQUksR0FBRztnQkFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDMUMsQ0FBQztZQUVELE9BQU8sRUFBRSxDQUFDLDJDQUEyQyxDQUFDO1lBRXRELFVBQVUsRUFBRTtnQkFDUixjQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBQSxjQUFTLEdBQUUsMkJBQTJCLENBQUM7YUFDNUQ7WUFFRCxZQUFZLEVBQUU7Z0JBQ1YsR0FBRyx1QkFBYyxDQUFDLFlBQVk7Z0JBQzlCLG9CQUFvQjtnQkFDcEIsWUFBWTtnQkFDWixxQkFBcUI7Z0JBQ3JCLGVBQWU7Z0JBQ2YsaUJBQWlCO2FBQ3BCO1lBRUQsT0FBTyxFQUFFO2dCQUNMLEdBQUcsdUJBQWMsQ0FBQyxPQUFPO2dCQUN6QixvQkFBb0I7Z0JBQ3BCLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLGlCQUFpQjthQUNwQjtZQUNELElBQUksRUFBRTtnQkFDRixNQUFNLEVBQUUsSUFBSTthQUNmO1NBQ0o7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBaFpELDRCQWdaQyJ9