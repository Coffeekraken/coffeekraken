module.exports = (__set) => {
    describe('sugar.shared.object.set', () => {
        it('Should set the object property correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };

            __set(obj1, 'hello.world', true);
            __set(obj1, 'plop.array.2', 'hello');

            expect(obj1.hello.world).toBe(true);
            expect(obj1.plop.array[2]).toBe('hello');

            done();
        });
    });
};
