import __SDocmap from '@coffeekraken/s-docmap';
import __SPromise from '@coffeekraken/s-promise';
import { __fileHashSync } from '@coffeekraken/sugar/fs';
import __fs from 'fs';

export default function sitemap() {
    return new __SPromise(async ({ resolve, reject, emit }) => {
        const items = [
            {
                loc: '/config/explorer',
            },
        ];

        const hashesByPath = {};

        const docmapInstance = new __SDocmap();
        const docmapJson = await docmapInstance.read();

        for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
            // @ts-ignore
            let hash = hashesByPath[docmapObj.path];
            if (!hash) {
                // @ts-ignore
                if (!__fs.existsSync(docmapObj.path)) {
                    console.warn(
                        `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`,
                    );
                } else {
                    // @ts-ignore
                    hash = __fileHashSync(docmapObj.path);
                    // save in stack
                    // @ts-ignore
                    hashesByPath[docmapObj.path] = hash;
                }
            }

            items.push({
                loc: `/api/${namespace}`,
                // @ts-ignore
                integrity: hash,
            });
        }

        resolve(items);
    });
}
