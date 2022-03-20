var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function preprocess(env, rawViteConfig, rawConfig) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const config = (_a = (yield __loadConfigFile('vite.config.js'))) !== null && _a !== void 0 ? _a : {};
        return __deepMerge(rawViteConfig, config);
    });
}
export default function (env, config) {
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
            preserveSymlinks: true,
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
            __path.resolve(`${__dirname()}/../node/plugins/sugarPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/sveltePlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/vuejsPlugin`),
            // __path.resolve(`${__dirname()}/../node/plugins/riotjsPlugin`),
            __path.resolve(`${__dirname()}/../node/plugins/postcssPlugin`),
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
            // '^[^\\.]+\\.(?!css|js|ts|tsx|jsx)(\\?)?(.+)': {
            //     target: `http://localhost:8080`,
            //     changeOrigin: true,
            //     rewrite: (path) => {
            //         console.log('pah', path);
            //         return path.replace(/\/dist\//, '/src/');
            //     }
            // },
            // '/dist': {
            //     target: `http://localhost:3000`,
            //     changeOrigin: true,
            //     rewrite: (path) => {
            //         console.log('fefwfwfwfw ef ewpah', path);
            //         return path.replace(/\/dist\//, '/src/');
            //     }
            // },
            // '^/$': {
            //     target: `http://localhost:8080`,
            //     changeOrigin: true
            // }
            }
        },
        css: {},
        rewrites: [
            __path.resolve(`${__dirname()}/../node/rewrites/handlebars`),
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxnQkFBZ0IsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQWdCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLFNBQVM7OztRQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFBLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQztRQUNoRSxPQUFPLFdBQVcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7O0NBQzdDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHLEVBQUUsTUFBTTtJQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsa0NBQWtDO1FBQ3hDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxJQUFJLEVBQUUsR0FBRztRQUNUOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsT0FBTztRQUVqQjs7Ozs7Ozs7Ozs7V0FXRztRQUNILElBQUksRUFBRSxhQUFhO1FBQ25CLE9BQU8sRUFBRTtZQUNMLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsS0FBSyxFQUFFO2dCQUVILE1BQU0sRUFBRSxFQUFFO2dCQUVWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEdBQUcsRUFBRSw2QkFBNkI7YUFDckM7U0FDSjtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxPQUFPLEVBQUU7WUFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1lBQzVELGlFQUFpRTtZQUNqRSxnRUFBZ0U7WUFDaEUsaUVBQWlFO1lBQ2pFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsZ0NBQWdDLENBQUM7U0FDakU7UUFDRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsU0FBUyxFQUFFLHFDQUFxQztRQUNoRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLHdDQUF3QztRQUNsRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsV0FBVyxFQUFFLEtBQUs7UUFDbEIsWUFBWSxFQUFFO1lBQ1Y7Ozs7Ozs7Ozs7ZUFVRztZQUNILHVCQUF1QjtZQUN0QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7U0FDM0I7UUFDRCxLQUFLLEVBQUU7WUFDSCxHQUFHLEVBQUU7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsS0FBSyxFQUFFLDBDQUEwQztnQkFDakQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLE9BQU87YUFDaEI7WUFDRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLDZCQUE2QjtTQUN4QztRQUNELE1BQU0sRUFBRTtZQUNKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsV0FBVztZQUNqQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLElBQUk7WUFDVjs7Ozs7Ozs7OztlQVVHO1lBQ0gsUUFBUSxFQUNKLDREQUE0RDtZQUNoRSxLQUFLLEVBQUU7WUFDSCxrREFBa0Q7WUFDbEQsdUNBQXVDO1lBQ3ZDLDBCQUEwQjtZQUMxQiwyQkFBMkI7WUFDM0Isc0NBQXNDO1lBQ3RDLG9EQUFvRDtZQUNwRCxRQUFRO1lBQ1IsS0FBSztZQUNMLGtEQUFrRDtZQUNsRCx1Q0FBdUM7WUFDdkMsMEJBQTBCO1lBQzFCLDJCQUEyQjtZQUMzQixvQ0FBb0M7WUFDcEMsb0RBQW9EO1lBQ3BELFFBQVE7WUFDUixLQUFLO1lBQ0wsYUFBYTtZQUNiLHVDQUF1QztZQUN2QywwQkFBMEI7WUFDMUIsMkJBQTJCO1lBQzNCLG9EQUFvRDtZQUNwRCxvREFBb0Q7WUFDcEQsUUFBUTtZQUNSLEtBQUs7WUFDTCxXQUFXO1lBQ1gsdUNBQXVDO1lBQ3ZDLHlCQUF5QjtZQUN6QixJQUFJO2FBQ1A7U0FDSjtRQUNELEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFO1lBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSw4QkFBOEIsQ0FBQztTQUMvRDtLQUNKLENBQUM7QUFDTixDQUFDIn0=