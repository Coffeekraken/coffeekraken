import __SPostcssBuilder from '../SPostcssBuilder';

describe('@coffeekraken.s-postcss-builder', () => {

    it('Should build a pretty complexe postcss file', async (done) => {

        const builder = new __SPostcssBuilder({
            postcssBuilder: {
                purgecss: {
                    content: [`${__dirname}/__data__/index.html`]
                }
            }
        });

        const promise = builder.build({
            input: `${__dirname}/__data__/index.css`,
            purge: true,
            minify: true
        });
        promise.on('log', (log) => {
            console.log(log.value);
        });

        const res = await promise;

        expect(res.map).toEqual(null);
        expect(res.css).not.toBeNull();

        done();
    });

});