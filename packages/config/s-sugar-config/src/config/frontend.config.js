"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("../node/network/utils/ipAddress"));
exports.default = {
    assets: '[config.assets]',
    /**
     * @name              port
     * @namespace         config.sugar-ui.modules.frontendServer.settings
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
     * @namespace         config.sugar-ui.modules.frontendServer.settings
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
     * @namespace         config.sugar-ui.modules.frontendServer.settings
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
     * @namespace         config.sugar-ui.modules.frontendServer.settings
     * @type              Object<String>
     * @default           [config.storage.rootDir]/dist
     *
     * Specify a directory that will be served as static files
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    staticDirs: {
        '/dist': `[config.storage.rootDir]/dist`,
        '/node_modules': '[config.storage.rootDir]/node_modules'
    },
    /**
     * @name            viewsDir
     * @namespace       config.sugar-ui.modules.frontendServer.settings
     * @type            String
     * @default         [config.storage.rootDir]/views
     *
     * Specify the views directory path
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    viewsDir: `[config.storage.rootDir]/src/views`,
    middlewares: {
        resolveExtensionFreePath: {
            path: `${__dirname}/../node/server/frontend/middleware/resolveExtensionFreePath`,
            settings: {
                exclude: ['/docMap'],
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
            path: `${__dirname}/../node/server/frontend/middleware/frontspecMiddleware`,
            settings: {}
        },
        env: {
            path: `${__dirname}/../node/server/frontend/middleware/envMiddleware`,
            settings: {}
        },
        packageJson: {
            path: `${__dirname}/../node/server/frontend/middleware/packageJsonMiddleware`,
            settings: {}
        }
    },
    handlers: {
        /**
         * @name            views
         * @namespace       config.frontend.handlers
         * @type            Object
         *
         * Store all the "views" configuration access like the slug, the title, etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        views: {
            /**
             * @name          slug
             * @namespace     config.frontend.handlers.views
             * @type          String
             * @default       /views
             *
             * Specify the url slug to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            slug: '/views',
            /**
             * @name          title
             * @namespace     config.frontent.pages.views
             * @type          String
             * @default       Views | [title]
             *
             * Specify the page title wanted. Accessible tokens:
             * - [title]: Name of the view
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            title: 'Views | [title]',
            /**
             * @name            handler
             * @namespace       config.frontend.handlers.views
             * @type            Function
             *
             * Specify the handler function that will take care of responding to this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            handler: `${__dirname}/../node/server/frontend/handlers/views`
        },
        /**
         * @name            doc
         * @namespace       config.frontend.handlers
         * @type            Object
         *
         * Store all the "doc" configuration access like the slug, the title, etc...
         *
         * @since         2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        doc: {
            /**
             * @name          slug
             * @namespace     config.frontend.handlers.views
             * @type          String
             * @default       /doc
             *
             * Specify the url slug to use for this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            slug: '/doc',
            /**
             * @name          title
             * @namespace     config.frontent.pages.views
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
             * @namespace       config.frontend.handlers.views
             * @type            Function
             *
             * Specify the handler function that will take care of responding to this "section"
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            handler: `${__dirname}/../node/server/frontend/handlers/doc`
        }
        // /**
        //  * @name            docMap
        //  * @namespace       config.frontend.handlers
        //  * @type            Object
        //  *
        //  * Store all the "docMap" configuration access like the slug, the title, etc...
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // docMap: {
        //   /**
        //    * @name          slug
        //    * @namespace     config.frontend.handlers.docMap
        //    * @type          String
        //    * @default       /docMap
        //    *
        //    * Specify the url slug to use for this "section"
        //    *
        //    * @since         2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   slug: '/docMap',
        //   /**
        //    * @name          title
        //    * @namespace     config.frontent.pages.docMap
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
        //    * @namespace       config.frontend.handlers.docMap
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
        //  * @namespace       config.frontend.handlers
        //  * @type            Object
        //  *
        //  * Store all the accessible pages of the frontend development website
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // doc: {
        //   /**
        //    * @name            slug
        //    * @namespace       config.frontend.handlers.doc
        //    * @type            String
        //    * @default         /doc
        //    *
        //    * Specify the url slug to use for this "section"
        //    *
        //    * @since           2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   slug: '/doc',
        //   /**
        //    * @name            title
        //    * @namespace       config.frontend.handlers.doc
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
        //    * @namespace       config.frontend.handlers.doc
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
        //  * @namespace       config.frontend.handlers
        //  * @type            Object
        //  *
        //  * Store all the accessible pages of the frontend development website
        //  *
        //  * @since         2.0.0
        //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //  */
        // search: {
        //   /**
        //    * @name            slug
        //    * @namespace       config.frontend.handlers.search
        //    * @type            String
        //    * @default         /search
        //    *
        //    * Search handler that handle the response to search requests
        //    *
        //    * @since           2.0.0
        //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        //    */
        //   slug: '/search',
        //   /**
        //    * @name            title
        //    * @namespace       config.frontend.handlers.search
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
        //    * @namespace       config.frontend.handlers.search
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
        //    * @namespace   config.frontend.handlers.search
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQTBEO0FBRTFELGtCQUFlO0lBQ2IsTUFBTSxFQUFFLGlCQUFpQjtJQUV6Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxFQUFFLElBQUk7SUFFVjs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG1CQUFXLEVBQUU7SUFFdkI7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwwQkFBMEI7SUFFbkM7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSwrQkFBK0I7UUFDeEMsZUFBZSxFQUFFLHVDQUF1QztLQUN6RDtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsb0NBQW9DO0lBRTlDLFdBQVcsRUFBRTtRQUNYLHdCQUF3QixFQUFFO1lBQ3hCLElBQUksRUFBRSxHQUFHLFNBQVMsOERBQThEO1lBQ2hGLFFBQVEsRUFBRTtnQkFDUixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLFVBQVUsRUFBRTtvQkFDVixJQUFJO29CQUNKLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixJQUFJO29CQUNKLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixNQUFNO29CQUNOLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxNQUFNO29CQUNOLEtBQUs7aUJBQ047YUFDRjtTQUNGO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLEdBQUcsU0FBUyx5REFBeUQ7WUFDM0UsUUFBUSxFQUFFLEVBQUU7U0FDYjtRQUNELEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxHQUFHLFNBQVMsbURBQW1EO1lBQ3JFLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFD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