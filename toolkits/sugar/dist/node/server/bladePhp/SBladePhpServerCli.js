"use strict";

var _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var __SPhpServerCli = require('../php/SPhpServerCli');

var __packageRoot = require('../../path/packageRoot');

var __deepMerge = require('../../object/deepMerge');

var __argsToObject = require('../../cli/argsToObject');

var __sugarConfig = require('../../config/sugar');
/**
 * @name            SBladePhpServerCli
 * @namespace           node.server.bladePhp
 * @type            Class
 * @extends         SPhpServerCli
 *
 * This class represent the Blade PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = _class = /*#__PURE__*/function (_SPhpServerCli) {
  _inherits(SBladePhpServerCli, _SPhpServerCli);

  var _super = _createSuper(SBladePhpServerCli);

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
  function SBladePhpServerCli(settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SBladePhpServerCli);

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


  _createClass(SBladePhpServerCli, [{
    key: "run",
    value: function run(argsObj, includeAllArgs) {
      if (argsObj === void 0) {
        argsObj = this._settings.argsObj;
      }

      if (includeAllArgs === void 0) {
        includeAllArgs = this._settings.includeAllArgs;
      }

      var args = __argsToObject(argsObj, this.definitionObj);

      var serverArgs = __deepMerge(args.server, _objectSpread({}, __sugarConfig('blade.server')));

      serverArgs.router = "".concat(__packageRoot(__dirname), "/src/php/blade/sBladePhpServerRouter.php");

      var pro = _get(_getPrototypeOf(SBladePhpServerCli.prototype), "run", this).call(this, serverArgs, includeAllArgs, false);

      setTimeout(() => {
        this.log("<green>Your Blade PHP server is up and running</green>:\n\nHostname              : <yellow>".concat(this.runningArgsObj.hostname, "</yellow>\nPort                  : <yellow>").concat(this.runningArgsObj.port, "</yellow>\nRoot directory        : <yellow>").concat(this.runningArgsObj.rootDir, "</yellow>\nViews root directory  : <yellow>").concat(args.rootDir, "</yellow>\nViews cache directory : <yellow>").concat(args.cacheDir, "</yellow>\nAPI Url               : <cyan>http://").concat(this.runningArgsObj.hostname, ":").concat(this.runningArgsObj.port, "</cyan>"));
      });
      return pro;
    }
  }]);

  return SBladePhpServerCli;
}(__SPhpServerCli), _defineProperty(_class, "definitionObj", {
  server: {
    type: 'Object',
    description: 'PHP server options',
    children: _objectSpread({}, __SPhpServerCli.definitionObj)
  },
  rootDir: {
    type: 'String',
    description: 'Blade views root directory',
    default: __sugarConfig('views.rootDir') || "".concat(__packageRoot(process.cwd()), "/dist/views")
  },
  cacheDir: {
    type: 'String',
    description: 'Blade views cache directory',
    default: __sugarConfig('views.cacheDir') || "".concat(__packageRoot(process.cwd()), "/dist/views/.cache")
  }
}), _temp);