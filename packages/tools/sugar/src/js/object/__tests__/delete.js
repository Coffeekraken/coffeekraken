"use strict";
module.exports = function (__delete) {
    describe('sugar.js.object.delete', function () {
        it('Should delete correctly a simple property', function () {
            var obj = {
                hello: {
                    world: 'plop'
                },
                plop: 'yop'
            };
            expect(__delete(obj, 'hello.world')).toEqual({
                hello: {},
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an array', function () {
            var obj = {
                hello: {
                    world: ['one', 'two', 'three', 'four', 'five']
                },
                plop: 'yop'
            };
            var deletedObj = __delete(obj, 'hello.world.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'three', 'four', 'five']
                },
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an object that is inside an array', function () {
            var obj = {
                hello: {
                    world: ['one', 'two', {
                            coco: 'yeah',
                            del: {
                                branch: 'master'
                            }
                        }, 'four', 'five']
                },
                plop: 'yop'
            };
            var deletedObj = __delete(obj, 'hello.world.2.del.branch');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', {
                            coco: 'yeah',
                            del: {}
                        }, 'four', 'five']
                },
                plop: 'yop'
            });
        });
        it('Should delete correctly a property in an array that is inside another array', function () {
            var obj = {
                hello: {
                    world: ['one', 'two', [
                            '01', '02', '03', '04'
                        ], 'four', 'five']
                },
                plop: 'yop'
            };
            var deletedObj = __delete(obj, 'hello.world.2.1');
            expect(deletedObj).toEqual({
                hello: {
                    world: ['one', 'two', [
                            '01', '03', '04'
                        ], 'four', 'five']
                },
                plop: 'yop'
            });
        });
    });
};
//# sourceMappingURL=delete.js.map