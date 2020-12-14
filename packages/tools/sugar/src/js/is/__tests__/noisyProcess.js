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
        describe('sugar.js.is.noisyProcess', function () {
            it('Should detect if the process is a noisy one correctly', function () {
                expect(__testFn()).toBe(false);
            });
        });
    };
});
//# sourceMappingURL=module.js.map