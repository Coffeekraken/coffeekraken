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
    module.exports = function (__flatten) {
        describe('sugar.js.object.flatten', function () {
            it('Should flatten the object correctly', function (done) {
                var obj1 = __flatten({
                    hello: {
                        world: 'hello world'
                    },
                    plop: {
                        array: [0, 1, 2]
                    }
                }, '_', false);
                expect(obj1).toEqual({
                    'hello_world': 'hello world',
                    'plop_array': [0, 1, 2]
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map