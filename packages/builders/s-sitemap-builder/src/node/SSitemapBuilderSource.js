import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export default class SSitemapSource extends __SClass {
    /**
     * @name            sitemapSourceSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sitemapSourceSettings() {
        var _a;
        return (_a = this._settings.sitemapSource) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(id, settings) {
        super(__deepMerge({
            metas: {
                id,
            },
            sitemapSource: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method MUST be implemented in your child class to build your particular sitemap.
     * Is has to return a Promise and resolve it with an ISSitemapSourceBuildResult object type
     *
     * @param           {ISSitemapBuilderBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params = {}) {
        throw new Error(`This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZGVyU291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NpdGVtYXBCdWlsZGVyU291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBNEJ0RSxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxRQUFRO0lBQ2hEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCOztRQUNyQixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVUsQ0FBQyxhQUFhLG1DQUFJLEVBQUUsQ0FBQztJQUNyRCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxFQUFVLEVBQUUsUUFBK0M7UUFDbkUsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFO2FBQ0w7WUFDRCxhQUFhLEVBQUUsRUFBRTtTQUNwQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxNQUFNLElBQUksS0FBSyxDQUNYLHNHQUFzRyxDQUN6RyxDQUFDO0lBQ04sQ0FBQztDQUNKIn0=