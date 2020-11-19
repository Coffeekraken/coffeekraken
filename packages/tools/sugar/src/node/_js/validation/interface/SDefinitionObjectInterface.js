"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validateObject = _interopRequireDefault(require("../object/validateObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                SDefinitionObjectInterface
 * @namespace           sugar.js.validation.object.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the requirements for
 * an item of the definitionObject
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SDefinitionObjectInterface = /*#__PURE__*/function () {
  function SDefinitionObjectInterface() {
    _classCallCheck(this, SDefinitionObjectInterface);
  }

  _createClass(SDefinitionObjectInterface, null, [{
    key: "apply",
    value: function apply(instance) {
      return (0, _validateObject.default)(instance, this.definitionObj);
    }
  }]);

  return SDefinitionObjectInterface;
}();

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