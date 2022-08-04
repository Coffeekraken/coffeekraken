"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const path_1 = __importDefault(require("path"));
exports.default = (api) => {
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
                path: path_1.default.resolve(`${(0, dirname_1.default)()}/../node/sources/SSitemapBuilderFileSource`),
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
                path: path_1.default.resolve(`${(0, dirname_1.default)()}/../node/sources/SSitemapBuilderDocmapSource`),
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQTREO0FBQzVELGdEQUEwQjtBQUUxQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDeEMsT0FBTztRQUNILEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLE1BQU07Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLGNBQWMsQ0FBQztZQUM3RCxDQUFDO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUU7Z0JBQ0Y7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsTUFBTSxFQUFFLElBQUk7Z0JBQ1o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsUUFBUSxFQUFFO29CQUNOOzs7Ozs7Ozs7O3VCQVVHO29CQUNILElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDO29CQUN6Qjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEtBQUs7d0JBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO29CQUMxQyxDQUFDO2lCQUNKO2dCQUNEOzs7Ozs7Ozs7O21CQVVHO2dCQUNILElBQUksRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLElBQUEsaUJBQVMsR0FBRSw0Q0FBNEMsQ0FDN0Q7YUFDSjtZQUNELE1BQU0sRUFBRTtnQkFDSjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsSUFBSTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxRQUFRLEVBQUUsRUFBRTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxJQUFJLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FDaEIsR0FBRyxJQUFBLGlCQUFTLEdBQUUsOENBQThDLENBQy9EO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDLENBQUMifQ==