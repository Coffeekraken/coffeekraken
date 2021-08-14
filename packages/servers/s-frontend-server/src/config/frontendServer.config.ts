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
