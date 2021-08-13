import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return {};
    return {
        /**
         * @name              port
         * @namespace         config.frontendServer
         * @type              Number
         * @default           8888
         *
         * Specify the port to use for the frontend server
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        port: 8888,
        /**
         * @name              hostname
         * @namespace         config.frontendServer
         * @type              String
         * @default           __ipAddress()
         *
         * Specify the hostname to use for the frontend server
         *
         * @since             2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        hostname: __ipAddress(),
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
            '/dist': `[config.storage.dist.rootDir]`,
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
            assets: {
                route: '[config.storage.serve.rootDir]',
                settings: {
                    target: '[config.vite.server.hostname]',
                    changeOrigin: true,
                },
            },
            vitePing: {
                route: '/__vite_ping',
                settings: {
                    target: '[config.vite.server.hostname]',
                    changeOrigin: true,
                },
            },
        },
        middlewares: {
            bench: {
                path: `${__dirname()}/../node/middleware/benchMiddleware`,
                settings: {},
            },
            frontspec: {
                path: `${__dirname()}/../node/middleware/frontspecMiddleware`,
                settings: {},
            },
            docmap: {
                path: `${__dirname()}/../node/middleware/docmapMiddleware`,
                settings: {},
            },
            env: {
                path: `${__dirname()}/../node/middleware/envMiddleware`,
                settings: {},
            },
            packageJson: {
                path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
                settings: {},
            },
        },
        modules: {
            docmapRoutes: `${__dirname()}/../node/modules/docmap/docmap`,
        },
        routes: {
            '/': {
                handler: 'index',
            },
            '/view/*': {
                handler: 'view',
            },
            '/doc/api/*': {
                handler: 'doc',
            },
            '/api/config': {
                handler: 'config',
            },
            '/api/docmap': {
                handler: 'docmap',
            },
        },
        handlers: {
            /**
             * @name            index
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "index" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            index: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.index
                 * @type          String
                 * @default       indexs | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the index
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'Welcome | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.index
                 * @type            Function
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/index`,
            },
            /**
             * @name            view
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "view" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            view: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.view
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'View | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.view
                 * @type            Function
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/view`,
            },
            /**
             * @name            doc
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            doc: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.doc
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'Doc | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.doc
                 * @type            Function
                 * @default         ${__dirname()}/../node/handlers/view
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/doc`,
            },
            /**
             * @name            markdown
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "markdown" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            markdown: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.markdown
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'Doc | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.markdown
                 * @type            Function
                 * @default         ${__dirname()}/../node/handlers/view
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/markdown`,
            },
            /**
             * @name            docmap
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "api doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            docmap: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.docmap
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'Docmap | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.docmap
                 * @type            Function
                 * @default         ${__dirname()}/../node/api/doc
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/docmap`,
            },
            /**
             * @name            config
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "api doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            config: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.config
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'config | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.config
                 * @type            Function
                 * @default         ${__dirname()}/../node/api/doc
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/config`,
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUV2QyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxJQUFJO1FBRVY7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxXQUFXLEVBQUU7UUFFdkI7Ozs7Ozs7Ozs7V0FVRztRQUNILE9BQU8sRUFBRSxrQ0FBa0M7UUFFM0M7Ozs7Ozs7Ozs7V0FVRztRQUNILFVBQVUsRUFBRTtZQUNSLE9BQU8sRUFBRSwrQkFBK0I7WUFDeEMsTUFBTSxFQUFFLDhCQUE4QjtTQUN6QztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLEVBQUUsb0NBQW9DO1FBRTlDOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsUUFBUSxFQUFFLE1BQU07UUFFaEIsS0FBSyxFQUFFO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLEtBQUssRUFBRSxnQ0FBZ0M7Z0JBQ3ZDLFFBQVEsRUFBRTtvQkFDTixNQUFNLEVBQUUsK0JBQStCO29CQUN2QyxZQUFZLEVBQUUsSUFBSTtpQkFDckI7YUFDSjtZQUNELFFBQVEsRUFBRTtnQkFDTixLQUFLLEVBQUUsY0FBYztnQkFDckIsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRSwrQkFBK0I7b0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2lCQUNyQjthQUNKO1NBQ0o7UUFFRCxXQUFXLEVBQUU7WUFDVCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLHFDQUFx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