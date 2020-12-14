(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=module.js.map