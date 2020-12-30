"use strict";
module.exports = function (__base64) {
    describe('sugar.js.crypt.base64', function () {
        it('Should encrypt then decrypt the string "hello world" correctly', function () {
            var crypted = __base64.encrypt('hello world');
            var decrypted = __base64.decrypt(crypted);
            expect(decrypted).toBe('hello world');
        });
    });
};
//# sourceMappingURL=base64.js.map