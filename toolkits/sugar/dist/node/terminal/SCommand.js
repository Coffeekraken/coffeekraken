"use strict";

var _class, _temp2;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var __childProcess = require('child_process');

var __deepMerge = require('../object/deepMerge');

var __SPromise = require('../promise/SPromise');

var __hotkey = require('../keyboard/hotkey');

var __uniqid = require('../string/uniqid');

var __argsToString = require('../cli/argsToString');

var __watchCli = require('../../cli/fs/watch.cli');

var __minimatch = require('minimatch');

var __SCli = require('../cli/SCli');

var __spawn = require('../process/spawn');

var __replaceTokens = require('../string/replaceTokens');

var __notifier = require('node-notifier');

var __packageRoot = require('../path/packageRoot');

var __path = require('path');
/**
 * @name            SCommand
 * @namespace           node.terminal
 * @type            Class
 * @extends         SPromise
 *
 * This class define a command that you can launch, subscribe for data, etc...
 *
 * // TODO: settings documentation
 *
 * @param         {String}        name            Specify a simple name for this command
 * @param        {String}         command         The command that this instance has to represent. Can contain some "tokens" like "[port]" that will be replaced with the asked question results
 * @param         {Object}        [settings={}]     Some settings to configure your command
 * - ask (null) {Object|Array}: Specify one or more (Array) questions to ask before running the command. Here's the possible object properties for a question:
 *    - type (summary) {String}: Specify the question type. For now it support:
 *        - summary: This display a list of default values for some properties with the ability to edit each of them.
 *          - items ([]) {Array}: An array of properties object to display.
 *            - id (null) {String}: The id of the property like "port"
 *            - text (null) {String}: The text to display before the property value like "Server port"
 *            - default (null) {Mixed}: The default value for this property
 *    - question (null) {String}: Specify the question to ask to the user
 *
 * @example       js
 * const SCommand = require('@coffeekraken/sugar/node/terminal/SCommand');
 * const myCommand = new SCommand('ls -la', {});
 * myCommand.run();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp2 = _class = /*#__PURE__*/function (_SPromise) {
  _inherits(SCommand, _SPromise);

  var _super = _createSuper(SCommand);

  _createClass(SCommand, null, [{
    key: "getCommandsByName",

    /**
     * @name          _id
     * @type          String
     * @private
     *
     * Store the command generated uniquid
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _name
     * @type          String
     * @private
     *
     * Store the command name
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _command
     * @type          String
     * @private
     *
     * Store the command
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _id
     * @type          String
     * @private
     *
     * Store a unique id that identify the command instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _destroyed
     * @type          String
     * @default       false
     * @private
     *
     * Store the "destroy" state of this command
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _currentProcess
     * @type          Object
     * @private
     *
     * This store the current process object
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _watchProcess
     * @type          childProcess
     * @private
     *
     * This store the watch child process instance
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _processesStack
     * @type          Array
     * @private
     *
     * This store all the runned processes
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _isWatching
     * @type          Boolean
     * @private
     *
     * Store the watching status
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          _commandsStack
     * @type          Array
     * @static
     *
     * This static property store all the commands instances that have been instanciated
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

    /**
     * @name          getCommandsByName
     * @type          Function
     * @static
     *
     * This static methods allows you to get back all the commands instances depending on the passed namespace glob pattern.
     * Each commands can have as setting a "namespace" property that will be used to get the commands back using this method.
     * Note that a command that does not have any namespace cannot be retreived using this command.
     *
     * @param       {String}        name        TThe command name that you want to get back
     * @return      {Array}                                 An array containing all the commands instances that match the namespace pattern passed
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function getCommandsByName(name) {
      var returnCommandsArray = [];

      SCommand._commandsStack.forEach(instance => {
        if (instance.name === name) returnCommandsArray.push(instance);
      }); // return the commands


      return returnCommandsArray;
    }
    /**
     * @name          getCommandsByNamespace
     * @type          Function
     * @static
     *
     * This static methods allows you to get back all the commands instances depending on the passed namespace glob pattern.
     * Each commands can have as setting a "namespace" property that will be used to get the commands back using this method.
     * Note that a command that does not have any namespace cannot be retreived using this command.
     *
     * @param       {String}        namespace        TThe command glob namespace pattern that you want to get back
     * @return      {Array}                                 An array containing all the commands instances that match the namespace pattern passed
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "getCommandsByNamespace",
    value: function getCommandsByNamespace(namespace) {
      var returnCommandsArray = [];
      if (!namespace) return SCommand._commandsStack;

      SCommand._commandsStack.forEach(instance => {
        if (!instance.namespace) return;
        if (__minimatch(instance.namespace, namespace.toLowerCase())) returnCommandsArray.push(instance);
      }); // return the commands


      return returnCommandsArray;
    }
    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }]);

  function SCommand(name, command, settings) {
    var _temp, _this2;

    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SCommand);

    // make sure the arguments are valid
    if (typeof command === 'string') {} else if (command instanceof __SCli) {} else {
      throw new Error("The \"command\" argument of the \"SCommand\" class constructor has to be one of these types: String,SCli...");
    } // init subclass


    (_temp = _this2 = _super.call(this, (resolve, reject, trigger, cancel) => {
      // save this command into the static commands stack
      SCommand._commandsStack.push(_assertThisInitialized(_this2)); // save the parameters


      _this2._name = name;
      _this2._command = command;
      _this2._id = __uniqid(); // init key

      _this2._initKey();
    }, __deepMerge({
      // TODO: documentation settings
      run: false,
      argsObj: {},
      concurrent: false,
      color: 'white',
      before: null,
      after: null,
      title: null,
      notification: {
        successIconPath: __path.join(__packageRoot(__dirname), 'src/data/notifications/success.jpg'),
        errorIconPath: __path.join(__packageRoot(__dirname), 'src/data/notifications/error.jpg'),
        runIconPath: __path.join(__packageRoot(__dirname), 'src/data/notifications/run.jpg')
      },
      summary: true,
      watch: null,
      key: null,
      log: false,
      namespace: null,
      activeSpace: null,
      onKeyPress: null
    }, settings)), _defineProperty(_assertThisInitialized(_this2), "_id", null), _defineProperty(_assertThisInitialized(_this2), "_name", null), _defineProperty(_assertThisInitialized(_this2), "_command", null), _defineProperty(_assertThisInitialized(_this2), "_id", null), _defineProperty(_assertThisInitialized(_this2), "_destroyed", false), _defineProperty(_assertThisInitialized(_this2), "_currentProcess", null), _defineProperty(_assertThisInitialized(_this2), "_watchProcess", null), _defineProperty(_assertThisInitialized(_this2), "_processesStack", []), _defineProperty(_assertThisInitialized(_this2), "_isWatching", false), _temp).start();
    setTimeout(() => {
      if (_this2._settings.watch && !_this2._settings.run) _this2.watch();
      if (_this2._settings.run) setTimeout(_this2.run.bind(_assertThisInitialized(_this2)));
    });
    return _this2;
  }
  /**
   * @name                   name
   * @type                    String
   * @get
   *
   * Get the command name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SCommand, [{
    key: "isRunning",

    /**
     * @name                    isRunning
     * @type                    Function
     *
     * This method return true if the command is currently running, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function isRunning() {
      return this.lastProcessObj && this.lastProcessObj.state === 'running';
    }
    /**
     * @name                    state
     * @type                    String
     * @get
     *
     * Get the state of the last process runned.
     * Can be:
     * - idle
     * - running
     * - killed
     * - success
     * - error
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_initKey",

    /**
     * @name                  _initKey
     * @type                  Function
     * @private
     *
     * This method init the key listening if a settings.key is defined
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function _initKey() {
      __hotkey("shift+".concat(this._settings.key), {
        activeSpace: this._settings.activeSpace || null
      }).on('press', keyObj => {
        if (this.isRunning() && !this._settings.concurrent) {
          this.kill();
        } else if (!this.isRunning()) {
          this.run();
        }
      });
    }
  }, {
    key: "_buildSummaryItems",
    value: function _buildSummaryItems(argsObj, definitionObj) {
      if (argsObj === void 0) {
        argsObj = this._settings.argsObj;
      }

      if (!definitionObj) return false;
      var items = [];
      Object.keys(definitionObj).forEach(argName => {
        var argDefinitionObj = definitionObj[argName];
        var argValue = argsObj[argName] !== undefined ? argsObj[argName] : argDefinitionObj.default;
        if (argDefinitionObj.level !== 1) return;
        items.push({
          id: argName,
          text: argDefinitionObj.description,
          default: argValue
        });
      });
      return items;
    }
    /**
     * @name              isWatching
     * @type              Function
     *
     * Get if this command is currently watching or not
     *
     * @return      {Boolean}             true if watching, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "isWatching",
    value: function isWatching() {
      return this._isWatching;
    }
    /**
     * @name              unwatch
     * @type              Function
     *
     * This methid allows you to stop the watch process if one has been launched
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "unwatch",
    value: function unwatch() {
      if (!this._watchProcess) return;

      this._watchProcess.kill();
    }
    /**
     * @name                  watch
     * @type                  Function
     * @private
     *
     * This method init the watch process passed in the settings.watch object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "watch",
    value: function watch() {
      if (!this._settings.watch) {
        throw new Error("You try to launch the \"watch\" process on the command named \"".concat(this.name, "\" but you don't have specified the \"settings.watch\" configuration object..."));
      }

      this._isWatching = true;
      this.lastProcessObj.stdout.push("Starting the watch process for the command \"<yellow>".concat(this.name, "</yellow>\"..."));
      this.trigger('log', _objectSpread({
        value: this.lastProcessObj.stdout[this.lastProcessObj.stdout.length - 1],
        name: this.name
      }, this.lastProcessObj));

      var commandLine = __argsToString({
        pattern: typeof this._settings.watch === 'object' ? this._settings.watch.pattern : this._settings.watch
      }, __watchCli.definition);

      this._watchProcess = __childProcess.spawn("sugar fs.watch ".concat(commandLine), {
        shell: true,
        env: _objectSpread(_objectSpread({}, process.env), {}, {
          IS_CHILD_PROCESS: true
        })
      });
      var watchTimeout;

      this._watchProcess.stdout.on('data', data => {
        // split the logged value
        if (Object.keys(data).length === 6) return; // @TODO weird protection... to check

        var action = data.toString().split(':')[0];
        var path = data.toString().split(':')[1];

        if (action === 'new') {
          var msg = "A file has been <green>created</green>: <cyan>".concat(path, "</cyan>");
          this.lastProcessObj.stdout.push(msg);
          this.trigger('log', _objectSpread(_objectSpread({
            value: msg,
            name: this.name
          }, this.lastProcessObj), {}, {
            path
          }));
        } else if (action === 'update') {
          var _msg = "A file has been <yellow>updated</yellow>: <cyan>".concat(path, "</cyan>");

          this.lastProcessObj.stdout.push(_msg);
          this.trigger('log', _objectSpread(_objectSpread({
            value: _msg,
            name: this.name
          }, this.lastProcessObj), {}, {
            path
          }));
        } else if (action === 'delete') {
          var _msg2 = "A file has been <red>deleted</red>: <cyan>".concat(path, "</cyan>");

          this.lastProcessObj.stdout.push(_msg2);
          this.trigger('log', _objectSpread(_objectSpread({
            value: _msg2,
            name: this.name
          }, this.lastProcessObj), {}, {
            path
          }));
        }

        if (!this.isRunning()) {
          // check if is already running
          clearTimeout(watchTimeout);
          watchTimeout = setTimeout(() => {
            // build the proper "argsObj"
            var argsObj = {};

            if (typeof this._settings.watch && this._settings.watch.mapToProperty) {
              argsObj[this._settings.watch.mapToProperty] = path;
            } else {
              argsObj.watchPath = path;
            } // run the command


            this.run(argsObj);
          }, 200);
        }
      });

      this._watchProcess.on('error', function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        throw args;
      });

      this._watchProcess.on('close', (code, signal) => {
        this._isWatching = false;
        this.trigger('log', {
          name: this.name,
          value: "The watch process has been stopped"
        });
      });
    }
    /**
     * @name                  kill
     * @type                  Function
     *
     * This method can be used to kill the current running process
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "kill",
    value: function kill() {
      if (!this.isRunning()) return;
      if (!this._currentProcess) return;
      if (!this._currentProcess.childProcessPromise) return;

      this._currentProcess.childProcessPromise.cancel();

      this._currentProcess = null;
    }
    /**
     * @name          destroy
     * @type          Function
     *
     * This method is used to destroy this instance.
     * This mean that you can not run it anymore, you cannot retreive it by using
     * the static "getCommands" method, etc...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "destroy",
    value: function destroy() {
      // update the destroy state
      this._destroyed = true; // remove this command from the static commands stack

      var instanceIdx = SCommand._commandsStack.indexOf(this);

      if (instanceIdx !== -1) {
        SCommand._commandsStack.splice(instanceIdx, 1);
      } // kill current process if is running


      this.kill(); // stop the watch process if is running

      this.unwatch();
    }
    /**
     * @name                  run
     * @type                  Function
     * @async
     *
     * This method is used to run the command
     *
     * @param         {Object}        [args=settings.argsObj]         An optional arguments object for this particular process instance. If not specified, will take the default one passed in the constructor settings
     * @param         {Boolean}       [skipAsk=true]             Specify if you want to skip the "ask" process
     * @return        {SPromise}                          An SPromise instance on which you can subscribe to all the "spawn" function "events" which are:
     * - start: Triggered when the command start a process
     * - close: Triggered when the process is closed
     * - kill: Triggered when the process has been killed
     * - success: Triggered when the process has finished without any error
     * - error: Triggered when the process has had an error
     * - log: Triggered when some data are pushed in the stdout channel
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "run",
    value: function run(argsObj, skipAsk) {
      var _this3 = this;

      if (argsObj === void 0) {
        argsObj = this._settings.argsObj;
      }

      if (skipAsk === void 0) {
        skipAsk = true;
      }

      if (this._destroyed) {
        throw new Error("Sorry but this command named \"".concat(this.name, "\" has been destroyed..."));
      }

      if (this.isRunning() && !this.concurrent) {
        throw new Error("Sorry but the command named \"".concat(this.name, "\" is already running..."));
      }

      var promise = new __SPromise( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (resolve, reject, trigger, cancel) {
          if (_this3._settings.watch) _this3.unwatch(); // check if we have a before function to launch

          if (_this3._settings.before && typeof _this3._settings.before === 'function') {
            var _result = yield _this3._settings.before(_this3);

            if (_result !== true) {
              throw new Error(_result);
            }
          }

          clearTimeout(_this3._currentProcessSuccessTimeout);
          _this3._currentProcess = {};

          if (!skipAsk) {
            if (_this3._command instanceof __SCli) {
              var answer = yield _this3._ask({
                type: 'summary',
                items: _this3._buildSummaryItems(argsObj, _this3._command.definitionObj)
              });
              if (!Array.isArray(answer)) return;
              answer.forEach(item => {
                argsObj[item.id] = item.value;
              });
            }
          } // notification


          if (_this3._settings.notification) {
            __notifier.notify({
              title: _this3.name,
              message: "Starting the command \"".concat(_this3.name, "\""),
              icon: _this3._settings.notification.runIconPath || false,
              // Absolute path (doesn't work on balloons)
              sound: false,
              // Only Notification Center or Windows Toasters
              wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option

            });
          }

          if (_this3._command instanceof __SCli) {
            _this3._currentProcess.childProcessPromise = _this3._runSCli(argsObj);
          } else if (typeof _this3._command === 'string') {
            _this3._currentProcess.childProcessPromise = __spawn(__replaceTokens(_this3._command, argsObj));
          }

          _this3._processesStack.push(_this3._currentProcess);

          if (_this3._settings.log) {
            __SPromise.log(_this3._currentProcess.childProcessPromise, _this3._settings.log === true ? {} : _this3._settings.log);
          } // init the child process


          _this3._currentProcess.childProcessPromise.on('*', (data, stack) => {
            _this3._processesStack[_this3._processesStack.length - 1] = _objectSpread(_objectSpread({}, _this3._processesStack[_this3._processesStack.length - 1]), data && data.process ? data.process : data || {});
          });

          _this3._currentProcess.childProcessPromise.on('close', data => {
            _this3._currentProcess = null;
            console.log("#success sss ".concat(data.code, " - ").concat(data.signal)); // if (data.code === 0 && !data.signal) return;

            if (_this3._settings.notification) {
              __notifier.notify({
                title: _this3.name,
                message: "Command closed with code \"".concat(data.code, "\" and signal ").concat(data.signal),
                icon: _this3._settings.notification.errorIconPath || false,
                // Absolute path (doesn't work on balloons)
                sound: false,
                // Only Notification Center or Windows Toasters
                wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option

              });
            }
          });

          _this3._currentProcess.childProcessPromise.on('success', () => {
            if (_this3._settings.notification) {
              __notifier.notify({
                title: _this3.name,
                message: "Command finished successfully!",
                icon: _this3._settings.notification.successIconPath || false,
                // Absolute path (doesn't work on balloons)
                sound: false,
                // Only Notification Center or Windows Toasters
                wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option

              });
            }

            _this3._currentProcessSuccessTimeout = setTimeout(() => {
              if (_this3._settings.watch) _this3.watch();
            }, 2000);
          });

          _this3._currentProcess.childProcessPromise.on('error', () => {
            if (_this3._settings.notification) {
              __notifier.notify({
                title: _this3.name,
                message: "Error!",
                icon: _this3._settings.notification.errorIconPath || false,
                // Absolute path (doesn't work on balloons)
                sound: false,
                // Only Notification Center or Windows Toasters
                wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option

              });
            }
          }); // check if we have an after function to launch


          if (_this3._settings.after && typeof _this3._settings.after === 'function') {
            var _result2 = yield _this3._settings.after(_this3);

            if (_result2 !== true) {
              throw new Error(_result2);
            }
          }

          var result = yield _this3._currentProcess.childProcessPromise;
          resolve(result);
        });

        return function (_x, _x2, _x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }()).start();

      __SPromise.pipe(this._currentProcess.childProcessPromise, promise, {
        processor: (value, stacks) => {
          value.name = this.name;
          return value;
        }
      });

      __SPromise.pipe(this._currentProcess.childProcessPromise, this, {
        processor: (value, stacks) => {
          value.name = this.name;
          return value;
        }
      }); // return the promise


      return promise;
    }
    /**
     * @name                _runSCli
     * @type                Function
     * @async
     *
     * This method run a SCli based command
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_runSCli",
    value: function _runSCli(argsObj) {
      if (argsObj === void 0) {
        argsObj = {};
      }

      return this._command.run(argsObj);
    }
    /**
     * @name                  _ask
     * @type                  Function
     * @async
     *
     * This method take care of asking something to the user ans return back the user answer.
     *
     * @param         {Object}        question      The question object that describe what to ask. Here's the list of properties available:
     * - question (null) {String}: Specify the question to ask
     * - type (yesOrNo) {String}: Specify the type of question to ask. Can be only "yesOrNo" for now but more to come...
     * @return        {SPromise}                An SPromise instance that will be resolved once the question has been answered
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "_ask",
    value: function _ask(question) {
      var _this = this;

      return new __SPromise((resolve, reject, trigger, cancel) => {
        switch (question.type) {
          case 'summary':
            this.trigger('ask', {
              name: this.name,

              get commandInstance() {
                return _this;
              },

              resolve,
              reject,
              items: question.items,
              question: question.question || "Are that command details ok for you? (y/n)",
              type: 'summary'
            });
            break;
        }
      }, {
        cancelDefaultReturn: '__canceled__'
      }).start();
    }
    /**
     * @name                 _check
     * @type                Function
     * @private
     *
     * This methood takes a command as parameter and return true if it is executable or throw an error if not
     *
     * @return        {Boolean}                           true if is executable, throw an error if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // _check() {
    //   let extension, executable;
    //   if (__isPath(this._command, true)) {
    //     // get the file extension
    //     extension = __extension(this._command);
    //     executable = this._getExecutableFromExtension(extension);
    //   } else if (typeof this._command === 'string') {
    //     // treat this as a command
    //     executable = this._command.split(' ').slice(0, 1);
    //   } else {
    //     // the passed process value is not something usable...
    //     throw new Error(
    //       `The passed command "<primary>${this._command}</primary>" is not something usable...`
    //     );
    //   }
    //   // check if the command needed to launch this script is available
    //   if (!__commandExists.sync(executable)) {
    //     throw new Error(
    //       `Sorry but the executable "${executable}" needed to launch the command named "${this._name}" is not installed on your machine...`
    //     );
    //   }
    //   return true;
    // }

  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
     * @name                   title
     * @type                    String
     * @get
     *
     * Get the command title if specified in the settings
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "title",
    get: function get() {
      return this._settings.title;
    }
    /**
     * @name                   key
     * @type                    String
     * @get
     *
     * Get the command key
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "key",
    get: function get() {
      return this._settings.key;
    }
    /**
     * @name                   namespace
     * @type                    String
     * @get
     *
     * Get the command namespace
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "namespace",
    get: function get() {
      return this._settings.namespace.toLowerCase();
    }
    /**
     * @name                   color
     * @type                    String
     * @get
     *
     * Get the command color
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "color",
    get: function get() {
      return this._settings.color;
    }
  }, {
    key: "state",
    get: function get() {
      return this.lastProcessObj ? this.lastProcessObj.state : 'idle';
    }
    /**
     * @name                    concurrent
     * @type                    Function
     * @get
     *
     * This method return true if the command can be concurrent, false if not
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "concurrent",
    get: function get() {
      return this._settings.concurrent;
    }
    /**
     * @name                   command
     * @type                    String
     * @get
     *
     * Get the command command
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "command",
    get: function get() {
      return this._command;
    }
    /**
     * @name                  lastProcessObj
     * @type                  Object
     * @get
     *
     * Get the last process. It can be the running one as well as a finished one
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "lastProcessObj",
    get: function get() {
      if (!this._processesStack.length) {
        if (!this._processObjWhenNoLastOne) this._processObjWhenNoLastOne = {
          stdout: [],
          stderr: []
        };
        return this._processObjWhenNoLastOne;
      }

      return this._processesStack[this._processesStack.length - 1];
    }
    /**
     * @name                  runningProcessObj
     * @type                  Object
     * @get
     *
     * Get the running process.
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "runningProcessObj",
    get: function get() {
      if (this.isRunning()) return this._currentProcess;
      return null;
    }
    /**
     * @name                  processesStack
     * @type                  Array
     * @get
     *
     * Get all the runned/ing processes objects
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "processesStack",
    get: function get() {
      return this._processesStack;
    }
  }]);

  return SCommand;
}(__SPromise), _defineProperty(_class, "_commandsStack", []), _temp2);