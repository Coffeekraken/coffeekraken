"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = __testFn => {
  describe('sugar.js.is.plainObject', () => {
    it('Should detect the passed variable type correctly', () => {
      let myClass = function myClass() {
        _classCallCheck(this, myClass);
      };

      expect(__testFn({
        hello: 'world'
      })).toBe(true);
      expect(__testFn(new myClass())).toBe(false);
    });
  });
};