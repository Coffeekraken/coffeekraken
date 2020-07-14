"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __getMethods => {
  let MyClass = /*#__PURE__*/function () {
    function MyClass(name) {
      _classCallCheck(this, MyClass);

      _defineProperty(this, "_settings", {
        hello: 'world'
      });

      this._name = name;
    }

    _createClass(MyClass, [{
      key: "testing",
      value: function testing(value) {
        this._plop = value;
      }
    }, {
      key: "plop",
      value: function plop(user) {}
    }]);

    return MyClass;
  }();

  const myInstance = new MyClass('coffeekraken');
  describe('sugar.js.class.getMethods', () => {
    it('Should return the correct methods list from an instance', () => {
      const res = __getMethods(myInstance);

      expect(res).toEqual(['constructor', 'plop', 'testing']);
    });
  });
};