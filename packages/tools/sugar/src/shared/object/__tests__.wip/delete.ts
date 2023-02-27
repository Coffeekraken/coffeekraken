module.exports = (__deleteProperty) => {
    describe('sugar.shared.object.delete', () => {
        it('Should delete correctly a simple property', () => {
            const obj = {
                hello: {
                    world: 'plop',
                },
                plop: 'yop',
            };

            expect(__deleteProperty(obj, 'hello.world')).toEqual({
                hello: {},
                plop: 'yop',
            });
        });

        it('Should delete correctly a property in an array', () => {
            const obj = {
                hello: {
                    world: ['one', 'two', 'three', 'four', 'five'],
                },
                plop: 'yop',
            };

            const deletedObj = __deleteProperty(obj, 'hello.world.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'three', 'four', 'five'],
                },
                plop: 'yop',
            });
        });

        it('Should delete correctly a property in an object that is inside an array', () => {
            const obj = {
                hello: {
                    world: [
                        'one',
                        'two',
                        {
                            coco: 'yeah',
                            del: {
                                branch: 'master',
                            },
                        },
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            };

            const deletedObj = __deleteProperty(obj, 'hello.world.2.del.branch');
            expect(deletedObj).toEqual({
                hello: {
                    world: [
                        'one',
                        'two',
                        {
                            coco: 'yeah',
                            del: {},
                        },
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            });
        });

        it('Should delete correctly a property in an array that is inside another array', () => {
            const obj = {
                hello: {
                    world: [
                        'one',
                        'two',
                        ['01', '02', '03', '04'],
                        'four',
                        'five',
                    ],
                },
                plop: 'yop',
            };

            const deletedObj = __deleteProperty(obj, 'hello.world.2.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', ['01', '03', '04'], 'four', 'five'],
                },
                plop: 'yop',
            });
        });
    });
};
