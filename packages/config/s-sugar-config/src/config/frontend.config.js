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
     * @namespace         config.sugar-ui.modules.frontendServer.settings
     * @type              Object<String>
     * @default           [config.storage.package.rootDir]/dist
     *
     * Specify a directory that will be served as static files
     *
     * @since             2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    staticDirs: {
        '/dist': `[config.storage.package.rootDir]/dist`,
        '/node_modules': '[config.storage.package.rootDir]/node_modules'
    },
    /**
     * @name            viewsDir
     * @namespace       config.sugar-ui.modules.frontendServer.settings
     * @type            String
     * @default         [config.storage.package.rootDir]/views
     *
     * Specify the views directory path
     *
     * @since         2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    viewsDir: `[config.storage.package.rootDir]/src/views`,
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
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmQuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBRTNFLGVBQWU7SUFDYixNQUFNLEVBQUUsaUJBQWlCO0lBRXpCOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLEVBQUUsSUFBSTtJQUVWOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLEVBQUUsV0FBVyxFQUFFO0lBRXZCOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPLEVBQUUsa0NBQWtDO0lBRTNDOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsdUNBQXVDO1FBQ2hELGVBQWUsRUFBRSwrQ0FBK0M7S0FDakU7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsUUFBUSxFQUFFLDRDQUE0QztJQUV0RCxXQUFXLEVBQUU7UUFDWCx3QkFBd0IsRUFBRTtZQUN4QixJQUFJLEVBQUUsR0FBRyxTQUFTLDhEQUE4RDtZQUNoRixRQUFRLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNwQixVQUFVLEVBQUU7b0JBQ1YsSUFBSTtvQkFDSixLQUFLO29CQUNMLE1BQU07b0JBQ04sSUFBSTtvQkFDSixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLE1BQU07b0JBQ04sTUFBTTtvQkFDTixLQUFLO29CQUNMLE1BQU07b0JBQ04sS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsTUFBTTtvQkFDTixLQUFLO2lCQUNOO2FBQ0Y7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxHQUFHLFNBQVMseURBQXlEO1lBQzNFLFFBQVEsRUFBRSxFQUFFO1NBQ2I7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsR0FBRyxTQUFTLG1EQUFtRDtZQUNyRSxRQUFRLEVBQUUsRUFBRTtTQUNiO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLEdBQUcsU0FBUywyREFBMkQ7WUFDN0UsUUFBUSxFQUFFLEVBQUU7U0FDYjtLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1I7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxRQUFRO1lBQ2Q7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsaUJBQWlCO1lBQ3hCOzs7Ozs7Ozs7ZUFTRztZQUNILE9BQU8sRUFBRSxHQUFHLFNBQVMseUNBQXlDO1NBQy9EO1FBQ0Q7Ozs7Ozs7OztXQVNHO1FBQ0gsR0FBRyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksRUFBRSxNQUFNO1lBQ1o7Ozs7Ozs7Ozs7O2VBV0c7WUFDSCxLQUFLLEVBQUUsZUFBZTtZQUN0Qjs7Ozs7Ozs7O2VBU0c7WUFDSCxPQUFPLEVBQUUsR0FBRyxTQUFTLHVDQUF1QztTQUM3RDtLQUNGO0NBQ0YsQ0FBQyJ9