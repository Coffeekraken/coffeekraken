module.exports = (__deepize) => {
    describe('sugar.shared.object.deepize', () => {
        it('Should deepize the passed objects correctly', (done) => {
            const obj1 = {
                'hello.world': 'coco',
                'something.else': true,
            };

            const res = __deepize(obj1);

            expect(res).toEqual({
                hello: {
                    world: 'coco',
                },
                something: {
                    else: true,
                },
            });

            done();
        });
    });
};
