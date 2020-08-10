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

const __childProcess = require('child_process');

const __deepMerge = require('../object/deepMerge');

const __blessed = require('blessed');

const __parseHtml = require('./parseHtml');

const __splitEvery = require('../string/splitEvery');

const __countLine = require('../string/countLine');

const __parseSchema = require('../url/parseSchema');

const __sugarConfig = require('../config/sugar');

const __SPanel = require('../terminal/SPanel');

const __packageRoot = require('../path/packageRoot');
/**
 * @name                    SApp
 * @namespace           node.terminal
 * @type                    Class
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @example         js
 * const SApp = require('@coffeekraken/sugar/node/terminal/SApp');
 * const app = new SApp('My Cool Application', {
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_blessed$screen) {
  _inherits(SApp, _blessed$screen);

  var _super = _createSuper(SApp);

  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the application name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the application settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _currentPanes
   * @type              Object
   * @private
   *
   * Store the current panes contents depending on the current url
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
  function SApp(name, settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SApp);

    // save the settings
    const _settings = __deepMerge({
      blessed: {
        screen: {
          smartCSR: true
        }
      }
    }, settings); // extend from blessed.box


    _this = _super.call(this, _settings.blessed.screen); // save settings

    _defineProperty(_assertThisInitialized(_this), "_name", null);

    _defineProperty(_assertThisInitialized(_this), "_settings", {});

    _defineProperty(_assertThisInitialized(_this), "_currentPanes", {});

    _this._settings = _settings; // save the name

    _this._name = name;

    _this.key('C-c', (ch, key) => {
      _this.destroy();
    });

    _this.key('right', e => {
      _this.nextMenu();
    });

    _this.key('left', e => {
      _this.previousMenu();
    }); // render the layout with the current url passed


    setTimeout(() => {
      _this.goTo(_this._settings.homeRoute);
    });
    return _this;
  }
  /**
   * @name                      _getRouteObj
   * @type                      Function
   * @private
   *
   * Get the route configuration object depending on the current url
   *
   * @param         {String}            url             The current url
   * @return        {Object}                            The corresponding route object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SApp, [{
    key: "_getRouteObj",
    value: function _getRouteObj(url) {
      // loop on each routes
      for (let i = 0; i < Object.keys(this._settings.routes).length; i++) {
        // copmpare the url to the route
        const parsedSchema = __parseSchema(url, Object.keys(this._settings.routes)[i]);

        if (parsedSchema.match) {
          return { ...this._settings.routes[Object.keys(this._settings.routes)[i]],
            url,
            params: parsedSchema.params
          };
        }
      } // by default, return false


      return false;
    }
    /**
     * @name                    nextMenu
     * @type                    Function
     *
     * This method allows you to pass to the next menu item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "nextMenu",
    value: function nextMenu() {
      // get the actual menu item index
      const menuUrls = Object.keys(this._settings.menu);
      const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
      if (currentMenuItemIndex === -1 || currentMenuItemIndex === menuUrls.length - 1) return;
      const nextMenuItemUrl = menuUrls[currentMenuItemIndex + 1]; // go to the next menu item

      this.goTo(nextMenuItemUrl);
    }
    /**
     * @name                    previousMenu
     * @type                    Function
     *
     * This method allows you to pass to the next menu item
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "previousMenu",
    value: function previousMenu() {
      // get the actual menu item index
      const menuUrls = Object.keys(this._settings.menu);
      const currentMenuItemIndex = menuUrls.indexOf(this._currentUrl);
      if (currentMenuItemIndex === -1 || currentMenuItemIndex === 0) return;
      const previousMenuItemUrl = menuUrls[currentMenuItemIndex - 1]; // go to the next menu item

      this.goTo(previousMenuItemUrl);
    }
    /**
     * @name                    goTo
     * @type                    Function
     *
     * This method allows you to change the "page" by passing a simple url like 'build/scss' depending on the registered routes in your app.
     *
     * @param         {String}          url           The url to go to
     * @return        {Boolean}                       true if ok, false if something goes wrong like the page does not exist, etc...
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "goTo",
    value: function goTo(url) {
      // get the current route object
      const routeObj = this._getRouteObj(url); // if something goes wrong


      if (!routeObj) return false; // save the current url

      this._currentUrl = url; // render the layout with the current url passed

      this._renderLayout(routeObj);
    }
    /**
     * @name                    isActive
     * @type                    Function
     *
     * This method allows you to check if the passed url is the active one
     *
     * @param       {String}        url            The url to check
     * @return      {Boolean}                       true if is the active one, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "isActive",
    value: function isActive(url) {
      return this._currentUrl === url;
    }
    /**
     * @name                    _renderLayout
     * @type                    Function
     * @private
     *
     * Render the layout with the current content defined by the current route object passed
     *
     * @param           {Object}          routeObj            The current route object to render with the layout
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_renderLayout",
    value: async function _renderLayout(routeObj) {
      let contentPanel, contentProcess;

      if (!this._currentPanes[routeObj.url]) {
        this._currentPanes[routeObj.url] = {}; // creating the panel to host the logs

        contentPanel = new __SPanel({
          beforeLog: () => {
            return '<blue><time/></blue> ';
          }
        }); // switch between the content types that can be:
        // - string: Launch a new child process with the specified command

        const content = await routeObj.content(routeObj.params);

        if (typeof content === 'string') {
          contentProcess = __childProcess.spawn(content, [], {
            env: { ...process.env,
              IS_CHILD_PROCESS: true
            },
            detached: true,
            cwd: __packageRoot(process.cwd()),
            shell: true
          });
          contentProcess.stdout.on('data', data => {
            contentPanel.log(data.toString().split('~').filter(m => m !== ''));
          });
          contentProcess.stderr.on('data', data => {
            contentPanel.log(data.toString().split('~').filter(m => m !== ''));
          });
        } // store the content panel and process for later


        this._currentPanes[routeObj.url].process = contentProcess;
        this._currentPanes[routeObj.url].panel = contentPanel;
      } else {
        // restore the content panel and process
        contentPanel = this._currentPanes[routeObj.url].panel;
        contentProcess = this._currentPanes[routeObj.url].process;
      } // getting the overall layout


      const layout = await this._settings.layout(contentPanel); // rendering the layout to the terminal

      this.append(layout); // render the screen

      this.render();
    }
  }]);

  return SApp;
}(__blessed.screen), _temp);