import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
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
            '/*/*/styleguide/*': {
                handler: 'styleguide',
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
             * @name            styleguide
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "styleguide" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            styleguide: {
                /**
                 * @name          title
                 * @namespace     config.frontendServer.handlers.styleguide
                 * @type          String
                 * @default       Views | [title]
                 *
                 * Specify the page title wanted. Accessible tokens:
                 * - [title]: Name of the view
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                title: 'Styleguide | [title]',
                /**
                 * @name            handler
                 * @namespace       config.frontendServer.handlers.styleguide
                 * @type            Function
                 * @default         ${__dirname()}/../node/handlers/view
                 *
                 * Specify the handler function that will take care of responding to this "section"
                 *
                 * @since         2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                handler: `${__dirname()}/../node/handlers/styleguide`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLFdBQVcsRUFBRTtRQUV2Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLGtDQUFrQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxNQUFNLEVBQUUsOEJBQThCO1NBQ3pDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUU7WUFDSCxNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLGdDQUFnQztnQkFDdkMsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRSwrQkFBK0I7b0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2lCQUNyQjthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxjQUFjO2dCQUNyQixRQUFRLEVBQUU7b0JBQ04sTUFBTSxFQUFFLCtCQUErQjtvQkFDdkMsWUFBWSxFQUFFLElBQUk7aUJBQ3JCO2FBQ0o7U0FDSjtRQUVELFdBQVcsRUFBRTtZQUNULEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUscUNBQXFDO2dCQUN6RCxR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