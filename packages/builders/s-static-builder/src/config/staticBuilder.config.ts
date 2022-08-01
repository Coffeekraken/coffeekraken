export default function (api) {
    if (api.env.platform !== 'node') return;
    return {
        /**
         * @name            input
         * @namespace       config.staticBuilder
         * @type            String
         * @default         [config.storage.src.publicDir]/sitemap.xml
         *
         * Specify the input sitemap file to use for building your static website
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get input() {
            return `${api.config.storage.src.publicDir}/sitemap.xml`;
        },

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
        get outDir() {
            return `${api.config.storage.package.rootDir}/static`;
        },

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
        get host() {
            return `http://${api.config.frontendServer.hostname}:${api.config.frontendServer.port}`;
        },

        /**
         * @name            failAfter
         * @namespace       config.staticBuilder
         * @type            Number
         * @default         5
         *
         * Specify the number of failures after which the build is considered as rejected. -1 to disable this feature
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        failAfter: 5,

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
         * @default         500
         *
         * Specify how many long the builder has to wait between tries
         *
         * @since           2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        requestRetryTimeout: 500,

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
                get from() {
                    return `${api.config.staticBuilder.host}/docmap.json`;
                },

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
                get to() {
                    return `${api.config.staticBuilder.outDir}/docmap.json`;
                },
            },
            public: {
                /**
                 * @name            from
                 * @namespace       config.staticBuilder.assets.public
                 * @type            String
                 * @default         [config.storage.src.publicDir]
                 *
                 * Specify the directory/file/url from which to get the asset to copy
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get from() {
                    return `${api.config.storage.src.publicDir}`;
                },

                /**
                 * @name            glob
                 * @namespace       config.staticBuilder.assets.public
                 * @type            String
                 * @default         ** /*
                 *
                 * Specify the directory/file/url from which to get the asset to copy
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                glob: '**/*',
                /**
                 * @name            to
                 * @namespace       config.staticBuilder.assets.docmap
                 * @type            String
                 * @default         [config.staticBuilder.outDir]
                 *
                 * Specify the directory where you want to paste the asset(s)
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get to() {
                    return api.config.staticBuilder.outDir;
                },
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
                get from() {
                    return api.config.storage.dist.rootDir;
                },

                /**
                 * @name            glob
                 * @namespace       config.staticBuilder.assets.dist
                 * @type            String
                 * @default         ** /*
                 *
                 * Specify the directory/file/url from which to get the asset to copy
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                glob: '**/*',
                /**
                 * @name            to
                 * @namespace       config.staticBuilder.assets.dist
                 * @type            String
                 * @default         [config.staticBuilder.outDir]/dist
                 *
                 * Specify the directory where you want to paste the asset(s)
                 *
                 * @since           2.0.0
                 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                get to() {
                    return `${api.config.staticBuilder.outDir}/dist`;
                },
            },
        },
    };
}
