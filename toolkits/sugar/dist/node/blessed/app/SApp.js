"use strict";

var _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __blessed = require('blessed');

var __deepMerge = require('../../object/deepMerge');

var __color = require('../../color/color');

var __SComponent = require('../SComponent');

var __SHeader = require('../SHeader');

var __SFooter = require('../SFooter');

var __activeSpace = require('../../core/activeSpace');

var __SUrl = require('../../url/SUrl');

var __sugarConfig = require('../../config/sugar');

var __get = require('../../object/get');

var __fs = require('fs');

var __filter = require('../../object/filter');
/**
 * @name                  SApp
 * @namespace           node.blessed.app
 * @type                  Class
 *
 * This class is the main one when you want to create a Sugar terminal based application.
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SApp = require('@coffeekraken/sugar/node/blessed/app/SApp');
 * class MyApp extends SApp {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function (_SComponent) {
  _inherits(SApp, _SComponent);

  var _super = _createSuper(SApp);

  /**
   * @name                  _historyArray
   * @type                  Array
   * @private
   *
   * Store the urls object history
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name                  _pagesStack
   * @type                  Object
   * @private
   *
   * Store the pages instances to reuse them instead of recreate them every
   * page change...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name          _commandsStack
   * @type          Object
   * @private
   *
   * Store the instanciated commands specified in the config
   *
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
  function SApp(settings) {
    var _this;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SApp);

    // store the settings
    settings = __deepMerge({
      id: 'sugarapp',
      name: 'Sugar',
      appendToScreen: true,
      header: {
        title: 'Coffeekraken Sugar based application'
      },
      footer: {}
    }, __sugarConfig(settings.id || 'sugarapp'), settings); // extends parent

    _this = _super.call(this, settings); // save the application instance globally

    _defineProperty(_assertThisInitialized(_this), "_historyArray", []);

    _defineProperty(_assertThisInitialized(_this), "_pagesStack", {});

    _defineProperty(_assertThisInitialized(_this), "_commandsStack", {});

    if (global.SAppInstance) throw new Error("Only 1 instance of the SApp class can be instanciated at the same time...");
    global.SAppInstance = _assertThisInitialized(_this); // check if their some "commands" specified in the config

    if (_this.config('commands') && Object.keys(_this.config('commands')).length) {
      _this._initCommands();
    }

    if (_this._settings.header) {
      _this._headerBox = new __SHeader(_objectSpread({
        style: {
          bg: __color('terminal.primary').toString(),
          fg: __color('terminal.black').toString()
        }
      }, _this._settings.header));

      _this.append(_this._headerBox, true);
    }

    if (_this._settings.footer) {
      _this._footerBox = new __SFooter(_objectSpread({
        style: {
          bg: __color('terminal.primary').toString(),
          fg: __color('terminal.black').toString()
        },
        commands: __filter(_this._commandsStack, commandInstance => {
          return commandInstance._settings.statusBar === true;
        })
      }, _this._settings.footer));

      _this.append(_this._footerBox, true);
    }

    _this._contentBox = __blessed.box({
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      }
    });

    _this.append(_this._contentBox, true); // go to default page


    if (_this.config('pages.default')) {
      _this.goTo(_this.config('pages.default'));
    }

    return _this;
  }
  /**
   * @name            currentUrlObj
   * @type            Object
   * @get
   *
   * Access the current url object.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SApp, [{
    key: "config",

    /**
     * @name            config
     * @type            Function
     *
     * This methods allows you to get some configuration through the setted SConfig instance
     *
     * @param         {String}          dotedPath         The doted path to the config you want to get
     * @return        {Mixed}                             The config getted
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function config(dotedPath) {
      return __get(this._settings, dotedPath);
    }
    /**
     * @name            goTo
     * @type            Function
     *
     * This methods allows you to specify the "url" you want to go to
     *
     * @param         {String}            url               The url you want to go to
     *
     * @example       js
     * myCoolApp.goTo('/something/cool');
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "goTo",
    value: function goTo(url, history) {
      if (history === void 0) {
        history = true;
      }

      // loop on the pages urls available in the config
      var urlsKeys = Object.keys(this.config('pages.urls'));

      for (var i = 0; i < urlsKeys.length; i++) {
        var sUrl = new __SUrl(url, {
          schema: urlsKeys[i]
        });

        if (sUrl.schema.match) {
          this._goTo(sUrl, history);

          break;
        }
      }
    }
    /**
     * @name          back
     * @type          Function
     *
     * This method simply go back 1 url in the history
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "back",
    value: function back() {
      if (this._historyArray.length <= 1) return;

      this._historyArray.splice(-1, 1);

      this._goTo(this._historyArray[this._historyArray.length - 1], false);
    }
    /**
     * @name          _goTo
     * @type          Function
     * @private
     *
     * This is the internal version of the goTo method. It will take care of actualy change the page etc...
     *
     * @param       {SUrl}        sUrl        An SUrl instance to work with
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_goTo",
    value: function _goTo(sUrl, history) {
      if (history === void 0) {
        history = true;
      }

      var pageObj = this.config("pages.urls.".concat(sUrl.schema.schema));
      if (!__fs.existsSync(pageObj.page.path.replace('.js', '') + '.js')) throw new Error("SApp: You try to load a page class using the path \"".concat(pageObj.page.path, "\" but no file exists at this location..."));

      var pageClass = require("".concat(pageObj.page.path)); // check if the pageObj exist


      if (!pageObj && this.config('pages.url.404')) {
        // go to 404 page
        this.goTo('/404');
        return;
      } else if (!pageObj) {
        throw new Error("The requested page \"".concat(url, "\" does not exists and you don't have any 404 page defined in your @config.pages configuration..."));
      } // append the new url to the history


      if (history) this._historyArray.push(sUrl); // generate active space string depending on the url.

      var activeSpaceString = sUrl.href.split('/').filter(i => i !== '').join('.'); // set the activeSpace

      __activeSpace.set(activeSpaceString); // check if we have already the page instance


      var currentPageInstance = this._pagesStack[sUrl.schema.schema];

      if (!currentPageInstance) {
        currentPageInstance = new pageClass(pageObj.page.id, pageObj.page.title, pageObj.page.settings);
        this._pagesStack[sUrl.schema.schema] = currentPageInstance;
      } // set args on the page


      var argsObj = {};

      if (sUrl.schema.params) {
        Object.keys(sUrl.schema.params).forEach(paramName => {
          var argValue = sUrl.schema.params[paramName].value;
          if (argValue === null) argValue = pageObj.defaultArgs[paramName];
          argsObj[paramName] = argValue;
        });
      }

      currentPageInstance.setArgs(argsObj); // get the previous page and check if we need to destroy it

      if (this.previousUrlObj) {
        var previousPageInstance = this._pagesStack[this.previousUrlObj.schema.schema];

        if (previousPageInstance !== currentPageInstance) {
          if (previousPageInstance) previousPageInstance.detach();

          if (!previousPageInstance.persistent) {
            previousPageInstance.destroy();
            delete this._pagesStack[this.previousUrlObj.schema.schema];
          }
        }
      } // append the page


      if (!currentPageInstance.parent) this.append(currentPageInstance);
    }
    /**
     * @name          _initCommands
     * @type          Function
     * @private
     *
     * This methods takes the commands classes specified in the configuration
     * and instanciate them to be available through the app
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_initCommands",
    value: function _initCommands() {
      var commandsObj = this.config('commands');
      Object.keys(commandsObj).forEach(commandName => {
        // filter commands using the features.commands config
        if (this.config('features.commands').indexOf(commandName) === -1) return;
        var commandObj = commandsObj[commandName];
        if (!__fs.existsSync(commandObj.path.replace('.js', '') + '.js')) throw new Error("SApp: You try to load a command class using the path \"".concat(commandObj.path, "\" but no file exists at this location..."));

        var commandClass = require("".concat(commandObj.path));

        this._commandsStack[commandName] = new commandClass(commandObj.argsObj, commandObj.settings);
      });
    }
    /**
     * @name          _getProcessInstance
     * @type          Function
     * @private
     *
     * This method take care of retreiving the SProcess instance linked to a certain page/url.
     *
     * @param         {String}          url             The url where the user want to go
     * @param         {String}          rawUrl          The raw url used in the config. This is the url that may content some params like "{what}", etc...
     * @param         {Object}          parsedSchema    The parsed url schema
     * @return        {SProcess}                        The SProcess instance for the passed page/url
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_getProcessInstance",
    value: function _getProcessInstance(url, rawUrl, parsedSchema) {}
    /**
     * @name              exec
     * @type              Function
     *
     * This method takes one or more SCommand instances and execute them.
     * You can also pass as parameter a simple text command like "ls -la" or whatever
     *
     * @param         {String|SCommand|Array}         command         The command(s) to execute
     * @return        {SPromise}                                      An SPromise instance that will be resolved once all the commands are finished
     *
     * @example       js
     * myCoolApp.exec('ls -la');
     *
     * @TODO      Better example
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "exec",
    value: function exec(command) {// if (!Array.isArray(command)) command = [command];
      // const process = new __SProcess(command, {});
      // const processPanel = new __SProcessPanel(process, {});
      // this.append(processPanel);
    }
    /**
     * @name              process
     * @type              Function
     *
     * This method take as parameter an SProcess instance and display it properly
     *
     * @param         {SProcess}         process            The SProcess to display
     *
     * @example       js
     * myCoolApp.process(myCoolProcess);
     *
     * @TODO      Better example
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "process",
    value: function process(_process) {// const processPanel = new __SProcessPanel(process, {});
      // this.append(processPanel);
    }
    /**
     * @name          append
     * @type          Function
     * @override
     *
     * This method simply append some content inside the contentBox
     *
     * @param       {SComponent}        component       The component to add
     * @param       {Boolean}           [ui=false]      Specify if you want to append this component to the ui or in the content box
     * @return      {SApp}                              The SApp instance to maintain chainability
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "append",
    value: function append(component, ui) {
      if (ui === void 0) {
        ui = false;
      }

      if (ui) {
        _get(_getPrototypeOf(SApp.prototype), "append", this).call(this, component);
      } else {
        this._contentBox.append(component);
      }

      this.update();
      return this;
    }
    /**
     * @name          update
     * @type          Function
     * @override
     *
     * This method simply draw the UI on the screen
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "update",
    value: function update() {
      if (this._headerBox) {
        this._headerBox.position.top = 0;
        this._headerBox.position.left = 0;

        if (this._contentBox) {
          this._contentBox.position.top = this._headerBox.height;
        }
      }

      if (this._footerBox) {
        this._footerBox.position.bottom = 0;
        this._footerBox.position.left = 0;

        if (this._contentBox) {
          this._contentBox.position.bottom = this._footerBox.height;
        }
      }

      _get(_getPrototypeOf(SApp.prototype), "update", this).call(this);
    }
  }, {
    key: "currentUrlObj",
    get: function get() {
      if (!this._historyArray.length) return null;
      return this._historyArray[this._historyArray.length - 1];
    }
    /**
     * @name            previousUrlObj
     * @type            Object
     * @get
     *
     * Access the previous url object.
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "previousUrlObj",
    get: function get() {
      if (this._historyArray.length < 2) return null;
      return this._historyArray[this._historyArray.length - 2];
    }
  }]);

  return SApp;
}(__SComponent), _temp);