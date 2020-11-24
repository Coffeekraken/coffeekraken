"use strict";
module.exports = (__sha256) => {
    describe('sugar.js.crypt.sha256', () => {
        it('Should encrypt then decrypt the string "hello world" correctly', () => {
            const crypted = __sha256.encrypt('hello world');
            const decrypted = __sha256.decrypt(crypted);
            expect(decrypted).toBe('hello world');
        });
    });
};
