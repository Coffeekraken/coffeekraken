"use strict";

var _temp;

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

const __SPromise = require('../../promise/SPromise');

const __SComponent = require('../SComponent');

const __deepMerge = require('../../object/deepMerge');
/**
 * @name                    SAppPage
 * @namespace           node.blessed.app
 * @type                    Class
 * @extends                 SComponent
 *
 * This represent the base class that all the pages of an SApp based application
 * MUST extends.
 *
 * @param       {String}        id          An id for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageById(id)"
 * @param       {String}        title          A title for this particular page that can be used to retreive this instance using the static method "SAppPage.getPageByTitle(title)"
 * @param       {Object}        [settings={}]     A settings object that will be passed to the SComponent class constructor
 * - persistent (false) {Boolean}: Specify if you want your page to be destroyed when the user go to another one or not...
 *
 * @example       js
 * const SAppPage = require('@coffeekraken/sugar/node/blessed/app/SAppPage');
 * const myPage = new SAppPage('my.cool.page', 'My cool page', {});
 *
 * TODO: Documentation
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_SComponent) {
  _inherits(SAppPage, _SComponent);

  var _super = _createSuper(SAppPage);

  /**
   * @name          _id
   * @type          String
   * @private
   *
   * Store the page id
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name        _title
   * @type        String
   * @private
   *
   * Store the page title
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _promise
   * @type          SPromise
   * @private
   *
   * Store an SPromise instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _argsObj
   * @type          Object
   * @private
   *
   * Store the arguments object
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
  function SAppPage(id, title, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SAppPage);

    _this = _super.call(this, __deepMerge({
      persistent: false
    }, settings)); // save id and title

    _defineProperty(_assertThisInitialized(_this), "_id", null);

    _defineProperty(_assertThisInitialized(_this), "_title", null);

    _defineProperty(_assertThisInitialized(_this), "_promise", null);

    _defineProperty(_assertThisInitialized(_this), "_argsObj", {});

    _this._id = id;
    _this._title = title; // init a new SPromise instance

    _this._promise = new __SPromise(() => {}); // map some SPromise instance methods on this class instance

    _this.on = _this._promise.on.bind(_this._promise);
    return _this;
  }
  /**
   * @name        app
   * @type        SApp
   * @get
   *
   * Access the application instance on which you will have access to configs, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SAppPage, [{
    key: "setArgs",

    /**
     * @name        setArgs
     * @type        Function
     *
     * This method allows you to set some page arguments by passing an object.
     * Calling this will trigger an "args" and an "arg" SPromise "event".
     *
     * @param         {Object}        argsObj         An object of arguments to set
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function setArgs(argsObj) {
      // build an object that take all updated arguments values
      const updatedArgsObj = {}; // loop on each new arguments

      Object.keys(argsObj).forEach(argName => {
        // check if it has changed
        if (this._argsObj[argName] !== undefined && argsObj[argName] === this._argsObj[argName]) {} else {
          // trigger an "arg" event through the _promise property
          this._promise.trigger(`arg.${argName}`, {
            newValue: argsObj[argName],
            oldValue: this._argsObj[argName]
          });

          this._promise.trigger('arg', {
            name: argName,
            newValue: argsObj[argName],
            oldValue: this._argsObj[argName]
          });

          updatedArgsObj[argName] = {
            newValue: argsObj[argName],
            oldValue: this._argsObj[argName]
          };
        } // trigger an "args" event through the _promise property


        this._promise.trigger('args', updatedArgsObj); // set the new arg value


        this._argsObj[argName] = argsObj[argName];
      });
    }
    /**
     * @name          destroy
     * @type          Function
     *
     * This method serve to destroy the page when a user change to another one and that the
     * value of settings.persistent is to false
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "app",
    get: function () {
      return global.SAppInstance;
    }
    /**
     * @name        id
     * @type        String
     * @get
     *
     * Access the page id setted in the constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "id",
    get: function () {
      return this._id;
    }
    /**
     * @name        title
     * @type        String
     * @get
     *
     * Access the page title setted in the constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "title",
    get: function () {
      return this._title;
    }
    /**
     * @name        persistent
     * @type        Boolean
     * @get
     *
     * Access the value of the settings.persistent property
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "persistent",
    get: function () {
      return this._settings.persistent;
    }
  }]);

  return SAppPage;
}(__SComponent), _temp);