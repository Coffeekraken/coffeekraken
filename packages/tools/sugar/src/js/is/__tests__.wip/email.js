"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.email', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('olivier.bossel@gmail.com')).toBe(true);
        });
    });
};
//# sourceMappingURL=email.js.map