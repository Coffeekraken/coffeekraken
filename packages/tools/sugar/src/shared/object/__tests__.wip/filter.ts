module.exports = (__filterObject) => {
    describe('sugar.shared.object.filter', () => {
        it('Should filter the object correctly', (done) => {
            const obj1 = __filterObject(
                {
                    hello: {
                        world: 'hello world',
                    },
                    plop: {
                        array: [0, 1, 2],
                    },
                },
                (item, name) => {
                    return name === 'hello';
                },
            );

            expect(obj1).toEqual({
                hello: {
                    world: 'hello world',
                },
            });

            done();
        });
    });
};
