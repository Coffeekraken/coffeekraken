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
    module.exports = function (__deepize) {
        describe('sugar.js.object.deepize', function () {
            it('Should deepize the passed objects correctly', function (done) {
                var obj1 = {
                    'hello.world': 'coco',
                    'something.else': true
                };
                var res = __deepize(obj1);
                expect(res).toEqual({
                    hello: {
                        world: 'coco'
                    },
                    something: {
                        else: true
                    }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map