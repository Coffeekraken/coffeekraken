import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __sugarConfig from '@coffeekraken/s-sugar-config';
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
            route: __sugarConfig('vite.publicDir').replace(__sugarConfig('storage.rootDir'), ''),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpELGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsMEJBQTBCO0lBRW5DOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsMEJBQTBCO1FBQ3JDLDJEQUEyRDtLQUM1RDtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsK0JBQStCO0lBRXpDOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxFQUFFLE1BQU07SUFFaEIsS0FBSyxFQUFFO1FBQ0wsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FDNUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQ2hDLEVBQUUsQ0FDSDtZQUNELFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsK0JBQStCO2dCQUN2QyxZQUFZLEVBQUUsSUFBSTthQUNuQjtTQUNGO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLGNBQWM7WUFDckIsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7S0FDRjtJQUVELFdBQVcsRUFBRTtRQUNYLDhCQUE4QjtRQUM5QixzRUFBc0U7UUFDdEUsZ0JBQWdCO1FBQ2hCLDRCQUE0QjtRQUM1QixrREFBa0Q7UUFDbEQsb0JB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