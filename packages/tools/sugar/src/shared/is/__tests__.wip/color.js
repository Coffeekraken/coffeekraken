"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.color', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('#ff0000')).toBe(true);
        });
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('something')).toBe(false);
        });
    });
};
//# sourceMappingURL=color.js.map