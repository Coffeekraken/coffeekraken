"use strict";
module.exports = function (__constructorName) {
    describe('sugar.js.object.constructorName', function () {
        it('Should get the constructor name correctly', function () {
            var MyCoolClass = /** @class */ (function () {
                function MyCoolClass() {
                }
                return MyCoolClass;
            }());
            var instance = new MyCoolClass();
            expect(__constructorName(instance)).toBe('MyCoolClass');
        });
    });
};
//# sourceMappingURL=constructorName.js.map