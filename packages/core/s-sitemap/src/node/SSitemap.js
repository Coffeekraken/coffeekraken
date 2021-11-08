var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSitemapBuildParamsInterface from './interface/SSitemapBuildInterface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
export default class SSitemap extends __SClass {
    /**
     * @name            sitemapSettings
     * @type            ISSitemapSettings
     * @get
     *
     * Access the sitemap settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sitemapSettings() {
        var _a;
        return (_a = this._settings.sitemap) !== null && _a !== void 0 ? _a : {};
    }
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
        var _a;
        super(__deepMerge({
            sitemap: {
                sources: {},
                useConfig: true,
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        if (this.sitemapSettings.useConfig) {
            const config = __SSugarConfig.get('sitemap');
            this.sitemapSettings.sources = __deepMerge((_a = config.sources) !== null && _a !== void 0 ? _a : {}, this.sitemapSettings.sources);
        }
    }
    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method allows you to generate your sitemap with all the added sources
     * and save it to disk, or just returns the result as a promise value
     *
     * @param       {Partial<ISSitemapBuildParams>}          [params={}]         The params for your build process
     * @return      {SPromise<ISSitemapBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params = {}) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            let sitemap = [];
            const finalParams = __SSitemapBuildParamsInterface.apply(params);
            const duration = new __SDuration();
            let sourcesId = finalParams.source.length
                ? finalParams.source
                : Object.keys(this.sitemapSettings.sources);
            for (let i = 0; i < sourcesId.length; i++) {
                const sourceId = sourcesId[i];
                if (!this.sitemapSettings.sources[sourceId]) {
                    throw new Error(`Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(this.sitemapSettings.sources).join(',')}`);
                }
                const sourceObj = this.sitemapSettings.sources[sourceId];
                // load source
                const importedSource = (yield import(sourceObj.path)).default;
                let settingsId = (_a = importedSource.settingsId) !== null && _a !== void 0 ? _a : `sitemap${__upperFirst(sourceId)}Source`;
                let buildFn;
                if (__isClass(importedSource)) {
                    // instanciate new source
                    const sourceInstance = new importedSource({
                        [settingsId]: __deepMerge((_b = sourceObj.settings) !== null && _b !== void 0 ? _b : {}, (_c = finalParams.sourcesSettings[sourceId]) !== null && _c !== void 0 ? _c : {}),
                    });
                    buildFn = sourceInstance.build.bind(sourceInstance);
                }
                else if (typeof importedSource === 'function') {
                    buildFn = importedSource;
                }
                const sourceDuration = new __SDuration();
                // build
                const buildResultPromise = buildFn(params);
                if (buildResultPromise instanceof __SPromise) {
                    pipe(buildResultPromise);
                }
                const buildResult = yield buildResultPromise;
                sitemap = [...sitemap, ...(buildResult !== null && buildResult !== void 0 ? buildResult : [])];
                emit('log', {
                    value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`,
                });
            }
            if (finalParams.save) {
                emit('log', {
                    value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${__path.relative(__packageRoot(), finalParams.output)}</cyan>"`,
                });
                this.save(sitemap, finalParams.output);
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
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
     * @param       {ISSitemapResultItem[]}         items           Your sitemap items to save
     * @param       {String}                        path            The ourput path where you want to save yous sitemap
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    save(items, path) {
        switch (__extension(path)) {
            case 'xml':
            default:
                let xmlStr = [
                    '<?xml version="1.0" encoding="UTF-8"?>',
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                ];
                items.forEach((item) => {
                    const itemStr = [];
                    itemStr.push('<url>');
                    if (item.loc)
                        itemStr.push(`<loc>${item.loc}</loc>`);
                    if (item.lastmod)
                        itemStr.push(`<lastmod>${item.lastmod}</lastmod>`);
                    if (item.changefreq)
                        itemStr.push(`<changefreq>${item.changefreq}</changefreq>`);
                    if (item.priority)
                        itemStr.push(`<priority>${item.priority}</priority>`);
                    itemStr.push('</url>');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU2l0ZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLDhCQUVOLE1BQU0sb0NBQW9DLENBQUM7QUFDNUMsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBMER4RSxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBQzFDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksZUFBZTs7UUFDZixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVUsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5Qzs7UUFDakQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsSUFBSTthQUNsQjtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FB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