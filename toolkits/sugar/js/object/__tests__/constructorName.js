"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = __constructorName => {
  describe('sugar.js.object.constructorName', () => {
    it('Should get the constructor name correctly', () => {
      var MyCoolClass = function MyCoolClass() {
        _classCallCheck(this, MyCoolClass);
      };

      var instance = new MyCoolClass();
      expect(__constructorName(instance)).toBe('MyCoolClass');
    });
  });
};