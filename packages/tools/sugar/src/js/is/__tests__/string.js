"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.string', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(false)).toBe(false);
            expect(__testFn('hello world')).toBe(true);
        });
    });
};
//# sourceMappingURL=string.js.map