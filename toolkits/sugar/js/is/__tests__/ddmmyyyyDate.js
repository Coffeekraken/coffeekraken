"use strict";

module.exports = __testFn => {
  describe('sugar.js.is.ddmmyyyy', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn('20.12.2018')).toBe(true);
    });
  });
};