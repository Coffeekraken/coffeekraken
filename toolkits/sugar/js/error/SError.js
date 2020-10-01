"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

var _trimLines = _interopRequireDefault(require("../string/trimLines.js"));

var _packageRoot = _interopRequireDefault(require("../path/packageRoot"));

var _toString = _interopRequireDefault(require("../string/toString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @todo    Doc
 */
var SError = /*#__PURE__*/function (_Error) {
  _inherits(SError, _Error);

  var _super = _createSuper(SError);

  function SError(message) {
    var _this;

    _classCallCheck(this, SError);

    if (typeof message !== 'string') {
      if (Array.isArray(message)) {
        message = message.join('\n');
      } else {
        message = (0, _toString.default)(message);
      }
    } // filter message for integrated stack


    message = message.split('\n').filter(line => {
      if (line.trim().slice(0, 10) === 'Thrown at:') return false;
      if (line.trim().slice(0, 3) === 'at ') return false;
      return true;
    }).join('\n');
    _this = _super.call(this, message);
    Error.captureStackTrace(_assertThisInitialized(_this), _this.constructor);
    var stack = [];
    var packageRoot = (0, _packageRoot.default)();
    var stackArray = [];

    if (_this.stack) {
      stackArray = _this.stack.split(' at ').slice(1);
      stackArray.filter(l => {
        if (l.trim() === 'Error') return false;
        if (l.trim() === '') return false;
        return true;
      }).forEach(l => {
        if (l.trim() === '') return;
        stack.push("<cyan>\u2502</cyan> at <cyan>".concat(l.replace(packageRoot, ''), "</cyan>"));
      });
    }

    _this.name = _this.constructor.name;
    _this.message = (0, _trimLines.default)((0, _parseHtml.default)("\n      <red><underline>".concat(_this.name || _this.constructor.name, "</underline></red>\n\n      ").concat(message, "\n\n      ").concat(stack.join(''), "\n    ")));
    var displayed = false;
    Object.defineProperty(_assertThisInitialized(_this), 'stack', {
      get: function get() {
        if (displayed) return '';
        displayed = true;
        return this.message;
      },
      set: function set(value) {
        this._stack = value;
      }
    });
    _this.stack = (0, _trimLines.default)((0, _parseHtml.default)(stack.join('')));
    return _this;
  }

  return SError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.default = SError;
module.exports = exports.default;