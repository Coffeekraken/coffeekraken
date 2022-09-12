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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __extension, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __SSitemapBuilderBuildParamsInterface from './interface/SSitemapBuilderBuildParamsInterface';
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
     * @return      {SPromise<ISSitemapBuilderBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params = {}) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                const importedSource = (yield import(sourceObj.path))
                    .default;
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
                if (buildResultPromise instanceof __SPromise) {
                    pipe(buildResultPromise);
                }
                const buildResult = yield buildResultPromise;
                sitemap = [...sitemap, ...(buildResult !== null && buildResult !== void 0 ? buildResult : [])];
                emit('log', {
                    value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`,
                });
            }
            if (finalParams.save) {
                emit('log', {
                    value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${__path.relative(__packageRootDir(), finalParams.output)}</cyan>"`,
                });
                this.save(sitemap, finalParams.output);
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            // resolve the build
            resolve(sitemap);
        }), {
            eventEmitter: {
                bind: this,
            },
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUE4RHBHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNEM7O1FBQ3BELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUMvQixNQUFBLE1BQU0sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsRUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQ3hCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FDRixTQUErQyxFQUFFO1FBRWpELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxJQUFJLE9BQU8sR0FBaUMsRUFBRSxDQUFDO1lBRS9DLGFBQWE7WUFDYixNQUFNLFdBQVcsR0FDYixxQ0FBcUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxJQUFJLFNBQVMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU07Z0JBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTTtnQkFDcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUNBQWlDLFFBQVEsZ0VBQWdFLE1BQU0sQ0FBQyxJQUFJLENBQ2hILElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUN4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNoQixDQUFDO2lCQUNMO2dCQUVELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVsRCx3QkFBd0I7Z0JBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtvQkFBRSxTQUFTO2dCQUVoQyxjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsTUFBTSxjQUFjLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hELE9BQU8sQ0FBQztnQkFFYixJQUFJLE9BQU8sQ0FBQztnQkFFWixJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRTtvQkFDM0IseUJBQXlCO29CQUN6QixNQUFNLGNBQWMsR0FBRyxJQUFJLGNBQWMsbUJBQ2xDLFdBQVcsQ0FDVixNQUFBLFNBQVMsQ0FBQyxRQUFRLG1DQUFJLEVBQUUsRUFDeEIsTUFBQSxXQUFXLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQzlDLEVBQ0gsQ0FBQztvQkFDSCxPQUFPLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQ3ZEO3FCQUFNLElBQUksT0FBTyxjQUFjLEtBQUssVUFBVSxFQUFFO29CQUM3QyxPQUFPLEdBQUcsY0FBYyxDQUFDO2lCQUM1QjtnQkFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUN6QyxRQUFRO2dCQUNSLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLGtCQUFrQixZQUFZLFVBQVUsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVCO2dCQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sa0JBQWtCLENBQUM7Z0JBQzdDLE9BQU8sR0FBRyxDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsQ0FBQyxXQUFXLGFBQVgsV0FBVyxjQUFYLFdBQVcsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxzQ0FBc0MsUUFBUSw2Q0FDakQsV0FBVyxDQUFDLE1BQ2hCLDZEQUNJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDekIsV0FBVztpQkFDZCxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsNERBQTRELE1BQU0sQ0FBQyxRQUFRLENBQzlFLGdCQUFnQixFQUFFLEVBQ2xCLFdBQVcsQ0FBQyxNQUFNLENBQ3JCLFVBQVU7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQztZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLG1GQUNILFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFDbkIsV0FBVzthQUNkLENBQUMsQ0FBQztZQUVILG9CQUFvQjtZQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLENBQUMsS0FBbUMsRUFBRSxJQUFZO1FBQ2xELFFBQVEsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLEtBQUssS0FBSyxDQUFDO1lBQ1g7Z0JBQ0ksSUFBSSxNQUFNLEdBQWE7b0JBQ25CLHdDQUF3QztvQkFDeEMsOERBQThEO29CQUM5RCxVQUFVO29CQUNWLHFCQUFxQjtvQkFDckIsV0FBVztpQkFDZCxDQUFDO2dCQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDbkIsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO29CQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDN0M7b0JBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDO2dCQUVILGFBQWE7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFekIsY0FBYztnQkFDZCxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFekMsTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUNKIn0=