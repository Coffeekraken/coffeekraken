module.exports = (__deepProxy) => {
    describe('sugar.shared.object.deepProxy', () => {
        it('Should detect the updates in the object correctly', (done) => {
            let updatesCount = 0;

            const obj1 = __deepProxy(
                {
                    hello: {
                        world: 'hello world',
                    },
                    plop: {
                        array: [0, 1, 2],
                    },
                },
                (obj) => {
                    if (obj.action === 'get') return;
                    updatesCount++;
                },
            );

            obj1.hello.world = 'Coco';
            obj1.plop.array.push('coco');

            expect(updatesCount).toBe(2);

            done();
        });
    });
};
