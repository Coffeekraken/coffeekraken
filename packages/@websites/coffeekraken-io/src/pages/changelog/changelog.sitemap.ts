import __SPromise from '@coffeekraken/s-promise';
import { ISSitemapBuilderResultItem } from '@coffeekraken/s-sitemap-builder';

import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';

export default function changelogSitemap() {
    return new __SPromise(async ({ resolve, emit }) => {
        const items: ISSitemapBuilderResultItem[] = [];

        const versions = __readJsonSync(
            `${__dirname()}/../../../versions.json`,
        );

        for (let i = 0; i < Object.keys(versions).length; i++) {
            const version = Object.keys(versions)[i];
            items.push({
                title: `Coffeekraken ${version} changelog`,
                log: i === 0 ? '/changelog' : `/changelog/${version}`,
            });
        }

        resolve(items);
    });
}
