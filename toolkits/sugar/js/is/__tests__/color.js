"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.color', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('#ff0000')).toBe(true);
    });
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('something')).toBe(false);
    });
  });
};