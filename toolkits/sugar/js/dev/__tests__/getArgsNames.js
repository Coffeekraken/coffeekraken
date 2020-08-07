"use strict";

module.exports = __getArgsNames => {
  describe('sugar.js.dev.getArgsNames', () => {
    it('Should get the args names correctly', () => {
      function hello(param1, world2, youhou = 10) {}

      expect(__getArgsNames(hello)).toEqual(['param1', 'world2', 'youhou']);
    });
  });
};