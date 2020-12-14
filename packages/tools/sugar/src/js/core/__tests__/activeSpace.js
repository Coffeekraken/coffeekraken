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
    module.exports = function (__activeSpace) {
        describe('sugar.js.core.activeSpace', function () {
            it('Should set the active space correctly', function () {
                __activeSpace.set('something.cool');
                expect(__activeSpace.get()).toBe('something.cool');
            });
            it('Should set the active space then check some passed active spaces correctly', function () {
                __activeSpace.set('something.cool.hello.world');
                expect(__activeSpace.is('something')).toBe(false);
                expect(__activeSpace.is('something.*')).toBe(true);
                expect(__activeSpace.is('*.cool.**')).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map