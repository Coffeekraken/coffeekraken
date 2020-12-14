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
    module.exports = function (__testFn) {
        describe('sugar.js.is.odd', function () {
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn(1)).toBe(true);
                expect(__testFn(2)).toBe(false);
            });
        });
    };
});
//# sourceMappingURL=module.js.map