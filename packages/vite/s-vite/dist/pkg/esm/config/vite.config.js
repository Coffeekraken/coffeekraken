var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __dirname } from '@coffeekraken/sugar/fs';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
export function preprocess(api) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('vite.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(api.this, config);
    });
}
export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return defineConfig({
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
            __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/plainTextPlugin`),
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
        build: {
            lib: {
                /**
                 * @name          entry
                 * @namespace     config.vite.build.lib
                 * @type          String
                 * @default      [config.storage.src.jsDir]/index.ts
                 *
                 * Specify the entry file for a "lib" build
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get entry() {
                    return `${api.config.storage.src.jsDir}/index.ts`;
                },
                /**
                 * @name          name
                 * @namespace     config.vite.build.lib
                 * @type          String
                 * @default      index
                 *
                 * Specify the entry name for a "lib" build
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                name: 'index',
            },
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
            __path.resolve(`${__dirname()}/../node/rewrites/handlebars`),
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
                __path.resolve(`${__dirname()}/../node/test/globalSetup`),
            ],
            watchExclude: [
                ...configDefaults.watchExclude,
                '**/node_modules/**',
                '**/dist/**',
                '**/__tests__.wip/**',
                '**/__wip__/**',
                // '**/sugar/**',
            ],
            exclude: [
                ...configDefaults.exclude,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRzs7O1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsT0FBTyxZQUFZLENBQUM7UUFDaEI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksSUFBSTtZQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxHQUFHO1FBRVQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxPQUFPO1FBRWpCOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsSUFBSSxFQUFFLGFBQWE7UUFDbkIsYUFBYTtRQUNiLGlDQUFpQztRQUNqQyxlQUFlO1FBQ2Ysc0JBQXNCO1FBRXRCLGNBQWM7UUFDZCxnQ0FBZ0M7UUFDaEMsc0RBQXNEO1FB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