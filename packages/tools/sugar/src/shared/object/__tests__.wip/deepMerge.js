"use strict";
module.exports = (__deepMerge) => {
    describe('sugar.js.object.deepMerge', () => {
        it('Should merge the passed objects correctly', (done) => {
            const obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {}
            };
            const obj2 = {
                hello: {
                    coco: 'coco'
                },
                yes: true
            };
            const result = __deepMerge(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco'
                },
                plop: {},
                yes: true
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
                    world: 'hello world'
                },
                plop: myObj
            };
            const obj2 = {
                hello: {
                    coco: 'coco'
                },
                plop: {
                    param1: true
                },
                yes: true
            };
            const result = __deepMerge(obj1, obj2);
            expect(result).toEqual({
                hello: {
                    world: 'hello world',
                    coco: 'coco'
                },
                plop: {
                    param1: true
                },
                yes: true
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
                    world: 'hello world'
                },
                plop: myObj
            };
            const obj2 = {
                hello: {
                    coco: 'coco'
                },
                yes: true
            };
            const result = __deepMerge(obj1, obj2);
            expect(result.plop instanceof MyClass).toBe(true);
            done();
        });
        it('Should merge the passed objects with some array correctly', (done) => {
            const obj1 = {
                plop: ['a', 'b', 'c'],
                hello: 'world'
            };
            const obj2 = {
                plop: ['a', 'b', 'd', 'e'],
                hello: 'world'
            };
            expect(__deepMerge(obj1, obj2)).toEqual(obj2);
            expect(__deepMerge(obj1, obj2, {
                array: true
            })).toEqual({
                plop: ['a', 'b', 'c', 'd', 'e'],
                hello: 'world'
            });
            done();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1lcmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVlcE1lcmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUU7SUFDL0IsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtRQUN6QyxFQUFFLENBQUMsMkNBQTJDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RCxNQUFNLElBQUksR0FBRztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1QsQ0FBQztZQUNGLE1BQU0sSUFBSSxHQUFHO2dCQUNYLEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsTUFBTTtpQkFDYjtnQkFDRCxHQUFHLEVBQUUsSUFBSTthQUNWLENBQUM7WUFDRixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3JCLEtBQUssRUFBRTtvQkFDTCxLQUFLLEVBQUUsYUFBYTtvQkFDcEIsSUFBSSxFQUFFLE1BQU07aUJBQ2I7Z0JBQ0QsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsR0FBRyxFQUFFLElBQUk7YUFDVixDQUFDLENBQUM7WUFFSCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVFQUF1RSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkYsTUFBTSxPQUFPO2dCQUdYLFlBQVksS0FBSztvQkFGakIsZ0JBQVcsR0FBRyxPQUFPLENBQUM7b0JBQ3RCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO29CQUVsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQzthQUNGO1lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFP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