(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__get) {
        describe('sugar.js.object.get', function () {
            it('Should get the object property correctly', function (done) {
                var obj1 = {
                    hello: {
                        world: 'hello world'
                    },
                    plop: {
                        array: [0, 1, 2]
                    }
                };
                var val1 = __get(obj1, 'hello.world');
                var val2 = __get(obj1, 'plop.array.2');
                expect(val1).toBe('hello world');
                expect(val2).toBe(2);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map