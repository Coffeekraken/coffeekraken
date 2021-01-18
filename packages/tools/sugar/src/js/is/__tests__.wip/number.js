"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.number', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(12)).toBe(true);
        });
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn({ hello: 'world' })).toBe(false);
        });
    });
};
//# sourceMappingURL=number.js.map