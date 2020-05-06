"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __getMethods => {
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

    plop(user) {}

  }

  const myInstance = new MyClass('coffeekraken');
  describe('sugar.js.class.getMethods', () => {
    it('Should return the correct methods list from an instance', () => {
      const res = __getMethods(myInstance);

      expect(res).toEqual(['constructor', 'plop', 'testing']);
    });
  });
};