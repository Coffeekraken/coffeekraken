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
    module.exports = function (__isGlob) {
        describe('sugar.js.is.glob', function () {
            it('Should detect the passed to be a valid glob', function () {
                expect(__isGlob('somthere/**/*.js')).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map