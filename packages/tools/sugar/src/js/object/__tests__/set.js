"use strict";
module.exports = function (__set) {
    describe('sugar.js.object.set', function () {
        it('Should set the object property correctly', function (done) {
            var obj1 = {
                hello: {
                    world: 'hello world'
                },
                plop: {
                    array: [0, 1, 2]
                }
            };
            __set(obj1, 'hello.world', true);
            __set(obj1, 'plop.array.2', 'hello');
            expect(obj1.hello.world).toBe(true);
            expect(obj1.plop.array[2]).toBe('hello');
            done();
        });
    });
};
//# sourceMappingURL=set.js.map