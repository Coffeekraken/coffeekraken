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
    module.exports = function (__getArgsNames) {
        describe('sugar.js.dev.getArgsNames', function () {
            it('Should get the args names correctly', function () {
                function hello(param1, world2, youhou) {
                    if (youhou === void 0) { youhou = 10; }
                }
                var args = __getArgsNames(hello);
                expect(args).toEqual(['param1', 'world2', 'youhou']);
            });
        });
    };
});
//# sourceMappingURL=module.js.map