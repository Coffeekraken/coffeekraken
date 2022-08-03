module.exports = (__diff) => {
    describe('sugar.shared.object.diff', () => {
        it('Should merge the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {
                    yop: 'coco',
                },
                param: {
                    three: 'nelson',
                },
                yes: true,
            };
            const obj2 = {
                hello: {
                    coco: 'coco',
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            };

            const result = __diff(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });

            const result2 = __diff(obj1, obj2, {
                added: false,
            });
            expect(result2).toEqual({
                yes: false,
            });

            const result3 = __diff(obj1, obj2, {
                deleted: true,
            });
            expect(result3).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco',
                },
                plop: {
                    yop: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });

            const result4 = __diff(obj1, obj2, {
                equals: true,
            });
            expect(result4).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    three: 'nelson',
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
                yes: false,
            });

            const result5 = __diff(obj1, obj2, {
                updated: false,
            });
            expect(result5).toEqual({
                hello: {
                    coco: 'coco',
                },
                param: {
                    nelson: {
                        coco: 'eating',
                    },
                },
                added: 'value',
            });

            done();
        });
    });
};
