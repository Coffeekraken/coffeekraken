"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.function', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(function () { })).toBe(true);
        });
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(function () { })).toBe(true);
        });
    });
};
//# sourceMappingURL=function.js.map