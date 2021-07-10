import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default {
    assets: '[config.assets]',
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
        // resolveExtensionFreePath: {
        //   path: `${__dirname()}/../node/middleware/resolveExtensionFreePath`,
        //   settings: {
        //     exclude: ['/docMap'],
        //     rootDir: '[config.frontendServer.rootDir]',
        //     extensions: [
        //       'js',
        //       'jsx',
        //       'json',
        //       'ts',
        //       'tsx',
        //       'mjs',
        //       'cjs',
        //       'css',
        //       'scss',
        //       'sass',
        //       'jpg',
        //       'jpeg',
        //       'png',
        //       'gif',
        //       'svg',
        //       'html',
        //       'htm'
        //     ]
        //   }
        // },
        frontspec: {
            path: `${__dirname()}/../node/middleware/frontspecMiddleware`,
            settings: {}
        },
        // defaultAssets: {
        //   path: `${__dirname()}/../node/middleware/defaultAssetsMiddleware`,
        //   settings: {}
        // },
        env: {
            path: `${__dirname()}/../node/middleware/envMiddleware`,
            settings: {}
        },
        packageJson: {
            path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
            settings: {}
        }
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRTVELGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsa0NBQWtDO0lBRTNDOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLE1BQU0sRUFBRSw4QkFBOEI7S0FDdkM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG9DQUFvQztJQUU5Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVEsRUFBRSxNQUFNO0lBRWhCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxnQ0FBZ0M7WUFDdkMsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsY0FBYztZQUNyQixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLCtCQUErQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7YUFDbkI7U0FDRjtLQUNGO0lBRUQsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLHFDQUFxQztZQUN6RCxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBQ0QsOEJBQThCO1FBQzlCLHdFQUF3RTtRQUN4RSxnQkFBZ0I7UUFDaEIsNEJBQTRCO1FBQzVCLGtEQUFrRDtRQUNsRCxvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxRQUFRO1FBQ1IsTUFBTTtRQUNOLEtBQUs7UUFDTCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUseUNBQXlDO1lBQzdELFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxtQkFBbUI7UUFDbkIsdUVBQXVFO1FBQ3ZFLGlCQUFpQjtRQUNqQixLQUFLO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLG1DQUFtQztZQUN2RCxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLDJDQUEyQztZQUMvRCxRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0Y7SUFFRCxNQUFNLEVBQUU7UUFDTixHQUFHLEVBQUU7WUFDSCxPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULE9BQU8sRUFBRSxNQUFNO1NBQ2hCO1FBQ0QsWUFBWSxFQUFFO1lBQ1osT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNELGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRSxRQUFRO1NBQ2xCO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUjs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUU7WUFDTDs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxtQkFBbUI7WUFDMUI7Ozs7Ozs7OztlQVNHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLHlCQUF5QjtTQUNqRDtRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksRUFBRTtZQUNKOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLGdCQUFnQjtZQUN2Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLEVBQUUsd0JBQXdCO1NBQ2hEO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsR0FBRyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsZUFBZTtZQUN0Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLHVCQUF1QjtTQUMvQztRQUNEOzs7Ozs7Ozs7V0FTRztRQUNILE1BQU0sRUFBRTtZQUNOOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLGtCQUFrQjtZQUN6Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyxFQUFFLDBCQUEwQjtTQUNsRDtLQUNGO0NBQ0YsQ0FBQyJ9