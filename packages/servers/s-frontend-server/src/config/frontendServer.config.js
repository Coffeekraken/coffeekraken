var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/node/fs/dirname"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    function default_1(env, config) {
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
                    path: `${(0, dirname_1.default)()}/../node/middleware/benchMiddleware`,
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
                    path: `${(0, dirname_1.default)()}/../node/middleware/requestMiddleware`,
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
                    path: `${(0, dirname_1.default)()}/../node/middleware/envMiddleware`,
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
                    path: `${(0, dirname_1.default)()}/../node/middleware/packageJsonMiddleware`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/docmap/docmap`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/redirect/redirect`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/styleguide/styleguide`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/config/config`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/frontspec/frontspec`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/api/api`,
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
                    path: `${(0, dirname_1.default)()}/../node/modules/view/view`,
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
                    path: `${(0, dirname_1.default)()}/../node/handlers/doc`,
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
                    path: `${(0, dirname_1.default)()}/../node/handlers/markdown`,
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
                    path: `${(0, dirname_1.default)()}/../node/handlers/docmap`,
                }
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQ0Esa0ZBQTREO0lBRzVELG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFFcEMsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUcsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUU1Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsMkJBQTJCO1lBQzNCLFFBQVEsRUFBRSxXQUFXO1lBRXJCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsa0NBQWtDO1lBRTNDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBRSwrQkFBK0IsQ0FBQyxDQUFDLENBQUMsOEJBQThCO2dCQUNyRyxpREFBaUQ7Z0JBQ2pELDBDQUEwQzthQUM3QztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxRQUFRLEVBQUUsb0NBQW9DO1lBRTlDOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsUUFBUSxFQUFFLE1BQU07WUFFaEIsS0FBSyxFQUFFO1lBQ0gsY0FBYztZQUNkLFVBQVU7WUFDVixnQ0FBZ0M7WUFDaEMsK0RBQStEO1lBQy9ELGlDQUFpQztZQUNqQyx5REFBeUQ7WUFDekQsU0FBUztZQUNULHVEQUF1RDtZQUN2RCxTQUFTO1lBQ1QsZ0NBQWdDO1lBQ2hDLHNHQUFzRztZQUN0RyxVQUFVO1lBQ1YsK0JBQStCO1lBQy9CLGtCQUFrQjtZQUNsQixjQUFjO1lBQ2QsaUNBQWlDO1lBQ2pDLHdFQUF3RTtZQUN4RSxrQ0FBa0M7WUFD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