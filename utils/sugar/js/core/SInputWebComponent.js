"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sNativeWebComponent = require("./sNativeWebComponent");

var _sNativeWebComponent2 = _interopRequireDefault(_sNativeWebComponent);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var SInputWebComponent = (function(_native) {
  _inherits(SInputWebComponent, _native);

  function SInputWebComponent() {
    _classCallCheck(this, SInputWebComponent);

    return _possibleConstructorReturn(
      this,
      (
        SInputWebComponent.__proto__ ||
        Object.getPrototypeOf(SInputWebComponent)
      ).apply(this, arguments)
    );
  }

  return SInputWebComponent;
})((0, _sNativeWebComponent2.default)(HTMLInputElement));

exports.default = SInputWebComponent;
