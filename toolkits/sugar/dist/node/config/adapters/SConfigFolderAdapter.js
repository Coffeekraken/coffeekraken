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

const __writeFileSync = require('../../fs/writeFileSync');

const __diff = require('../../object/diff');

const __SConfigAdapter = require('./SConfigAdapter');
/**
 * @name                  SConfigFolderAdapter
 * @namespace           node.config.adapters
 * @type                  Class
 *
 * This adapter let you specify a folder in which to put all the config files and access it normaly as you would with the SConfig system.
 * Each file in the folder will be the first level of the final config object like for example the file "colors.config.js" will be stored
 * in the final object under ```{ colors: ... }```.
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
  _inherits(SConfigFolderAdapter, _SConfigAdapter);

  var _super = _createSuper(SConfigFolderAdapter);

  function SConfigFolderAdapter(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SConfigFolderAdapter);

    _this = _super.call(this, settings);
    _this.settings.foldername = _this.settings.foldername.replace('[name]', _this.name);
    if (_this.settings.defaultConfigPath) _this.settings.defaultConfigPath = _this.settings.defaultConfigPath.replace('[foldername]', _this.settings.foldername);
    if (_this.settings.appConfigPath) _this.settings.appConfigPath = _this.settings.appConfigPath.replace('[foldername]', _this.settings.foldername);
    if (_this.settings.userConfigPath) _this.settings.userConfigPath = _this.settings.userConfigPath.replace('[foldername]', _this.settings.foldername);
    return _this;
  }

  _createClass(SConfigFolderAdapter, [{
    key: "load",
    value: function load() {
      this._defaultConfig = {};
      this._appConfig = {};
      this._userConfig = {}; // load the default config if exists

      if (!process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] && this.settings.defaultConfigPath && __fs.existsSync(this.settings.defaultConfigPath)) {
        process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] = true;

        __fs.readdirSync(this.settings.defaultConfigPath).forEach(file => {
          if (!file.includes(this.settings.filename.replace('[name]', ''))) return;
          if (this._defaultConfig[file.replace('.config.js', '')] !== undefined) return;
          this._defaultConfig[file.replace('.config.js', '')] = require(`${this.settings.defaultConfigPath}/${file}`); // this._defaultConfig[file.replace('.config.js', '')] = require(this
          //   .settings.defaultConfigPath +
          //   '/' +
          //   file);
        });

        process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`] = JSON.stringify(this._defaultConfig);
      } else if (process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`]) {
        this._defaultConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.defaultConfigPath}`]);
      } // load the app config if exists


      if (!process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] && this.settings.defaultConfigPath !== this.settings.appConfigPath && this.settings.appConfigPath && __fs.existsSync(this.settings.appConfigPath)) {
        process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] = true; // intermediate value

        __fs.readdirSync(this.settings.appConfigPath).forEach(file => {
          if (!file.includes(this.settings.filename.replace('[name]', ''))) return;
          this._defaultConfig[file.replace('.config.js', '')] = require(`${this.settings.appConfigPath}/${file}`); // this._appConfig[file.replace('.config.js', '')] = require(this.settings
          //   .appConfigPath +
          //   '/' +
          //   file);
        });

        process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`] = JSON.stringify(this._appConfig);
      } else if (process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`]) {
        this._appConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.appConfigPath}`]);
      } // load the user config


      if (!process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] && this.settings.defaultConfigPath !== this.settings.userConfigPath && this.settings.appConfigPath !== this.settings.userConfigPath && this.settings.userConfigPath && __fs.existsSync(this.settings.userConfigPath)) {
        process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] = true; // intermediate value

        __fs.readdirSync(this.settings.userConfigPath).forEach(file => {
          if (!file.includes(this.settings.filename.replace('[name]', ''))) return;
          this._defaultConfig[file.replace('.config.js', '')] = require(`${this.settings.userConfigPath}/${file}`); // this._userConfig[file.replace('.config.js', '')] = require(this.settings
          //   .userConfigPath +
          //   '/' +
          //   file);
        });

        process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`] = JSON.stringify(this._userConfig);
      } else if (process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`]) {
        this._userConfig = JSON.parse(process.env[`SConfigFolderAdapter-${this.settings.userConfigPath}`]);
      } // mix the configs and save them in the instance


      const n = __deepMerge(this._defaultConfig, this._appConfig, this._userConfig);

      return n;
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

      Object.keys(baseConfig).forEach(name => {
        const configToSave = __diff(baseConfig[name], newConfig[name] || {});

        let newConfigString = `
      module.exports = ${JSON.stringify(configToSave)};
    `; // write the new config file

        __writeFileSync(this.settings.userConfigPath + '/' + this.settings.filename.replace('[name]', name), newConfigString);
      });
      return true;
    }
  }]);

  return SConfigFolderAdapter;
}(__SConfigAdapter);