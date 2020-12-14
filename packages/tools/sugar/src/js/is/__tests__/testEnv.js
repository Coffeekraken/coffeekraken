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
    module.exports = function (__isTestEnv) {
        describe('sugar.js.is.testEnv', function () {
            it('Should detect that we are in a test environment', function () {
                expect(__isTestEnv()).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map