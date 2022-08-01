import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __path from 'path';

export default (api) => {
    if (api.env.platform !== 'node') return;
    return {
        build: {
            /**
             * @name            output
             * @namespace       config.sitemapBuilder.build
             * @type            String
             * @default         [config.storage.src.publicDir]/sitemap.xml
             *
             * Specify if you want to use the docmap.json as a sitemap source
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get output() {
                return `${api.config.storage.src.publicDir}/sitemap.xml`;
            },
        },
        sources: {
            file: {
                /**
                 * @name            active
                 * @namespace       config.sitemapBuilder.sources.file
                 * @type            Boolean
                 * @default         true
                 *
                 * Specify if you want to use the files (.sitemap.{ts,js}) as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                active: true,
                /**
                 * @name            settings
                 * @namespace       config.sitemapBuilder.sources.file
                 * @type            Object
                 * @default         {}
                 *
                 * Specify some setting to pass to the file sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                settings: {
                    /**
                     * @name            glob
                     * @namespace       config.sitemapBuilder.sources.file.settings
                     * @type            String[]
                     * @default         ['** /*.sitemap.js']
                     *
                     * Specify the glob(s) to use to find the sitemap files
                     *
                     * @since           2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    glob: ['**/*.sitemap.js'],
                    /**
                     * @name            inDir
                     * @namespace       config.sitemapBuilder.sources.file.settings
                     * @type            String
                     * @default         [config.storage.src.rootDir]
                     *
                     * Specify the input directory where to search for sitemap files
                     *
                     * @since           2.0.0
                     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                     */
                    get inDir() {
                        return api.config.storage.src.rootDir;
                    },
                },
                /**
                 * @name            path
                 * @namespace       config.sitemapBuilder.sources.file
                 * @type            String
                 * @default          __path.resolve(`${__dirname()}/../node/sources/SSitemapFileSource`)
                 *
                 * Specify where to find the file source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: __path.resolve(
                    `${__dirname()}/../node/sources/SSitemapBuilderFileSource`,
                ),
            },
            docmap: {
                /**
                 * @name            active
                 * @namespace       config.sitemapBuilder.sources.docmap
                 * @type            Boolean
                 * @default         true
                 *
                 * Specify if you want to use the docmap.json as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                active: true,
                /**
                 * @name            settings
                 * @namespace       config.sitemapBuilder.sources.docmap
                 * @type            Object
                 * @default         {}
                 *
                 * Specify some setting to pass to the docmap sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                settings: {},
                /**
                 * @name            path
                 * @namespace       config.sitemapBuilder.sources.docmap
                 * @type            String
                 * @default          __path.resolve(`${__dirname()}/../node/sources/SSitemapDocmapSource`)
                 *
                 * Specify where to find the docmap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                path: __path.resolve(
                    `${__dirname()}/../node/sources/SSitemapBuilderDocmapSource`,
                ),
            },
        },
    };
};
