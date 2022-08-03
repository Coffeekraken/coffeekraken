module.exports = (__extractValues) => {
    describe('sugar.shared.object.extractValues', () => {
        it('Should extract correctly the values from an array ob objects', (done) => {
            const array = [
                {
                    hello: 'world',
                    plop: 'wijwoeijfewf',
                },
                {
                    hello: 'something',
                    plop: 'wijfjjfjfjf',
                },
                {
                    plop: 'something else',
                },
            ];

            expect(__extractValues(array, 'hello')).toEqual([
                'world',
                'something',
            ]);

            done();
        });
    });
};
