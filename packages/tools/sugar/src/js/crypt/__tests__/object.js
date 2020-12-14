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
    module.exports = function (__object) {
        describe('sugar.js.crypt.object', function () {
            it('Should encrypt then decrypt the string "hello world" correctly', function () {
                var crypted = __object.encrypt({ hello: 'world' });
                var decrypted = __object.decrypt(crypted);
                expect(decrypted).toEqual({ hello: 'world' });
            });
        });
    };
});
//# sourceMappingURL=module.js.map