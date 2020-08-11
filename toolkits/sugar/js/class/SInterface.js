"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _validateObject = _interopRequireDefault(require("../validation/object/validateObject"));

var _validateObjectOutputString = _interopRequireDefault(require("../validation/object/validateObjectOutputString"));

var _parseHtml = _interopRequireDefault(require("../console/parseHtml"));

var _trimLines = _interopRequireDefault(require("../string/trimLines"));

var _argsToObject = _interopRequireDefault(require("../cli/argsToObject"));

var _SObjectValidationError = _interopRequireDefault(require("../error/SObjectValidationError"));

var _deepize = _interopRequireDefault(require("../object/deepize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var issues = [];
      var issueObj = {
        issues: []
      };
      var implementationValidationResult = (0, _validateObject.default)(instance, this.definitionObj, {
        throw: false,
        name: instance.name || instance.constructor.name
      });

      if (implementationValidationResult !== true) {
        issueObj = (0, _deepMerge.default)(issueObj, implementationValidationResult, {
          array: true
        });
      }

      if (!issueObj.issues.length) return true;

      if (settings.throw) {
        var message = this.outputString(implementationValidationResult);
        var outputArray = [];

        if (this.title || settings.title) {
          outputArray.push("<bold><underline>".concat(settings.title || this.title, "</underline></bold>"));
          outputArray.push('');
        }

        if (this.description || settings.description) {
          outputArray.push(settings.description || this.description);
          outputArray.push('');
        }

        outputArray.push(message);
        throw outputArray.join('\n');
      }

      switch (settings.return.toLowerCase()) {
        case 'object':
          return issueObj;
          break;

        case 'string':
        default:
          return SInterface.outputString(issueObj);
          break;
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
    value: function applyAndThrow(instance) {
      var apply = SInterface.apply.bind(this);
      apply(instance, {
        throw: true
      });
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
    value: function applyAndComplete(object) {
      var completedObject = this.complete(object);
      this.applyAndThrow(completedObject);
      return completedObject;
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
    value: function complete(data) {
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
    value: function outputString(resultObj) {
      var string = (0, _validateObjectOutputString.default)(resultObj);
      return string;
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
    value: function output(resultObj) {
      var string = (0, _validateObjectOutputString.default)(resultObj);
      console.log(string);
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