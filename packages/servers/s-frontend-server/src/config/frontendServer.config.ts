import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __SDocmap from '@coffeekraken/s-docmap';

export default function (env, config) {
    if (env.platform !== 'node') return;

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
            '/dist':
                env.env === 'production'
                    ? `[config.storage.dist.rootDir]`
                    : `[config.storage.src.rootDir]`,
            // '/.local': `[config.storage.package.localDir]`,
            // '/cache': `[config.storage.package.cacheDir]`,
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
            // vite: {
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
            //     route: ['/@fs/**','/@vite/**','/.local/**/*','**/*.css','**/*.ts','**/*.js','**/*.tsx','**/*.jsx'],
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
            //         ws: true,
            //         pathRewrite: function (path, req) {
            //             const newPath = path.replace(/^\/dist/, '/src');
            //             console.log('rewrite', path, newPath);
            //             return newPath;
            //         }
            //     },
            // },
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
            // rootFiles: {
            //     /**
            //      * @name            description
            //      * @namespace       config.frontendServer.modules.rootFiles
            //      * @type            String
            //      *
            //      * Specify the module description
            //      *
            //      * @since           2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     description: 'This module allows you to serve files from the root directory',
            //     /**
            //      * @name            path
            //      * @namespace       config.frontendServer.modules.rootFiles
            //      * @type            String
            //      * @default             ${__dirname()}/../node/modules/rootFiles/rootFiles
            //      *
            //      * Specify where to find the "rootFiles" module
            //      *
            //      * @since           2.0.0
            //      * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //      */
            //     path: `${__dirname()}/../node/modules/rootFiles/rootFiles`,
            //     settings: {},
            // },
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
                description:
                    'This module gives you access to a "docmap" object in the views',
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
                description:
                    'This module allows you to make redirections depending on requested path',
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
                description:
                    'This module handle the /styleguide/... views display',
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
                description:
                    'This module gives you access to a "config" and a "configFiles" object into the views',
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
                description:
                    'This module gives you access to a "frontspec" object into the views',
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
            },
        },
    };
}
