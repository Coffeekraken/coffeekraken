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
import __sugarPackageJson from '@coffeekraken/sugar/package.json' assert { type: 'json' };
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
    for (let [path, value] of Object.entries(__sugarPackageJson.exports)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sa0JBQWtCLE1BQU0sa0NBQWtDLENBQUMsU0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFFMUYsTUFBTSxVQUFnQixVQUFVLENBQUMsR0FBRzs7O1FBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFFeEMsTUFBTSxtQkFBbUIsR0FBYSxFQUFFLENBQUM7SUFFekMsZ0ZBQWdGO0lBQ2hGLDBDQUEwQztJQUMxQywyREFBMkQ7SUFDM0QsbUJBQW1CO0lBQ25CLG1EQUFtRDtJQUNuRCxzREFBc0Q7SUFDdEQsYUFBYTtJQUNiLGlFQUFpRTtJQUNqRSxlQUFlO0lBQ2YsNERBQTREO0lBQzVELGlCQUFpQjtJQUNqQix5Q0FBeUM7SUFDekMsdUNBQXVDO0lBQ3ZDLDZDQUE2QztJQUM3QywwQ0FBMEM7SUFDMUMsOENBQThDO0lBQzlDLDRDQUE0QztJQUM1Qyxx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