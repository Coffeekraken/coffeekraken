"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

const __fs = require('fs');

const __deepMerge = require('../../object/deepMerge');

const __tmpDir = require('../../fs/tmpDir');

const __writeFileSync = require('../../fs/writeFileSync');

const __diff = require('../../object/diff');

const __SConfigAdapter = require('./SConfigAdapter');
/**
 * @name                  SConfigFsAdapter
 * @namespace           node.config.adapters
 * @type                  Class
 *
 * The JSON data adapter for the SConfig class that let you define a filename where you want to save your configs, how you want to encrypt/decrypt it
 * and then you just have to use the SConfig class and that's it...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - filename ('[name].config.js') {String}: Specify the filename to use for the file that will store the configs
 * - defaultConfigPath (null) {String}: This specify the path to the "default" config file.
 * - appConfigPath (${process.cwd()}/[filename]) {String}: This specify the path to the "app" config file
 * - userConfigPath (${__tmpDir()}/[filename]) {String}: This specify the path to the "user" config file
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SConfigAdapter) {
  _inherits(SConfigFsAdapter, _SConfigAdapter);

  var _super = _createSuper(SConfigFsAdapter);

  function SConfigFsAdapter(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SConfigFsAdapter);

    settings = __deepMerge({
      name: null,
      filename: '[name].config.js',
      defaultConfigPath: null,
      appConfigPath: `${process.cwd()}/[filename]`,
      userConfigPath: `${__tmpDir()}/[filename]`
    }, settings);
    _this = _super.call(this, settings);
    _this.settings.filename = _this.settings.filename.replace('[name]', _this.name);
    if (_this.settings.defaultConfigPath) _this.settings.defaultConfigPath = _this.settings.defaultConfigPath.replace('[filename]', _this.settings.filename);
    if (_this.settings.appConfigPath) _this.settings.appConfigPath = _this.settings.appConfigPath.replace('[filename]', _this.settings.filename);
    if (_this.settings.userConfigPath) _this.settings.userConfigPath = _this.settings.userConfigPath.replace('[filename]', _this.settings.filename);
    return _this;
  }

  _createClass(SConfigFsAdapter, [{
    key: "load",
    value: function load() {
      this._defaultConfig = {};
      this._appConfig = {};
      this._userConfig = {}; // load the default config if exists

      if (this.settings.defaultConfigPath && __fs.existsSync(this.settings.defaultConfigPath)) {
        this._defaultConfig = require(`${this.settings.defaultConfigPath}`);
      } // load the app config if exists


      if (this.settings.appConfigPath && __fs.existsSync(this.settings.appConfigPath)) {
        this._appConfig = require(`${this.settings.appConfigPath}`);
      } // load the user config


      if (this.settings.userConfigPath && __fs.existsSync(this.settings.userConfigPath)) {
        this._userConfig = require(`${this.settings.userConfigPath}`);
      } // mix the configs and save them in the instance


      return __deepMerge(this._defaultConfig, this._appConfig, this._userConfig);
    }
  }, {
    key: "save",
    value: function save(newConfig) {
      if (newConfig === void 0) {
        newConfig = {};
      }

      if (!this.settings.userConfigPath) {
        throw new Error(`You try to save the config "${this.name}" but the "settings.userConfigPath" is not set...`);
      }

      const baseConfig = __deepMerge(this._defaultConfig, this._appConfig);

      newConfig = __diff(baseConfig, newConfig);
      let newConfigString = `
      module.exports = ${JSON.stringify(newConfig)};
    `; // write the new config file

      __writeFileSync(this.settings.userConfigPath, newConfigString);

      return true;
    }
  }]);

  return SConfigFsAdapter;
}(__SConfigAdapter);