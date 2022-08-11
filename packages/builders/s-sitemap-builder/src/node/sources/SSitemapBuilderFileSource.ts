import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface';
import type { ISSitemapBuilderResultItem } from '../SSitemapBuilder';
import __SSitemapBuilderSource from '../SSitemapBuilderSource';

/**
 * @name            SSitemapBuilderFileSource
 * @namespace       node
 * @type            Class
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This class represent a SSitemap files source
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSitemapBuilderFileSourceSettings {
    glob: string[] | string;
    inDir: string;
}

export default class SSitemapBuilderFileSource extends __SSitemapBuilderSource {
    /**
     * @name            id
     * @type            String
     * @static
     *
     * Store the source settings id
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static settingsId = 'sitemapFileSource';

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
    constructor(settings?: Partial<ISSitemapBuilderFileSourceSettings>) {
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
                const files = __SGlob.resolve(this.settings.glob, {
                    cwd: this.settings.inDir,
                });

                let items: ISSitemapBuilderResultItem[] = [];

                for (let [key, file] of Object.entries(files)) {
                    // @ts-ignore
                    let filePath = file.path;

                    if (filePath.match(/\.ts$/)) {
                        const buildedFile =
                            await __STypescriptBuilder.buildTemporary(filePath);
                        filePath = buildedFile.path;
                        setTimeout(() => {
                            buildedFile.remove();
                        }, 500);
                    }

                    // @ts-ignore
                    const fn = (await import(filePath)).default;
                    if (typeof fn === 'function') {
                        const fileItems = await fn(params);
                        items = [...items, ...fileItems];
                    } else if (Array.isArray(fn)) {
                        items = [...items, ...fn];
                    } else {
                        throw new Error(
                            // @ts-ignore
                            `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`,
                        );
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
