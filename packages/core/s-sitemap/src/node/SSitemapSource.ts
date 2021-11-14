import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { ISSitemapResultItem } from './SSitemap';
import { ISSitemapBuildParams } from './interface/SSitemapBuildInterface';
import { ISSitemapDocmapSourceCtorSettings } from './sources/SSitemapDocmapSource';

/**
 * @name            SSitemapSource
 * @namespace       node
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class represent a SSitemap source like docmap, frontspec, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSitemapSourceCtorSettings
    extends ISSitemapDocmapSourceCtorSettings {
    source: Partial<ISSitemapSourceSettings>;
}

export interface ISSitemapSourceSettings {}

export type ISSitemapSourceResult = ISSitemapResultItem[];

export default class SSitemapSource extends __SClass {
    /**
     * @name            sitemapSourceSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sitemapSourceSettings(): ISSitemapSourceSettings {
        return (<any>this._settings).sitemapSource ?? {};
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
    constructor(id: string, settings?: Partial<ISSitemapSourceCtorSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id,
                    },
                    sitemapSource: {},
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
     * This method MUST be implemented in your child class to build your particular sitemap.
     * Is has to return a Promise and resolve it with an ISSitemapSourceBuildResult object type
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
        throw new Error(
            `This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`,
        );
    }
}
