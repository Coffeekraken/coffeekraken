"use strict";

var _class, _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var __blessed = require('blessed');

var __deepMerge = require('../object/deepMerge');

var __color = require('../color/color');

var __hotkey = require('../keyboard/hotkey');

var __tkill = require('tree-kill');

var __isChildProcess = require('../is/childProcess');

var __activeScreen = null;
/**
 * @name                  SComponent
 * @namespace           node.blessed
 * @type                  Class
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SComponent = require('@coffeekraken/sugar/node/blessed/SComponent');
 * class MyCoolComponent extends SComponent {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// __hotkey('ctrl+c', {
//   once: true
// }).on('press', () => {
//   if (!global.screen) return;
//   global.screen.destroy();
// });

module.exports = (_temp = _class = /*#__PURE__*/function (_blessed$box) {
  _inherits(SComponent, _blessed$box);

  var _super = _createSuper(SComponent);

  /**
   * @name                  _settings
   * @type                  Object
   * @private
   *
   * Store the component settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _renderInterval
   * @type                  Function
   * @private
   * @static
   *
   * Store the setInterval that render the screen
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SComponent(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SComponent);

    // check if need to create a screen
    if (!__activeScreen && settings.screen !== false) {
      __activeScreen = __blessed.screen({
        smartCSR: true,
        cursor: {
          artificial: true,
          shape: {
            bg: __color('terminal.primary').toString(),
            ch: '|' // ch: '█'

          },
          blink: true
        },
        container: {
          // width: '100%',
          height: '100%',
          top: 1,
          left: 2,
          right: 2,
          bottom: 1,
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
          style: {}
        }
      });
    } // store the settings


    settings = __deepMerge({}, settings); // extends parent

    _this = _super.call(this, settings);

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _this._screen = __activeScreen;
    global.screen = __activeScreen; // keep track of the component status

    _this._isDisplayed = false;

    _this.on('attach', () => {
      _this._isDisplayed = true;
      setTimeout(() => {
        _this.update();
      }, 200);
    });

    _this.on('detach', () => {
      _this._isDisplayed = false;
    }); // save the settings


    _this._settings = settings;
    _this._allowRender = true;
    _this._renderBuffer = setInterval(() => {
      _this._allowRender = true;
    }, 100); // set render interval if not set already
    // if (!SComponent._renderInterval) {
    //   this.setRenderInterval(100);
    // }

    var container;

    if (settings.container) {
      container = __blessed.box(settings.container);
      __activeScreen.container = container;

      __activeScreen.append(container);
    }

    __hotkey('ctrl+c', {
      once: true
    }).on('press', /*#__PURE__*/_asyncToGenerator(function* () {
      _this._destroyed = true;
      _this._allowRender = false;

      _this.detach();
    }));

    if (_this._settings.appendToScreen) {
      (__activeScreen.container || __activeScreen).append(_assertThisInitialized(_this));
    }

    if (!_this._settings.appendToScreen) {
      if (_this.parent) {
        _this.update();
      } else {
        _this.on('attach', () => {
          setTimeout(() => {
            _this.update();
          });
        });
      }
    }

    return _this;
  }
  /**
   * @name                  setRenderInterval
   * @type                  Function
   *
   * This method allows you to simply change the interval timeout between the screen renders process.
   * Note that calling this will change the GLOBAL render screen interval so use with caution...
   *
   * @param       {Number}          interval          The interval between screen rendering processes in ms
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SComponent, [{
    key: "setRenderInterval",
    value: function setRenderInterval(interval) {// clearInterval(SComponent._renderInterval);
      // SComponent._renderInterval = setInterval(() => {
      //   if (!this.isDisplayed()) return;
      //   (global.screen || this.screen).render();
      // }, interval);
    }
    /**
     * @name                  attach
     * @type                  Function
     *
     * This method simply append the component to the generated screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "attach",
    value: function attach(to) {
      if (to === void 0) {
        to = null;
      }

      if (__isChildProcess()) return;

      if (to) {
        to.append(this);
        return;
      }

      (global.screen.container || global.screen).append(this);
    }
    /**
     * @name                  update
     * @type                  Function
     *
     * This method simply update the screen if the component is a child of one
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "update",
    value: function update() {
      if (this.isDestroyed()) return;

      if (!this._allowRender) {
        clearTimeout(this._updateTimeout);
        this._updateTimeout = setTimeout(() => {
          this.update();
        }, 20);
        return;
      }

      this._allowRender = false;
      if (this._screen) this._screen.render();
    }
    /**
     * @name                isDisplayed
     * @type                Function
     *
     * Check if the component is in the display list of the screen
     *
     * @return      {Boolean}             true if is displayed, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "isDisplayed",
    value: function isDisplayed() {
      return this._isDisplayed;
    }
    /**
     * @name                  isDestroyed
     * @type                  Function
     *
     * Check if the component (screen) has been destroyed
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this._destroyed === true;
    }
    /**
     * @name                  allowRender
     * @type                  Function
     *
     * Check if the component allow a render at this particular time
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "allowRender",
    value: function allowRender() {
      clearTimeout(this._updateTimeout);
      this._updateTimeout = setTimeout(() => {
        this.update();
      }, 20);
      return this._allowRender;
    }
  }]);

  return SComponent;
}(__blessed.box), _defineProperty(_class, "_renderInterval", null), _temp);