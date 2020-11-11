"use strict";

module.exports = __md5 => {
  describe('sugar.js.crypt.md5', () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      var crypted = __md5.encrypt('hello world');

      var decrypted = __md5.decrypt(crypted);

      expect(decrypted).toBe('hello world');
    });
  });
};