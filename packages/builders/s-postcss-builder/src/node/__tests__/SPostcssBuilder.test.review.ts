import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SPostcssBuilder from '../SPostcssBuilder.js';

describe('@coffeekraken.s-postcss-builder', () => {
    it('Should build a pretty complexe postcss file', async () => {
        await __SSugarConfig.load();

        const builder = new __SPostcssBuilder({
            purgecss: {
                content: [`${__dirname}/__data__/index.html`],
            },
        });

        const promise = builder.build({
            input: `${__dirname}/__data__/index.css`,
            purge: true,
            minify: true,
        });

        const res = await promise;

        expect(res.map).toEqual(null);
        expect(res.css).not.toBeNull();
    });
});
