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
    module.exports = function (__gravatarUrl) {
        describe('sugar.js.url.gravatarUrl', function () {
            it('Should correctly generate the gravatar url', function () {
                expect(__gravatarUrl('olivier.bossel@gmail.com', 200)).toBe('https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f?s=200');
            });
        });
    };
});
//# sourceMappingURL=module.js.map