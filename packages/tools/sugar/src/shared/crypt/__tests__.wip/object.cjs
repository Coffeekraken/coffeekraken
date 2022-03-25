module.exports = (__object) => {
  describe("sugar.js.crypt.object", () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      const crypted = __object.encrypt({ hello: "world" });
      const decrypted = __object.decrypt(crypted);
      expect(decrypted).toEqual({ hello: "world" });
    });
  });
};
