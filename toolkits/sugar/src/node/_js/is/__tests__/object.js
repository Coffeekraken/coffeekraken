"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = __testFn => {
  describe('sugar.js.is.object', () => {
    it('Should detect the passed variable type correctly', () => {
      var myClass = function myClass() {
        _classCallCheck(this, myClass);
      };

      expect(__testFn({
        hello: 'world'
      })).toBe(true);
      expect(__testFn(12)).toBe(false);
      expect(__testFn(function () {})).toBe(false);
      expect(__testFn(new myClass())).toBe(false);
    });
  });
};