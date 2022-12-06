"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
function default_1(api) {
    if (api.env.platform !== 'node')
        return;
    const packageRoot = (0, path_1.__packageRootDir)((0, fs_1.__dirname)());
    return {
        default: {
            /**
             * @name            glob
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         ** /+(README|LICENSE|*.md)
             *
             * Specify a glob pattern relative to your "inDir" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            glob: '**/*.md.+(*|*.*)',
            /**
             * @name            inDir
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         [config.storage.src.rootDir]
             *
             * Specify the input directory where to search for files to build using the "glob" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get inDir() {
                return api.config.storage.src.rootDir;
            },
            /**
             * @name            inPath
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify a file path to process.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            inPath: null,
            /**
             * @name            inRaw
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify some markdown to build in string format.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            inRaw: null,
            /**
             * @name            outDir
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         [config.storage.dist.rootDir]
             *
             * Specify the output directory where to save the processed files.
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get outDir() {
                return api.config.storage.dist.rootDir;
            },
            /**
             * @name            outPath
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @default         null
             *
             * Specify an output file path when using the "inPath" config
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outPath: null,
            /**
             * @name            save
             * @namespace       config.markdownBuilder.default
             * @type            Boolean
             * @default         true
             *
             * Specify if you want to save the processed files out or not
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            save: true,
            /**
             * @name            target
             * @namespace       config.markdownBuilder.default
             * @type            String
             * @values          ['markdown', 'html']
             * @default         markdown
             *
             * Specify the output target you want. Can be "markdown" or "html"
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            target: 'markdown',
        },
        metas: {
            /**
             * @name            websiteUrl
             * @namespace       config.markdownBuilder
             * @type            String
             * @default         config.package.homepage
             *
             * Specify the website url that will be used for things like "absoluteLinks" conversion, etc...
             *
             * @since       2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get websiteUrl() {
                return api.config.package.homepage;
            },
        },
        presets: {
            default: {},
            readme: {
                get inPath() {
                    return `${api.config.storage.src.docDir}/README.md`;
                },
                get outPath() {
                    return `${api.config.storage.package.rootDir}/README.md`;
                },
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQW1EO0FBQ25ELG1EQUE0RDtBQUU1RCxtQkFBeUIsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE1BQU0sV0FBVyxHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxDQUFDO0lBRWxELE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxFQUFFLGtCQUFrQjtZQUV4Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxLQUFLO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztZQUMxQyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILE1BQU0sRUFBRSxJQUFJO1lBQ1o7Ozs7Ozs7Ozs7ZUFVRztZQUNILEtBQUssRUFBRSxJQUFJO1lBQ1g7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksTUFBTTtnQkFDTixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0MsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsSUFBSTtZQUNiOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUNWOzs7Ozs7Ozs7OztlQVdHO1lBQ0gsTUFBTSxFQUFFLFVBQVU7U0FDckI7UUFFRCxLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxVQUFVO2dCQUNWLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLENBQUM7U0FDSjtRQUVELE9BQU8sRUFBRTtZQUNMLE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFO2dCQUNKLElBQUksTUFBTTtvQkFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sWUFBWSxDQUFDO2dCQUN4RCxDQUFDO2dCQUNELElBQUksT0FBTztvQkFDUCxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sWUFBWSxDQUFDO2dCQUM3RCxDQUFDO2FBQ0o7U0FDSjtLQUNKLENBQUM7QUFDTixDQUFDO0FBOUlELDRCQThJQyJ9