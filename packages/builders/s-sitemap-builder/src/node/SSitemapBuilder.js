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
import __SSitemapBuilderBuildParamsInterface from './interface/SSitemapBuilderBuildIParamsInterface';
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
            const config = __SSugarConfig.get('sitemapBuilder');
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
     * @param       {Partial<ISSitemapBuilderBuildParams>}          [params={}]         The params for your build process
     * @return      {SPromise<ISSitemapBuilderBuildResult>}                    A promise resolved with the sitemap result when success
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @param       {ISSitemapBuilderResultItem[]}         items           Your sitemap items to save
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NpdGVtYXBCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NpdGVtYXBCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE9BQU8scUNBRU4sTUFBTSxrREFBa0QsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxTQUFTLE1BQU0scUNBQXFDLENBQUM7QUFDNUQsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sdUNBQXVDLENBQUM7QUFDaEUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUEyRGpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksZUFBZTs7UUFDZixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVUsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFnRDs7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsSUFBSTthQUNsQjtTQUNKLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO1lBQ2hDLE1BQU0sTUFB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