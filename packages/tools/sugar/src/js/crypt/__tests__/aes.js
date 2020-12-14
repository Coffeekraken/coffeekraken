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
    module.exports = function (__aes) {
        describe('sugar.js.crypt.aes', function () {
            it('Should encrypt then decrypt the string "hello world" correctly', function () {
                var crypted = __aes.encrypt('hello world', 'plop');
                var decrypted = __aes.decrypt(crypted, 'plop');
                expect(decrypted).toBe('hello world');
            });
        });
    };
});
//# sourceMappingURL=module.js.map