"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __SStaticValidation => {
  describe('sugar.js.validation.object.validation.SStaticValidation', () => {
    it('Should validate the passed value correctly', () => {
      var MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "plop", 'yop');
      };

      _defineProperty(MyClass, "coco", 'hello');

      expect(__SStaticValidation.apply('hello', MyClass, 'coco')).toBe(true);
      expect(__SStaticValidation.apply('yop', MyClass, 'plop')).toBe("The passed \"<yellow>plop</yellow>\" property has to be a <green>static</green> one");
    });
  });
};