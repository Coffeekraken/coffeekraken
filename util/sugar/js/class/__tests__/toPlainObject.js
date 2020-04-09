"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __toPlainObject => {
  class MyClass {
    constructor(name) {
      _defineProperty(this, "_settings", {
        hello: 'world'
      });

      this._name = name;
    }

    testing(value) {
      this._plop = value;
    }

  }

  const myInstance = new MyClass('coffeekraken');
  myInstance.testing('hello');
  describe('sugar.js.class.toPlainObject', () => {
    it('Should convert a simple custom class instance into a plain object', () => {
      const plainObject = __toPlainObject(myInstance);

      expect(plainObject).toEqual({
        _settings: {
          hello: 'world'
        },
        _name: 'coffeekraken',
        _plop: 'hello'
      });
    });
  });
};