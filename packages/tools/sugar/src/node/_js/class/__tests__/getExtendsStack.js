"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = __getExtendsStack => {
  var MyClass = function MyClass() {
    _classCallCheck(this, MyClass);
  };

  var MyOtherClass = /*#__PURE__*/function (_MyClass) {
    _inherits(MyOtherClass, _MyClass);

    var _super = _createSuper(MyOtherClass);

    function MyOtherClass() {
      _classCallCheck(this, MyOtherClass);

      return _super.apply(this, arguments);
    }

    return MyOtherClass;
  }(MyClass);

  var FinalClass = /*#__PURE__*/function (_MyOtherClass) {
    _inherits(FinalClass, _MyOtherClass);

    var _super2 = _createSuper(FinalClass);

    function FinalClass() {
      _classCallCheck(this, FinalClass);

      return _super2.apply(this, arguments);
    }

    return FinalClass;
  }(MyOtherClass);

  describe('sugar.js.class.getExtendsStack', () => {
    it('Should return the correct extends stack', () => {
      expect(__getExtendsStack(FinalClass)).toEqual(['MyOtherClass', 'MyClass']);
    });
    it('Should return the correct extends stack from an instance', () => {
      expect(__getExtendsStack(new FinalClass())).toEqual(['MyOtherClass', 'MyClass']);
    });
  });
};