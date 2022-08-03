"use strict";
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
                constructor(value) {
                    this.classParam1 = 'hello';
                    this.classParam2 = false;
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
                constructor(value) {
                    this.classParam1 = 'hello';
                    this.classParam2 = false;
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
            expect(__deepMerge(obj1, obj2, {
                array: true,
            })).toEqual({
                plop: ['a', 'b', 'c', 'd', 'e'],
                hello: 'world',
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDN0IsUUFBUSxDQUFDLCtCQUErQixFQUFFLEdBQUcsRUFBRTtRQUMzQyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNyRCxNQUFNLElBQUksR0FBRztnQkFDVCxLQUFLLEVBQUU7b0JBQ0gsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1gsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHO2dCQUNULEtBQUssRUFBRTtvQkFDSCxJQUFJLEVBQUUsTUFBTTtpQkFDZjtnQkFDRCxHQUFHLEVBQUUsSUFBSTthQUNaLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssRUFBRTtvQkFDSCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLE1BQU07aUJBQ2Y7Z0JBQ0QsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakYsTUFBTSxPQUFPO2dCQUdULFlBQVksS0FBSztvQkFGakIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7b0JBQ3RCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO29CQUVoQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdkIsQ0FBQzthQUNKO1lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMs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