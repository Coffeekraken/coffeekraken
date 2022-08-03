module.exports = (__map) => {
    describe('sugar.shared.object.map', () => {
        it('Should be processed correctly using the map function', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };

            expect(
                __map(obj1, (value, prop) => {
                    return prop === 'plop' ? 'yeah' : value;
                }),
            ).toEqual({
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: 'yeah',
            });

            done();
        });
    });
};
