"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ipAddress_1 = __importDefault(require("@coffeekraken/sugar/node/network/ipAddress"));
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
        '/dist': `[config.storage.distDir]`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkZBQXFFO0FBRXJFLGtCQUFlO0lBQ2IsTUFBTSxFQUFFLGlCQUFpQjtJQUV6Qjs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxFQUFFLElBQUk7SUFFVjs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG1CQUFXLEVBQUU7SUFFdkI7Ozs7Ozs7Ozs7T0FVRztJQUNILE9BQU8sRUFBRSwwQkFBMEI7SUFFbkM7Ozs7Ozs7Ozs7T0FVRztJQUNILFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRSwwQkFBMEI7UUFDbkMsMkRBQTJEO0tBQzVEO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFFBQVEsRUFBRSwrQkFBK0I7SUFFekMsV0FBVyxFQUFFO1FBQ1gsd0JBQXdCLEVBQUU7WUFDeEIsSUFBSSxFQUFFLEdBQUcsU0FBUyw4Q0FBOEM7WUFDaEUsUUFBUSxFQUFFO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLGlDQUFpQztnQkFDMUMsVUFBVSxFQUFFO29CQUNWLElBQUk7b0JBQ0osS0FBSztvQkFDTCxNQUFNO29CQUNOLElBQUk7b0JBQ0osS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxNQUFNO29CQUNOLE1BQU07b0JBQ04sS0FBSztvQkFDTCxNQUFNO29CQUNOLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLE1BQU07b0JBQ04sS0FBSztpQkFDTjthQUNGO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsR0FBRyxTQUFTLHlDQUF5QztZQUMzRCxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEdBQUcsU0FBUyxtQ0FBbUM7WUFD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