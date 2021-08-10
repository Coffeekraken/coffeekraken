import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
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
        '/src': `[config.storage.src.rootDir]`
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
                changeOrigin: true
            }
        },
        vitePing: {
            route: '/__vite_ping',
            settings: {
                target: '[config.vite.server.hostname]',
                changeOrigin: true
            }
        }
    },
    middlewares: {
        bench: {
            path: `${__dirname()}/../node/middleware/benchMiddleware`,
            settings: {}
        },
        frontspec: {
            path: `${__dirname()}/../node/middleware/frontspecMiddleware`,
            settings: {}
        },
        docmap: {
            path: `${__dirname()}/../node/middleware/docmapMiddleware`,
            settings: {}
        },
        env: {
            path: `${__dirname()}/../node/middleware/envMiddleware`,
            settings: {}
        },
        packageJson: {
            path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
            settings: {}
        }
    },
    modules: {
        'docmapRoutes': `${__dirname()}/../node/modules/docmap/docmap`
    },
    routes: {
        '/': {
            handler: 'index'
        },
        '/view/*': {
            handler: 'view'
        },
        '/doc/api/*': {
            handler: 'doc'
        },
        '/api/config': {
            handler: 'config'
        },
        '/api/docmap': {
            handler: 'docmap'
        }
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
            handler: `${__dirname()}/../node/handlers/index`
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
            handler: `${__dirname()}/../node/handlers/view`
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
            handler: `${__dirname()}/../node/handlers/doc`
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
            handler: `${__dirname()}/../node/handlers/markdown`
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
            handler: `${__dirname()}/../node/handlers/docmap`
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
            handler: `${__dirname()}/../node/handlers/config`
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELGVBQWU7SUFDYjs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxFQUFFLElBQUk7SUFFVjs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLFdBQVcsRUFBRTtJQUV2Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTyxFQUFFLGtDQUFrQztJQUUzQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsVUFBVSxFQUFFO1FBQ1YsT0FBTyxFQUFFLCtCQUErQjtRQUN4QyxNQUFNLEVBQUUsOEJBQThCO0tBQ3ZDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSxvQ0FBb0M7SUFFOUM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLEVBQUUsTUFBTTtJQUVoQixLQUFLLEVBQUU7UUFDTCxNQUFNLEVBQUU7WUFDTixLQUFLLEVBQUUsZ0NBQWdDO1lBQ3ZDLFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsK0JBQStCO2dCQUN2QyxZQUFZLEVBQUUsSUFBSTthQUNuQjtTQUNGO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLGNBQWM7WUFDckIsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7S0FDRjtJQUVELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxxQ0FBcUM7WUFDekQsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSx5Q0FBeUM7WUFDN0QsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxzQ0FBc0M7WUFDMUQsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxtQ0FBbUM7WUFDdkQsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSwyQ0FBMkM7WUFDL0QsUUFBUSxFQUFFLEVBQUU7U0FDYjtLQUNGO0lBRUQsT0FBTyxFQUFFO1FBQ1AsY0FBYyxFQUFFLEdBQUcsU0FBUyxFQUFFLGdDQUFnQztLQUMvRDtJQUVELE1BQU0sRUFBRTtRQUNOLEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRCxhQUFhLEVBQUU7WUFDYixPQUFPLEVBQUUsUUFBUTtTQUNsQjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1I7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCOzs7Ozs7Ozs7ZUFTRztZQUNILE9BQU8sRUFBRSxHQUFHLFNBQVMsRUFBRSx5QkFBeUI7U0FDakQ7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLEVBQUU7WUFDSjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxnQkFBZ0I7WUFDdkI7Ozs7Ozs7OztlQVNHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLHdCQUF3QjtTQUNoRDtRQUNEOzs7Ozs7Ozs7V0FTRztRQUNILEdBQUcsRUFBRTtZQUNIOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLGVBQWU7WUFDdEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxHQUFHLFNBQVMsRUFBRSx1QkFBdUI7U0FDL0M7UUFDRDs7Ozs7Ozs7O1dBU0c7UUFDSCxRQUFRLEVBQUU7WUFDUjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxlQUFlO1lBQ3RCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLEVBQUUsNEJBQTRCO1NBQ3BEO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsTUFBTSxFQUFFO1lBQ047Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLEVBQUUsMEJBQTBCO1NBQ2xEO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsTUFBTSxFQUFFO1lBQ047Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLEVBQUUsMEJBQTBCO1NBQ2xEO0tBQ0Y7Q0FDRixDQUFDIn0=