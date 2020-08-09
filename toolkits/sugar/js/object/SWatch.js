"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constructorName = _interopRequireDefault(require("./constructorName"));

var _get = _interopRequireDefault(require("./get"));

var _set = _interopRequireDefault(require("./set"));

var _deepProxy = _interopRequireDefault(require("./deepProxy"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _parse = _interopRequireDefault(require("../string/parse"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _micromatch = _interopRequireDefault(require("micromatch"));

var _SPromise = _interopRequireDefault(require("../promise/SPromise"));

var _clone = _interopRequireDefault(require("../object/clone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		            SWatch
 * @namespace           js.object
 * @type                Class
 *
 * This class allows you to easily monitor some object properties and get the new and old value of it
 *
 * @param       {Object}      object        The object to watch
 * @param       {Object}      [settings={}]       An object of settings to configure your watch process
 * - deep (true) {Boolean}: Specify if you want to watch the object deeply or just the first level
 *
 * @example 	js
 * // create the watcher instance
 * const watchedObj = new SWatch({
 * 		title : 'Hello World'
 * });
 *
 * // watch the object
 * watchedObj.on('title:set', watchResult => {
 *  	// do something when the title changes
 * });
 *
 * // update the title
 * watchedObj.title = 'Hello Universe';
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SWatch = /*#__PURE__*/function () {
  /**
   * @name                    _watchStack
   * @type                    Object
   * @private
   *
   * Watch stack
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the settings object to configure your watch instance
   *
   * @since         2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                      constructor
   * @type                      Function
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SWatch(object, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SWatch);

    _defineProperty(this, "_watchStack", {});

    _defineProperty(this, "_settings", {});

    // check if the passed object is already an SWatch instance
    if (object.__$SWatch) return object;
    this._settings = (0, _deepMerge.default)({
      deep: true
    }, settings);
    this._promise = new _SPromise.default(() => {}).start();
    this._proxiedObject = (0, _deepProxy.default)(object, obj => {
      var path = obj.path;
      var value = obj.value;
      var oldValue = obj.oldValue;
      if (path.slice(0, 1) === '.') path = path.slice(1); // build the object to pass to the handler

      var watchResult = {
        object: this._proxiedObject,
        path,
        action: obj.action,
        oldValue,
        value
      };
      if (watchResult.action === 'get' && (path === 'on' || path === 'unwatch')) return; // trigger event through promise

      setTimeout(() => {
        // this._promise.trigger(`${path}`, watchResult);
        this._promise.trigger("".concat(path, ":").concat(watchResult.action), watchResult);
      });
    }, {
      deep: this._settings.deep
    });
    var onPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this._promise.on.bind(this._promise)
    };

    if (this._proxiedObject.on !== undefined) {
      Object.defineProperties(this._proxiedObject, {
        $on: onPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        on: onPropertyObj
      });
    }

    var unwatchPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this.unwatch.bind(this)
    };

    if (this._proxiedObject.unwatch !== undefined) {
      Object.defineProperties(this._proxiedObject, {
        $unwatch: unwatchPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        unwatch: unwatchPropertyObj
      });
    } // set a property that is usefull to check if the object
    // is a SWatch watched one...


    Object.defineProperty(this._proxiedObject, '__$SWatch', {
      writable: false,
      configurable: false,
      enumerable: false,
      value: true
    });
    return this._proxiedObject;
  }

  _createClass(SWatch, [{
    key: "unwatch",
    value: function unwatch() {
      // cancel the promise
      this._promise.cancel(); // revoke proxy on the proxied object


      return this._proxiedObject.revoke();
    }
  }]);

  return SWatch;
}();

exports.default = SWatch;
module.exports = exports.default;