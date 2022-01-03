var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSitemapSource from '../SSitemapSource';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '@coffeekraken/s-docmap';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
export default class SSitemapDocmapSource extends __SSitemapSource {
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
     * @param           {ISSitemapBuildParams}          [params={}]         Some params passed to the build method
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
SSitemapDocmapSource.id = 'docmap';
SSitemapDocmapSource.settingsId = 'sitemapDocmapSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBEb2NtYXBTb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2l0ZW1hcERvY21hcFNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLGdCQUEyQyxNQUFNLG1CQUFtQixDQUFDO0FBRTVFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBc0I5RCxNQUFNLENBQUMsT0FBTyxPQUFPLG9CQUFxQixTQUFRLGdCQUFnQjtJQTZCOUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFxRDtRQUM3RCxLQUFLLENBQ0QsUUFBUSxFQUNSLFdBQVcsQ0FDUDtZQUNJLG1CQUFtQixFQUFFLEVBQUU7U0FDMUIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFsQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSwyQkFBMkI7O1FBQzNCLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBVSxDQUFDLG1CQUFtQixtQ0FBSSxFQUFFLENBQUM7SUFDM0QsQ0FBQztJQXdCRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBd0MsRUFBRTtRQUUxQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzVELE1BQU0sY0FBYyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0MsTUFBTSxLQUFLLEdBQTBCLEVBQUUsQ0FBQztZQUV4QyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLENBQUMsQ0FDSixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVoQyxhQUFhO1lBQ2IsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUQsYUFBYTtnQkFDYixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDUCxHQUFHLEVBQUUsSUFBSTtvQkFDVCxPQUFPO29CQUNQLFNBQVMsRUFBRSxJQUFJO2lCQUNsQixDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUEzRkQ7Ozs7Ozs7OztHQVNHO0FBQ0ksdUJBQUUsR0FBRyxRQUFRLENBQUM7QUFFZCwrQkFBVSxHQUFHLHFCQUFxQixDQUFDIn0=