import __dirname from '@coffeekraken/sugar/node/fs/dirname';
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
                path: __path.resolve(`${__dirname()}/../node/sources/SSitemapBuilderDocmapSource`),
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUN4QyxPQUFPO1FBQ0gsS0FBSyxFQUFFO1lBQ0g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsY0FBYyxDQUFDO1lBQzdELENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRTtZQUNMLElBQUksRUFBRTtnQkFDRjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxRQUFRLEVBQUU7b0JBQ047Ozs7Ozs7Ozs7dUJBVUc7b0JBQ0gsSUFBSSxFQUFFLENBQUMsc0JBQXNCLENBQUM7b0JBQzlCOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksS0FBSzt3QkFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7b0JBQzFDLENBQUM7aUJBQ0o7Z0JBQ0Q7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2hCLEdBQUcsU0FBUyxFQUFFLDRDQUE0QyxDQUM3RDthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFFBQVEsRUFBRSxFQUFFO2dCQUNaOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLFNBQVMsRUFBRSw4Q0FBOEMsQ0FDL0Q7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9