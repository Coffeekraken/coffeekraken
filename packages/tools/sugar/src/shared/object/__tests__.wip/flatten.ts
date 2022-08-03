module.exports = (__flatten) => {
    describe('sugar.shared.object.flatten', () => {
        it('Should flatten the object correctly', (done) => {
            const obj1 = __flatten(
                {
                    hello: {
                        world: 'hello world',
                    },
                    plop: {
                        array: [0, 1, 2],
                    },
                },
                '_',
                false,
            );

            expect(obj1).toEqual({
                hello_world: 'hello world',
                plop_array: [0, 1, 2],
            });

            done();
        });
    });
};
