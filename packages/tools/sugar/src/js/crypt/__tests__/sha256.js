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
    module.exports = function (__sha256) {
        describe('sugar.js.crypt.sha256', function () {
            it('Should encrypt then decrypt the string "hello world" correctly', function () {
                var crypted = __sha256.encrypt('hello world');
                var decrypted = __sha256.decrypt(crypted);
                expect(decrypted).toBe('hello world');
            });
        });
    };
});
//# sourceMappingURL=module.js.map