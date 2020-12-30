"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.plainObject', function () {
        it('Should detect the passed variable type correctly', function () {
            var myClass = /** @class */ (function () {
                function myClass() {
                }
                return myClass;
            }());
            expect(__testFn({ hello: 'world' })).toBe(true);
            expect(__testFn(new myClass())).toBe(false);
        });
    });
};
//# sourceMappingURL=plainObject.js.map