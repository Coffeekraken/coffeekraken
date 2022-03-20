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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        staticDirs: {
            '/dist': env.env === 'production' ? `[config.storage.dist.rootDir]` : `[config.storage.src.rootDir]`,
            // '/cache': `[config.storage.package.cacheDir]`,
            '/src': `[config.storage.src.rootDir]`,
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        logLevel: 'info',
        proxy: {
            // vitePing: {
            //     /**
            //      * @name            route
            //      * @namespace       config.frontendServer.proxy.vitePing
            //      * @type            String
            //      * @default         [config.storage.serve.rootDir]
            //      *
            //      * Specify which route to proxy for the vitePing
            //      *
            //      * @since           2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     route: ['/__vite_ping'],
            //     settings: {
            //         /**
            //          * @name        target
            //          * @namespace   config.frontendServer.proxy.vitePing.settings
            //          * @type         String
            //          * @default         [config.vite.server.hostname]
            //          *
            //          * Specify where to redirect the vitePing requests
            //          *
            //          * @since           2.0.0
            //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //          */
            //         target: '[config.vite.server.hostname]',
            //         /**
            //          * @name        changeOrigin
            //          * @namespace       config.frontendServer.proxy.vitePing.settings
            //          * @type        Boolean
            //          * @default         true
            //          *
            //          * Specify if you want the redirection to change the origin or not
            //          *
            //          * @since           2.0.0
            //          * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //          */
            //         changeOrigin: true,
            //     },
            // },
            vite: {
                /**
                 * @name            route
                 * @namespace       config.frontendServer.proxy.vitePing
                 * @type            String
                 * @default         [config.storage.serve.rootDir]
                 *
                 * Specify which route to proxy for the vitePing
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                route: ['/@fs/**', '/@vite/**', '/.local/**/*', '**/*.css', '**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    changeOrigin: true,
                    pathRewrite: function (path, req) {
                        const newPath = path.replace(/^\/dist/, '/src');
                        return newPath;
                    }
                },
            },
        },
        middlewares: {
            bench: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.modules.bench
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
                 * @namespace       config.frontendServer.modules.bench
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
                 * @namespace       config.frontendServer.modules.bench
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
                 * @namespace       config.frontendServer.modules.request
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
                 * @namespace       config.frontendServer.modules.env
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/benchMiddleware
                 *
                 * Middleware description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: `Inject an "env" object for the views`,
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.env
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
                 * @namespace       config.frontendServer.modules.packageJson
                 * @type            String
                 * @default             ${__dirname()}/../node/middleware/benchMiddleware
                 *
                 * Middleware description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: `Inject a "packageJson" object for the views`,
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.packageJson
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
        modules: {
            rootFiles: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.modules.rootFiles
                 * @type            String
                 *
                 * Specify the module description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'This module allows you to serve files from the root directory',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.rootFiles
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/rootFiles/rootFiles
                 *
                 * Specify where to find the "rootFiles" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/rootFiles/rootFiles`,
                settings: {},
            },
            docmap: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.modules.docmap
                 * @type            String
                 *
                 * Specify the module description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'This module gives you access to a "docmap" object in the views',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.docmap
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/docmap/docmap
                 *
                 * Specify where to find the "docmap" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/docmap/docmap`,
                settings: {},
            },
            redirect: {
                /**
                * @name            description
                * @namespace       config.frontendServer.modules.redirect
                * @type            String
                *
                * Specify the module description
                *
                * @since           2.0.0
                * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
                description: 'This module allows you to make redirections depending on requested path',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.redirect
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/redirect/redirect
                 *
                 * Specify where to find the "redirect" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/redirect/redirect`,
                settings: {},
            },
            styleguide: {
                /**
                * @name            description
                * @namespace       config.frontendServer.modules.styleguide
                * @type            String
                *
                * Specify the module description
                *
                * @since           2.0.0
                * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
                description: 'This module handle the /styleguide/... views display',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.styleguide
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/styleguide/styleguide
                 *
                 * Specify where to find the "styleguide" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/styleguide/styleguide`,
                settings: {},
            },
            config: {
                /**
                * @name            description
                * @namespace       config.frontendServer.modules.config
                * @type            String
                *
                * Specify the module description
                *
                * @since           2.0.0
                * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
                description: 'This module gives you access to a "config" and a "configFiles" object into the views',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.config
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/config/config
                 *
                 * Specify where to find the "config" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/config/config`,
                settings: {},
            },
            frontspec: {
                /**
                * @name            description
                * @namespace       config.frontendServer.modules.frontspec
                * @type            String
                *
                * Specify the module description
                *
                * @since           2.0.0
                * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
                description: 'This module gives you access to a "frontspec" object into the views',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.frontspec
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/frontspec/frontspec
                 *
                 * Specify where to find the "frontspec" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/frontspec/frontspec`,
                settings: {},
            },
            api: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.modules.frontspec
                 * @type            String
                 *
                 * Specify the module description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'This module handle the /api/... views display',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.api
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/api/api
                 *
                 * Specify where to find the "api" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/modules/api/api`,
                settings: {},
            },
            view: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.modules.view
                 * @type            String
                 *
                 * Specify the module description
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: 'This module handle the /view/... views display',
                /**
                 * @name            path
                 * @namespace       config.frontendServer.modules.view
                 * @type            String
                 * @default             ${__dirname()}/../node/modules/view/view
                 *
                 * Specify where to find the "view" module
                 *
                 * @since           2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                handler: 'view',
            },
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                handler: 'docmap',
            },
        },
        handlers: {
            doc: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.handlers.doc
                 * @type            String
                 *
                 * Handler description
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: `Display some documentation sourced from markdown files`,
                /**
                 * @name            path
                 * @namespace       config.frontendServer.handlers.doc
                 * @type            String
                 * @default         ${__dirname()}/../node/handlers/doc
                 *
                 * Store all the "doc" configuration access like the route, the title, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/handlers/doc`,
            },
            markdown: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.handlers.markdown
                 * @type            String
                 *
                 * Handler description
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: `Display some documentation sourced from markdown files`,
                /**
                 * @name            path
                 * @namespace       config.frontendServer.handlers.markdown
                 * @type            String
                 * @default         ${__dirname()}/../node/handlers/markdown
                 *
                 * Store all the "markdown" configuration access like the route, the title, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/handlers/markdown`,
            },
            docmap: {
                /**
                 * @name            description
                 * @namespace       config.frontendServer.handlers.docmap
                 * @type            String
                 *
                 * Handler description
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                description: `Serve some docmap item(s) depending on request`,
                /**
                 * @name            path
                 * @namespace       config.frontendServer.handlers.docmap
                 * @type            String
                 * @default         ${__dirname()}/../node/handlers/docmap
                 *
                 * Store all the "api doc" configuration access like the route, the title, etc...
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: `${__dirname()}/../node/handlers/docmap`,
            }
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFFNUM7Ozs7Ozs7Ozs7V0FVRztRQUNILDJCQUEyQjtRQUMzQixRQUFRLEVBQUUsV0FBVztRQUVyQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLGtDQUFrQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBRSwrQkFBK0IsQ0FBQyxDQUFDLENBQUMsOEJBQThCO1lBQ3JHLGlEQUFpRDtZQUNqRCxNQUFNLEVBQUUsOEJBQThCO1NBQ3pDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUU7WUFDSCxjQUFjO1lBQ2QsVUFBVTtZQUNWLGdDQUFnQztZQUNoQywrREFBK0Q7WUFDL0QsaUNBQWlDO1lBQ2pDLHlEQUF5RDtZQUN6RCxTQUFTO1lBQ1QsdURBQXVEO1lBQ3ZELFNBQVM7WUFDVCxnQ0FBZ0M7WUFDaEMsc0dBQXNHO1lBQ3RHLFVBQVU7WUFDViwrQkFBK0I7WUFDL0Isa0JBQWtCO1lBQ2xCLGNBQWM7WUFDZCxpQ0FBaUM7WUFD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