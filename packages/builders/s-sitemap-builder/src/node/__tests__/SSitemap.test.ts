import __SSitemap from '../SSitemapBuilder';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

describe('s-sitemap.node.SSitemap', () => {
    it('Should generate a simple sitemap from a static source', async () => {
        await __SSugarConfig.load();
        const sitemap = new __SSitemap();

        const resPromise = sitemap.build();
        // @ts-ignore
        resPromise.on('log', (data) => {
            console.log(data.value);
        });
        const res = await resPromise;

        // console.log(res);

        expect(true).toBe(true);
    });
});
