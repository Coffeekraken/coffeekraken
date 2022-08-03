module.exports = (__deepMerge) => {
    describe('sugar.shared.object.deepMerge', () => {
        it('Should merge the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: {},
            };
            const obj2 = {
                hello: {
                    coco: 'coco',
                },
                yes: true,
            };
            const result = __deepMerge(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco',
                },
                plop: {},
                yes: true,
            });

            done();
        });

        it('Should merge the passed objects with some classes instances correctly', (done) => {
            class MyClass {
                classParam1 = 'hello';
                classParam2 = false;
                constructor(value) {
                    this.value = value;
                }
            }
            const myObj = new MyClass('MyClass');

            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: myObj,
            };
            const obj2 = {
                hello: {
                    coco: 'coco',
                },
                plop: {
                    param1: true,
                },
                yes: true,
            };
            const result = __deepMerge(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco',
                },
                plop: {
                    param1: true,
                },
                yes: true,
            });

            done();
        });

        it("Should leave the class instances and don's touch them", (done) => {
            class MyClass {
                classParam1 = 'hello';
                classParam2 = false;
                constructor(value) {
                    this.value = value;
                }
            }
            const myObj = new MyClass('MyClass');

            const obj1 = {
                hello: {
                    world: 'hello world',
                },
                plop: myObj,
            };
            const obj2 = {
                hello: {
                    coco: 'coco',
                },
                yes: true,
            };
            const result = __deepMerge(obj1, obj2);
            expect(result.plop instanceof MyClass).toBe(true);

            done();
        });

        it('Should merge the passed objects with some array correctly', (done) => {
            const obj1 = {
                plop: ['a', 'b', 'c'],
                hello: 'world',
            };
            const obj2 = {
                plop: ['a', 'b', 'd', 'e'],
                hello: 'world',
            };

            expect(__deepMerge(obj1, obj2)).toEqual(obj2);

            expect(
                __deepMerge(obj1, obj2, {
                    array: true,
                }),
            ).toEqual({
                plop: ['a', 'b', 'c', 'd', 'e'],
                hello: 'world',
            });

            done();
        });
    });
};
