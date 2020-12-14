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
    module.exports = function (__circleConstrain) {
        describe('sugar.js.geom.circleConstrain', function () {
            var res = __circleConstrain({
                x: 20, y: 10
            }, 10, {
                x: 10, y: 5
            });
            it('Should constrain the passed point correctly', function () {
                expect(res).toEqual({
                    x: 11.05572809000084,
                    y: 5.527864045000419
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map