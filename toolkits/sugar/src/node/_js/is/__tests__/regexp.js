"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.regexp', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn(/[0-1]/gi)).toBe(true);
    });
  });
};