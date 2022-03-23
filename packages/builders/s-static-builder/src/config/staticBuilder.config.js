(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(env, config) {
        if (env.platform !== 'node')
            return;
        return {
            /**
             * @name            input
             * @namespace       config.staticBuilder
             * @type            String
             * @default         [config.storage.package.rootDir]/sitemap.xml
             *
             * Specify the input sitemap file to use for building your static website
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            input: '[config.storage.package.rootDir]/sitemap.xml',
            /**
             * @name            outDir
             * @namespace       config.staticBuilder
             * @type            String
             * @default         [config.storage.package.rootDir]/static
             *
             * Specify the outDir folder path to save your builded website
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outDir: '[config.storage.package.rootDir]/static',
            /**
             * @name            host
             * @namespace       config.staticBuilder
             * @type            String
             * @default         http://[config.frontendServer.hostname]:[config.frontendServer.port]
             *
             * Specify the host on which to make requests to
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            host: 'http://[config.frontendServer.hostname]:[config.frontendServer.port]',
            /**
             * @name            failAfter
             * @namespace       config.staticBuilder
             * @type            Number
             * @default         -1
             *
             * Specify the number of failures after which the build is considered as rejected. -1 to disable this feature
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            failAfter: -1,
            /**
             * @name            requestTimeout
             * @namespace       config.staticBuilder
             * @type            Number
             * @default         5000
             *
             * Specify after how many ms a request has to be considered as failed
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            requestTimeout: 5000,
            /**
             * @name            requestRetry
             * @namespace       config.staticBuilder
             * @type            Number
             * @default         5
             *
             * Specify the number of retry to do by request before considering it as failed
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            requestRetry: 5,
            /**
             * @name            requestRetryTimeout
             * @namespace       config.staticBuilder
             * @type            Number
             * @default         1000
             *
             * Specify how many long the builder has to wait between tries
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            requestRetryTimeout: 1000,
            /**
             * @name            clean
             * @namespace       config.staticBuilder
             * @type            Boolean
             * @default         false
             *
             * Specify if you want to clean the past builds before rebuilding. THis would do the same as setting the "incremental" option to false
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            clean: false,
            /**
             * @name            incremental
             * @namespace       config.staticBuilder
             * @type            Boolean
             * @default         true
             *
             * Specify if you want to use incremental build
             *
             * @since           2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            incremental: true,
            assets: {
                docmap: {
                    /**
                     * @name            from
                     * @namespace       config.staticBuilder.assets.docmap
                     * @type            String
                     * @default         [config.staticBuilder.host]/docmap.json
                     *
                     * Specify the directory/file/url from which to get the asset to copy
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    from: '[config.staticBuilder.host]/docmap.json',
                    /**
                     * @name            to
                     * @namespace       config.staticBuilder.assets.docmap
                     * @type            String
                     * @default         [config.staticBuilder.outDir]/docmap.json
                     *
                     * Specify the directory where you want to paste the asset(s)
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    to: '[config.staticBuilder.outDir]/docmap.json',
                },
                manifest: {
                    /**
                     * @name            from
                     * @namespace       config.staticBuilder.assets.manifest
                     * @type            String
                     * @default         [config.storage.package.rootDir]/manifest.json
                     *
                     * Specify the directory/file to copy
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    from: '[config.storage.package.rootDir]/manifest.json',
                    /**
                     * @name            to
                     * @namespace       config.staticBuilder.assets.manifest
                     * @type            String
                     * @default         [config.staticBuilder.outDir]/manifest.json
                     *
                     * Specify the directory where you want to paste the asset(s)
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    to: '[config.staticBuilder.outDir]/manifest.json',
                },
                sitemap: {
                    /**
                     * @name            from
                     * @namespace       config.staticBuilder.assets.sitemap
                     * @type            String
                     * @default         [config.storage.package.rootDir]/sitemap.xml
                     *
                     * Specify the directory/file to copy
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    from: '[config.storage.package.rootDir]/sitemap.xml',
                    /**
                     * @name            to
                     * @namespace       config.staticBuilder.assets.sitemap
                     * @type            String
                     * @default         [config.staticBuilder.outDir]/sitemap.xml
                     *
                     * Specify the directory where you want to paste the asset(s)
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    to: '[config.staticBuilder.outDir]/sitemap.xml',
                },
                favicon: {
                    /**
                     * @name            from
                     * @namespace       config.staticBuilder.assets.favicon
                     * @type            String
                     * @default         [config.storage.package.rootDir]/favicon.ico
                     *
                     * Specify the directory/file to copy
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    from: '[config.storage.package.rootDir]/favicon.ico',
                    /**
                     * @name            to
                     * @namespace       config.staticBuilder.assets.favicon
                     * @type            String
                     * @default         [config.staticBuilder.outDir]/favicon.ico
                     *
                     * Specify the directory where you want to paste the asset(s)
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    to: '[config.staticBuilder.outDir]/favicon.ico',
                },
                dist: {
                    /**
                     * @name            from
                     * @namespace       config.staticBuilder.assets.dist
                     * @type            String
                     * @default         [config.storage.dist.rootDir]
                     *
                     * Specify the directory/file to copy
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    from: '[config.storage.dist.rootDir]',
                    /**
                     * @name            to
                     * @namespace       config.staticBuilder.assets.dist
                     * @type            String
                     * @default         [config.staticBuilder.outDir]
                     *
                     * Specify the directory where you want to paste the asset(s)
                     *
                     * @since           2.0.0
                     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    to: '[config.staticBuilder.outDir]',
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljQnVpbGRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWNCdWlsZGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG1CQUF5QixHQUFHLEVBQUUsTUFBTTtRQUNoQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsOENBQThDO1lBQ3JEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUseUNBQXlDO1lBQ2pEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsc0VBQXNFO1lBQzVFOzs7Ozs7Ozs7O2VBVUc7WUFDSCxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRWI7Ozs7Ozs7Ozs7ZUFVRztZQUNILGNBQWMsRUFBRSxJQUFJO1lBRXBCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsQ0FBQztZQUVmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxtQkFBbUIsRUFBRSxJQUFJO1lBRXpCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsS0FBSztZQUVaOzs7Ozs7Ozs7O2VBVUc7WUFDSCxXQUFXLEVBQUUsSUFBSTtZQUVqQixNQUFNLEVBQUU7Z0JBQ0osTUFBTSxFQUFFO29CQUNKOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSx5Q0FBeUM7b0JBQy9DOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEVBQUUsRUFBRSwyQ0FBMkM7aUJBQ2xEO2dCQUNELFFBQVEsRUFBRTtvQkFDTjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsZ0RBQWdEO29CQUN0RDs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxFQUFFLEVBQUUsNkNBQTZDO2lCQUNwRDtnQkFDRCxPQUFPLEVBQUU7b0JBQ0w7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsSUFBSSxFQUFFLDhDQUE4QztvQkFDcEQ7Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsRUFBRSxFQUFFLDJDQUEyQztpQkFDbEQ7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSw4Q0FBOEM7b0JBQ3BEOzs7Ozs7Ozs7O3VCQVVHO29CQUNILEVBQUUsRUFBRSwyQ0FBMkM7aUJBQ2xEO2dCQUNELElBQUksRUFBRTtvQkFDRjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsK0JBQStCO29CQUNyQzs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxFQUFFLEVBQUUsK0JBQStCO2lCQUN0QzthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7SUExUEQsNEJBMFBDIn0=