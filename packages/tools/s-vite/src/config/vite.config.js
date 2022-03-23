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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "@coffeekraken/sugar/node/fs/dirname", "@coffeekraken/sugar/node/config/loadConfigFile", "@coffeekraken/sugar/shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.preprocess = void 0;
    const path_1 = __importDefault(require("path"));
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    const loadConfigFile_1 = __importDefault(require("@coffeekraken/sugar/node/config/loadConfigFile"));
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    function preprocess(env, rawViteConfig, rawConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const config = (_a = (yield (0, loadConfigFile_1.default)('vite.config.js'))) !== null && _a !== void 0 ? _a : {};
            return (0, deepMerge_1.default)(rawViteConfig, config);
        });
    }
    exports.preprocess = preprocess;
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
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
            root: '[config.storage.package.rootDir]',
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
                // preserveSymlinks: true,
                alias: {
                    static: '',
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
                    vue: 'vue/dist/vue.esm-bundler.js',
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
                path_1.default.resolve(`${(0, dirname_1.default)()}/../node/plugins/sugarPlugin`),
                // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
                // __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
                // __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
                path_1.default.resolve(`${(0, dirname_1.default)()}/../node/plugins/postcssPlugin`),
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
            publicDir: '[config.storage.src.rootDir]/public',
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
            cacheDir: '[config.storage.package.cacheDir]/vite',
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
                entries: ['index.html']
            },
            build: {
                lib: {
                    /**
                     * @name          entry
                     * @namespace     config.vite.build.lib
                     * @type          String
                     * @default      [config.storage.src.rootDir]/js/index.ts
                     *
                     * Specify the entry file for a "lib" build
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    entry: '[config.storage.src.rootDir]/js/index.ts',
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
                outDir: '[config.storage.dist.jsDir]',
            },
            server: {
                // watch: {
                //     usePolling: true
                //     },
                /**
                 * @name          host
                 * @namespace     config.vite.server
                 * @type          String
                 * @default      127.0.0.1
                 *
                 * Specify the hostname for the vite server
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                host: '127.0.0.1',
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
                hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
                proxy: {
                    // '^[^\\.]+\\.(?=css|js|ts|tsx|jsx)(\\?)?(.+)': {
                    //     target: `http://localhost:3000`,
                    //     changeOrigin: true,
                    //     rewrite: (path) => {
                    //         console.log('33pah', path);
                    //         return path.replace(/\/dist\//, '/src/');
                    //     }
                    // },
                    '^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|@fs|__vite_ping|index\.html).)*$': {
                        target: `http://localhost:8080`,
                        changeOrigin: true,
                        // rewrite: (path) => {
                        //     return path.replace(/\/dist\//, '/src/');
                        // }
                    },
                    '/dist': {
                        target: `http://localhost:3000`,
                        changeOrigin: true,
                        ws: true,
                        rewrite: (path) => {
                            return path.replace(/\/dist\//, '/src/');
                        }
                    }
                }
            },
            css: {},
            rewrites: [
                path_1.default.resolve(`${(0, dirname_1.default)()}/../node/rewrites/handlebars`),
            ],
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDQSxnREFBMEI7SUFDMUIsa0ZBQTREO0lBQzVELG9HQUE4RTtJQUM5RSw0RkFBc0U7SUFFdEUsU0FBc0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsU0FBUzs7O1lBQzFELE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLElBQUEsd0JBQWdCLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7WUFDaEUsT0FBTyxJQUFBLG1CQUFXLEVBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztLQUM3QztJQUhELGdDQUdDO0lBRUQsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1lBQUUsT0FBTztRQUNwQyxPQUFPO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxrQ0FBa0M7WUFDeEM7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxHQUFHO1lBQ1Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILFFBQVEsRUFBRSxPQUFPO1lBRWpCOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsSUFBSSxFQUFFLGFBQWE7WUFDbkIsT0FBTyxFQUFFO2dCQUNMLDBCQUEwQjtnQkFDMUIsS0FBSyxFQUFFO29CQUVILE1BQU0sRUFBRSxFQUFFO29CQUVWOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEdBQUcsRUFBRSw2QkFBNkI7aUJBQ3JDO2FBQ0o7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFO2dCQUNMLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsOEJBQThCLENBQUM7Z0JBQzVELGlFQUFpRTtnQkFDakUsZ0VBQWdFO2dCQUNoRSxpRUFBaUU7Z0JBQ2pFLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLGlCQUFTLEdBQUUsZ0NBQWdDLENBQUM7YUFDakU7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsU0FBUyxFQUFFLHFDQUFxQztZQUNoRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUFFLHdDQUF3QztZQUNsRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLEtBQUs7WUFDbEIsWUFBWSxFQUFFO2dCQUNWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILHVCQUF1QjtnQkFDdEIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzNCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILEdBQUcsRUFBRTtvQkFDRDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxLQUFLLEVBQUUsMENBQTBDO29CQUNqRDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsT0FBTztpQkFDaEI7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLDZCQUE2QjthQUN4QztZQUNELE1BQU0sRUFBRTtnQkFDSixXQUFXO2dCQUNYLHVCQUF1QjtnQkFDdkIsU0FBUztnQkFDVDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsV0FBVztnQkFDakI7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLElBQUk7Z0JBQ1Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUNKLDREQUE0RDtnQkFDaEUsS0FBSyxFQUFFO29CQUNILGtEQUFrRDtvQkFDbEQsdUNBQXVDO29CQUN2QywwQkFBMEI7b0JBQzFCLDJCQUEyQjtvQkFDM0Isc0NBQXNDO29CQUN0QyxvREFBb0Q7b0JBQ3BELFFBQVE7b0JBQ1IsS0FBSztvQkFDTCxzR0FBc0csRUFBRTt3QkFDcEcsTUFBTSxFQUFFLHVCQUF1Qjt3QkFDL0IsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLHVCQUF1Qjt3QkFDdkIsZ0RBQWdEO3dCQUNoRCxJQUFJO3FCQUNQO29CQUNELE9BQU8sRUFBRTt3QkFDTCxNQUFNLEVBQUUsdUJBQXVCO3dCQUMvQixZQUFZLEVBQUUsSUFBSTt3QkFDbEIsRUFBRSxFQUFFLElBQUk7d0JBQ1IsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7NEJBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDN0MsQ0FBQztxQkFDSjtpQkFDSjthQUNKO1lBQ0QsR0FBRyxFQUFFLEVBQUU7WUFDUCxRQUFRLEVBQUU7Z0JBQ04sY0FBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUEsaUJBQVMsR0FBRSw4QkFBOEIsQ0FBQzthQUMvRDtTQUNKLENBQUM7SUFDTixDQUFDO0lBOVBELDRCQThQQyJ9