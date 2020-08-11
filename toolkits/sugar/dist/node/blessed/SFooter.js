"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __blessed = require('blessed');

var __SComponent = require('./SComponent');

var __deepMerge = require('../object/deepMerge');

var __parseHtml = require('../terminal/parseHtml');

var __color = require('../color/color');

var __ora = require('ora');

var __countLine = require('../string/countLine');
/**
 * @name                  SFooter
 * @namespace           node.blessed
 * @type                  Class
 *
 * This class represent a footer that you can add to your blessed based UI
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SFooter = require('@coffeekraken/sugar/node/blessed/SFooter');
 * new SFooter({});
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function (_SComponent) {
  _inherits(SFooter, _SComponent);

  var _super = _createSuper(SFooter);

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  function SFooter(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SFooter);

    _this = _super.call(this, __deepMerge({
      authors: [],
      website: null,
      width: '100%',
      height: 10,
      position: {
        top: '100%-1',
        left: 0
      },
      style: {
        bg: __color('terminal.primary').toString(),
        fg: __color('terminal.black').toString()
      },
      padding: {
        top: 0,
        bottom: 0,
        left: 1,
        right: 0
      }
    }, settings));

    if (_this._settings.authors.length) {
      var authArray = [];

      _this._settings.authors.forEach(auth => {
        authArray.push(auth.name);
      });

      var content = __parseHtml(" Made by <bold>".concat(authArray.join(', '), "</bold>"));

      _this._authorsBox = __blessed.box({
        top: 0,
        right: 0,
        height: 1,
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        style: {
          bg: 'black',
          fg: 'white'
        }
      });

      _this._authorsBox.setContent(content);

      _this.append(_this._authorsBox);
    }

    _this._copyrightBox = __blessed.text({
      left: 0,
      style: {
        bg: _this._settings.style.bg,
        fg: _this._settings.style.fg
      },
      content: __parseHtml("MIT \xA9".concat(new Date().getFullYear(), " Coffeekraken"))
    });

    _this.append(_this._copyrightBox);

    _this._commandsStatusBox = __blessed.text({
      position: {
        right: __countLine(_this._authorsBox.getContent())
      },
      style: {
        bg: _this._settings.style.bg,
        fg: _this._settings.style.fg,
        bg: 'red'
      },
      tags: true
    });

    _this.append(_this._commandsStatusBox); // setTimeout(this.update.bind(this));
    // setInterval(this._updateStatusBar.bind(this), 100);


    return _this;
  }
  /**
   * @name            _updateStatusBar
   * @type            Function
   * @private
   *
   * This method simply update the status bar with the commands statuses
   *
   * @since         2.0.0
   *
   */


  _createClass(SFooter, [{
    key: "_updateStatusBar",
    value: function _updateStatusBar() {
      var commandsStatusTextArray = [];

      for (var key in this._settings.commands) {
        var commandInstance = this._settings.commands[key];

        if (!commandInstance._footerSpinner) {
          commandInstance._footerSpinner = __ora(commandInstance.name);
        }

        if (commandInstance.state === 'running') {
          commandInstance._footerSpinner.color = 'black';
          commandsStatusTextArray.push("{".concat(__color('terminal.cyan').toString(), "-bg} ").concat(commandInstance._footerSpinner.frame(), " (").concat(commandInstance.key, ") {/").concat(__color('terminal.cyan').toString(), "-bg}"));
        } else if (commandInstance.isWatching()) {
          commandInstance._footerSpinner.color = 'black';
          commandsStatusTextArray.push("{".concat(__color('terminal.primary').toString(), "-bg} ").concat(commandInstance._footerSpinner.frame(), " (").concat(commandInstance.key, ") {/").concat(__color('terminal.primary').toString(), "-bg}"));
        } else if (commandInstance.state === 'success') {
          commandInstance._footerSpinner.color = 'black';
          commandsStatusTextArray.push("{".concat(__color('terminal.green').toString(), "-bg} ").concat(commandInstance._footerSpinner.frame(), " (").concat(commandInstance.key, ") {/").concat(__color('terminal.green').toString(), "-bg}"));
        } else if (commandInstance.state === 'error') {
          commandInstance._footerSpinner.color = 'black';
          commandsStatusTextArray.push("{".concat(__color('terminal.red').toString(), "-bg} ").concat(commandInstance._footerSpinner.frame(), " (").concat(commandInstance.key, ") {/").concat(__color('terminal.red').toString(), "-bg}"));
        }
      }

      this._commandsStatusBox.width = __countLine(__blessed.stripTags(commandsStatusTextArray.join('')));
      this._commandsStatusBox.right = __countLine(this._authorsBox.getContent()) + 1;

      this._commandsStatusBox.setContent(commandsStatusTextArray.join(''));
    }
    /**
     * @name            update
     * @type            Function
     * @override
     *
     * This method simply draw the header
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "update",
    value: function update() {
      if (this._authorsBox) {
        this._authorsBox.width = __countLine(this._authorsBox.content) + 1;
      }

      this.position.height = 1; // update status bar
      // this._updateStatusBar();

      _get(_getPrototypeOf(SFooter.prototype), "update", this).call(this);
    }
  }]);

  return SFooter;
}(__SComponent);