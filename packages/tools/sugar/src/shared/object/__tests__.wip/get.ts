module.exports = (__get) => {
    describe('sugar.shared.object.get', () => {
        it('Should get the object property correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };

            const val1 = __get(obj1, 'hello.world');
            const val2 = __get(obj1, 'plop.array.2');

            expect(val1).toBe('hello world');
            expect(val2).toBe(2);

            done();
        });

        it('Should get the object property under an optional one', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    array: [0, 1, 2],
                },
            };

            const val1 = __get(obj1, 'hello.coco?.world');

            done();
        });
    });
};
