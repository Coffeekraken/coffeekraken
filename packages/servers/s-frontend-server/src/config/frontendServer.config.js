"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/utils/ipAddress"));
exports.default = {
    assets: '[config.assets]',
    /**
     * @name              port
     * @namespace         config.frontendServer
     * @type              Number
     * @default           8080
     *
     * Specify the port to use for the frontend server
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    port: 8080,
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
    hostname: ipAddress_1.default(),
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
    middlewares: {
        resolveExtensionFreePath: {
            path: `${__dirname}/../node/middleware/resolveExtensionFreePath`,
            settings: {
                exclude: ['/docMap'],
                rootDir: '[config.frontendServer.rootDir]',
                extensions: [
                    'js',
                    'jsx',
                    'json',
                    'ts',
                    'tsx',
                    'mjs',
                    'cjs',
                    'css',
                    'scss',
                    'sass',
                    'jpg',
                    'jpeg',
                    'png',
                    'gif',
                    'svg',
                    'html',
                    'htm'
                ]
            }
        },
        frontspec: {
            path: `${__dirname}/../node/middleware/frontspecMiddleware`,
            settings: {}
        },
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
        }
        // /**
        //  * @name            doc
        //  * @namespace       config.frontendServer.handlers
        //  * @type            Object
        //  *
        //  * Store all the "doc" configuration access like the route, the title, etc...
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // doc: {
        //   /**
        //    * @name          route
        //    * @namespace     config.frontendServer.handlers.views
        //    * @type          String
        //    * @default       /doc
        //    *
        //    * Specify the url route to use for this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   route: '/doc',
        //   /**
        //    * @name          title
        //    * @namespace     config.frontendServer.handlers.views
        //    * @type          String
        //    * @default       Views | [title]
        //    *
        //    * Specify the page title wanted. Accessible tokens:
        //    * - [title]: Name of the view
        //    *
        //    * @since       2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   title: 'Doc | [title]',
        //   /**
        //    * @name            handler
        //    * @namespace       config.frontendServer.handlers.views
        //    * @type            Function
        //    *
        //    * Specify the handler function that will take care of responding to this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   handler: `${__dirname}/../node/server/frontend/handlers/doc`
        // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUdBQTJFO0FBRTNFLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLGlCQUFpQjtJQUV6Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxFQUFFLElBQUk7SUFFVjs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG1CQUFXLEVBQUU7SUFFdkI7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwwQkFBMEI7SUFFbkM7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSwwQkFBMEI7UUFDckMsMkRBQTJEO0tBQzVEO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSwrQkFBK0I7SUFFekM7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxRQUFRLEVBQUUsTUFBTTtJQUVoQixXQUFXLEVBQUU7UUFDWCx3QkFBd0IsRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxTQUFTLDhDQUE4QztZQUNoRSxRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNwQixPQUFPLEVBQUUsaUNBQWlDO2dCQUMxQyxVQUFVLEVBQUU7b0JBQ1YsSUFBSTtvQkFDSixLQUFLO29CQUNMLE1BQU07b0JBQ04sSUFBSTtvQkFDSixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLE1BQU07b0JBQ04sTUFBTTtvQkFDTixLQUFLO29CQUNMLE1BQU07b0JBQ04sS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixLQUFLO2lCQUNOO2FBQ0Y7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLFNBQVMseUNBQXlDO1lBQzNELFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxHQUFH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