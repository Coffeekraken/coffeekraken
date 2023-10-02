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
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __SSitemapBuilderSource from '../SSitemapBuilderSource.js';
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[file]</yellow> Search for sitemap files using "<cyan>${this.settings.glob.join(', ')}</cyan>" glob...`);
            const logs = [];
            const files = __SGlob.resolveSync(this.settings.glob, {
                cwd: this.settings.inDir,
            });
            console.log(`<yellow>[file]</yellow> Found <yellow>${files.length}</yellow> file(s)`);
            files.forEach((file) => {
                console.log(`<yellow>[file]</yellow> - <cyan>${file.relPath}</cyan>`);
            });
            let items = [];
            for (let [key, file] of Object.entries(files)) {
                // @ts-ignore
                let filePath = file.path, itemsCount = 0, buildedFile;
                if (filePath.match(/\.ts$/)) {
                    buildedFile = yield __STypescriptBuilder.buildTemporary(filePath);
                    filePath = buildedFile.path;
                }
                // @ts-ignore
                const fn = (yield import(filePath)).default;
                // remove the temp file
                buildedFile.remove();
                if (typeof fn === 'function') {
                    const fileItems = yield fn(params);
                    itemsCount = fileItems.length;
                    items = [...items, ...fileItems];
                }
                else if (Array.isArray(fn)) {
                    items = [...items, ...fn];
                    itemsCount = fn.length;
                }
                else {
                    throw new Error(
                    // @ts-ignore
                    `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`);
                }
                logs.push(`<green>[file]</green> <magenta>${itemsCount}</magenta> sitemap entrie(s) for the file "<cyan>${file.relPath}</cyan>"`);
            }
            resolve({
                items,
                logs,
            });
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sdUJBRU4sTUFBTSw2QkFBNkIsQ0FBQztBQXNCckMsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSx1QkFBdUI7SUFhMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzRDtRQUM5RCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUVBQWlFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDcEYsSUFBSSxDQUNQLGtCQUFrQixDQUN0QixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBRTFCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xELEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7YUFDM0IsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5Q0FBeUMsS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQzNFLENBQUM7WUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUNBQW1DLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FDM0QsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztZQUU3QyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0MsYUFBYTtnQkFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUNwQixVQUFVLEdBQUcsQ0FBQyxFQUNkLFdBQVcsQ0FBQztnQkFFaEIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUN6QixXQUFXLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxjQUFjLENBQ25ELFFBQVEsQ0FDWCxDQUFDO29CQUNGLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2lCQUMvQjtnQkFFRCxhQUFhO2dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRTVDLHVCQUF1QjtnQkFDdkIsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUVyQixJQUFJLE9BQU8sRUFBRSxLQUFLLFVBQVUsRUFBRTtvQkFDMUIsTUFBTSxTQUFTLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25DLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO29CQUM5QixLQUFLLEdBQUcsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO2lCQUNwQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7b0JBQzFCLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO2lCQUMxQjtxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSztvQkFDWCxhQUFhO29CQUNiLDRCQUE0QixJQUFJLENBQUMsT0FBTywyS0FBMkssQ0FDdE4sQ0FBQztpQkFDTDtnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUNMLGtDQUFrQyxVQUFVLG9EQUFvRCxJQUFJLENBQUMsT0FBTyxVQUFVLENBQ3pILENBQUM7YUFDTDtZQUVELE9BQU8sQ0FBQztnQkFDSixLQUFLO2dCQUNMLElBQUk7YUFDUCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE3R0Q7Ozs7Ozs7OztHQVNHO0FBQ0ksb0NBQVUsR0FBRyxtQkFBbUIsQ0FBQyJ9