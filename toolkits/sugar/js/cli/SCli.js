"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _buildCommandLine = _interopRequireDefault(require("./buildCommandLine"));

var _checkDefinitionObject = _interopRequireDefault(require("./checkDefinitionObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                SCli
 * @namespace           sugar.js.cli
 * @type                Class
 *
 * This class represent a basic CLI command with his definition object, his command string, etc...
 *
 * @param       {String}        commandString         The command string that contains arguments tokens and the "[arguments]" token where you want the parsed arguments to be placed
 * @param       {Object}        definitionObj         The definition object that represent all the available arguments, their types, etc... Here's the definitionObj format:
 * - argName:
 *    - type (null) {String}: The argument type like "String", "Boolean", "Array", "Number" or "Object"
 *    - alias (null) {String}: A 1 letter alias for the argument to be used like "-a", "-g", etc...
 *    - description (null) {String}: A small and efficient argument description
 *    - default (null) {Mixed}: The default argument value if nothing is specified
 *    - level (1) {Number}: This represent the "importance" of the argument. An argument with level 1 is an argument often used that will be displayed in the summary command list. An argument of level 2 if less important and can be skipped.
 *
 * @example         js
 * import SCli from '@coffeekraken/sugar/js/cli/SCli';
 * class MyCli extends SCli {
 *    constructor() {
 *      super('php [hostname]:[port] [rootDir] [arguments]', {
 *        hostname: {
 *          type: 'String',
 *          description: 'Server hostname',
 *          default: 'localhost'
 *        },
 *        port: {
 *          type: 'Number',
 *          description: 'Server port',
 *          default: 8080
 *        },
 *        // etc...
 *      });
 *    }
 * }
 * const myCli = new MyCli();
 * myCli.getCommandLine({
 *    port: 8888
 * }); // => php localhost:8888 .
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let SCli = /*#__PURE__*/function () {
  /**
   * @name            _definitionObj
   * @type            Object
   * @private
   *
   * Store the passed definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _commandString
   * @type          String
   * @private
   *
   * Store the command string with tokens
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SCli(commandString, definitionObj) {
    _classCallCheck(this, SCli);

    _defineProperty(this, "_definitionObj", {});

    _defineProperty(this, "_commandString", null);

    // save the command string
    this._commandString = commandString; // save the definition object

    this._definitionObj = definitionObj; // check integrity

    this._checkCliIntegrity();
  }
  /**
   * @name        commandString
   * @type        String
   * @get
   *
   * Access the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SCli, [{
    key: "_checkCliIntegrity",

    /**
     * @name        _checkCliIntegrity
     * @type        Function
     * @private
     *
     * This method simply check that the extended SCli instance has the needed overrided methods, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function _checkCliIntegrity() {
      // check definition object
      const definitionObjCheck = (0, _checkDefinitionObject.default)(this.definitionObj);
      if (definitionObjCheck !== true) throw new Error(definitionObjCheck);
    }
    /**
     * @name          buildCommandLine
     * @type          Function
     *
     * This method allows you to pass an arguments object and return the builded command line string depending on the definition object.
     *
     * @param       {Object}      argsObj         An argument object to use for the command line string generation
     * @param       {Boolean}     [includeAllArgs = true]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
     * @return      {String}                        The generated command line string
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "buildCommandLine",
    value: function buildCommandLine(argsObj, includeAllArgs = true) {
      return (0, _buildCommandLine.default)(this.commandString, this.definitionObj, argsObj, includeAllArgs);
    }
  }, {
    key: "commandString",
    get: function () {
      return this._commandString;
    }
    /**
     * @name        definitionObj
     * @type        String
     * @get
     *
     * Access the definition object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "definitionObj",
    get: function () {
      return Object.assign({}, this._definitionObj);
    }
  }]);

  return SCli;
}();

exports.default = SCli;
module.exports = exports.default;