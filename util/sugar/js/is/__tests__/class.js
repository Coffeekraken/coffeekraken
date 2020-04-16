"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.class', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn(class Hello {})).toBe(true);
      expect(__testFn({
        hello: 'world'
      })).toBe(false);
    });
  });
};