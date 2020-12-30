"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.boolean', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(false)).toBe(true);
        });
    });
};
//# sourceMappingURL=boolean.js.map