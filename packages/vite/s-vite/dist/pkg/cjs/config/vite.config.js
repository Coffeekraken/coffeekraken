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
        // resolve: {
        //     // preserveSymlinks: true,
        //     alias: {
        //         static: '',
        //         /**
        //          * @name          vue
        //          * @namespace     config.vite.resolve.alias
        //          * @type          String
        //          * @default      vue/dist/vue.esm-bundler.js
        //          *
        //          * Specify the esm builder alias resolution path
        //          *
        //          * @since       2.0.0
        //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        //          */
        //         vue: 'vue/dist/vue.esm-bundler.js',
        //     },
        // },
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
            esbuildOptions: {
                // mainFields: ['module', 'main'],
                resolveExtensions: ['.js', '.ts'],
            },
        },
        dedupe: ['react', 'react-dom'],
        build: {
            // lib: {
            //     /**
            //      * @name          entry
            //      * @namespace     config.vite.build.lib
            //      * @type          String
            //      * @default      [config.storage.src.jsDir]/index.ts
            //      *
            //      * Specify the entry file for a "lib" build
            //      *
            //      * @since       2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     get entry() {
            //         return `${api.config.storage.src.jsDir}/index.ts`;
            //     },
            //     /**
            //      * @name          name
            //      * @namespace     config.vite.build.lib
            //      * @type          String
            //      * @default      index
            //      *
            //      * Specify the entry name for a "lib" build
            //      *
            //      * @since       2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     name: 'index',
            // },
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
            rollupOptions: {},
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
            proxy: {
                // all exported css in the /css/exports folder
                // @TODO            find a better way...
                '^\\/dist\\/css\\/partials\\/.*\\.css$': {
                    target: `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`,
                    changeOrigin: true,
                    rewrite: (path) => {
                        return path;
                    },
                },
                // all files that match /dist/...css|ts|tsx|etc...
                // have to target the "src" directory
                '^\\/dist\\/.*(\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs)$': {
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
                get '^\\/dist\\/(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs).)*$'() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFtRDtBQUNuRCxtREFBNEQ7QUFDNUQsdURBQXlEO0FBQ3pELGdEQUEwQjtBQUMxQiwwQ0FBNkQ7QUFFN0QsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxJQUFBLHVCQUFnQixFQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sSUFBQSxvQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBSEQsZ0NBR0M7QUFFRCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU8sSUFBQSxxQkFBWSxFQUFDO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsR0FBRztRQUVUOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsT0FBTztRQUVqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRSxhQUFhO1FBQ25CLGFBQWE7UUFDYixpQ0FBaUM7UUFDakMsZUFBZTtRQUNmLHNCQUFzQjtRQUV0QixjQUFjO1FBQ2QsZ0NBQWdDO1FBQ2hDLHNEQUFzRDtRQUN0RCxtQ0FBbUM7UUFDbkMsdURBQXVEO1FBQ3ZELGFBQWE7UUFDYiwyREFBMkQ7UUFDM0QsYUFBYTtRQUNiLGdDQUFnQztRQUNoQywwR0FBMEc7UUFDMUcsY0FBYztRQUNkLDhDQUE4QztRQUM5QyxTQUFTO1FBQ1Qs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