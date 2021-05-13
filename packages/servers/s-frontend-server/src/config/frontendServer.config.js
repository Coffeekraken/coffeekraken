import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
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
        src: {
            route: '/src',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBRTNFLGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsMEJBQTBCO0lBRW5DOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLDJEQUEyRDtLQUM1RDtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsK0JBQStCO0lBRXpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxFQUFFLE1BQU07SUFFaEIsS0FBSyxFQUFFO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLE1BQU07WUFDYixRQUFRLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLCtCQUErQjtnQkFDdkMsWUFBWSxFQUFFLElBQUk7YUFDbkI7U0FDRjtRQUNELFFBQVEsRUFBRTtZQUNSLEtBQUssRUFBRSxjQUFjO1lBQ3JCLFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsK0JBQStCO2dCQUN2QyxZQUFZLEVBQUUsSUFBSTthQUNuQjtTQUNGO0tBQ0Y7SUFFRCxXQUFXLEVBQUU7UUFDWCw4QkFBOEI7UUFDOUIsc0VBQXNFO1FBQ3RFLGdCQUFnQjtRQUNoQiw0QkFBNEI7UUFDNUIsa0RBQWtEO1FBQ2xELG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtRQUNo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