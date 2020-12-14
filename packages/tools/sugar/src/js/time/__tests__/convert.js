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
    module.exports = function (__convert) {
        describe('sugar.js.time.convert', function () {
            it('Should convert the string "1s" to 1000ms', function () {
                expect(__convert('1s', 'ms')).toBe(1000);
            });
            it('Should convert the string "ms" to 60000ms', function () {
                expect(__convert('1m', 'ms')).toBe(60000);
            });
            it('Should convert the string "2h" to "120m"', function () {
                expect(__convert('2h', 'm')).toBe(120);
            });
            it('Should convert the string "1week" to "7d"', function () {
                expect(__convert('1week', 'd')).toBe(7);
            });
            it('Should convert the string "10weeks" to "70d"', function () {
                expect(__convert('10weeks', 'd')).toBe(70);
            });
        });
    };
});
//# sourceMappingURL=module.js.map