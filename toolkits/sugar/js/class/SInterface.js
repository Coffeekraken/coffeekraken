"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getExtendsStack = _interopRequireDefault(require("../class/getExtendsStack"));

var _argsToObject = _interopRequireDefault(require("../cli/argsToObject"));

var _SError = _interopRequireDefault(require("../error/SError"));

var _class = _interopRequireDefault(require("../is/class"));

var _deepize = _interopRequireDefault(require("../object/deepize"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _trimLines = _interopRequireDefault(require("../string/trimLines"));

var _validateObject = _interopRequireDefault(require("../validation/object/validateObject"));

var _validateObjectOutputString = _interopRequireDefault(require("../validation/object/validateObjectOutputString"));

var _typeof = _interopRequireDefault(require("../value/typeof"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name              SInterface
 * @namespace           js.class
 * @type              Function
 *
 * This class allows you to define an interface that you can later apply to an object instance
 * to make sure this particular instance has all the features, methods and properties you want.
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/class/SInterface';
 * class MyCoolInterface extends SInterface {
 *    static definitionObj = {
 *      title: {
 *        type: 'String',
 *        required: true
 *      },
 *      doSomething: {
 *        type: 'Function',
 *        required: true
 *      }
 *    }
 * }
 *
 * class MyClass {
 *    constructor() {
 *      MyCoolInterface.apply(this);
 *    }
 * }
 *
 * const myObject = new MyClass();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
var SInterface = /*#__PURE__*/function () {
  function SInterface() {
    _classCallCheck(this, SInterface);
  }

  _createClass(SInterface, null, [{
    key: "apply",

    /**
     * @name              settings
     * @type              Object
     * @static
     *
     * Store the default settings that will be passed to the ```apply``` function
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name              apply
     * @type              Function
     * @static
     *
     * This static method allows you to apply the interface on an object instance.
     * By default, if something is wrong in your class implementation, an error with the
     * description of what's wrong will be thrown. You can change that behavior if you prefer having
     * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
     *
     * @param       {Object}                instance              The instance to apply the interface on
     * @param       {Object}               [settings={}]         An object of settings to configure your apply process
     * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
     * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function apply(instance, settings) {
      if (settings === void 0) {
        settings = {};
      }

      settings = (0, _deepMerge.default)(this.settings, settings);

      if ((0, _typeof.default)(instance, {
        customClass: false
      }) !== 'Object') {
        throw new _SError.default("Sorry but the \"<yellow>instance</yellow>\" argument of the \"<cyan>SInterface.apply</cyan>\" static method have to be an <green>Object</green> and you've passed an <red>".concat((0, _typeof.default)(instance), "</red>..."));
      }

      var issues = [];
      var issueObj = {
        issues: []
      };
      var implementationValidationResult;
      var extendsStack = (0, _getExtendsStack.default)(instance); // check if the passed instance base class already implements this insterface

      if (instance.constructor.__interfaces && Array.isArray(instance.constructor.__interfaces)) {
        if (instance.constructor.__interfaces.indexOf(this) !== -1) return true;
      } else if (instance.__interfaces && Array.isArray(instance.__interfaces)) {
        if (instance.__interfaces.indexOf(this) !== -1) return true;
      } // extends array


      if (this.extendsArray && Array.isArray(this.extendsArray)) {
        this.extendsArray.forEach(cls => {
          if (extendsStack.indexOf(cls) === -1) {
            setTimeout(() => {
              throw new _SError.default("Your class|instance \"<yellow>".concat(instance.name || instance.constructor.name, "</yellow>\" that implements the \"<cyan>").concat(this.name, "</cyan>\" interface has to extend the \"<green>").concat(cls, "</green>\" class..."));
            });
          }
        });
      } // implements array


      if (this.implementsArray && Array.isArray(this.implementsArray)) {
        this.implements(instance, this.implementsArray, settings);
      } // definition object


      if (this.definitionObj) {
        var name = instance.name || instance.constructor.name;

        if (name === 'ImplementsMiddleClass') {
          name = extendsStack[0];
        }

        implementationValidationResult = (0, _validateObject.default)(instance, this.definitionObj, {
          throw: false,
          name,
          interface: settings.interface
        });

        if (implementationValidationResult !== true) {
          issueObj = (0, _deepMerge.default)(issueObj, implementationValidationResult, {
            array: true
          });
        }
      }

      if (!issueObj.issues.length) {
        // save on the instance and the constructor that we implements this interface correctly
        if (!instance.__interfaces) {
          Object.defineProperty(instance, '__interfaces', {
            enumerable: false,
            writable: true,
            value: [this]
          });
        } else if (Array.isArray(instance.__interfaces)) {
          instance.__interfaces.push(this);
        }

        if (!instance.constructor.__interfaces) {
          Object.defineProperty(instance.constructor, '__interfaces', {
            enumerable: false,
            writable: true,
            value: [this]
          });
        } else if (Array.isArray(instance.constructor.__interfaces)) {
          instance.constructor.__interfaces.push(this);
        }

        return true;
      }

      if (settings.throw) {
        throw new _SError.default(this.outputString(issueObj, settings));
      }

      switch (settings.return.toLowerCase()) {
        case 'object':
          return issueObj;

        case 'string':
        default:
          return SInterface.outputString(issueObj, settings);
      }
    }
    /**
     * @name          applyAndThrow
     * @type          Function
     * @static
     *
     * This static method do the exact same as the ```apply``` one but will throw an error if something is wrong...
     *
     * @param       {Object}                instance              The instance to apply the interface on
     * @return      {Boolean}                                     Return true is all is ok. Throw an error otherwise
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "applyAndThrow",
    value: function applyAndThrow(instance, settings) {
      if (settings === void 0) {
        settings = {};
      }

      var apply = SInterface.apply.bind(this);
      return apply(instance, _objectSpread(_objectSpread({}, settings), {}, {
        throw: true
      }));
    }
    /**
     * @name          applyAndComplete
     * @type          Function
     * @static
     *
     * This static method allows you to complete the passed data object and apply the interface
     * directly. If something goes wrong, it will throw an error, otherwise, return the
     * completed object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "applyAndComplete",
    value: function applyAndComplete(object, settings) {
      if (settings === void 0) {
        settings = {};
      }

      var completedObject = this.complete(object, settings);
      this.applyAndThrow(completedObject, settings);
      return completedObject;
    }
    /**
     * @name          implements
     * @type          Function
     * @static
     *
     * This static method allows you to tell that a particular instance of a class implements
     * one or more interfaces. This allows you after to specify the property "implements" with an array
     * of SInterface classes that you want your property to implements
     *
     * @param         {SInterface}          ...interfaces           The interfaces you want to implements
     *
     * @since         2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "implements",
    value: function _implements(instance, interfaces, settings) {
      if (interfaces === void 0) {
        interfaces = null;
      }

      if (settings === void 0) {
        settings = {};
      }

      if (interfaces === null) interfaces = [this];
      if (!Array.isArray(interfaces)) interfaces = [interfaces];

      if ((0, _class.default)(instance)) {
        // return instance;
        var SInterfaceImplementsMiddleClass = /*#__PURE__*/function (_instance) {
          _inherits(SInterfaceImplementsMiddleClass, _instance);

          var _super = _createSuper(SInterfaceImplementsMiddleClass);

          // __parentProto = instance;
          function SInterfaceImplementsMiddleClass() {
            var _this;

            _classCallCheck(this, SInterfaceImplementsMiddleClass);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this = _super.call(this, ...args);
            SInterface.implements(_assertThisInitialized(_this), interfaces, settings);
            return _this;
          }

          return SInterfaceImplementsMiddleClass;
        }(instance);

        return SInterfaceImplementsMiddleClass;
      } // make sure the instance has all the interfaces requirements


      interfaces.forEach(Interface => {
        Interface.apply(instance, _objectSpread(_objectSpread({}, settings), {}, {
          interface: Interface.name
        }));
      });
    }
    /**
     * @name          complete
     * @type          Function
     * @static
     *
     * This static method allows you to pass an object to complete with the "default" values
     * of the definition object if needed
     *
     * @param         {Object}            data              The data object to complete
     * @return        {Object}                              The completed data object
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "complete",
    value: function complete(data, settings) {
      if (settings === void 0) {
        settings = {};
      }

      var argsObj = Object.assign({}, data); // loop on all the arguments

      Object.keys(this.definitionObj).forEach(argString => {
        var argDefinitionObj = this.definitionObj[argString]; // check if we have an argument passed in the properties

        if (argsObj[argString] === undefined && argDefinitionObj.default !== undefined) {
          argsObj[argString] = argDefinitionObj.default;
        }
      }); // return the argsObj

      return (0, _deepize.default)(argsObj);
    }
    /**
     * @name          outputString
     * @type          Function
     * @static
     *
     * This static method allows you to get the ```apply``` result
     * in a readable way.
     *
     * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
     * @return        {String}                                    The string version of the result
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "outputString",
    value: function outputString(resultObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      var headerString = this._outputHeaderString(settings);

      var string = (0, _validateObjectOutputString.default)(resultObj);
      return (0, _trimLines.default)("".concat(headerString).concat(string));
    }
    /**
     * @name          output
     * @type          Function
     * @static
     *
     * This static method allows you to console.log the ```apply``` result
     * in a readable way.
     *
     * @param         {Object}               resultObj               The resulting object coming from the ```apply``` method
     * @return        {String}                                    The string version of the result
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "output",
    value: function output(resultObj, settings) {
      if (settings === void 0) {
        settings = {};
      }

      var string = this.outputString(resultObj, settings);
      console.log(string);
    }
    /**
     * @name                _outputHeaderString
     * @type                Function
     * @private
     *
     * This method simply generate the output header depending on the passed settings like:
     * - title: The title you want to display
     * - description: A description to explain a little bit more the issue
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_outputHeaderString",
    value: function _outputHeaderString(settings) {
      if (settings === void 0) {
        settings = {};
      }

      var array = [];

      if (settings.title) {
        array.push("<red><underline>".concat(settings.title, "</underline></red>"));
        array.push(' ');
      }

      if (settings.description) {
        array.push("".concat(settings.description));
        array.push(' ');
      }

      return array.join('\n');
    }
    /**
     * @name                parse
     * @type                Function
     * @static
     *
     * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
     * depending on the definition object of this interface
     *
     * @param       {String}            string            The string to parse
     * @return      {Object}                              The object of arguments values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "parse",
    value: function parse(string) {
      var args = (0, _argsToObject.default)(string, this.definitionObj);
      return args;
    }
    /**
     * @name                parseAndComplete
     * @type                Function
     * @static
     *
     * This method take a string like "-v 'something' --temp" and convert it into an object of arguments
     * depending on the definition object of this interface.
     * It will also complete the data object obtained with the "default" values if needed
     *
     * @param       {String}            string            The string to parse
     * @return      {Object}                              The object of arguments values
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "parseAndComplete",
    value: function parseAndComplete(string) {
      var args = (0, _argsToObject.default)(string, this.definitionObj);
      args = this.complete(args);
      return args;
    }
  }]);

  return SInterface;
}();

exports.default = SInterface;

_defineProperty(SInterface, "settings", {
  throw: true,
  return: 'String'
});

module.exports = exports.default;