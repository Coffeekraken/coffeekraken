var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __dirname } from '@coffeekraken/sugar/fs';
import { __loadConfigFile } from '@coffeekraken/sugar/load';
import { __deepMerge } from '@coffeekraken/sugar/object';
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
                // all exported css in the /css/exports folder
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE1BQU0sVUFBZ0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNoRSxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztDQUN4QztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU8sWUFBWSxDQUFDO1FBQ2hCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLElBQUk7WUFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsR0FBRztRQUVUOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsT0FBTztRQUVqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRTtZQUNMLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7WUFDOUIsMEJBQTBCO1lBQzFCLEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxzQ0FBc0M7WUFDdEMsaUNBQWlDO2FBQ3BDO1NBQ0o7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFO1lBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztZQUM1RCxpRUFBaUU7WUFDakUsZ0VBQWdFO1lBQ2hFLGlFQUFpRTtZQUNqRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLGdDQUFnQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsa0NBQWtDLENBQUM7U0FDbkU7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxTQUFTO1lBQ1QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQzVDLENBQUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxRQUFRO1lBQ1IsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLE9BQU8sQ0FBQztRQUN6RCxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFlBQVksRUFBRTtZQUNWOzs7Ozs7Ozs7O2VBVUc7WUFDSCx1QkFBdUI7WUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBRXZCLGNBQWMsRUFBRTtnQkFDWixrQ0FBa0M7Z0JBQ2xDLGlCQUFpQixFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQzthQUNwQztTQUNKO1FBRUQsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDO1NBQ0o7UUFDRCxNQUFNLEVBQUU7WUFDSixXQUFXO1lBQ1gsdUJBQXVCO1lBQ3ZCLFNBQVM7WUFDVDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLFNBQVM7WUFDZjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxRQUFRO2dCQUNSLE9BQU8sVUFBVSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsRixDQUFDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLDhCQUE4QixFQUFFLGdCQUFnQjtnQkFDaEQsNEJBQTRCLEVBQUUsYUFBYTthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDSCw4Q0FBOEM7Z0JBQzlDLHdDQUF3QztnQkFDeEMscURBQXFELEVBQUU7b0JBQ25ELE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3hGLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDZCxPQUFPLElBQUksQ0FBQztvQkFDaEIsQ0FBQztpQkFDSjtnQkFDRCxrREFBa0Q7Z0JBQ2xELHFDQUFxQztnQkFDckMsdUVBQXVFLEVBQ25FO29CQUNJLE1BQU0sRUFBRSx1QkFBdUI7b0JBQy9CLFlBQVksRUFBRSxJQUFJO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM3QyxDQUFDO2lCQUNKO2dCQUNMLElBQUksbURBQW1EO29CQUNuRCxPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hGLFlBQVksRUFBRSxJQUFJO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDZCxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7Z0JBQ0QsK0JBQStCO2dCQUMvQixnQ0FBZ0M7Z0JBQ2hDLElBQUksNkVBQTZFO29CQUM3RSxPQUFPO3dCQUNILE1BQU0sRUFBRSxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3hGLFlBQVksRUFBRSxJQUFJO3dCQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDZCxPQUFPLElBQUksQ0FBQzt3QkFDaEIsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7Z0JBQ0QsSUFBSSw2R0FBNkc7b0JBQzdHLE9BQU87d0JBQ0gsTUFBTSxFQUFFLFVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTt3QkFDeEYsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOzRCQUNkLE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1NBQ0o7UUFDRCxRQUFRLEVBQUU7WUFDTixNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1NBQy9EO1FBQ0QsSUFBSSxFQUFFO1lBQ0Y7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxJQUFJLEdBQUc7Z0JBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1lBQzFDLENBQUM7WUFFRCxPQUFPLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztZQUV0RCxVQUFVLEVBQUU7Z0JBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQzthQUM1RDtZQUVELFlBQVksRUFBRTtnQkFDVixHQUFHLGNBQWMsQ0FBQyxZQUFZO2dCQUM5QixvQkFBb0I7Z0JBQ3BCLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLGlCQUFpQjthQUNwQjtZQUVELE9BQU8sRUFBRTtnQkFDTCxHQUFHLGNBQWMsQ0FBQyxPQUFPO2dCQUN6QixvQkFBb0I7Z0JBQ3BCLFlBQVk7Z0JBQ1oscUJBQXFCO2dCQUNyQixlQUFlO2dCQUNmLGlCQUFpQjthQUNwQjtZQUNELElBQUksRUFBRTtnQkFDRixNQUFNLEVBQUUsSUFBSTthQUNmO1NBQ0o7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDIn0=