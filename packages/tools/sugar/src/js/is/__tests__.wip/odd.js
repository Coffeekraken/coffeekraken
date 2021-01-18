"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.odd', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(1)).toBe(true);
            expect(__testFn(2)).toBe(false);
        });
    });
};
//# sourceMappingURL=odd.js.map