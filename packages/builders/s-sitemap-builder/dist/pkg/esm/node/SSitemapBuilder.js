var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __extension, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __isClass } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __SSitemapBuilderBuildParamsInterface from './interface/SSitemapBuilderBuildParamsInterface.js';
export default class SSitemapBuilder extends __SBuilder {
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
        var _a;
        super(__deepMerge({
            sources: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        const config = __SSugarConfig.get('sitemapBuilder');
        this.settings.sources = __deepMerge((_a = config.sources) !== null && _a !== void 0 ? _a : {}, this.settings.sources);
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method allows you to generate your sitemap with all the added sources
     * and save it to disk, or just returns the result as a promise value
     *
     * @param       {Partial<ISSitemapBuilderBuildParams>}          [params={}]         The params for your build process
     * @return      {Promise<ISSitemapBuilderBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params = {}) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let sitemap = [];
            // @ts-ignore
            const finalParams = __SSitemapBuilderBuildParamsInterface.apply(params);
            const duration = new __SDuration();
            let sourcesId = finalParams.source.length
                ? finalParams.source
                : Object.keys(this.settings.sources);
            for (let i = 0; i < sourcesId.length; i++) {
                const sourceId = sourcesId[i];
                if (!this.settings.sources[sourceId]) {
                    throw new Error(`Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(this.settings.sources).join(',')}`);
                }
                const sourceObj = this.settings.sources[sourceId];
                // skip inactive sources
                if (!sourceObj.active)
                    continue;
                // load source
                // @ts-ignore
                const importedSource = (yield import(sourceObj.path)).default;
                let buildFn;
                if (__isClass(importedSource)) {
                    // instanciate new source
                    const sourceInstance = new importedSource(Object.assign({}, __deepMerge((_a = sourceObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = finalParams.sourcesSettings[sourceId]) !== null && _b !== void 0 ? _b : {})));
                    buildFn = sourceInstance.build.bind(sourceInstance);
                }
                else if (typeof importedSource === 'function') {
                    buildFn = importedSource;
                }
                const sourceDuration = new __SDuration();
                // build
                const buildResultPromise = buildFn(finalParams);
                const buildResult = yield buildResultPromise;
                const buildResultItems = (_c = buildResult.items) !== null && _c !== void 0 ? _c : buildResult, buildResultLogs = (_d = buildResult.logs) !== null && _d !== void 0 ? _d : [];
                sitemap = [...sitemap, ...(buildResultItems !== null && buildResultItems !== void 0 ? buildResultItems : [])];
                console.log(`<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`);
                buildResultLogs.forEach((log) => {
                    console.log(`- ${log}`);
                });
                console.log(' ');
            }
            if (finalParams.save) {
                console.log(`<yellow>[save]</yellow> Saving your sitemap under "<cyan>${__path.relative(__packageRootDir(), finalParams.output)}</cyan>"`);
                this.save(sitemap, finalParams.output);
            }
            console.log(`<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            // resolve the build
            resolve(sitemap);
        }));
    }
    /**
     * @name            save
     * @type            Function
     * @async
     *
     * This method takes all the sitemap items with an output path and save your sitemap
     *
     * @param       {ISSitemapBuilderResultItem[]}         items           Your sitemap items to save
     * @param       {String}                        path            The ourput path where you want to save yous sitemap
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    save(items, path) {
        switch (__extension(path)) {
            case 'xml':
            default:
                let xmlStr = [
                    '<?xml version="1.0" encoding="UTF-8"?>',
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                    '   <url>',
                    '       <loc>/</loc>',
                    '   </url>',
                ];
                items.forEach((item) => {
                    const itemStr = [];
                    itemStr.push(`  <url>`);
                    for (let [key, value] of Object.entries(item)) {
                        itemStr.push(`<${key}>${value}</${key}>`);
                    }
                    itemStr.push('  </url>');
                    xmlStr.push(itemStr.join('\n'));
                });
                // ending xml
                xmlStr.push('</urlset>');
                // saving file
                __writeFileSync(path, xmlStr.join('\n'));
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUIsT0FBTyxxQ0FBcUMsTUFBTSxvREFBb0QsQ0FBQztBQW1FdkcsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0Qzs7UUFDcEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQy9CLE1BQUEsTUFBTSxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUNGLFNBQStDLEVBQUU7UUFFakQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxJQUFJLE9BQU8sR0FBaUMsRUFBRSxDQUFDO1lBRS9DLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FDYixxQ0FBcUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTTtnQkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUNBQWlDLFFBQVEsZ0VBQWdFLE1BQU0sQ0FBQyxJQUFJLENBQ2hILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUN4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNoQixDQUFDO2lCQUNMO2dCQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsRCx3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtvQkFBRSxTQUFTO2dCQUVoQyxjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBRTlELElBQUksT0FBTyxDQUFDO2dCQUVaLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxFQUFFO29CQUMzQix5QkFBeUI7b0JBQ3pCLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxtQkFDbEMsV0FBVyxDQUNWLE1BQUEsU0FBUyxDQUFDLFFBQVEsbUNBQUksRUFBRSxFQUN4QixNQUFBLFdBQVcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLG1DQUFJLEVBQUUsQ0FDOUMsRUFDSCxDQUFDO29CQUNILE9BQU8sR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDdkQ7cUJBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxVQUFVLEVBQUU7b0JBQzdDLE9BQU8sR0FBRyxjQUFjLENBQUM7aUJBQzVCO2dCQUVELE1BQU0sY0FBYyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ3pDLFFBQVE7Z0JBQ1IsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sV0FBVyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7Z0JBRTdDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBQSxXQUFXLENBQUMsS0FBSyxtQ0FBSSxXQUFXLEVBQ3JELGVBQWUsR0FBRyxNQUFBLFdBQVcsQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQztnQkFFN0MsT0FBTyxHQUFHLENBQUMsR0FBRyxPQUFPLEVBQUUsR0FBRyxDQUFDLGdCQUFnQixhQUFoQixnQkFBZ0IsY0FBaEIsZ0JBQWdCLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxzQ0FBc0MsUUFBUSw2Q0FDMUMsV0FBVyxDQUFDLE1BQ2hCLDZEQUNJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDekIsV0FBVyxDQUNkLENBQUM7Z0JBQ0YsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNwQjtZQUVELElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0REFBNEQsTUFBTSxDQUFDLFFBQVEsQ0FDdkUsZ0JBQWdCLEVBQUUsRUFDbEIsV0FBVyxDQUFDLE1BQU0sQ0FDckIsVUFBVSxDQUNkLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFDO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxtRkFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVcsQ0FDZCxDQUFDO1lBRUYsb0JBQW9CO1lBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksQ0FBQyxLQUFtQyxFQUFFLElBQVk7UUFDbEQsUUFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsS0FBSyxLQUFLLENBQUM7WUFDWDtnQkFDSSxJQUFJLE1BQU0sR0FBYTtvQkFDbkIsd0NBQXdDO29CQUN4Qyw4REFBOEQ7b0JBQzlELFVBQVU7b0JBQ1YscUJBQXFCO29CQUNyQixXQUFXO2lCQUNkLENBQUM7Z0JBQ0YsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNuQixNQUFNLE9BQU8sR0FBYSxFQUFFLENBQUM7b0JBQzdCLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDO3FCQUM3QztvQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYTtnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUV6QixjQUFjO2dCQUNkLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUV6QyxNQUFNO1NBQ2I7SUFDTCxDQUFDO0NBQ0oifQ==