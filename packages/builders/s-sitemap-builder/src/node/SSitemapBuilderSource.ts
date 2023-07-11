import __SClass from '@coffeekraken/s-class';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type {
    ISSitemapBuilderResultItem,
    ISSitemapBuilderSourceBuildResult,
} from './SSitemapBuilder.js';
import type { ISSitemapBuilderBuildParams } from './interface/SSitemapBuilderBuildParamsInterface.js';

/**
 * @name            SSitemapBuilderSource
 * @namespace       node
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent a SSitemap source like docmap, frontspec, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export interface ISSitemapBuilderSourceSettings {}

export type ISSitemapBuilderSourceResult =
    | ISSitemapBuilderResultItem[]
    | ISSitemapBuilderSourceBuildResult;

export default class SSitemapBuilderSource extends __SClass {
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
    constructor(settings?: Partial<ISSitemapBuilderSourceSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }

    /**
     * @name            build
     * @type            Function
     * @async
     *
     * This method MUST be implemented in your child class to build your particular sitemap.
     * Is has to return a Promise and resolve it with an ISSitemapBuilderSourceBuildResult object type
     *
     * @param           {ISSitemapBuilderBuildParams}          [params={}]         Some params passed to the build method
     * @return          {Promise<ISSitemapBuilderSourceBuildResult>}               A promise resolved when the sitemap has been successfully generated
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(
        params: Partial<ISSitemapBuilderBuildParams> = {},
    ): Promise<ISSitemapBuilderSourceResult> {
        throw new Error(
            `This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`,
        );
    }
}
