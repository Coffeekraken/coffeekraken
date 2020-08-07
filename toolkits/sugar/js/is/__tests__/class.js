"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = __testFn => {
  describe('sugar.js.is.class', () => {
    it('Should detect the passed variable type correctly', () => {
      expect(__testFn(function Hello() {
        _classCallCheck(this, Hello);
      })).toBe(true);
      expect(__testFn({
        hello: 'world'
      })).toBe(false);
    });
  });
};