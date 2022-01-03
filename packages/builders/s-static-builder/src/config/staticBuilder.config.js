export default function (env, config) {
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        requestTimeout: 5000,
        /**
         * @name            clean
         * @namespace       config.staticBuilder
         * @type            Boolean
         * @default         false
         *
         * Specify if you want to clean the past builds before rebuilding. THis would do the same as setting the "incremental" option to false
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                to: '[config.staticBuilder.outDir]',
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljQnVpbGRlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aWNCdWlsZGVyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSw4Q0FBOEM7UUFDckQ7Ozs7Ozs7Ozs7V0FVRztRQUNILE1BQU0sRUFBRSx5Q0FBeUM7UUFDakQ7Ozs7Ozs7Ozs7V0FVRztRQUNILElBQUksRUFBRSxzRUFBc0U7UUFDNUU7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxDQUFDLENBQUM7UUFFYjs7Ozs7Ozs7OztXQVVHO1FBQ0gsY0FBYyxFQUFFLElBQUk7UUFFcEI7Ozs7Ozs7Ozs7V0FVRztRQUNILEtBQUssRUFBRSxLQUFLO1FBRVo7Ozs7Ozs7Ozs7V0FVRztRQUNILFdBQVcsRUFBRSxJQUFJO1FBRWpCLE1BQU0sRUFBRTtZQUNKLE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUseUNBQXlDO2dCQUMvQzs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsMkNBQTJDO2FBQ2xEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxnREFBZ0Q7Z0JBQ3REOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEVBQUUsRUFBRSw2Q0FBNkM7YUFDcEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0w7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLDhDQUE4QztnQkFDcEQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsRUFBRSxFQUFFLDJDQUEyQzthQUNsRDtZQUNELE9BQU8sRUFBRTtnQkFDTDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsOENBQThDO2dCQUNwRDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxFQUFFLEVBQUUsMkNBQTJDO2FBQ2xEO1lBQ0QsSUFBSSxFQUFFO2dCQUNGOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSwrQkFBK0I7Z0JBQ3JDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEVBQUUsRUFBRSwrQkFBK0I7YUFDdEM7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDIn0=