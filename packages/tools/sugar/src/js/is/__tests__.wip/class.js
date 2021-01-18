"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.class', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn(/** @class */ (function () {
                function Hello() {
                }
                return Hello;
            }()))).toBe(true);
            expect(__testFn({ hello: 'world' })).toBe(false);
        });
    });
};
//# sourceMappingURL=class.js.map