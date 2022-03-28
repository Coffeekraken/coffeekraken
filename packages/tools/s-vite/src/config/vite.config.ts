import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __loadConfigFile from '@coffeekraken/sugar/node/config/loadConfigFile';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';

export async function preprocess(env, rawViteConfig, rawConfig) {
    const config = (await __loadConfigFile('vite.config.js')) ?? {};
    return __deepMerge(rawViteConfig, config);
}

export default function (env, config) {
    if (env.platform !== 'node') return;

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
            entries: ['index.html'],
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
            hostname:
                'http://[config.vite.server.host]:[config.vite.server.port]',
            proxy: {
                // '^[^\\.]+\\.(?=css|js|ts|tsx|jsx)(\\?)?(.+)': {
                //     target: `http://localhost:3000`,
                //     changeOrigin: true,
                //     rewrite: (path) => {
                //         console.log('33pah', path);
                //         return path.replace(/\/dist\//, '/src/');
                //     }
                // },
                '^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|\\@fs|__vite_ping|index.html).)*$': {
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
                    },
                },
            },
        },
        css: {},
        rewrites: [
            __path.resolve(`${__dirname()}/../node/rewrites/handlebars`),
        ],
    };
}
