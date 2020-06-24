"use strict";

var _set = _interopRequireDefault(require("../../object/set"));

var _get = _interopRequireDefault(require("../../object/get"));

var _toString = _interopRequireDefault(require("../../string/toString"));

var _parse = _interopRequireDefault(require("../../string/parse"));

var _stringifyObject = _interopRequireDefault(require("stringify-object"));

var _deepMerge = _interopRequireDefault(require("../../object/deepMerge"));

var _SConfigAdapter2 = _interopRequireDefault(require("./SConfigAdapter"));

var _diff = _interopRequireDefault(require("../../object/diff"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 * @name                  SConfigLsAdapter
 * @namespace           js.config.adapters
 * @type                  Class
 *
 * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
 * let the SConfig class do the work for you...
 *
 * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
 * - name (null) {String}: This specify the config name that you want to use.
 * - defaultConfig ({}) {Object}: This specify the "default" config that you want.
 * - appConfig ({}) {Object}: This specify the "application" level config that you want.
 * - userConfig ({}) {Object}: This specify the "user" level config that you want. It's usually this config that is updated
 * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = /*#__PURE__*/function (_SConfigAdapter) {
  _inherits(SConfigLsAdapter, _SConfigAdapter);

  var _super = _createSuper(SConfigLsAdapter);

  function SConfigLsAdapter(settings = {}) {
    _classCallCheck(this, SConfigLsAdapter);

    return _super.call(this, settings);
  }

  _createClass(SConfigLsAdapter, [{
    key: "load",
    value: function load() {
      // try to get the config from the localstorage
      const config = (0, _parse.default)(localStorage.getItem(this._settings.name)) || {}; // mix the configs and save them in the instance

      return (0, _deepMerge.default)(config.default || {}, config.app || {}, config.user || {});
    }
  }, {
    key: "save",
    value: function save(newConfig = {}) {
      const baseConfig = (0, _deepMerge.default)(this._settings.defaultConfig, this._settings.appConfig);
      localStorage.setItem(this._settings.name, (0, _toString.default)({
        default: this._settings.defaultConfig,
        app: this._settings.appConfig,
        user: (0, _diff.default)(baseConfig, newConfig)
      }));
      return true;
    }
  }]);

  return SConfigLsAdapter;
}(_SConfigAdapter2.default);