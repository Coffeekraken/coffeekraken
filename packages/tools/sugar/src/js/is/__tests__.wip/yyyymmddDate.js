"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.yyyymmdd', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('2020.10.13')).toBe(true);
            expect(__testFn('2020.20.13')).toBe(false);
        });
    });
};
//# sourceMappingURL=yyyymmddDate.js.map