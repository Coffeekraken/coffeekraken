import __ipAddress from '@coffeekraken/sugar/node/network/utils/ipAddress';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default function (env, config) {
    if (env.platform !== 'node')
        return;
    return {
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
            '/src': `[config.storage.src.rootDir]`,
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
                route: '[config.storage.serve.rootDir]',
                settings: {
                    target: '[config.vite.server.hostname]',
                    changeOrigin: true,
                },
            },
            vitePing: {
                route: '/__vite_ping',
                settings: {
                    target: '[config.vite.server.hostname]',
                    changeOrigin: true,
                },
            },
        },
        middlewares: {
            bench: {
                path: `${__dirname()}/../node/middleware/benchMiddleware`,
                settings: {},
            },
            request: {
                path: `${__dirname()}/../node/middleware/requestMiddleware`,
                settings: {},
            },
            frontspec: {
                path: `${__dirname()}/../node/middleware/frontspecMiddleware`,
                settings: {},
            },
            docmap: {
                path: `${__dirname()}/../node/middleware/docmapMiddleware`,
                settings: {},
            },
            env: {
                path: `${__dirname()}/../node/middleware/envMiddleware`,
                settings: {},
            },
            packageJson: {
                path: `${__dirname()}/../node/middleware/packageJsonMiddleware`,
                settings: {},
            },
        },
        modules: {
            docmapRoutes: `${__dirname()}/../node/modules/docmap/docmap`,
            styleguideRoutes: `${__dirname()}/../node/modules/styleguide/styleguide`,
            apiRoutes: `${__dirname()}/../node/modules/api/api`,
        },
        routes: {
            '/': {
                handler: 'index',
            },
            '/view/*': {
                handler: 'view',
            },
            '/doc/api/*': {
                handler: 'doc',
            },
            '/api/config': {
                handler: 'config',
            },
            '/api/docmap': {
                handler: 'docmap',
            },
            '/styleguide/*': {
                handler: 'styleguide',
            },
            '/*/*/styleguide/*': {
                handler: 'styleguide',
            },
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
            index: `${__dirname()}/../node/handlers/index`,
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
            view: `${__dirname()}/../node/handlers/view`,
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
            doc: `${__dirname()}/../node/handlers/doc`,
            /**
             * @name            markdown
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "markdown" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            markdown: `${__dirname()}/../node/handlers/markdown`,
            /**
             * @name            styleguide
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "styleguide" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            styleguide: `${__dirname()}/../node/handlers/styleguide`,
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
            docmap: `${__dirname()}/../node/handlers/docmap`,
            /**
             * @name            config
             * @namespace       config.frontendServer.handlers
             * @type            Object
             *
             * Store all the "api doc" configuration access like the route, the title, etc...
             *
             * @since         2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            config: `${__dirname()}/../node/handlers/config`,
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJvbnRlbmRTZXJ2ZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGtEQUFrRCxDQUFDO0FBQzNFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBRzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXBDLE9BQU87UUFDSDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxFQUFFLElBQUk7UUFFVjs7Ozs7Ozs7OztXQVVHO1FBQ0gsUUFBUSxFQUFFLFdBQVcsRUFBRTtRQUV2Qjs7Ozs7Ozs7OztXQVVHO1FBQ0gsT0FBTyxFQUFFLGtDQUFrQztRQUUzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gsVUFBVSxFQUFFO1lBQ1IsT0FBTyxFQUFFLCtCQUErQjtZQUN4QyxNQUFNLEVBQUUsOEJBQThCO1NBQ3pDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFFBQVEsRUFBRSxvQ0FBb0M7UUFFOUM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxRQUFRLEVBQUUsTUFBTTtRQUVoQixLQUFLLEVBQUU7WUFDSCxNQUFNLEVBQUU7Z0JBQ0osS0FBSyxFQUFFLGdDQUFnQztnQkFDdkMsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRSwrQkFBK0I7b0JBQ3ZDLFlBQVksRUFBRSxJQUFJO2lCQUNyQjthQUNKO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLEtBQUssRUFBRSxjQUFjO2dCQUNyQixRQUFRLEVBQUU7b0JBQ04sTUFBTSxFQUFFLCtCQUErQjtvQkFDdkMsWUFBWSxFQUFFLElBQUk7aUJBQ3JCO2FBQ0o7U0FDSjtRQUVELFdBQVcsRUFBRTtZQUNULEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUscUNBQXFDO2dCQUN6RCxRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSx1Q0FBdUM7Z0JBQzNELFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLHlDQUF5QztnQkFDN0QsUUFBUSxFQUFFLEVBQUU7YUFDZjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsc0NBQXNDO2dCQUMxRCxRQUFRLEVBQUUsRUFBRTthQUNmO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxHQUFHLFNBQVMsRUFBRSxtQ0FBbUM7Z0JBQ3ZELFFBQVEsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLEdBQUcsU0FBUyxFQUFFLDJDQUEyQztnQkFDL0QsUUFBUSxFQUFFLEVBQUU7YUFDZjtTQUNKO1FBRUQsT0FBTyxFQUFFO1lBQ0wsWUFBWSxFQUFFLEdBQUcsU0FBUyxFQUFFLGdDQUFnQztZQUM1RCxnQkFBZ0IsRUFBRSxHQUFHLFNBQVMsRUFBRSx3Q0FBd0M7WUFDeEUsU0FBUyxFQUFFLEdBQUcsU0FBUyxFQUFFLDBCQUEwQjtTQUN0RDtRQUVELE1BQU0sRUFBRTtZQUNKLEdBQUcsRUFBRTtnQkFDRCxPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELFlBQVksRUFBRTtnQkFDVixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELGVBQWUsRUFBRTtnQkFDYixPQUFPLEVBQUUsWUFBWTthQUN4QjtZQUNELG1CQUFtQixFQUFFO2dCQUNqQixPQUFPLEVBQUUsWUFBWTthQUN4QjtTQUNKO1FBRUQsUUFBUSxFQUFFO1lBQ047Ozs7Ozs7OztlQVNHO1lBQ0gsS0FBSyxFQUFFLEdBQUcsU0FBUyxFQUFFLHlCQUF5QjtZQUU5Qzs7Ozs7Ozs7O2VBU0c7WUFDSCxJQUFJLEVBQUUsR0FBRyxTQUFTLEVBQUUsd0JBQXdCO1lBQzVDOzs7Ozs7Ozs7ZUFTRztZQUNILEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRSx1QkFBdUI7WUFDMUM7Ozs7Ozs7OztlQVNHO1lBQ0gsUUFBUSxFQUFFLEdBQUcsU0FBUyxFQUFFLDRCQUE0QjtZQUNwRDs7Ozs7Ozs7O2VBU0c7WUFDSCxVQUFVLEVBQUUsR0FBRyxTQUFTLEVBQUUsOEJBQThCO1lBQ3hEOzs7Ozs7Ozs7ZUFTRztZQUNILE1BQU0sRUFBRSxHQUFHLFNBQVMsRUFBRSwwQkFBMEI7WUFFaEQ7Ozs7Ozs7OztlQVNHO1lBQ0gsTUFBTSxFQUFFLEdBQUcsU0FBUyxFQUFFLDBCQUEwQjtTQUNuRDtLQUNKLENBQUM7QUFDTixDQUFDIn0=