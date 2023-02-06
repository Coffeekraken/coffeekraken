import { __dirname } from '@coffeekraken/sugar/fs';
import __path from 'path';
export default (api) => {
    if (api.env.platform !== 'node')
        return;
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
                    glob: ['**/*.sitemap.{js,ts}'],
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
                path: __path.resolve(`${__dirname()}/../node/sources/SSitemapBuilderFileSource`),
            },
            docmap: {
                /**
                 * @name            active
                 * @namespace       config.sitemapBuilder.sources.docmap
                 * @type            Boolean
                 * @default         false
                 *
                 * Specify if you want to use the docmap.json as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                active: false,
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
                path: __path.resolve(`${__dirname()}/../node/sources/SSitemapBuilderDocmapSource`),
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLGNBQWMsQ0FBQztZQUM3RCxDQUFDO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFO29CQUNOOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSxDQUFDLHNCQUFzQixDQUFDO29CQUM5Qjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEtBQUs7d0JBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO29CQUMxQyxDQUFDO2lCQUNKO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLFNBQVMsRUFBRSw0Q0FBNEMsQ0FDN0Q7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsS0FBSztnQkFDYjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxRQUFRLEVBQUUsRUFBRTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDaEIsR0FBRyxTQUFTLEVBQUUsOENBQThDLENBQy9EO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==