"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SPromise2 = _interopRequireDefault(require("../promise/SPromise"));

var _uniqid = _interopRequireDefault(require("../string/uniqid"));

var _validateObject = _interopRequireDefault(require("../validation/object/validateObject"));

var _validateObjectDefinitionObject = _interopRequireDefault(require("../validation/object/validateObjectDefinitionObject"));

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

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name          SActionStreamAction
 * @namespace           js.stream
 * @type          Class
 * @extends       SPromise
 *
 * This class represent the base of a actions stream action.
 * An action stream action represent an action that you can register in the SActionsStream instance and
 * prodive you some usefull features like "trigger" some events, set/get data from the streamObj, defining some required streamObj properties
 * to work with, etc...
 *
 * @param       {Object}        actions         An object of actions to execute one after the other. The object has to be formatted like ```{ actionName: actionFunction }```
 * @param       {Object}        [settings={}]   A settings object to configure your instance:
 * - name (null) {String}: A simple name for your stream that will be used in the logs
 * - order (null) {Array}: An array of action names that specify the order you want to execute them. If not specified, take the actions object properties order.
 * - actions ({}) {Object}: An object formated like ```{ actionName: settings }``` that contain specific settings for each actions and that will be passed as a second parameter to each actions.
 * - cwd (process.cwd()) {String}: The current working directory to use during the stream execution
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var SActionStreamAction = /*#__PURE__*/function (_SPromise) {
  _inherits(SActionStreamAction, _SPromise);

  var _super = _createSuper(SActionStreamAction);

  /**
   * @name            _skipNextActions
   * @type            Number|Array<String>
   * @private
   *
   * Store the next actions you want to skip
   *
   * @since           2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _currentPromise
   * @type            SPromise
   * @private
   *
   * Store the current SPromise instance of the current running action instance
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            _registeredCallbacks
   * @type            Array<Object>
   * @private
   *
   * Store the registered callbaks
   *
   * @since           2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SActionStreamAction(settings) {
    var _thisSuper, _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SActionStreamAction);

    // init SPromise
    _this = _super.call(this, () => {}, (0, _deepMerge.default)({
      name: null,
      id: (0, _uniqid.default)(),
      cwd: process.cwd()
    }, settings));

    _defineProperty(_assertThisInitialized(_this), "_skipNextActions", null);

    _defineProperty(_assertThisInitialized(_this), "_currentPromise", null);

    _defineProperty(_assertThisInitialized(_this), "_registeredCallbacks", []);

    if (!_this._settings.id) _this._settings.id = _this.constructor.name.toLowerCase(); // if (
    //   !this.constructor.definitionObj ||
    //   !Object.keys(this.constructor.definitionObj).length
    // ) {
    //   throw new Error(
    //     `Sorry but your class "<yellow>${this.constructor.name}</yellow>" does not have the required <yellow>static</yellow> <cyan>definitionObj</cyan> property...`
    //   );
    // }
    // check the definition object

    if (_this.constructor.definitionObj) {
      (0, _validateObjectDefinitionObject.default)(_this.constructor.definitionObj);
    }

    _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(SActionStreamAction.prototype)), "start", _thisSuper).call(_thisSuper);

    return _this;
  }

  _createClass(SActionStreamAction, [{
    key: "checkStreamObject",

    /**
     * @name          checkStreamObject
     * @type          Function
     * @async
     *
     * This method take the streamObj object passed to the "run" method and check it depending on the definitionObj
     * specified in the static definitionObj property.
     *
     * @param       {Object}        streamObj         The streamObj to check
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function checkStreamObject(streamObj) {
      if (!this.constructor.definitionObj) return true; // handle "default" property of the definition object

      Object.keys(this.constructor.definitionObj).forEach(key => {
        if (streamObj[key] === undefined && this.constructor.definitionObj[key].default !== undefined) {
          streamObj[key] = this.constructor.definitionObj[key].default;
        }
      }); // validate the streamObj depending on the static definitionObj property

      if (this.constructor.definitionObj) {
        (0, _validateObject.default)(streamObj, this.constructor.definitionObj);
      }
    }
    /**
     * @name          skipNextActions
     * @type          Function
     *
     * This method allows you to tell the SActionStream class that you want to skip
     * the next actions. If you don't specify anything, it means that you want to skip
     * ALL the next actions. You can pass a number that mean that you want to skip x next action(s),
     * or an array with the actions names that you want to skip.
     *
     * @param       {Number|Array<String>|Boolean}        [what=true]        Specify what you want to skip. Can be a number or an array of actions names to skip
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "skipNextActions",
    value: function skipNextActions(what) {
      if (what === void 0) {
        what = true;
      }

      this._skipNextActions = what;
    }
    /**
     * @name          registerCallback
     * @type          Function
     *
     * This method allows you to register some callbacks during the stream action process.
     * You can specify when you want to register this callback like "before" or "after", and specify if
     * it's before/after the entire stream process or a particular action.
     *
     * @param       {Function}        callback          The callback function to call
     * @param       {String}          [when='after']    When you want to call this callback. Can be "before" or "after"
     * @param       {String}          [action=null]     Specify the reference action. If not set, that's mean that the entire stream process is the reference
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "registerCallback",
    value: function registerCallback(callback, when, action) {
      if (when === void 0) {
        when = 'after';
      }

      if (action === void 0) {
        action = null;
      }

      this._registeredCallbacks.push({
        callback,
        when,
        action
      });
    }
    /**
     * @name          run
     * @type          Function
     * @async
     *
     * This method is the one that has to be overrided.
     * It will be called to run the actions on want on the streamObj passed as parameter
     * and MUST return a Promise instance that you need to resolve at the end of your processed
     * and pass it the updated streamObject.
     *
     * @param       {Object}        streamObj         The streamObj to work with
     * @param       {Object}        [settings=this._settings]     A settings object specific to this action. It will be equal to the passed instance settings and deeply merged with the settings object you have setted in the "actions.{actionName}" oject of the SActionsStream instance
     * @return      {Promise}                         A simple promise that you have to resolve at the end of your process with the updates streamObj
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "run",
    value: function run(streamObj, promiseFn) {
      this.checkStreamObject(streamObj);
      this._currentPromise = new _SPromise2.default(promiseFn, {
        id: this._settings.id
      }).start();
      return this._currentPromise;
    }
    /**
     * @name          error
     * @type          Function
     *
     * This method allows you to error a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to error
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "error",
    value: function error(message) {
      this.trigger('error', {
        value: "<red>\u271A</red> ".concat(message)
      });
      if (!this._currentPromise) return;

      this._currentPromise.trigger('log', {
        value: "<red>\u271A</red> ".concat(message)
      });
    }
    /**
     * @name          warn
     * @type          Function
     *
     * This method allows you to warn a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to warn
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "warn",
    value: function warn(message) {
      this.trigger('log', {
        value: "<yellow>\u26A0</yellow> ".concat(message)
      });
      if (!this._currentPromise) return;

      this._currentPromise.trigger('log', {
        value: "<yellow>\u26A0</yellow> ".concat(message)
      });
    }
    /**
     * @name          log
     * @type          Function
     *
     * This method allows you to log a message that will be catched by the parent manager class
     *
     * @param       {String}        message           The message you want to log
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "log",
    value: function log(obj) {
      if (typeof obj === 'string') {
        this.trigger('log', {
          value: obj
        });
        if (!this._currentPromise) return;

        this._currentPromise.trigger('log', {
          value: obj
        });
      } else {
        this.trigger('log', obj);
        if (!this._currentPromise) return;

        this._currentPromise.trigger('log', obj);
      }
    }
  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }]);

  return SActionStreamAction;
}(_SPromise2.default);

exports.default = SActionStreamAction;
module.exports = exports.default;