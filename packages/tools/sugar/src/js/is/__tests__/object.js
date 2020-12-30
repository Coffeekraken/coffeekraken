"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.object', function () {
        it('Should detect the passed variable type correctly', function () {
            var myClass = /** @class */ (function () {
                function myClass() {
                }
                return myClass;
            }());
            expect(__testFn({ hello: 'world' })).toBe(true);
            expect(__testFn(12)).toBe(false);
            expect(__testFn(function () { })).toBe(false);
            expect(__testFn(new myClass())).toBe(false);
        });
    });
};
//# sourceMappingURL=object.js.map