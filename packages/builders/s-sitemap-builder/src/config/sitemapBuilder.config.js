var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "path", "@coffeekraken/sugar/node/fs/dirname"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const path_1 = __importDefault(require("path"));
    const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
    exports.default = (env, config) => {
        if (env.platform !== 'node')
            return;
        return {
            build: {
                /**
                 * @name            output
                 * @namespace       config.sitemapBuilder.build
                 * @type            String
                 * @default         [config.storage.package.rootDir]/sitemap.xml
                 *
                 * Specify if you want to use the docmap.json as a sitemap source
                 *
                 * @since           2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                output: `[config.storage.package.rootDir]/sitemap.xml`,
            },
            sources: {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcEJ1aWxkZXIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2l0ZW1hcEJ1aWxkZXIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsZ0RBQTBCO0lBQzFCLGtGQUE0RDtJQUU1RCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQixJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtZQUFFLE9BQU87UUFDcEMsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSDs7Ozs7Ozs7OzttQkFVRztnQkFDSCxNQUFNLEVBQUUsOENBQThDO2FBQ3pEO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLE1BQU0sRUFBRTtvQkFDSjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxNQUFNLEVBQUUsSUFBSTtvQkFDWjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxRQUFRLEVBQUUsRUFBRTtvQkFDWjs7Ozs7Ozs7Ozt1QkFVRztvQkFDSCxJQUFJLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FDaEIsR0FBRyxJQUFBLGlCQUFTLEdBQUUsOENBQThDLENBQy9EO2lCQUNKO2FBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDIn0=