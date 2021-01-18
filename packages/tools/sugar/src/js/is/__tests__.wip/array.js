"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.array', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(['hello'])).toBe(true);
        });
    });
};
//# sourceMappingURL=array.js.map