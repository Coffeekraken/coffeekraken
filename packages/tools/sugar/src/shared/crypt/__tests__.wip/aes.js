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
//# sourceMappingURL=aes.js.map