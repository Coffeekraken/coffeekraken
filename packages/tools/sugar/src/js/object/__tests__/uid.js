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
    module.exports = function (__uid) {
        describe('sugar.js.object.uid', function () {
            it('Should encrypt the same object twice the same', function (done) {
                var obj = {
                    param1: 'hello',
                    param2: 'world coco'
                };
                var res1 = __uid(obj, 'somethingCool');
                var res2 = __uid(obj, 'somethingCool');
                expect(res1).toBe(res2);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map