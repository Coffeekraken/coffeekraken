"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SInterface2 = _interopRequireDefault(require("../../../class/SInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                SDefinitionObjectInterface
 * @namespace           js.validation.object.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the requirements for
 * an item of the definitionObject
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SDefinitionObjectInterface = /*#__PURE__*/function (_SInterface) {
  _inherits(SDefinitionObjectInterface, _SInterface);

  var _super = _createSuper(SDefinitionObjectInterface);

  function SDefinitionObjectInterface() {
    _classCallCheck(this, SDefinitionObjectInterface);

    return _super.apply(this, arguments);
  }

  return SDefinitionObjectInterface;
}(_SInterface2.default);

exports.default = SDefinitionObjectInterface;

_defineProperty(SDefinitionObjectInterface, "definitionObj", {
  type: {
    type: 'String',
    required: true
  },
  required: {
    type: 'Boolean'
  },
  description: {
    type: 'String'
  },
  default: {
    type: null
  },
  static: {
    type: 'Boolean'
  },
  values: {
    type: 'Array'
  },
  regexp: {
    type: 'RegExp'
  },
  validator: {
    type: 'Function'
  },
  alias: {
    type: 'String'
  },
  level: {
    type: 'Integer'
  }
});

module.exports = exports.default;