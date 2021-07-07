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
            route: __SugarConfig.get('vite.publicDir').replace(__SugarConfig.get('storage.package.rootDir'), ''),
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
            path: `${__dirname}/../node/middleware/benchMiddleware`,
            settings: {}
        },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBRXpELGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsa0NBQWtDO0lBRTNDOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLE1BQU0sRUFBRSw4QkFBOEI7S0FDdkM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG9DQUFvQztJQUU5Qzs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVEsRUFBRSxNQUFNO0lBRWhCLEtBQUssRUFBRTtRQUNMLE1BQU0sRUFBRTtZQUNOLEtBQUssRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUNoRCxhQUFhLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLEVBQzVDLEVBQUUsQ0FDSDtZQUNELFFBQVEsRUFBRTtnQkFDUixNQUFNLEVBQUUsK0JBQStCO2dCQUN2QyxZQUFZLEVBQUUsSUFBSTthQUNuQjtTQUNGO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsS0FBSyxFQUFFLGNBQWM7WUFDckIsUUFBUSxFQUFFO2dCQUNSLE1BQU0sRUFBRSwrQkFBK0I7Z0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2FBQ25CO1NBQ0Y7S0FDRjtJQUVELFdBQVcsRUFBRTtRQUNYLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxHQUFHLFNBQVMscUNBQXFDO1lBQ3ZELFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCw4QkFBOEI7UUFDOUIsc0VBQXNFO1FBQ3RFLGdCQUFnQjtRQUNoQiw0QkFBNEI7UUFDNUIsa0RBQWtEO1FBQ2xELG9CQUFvQjtRQUNwQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsZUFBZTtRQUNmLGVBQWU7UUFDZixlQUFlO1FBQ2YsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsZUFBZTtRQUNmLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLFFBQVE7UUFDUixNQUFNO1FBQ04sS0FBSztRQUNMLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLFNBQVMseUNBQXlDO1lBQzNELFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxtQkFBbUI7UUFDbkIscUVBQXFFO1FBQ3JFLGlCQUFpQjtRQUNqQixLQUFLO1FBQ0wsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsU0FBUyxtQ0FBbUM7WUFDckQsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxHQUFHLFNBQVMsMkNBQTJDO1lBQzdELFFBQVEsRUFBRSxFQUFFO1NBQ2I7S0FDRjtJQUVELE1BQU0sRUFBRTtRQUNOLEdBQUcsRUFBRTtZQUNILE9BQU8sRUFBRSxPQUFPO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLE1BQU07U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsS0FBSztTQUNmO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsT0FBTyxFQUFFLFFBQVE7U0FDbEI7S0FDRjtJQUVELFFBQVEsRUFBRTtRQUNSOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRTtZQUNMOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLG1CQUFtQjtZQUMxQjs7Ozs7Ozs7O2VBU0c7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLHlCQUF5QjtTQUMvQztRQUVEOzs7Ozs7Ozs7V0FTRztRQUNILElBQUksRUFBRTtZQUNKOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLGdCQUFnQjtZQUN2Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLHdCQUF3QjtTQUM5QztRQUNEOzs7Ozs7Ozs7V0FTRztRQUNILEdBQUcsRUFBRTtZQUNIOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsS0FBSyxFQUFFLGVBQWU7WUFDdEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILE9BQU8sRUFBRSxHQUFHLFNBQVMsdUJBQXVCO1NBQzdDO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsTUFBTSxFQUFFO1lBQ047Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLDBCQUEwQjtTQUNoRDtLQUNGO0NBQ0YsQ0FBQyJ9