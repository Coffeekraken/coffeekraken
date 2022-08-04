var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSitemapBuilderSource from '../SSitemapBuilderSource';
export default class SSitemapBuilderFileSource extends __SSitemapBuilderSource {
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
            const files = __SGlob.resolve(this.settings.glob, {
                cwd: this.settings.inDir,
            });
            let items = [];
            for (let [key, file] of Object.entries(files)) {
                // @ts-ignore
                const fn = (yield import(file.path)).default;
                if (typeof fn === 'function') {
                    const fileItems = yield fn(params);
                    items = [...items, ...fileItems];
                }
                else if (Array.isArray(fn)) {
                    items = [...items, ...fn];
                }
                else {
                    throw new Error(
                    // @ts-ignore
                    `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`);
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
 * @name            id
 * @type            String
 * @static
 *
 * Store the source settings id
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SSitemapBuilderFileSource.settingsId = 'sitemapFileSource';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBR3RFLE9BQU8sdUJBQXVCLE1BQU0sMEJBQTBCLENBQUM7QUFxQi9ELE1BQU0sQ0FBQyxPQUFPLE9BQU8seUJBQTBCLFNBQVEsdUJBQXVCO0lBYTFFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBc0Q7UUFDOUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUNELFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDOUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSzthQUMzQixDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBRTdDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQyxhQUFhO2dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25DLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDMUIsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUs7b0JBQ1gsYUFBYTtvQkFDYiw0QkFBNEIsSUFBSSxDQUFDLE9BQU8sMktBQTJLLENBQ3ROLENBQUM7aUJBQ0w7YUFDSjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUExRUQ7Ozs7Ozs7OztHQVNHO0FBQ0ksb0NBQVUsR0FBRyxtQkFBbUIsQ0FBQyJ9