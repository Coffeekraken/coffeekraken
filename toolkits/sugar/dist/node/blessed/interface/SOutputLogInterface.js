"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __SInterface = require('../../class/SInterface');
/**
 * @name                SOutputLogInterface
 * @namespace           node.blessed.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed for an element passed to the SOutput ```log``` method.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SInterface) {
  _inherits(SOutputLogInterface, _SInterface);

  var _super = _createSuper(SOutputLogInterface);

  function SOutputLogInterface() {
    _classCallCheck(this, SOutputLogInterface);

    return _super.apply(this, arguments);
  }

  return SOutputLogInterface;
}(__SInterface), _defineProperty(_class, "definitionObj", {
  value: {
    // type: 'Function',
    required: true,
    description: 'The value to log',
    alias: 'v'
  },
  clear: {
    type: 'Boolean|Integer',
    description: 'If set to <yellow>true</yellow>, clear the entire output stream, otherwise you can specify a number of line(s) to clear',
    alias: 'c'
  },
  temp: {
    type: 'Boolean',
    description: 'Set the log as temporary. This mean that it will dissapear on the next log action',
    alias: 't'
  },
  group: {
    type: 'String',
    description: 'Specify a group in which to display the log',
    alias: 'g'
  },
  mt: {
    type: 'Integer',
    description: 'Specify the margin top to apply',
    default: 0
  },
  mb: {
    type: 'Integer',
    description: 'Specify the margin bottom to apply',
    default: 1
  }
}), _temp);