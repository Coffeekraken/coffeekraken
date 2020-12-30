"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.integer', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(10)).toBe(true);
        });
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(10.2)).toBe(false);
        });
    });
};
//# sourceMappingURL=integer.js.map