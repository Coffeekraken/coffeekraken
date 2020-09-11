"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _autoCast = _interopRequireDefault(require("../string/autoCast"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _get = _interopRequireDefault(require("../object/get"));

var _flatten = _interopRequireDefault(require("../object/flatten"));

var _SPromise3 = _interopRequireDefault(require("../../node/promise/SPromise"));

var _fastSafeStringify = _interopRequireDefault(require("fast-safe-stringify"));

var _typeMap = _interopRequireDefault(require("./typeMap"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		                    SAction
 * @namespace           js.action
 * @type                        Class
 *
 * This class represent an action. An action is something that happened depending on
 * settings. It can be an "url" action that will change the user page, a "login" action
 * that will allow the user to log in his favorite services like "google", etc...
 * All this is wrapped into a nicely formated system that use the SPromise class
 * to let you know the state of the action, etc...
 *
 * @example 	js
 * import SAction from '@coffeekraken/sugar/js/action/SAction';
 * class MyCoolAction extends SAction {
 *    constructor(descriptorObj, settings = {}) {
 *      super(descriptorObj, settings);
 *    }
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SAction = /*#__PURE__*/function (_SPromise) {
  _inherits(SAction, _SPromise);

  var _super = _createSuper(SAction);

  _createClass(SAction, null, [{
    key: "on",

    /**
     * @name            _settings
     * @type            Object
     * @private
     *
     * Store this action instance settings
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name            _descriptorObj
     * @type            Object
     * @private
     *
     * Store this action instance settings
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name              _promise
     * @type              SPromise
     * @static
     * @private
     *
     * Store the global SPromise instance used to dispatch global events
     *
     * @since         2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name              on
     * @type              Function
     * @static
     *
     * This function allows you to subscribe to general SAction actions events by
     * prefixing it with the action class name like "SUrlAction.{event}", etc...
     *
     * @return      {Function}          A function that you can call to unregister to the event
     *
     * @since         2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function on(event, callback) {
      SAction._promise.on(event, callback);

      return () => {
        SAction._promise.off(event, callback);
      };
    }
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Constructor
     *
     * @param           	{SActionConfig|Object} 		            request 	            	The request object used to make ajax call
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }]);

  function SAction(descriptorObj, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SAction);

    _this = _super.call(this, (resolve, reject, trigger, cancel) => {});

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _defineProperty(_assertThisInitialized(_this), "_descriptorObj", {});

    _this._settings = (0, _deepMerge.default)({}, settings);
    _this._descriptorObj = descriptorObj;
    return _this;
  }
  /**
   * @name            run
   * @type            Function
   *
   * This method is meant to be overrided by your custom actions classes.
   * You still need to call it using the ```super.run()``` statement in order
   * to keep all the features like promises events, etc...
   *
   * @return      {SPromise}      An SPromise instance only for this particular run process. You can subscribe to the same "events" has on the class itself but these events are happening only for this run process.
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SAction, [{
    key: "run",
    value: function run() {
      var promise = new _SPromise2.default((resolve, reject, trigger, cancel) => {
        SAction._promise.trigger("".concat(this.constructor.name, ".run"), this);

        trigger("run", this);
        this.trigger("run", this);
      });

      promise.complete = () => {
        SAction._promise.trigger("".concat(this.constructor.name, ".complete"), this);

        promise.trigger('complete', this);
        this.trigger("complete", this);
      };

      return promise;
    }
    /**
     * @name          toJson
     * @type          Function
     *
     * This method is usefull to turn your action instance into a
     * proper JSON object to you can pass it through http request, etc...
     * You can then instanciate back your action by using the ```
     *
     * @since         2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toJson",
    value: function toJson() {
      var types = (0, _flatten.default)(_typeMap.default);
      var type = null;

      for (var key in types) {
        if (types[key] === this.constructor) {
          type = key.replace('.default', '');
          break;
        }
      }

      if (!type) throw new Error("You try to convert your \"<primary>".concat(this.constructor.name, "</primary>\" instance to JSON but this Class is not registered into the \"<cyan>js.action.typeMap</cyan>\" mapping object. Please add it to it before continue..."));
      return {
        type: type,
        descriptorObj: this._descriptorObj,
        settings: this._settings
      };
    }
  }]);

  return SAction;
}(_SPromise2.default);

exports.default = SAction;

_defineProperty(SAction, "_promise", new _SPromise2.default(() => {}));

module.exports = exports.default;