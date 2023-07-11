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
import { __fileHashSync } from '@coffeekraken/sugar/fs';
import { __pad } from '@coffeekraken/sugar/number';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __SSitemapBuilderSource from '../SSitemapBuilderSource.js';
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const docmapInstance = new __SDocmap();
            const docmap = yield docmapInstance.read();
            const items = [];
            const logs = [];
            const date = new Date();
            const lastmod = `${date.getFullYear()}-${__pad(date.getMonth(), 2)}-${__pad(date.getDate(), 2)}`;
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[docmap]</yellow> Start generating sitemap from the project "<cyan>docmap.json</cyan>"`);
            // @ts-ignore
            for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
                // @ts-ignore
                if (!__fs.existsSync(docmapObj.docmap.path)) {
                    console.warn(`<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`);
                }
                else {
                    // @ts-ignore
                    const hash = __fileHashSync(docmapObj.docmap.path);
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
                        console.warn(`<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`);
                    }
                    else {
                        // @ts-ignore
                        const hash = __fileHashSync(docmapObj.docmap.path);
                        items.push({
                            loc: slug,
                            lastmod,
                            integrity: hash,
                        });
                    }
                }
            }
            logs.push(`<green>[docmap]</green> <magenta>${items.length}</magenta> sitemap entrie(s) gathered from the "<cyan>docmap.json</cyan>" file`);
            resolve({
                items,
                logs,
            });
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLHdCQUF3QixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLHVCQUVOLE1BQU0sNkJBQTZCLENBQUM7QUFtQnJDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sMkJBQTRCLFNBQVEsdUJBQXVCO0lBYTVFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0Q7UUFDaEUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUNELFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUzQyxNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDO1lBRS9DLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztZQUUxQixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLEtBQUssQ0FDMUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUNmLENBQUMsQ0FDSixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVoQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLGdHQUFnRyxDQUNuRyxDQUFDO1lBRUYsYUFBYTtZQUNiLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVELGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDekMsT0FBTyxDQUFDLElBQUksQ0FDUiwwREFBMEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlDQUF5QyxDQUMzSCxDQUFDO2lCQUNMO3FCQUFNO29CQUNILGFBQWE7b0JBQ2IsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ1AsR0FBRyxFQUFFLElBQUk7d0JBQ1QsT0FBTzt3QkFDUCxTQUFTLEVBQUUsSUFBSTtxQkFDbEIsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFFRCxhQUFhO1lBQ2IsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUN2QixFQUFFO2dCQUNDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTztnQkFDeEMsYUFBYTtnQkFDYixVQUFVLENBQUMsSUFBSSxDQUNsQixFQUFFO29CQUNDLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDekMsT0FBTyxDQUFDLElBQUksQ0FDUiwwREFBMEQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHlDQUF5QyxDQUMzSCxDQUFDO3FCQUNMO3lCQUFNO3dCQUNILGFBQWE7d0JBQ2IsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQ1AsR0FBRyxFQUFFLElBQUk7NEJBQ1QsT0FBTzs0QkFDUCxTQUFTLEVBQUUsSUFBSTt5QkFDbEIsQ0FBQyxDQUFDO3FCQUNOO2lCQUNKO2FBQ0o7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUNMLG9DQUFvQyxLQUFLLENBQUMsTUFBTSxnRkFBZ0YsQ0FDbkksQ0FBQztZQUVGLE9BQU8sQ0FBQztnQkFDSixLQUFLO2dCQUNMLElBQUk7YUFDUCxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUFoSEQ7Ozs7Ozs7OztHQVNHO0FBQ0ksc0NBQVUsR0FBRyxxQkFBcUIsQ0FBQyJ9