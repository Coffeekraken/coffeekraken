"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.array', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn(['hello'])).toBe(true);
    });
  });
};