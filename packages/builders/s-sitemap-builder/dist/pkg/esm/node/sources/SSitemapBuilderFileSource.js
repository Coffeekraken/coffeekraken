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
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
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
                let filePath = file.path;
                if (filePath.match(/\.ts$/)) {
                    const buildedFile = yield __STypescriptBuilder.buildTemporary(filePath);
                    filePath = buildedFile.path;
                    setTimeout(() => {
                        buildedFile.remove();
                    }, 500);
                }
                // @ts-ignore
                const fn = (yield import(filePath)).default;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFHdEUsT0FBTyx1QkFBdUIsTUFBTSwwQkFBMEIsQ0FBQztBQXFCL0QsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSx1QkFBdUI7SUFhMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzRDtRQUM5RCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksVUFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUM5QyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2FBQzNCLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFpQyxFQUFFLENBQUM7WUFFN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzNDLGFBQWE7Z0JBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFFekIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixNQUFNLFdBQVcsR0FDYixNQUFNLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEQsUUFBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQzVCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUN6QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBRUQsYUFBYTtnQkFDYixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUM1QyxJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25DLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDMUIsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUs7b0JBQ1gsYUFBYTtvQkFDYiw0QkFBNEIsSUFBSSxDQUFDLE9BQU8sMktBQTJLLENBQ3ROLENBQUM7aUJBQ0w7YUFDSjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsSUFBSTthQUNiO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQzs7QUF0RkQ7Ozs7Ozs7OztHQVNHO0FBQ0ksb0NBQVUsR0FBRyxtQkFBbUIsQ0FBQyJ9