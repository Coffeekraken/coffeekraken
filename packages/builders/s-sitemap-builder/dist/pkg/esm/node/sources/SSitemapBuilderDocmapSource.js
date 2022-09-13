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
import { __fileHash } from '@coffeekraken/sugar/fs';
import { __pad } from '@coffeekraken/sugar/number';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBR3RCLE9BQU8sdUJBQXVCLE1BQU0sMEJBQTBCLENBQUM7QUFrQi9ELE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsdUJBQXVCO0lBYTVFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0Q7UUFDaEUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUNELFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzQyxNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBRS9DLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDeEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxDQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQ2YsQ0FBQyxDQUNKLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWhDLGFBQWE7WUFDYixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ25CLEVBQUU7Z0JBQ0MsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN6QyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsWUFBWTt3QkFDekIsYUFBYTt3QkFDYixLQUFLLEVBQUUsMERBQTBELFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSx5Q0FBeUM7cUJBQ2xJLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNQLEdBQUcsRUFBRSxJQUFJO3dCQUNULE9BQU87d0JBQ1AsU0FBUyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBRUQsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDdkIsRUFBRTtnQkFDQyxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU87Z0JBQ3hDLGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLElBQUksQ0FDbEIsRUFBRTtvQkFDQyxhQUFhO29CQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3pDLElBQUksQ0FBQyxLQUFLLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxZQUFZOzRCQUN6QixhQUFhOzRCQUNiLEtBQUssRUFBRSwwREFBMEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlDQUF5Qzt5QkFDbEksQ0FBQyxDQUFDO3FCQUNOO3lCQUFNO3dCQUNILGFBQWE7d0JBQ2IsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQ1AsR0FBRyxFQUFFLElBQUk7NEJBQ1QsT0FBTzs0QkFDUCxTQUFTLEVBQUUsSUFBSTt5QkFDbEIsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBaEhEOzs7Ozs7Ozs7R0FTRztBQUNJLHNDQUFVLEdBQUcscUJBQXFCLENBQUMifQ==