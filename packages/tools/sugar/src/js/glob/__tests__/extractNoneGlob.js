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
    module.exports = function (__extractNoneGlob) {
        describe('sugar.js.glob.extractNoneGlob', function () {
            it('Should extract none glob part correctly', function () {
                expect(__extractNoneGlob('/hello/world/**/*.js')).toBe('/hello/world');
            });
        });
    };
});
//# sourceMappingURL=module.js.map