import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { ISSitemapBuilderResultItem } from './SSitemapBuilder';
import { ISSitemapBuilderBuildParams } from './interface/SSitemapBuilderBuildParamsInterface';
import { ISSitemapBuilderDocmapSourceCtorSettings } from './sources/SSitemapBuilderDocmapSource';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSitemapSourceCtorSettings
    extends ISSitemapBuilderDocmapSourceCtorSettings {
    source: Partial<ISSitemapSourceSettings>;
}

export interface ISSitemapSourceSettings {}

export type ISSitemapSourceResult = ISSitemapBuilderResultItem[];

export default class SSitemapSource extends __SClass {
    /**
     * @name            sitemapSourceSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @param           {ISSitemapBuilderBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(
        params: Partial<ISSitemapBuilderBuildParams> = {},
    ): Promise<ISSitemapSourceResult> {
        throw new Error(
            `This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`,
        );
    }
}
