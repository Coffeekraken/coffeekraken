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
        }
        // /**
        //  * @name            docMap
        //  * @namespace       config.frontendServer.handlers
        //  * @type            Object
        //  *
        //  * Store all the "docMap" configuration access like the route, the title, etc...
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // docMap: {
        //   /**
        //    * @name          route
        //    * @namespace     config.frontendServer.handlers.docMap
        //    * @type          String
        //    * @default       /docMap
        //    *
        //    * Specify the url route to use for this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   route: '/docMap',
        //   /**
        //    * @name          title
        //    * @namespace     config.frontendServer.handlers.docMap
        //    * @type          String
        //    * @default       docMap | [title]
        //    *
        //    * Specify the page title wanted. Accessible tokens:
        //    * - [title]: Name of the view
        //    *
        //    * @since       2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   title: 'docMap.json',
        //   /**
        //    * @name            handler
        //    * @namespace       config.frontendServer.handlers.docMap
        //    * @type            Function
        //    *
        //    * Specify the handler function that will take care of responding to this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   handler: `${__dirname}/../node/server/frontend/handlers/docMap`
        // },
        // /**
        //  * @name            doc
        //  * @namespace       config.frontendServer.handlers
        //  * @type            Object
        //  *
        //  * Store all the accessible pages of the frontend development website
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // doc: {
        //   /**
        //    * @name            route
        //    * @namespace       config.frontendServer.handlers.doc
        //    * @type            String
        //    * @default         /doc
        //    *
        //    * Specify the url route to use for this "section"
        //    *
        //    * @since           2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   route: '/doc',
        //   /**
        //    * @name            title
        //    * @namespace       config.frontendServer.handlers.doc
        //    * @type            String
        //    * @default         Documentation | [title]
        //    *
        //    * Specify the title to use for this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   title: 'Documentation | [title]',
        //   /**
        //    * @name            handler
        //    * @namespace       config.frontendServer.handlers.doc
        //    * @type            Function
        //    *
        //    * Specify the handler function that will take care of responding to this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   handler: `${__dirname}/../node/server/frontend/handlers/doc`
        // },
        // /**
        //  * @name            search
        //  * @namespace       config.frontendServer.handlers
        //  * @type            Object
        //  *
        //  * Store all the accessible pages of the frontend development website
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // search: {
        //   /**
        //    * @name            route
        //    * @namespace       config.frontendServer.handlers.search
        //    * @type            String
        //    * @default         /search
        //    *
        //    * Search handler that handle the response to search requests
        //    *
        //    * @since           2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   route: '/search',
        //   /**
        //    * @name            title
        //    * @namespace       config.frontendServer.handlers.search
        //    * @type            String
        //    * @default         Search | [title]
        //    *
        //    * Specify the title to use for this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   title: 'Search | [title]',
        //   /**
        //    * @name            handler
        //    * @namespace       config.frontendServer.handlers.search
        //    * @type            Function
        //    *
        //    * Specify the handler function that will take care of responding to this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   handler: `${__dirname}/../node/server/frontend/handlers/search`,
        //   /**
        //    * @name        settings
        //    * @namespace   config.frontendServer.handlers.search
        //    * @type        Object
        //    *
        //    * Specify the settings passes to the handle function.
        //    * For more documentation about these settings, please see the
        //    * handler function documentation.
        //    *
        //    * @since           2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   settings: {
        //     rules: {
        //       docMap: {
        //         keyword: 'doc',
        //         handler: `${__dirname}/../node/search/handlers/docMap`,
        //         settings: {
        //           filePath: `${__packageRoot()}/docMap.json`
        //         }
        //       }
        //     }
        //   }
        // }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpELGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsMEJBQTBCO0lBRW5DOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLDJEQUEyRDtLQUM1RDtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsK0JBQStCO0lBRXpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxFQUFFLE1BQU07SUFFaEIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQ2hELGFBQWEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFDcEMsRUFBRSxDQUNIO1lBQ0QsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7UUFDRCxRQUFRLEVBQUU7WUFDUixLQUFLLEVBQUUsY0FBYztZQUNyQixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLCtCQUErQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7YUFDbkI7U0FDRjtLQUNGO0lBRUQsV0FBVyxFQUFFO1FBQ1gsOEJBQThCO1FBQzlCLHNFQUFzRTtRQUN0RSxnQkFBZ0I7UUFDaEIsNEJBQTRCO1FB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