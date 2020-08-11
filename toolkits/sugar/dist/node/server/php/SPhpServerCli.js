"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __SCli = require('../../cli/SCli');

var __packageRoot = require('../../path/packageRoot');

var __sugarConfig = require('../../config/sugar');
/**
 * @name            SPhpServerCli
 * @namespace           node.server.php
 * @type            Class
 * @extends         SCli
 *
 * This class represent the PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SCli) {
  _inherits(SPhpServerCli, _SCli);

  var _super = _createSuper(SPhpServerCli);

  /**
   * @name          command
   * @type          String
   * @static
   *
   * Store the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SPhpServerCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SPhpServerCli);

    return _super.call(this, settings);
  }
  /**
   * @name            run
   * @type            Function
   * @override
   *
   * This method simply override the default one.
   * For arguments documentation, check the SCli class.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SPhpServerCli, [{
    key: "run",
    value: function run(argsObj, includeAllArgs, log) {
      if (argsObj === void 0) {
        argsObj = this._settings.argsObj;
      }

      if (includeAllArgs === void 0) {
        includeAllArgs = this._settings.includeAllArgs;
      }

      if (log === void 0) {
        log = true;
      }

      var pro = _get(_getPrototypeOf(SPhpServerCli.prototype), "run", this).call(this, argsObj, includeAllArgs);

      if (!log) return pro;
      setTimeout(() => {
        this.log("<green>Your PHP server is up and running</green>:\n\nHostname       : <yellow>".concat(this.runningArgsObj.hostname, "</yellow>\nPort           : <yellow>").concat(this.runningArgsObj.port, "</yellow>\nRoot directory : <yellow>").concat(this.runningArgsObj.rootDir, "</yellow>\nURL            : <cyan>http://").concat(this.runningArgsObj.hostname, ":").concat(this.runningArgsObj.port, "</cyan>"));
      });
      return pro;
    }
  }]);

  return SPhpServerCli;
}(__SCli), _defineProperty(_class, "command", 'php -S %hostname:%port -t %rootDir %router %arguments'), _defineProperty(_class, "definitionObj", {
  hostname: {
    type: 'String',
    alias: 'o',
    description: 'Server hostname',
    default: __sugarConfig('php.hostname') || 'localhost',
    level: 1
  },
  port: {
    type: 'Number',
    alias: 'p',
    description: 'Server port',
    default: __sugarConfig('php.port') || 8080,
    level: 1
  },
  rootDir: {
    type: 'String',
    description: 'Server root directory',
    default: __sugarConfig('php.rootDir') || __packageRoot(process.cwd()),
    level: 1
  },
  router: {
    type: 'String',
    description: 'Server router',
    default: '',
    level: 1
  },
  interactive: {
    type: 'Boolean',
    alias: 'a',
    description: 'Run as interactive shell',
    default: false,
    level: 2
  },
  config: {
    type: 'String',
    alias: 'c',
    description: 'Look for php.ini file in this directory',
    level: 2
  },
  noini: {
    type: 'Boolean',
    alias: 'n',
    description: 'No php.ini file will be used',
    default: false,
    level: 2
  },
  define: {
    type: 'String',
    alias: 'd',
    description: "Define INI entry foo with value 'bar'",
    level: 2
  },
  extended: {
    type: 'Boolean',
    alias: 'e',
    description: 'Generate extended information for debugger/profiler',
    default: false,
    level: 2
  },
  file: {
    type: 'String',
    alias: 'f',
    description: 'Parse <file>',
    level: 2
  },
  help: {
    type: 'Boolean',
    alias: 'h',
    description: 'Help',
    default: false,
    level: 2
  },
  information: {
    type: 'Boolean',
    alias: 'i',
    description: 'PHP information',
    default: false,
    level: 2
  },
  lint: {
    type: 'Boolean',
    alias: 'l',
    description: 'Syntax check only (lint)',
    default: false,
    level: 2
  },
  modules: {
    type: 'Boolean',
    alias: 'm',
    description: 'Show compiled in modules',
    default: false,
    level: 2
  },
  run: {
    type: 'String',
    alias: 'r',
    description: 'Run PHP <code> without using script tags <?..?>',
    level: 2
  },
  begin: {
    type: 'String',
    alias: 'B',
    description: 'Run PHP <begin_code> before processing input lines',
    level: 2
  },
  runLine: {
    type: 'String',
    alias: 'R',
    description: 'Run PHP <code for every input line',
    level: 2
  },
  fileLine: {
    type: 'String',
    alias: 'F',
    description: 'Parse and execute <file> for every input line',
    level: 2
  },
  end: {
    type: 'String',
    alias: 'E',
    description: 'Run PHP <end_code> after processing all input lines',
    level: 2
  },
  hide: {
    type: 'Boolean',
    alias: 'H',
    description: 'Hide any passed arguments from external tools',
    default: false,
    level: 2
  },
  color: {
    type: 'Boolean',
    alias: 's',
    description: 'Display colour syntax highlighted source',
    default: false,
    level: 2
  },
  version: {
    type: 'Boolean',
    alias: 'v',
    description: 'Version number',
    default: false,
    level: 2
  },
  stripped: {
    type: 'Boolean',
    alias: 'w',
    description: 'Display source with stripped comments and whitespace',
    default: false,
    level: 2
  },
  zend: {
    type: 'String',
    alias: 'z',
    description: 'Load Zend extension <file>',
    level: 2
  }
}), _temp);