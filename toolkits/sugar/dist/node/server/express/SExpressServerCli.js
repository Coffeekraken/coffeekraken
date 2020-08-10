"use strict";

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const __SCli = require('../../cli/SCli');

const __packageRoot = require('../../path/packageRoot');

const __sugarConfig = require('../../config/sugar');
/**
 * @name            SExpressServerCli
 * @namespace           node.server.express
 * @type            Class
 * @extends         SCli
 *
 * This class represent the express server cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SCli) {
  _inherits(SExpressServerCli, _SCli);

  var _super = _createSuper(SExpressServerCli);

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
  function SExpressServerCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SExpressServerCli);

    return _super.call(this, settings);
  } //   /**
  //    * @name            run
  //    * @type            Function
  //    * @override
  //    *
  //    * This method simply override the default one.
  //    * For arguments documentation, check the SCli class.
  //    *
  //    * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //    */
  //   run(
  //     argsObj = this._settings.argsObj,
  //     includeAllArgs = this._settings.includeAllArgs,
  //     log = true
  //   ) {
  //     const process = super.run(argsObj, includeAllArgs);
  //     if (!log) return process;
  //     setTimeout(() => {
  //       this.log(`<green>Your Express server is up and running</green>:
  // Hostname        : <yellow>${this.runningParamsObj.hostname}</yellow>
  // Port            : <yellow>${this.runningParamsObj.port}</yellow>
  // Root directory  : <yellow>${this.runningParamsObj.rootDir}</yellow>
  // Views directory : <yellow>${this.runningParamsObj.viewsDir}</yellow>
  // Views engine    : <yellow>${this.runningParamsObj.viewEngine}</yellow>
  // URL             : <cyan>http://${this.runningParamsObj.hostname}:${this.runningParamsObj.port}</cyan>`);
  //     });
  //     return process;
  //   }


  return SExpressServerCli;
}(__SCli), _defineProperty(_class, "command", 'sugar server.express %arguments'), _defineProperty(_class, "definitionObj", {
  hostname: {
    type: 'String',
    alias: 'o',
    description: 'Server hostname',
    default: __sugarConfig('express.hostname') || '127.0.0.1',
    level: 1
  },
  port: {
    type: 'Number',
    alias: 'p',
    description: 'Server port',
    default: __sugarConfig('express.port') || 3000,
    level: 1
  },
  rootDir: {
    type: 'String',
    description: 'Server root directory',
    default: __sugarConfig('express.rootDir') || __packageRoot(process.cwd()),
    level: 1
  },
  viewsDir: {
    type: 'String',
    description: 'Server views directory',
    default: __sugarConfig('express.viewsDir') || __packageRoot(process.cwd()) + '/views'
  },
  viewEngine: {
    type: 'String',
    description: 'Server views rendering engine',
    default: __sugarConfig('express.viewEngine') || 'bladePhp'
  }
}), _temp);