import __path from 'path';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export default (env, config) => {
    if (env.platform !== 'node')
        return;
    return {
        build: {
            /**
             * @name            output
             * @namespace       config.sitemap.build
             * @type            String
             * @default         [config.storage.package.rootDir]/sitemap.xml
             *
             * Specify if you want to use the docmap.json as a sitemap source
             *
             * @since           2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            output: `[config.storage.package.rootDir]/sitemap.xml`,
        },
        sources: {
            docmap: {
                /**
                 * @name            active
                 * @namespace       config.sitemap.sources.docmap
                 * @type            Boolean
                 * @default         true
                 *
                 * Specify if you want to use the docmap.json as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                active: true,
                /**
                 * @name            settings
                 * @namespace       config.sitemap.sources.docmap
                 * @type            Object
                 * @default         {}
                 *
                 * Specify some setting to pass to the docmap sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                settings: {},
                /**
                 * @name            path
                 * @namespace       config.sitemap.sources.docmap
                 * @type            String
                 * @default          __path.resolve(`${__dirname()}/../node/sources/SSitemapDocmapSource`)
                 *
                 * Specify where to find the docmap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                path: __path.resolve(`${__dirname()}/../node/sources/SSitemapDocmapSource`),
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcC5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzaXRlbWFwLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFFNUQsZUFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUMzQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDcEMsT0FBTztRQUNILEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxNQUFNLEVBQUUsOENBQThDO1NBQ3pEO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE1BQU0sRUFBRSxJQUFJO2dCQUNaOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFFBQVEsRUFBRSxFQUFFO2dCQUNaOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLFNBQVMsRUFBRSx1Q0FBdUMsQ0FDeEQ7YUFDSjtTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9