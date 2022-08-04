var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __SSitemapBuilderSource from '../SSitemapBuilderSource';
export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                if (!__fs.existsSync(docmapObj.docmap.path)) {
                    emit('log', {
                        type: __SLog.TYPE_WARNING,
                        // @ts-ignore
                        value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                    });
                }
                else {
                    // @ts-ignore
                    const hash = __fileHash(docmapObj.docmap.path);
                    items.push({
                        loc: slug,
                        lastmod,
                        integrity: hash,
                    });
                }
            }
            // @ts-ignore
            for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
                for (let [slug, docmapObj] of Object.entries(
                // @ts-ignore
                packageObj.slug)) {
                    // @ts-ignore
                    if (!__fs.existsSync(docmapObj.docmap.path)) {
                        emit('log', {
                            type: __SLog.TYPE_WARNING,
                            // @ts-ignore
                            value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                        });
                    }
                    else {
                        // @ts-ignore
                        const hash = __fileHash(docmapObj.docmap.path);
                        items.push({
                            loc: slug,
                            lastmod,
                            integrity: hash,
                        });
                    }
                }
            }
            resolve(items);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
    }
}
/**
 * @name            settingsId
 * @type            String
 * @static
 *
 * Store the source settings id
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SSitemapBuilderDocmapSource.settingsId = 'sitemapDocmapSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0QixPQUFPLHVCQUF1QixNQUFNLDBCQUEwQixDQUFDO0FBa0IvRCxNQUFNLENBQUMsT0FBTyxPQUFPLDJCQUE0QixTQUFRLHVCQUF1QjtJQWE1RTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdEO1FBQ2hFLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FDRCxTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7WUFDdkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0MsTUFBTSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztZQUUvQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLENBQUMsQ0FDSixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVoQyxhQUFhO1lBQ2IsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ3hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNuQixFQUFFO2dCQUNDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVk7d0JBQ3pCLGFBQWE7d0JBQ2IsS0FBSyxFQUFFLDBEQUEwRCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUkseUNBQXlDO3FCQUNsSSxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsYUFBYTtvQkFDYixNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDUCxHQUFHLEVBQUUsSUFBSTt3QkFDVCxPQUFPO3dCQUNQLFNBQVMsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUM7aUJBQ047YUFDSjtZQUVELGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ3ZCLEVBQUU7Z0JBQ0MsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPO2dCQUN4QyxhQUFhO2dCQUNiLFVBQVUsQ0FBQyxJQUFJLENBQ2xCLEVBQUU7b0JBQ0MsYUFBYTtvQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN6QyxJQUFJLENBQUMsS0FBSyxFQUFFOzRCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTs0QkFDekIsYUFBYTs0QkFDYixLQUFLLEVBQUUsMERBQTBELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSx5Q0FBeUM7eUJBQ2xJLENBQUMsQ0FBQztxQkFDTjt5QkFBTTt3QkFDSCxhQUFhO3dCQUNiLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUNQLEdBQUcsRUFBRSxJQUFJOzRCQUNULE9BQU87NEJBQ1AsU0FBUyxFQUFFLElBQUk7eUJBQ2xCLENBQUMsQ0FBQztxQkFDTjtpQkFDSjthQUNKO1lBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQWhIRDs7Ozs7Ozs7O0dBU0c7QUFDSSxzQ0FBVSxHQUFHLHFCQUFxQixDQUFDIn0=