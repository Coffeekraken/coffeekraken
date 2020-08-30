"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SValueValidationInterface = _interopRequireDefault(require("./interface/SValueValidationInterface"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @name          SValueValidation
 * @namespace     js.validation.value.validation
 * @type          Class
 *
 * This class represent the base validation class
 * that can be extended to create some validations like the "required" one, etc...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SValueValidation = function SValueValidation() {
  _classCallCheck(this, SValueValidation);
};

var _default = _SValueValidationInterface.default.implements(SValueValidation, _SValueValidationInterface.default, {
  applyOnStatic: true
});

exports.default = _default;
module.exports = exports.default;