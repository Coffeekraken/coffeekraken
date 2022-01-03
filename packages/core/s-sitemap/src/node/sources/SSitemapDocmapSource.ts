import __SSitemapSource, { ISSitemapSourceResult } from '../SSitemapSource';
import { ISSitemapResultItem } from '../SSitemap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { ISSitemapBuildParams } from '../interface/SSitemapBuildInterface';
import __SPromise from '@coffeekraken/s-promise';
import __SDocmap from '@coffeekraken/s-docmap';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';

/**
 * @name            SSitemapDocmapSource
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

export interface ISSitemapDocmapSourceCtorSettings {
    sitemapDocmapSource: Partial<ISSitemapDocmapSourceSettings>;
}

export interface ISSitemapDocmapSourceSettings {}

export default class SSitemapDocmapSource extends __SSitemapSource {
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
    get sitemapDocmapSourceSettings(): ISSitemapDocmapSourceSettings {
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
    constructor(settings?: Partial<ISSitemapDocmapSourceCtorSettings>) {
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
     * @param           {ISSitemapBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(
        params: Partial<ISSitemapBuildParams> = {},
    ): Promise<ISSitemapSourceResult> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const docmapInstance = new __SDocmap();
            const docmap = await docmapInstance.read();

            const items: ISSitemapResultItem[] = [];

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

            resolve(items);
        });
    }
}
