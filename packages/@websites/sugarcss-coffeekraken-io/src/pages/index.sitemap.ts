import __SDocmap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function sitemap() {
    return new __SPromise(async ({ resolve, reject, emit }) => {
        const items = [];

        const docmapInstance = new __SDocmap();

        const docConfig = __SSugarConfig.get('doc');

        for (let [categoryId, categoryObj] of Object.entries(
            docConfig.categories,
        )) {
            const searchResult = await docmapInstance.search(
                categoryObj.filters ?? {},
            );

            if (!Object.keys(searchResult.items ?? {}).length) continue;

            for (let [id, itemObj] of Object.entries(searchResult.items)) {
                items.push({
                    loc: `http://localhost:${docConfig.server.port}/api/doc/${itemObj.id}`,
                });
            }
        }

        // const hashesByPath = {};

        // const docmapInstance = new __SDocmap();
        // const docmapJson = await docmapInstance.read();

        // for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
        //     // @ts-ignore
        //     let hash = hashesByPath[docmapObj.path];
        //     if (!hash) {
        //         // @ts-ignore
        //         if (!__fs.existsSync(docmapObj.path)) {
        //             console.warn(
        //                 `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
        //             );
        //         } else {
        //             // @ts-ignore
        //             hash = __fileHashSync(docmapObj.path);
        //             // save in stack
        //             // @ts-ignore
        //             hashesByPath[docmapObj.path] = hash;
        //         }
        //     }

        //     items.push({
        //         loc: `/api/${namespace}`,
        //         // @ts-ignore
        //         integrity: hash,
        //     });
        // }

        resolve(items);
    });
}
