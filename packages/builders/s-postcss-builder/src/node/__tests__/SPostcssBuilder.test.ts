import __SPostcssBuilder from '../SPostcssBuilder';

describe('@coffeekraken.s-postcss-builder', () => {

    it('Should build a pretty complexe postcss file', async (done) => {

        const builder = new __SPostcssBuilder();

        const promise = builder.build({
            input: `${__dirname}/__data__/index.css`,
            purge: true
        });
        promise.on('log', (log) => {
            console.log(log.value);
        });

        const res = await promise;

        console.log(res);

        expect(res.map).toEqual(null);
        expect(res.css).not.toBeNull();

        done();
    });

});