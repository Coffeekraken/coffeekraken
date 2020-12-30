"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.regexp', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(/[0-1]/gi)).toBe(true);
        });
    });
};
//# sourceMappingURL=regexp.js.map