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
    module.exports = function (__packageRoot) {
        describe('sugar.js.path.packageRoot', function () {
            it('Should return the package root path correctly', function () {
                expect(__packageRoot()).not.toBe('');
            });
        });
    };
});
//# sourceMappingURL=module.js.map