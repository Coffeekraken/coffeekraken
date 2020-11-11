"use strict";

module.exports = __aes => {
  describe('sugar.js.crypt.aes', () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      var crypted = __aes.encrypt('hello world', 'plop');

      var decrypted = __aes.decrypt(crypted, 'plop');

      expect(decrypted).toBe('hello world');
    });
  });
};