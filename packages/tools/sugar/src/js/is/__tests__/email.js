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
        describe('sugar.js.is.email', function () {
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn('olivier.bossel@gmail.com')).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map