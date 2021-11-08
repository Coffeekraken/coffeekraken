import __SDocmap from '@coffeekraken/s-docmap';

export default function sitemap() {
    return new Promise(async (resolve, reject) => {
        const items = [
            {
                loc: '/config/explorer',
            },
        ];

        const docmapInstance = new __SDocmap();
        const docmapJson = await docmapInstance.read();

        Object.keys(docmapJson.map).forEach((namespace) => {
            items.push({
                loc: `/api/${namespace}`,
            });
        });

        resolve(items);
    });
}
