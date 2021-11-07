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
     * @param           {ISSitemapBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params = {}) {
        throw new Error(`This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBTb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2l0ZW1hcFNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQTZCdEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsUUFBUTtJQUNoRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjs7UUFDckIsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFVLENBQUMsYUFBYSxtQ0FBSSxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksRUFBVSxFQUFFLFFBQStDO1FBQ25FLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRTthQUNMO1lBQ0QsYUFBYSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsS0FBSyxDQUNELFNBQXdDLEVBQUU7UUFFMUMsTUFBTSxJQUFJLEtBQUssQ0FDWCxzR0FBc0csQ0FDekcsQ0FBQztJQUNOLENBQUM7Q0FDSiJ9