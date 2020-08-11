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

var __deepMerge = require('../../object/deepMerge');

var __blessed = require('blessed');

var __parseHtml = require('../../terminal/parseHtml');

var __splitEvery = require('../../string/splitEvery');

var __countLine = require('../../string/countLine');

var __uniqid = require('../../string/uniqid');

var __sugarConfig = require('../../config/sugar');

var {
  print,
  stringify
} = require('q-i');

var __SPromise = require('../../promise/SPromise');

var __color = require('../../color/color');

var __hotkey = require('../../keyboard/hotkey');

var __clone = require('../../object/clone');

var __SComponent = require('../SComponent');
/**
 * @name                    SLogPanel
 * @namespace           node.blessed
 * @type                    Class
 *
 * This class define a "panel" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this panel. The name has to stick to this characters only ```[a-zA-Z0-9_-]```
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your panel wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your panel in the terminal. If you have your own screen object
 *
 * @example         js
 * const SLogPanel = require('@coffeekraken/sugar/node/terminal/SLogPanel');
 * const panel = new SLogPanel('my-cool-pannel', {
 * });
 * panel.log('Hello world');
 *
 * @see       https://www.npmjs.com/package/q-i
 * @see       https://www.npmjs.com/package/blessed
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_SComponent) {
  _inherits(SLogPanel, _SComponent);

  var _super = _createSuper(SLogPanel);

  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the panel name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SLogPanel(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SLogPanel);

    // save the settings
    _this = _super.call(this, __deepMerge({
      name: __uniqid(),
      beforeLog: '',
      beforeEachLine: '',
      padBeforeLog: true,
      // input: {
      //   width: 3,
      //   height: 1,
      //   placeholder: null,
      //   bottom: 0,
      //   left: 0,
      //   focus: true,
      //   keys: true,
      //   mouse: true,
      //   inputOnFocus: true,
      //   style: {
      //     fg: __color('terminal.black').toString(),
      //     bg: __color('terminal.yellow').toString()
      //   },
      //   padding: {
      //     top: 0,
      //     left: 1,
      //     right: 1,
      //     bottom: 0
      //   }
      // },
      mouse: true,
      keys: true,
      // vi: true,
      scrollable: true,
      // alwaysScroll: true,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      style: {
        bg: __color('terminal.black').toString(),
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      padding: {
        top: 1,
        bottom: 0,
        left: 1,
        right: 1
      }
    }, settings)); // save the name

    _defineProperty(_assertThisInitialized(_this), "_name", null);

    if (!/^[a-zA-Z0-9\._-\s]+$/.test(_this._settings.name)) {
      throw new Error("The name of an SLog instance can contain only letters like [a-zA-Z0-9_-. ]...");
    }

    _this._name = _this._settings.name; // render the screen

    if (_this.screen) {
      _this.screen.title = _this._name;
    }

    return _this;
  } // /**
  //  * @name                  _input
  //  * @type                  Function
  //  * @private
  //  *
  //  * This method return a pre-configured textbox
  //  *
  //  * @param       {Object}      [settings={}]       A blessed textbox settings object with some additional settings:
  //  * - focus (true) {Boolean}: Specify if you want the input to have focus directly
  //  * - placeholder (null) {String}: Specify a placeholder to set in the input
  //  * @return      {Textbox}             A blessed textbox
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _input(settings = {}) {
  //   settings = __deepMerge(
  //     {
  //       focus: true,
  //       placeholder: null
  //     },
  //     __clone(this._settings.input, true),
  //     settings
  //   );
  //   const input = __blessed.textbox(settings);
  //   input.promise = new __SPromise((resolve, reject, trigger, cancel) => {});
  //   input.on('attach', () => {
  //     setTimeout(() => {
  //       if (settings.focus) input.focus();
  //       let placeholderPressed = false;
  //       if (settings.placeholder) {
  //         const placeholder = settings.placeholder.toString();
  //         input.setValue(placeholder);
  //         input.width =
  //           placeholder.length + input.padding.left + input.padding.right;
  //       }
  //       let isBackspace = false;
  //       input.onceKey('backspace', () => {
  //         isBackspace = true;
  //       });
  //       input.on('keypress', (value) => {
  //         setTimeout(() => {
  //           if (settings.placeholder && !placeholderPressed) {
  //             if (!isBackspace) {
  //               input.setValue(value);
  //             }
  //             placeholderPressed = true;
  //           }
  //           input.width =
  //             input.getValue().length +
  //             input.padding.left +
  //             input.padding.right +
  //             2;
  //           this.update();
  //         });
  //       });
  //       input.on('submit', (value) => {
  //         input.promise.resolve(value);
  //         input.style.bg = __color('terminal.green').toString();
  //         input.width =
  //           input.getValue().length + input.padding.left + input.padding.right;
  //         this.update();
  //       });
  //       input.on('cancel', () => {
  //         input.promise.cancel();
  //         input.style.bg = __color('terminal.red').toString();
  //         input.width =
  //           input.getValue().length + input.padding.left + input.padding.right;
  //         this.update();
  //       });
  //       this.update();
  //     });
  //   });
  //   return input;
  // }
  // /**
  //  * @name                   input
  //  * @type                  Function
  //  *
  //  * Allow to display an input to ask something to the user
  //  *
  //  * @param       {Object}      [settings = {}]       A settings object to configure your input. Here's the available settings:
  //  * - width (100%) {String|Number}: Specify the width of your input
  //  * - height (1) {String|Number}: Specify the height of your input
  //  * - placeholder (null) {String}: Specify a placeholder to display before the user starts to write something
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // input(settings = {}) {
  //   settings = __deepMerge(
  //     this._settings.input,
  //     {
  //       top: this._settings.logBox.content.split('\n').length,
  //       left:
  //         __countLine(__parseHtml(this._settings.beforeLog)) +
  //         __countLine(__parseHtml(this._settings.beforeEachLine))
  //     },
  //     settings
  //   );
  //   const input = this._input(settings);
  //   setTimeout(() => {
  //     const _beforeLog =
  //       __parseHtml(this._settings.beforeLog) +
  //       __parseHtml(this._settings.beforeEachLine);
  //     const beforeBox = __blessed.box({
  //       top: this._settings.logBox.content.split('\n').length,
  //       left: 0,
  //       width: __countLine(_beforeLog),
  //       height: 1,
  //       content: _beforeLog
  //     });
  //     this.log(' ');
  //     this._settings.logBox.append(beforeBox);
  //     this._settings.logBox.append(input);
  //   });
  //   this._settings.logBox.setScrollPerc(100);
  //   return input;
  // }
  // /**
  //  * @name                  summary
  //  * @type                  Function
  //  *
  //  * Allow to display some editable informations in a list format.
  //  * This is usefull when you want to propose to the user some default informations that he can update if wanted
  //  * then send back to the command process
  //  *
  //  * @param      {Object}             settings = {}               A settings object to configure your summary input
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // summary(settings = {}) {}

  /**
   * @name                  log
   * @type                  Function
   *
   * Allow to log some content in the panel
   *
   * @param       {String}        message         The message to log
   * @param       {Object}        [settings={}]   Some settings to override for this particular log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SLogPanel, [{
    key: "log",
    value: function log(message, settings) {
      if (settings === void 0) {
        settings = {};
      }

      if (!Array.isArray(message)) message = [message];

      var logSettings = __deepMerge(this._settings, settings);

      var lines = [];
      message.forEach(m => {
        // check message type
        switch (typeof m) {
          case 'object':
            m = stringify(m);
            break;
        }

        if (Array.isArray(m)) m = stringify(m);
        m = __parseHtml(m || '');
        var beforeLog = logSettings.beforeLog;

        if (beforeLog) {
          if (typeof beforeLog === 'function') {
            beforeLog = beforeLog(m);
          }

          if (typeof beforeLog === 'number') {
            beforeLog = ' '.repeat(parseInt(beforeLog));
          }
        } else {
          beforeLog = '';
        }

        var beforeEachLine = logSettings.beforeEachLine;

        if (beforeEachLine) {
          if (typeof beforeEachLine === 'function') {
            beforeEachLine = beforeEachLine(m);
          }

          if (typeof beforeEachLine === 'number') {
            beforeEachLine = ' '.repeat(parseInt(beforeEachLine));
          }
        } else {
          beforeEachLine = '';
        }

        var formatedBeforeEachLine = __parseHtml(beforeEachLine);

        var formatedBeforeLog = __parseHtml(beforeLog);

        var formatedMessage = m; // split lines

        formatedMessage = formatedMessage.split('\n');
        formatedMessage.map((line, i) => {
          line = __splitEvery(line, this.width - logSettings.padding.left - logSettings.padding.right - __countLine(formatedBeforeLog) - __countLine(formatedBeforeEachLine));
          line = line.map((l, j) => {
            if (i === 0 && j === 0) {
              return formatedBeforeLog + formatedBeforeEachLine + l;
            } else {
              return ' '.repeat(__countLine(formatedBeforeLog)) + formatedBeforeEachLine + l;
            }
          });
          lines = [...lines, ...line];
        }); // append the content to the panel

        this.pushLine(lines.join('\n'));
      });
      this.update();
      this.setScrollPerc(100); // return the lines

      return lines;
    }
  }]);

  return SLogPanel;
}(__SComponent), _temp);