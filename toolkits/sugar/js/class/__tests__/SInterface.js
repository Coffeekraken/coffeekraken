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

var __stripAnsi = require('strip-ansi');

module.exports = __SInterface => {
  describe('sugar.js.class.SInterface', () => {
    it('Should pass the interface test correctly', () => {
      var MyInterface = /*#__PURE__*/function (_SInterface) {
        _inherits(MyInterface, _SInterface);

        var _super = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true
        }
      });

      var myClassInterfaceResult;

      var MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", true);

        myClassInterfaceResult = MyInterface.apply(this, {
          return: 'Object',
          throw: false
        });
      };

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        name: 'MyClass',
        doSomething: {
          name: 'doSomething',
          expected: {
            type: 'Function',
            required: true
          },
          issues: ['type', 'required'],
          received: {
            type: 'Undefined',
            value: undefined
          }
        },
        issues: ['title', 'doSomething'],
        title: {
          name: 'title',
          expected: {
            type: 'String',
            required: true
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
      var MyInterface = /*#__PURE__*/function (_SInterface2) {
        _inherits(MyInterface, _SInterface2);

        var _super2 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super2.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
        title: {
          type: 'String',
          required: true
        },
        doSomething: {
          type: 'Function',
          required: true
        }
      });

      var myClassInterfaceResult;

      var MyClass = /*#__PURE__*/function () {
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
      var MyInterface = /*#__PURE__*/function (_SInterface3) {
        _inherits(MyInterface, _SInterface3);

        var _super3 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super3.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
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

      var myClassInterfaceResult;

      var MyClass = /*#__PURE__*/function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          _defineProperty(this, "title", 'Hello world');

          myClassInterfaceResult = MyInterface.apply(this, {
            throw: false,
            return: 'Object'
          });
        }

        _createClass(MyClass, [{
          key: "doSomething",
          value: function doSomething() {}
        }]);

        return MyClass;
      }();

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        name: 'MyClass',
        doSomething: {
          name: 'doSomething',
          expected: {
            type: 'Function',
            required: true,
            static: true
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
      var MyInterface = /*#__PURE__*/function (_SInterface4) {
        _inherits(MyInterface, _SInterface4);

        var _super4 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super4.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
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

      var myClassInterfaceResult;

      var MyClass = /*#__PURE__*/function () {
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
      var MyInterface = /*#__PURE__*/function (_SInterface5) {
        _inherits(MyInterface, _SInterface5);

        var _super5 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super5.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
        title: {
          type: 'String',
          values: ['Hello', 'World'],
          required: true
        }
      });

      var myClassInterfaceResult;

      var MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", 'Hello world');

        myClassInterfaceResult = MyInterface.apply(this, {
          return: 'Object',
          throw: false
        });
      };

      new MyClass();
      expect(myClassInterfaceResult).toEqual({
        name: 'MyClass',
        issues: ['title'],
        title: {
          name: 'title',
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
      var MyInterface = /*#__PURE__*/function (_SInterface6) {
        _inherits(MyInterface, _SInterface6);

        var _super6 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super6.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
        title: {
          type: 'String',
          values: ['Hello', 'World'],
          required: true
        }
      });

      var myClassInterfaceResult;

      var MyClass = function MyClass() {
        _classCallCheck(this, MyClass);

        _defineProperty(this, "title", 'Hello');

        myClassInterfaceResult = MyInterface.apply(this);
      };

      new MyClass();
      expect(myClassInterfaceResult).toBe(true);
    });
    it('Should pass the interface test correctly passing a complexe one that need to return a correct error string', () => {
      var MyInterface = /*#__PURE__*/function (_SInterface7) {
        _inherits(MyInterface, _SInterface7);

        var _super7 = _createSuper(MyInterface);

        function MyInterface() {
          _classCallCheck(this, MyInterface);

          return _super7.apply(this, arguments);
        }

        return MyInterface;
      }(__SInterface);

      _defineProperty(MyInterface, "definitionObj", {
        title: {
          type: 'String',
          values: ['Hello', 'World'],
          required: true
        },
        body: {
          type: 'Boolean',
          required: true
        },
        header: {
          type: 'Array<String>',
          required: true
        },
        footer: {
          type: 'Object<Boolean|Number>',
          required: true
        },
        medhod1: {
          type: 'Function',
          required: true
        },
        method2: {
          type: 'Function',
          required: true
        },
        staticMethod: {
          type: 'Function',
          required: true,
          static: true
        },
        staticMethod2: {
          type: 'Function',
          required: true,
          static: true
        }
      });

      var myClassInterfaceResult;

      var MyClass = /*#__PURE__*/function () {
        function MyClass() {
          _classCallCheck(this, MyClass);

          _defineProperty(this, "title", 'Hello World');

          _defineProperty(this, "body", 10);

          _defineProperty(this, "header", [true, 'hello']);

          _defineProperty(this, "footer", {
            coco: 10,
            plop: () => {}
          });

          _defineProperty(this, "method1", 'Youhou');

          _defineProperty(this, "staticMethod2", 'Youhou');

          myClassInterfaceResult = MyInterface.apply(this, {
            throw: false
          });
        }

        _createClass(MyClass, [{
          key: "method2",
          value: function method2() {}
        }], [{
          key: "staticMethod",
          value: function staticMethod() {}
        }]);

        return MyClass;
      }();

      new MyClass();
      expect(__stripAnsi(myClassInterfaceResult.replace(/\s/g, ''))).toBe('Objectvalidation-Name:MyClass-Errors:6-Properties:title,body,header,footer,medhod1,staticMethod2│title││-Receivedvalue:HelloWorld│-Theallowedvaluesare["Hello","World"]│body││-Receivedvalue:10│-ThevaluetypehastobeBooleanbutyoupassedInteger│header││-Receivedvalue:[true,"hello"]│-ThevaluetypehastobeArray<String>butyoupassedArray<Boolean|String>│footer││-Receivedvalue:{"coco":10}│-ThevaluetypehastobeObject<Boolean|Number>butyoupassedObject<Integer|Function>│medhod1││-Receivedvalue:undefined│-ThevaluetypehastobeFunctionbutyoupassedUndefined│-Thisvalueisrequired│staticMethod2││-Receivedvalue:null│-ThevaluetypehastobeFunctionbutyoupassedNull│-Thisvalueisrequired│-Thisvaluehastobeastaticone');
    });
  });
};