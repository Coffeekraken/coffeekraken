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
    module.exports = function (__parse) {
        describe('sugar.js.string.parse', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__parse('199')).toBe(199);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map