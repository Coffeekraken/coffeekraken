"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toString = _interopRequireDefault(require("../string/toString"));

var _node = _interopRequireDefault(require("../is/node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @name          SValidation
 * @namespace     sugar.js.validation.value.validation
 * @type          Class
 *
 * This class represent the base validation class
 * that can be extended to create some validations like the "required" one, etc...
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SValidation = /*#__PURE__*/function () {
  function SValidation() {
    _classCallCheck(this, SValidation);
  }

  _createClass(SValidation, null, [{
    key: "apply",

    /**
     * @name          apply
     * @type          Function
     * @static
     *
     * This static method is the main one when you want to apply a certain
     * validation on your value. Simply call this method and pass your value to validate.
     * By default, if the value does not pass the test, this method will
     * throw an error by using the "message" static property of the
     * validation class. If you don't want that but getting the string message back
     * insteaf, simply pass in the settings object the property "throw" to false
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function apply() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var checkResult = this.exec(...args);
      if (checkResult === true) return true;
      var message = this.message;
      var finalArgs = Array.isArray(checkResult) ? checkResult : args;
      finalArgs.forEach((arg, i) => {
        var value = (0, _toString.default)(arg);

        if (Array.isArray(arg)) {
          value = arg.join(',');
        }

        message = message.replace("%".concat(i), value);

        if ((0, _node.default)()) {
          var packageRoot = require('@coffeekraken/sugar/node/path/packageRoot');

          message = message.replace("".concat(packageRoot(__dirname), "/"), '');
          message = message.replace("".concat(packageRoot(), "/"), '');
        }
      });
      return message;
    }
    /**
     * @name          exec
     * @type          Function
     * @static
     *
     * This static method is the one you have to overrive. It will be called by the ```apply``` one
     * with the same arguments and you have to return ```true``` or ```false``` depending on your
     * check result.
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }]);

  return SValidation;
}();

var _default = SValidation;
exports.default = _default;
module.exports = exports.default;