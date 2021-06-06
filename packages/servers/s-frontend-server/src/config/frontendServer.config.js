import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __SugarConfig from '@coffeekraken/s-sugar-config';
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
     * @default           [config.storage.rootDir]
     *
     * Specify the root directory to use for the frontend server
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    rootDir: `[config.storage.rootDir]`,
    /**
     * @name              staticDirs
     * @namespace         config.frontendServer
     * @type              Object<String>
     * @default           { '/dist': '[config.storage.distDir]' }
     *
     * Specify a directory that will be served as static files
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    staticDirs: {
        '/dist/*': `[config.storage.distDir]`
        // '/node_modules': '[config.storage.rootDir]/node_modules'
    },
    /**
     * @name            viewsDir
     * @namespace       config.frontendServer
     * @type            String
     * @default         [config.storage.srcDir]/views
     *
     * Specify the views directory path
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    viewsDir: `[config.storage.srcDir]/views`,
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
            route: __SugarConfig.get('vite.publicDir').replace(__SugarConfig.get('storage.rootDir'), ''),
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
        // resolveExtensionFreePath: {
        //   path: `${__dirname}/../node/middleware/resolveExtensionFreePath`,
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
            path: `${__dirname}/../node/middleware/frontspecMiddleware`,
            settings: {}
        },
        // defaultAssets: {
        //   path: `${__dirname}/../node/middleware/defaultAssetsMiddleware`,
        //   settings: {}
        // },
        env: {
            path: `${__dirname}/../node/middleware/envMiddleware`,
            settings: {}
        },
        packageJson: {
            path: `${__dirname}/../node/middleware/packageJsonMiddleware`,
            settings: {}
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
             * @name          route
             * @namespace     config.frontendServer.handlers.index
             * @type          String
             * @default       /
             *
             * Specify the url route to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            route: '/',
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
            handler: `${__dirname}/../node/handlers/index`
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
             * @name          route
             * @namespace     config.frontendServer.handlers.view
             * @type          String
             * @default       /view
             *
             * Specify the url route to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            route: '/view/*',
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
            handler: `${__dirname}/../node/handlers/view`
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
             * @name          route
             * @namespace     config.frontendServer.handlers.doc
             * @type          String
             * @default       /doc/*
             *
             * Specify the url route to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            route: '/doc/*',
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
             * @default         ${__dirname}/../node/handlers/view
             *
             * Specify the handler function that will take care of responding to this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            handler: `${__dirname}/../node/handlers/doc`
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
             * @name          route
             * @namespace     config.frontendServer.handlers.docmap
             * @type          String
             * @default       /api/docmap
             *
             * Specify the url route to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            route: '/api/docmap',
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
             * @default         ${__dirname}/../node/api/doc
             *
             * Specify the handler function that will take care of responding to this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            handler: `${__dirname}/../node/handlers/docmap`
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpELGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsMEJBQTBCO0lBRW5DOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLDJEQUEyRDtLQUM1RDtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsK0JBQStCO0lBRXpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxFQUFFLE1BQU07SUFFaEIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQ2hELGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDcEMsRUFBRSxDQUNIO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsY0FBYztZQUNyQixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLCtCQUErQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7YUFDbkI7U0FDRjtLQUNGO0lBRUQsV0FBVyxFQUFFO1FBQ1gsOEJBQThCO1FBQzlCLHNFQUFzRTtRQUN0RSxnQkFBZ0I7UUFDaEIsNEJBQTRCO1FBQzVCLGtEQUFrRDtRQUNsRCxvQkFBb0I7UUFDcEIsY0FBYztRQUNkLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGNBQWM7UUFDZCxRQUFRO1FBQ1IsTUFBTTtRQUNOLEtBQUs7UUFDTCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsR0FBRyxTQUFTLHlDQUF5QztZQUMzRCxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBQ0QsbUJBQW1CO1FBQ25CLHFFQUFxRTtRQUNyRSxpQkFBaUI7UUFDakIsS0FBSztRQUNMLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxHQUFHLFNBQVMsbUNBQW1DO1lBQ3JELFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsR0FBRyxTQUFTLDJDQUEyQztZQUM3RCxRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0Y7SUFFRCxRQUFRLEVBQUU7UUFDUjs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLEdBQUc7WUFDVjs7Ozs7Ozs7Ozs7ZUFXRztZQUNILEtBQUssRUFBRSxtQkFBbUI7WUFDMUI7Ozs7Ozs7OztlQVNHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyx5QkFBeUI7U0FDL0M7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLEVBQUU7WUFDSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLFNBQVM7WUFDaEI7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCOzs7Ozs7Ozs7ZUFTRztZQUNILE9BQU8sRUFBRSxHQUFHLFNBQVMsd0JBQXdCO1NBQzlDO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsR0FBRyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxRQUFRO1lBQ2Y7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsZUFBZTtZQUN0Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsT0FBTyxFQUFFLEdBQUcsU0FBUyx1QkFBdUI7U0FDN0M7UUFDRDs7Ozs7Ozs7O1dBU0c7UUFDSCxNQUFNLEVBQUU7WUFDTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLGFBQWE7WUFDcEI7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLDBCQUEwQjtTQUNoRDtLQUNGO0NBQ0YsQ0FBQyJ9