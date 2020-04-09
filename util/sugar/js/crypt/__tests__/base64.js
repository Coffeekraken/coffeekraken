"use strict";

module.exports = __base64 => {
  describe('sugar.js.crypt.base64', () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      const crypted = __base64.encrypt('hello world');

      const decrypted = __base64.decrypt(crypted);

      expect(decrypted).toBe('hello world');
    });
  });
};