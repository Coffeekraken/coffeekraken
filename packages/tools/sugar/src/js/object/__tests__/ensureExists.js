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
    module.exports = function (__ensureExists) {
        describe('sugar.js.object.ensureExists', function () {
            it('Should have created the passed dotted path inside the object', function (done) {
                var obj1 = {
                    hello: 'world'
                };
                __ensureExists(obj1, 'coco.yop', {});
                expect(obj1).toEqual({
                    hello: 'world',
                    coco: {
                        yop: {}
                    }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map