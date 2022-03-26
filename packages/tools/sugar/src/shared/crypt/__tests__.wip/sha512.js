module.exports = (__sha512) => {
  describe("sugar.js.crypt.sha512", () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      const crypted = __sha512.encrypt("hello world");
      const decrypted = __sha512.decrypt(crypted);
      expect(decrypted).toBe("hello world");
    });
  });
};
