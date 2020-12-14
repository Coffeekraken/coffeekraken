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
    module.exports = function (__distanceBetween) {
        describe('sugar.js.geom.distanceBetween', function () {
            var res = __distanceBetween({
                x: 20, y: 10
            }, {
                x: 10, y: 20
            });
            it('Should constrain the passed point correctly', function () {
                expect(res).toBe(14.142135623730951);
            });
        });
    };
});
//# sourceMappingURL=module.js.map