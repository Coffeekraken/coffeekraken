"use strict";
module.exports = function (__md5) {
    describe('sugar.js.crypt.md5', function () {
        it('Should encrypt then decrypt the string "hello world" correctly', function () {
            var crypted = __md5.encrypt('hello world');
            var decrypted = __md5.decrypt(crypted);
            expect(decrypted).toBe('hello world');
        });
    });
};
//# sourceMappingURL=md5.js.map