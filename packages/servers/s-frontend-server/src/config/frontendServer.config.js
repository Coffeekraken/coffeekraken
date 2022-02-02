import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
        /**
         * @name              port
         * @namespace         config.frontendServer
         * @type              Number
         * @default           env.env === 'production' ? 8889 : 8888
         *
         * Specify the port to use for the frontend server
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        port: env.env === 'production' ? 9090 : 8080,
        /**
         * @name              hostname
         * @namespace         config.frontendServer
         * @type              String
         * @default           127.0.0.1
         *
         * Specify the hostname to use for the frontend server
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        // hostname: __ipAddress(),
        hostname: '127.0.0.1',
        /**
         * @name              rootDir
         * @namespace         config.frontendServer
         * @type              String
         * @default           [config.storage.package.rootDir]
         *
         * Specify the root directory to use for the frontend server
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        rootDir: `[config.storage.package.rootDir]`,
        /**
         * @name              staticDirs
         * @namespace         config.frontendServer
         * @type              Object<String>
         * @default           { '/dist': '[config.storage.dist.rootDir]' }
         *
         * Specify a directory that will be served as static files
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        staticDirs: {
            '/dist': env.env === 'production' ? `[config.storage.dist.rootDir]` : `[config.storage.src.rootDir]`,
            '/cache': `[config.storage.package.cacheDir]`,
            // '/src': `[config.storage.src.rootDir]`,
        },
        /**
         * @name            viewsDir
         * @namespace       config.frontendServer
         * @type            String
         * @default         [config.storage.src.rootDir]/views
         *
         * Specify the views directory path
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        viewsDir: `[config.storage.src.rootDir]/views`,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        logLevel: 'info',
        proxy: {
            // assets: {
            //     /**
            //      * @name            route
            //      * @namespace       config.frontendServer.proxy.assets
            //      * @type            String
            //      * @default         [config.storage.package.rootDir]
            //      *
            //      * Specify which route to proxy for the assets
            //      *
            //      * @since           2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            //      */
            //     route: '[config.storage.package.rootDir]',
            //     settings: {
            //         /**
            //          * @name        target
            //          * @namespace   config.frontendServer.proxy.assets.settings
            //          * @type         String
            //          * @default         [config.vite.server.hostname]
            //          *
            //          * Specify where to redirect the assets requests
            //          *
            //          * @since           2.0.0
            //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            //          */
            //         target: '[config.vite.server.hostname]',
            //         /**
            //          * @name        changeOrigin
            //          * @namespace       config.frontendServer.proxy.assets.settings
            //          * @type        Boolean
            //          * @default         true
            //          *
            //          * Specify if you want the redirection to change the origin or not
            //          *
            //          * @since           2.0.0
            //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            //          */
            //         changeOrigin: true,
            //     },
            // },
            vitePing: {
                /**
                 * @name            route
                 * @namespace       config.frontendServer.proxy.vitePing
                 * @type            String
                 * @default         [config.storage.serve.rootDir]
                 *
                 * Specify which route to proxy for the vitePing
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                route: '/__vite_ping',
                settings: {
                    /**
                     * @name        target
                     * @namespace   config.frontendServer.proxy.vitePing.settings
                     * @type         String
                     * @default         [config.vite.server.hostname]
                     *
                     * Specify where to redirect the vitePing requests
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    target: '[config.vite.server.hostname]',
                    /**
                     * @name        changeOrigin
                     * @namespace       config.frontendServer.proxy.vitePing.settings
                     * @type        Boolean
                     * @default         true
                     *
                     * Specify if you want the redirection to change the origin or not
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    changeOrigin: true,
                },
            },
        },
        middlewares: {
            bench: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.bench
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/benchMiddleware
                 *
                 * Specify where to find the "bench" middleware
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/middleware/benchMiddleware`,
                settings: {},
            },
            request: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.request
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/requestMiddleware
                 *
                 * Specify where to find the "request" middleware
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/middleware/requestMiddleware`,
                settings: {},
            },
            env: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.env
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/envMiddleware
                 *
                 * Specify where to find the "env" middleware
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/middleware/envMiddleware`,
                settings: {},
            },
            packageJson: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.packageJson
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/packageJsonMiddleware
                 *
                 * Specify where to find the "packageJson" middleware
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
                settings: {},
            },
        },
        modules: {
            rootFiles: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.rootFiles
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/rootFiles/rootFiles
                 *
                 * Specify where to find the "rootFiles" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/rootFiles/rootFiles`,
                settings: {},
            },
            docmap: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.docmap
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/docmap/docmap
                 *
                 * Specify where to find the "docmap" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/docmap/docmap`,
                settings: {},
            },
            styleguide: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.styleguide
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/styleguide/styleguide
                 *
                 * Specify where to find the "styleguide" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/styleguide/styleguide`,
                settings: {},
            },
            config: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.config
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/config/config
                 *
                 * Specify where to find the "config" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/config/config`,
                settings: {},
            },
            frontspec: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.frontspec
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/frontspec/frontspec
                 *
                 * Specify where to find the "frontspec" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/frontspec/frontspec`,
                settings: {},
            },
            api: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.api
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/api/api
                 *
                 * Specify where to find the "api" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/api/api`,
                settings: {},
            },
            view: {
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.view
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/view/view
                 *
                 * Specify where to find the "view" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: `${__dirname()}/../node/modules/view/view`,
                settings: {
                    /**
                     * @name            slug
                     * @namespace       config.frontendServer.modules.view.settings
                     * @type            String
                     * @default     /view/*
                     *
                     * Specify the slug you want that trigger the view handler
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    slug: '/view/*',
                    /**
                     * @name        indexView
                     * @namespace       config.frontendServer.modules.view.settings
                     * @type            String
                     * @default         index
                     *
                     * Specify the dotpath of the view that has to be used as "index" when the path is just "/"
                     *
                     * @since       2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                     */
                    indexView: 'index',
                },
            },
        },
        routes: {
            '/': {
                /**
                 * @name        handler
                 * @namespace   config.frontendServer.routes.'/'
                 * @type        String
                 * @default         view
                 *
                 * Specify which handle to use for requests on "/"
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: 'view',
            },
            // '/doc/api/*': {
            //     /**
            //      * @name        handler
            //      * @namespace   config.frontendServer.routes.'/doc/api/*'
            //      * @type        String
            //      * @default         doc
            //      *
            //      * Specify which handle to use for requests on "/doc/api/*"
            //      *
            //      * @since       2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            //      */
            //     handler: 'doc',
            // },
            // '/api/config': {
            //     /**
            //      * @name        handler
            //      * @namespace   config.frontendServer.routes.'/api/config'
            //      * @type        String
            //      * @default         view
            //      *
            //      * Specify which handle to use for requests on "/api/config"
            //      *
            //      * @since       2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            //      */
            //     handler: 'config',
            // },
            '/docmap.json': {
                /**
                 * @name        handler
                 * @namespace   config.frontendServer.routes.'/api/docmap'
                 * @type        String
                 * @default         view
                 *
                 * Specify which handle to use for requests on "/docmap.json"
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: 'docmap',
            },
        },
        handlers: {
            /**
             * @name            doc
             * @namespace       config.frontendServer.handlers
             * @type            String
             * @default         ${__dirname()}/../node/handlers/doc
             *
             * Store all the "doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            doc: `${__dirname()}/../node/handlers/doc`,
            /**
             * @name            markdown
             * @namespace       config.frontendServer.handlers
             * @type            String
             * @default         ${__dirname()}/../node/handlers/markdown
             *
             * Store all the "markdown" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            markdown: `${__dirname()}/../node/handlers/markdown`,
            /**
             * @name            docmap
             * @namespace       config.frontendServer.handlers
             * @type            String
             * @default         ${__dirname()}/../node/handlers/docmap
             *
             * Store all the "api doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            docmap: `${__dirname()}/../node/handlers/docmap`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFFNUM7Ozs7Ozs7Ozs7V0FVRztRQUNILDJCQUEyQjtRQUMzQixRQUFRLEVBQUUsV0FBVztRQUVyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLGtDQUFrQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBRSwrQkFBK0IsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1lBQ3JHLFFBQVEsRUFBRSxtQ0FBbUM7WUFDN0MsMENBQTBDO1NBQzdDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUU7WUFDSCxZQUFZO1lBQ1osVUFBVTtZQUNWLGdDQUFnQztZQUNoQyw2REFBNkQ7WUFDN0QsaUNBQWlDO1lBQ2pDLDJEQUEyRDtZQUMzRCxTQUFTO1lBQ1QscURBQXFEO1lBQ3JELFNBQVM7WUFDVCxnQ0FBZ0M7WUFDaEMsd0dBQXdHO1lBQ3hHLFVBQVU7WUFDVixpREFBaUQ7WUFDakQsa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxpQ0FBaUM7WUFD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