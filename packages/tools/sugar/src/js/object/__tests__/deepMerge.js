"use strict";
module.exports = function (__deepMerge) {
    describe('sugar.js.object.deepMerge', function () {
        it('Should merge the passed objects correctly', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {}
            };
            var obj2 = {
                hello: {
                    coco: 'coco'
                },
                yes: true
            };
            var result = __deepMerge(obj1, obj2);
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
        it('Should merge the passed objects with some classes instances correctly', function (done) {
            var MyClass = /** @class */ (function () {
                function MyClass(value) {
                    this.classParam1 = 'hello';
                    this.classParam2 = false;
                    this.value = value;
                }
                return MyClass;
            }());
            var myObj = new MyClass('MyClass');
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: myObj
            };
            var obj2 = {
                hello: {
                    coco: 'coco'
                },
                plop: {
                    param1: true
                },
                yes: true
            };
            var result = __deepMerge(obj1, obj2);
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
        it("Should leave the class instances and don's touch them", function (done) {
            var MyClass = /** @class */ (function () {
                function MyClass(value) {
                    this.classParam1 = 'hello';
                    this.classParam2 = false;
                    this.value = value;
                }
                return MyClass;
            }());
            var myObj = new MyClass('MyClass');
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: myObj
            };
            var obj2 = {
                hello: {
                    coco: 'coco'
                },
                yes: true
            };
            var result = __deepMerge(obj1, obj2);
            expect(result.plop instanceof MyClass).toBe(true);
            done();
        });
        it('Should merge the passed objects with some array correctly', function (done) {
            var obj1 = {
                plop: ['a', 'b', 'c'],
                hello: 'world'
            };
            var obj2 = {
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
//# sourceMappingURL=deepMerge.js.map