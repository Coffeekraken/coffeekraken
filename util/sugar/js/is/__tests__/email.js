"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.email', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('olivier.bossel@gmail.com')).toBe(true);
    });
  });
};