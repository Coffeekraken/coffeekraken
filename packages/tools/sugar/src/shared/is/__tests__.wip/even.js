"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.even', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(2)).toBe(true);
        });
    });
};
//# sourceMappingURL=even.js.map