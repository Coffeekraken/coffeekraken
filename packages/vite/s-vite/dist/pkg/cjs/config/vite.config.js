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
    // for (let [path, value] of Object.entries(__sugarPackageJson.exports)) {
    //     if (
    //         [
    //             'cli',
    //             'coffeekraken',
    //             'composer',
    //             'error',
    //             'exec',
    //             'github',
    //             'hash',
    //             'load',
    //             'monorepo',
    //             'npm',
    //             'network',
    //             'keyboard',
    //             'og',
    //             'path',
    //             'php',
    //             'process',
    //             'project',
    //             'terminal',
    //             'fs',
    //             'is',
    //         ].includes(path.replace('./', ''))
    //     ) {
    //         continue;
    //     }
    //     optimizeDepsInclude.push(
    //         `@coffeekraken/sugar/${path.replace('./', '')}`,
    //     );
    // }
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
             * @default      5173
             *
             * Specify the port for the vite server
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: 5173,
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
                    target: `http://0.0.0.0:5173`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFtRDtBQUNuRCxtREFBNEQ7QUFDNUQsdURBQXlEO0FBQ3pELGdEQUEwQjtBQUMxQiwwQ0FBNkQ7QUFFN0QsU0FBc0IsVUFBVSxDQUFDLEdBQUc7OztRQUNoQyxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxJQUFBLHVCQUFnQixFQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sSUFBQSxvQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQ3hDO0FBSEQsZ0NBR0M7QUFFRCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE1BQU0sbUJBQW1CLEdBQWEsRUFBRSxDQUFDO0lBRXpDLGdGQUFnRjtJQUNoRiwwQ0FBMEM7SUFDMUMsMkRBQTJEO0lBQzNELG1CQUFtQjtJQUNuQixtREFBbUQ7SUFDbkQsc0RBQXNEO0lBQ3RELGFBQWE7SUFDYixpRUFBaUU7SUFDakUsZUFBZTtJQUNmLDREQUE0RDtJQUM1RCxpQkFBaUI7SUFDakIseUNBQXlDO0lBQ3pDLHVDQUF1QztJQUN2Qyw2Q0FBNkM7SUFDN0MsMENBQTBDO0lBQzFDLDhDQUE4QztJQUM5Qyw0Q0FBNEM7SUFDNUMscURBQXFEO0lBQ3JELDJDQUEyQztJQUMzQyx1REFBdUQ7SUFDdkQseUNBQXlDO0lBQ3pDLHVEQUF1RDtJQUN2RCxjQUFjO0lBQ2Qsd0RBQXdEO0lBQ3hELFlBQVk7SUFDWixRQUFRO0lBQ1IsSUFBSTtJQUVKLDBFQUEwRTtJQUMxRSxXQUFXO0lBQ1gsWUFBWTtJQUNaLHFCQUFxQjtJQUNyQiw4QkFBOEI7SUFDOUIsMEJBQTBCO0lBQzFCLHVCQUF1QjtJQUN2Qixz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