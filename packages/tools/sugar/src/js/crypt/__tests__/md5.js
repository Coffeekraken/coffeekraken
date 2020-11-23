module.exports = (__md5) => {
    describe('sugar.js.crypt.md5', () => {
        it('Should encrypt then decrypt the string "hello world" correctly', () => {
            const crypted = __md5.encrypt('hello world');
            const decrypted = __md5.decrypt(crypted);
            expect(decrypted).toBe('hello world');
        });
    });
};
