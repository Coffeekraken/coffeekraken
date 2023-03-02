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
                let filePath = file.path, itemsCount = 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3pELE9BQU8sdUJBRU4sTUFBTSwwQkFBMEIsQ0FBQztBQXFCbEMsTUFBTSxDQUFDLE9BQU8sT0FBTyx5QkFBMEIsU0FBUSx1QkFBdUI7SUFhMUU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzRDtRQUM5RCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxLQUFLLENBQ0QsU0FBK0MsRUFBRTtRQUVqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaUVBQWlFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDcEYsSUFBSSxDQUNQLGtCQUFrQixDQUN0QixDQUFDO1lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBRTFCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xELEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUs7YUFDM0IsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5Q0FBeUMsS0FBSyxDQUFDLE1BQU0sbUJBQW1CLENBQzNFLENBQUM7WUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQ1AsbUNBQW1DLElBQUksQ0FBQyxPQUFPLFNBQVMsQ0FDM0QsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxLQUFLLEdBQWlDLEVBQUUsQ0FBQztZQUU3QyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0MsYUFBYTtnQkFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUNwQixVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUVuQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3pCLE1BQU0sV0FBVyxHQUNiLE1BQU0sb0JBQW9CLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN4RCxRQUFRLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztvQkFDNUIsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDWixXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ3pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFFRCxhQUFhO2dCQUNiLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQzVDLElBQUksT0FBTyxFQUFFLEtBQUssVUFBVSxFQUFFO29CQUMxQixNQUFNLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7b0JBQzlCLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDMUIsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDMUIsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQzFCO3FCQUFNO29CQUNILE1BQU0sSUFBSSxLQUFLO29CQUNYLGFBQWE7b0JBQ2IsNEJBQTRCLElBQUksQ0FBQyxPQUFPLDJLQUEySyxDQUN0TixDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxJQUFJLENBQ0wsa0NBQWtDLFVBQVUsb0RBQW9ELElBQUksQ0FBQyxPQUFPLFVBQVUsQ0FDekgsQ0FBQzthQUNMO1lBRUQsT0FBTyxDQUFDO2dCQUNKLEtBQUs7Z0JBQ0wsSUFBSTthQUNQLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTFHRDs7Ozs7Ozs7O0dBU0c7QUFDSSxvQ0FBVSxHQUFHLG1CQUFtQixDQUFDIn0=