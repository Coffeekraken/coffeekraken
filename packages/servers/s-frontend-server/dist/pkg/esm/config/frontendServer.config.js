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
                    '/dist': api.env.env === 'production'
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
                    description: 'This module allows you to serve files from the public directory',
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
                    description: 'This module allows you to upload files to the tmp/upload directory',
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
                    description: 'This module gives you access to the "generic" handler that renders dynamically views from your page config',
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
                    description: 'This module expose the SDoc enpoints to access documentations based on the docmap.json',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0lBRTlCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzdCLG9CQUFvQixHQUFHO1lBQ25COzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFFaEQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILDJCQUEyQjtZQUMzQixRQUFRLEVBQUUsU0FBUztZQUVuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUM5QyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksVUFBVTtnQkFDVixPQUFPO29CQUNILE1BQU0sRUFBRSxHQUFHLGVBQWUsRUFBRSxFQUFFO29CQUM5QixlQUFlLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RELGVBQWUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLE1BQU07b0JBQ3hELGtCQUFrQixFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sU0FBUztvQkFDOUQsT0FBTyxFQUNILEdBQUcsQ0FBQyxH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