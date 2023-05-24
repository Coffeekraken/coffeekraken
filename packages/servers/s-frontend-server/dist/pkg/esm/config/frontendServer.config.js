import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
export default function (api) {
    if (api.env.platform !== 'node') {
        return;
    }
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
        corsProxy: {
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
        },
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
                path: `${__dirname()}/../node/modules/classmap/classmap`,
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
                path: `${__dirname()}/../node/modules/redirect/redirect`,
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
                path: `${__dirname()}/../node/modules/404/404`,
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
                path: `${__dirname()}/../node/modules/carpenter/carpenter`,
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
                path: `${__dirname()}/../node/modules/store/store`,
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
                    rootDir: `${__packageTmpDir()}/store`,
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
                path: `${__dirname()}/../node/modules/doc/doc`,
                settings: {},
            },
        },
        pages: {},
        handlers: {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1FBQzdCLE9BQU87S0FDVjtJQUVELE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBRWhEOzs7Ozs7Ozs7O1dBVUc7UUFDSCwyQkFBMkI7UUFDM0IsUUFBUSxFQUFFLFNBQVM7UUFFbkI7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksT0FBTztZQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksVUFBVTtZQUNWLE9BQU87Z0JBQ0gsTUFBTSxFQUFFLEdBQUcsZUFBZSxFQUFFLEVBQUU7Z0JBQzlCLGVBQWUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDdEQsZUFBZSxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTTtnQkFDeEQsb0JBQW9CLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxXQUFXO2dCQUNsRSxPQUFPLEVBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssWUFBWTtvQkFD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