"use strict";

module.exports = __getArgsNames => {
  describe('sugar.js.dev.getArgsNames', () => {
    it('Should get the args names correctly', () => {
      function hello(param1, world2, youhou) {
        if (youhou === void 0) {
          youhou = 10;
        }
      }

      var args = __getArgsNames(hello);

      expect(args).toEqual(['param1', 'world2', 'youhou']);
    });
  });
};