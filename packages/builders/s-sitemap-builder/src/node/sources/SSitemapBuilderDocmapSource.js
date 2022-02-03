var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSitemapBuilderSource from '../SSitemapBuilderSource';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '@coffeekraken/s-docmap';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
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
    constructor(settings) {
        super('docmap', __deepMerge({
            sitemapDocmapSource: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            sitemapSourceDocmapSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source docmap settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sitemapDocmapSourceSettings() {
        var _a;
        return (_a = this._settings.sitemapDocmapSource) !== null && _a !== void 0 ? _a : {};
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method allows you to build the sitemap from the docmap source.
     *
     * @param           {ISSitemapBuilderBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params = {}) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const docmapInstance = new __SDocmap();
            const docmap = yield docmapInstance.read();
            const items = [];
            const date = new Date();
            const lastmod = `${date.getFullYear()}-${__pad(date.getMonth(), 2)}-${__pad(date.getDate(), 2)}`;
            // @ts-ignore
            for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
                // @ts-ignore
                const hash = __fileHash(docmapObj.docmap.path);
                items.push({
                    loc: slug,
                    lastmod,
                    integrity: hash,
                });
            }
            // @ts-ignore
            for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
                for (let [slug, docmapObj] of Object.entries(packageObj.slug)) {
                    // @ts-ignore
                    const hash = __fileHash(docmapObj.docmap.path);
                    items.push({
                        loc: slug,
                        lastmod,
                        integrity: hash,
                    });
                }
            }
            resolve(items);
        }));
    }
}
/**
 * @name            id
 * @type            String
 * @static
 *
 * Store the source id
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SSitemapBuilderDocmapSource.id = 'docmap';
SSitemapBuilderDocmapSource.settingsId = 'sitemapDocmapSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZGVyRG9jbWFwU291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NpdGVtYXBCdWlsZGVyRG9jbWFwU291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sdUJBQXlELE1BQU0sMEJBQTBCLENBQUM7QUFFakcsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFDL0MsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFzQjlELE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsdUJBQXVCO0lBNkI1RTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTREO1FBQ3BFLEtBQUssQ0FDRCxRQUFRLEVBQ1IsV0FBVyxDQUNQO1lBQ0ksbUJBQW1CLEVBQUUsRUFBRTtTQUMxQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQWxDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLDJCQUEyQjs7UUFDM0IsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFVLENBQUMsbUJBQW1CLG1DQUFJLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBd0JEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FDRCxTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUQsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzQyxNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBRS9DLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2YsQ0FBQyxDQUNKLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWhDLGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1RCxhQUFhO2dCQUNiLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNQLEdBQUcsRUFBRSxJQUFJO29CQUNULE9BQU87b0JBQ1AsU0FBUyxFQUFFLElBQUk7aUJBQ2xCLENBQUMsQ0FBQzthQUNOO1lBRUQsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hFLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDM0QsYUFBYTtvQkFDYixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDUCxHQUFHLEVBQUUsSUFBSTt3QkFDVCxPQUFPO3dCQUNQLFNBQVMsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF4R0Q7Ozs7Ozs7OztHQVNHO0FBQ0ksOEJBQUUsR0FBRyxRQUFRLENBQUM7QUFFZCxzQ0FBVSxHQUFHLHFCQUFxQixDQUFDIn0=