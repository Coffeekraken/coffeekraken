import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageTmpDir } from '@coffeekraken/sugar/path';

export default function (api) {
    let frontendServerConfig = {};

    if (api.env.platform === 'node') {
        frontendServerConfig = {
            /**
             * @name              port
             * @namespace         config.frontendServer
             * @type              Number
             * @default           env.env === 'production' ? 8889 : 8888
             *
             * Specify the port to use for the frontend server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            port: api.env.env === 'production' ? 9090 : 8080,

            /**
             * @name              hostname
             * @namespace         config.frontendServer
             * @type              String
             * @default           127.0.0.1
             *
             * Specify the hostname to use for the frontend server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            // hostname: __ipAddress(),
            hostname: '0.0.0.0',

            /**
             * @name              rootDir
             * @namespace         config.frontendServer
             * @type              String
             * @default           [config.storage.package.rootDir]
             *
             * Specify the root directory to use for the frontend server
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rootDir() {
                return api.config.storage.package.rootDir;
            },

            /**
             * @name              staticDirs
             * @namespace         config.frontendServer
             * @type              Object<String>
             * @default           { '/dist': '[config.storage.dist.rootDir]' }
             *
             * Specify a directory that will be served as static files
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get staticDirs() {
                return {
                    '/tmp': `${__packageTmpDir()}`,
                    '/dist/favicon': `${api.config.faviconBuilder.outDir}`,
                    '/dist/css/lod': `${api.config.storage.dist.cssDir}/lod`,
                    '/dist/css/chunks': `${api.config.storage.dist.cssDir}/chunks`,
                    '/dist':
                        api.env.env === 'production'
                            ? api.config.storage.dist.rootDir
                            : api.config.storage.src.rootDir,
                };
            },

            /**
             * @name            viewsDir
             * @namespace       config.frontendServer
             * @type            String
             * @default         [config.storage.src.viewsDir]
             *
             * Specify the views directory path
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get viewsDir() {
                return api.config.storage.src.viewsDir;
            },

            /**
             * @name            pagesDir
             * @namespace       config.frontendServer
             * @type            String
             * @default         [config.storage.src.pagesDir]
             *
             * Specify the views directory path
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get pagesDir() {
                return api.config.storage.src.pagesDir;
            },

            /**
             * @name          logLevel
             * @namespace     config.frontendServer
             * @type          String
             * @values        silent,error,warn,debug,info,verbose,silly
             * @default       info
             *
             * Specify which log level you want for your server.
             *
             * @since             2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            logLevel: 'info',

            proxy: {},

            middlewares: {
                bench: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.middlewares.bench
                     * @type            String
                     *
                     * Middleware description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: `Track how many times take a request`,
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.middlewares.bench
                     * @type            String
                     * @default             ${__dirname()}/../node/middleware/benchMiddleware
                     *
                     * Specify where to find the "bench" middleware
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/middleware/benchMiddleware`,
                    settings: {},
                },
                request: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.middlewares.request
                     * @type            String
                     *
                     * Middleware description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: `Inject the "request" object for views`,
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.middlewares.request
                     * @type            String
                     * @default             ${__dirname()}/../node/middleware/requestMiddleware
                     *
                     * Specify where to find the "request" middleware
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/middleware/requestMiddleware`,
                    settings: {},
                },
                env: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.middlewares.env
                     * @type            String
                     *
                     * Middleware description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: `Inject an "env" object for the views`,
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.middlewares.env
                     * @type            String
                     * @default             ${__dirname()}/../node/middleware/envMiddleware
                     *
                     * Specify where to find the "env" middleware
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/middleware/envMiddleware`,
                    settings: {},
                },
                packageJson: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.middlewares.packageJson
                     * @type            String
                     *
                     * Middleware description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: `Inject a "packageJson" object for the views`,
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.middlewares.packageJson
                     * @type            String
                     * @default             ${__dirname()}/../node/middleware/packageJsonMiddleware
                     *
                     * Specify where to find the "packageJson" middleware
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
                    settings: {},
                },
            },

            data: {},

            modules: {
                publicDir: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.publicDir
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description:
                        'This module allows you to serve files from the public directory',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.publicDir
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/publicDir/publicDir
                     *
                     * Specify where to find the "publicDir" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/modules/publicDir/publicDir`,
                    settings: {},
                },
                upload: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.upload
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description:
                        'This module allows you to upload files to the tmp/upload directory',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.upload
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/upload/upload
                     *
                     * Specify where to find the "upload" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/modules/upload/upload`,
                    settings: {},
                },
                generic: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.generic
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description:
                        'This module gives you access to the "generic" handler that renders dynamically views from your page config',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.generic
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/generic/generic
                     *
                     * Specify where to find the "generic" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/modules/generic/generic`,
                    settings: {},
                },
                // sitemap: {
                //     /**
                //      * @name            description
                //      * @namespace       config.frontendServer.modules.sitemap
                //      * @type            String
                //      *
                //      * Specify the module description
                //      *
                //      * @since           2.0.0
                //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                //      */
                //     description:
                //         'This module gives you access to a "sitemap" object in the views',
                //     /**
                //      * @name            path
                //      * @namespace       config.frontendServer.modules.sitemap
                //      * @type            String
                //      * @default             ${__dirname()}/../node/modules/sitemap/sitemap
                //      *
                //      * Specify where to find the "sitemap" module
                //      *
                //      * @since           2.0.0
                //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                //      */
                //     path: `${__dirname()}/../node/modules/sitemap/sitemap`,
                //     settings: {},
                // },

                doc: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.doc
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description:
                        'This module expose the SDoc enpoints to access documentations based on the docmap.json',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.doc
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/doc/doc
                     *
                     * Specify where to find the "doc" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${__dirname()}/../node/modules/doc/doc`,
                    settings: {},
                },
            },

            pages: {},
            handlers: {},
        };
    }

    frontendServerConfig.corsProxy = {
        /**
         * @name              port
         * @namespace         config.frontendServer.corsProxy
         * @type              Number
         * @default           9999
         *
         * Specify the port to use for the frontend server cors proxy
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        port: 9999,

        /**
         * @name              url
         * @namespace         config.frontendServer.corsProxy
         * @type              Number
         * @default           `http://127.0.0.1:${this.port}`
         *
         * Specify the url to call to pass by the server cors proxy
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get url() {
            return `http://127.0.0.1:${this.port}`;
        },

        /**
         * @name              targetUrlHeaderName
         * @namespace         config.frontendServer.corsProxy
         * @type              Number
         * @default           TargetUrl
         *
         * Specify the header name to use to pass the target url to the proxy
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        targetUrlHeaderName: 'TargetUrl',

        /**
         * @name              limit
         * @namespace         config.frontendServer.corsProxy
         * @type              Number
         * @default           12mb
         *
         * Specify the limit of requests proxy size
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        limit: '12mb',
    };

    return frontendServerConfig;
}
