import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __pad from '@coffeekraken/sugar/shared/number/pad';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import type { ISSitemapBuilderResultItem } from '../SSitemapBuilder';
import __SSitemapBuilderSource from '../SSitemapBuilderSource';

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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSitemapBuilderDocmapSourceCtorSettings {
    sitemapDocmapSource: Partial<ISSitemapBuilderDocmapSourceSettings>;
}

export interface ISSitemapBuilderDocmapSourceSettings {}

export default class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
    /**
     * @name            settingsId
     * @type            String
     * @static
     *
     * Store the source settings id
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static settingsId = 'sitemapDocmapSource';

    /**
     * @name            sitemapSourceDocmapSettings
     * @type            ISSitemapSourceSettings
     * @get
     *
     * Access the sitemap source docmap settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get sitemapDocmapSourceSettings(): ISSitemapBuilderDocmapSourceSettings {
        // @ts-ignore
        return (<any>this).settings[this.constructor.settingsId] ?? {};
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
    constructor(settings?: Partial<ISSitemapBuilderDocmapSourceCtorSettings>) {
        super(
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(
        params: Partial<ISSitemapBuilderBuildParams> = {},
    ): Promise<ISSitemapBuilderResultItem[]> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const docmapInstance = new __SDocmap();
                const docmap = await docmapInstance.read();

                const items: ISSitemapBuilderResultItem[] = [];

                const date = new Date();
                const lastmod = `${date.getFullYear()}-${__pad(
                    date.getMonth(),
                    2,
                )}-${__pad(date.getDate(), 2)}`;

                // @ts-ignore
                for (let [slug, docmapObj] of Object.entries(
                    docmap.menu.slug,
                )) {
                    // @ts-ignore
                    if (!__fs.existsSync(docmapObj.docmap.path)) {
                        emit('log', {
                            type: __SLog.TYPE_WARNING,
                            // @ts-ignore
                            value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                        });
                    } else {
                        // @ts-ignore
                        const hash = __fileHash(docmapObj.docmap.path);
                        items.push({
                            loc: slug,
                            lastmod,
                            integrity: hash,
                        });
                    }
                }

                // @ts-ignore
                for (let [packageName, packageObj] of Object.entries(
                    docmap.menu.packages,
                )) {
                    for (let [slug, docmapObj] of Object.entries(
                        // @ts-ignore
                        packageObj.slug,
                    )) {
                        // @ts-ignore
                        if (!__fs.existsSync(docmapObj.docmap.path)) {
                            emit('log', {
                                type: __SLog.TYPE_WARNING,
                                // @ts-ignore
                                value: `<yellow>[build]</yellow> Docmap referenced file "<cyan>${docmapObj.docmap.path}</cyan>" does not exist. Skipping it...`,
                            });
                        } else {
                            // @ts-ignore
                            const hash = __fileHash(docmapObj.docmap.path);
                            items.push({
                                loc: slug,
                                lastmod,
                                integrity: hash,
                            });
                        }
                    }
                }

                resolve(items);
            },
            {
                eventEmitter: {
                    bind: this,
                },
            },
        );
    }
}
