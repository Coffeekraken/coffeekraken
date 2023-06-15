"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
function default_1(api) {
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
                    '/tmp': `${(0, path_1.__packageTmpDir)()}`,
                    '/dist/favicon': `${api.config.faviconBuilder.outDir}`,
                    '/dist/css/lod': `${api.config.storage.dist.cssDir}/lod`,
                    '/dist/css/partials': `${api.config.storage.dist.cssDir}/partials`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/middleware/benchMiddleware`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/middleware/requestMiddleware`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/middleware/envMiddleware`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/middleware/packageJsonMiddleware`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/publicDir/publicDir`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/upload/upload`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/generic/generic`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/docmap/docmap`,
                    settings: {},
                },
                classmap: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.classmap
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: 'This module gives you access to the /classmap.json url',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.classmap
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/classmap/classmap
                     *
                     * Specify where to find the "classmap" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${(0, fs_1.__dirname)()}/../node/modules/classmap/classmap`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/redirect/redirect`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/config/config`,
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/frontspec/frontspec`,
                    settings: {},
                },
                404: {
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
                    description: 'This module handle the 404 by rendering either your 404 page configured in the pages or the default 404 page',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.docmap
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/404/404
                     *
                     * Specify where to find the "404" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${(0, fs_1.__dirname)()}/../node/modules/404/404`,
                    settings: {},
                },
                carpenter: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.carpenter
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: 'This module gives you access to a "carpenter" object in the views',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.carpenter
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/carpenter/carpenter
                     *
                     * Specify where to find the "carpenter" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${(0, fs_1.__dirname)()}/../node/modules/carpenter/carpenter`,
                    settings: {},
                },
                store: {
                    /**
                     * @name            description
                     * @namespace       config.frontendServer.modules.store
                     * @type            String
                     *
                     * Specify the module description
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    description: 'This module gives you access to data by either a POST on /store with an object that has an id, or access the data using a GET on /store/:id',
                    /**
                     * @name            path
                     * @namespace       config.frontendServer.modules.store
                     * @type            String
                     * @default             ${__dirname()}/../node/modules/carpenter/carpenter
                     *
                     * Specify where to find the "store" module
                     *
                     * @since           2.0.0
                     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    path: `${(0, fs_1.__dirname)()}/../node/modules/store/store`,
                    settings: {
                        /**
                         * @name            rootDir
                         * @namespace       config.frontendServer.modules.store.settings
                         * @type            String
                         * @default             ${__packageTmpDir()}/store
                         *
                         * Specify where to store the "store" data
                         *
                         * @since           2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        rootDir: `${(0, path_1.__packageTmpDir)()}/store`,
                    },
                },
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
                    path: `${(0, fs_1.__dirname)()}/../node/modules/doc/doc`,
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUEyRDtBQUUzRCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLG9CQUFvQixHQUFHLEVBQUUsQ0FBQztJQUU5QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM3QixvQkFBb0IsR0FBRztZQUNuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBRWhEOzs7Ozs7Ozs7O2VBVUc7WUFDSCwyQkFBMkI7WUFDM0IsUUFBUSxFQUFFLFNBQVM7WUFFbkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksT0FBTztnQkFDUCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDOUMsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFVBQVU7Z0JBQ1YsT0FBTztvQkFDSCxNQUFNLEVBQUUsR0FBRyxJQUFBLHNCQUFlLEdBQUUsRUFBRTtvQkFDOUIsZUFBZSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUN0RCxlQUFlLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxNQUFNO29CQUN4RCxvQkFBb0IsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLFdBQVc7b0JBQ2xFLE9BQU8sRUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxZQUFZO3dCQUN4QixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFP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