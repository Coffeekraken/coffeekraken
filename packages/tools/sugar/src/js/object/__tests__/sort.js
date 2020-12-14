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
    module.exports = function (__sort) {
        describe('sugar.js.object.sort', function () {
            it('Should sort the object correctly', function (done) {
                var res = __sort({
                    coco: { weight: 10 },
                    lolo: { weight: 2 },
                    plop: { weight: 5 }
                }, function (a, b) {
                    return a.weight - b.weight;
                });
                expect(res).toEqual({
                    lolo: { weight: 2 },
                    plop: { weight: 5 },
                    coco: { weight: 10 }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map