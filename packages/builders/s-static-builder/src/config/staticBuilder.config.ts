export default function (env, config) {
    if (env.platform !== 'node') return;
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
         * @name            clear
         * @namespace       config.staticBuilder
         * @type            Boolean
         * @default         true
         *
         * Specify if you want to clear the "outDir" before rebuilding
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        clear: true,

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
