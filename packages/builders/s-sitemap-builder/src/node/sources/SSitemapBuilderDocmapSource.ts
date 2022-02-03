import __SSitemapBuilderSource, { ISSitemapBuilderSourceResult } from '../SSitemapBuilderSource';
import { ISSitemapBuilderResultItem } from '../SSitemapBuilder';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '@coffeekraken/s-docmap';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';

/**
 * @name            SSitemapBuilderDocmapSource
 * @namespace       node
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class represent a SSitemap docmap source
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSitemapBuilderDocmapSourceCtorSettings {
    sitemapDocmapSource: Partial<ISSitemapBuilderDocmapSourceSettings>;
}

export interface ISSitemapBuilderDocmapSourceSettings {}

export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
    /**
     * @name            id
     * @type            String
     * @static
     *
     * Store the source id
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static id = 'docmap';

    static settingsId = 'sitemapDocmapSource';

    /**
     * @name            sitemapSourceDocmapSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source docmap settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sitemapDocmapSourceSettings(): ISSitemapBuilderDocmapSourceSettings {
        return (<any>this._settings).sitemapDocmapSource ?? {};
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
    constructor(settings?: Partial<ISSitemapBuilderDocmapSourceCtorSettings>) {
        super(
            'docmap',
            __deepMerge(
                {
                    sitemapDocmapSource: {},
                },
                settings ?? {},
            ),
        );
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(
        params: Partial<ISSitemapBuilderBuildParams> = {},
    ): Promise<ISSitemapBuilderSourceResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const docmapInstance = new __SDocmap();
            const docmap = await docmapInstance.read();

            const items: ISSitemapBuilderResultItem[] = [];

            const date = new Date();
            const lastmod = `${date.getFullYear()}-${__pad(
                date.getMonth(),
                2,
            )}-${__pad(date.getDate(), 2)}`;

            // @ts-ignore
            for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
                // @ts-ignore
                const hash = __fileHash(docmapObj.docmap.path);
                items.push({
                    loc: slug,
                    lastmod,
                    integrity: hash,
                });
            }

            // @ts-ignore
            for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
                for (let [slug, docmapObj] of Object.entries(packageObj.slug)) {
                    // @ts-ignore
                    const hash = __fileHash(docmapObj.docmap.path);
                    items.push({
                        loc: slug,
                        lastmod,
                        integrity: hash,
                    });
                }
            }

            resolve(items);
        });
    }
}
