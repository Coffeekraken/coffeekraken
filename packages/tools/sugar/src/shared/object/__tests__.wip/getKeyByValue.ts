module.exports = (__geKeyByValue) => {
    describe('sugar.shared.object.geKeyByValue', () => {
        it('Should find the correct key passing a value', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                    plop: 'youhou',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };

            expect(__geKeyByValue(obj1.hello, 'hello world')).toBe('world');

            done();
        });
    });
};
