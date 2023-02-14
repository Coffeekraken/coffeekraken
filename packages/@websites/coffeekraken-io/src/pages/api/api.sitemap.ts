import __SDocmap from '@coffeekraken/s-docmap';
import { ISSitemapBuilderResultItem } from '@coffeekraken/s-sitemap-builder';
import { __fileHash } from '@coffeekraken/sugar/fs';
import __fs from 'fs';

export default function apiSitemap() {
    return new Promise(async (resolve) => {
        const docmap = new __SDocmap();
        const docmapJson = await docmap.read();
        const hashesByPath = {};

        const items: ISSitemapBuilderResultItem[] = [];

        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // do not take ".config" items
            if (
                namespace.match(/\.config\./) &&
                !namespace.match(/\.doc\.config/)
            ) {
                continue;
            }

            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!__fs.existsSync(docmapObj.path)) {
                    console.log(
                        `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                    );
                } else {
                    // @ts-ignore
                    hash = __fileHash(docmapObj.path);
                    // save in stack
                    // @ts-ignore
                    hashesByPath[docmapObj.path] = hash;
                }
            }
            items.push({
                title: docmapObj.name,
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }

        resolve(items);
    });
}
