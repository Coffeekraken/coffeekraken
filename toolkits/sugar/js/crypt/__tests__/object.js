"use strict";

module.exports = __object => {
  describe('sugar.js.crypt.object', () => {
    it('Should encrypt then decrypt the string "hello world" correctly', () => {
      var crypted = __object.encrypt({
        hello: 'world'
      });

      var decrypted = __object.decrypt(crypted);

      expect(decrypted).toEqual({
        hello: 'world'
      });
    });
  });
};