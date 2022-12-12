import __SDocmap from '@coffeekraken/s-docmap';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __fileHash } from '@coffeekraken/sugar/fs';
import { __pad } from '@coffeekraken/sugar/number';
import { __deepMerge } from '@coffeekraken/sugar/object';
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
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISSitemapBuilderDocmapSourceSettings>) {
        super(__deepMerge({}, settings ?? {}));
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

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[docmap]</yellow> Start generating sitemap from the project "<cyan>docmap.json</cyan>"`,
                });

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

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[docmap]</green> <magenta>${items.length}</magenta> sitemap entrie(s) gathered from the "<cyan>docmap.json</cyan>" file`,
                });

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
