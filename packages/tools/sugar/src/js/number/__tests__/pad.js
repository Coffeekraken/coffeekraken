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
    module.exports = function (__pad) {
        describe('sugar.js.number.pad', function () {
            it('Should pad the passed numbers correctly', function () {
                expect(__pad(13, 5)).toBe('00013');
                expect(__pad(13, 5, '#')).toBe('###13');
            });
        });
    };
});
//# sourceMappingURL=module.js.map