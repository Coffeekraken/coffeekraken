var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSitemapBuilderBuildParamsInterface from './interface/SSitemapBuilderBuildParamsInterface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __SBuilder from '@coffeekraken/s-builder';
export default class SSitemapBuilder extends __SBuilder {
    /**
     * @name            sitemapSettings
     * @type            ISSitemapBuilderSettings
     * @get
     *
     * Access the sitemap settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get sitemapSettings() {
        var _a;
        return (_a = this._settings.sitemapBuilder) !== null && _a !== void 0 ? _a : {};
    }
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
            sitemapBuilder: {
                sources: {}
            },
        }, settings !== null && settings !== void 0 ? settings : {}));
        const config = __SSugarConfig.get('sitemapBuilder');
        this.sitemapSettings.sources = __deepMerge((_a = config.sources) !== null && _a !== void 0 ? _a : {}, this.sitemapSettings.sources);
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
            var _a, _b, _c;
            let sitemap = [];
            const finalParams = __SSitemapBuilderBuildParamsInterface.apply(params);
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
                    value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`,
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
                    if (item.loc)
                        itemStr.push(`        <loc>${item.loc}</loc>`);
                    if (item.lastmod)
                        itemStr.push(`      <lastmod>${item.lastmod}</lastmod>`);
                    if (item.changefreq)
                        itemStr.push(`       <changefreq>${item.changefreq}</changefreq>`);
                    if (item.priority)
                        itemStr.push(`      <priority>${item.priority}</priority>`);
                    if (item.integrity)
                        itemStr.push(`       <integrity>${item.integrity}</integrity>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NpdGVtYXBCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFDcEcsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBaUVqRCxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsVUFBVTtJQUNuRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGVBQWU7O1FBQ2YsT0FBTyxNQUFNLElBQUksQ0FBQyxTQUFVLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBZ0Q7O1FBQ3hELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLEVBQUU7YUFDZDtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGVB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