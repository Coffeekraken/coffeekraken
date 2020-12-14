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
    module.exports = function (__constrain) {
        describe('sugar.js.number.constrain', function () {
            it('Should constrain the passed numbers correctly', function () {
                expect(__constrain(20, 10, 15)).toBe(15);
                expect(__constrain(2, 10, 15)).toBe(10);
            });
        });
    };
});
//# sourceMappingURL=module.js.map