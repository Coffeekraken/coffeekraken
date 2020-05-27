"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @name                multipleExtends
 * @namespace           sugar.js.class
 * @type                Function
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           baseClass           The class you want to extend
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = (baseClass, ...mixins) => {
  let base = /*#__PURE__*/function (_baseClass) {
    _inherits(base, _baseClass);

    var _super = _createSuper(base);

    function base(...args) {
      var _this;

      _classCallCheck(this, base);

      _this = _super.call(this, ...args);
      mixins.forEach(mixin => {
        copyProps(_assertThisInitialized(_this), new mixin());
      });
      return _this;
    }

    return base;
  }(baseClass);

  let copyProps = (target, source) => {
    // this function copies all properties and symbols, filtering out some special ones
    Object.getOwnPropertyNames(source).concat(Object.getOwnPropertySymbols(source)).forEach(prop => {
      if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)) Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
    });
  };

  mixins.forEach(mixin => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
    copyProps(base.prototype, mixin.prototype);
    copyProps(base, mixin);
  });
  return base;
};

exports.default = _default;
module.exports = exports.default;