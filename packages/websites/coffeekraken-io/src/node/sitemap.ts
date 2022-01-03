import __SDocmap from '@coffeekraken/s-docmap';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';

export default function sitemap() {
    return new Promise(async (resolve, reject) => {
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
                hash = __fileHash(docmapObj.path);
                // save in stack
                // @ts-ignore
                hashesByPath[docmapObj.path] = hash;
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
