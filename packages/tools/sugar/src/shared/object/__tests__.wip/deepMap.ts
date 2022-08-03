module.exports = (__deepMap) => {
    describe('sugar.shared.object.deepMap', () => {
        it('Should map the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    world: 'Yop',
                },
            };

            const res = __deepMap(obj1, (value, prop, fullPath) => {
                return `~ ${value}`;
            });

            expect(res).toEqual({
                hello: {
                    world: '~ hello world',
                },
                plop: {
                    world: '~ Yop',
                },
            });

            done();
        });
    });
};
