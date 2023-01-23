import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SDuration from '@coffeekraken/s-duration';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __extension, __writeFileSync } from '@coffeekraken/sugar/fs';
import { __isClass } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __SSitemapBuilderBuildParamsInterface from './interface/SSitemapBuilderBuildParamsInterface';
import __SSitemapBuilderSource from './SSitemapBuilderSource';

/**
 * @name            SSitemapBuilder
 * @namespace       node
 * @type            Class
 * @extends         SBuilder
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class allows you to generate a sitemap easily taking in consideration things like
 * docmap.json, frontspec.json, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export type ISSitemapBuilderTypes = 'docmap' | 'frontspec';

export interface ISSitemapBuilderSources {
    [key: string]: __SSitemapBuilderSource;
}

export interface ISSitemapBuilderBuildParams {
    source: string[];
    sourcesSettings: any;
    output: string;
    save: boolean;
}

export interface ISSitemapBuilderResultItem {
    loc: string;
    lastmod: string;
    integrity?: string;
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

export interface ISSitemapBuilderBuildResult {}

export interface ISSitemapBuilderSourcesSettings {
    [key: string]: ISSitemapBuilderSourceSettings;
}
export interface ISSitemapBuilderSourceSettings {
    active: boolean;
    settings: any;
    path: string;
}

export interface ISSitemapBuilderSettings extends ISBuilderSettings {
    sources: ISSitemapBuilderSourcesSettings;
}

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
    constructor(settings?: Partial<ISSitemapBuilderSettings>) {
        super(
            __deepMerge(
                {
                    sources: {},
                },
                settings ?? {},
            ),
        );

        const config = __SSugarConfig.get('sitemapBuilder');
        this.settings.sources = __deepMerge(
            config.sources ?? {},
            this.settings.sources,
        );
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
    _build(
        params: Partial<ISSitemapBuilderBuildParams> = {},
    ): Promise<ISSitemapBuilderBuildResult> {
        return new Promise(async (resolve) => {
            let sitemap: ISSitemapBuilderResultItem[] = [];

            // @ts-ignore
            const finalParams: ISSitemapBuilderBuildParams =
                __SSitemapBuilderBuildParamsInterface.apply(params);

            const duration = new __SDuration();

            let sourcesId = finalParams.source.length
                ? finalParams.source
                : Object.keys(this.settings.sources);

            for (let i = 0; i < sourcesId.length; i++) {
                const sourceId = sourcesId[i];

                if (!this.settings.sources[sourceId]) {
                    throw new Error(
                        `Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(
                            this.settings.sources,
                        ).join(',')}`,
                    );
                }

                const sourceObj = this.settings.sources[sourceId];

                // skip inactive sources
                if (!sourceObj.active) continue;

                // load source
                // @ts-ignore
                const importedSource = (await import(sourceObj.path)).default;

                let buildFn;

                if (__isClass(importedSource)) {
                    // instanciate new source
                    const sourceInstance = new importedSource({
                        ...__deepMerge(
                            sourceObj.settings ?? {},
                            finalParams.sourcesSettings[sourceId] ?? {},
                        ),
                    });
                    buildFn = sourceInstance.build.bind(sourceInstance);
                } else if (typeof importedSource === 'function') {
                    buildFn = importedSource;
                }

                const sourceDuration = new __SDuration();
                // build
                const buildResultPromise = buildFn(finalParams);
                const buildResult = await buildResultPromise;
                sitemap = [...sitemap, ...(buildResult ?? [])];
                console.log(
                    `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${
                        buildResult.length
                    }</magenta> item(s) <green>successfully</green> in <yellow>${
                        sourceDuration.end().formatedDuration
                    }</yellow>`,
                );
            }

            if (finalParams.save) {
                console.log(
                    `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${__path.relative(
                        __packageRootDir(),
                        finalParams.output,
                    )}</cyan>"`,
                );
                this.save(sitemap, finalParams.output);
            }

            console.log(
                `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${
                    duration.end().formatedDuration
                }</yellow>`,
            );

            // resolve the build
            resolve(sitemap);
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
    save(items: ISSitemapBuilderResultItem[], path: string): void {
        switch (__extension(path)) {
            case 'xml':
            default:
                let xmlStr: string[] = [
                    '<?xml version="1.0" encoding="UTF-8"?>',
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                    '   <url>',
                    '       <loc>/</loc>',
                    '   </url>',
                ];
                items.forEach((item) => {
                    const itemStr: string[] = [];
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
