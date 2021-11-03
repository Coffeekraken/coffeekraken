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
export function preprocess(rawViteConfig, rawConfig) {
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        base: '/',
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        mode: 'development',
        resolve: {
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @default      [config.storage.src.rootDir]
         *
         * Specify the public directory to use
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        publicDir: '[config.storage.src.rootDir]',
        /**
         * @name          cacheDir
         * @namespace     config.vite
         * @type          String
         * @default      [config.storage.package.cacheDir]/vite'
         *
         * Specify the cache directory to use
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        clearScreen: false,
        // optimizeDeps: {
        //     /**
        //      * @name          exclude
        //      * @namespace     config.vite.optimizeDeps
        //      * @type          String[]
        //      * @default      false
        //      *
        //      * Specify some packages to exclude from build
        //      *
        //      * @since       2.0.0
        //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //      */
        //     exclude: ['vue'],
        // },
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            hostname: 'http://[config.vite.server.host]:[config.vite.server.port]',
            proxy: {
                '/api/config': 'http://localhost:[config.frontendServer.port]',
            },
        },
        css: {},
        rewrites: [
            __path.resolve(`${__dirname()}/../node/rewrites/handlebars`),
        ],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidml0ZS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aXRlLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxnQkFBZ0IsTUFBTSxnREFBZ0QsQ0FBQztBQUM5RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxNQUFNLFVBQWdCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUzs7O1FBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQUEsQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBQ2hFLE9BQU8sV0FBVyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQzs7Q0FDN0M7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxrQ0FBa0M7UUFDeEM7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxHQUFHO1FBQ1Q7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxJQUFJLEVBQUUsYUFBYTtRQUNuQixPQUFPLEVBQUU7WUFDTCxLQUFLLEVBQUU7Z0JBQ0g7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsR0FBRyxFQUFFLDZCQUE2QjthQUNyQztTQUNKO1FBQ0Q7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRTtZQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUM7WUFDNUQsaUVBQWlFO1lBQ2pFLGdFQUFnRTtZQUNoRSxpRUFBaUU7WUFDakUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsRUFBRSxnQ0FBZ0MsQ0FBQztTQUNqRTtRQUNEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUUsOEJBQThCO1FBQ3pDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsd0NBQXdDO1FBQ2xEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxXQUFXLEVBQUUsS0FBSztRQUNsQixrQkFBa0I7UUFDbEIsVUFBVTtRQUNWLGdDQUFnQztRQUNoQyxpREFBaUQ7UUFDakQsaUNBQWlDO1FBQ2pDLDZCQUE2QjtRQUM3QixTQUFTO1FBQ1QscURBQXFEO1FBQ3JELFNBQVM7UUFDVCw0QkFBNEI7UUFDNUIsd0dBQXdHO1FBQ3hHLFVBQVU7UUFDVix3QkFBd0I7UUFDeEIsS0FBSztRQUNMLEtBQUssRUFBRTtZQUNILEdBQUcsRUFBRTtnQkFDRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxLQUFLLEVBQUUsMENBQTBDO2dCQUNqRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsNkJBQTZCO1NBQ3hDO1FBQ0QsTUFBTSxFQUFFO1lBQ0o7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxXQUFXO1lBQ2pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUNWOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQ0osNERBQTREO1lBQ2hFLEtBQUssRUFBRTtnQkFDSCxhQUFhLEVBQUUsK0NBQStDO2FBQ2pFO1NBQ0o7UUFDRCxHQUFHLEVBQUUsRUFBRTtRQUNQLFFBQVEsRUFBRTtZQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLEVBQUUsOEJBQThCLENBQUM7U0FDL0Q7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9