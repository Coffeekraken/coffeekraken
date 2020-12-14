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
        describe('sugar.js.is.ddmmyyyy', function () {
            it('Should detect the passed variable type correctly', function () {
                expect(__testFn('20.12.2018')).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map