import __SDocmap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import { __base64 } from '@coffeekraken/sugar/crypto';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

export default function sitemap() {
    return new __SPromise(async ({ resolve, reject, emit }) => {
        const items = [
            {
                loc: 'http://localhost:9191/api/doc',
            },
        ];

        const docmapInstance = new __SDocmap();

        const docConfig = __SSugarConfig.get('doc');

        for (let [categoryId, categoryObj] of Object.entries(
            docConfig.categories,
        )) {
            const searchResult = await docmapInstance.search(
                categoryObj.filters ?? {},
            );

            if (!Object.keys(searchResult.items ?? {}).length) continue;

            items.push({
                loc: `http://localhost:${docConfig.server.port}/api/doc/items/${__base64.encrypt(JSON.stringify(categoryObj.filters ?? {}))}`;
            });

            for (let [id, itemObj] of Object.entries(searchResult.items)) {
                items.push({
                    loc: `http://localhost:${docConfig.server.port}/api/doc/item/${itemObj.id}`,
                });
            }
        }

        resolve(items);
    });
}
