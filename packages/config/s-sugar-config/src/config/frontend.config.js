import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
export default {
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
    hostname: __ipAddress(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBRTNFLGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsMEJBQTBCO0lBRW5DOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLGVBQWUsRUFBRSx1Q0FBdUM7S0FDekQ7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLG9DQUFvQztJQUU5QyxXQUFXLEVBQUU7UUFDWCx3QkFBd0IsRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxTQUFTLDhEQUE4RDtZQUNoRixRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNwQixVQUFVLEVBQUU7b0JBQ1YsSUFBSTtvQkFDSixLQUFLO29CQUNMLE1BQU07b0JBQ04sSUFBSTtvQkFDSixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLE1BQU07b0JBQ04sTUFBTTtvQkFDTixLQUFLO29CQUNMLE1BQU07b0JBQ04sS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixLQUFLO2lCQUNOO2FBQ0Y7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLFNBQVMseURBQXlEO1lBQzNFLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsR0FBRyxTQUFTLG1EQUFtRDtZQUNyRSxRQUFRLEVBQUUs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