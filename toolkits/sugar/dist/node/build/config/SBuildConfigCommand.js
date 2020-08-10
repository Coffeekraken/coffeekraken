"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

const __SCommand = require('../../terminal/SCommand');

const __deepMerge = require('../../object/deepMerge');

const __SBuildConfigCli = require('./SBuildConfigCli');

const __sugarConfig = require('../../config/sugar');
/**
 * @name              SBuildConfigCommand
 * @namespace           node.build.config
 * @type              SCommand
 *
 * This class represent a command used to watch and build config files
 *
 * @param         {Object}        [argsObj={}]                An object to configure this specific scss command with these properties:
 * - input (null) {String}: Specify the input files that you want to build. You can use glob pattern
 * - outputDir (null) {String}: Specify the output folder where you want to save the compiled files
 * @param        {Object}         [commandSettings={}]         An object of SCommand settings to configure your command
 *
 * @example       js
 * const SBuildConfigCommand = require('@coffeekraken/sugar/node/build/commands/SBuildConfigCommand');
 * const myCommand = new SBuildConfigCommand();
 * myCommand.run();
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */


module.exports = /*#__PURE__*/function (_SCommand) {
  _inherits(SBuildConfigCommand, _SCommand);

  var _super = _createSuper(SBuildConfigCommand);

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  function SBuildConfigCommand(argsObj, commandSettings) {
    if (argsObj === void 0) {
      argsObj = {};
    }

    if (commandSettings === void 0) {
      commandSettings = {};
    }

    _classCallCheck(this, SBuildConfigCommand);

    // init command
    return _super.call(this, 'build.config', new __SBuildConfigCli(), __deepMerge({
      argsObj,
      title: 'Build Config',
      key: 'c',
      concurrent: false,
      namespace: 'build.config',
      watch: __sugarConfig('build.config.watch')
    }, commandSettings));
  }

  return SBuildConfigCommand;
}(__SCommand);