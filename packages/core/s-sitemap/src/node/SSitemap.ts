import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SSitemapSource from './SSitemapSource';
import __SSitemapBuildParamsInterface, {
    ISSitemapBuildParams,
} from './interface/SSitemapBuildInterface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __SPromise from '@coffeekraken/s-promise';
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name            SSitemap
 * @namespace       node
 * @type            Class
 * @platform        ts
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class allows you to generate a sitemap easily taking in consideration things like
 * docmap.json, frontspec.json, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export type ISSitemapTypes = 'docmap' | 'frontspec';

export interface ISSitemapSources {
    [key: string]: __SSitemapSource;
}

export interface ISSitemapCtopSettings {
    sitemap: Partial<ISSitemapSettings>;
}

export interface ISSitemapResultItem {
    loc: string;
    lastmod: string;
    changefreq?:
        | 'always'
        | 'hourly'
        | 'daily'
        | 'weekly'
        | 'monthly'
        | 'yearly'
        | 'never';
    priority?: number;
}

export interface ISSitemapBuildResult {}

export interface ISSitemapSourcesSettings {
    [key: string]: ISSitemapSourceSettings;
}
export interface ISSitemapSourceSettings {
    active: boolean;
    settings: any;
    path: string;
}

export interface ISSitemapSettings {
    sources: ISSitemapSourcesSettings;
    useConfig: boolean;
}

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
    get sitemapSettings(): ISSitemapSettings {
        return (<any>this._settings).sitemap ?? {};
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
    constructor(settings?: Partial<ISSitemapCtopSettings>) {
        super(
            __deepMerge(
                {
                    sitemap: {
                        sources: {},
                        useConfig: true,
                    },
                },
                settings ?? {},
            ),
        );

        if (this.sitemapSettings.useConfig) {
            const config = __SSugarConfig.get('sitemap');
            this.sitemapSettings.sources = __deepMerge(
                config.sources ?? {},
                this.sitemapSettings.sources,
            );
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
    build(
        params: Partial<ISSitemapBuildParams> = {},
    ): Promise<ISSitemapBuildResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            let sitemap: ISSitemapResultItem[] = [];

            const finalParams = __SSitemapBuildParamsInterface.apply(params);

            const duration = new __SDuration();

            let sourcesId = finalParams.source.length
                ? finalParams.source
                : Object.keys(this.sitemapSettings.sources);

            for (let i = 0; i < sourcesId.length; i++) {
                const sourceId = sourcesId[i];

                if (!this.sitemapSettings.sources[sourceId]) {
                    throw new Error(
                        `Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(
                            this.sitemapSettings.sources,
                        ).join(',')}`,
                    );
                }

                const sourceObj = this.sitemapSettings.sources[sourceId];

                // load source
                const sourceCls = (await import(sourceObj.path)).default;

                let settingsId =
                    sourceCls.settingsId ??
                    `sitemap${__upperFirst(sourceId)}Source`;

                // instanciate new source
                const sourceInstance = new sourceCls({
                    [settingsId]: __deepMerge(
                        sourceObj.settings ?? {},
                        finalParams.sourcesSettings[sourceId] ?? {},
                    ),
                });

                const sourceDuration = new __SDuration();
                // build
                const buildResultPromise = sourceInstance.build(params);
                pipe(buildResultPromise);
                const buildResult = await buildResultPromise;
                sitemap = [...sitemap, ...(buildResult ?? [])];
                emit('log', {
                    value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded <green>successfully</green> in <yellow>${
                        sourceDuration.end().formatedDuration
                    }</yellow>`,
                });
            }

            emit('log', {
                value: `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${
                    duration.end().formatedDuration
                }</yellow>`,
            });

            // resolve the build
            resolve(sitemap);
        });
    }
}
