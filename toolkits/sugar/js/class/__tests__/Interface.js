"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = __Interface => {
  describe('sugar.js.class.Interface', () => {
    it('Should pass the interface test correctly', () => {
      let MyInterface = /*#__PURE__*/function (_Interface) {
        _inherits(MyInterface, _Interface);

        var _super = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", true);

        myClassInterfaceResult = MyInterface.apply(this);
      };

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        doSomething: {
          expected: {
            type: 'Function'
          },
          issues: ['type', 'required'],
          received: {
            type: 'Undefined',
            value: undefined
          }
        },
        issues: ['title', 'doSomething'],
        title: {
          expected: {
            type: 'String'
          },
          issues: ['type'],
          received: {
            type: 'Boolean',
            value: true
          }
        }
      });
    });
    it('Should pass the interface test correctly', () => {
      let MyInterface = /*#__PURE__*/function (_Interface2) {
        _inherits(MyInterface, _Interface2);

        var _super2 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super2.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = /*#__PURE__*/function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          _defineProperty(this, "title", 'Hello world');

          myClassInterfaceResult = MyInterface.apply(this);
        }

        _createClass(MyClass, [{
          key: "doSomething",
          value: function doSomething() {}
        }]);

        return MyClass;
      }();

      new MyClass();
      expect(myClassInterfaceResult).toBe(true);
    });
    it('Should pass the interface test correctly when checking for an undefined static function', () => {
      let MyInterface = /*#__PURE__*/function (_Interface3) {
        _inherits(MyInterface, _Interface3);

        var _super3 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super3.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true,
          static: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = /*#__PURE__*/function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          _defineProperty(this, "title", 'Hello world');

          myClassInterfaceResult = MyInterface.apply(this);
        }

        _createClass(MyClass, [{
          key: "doSomething",
          value: function doSomething() {}
        }]);

        return MyClass;
      }();

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        doSomething: {
          expected: {
            type: 'Function'
          },
          issues: ['type', 'required', 'static'],
          received: {
            type: 'Null',
            value: null
          }
        },
        issues: ['doSomething']
      });
    });
    it('Should pass the interface test correctly when checking for an existing static function', () => {
      let MyInterface = /*#__PURE__*/function (_Interface4) {
        _inherits(MyInterface, _Interface4);

        var _super4 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super4.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true,
          static: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = /*#__PURE__*/function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          _defineProperty(this, "title", 'Hello world');

          myClassInterfaceResult = MyInterface.apply(this);
        }

        _createClass(MyClass, null, [{
          key: "doSomething",
          value: function doSomething() {}
        }]);

        return MyClass;
      }();

      new MyClass();
      expect(myClassInterfaceResult).toBe(true);
    });
    it('Should pass the interface test correctly passing a value that is not in the allowed once', () => {
      let MyInterface = /*#__PURE__*/function (_Interface5) {
        _inherits(MyInterface, _Interface5);

        var _super5 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super5.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          values: ['Hello', 'World'],
          required: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", 'Hello world');

        myClassInterfaceResult = MyInterface.apply(this);
      };

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        issues: ['title'],
        title: {
          expected: {
            required: true,
            type: 'String',
            values: ['Hello', 'World']
          },
          issues: ['values'],
          received: {
            type: 'String',
            value: 'Hello world'
          }
        }
      });
    });
    it('Should pass the interface test correctly passing a value that is in the allowed once', () => {
      let MyInterface = /*#__PURE__*/function (_Interface6) {
        _inherits(MyInterface, _Interface6);

        var _super6 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super6.apply(this, arguments);
        }

        return MyInterface;
      }(__Interface);

      _defineProperty(MyInterface, "interface", {
        title: {
          type: 'String',
          values: ['Hello', 'World'],
          required: true
        }
      });

      let myClassInterfaceResult;

      let MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", 'Hello');

        myClassInterfaceResult = MyInterface.apply(this);
      };

      new MyClass();
      expect(myClassInterfaceResult).toBe(true);
    });
  });
};