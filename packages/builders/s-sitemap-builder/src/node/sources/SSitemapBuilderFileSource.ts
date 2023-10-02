import __SGlob from '@coffeekraken/s-glob';
import __STypescriptBuilder from '@coffeekraken/s-typescript-builder';
import { __deepMerge } from '@coffeekraken/sugar/object';
import type { ISSitemapBuilderResultItem } from '../SSitemapBuilder.js';
import __SSitemapBuilderSource, {
    ISSitemapBuilderSourceResult,
} from '../SSitemapBuilderSource.js';
import type { ISSitemapBuilderBuildParams } from '../interface/SSitemapBuildIParamsInterface.js';

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
    ): Promise<ISSitemapBuilderSourceResult> {
        return new Promise(async (resolve, reject) => {
            console.log(
                `<yellow>[file]</yellow> Search for sitemap files using "<cyan>${this.settings.glob.join(
                    ', ',
                )}</cyan>" glob...`,
            );

            const logs: string[] = [];

            const files = __SGlob.resolveSync(this.settings.glob, {
                cwd: this.settings.inDir,
            });

            console.log(
                `<yellow>[file]</yellow> Found <yellow>${files.length}</yellow> file(s)`,
            );
            files.forEach((file) => {
                console.log(
                    `<yellow>[file]</yellow> - <cyan>${file.relPath}</cyan>`,
                );
            });

            let items: ISSitemapBuilderResultItem[] = [];

            for (let [key, file] of Object.entries(files)) {
                // @ts-ignore
                let filePath = file.path,
                    itemsCount = 0,
                    buildedFile;

                if (filePath.match(/\.ts$/)) {
                    buildedFile = await __STypescriptBuilder.buildTemporary(
                        filePath,
                    );
                    filePath = buildedFile.path;
                }

                // @ts-ignore
                const fn = (await import(filePath)).default;

                // remove the temp file
                buildedFile.remove();

                if (typeof fn === 'function') {
                    const fileItems = await fn(params);
                    itemsCount = fileItems.length;
                    items = [...items, ...fileItems];
                } else if (Array.isArray(fn)) {
                    items = [...items, ...fn];
                    itemsCount = fn.length;
                } else {
                    throw new Error(
                        // @ts-ignore
                        `Your sitemap file "<cyan>${file.relPath}</cyan>" MUST return either a function that returns an <yellow>ISSitemapBuilderResultItem</yellow> array, or just an <yellow>ISSitemapBuilderResultItem</yellow> array...`,
                    );
                }

                logs.push(
                    `<green>[file]</green> <magenta>${itemsCount}</magenta> sitemap entrie(s) for the file "<cyan>${file.relPath}</cyan>"`,
                );
            }

            resolve({
                items,
                logs,
            });
        });
    }
}
