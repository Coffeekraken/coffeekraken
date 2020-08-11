"use strict";

var _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../object/deepMerge');

var __SPromise = require('../promise/SPromise');

var __SCommand = require('./SCommand');

var __sugarConfig = require('../config/sugar');
/**
 * @name                    SProcess
 * @namespace           node.terminal
 * @type                    Class
 *
 * TODO: documentation
 *
 * @param           {String}          commands         The commands that you want to be available in this process. The format is { name: command }
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - type (default) {String}: This specify the type of process you want. It can be:
 *    - default: Simple process that does not launch anything by default
 *    - steps: This describe a step by step process that will automatically launch the first command and run the next after next ones
 * - keys ({}) {Object}: This describe the keyboard hotkeys associated with this process. Each hotkey has to be described with these properties:
 *    - key: Specify the key to listen for
 *    - type: Can be either "toggle", "run" or "action"
 *        - toggle: Simply toggle the "value" property in the key object to true/false
 *        - run: Simply launch the associated command by specifying the property "command" with the command name wanted
          - action: Does nothing by default. Simply specify the action name you want in the "action" property and you'll get access to that by listening "key.action" on the promise
      - menu: Specify the text wanted in the menu when using this class with an SProcessPanel instance
      - action: Specify an action name when the type is "action"
      - command: Specify a command name to run when the type is "run"
 *
 * @example         js
 * const SProcess = require('@coffeekraken/sugar/node/terminal/SProcess');
 * const app = new SProcess({
 *    install: {
 *      command: 'npm install something'
 *    }
 * }, {
 *    // some settings here...
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = (_temp = /*#__PURE__*/function () {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the process settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */

  /**
   * @name              _commands
   * @type              Object
   * @private
   *
   * This is an object that store the available commands in this process
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
  function SProcess(commands, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SProcess);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_commands", {});

    // save the settings
    var _settings = __deepMerge({}, settings); // init the SPromise class


    this._promise = new __SPromise((resolve, reject, trigger, cancel) => {
      this.resolve = resolve.bind(this);
      this.reject = reject.bind(this);
      this.trigger = trigger.bind(this);
      this.cancel = cancel.bind(this);
    }, {}).start();
    this.on = this._promise.on.bind(this._promise); // make sure the passed commands are valid

    if (!Array.isArray(commands)) {
      commands = [commands];
    }

    var newCommandsObj = {};
    commands.forEach((command, i) => {
      if (typeof command === 'string') {
        newCommandsObj["command".concat(i + 1)] = {
          command,
          color: Object.keys(__sugarConfig('terminal.colors'))[i + 1].color || 'yellow',
          run: true
        };
      } else if (typeof command === 'object' && command.command && command.name) {
        newCommandsObj[command.name] = command;
      } else if (typeof command === 'object') {
        newCommandsObj = _objectSpread(_objectSpread({}, newCommandsObj), command);
      }
    });
    commands = newCommandsObj; // save commands

    this._biggestCommandName = Object.keys(commands)[0];
    Object.keys(commands).forEach(commandName => {
      if (commandName.length > this._biggestCommandName.length) this._biggestCommandName = commandName;
      var commandObj = commands[commandName];

      if (commandObj instanceof __SCommand) {
        this._commands[commandName] = commandObj;
      } else {
        if (typeof commandObj === 'string') {
          this._commands[commandName] = new __SCommand(commandName, commandObj, {});
        } else if (typeof commandObj === 'object' && commandObj.command) {
          var commandSettings = Object.assign({}, commandObj);
          delete commandSettings.command;
          this._commands[commandName] = new __SCommand(commandName, commandObj.command, commandSettings || {});
        }
      }
    }); // pipe the commands promises to this process promise

    this._pipeCommandsPromises(); // save settings


    this._settings = _settings;
  }
  /**
   * @name                _pipeCommandsPromises
   * @type                Function
   * @private
   *
   * This methods pipe all the SCommand promises to this process promise
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */


  _createClass(SProcess, [{
    key: "_pipeCommandsPromises",
    value: function _pipeCommandsPromises() {
      // loop on each commands
      Object.keys(this._commands).forEach(name => {
        var command = this._commands[name];

        __SPromise.pipe(command, this);
      });
    }
    /**
     * @name                biggestCommandName
     * @type                String
     * @get
     *
     * Get the biggest command name passed in constructor
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "run",

    /**
     * @name                  run
     * @type                  Function
     * @async
     *
     * This method is used to run the command
     *
     * @param         {SCommand|String}      command             The SCommand instance to run or the name under which it is stored in the commands object
     * @return        {SPromise}                          An SPromise instance on which you can subscribe for some events listed bellow and that will be resolved once the command is successfully finished
     * - data: Triggered when some data are logged in the child process
     * - error: Triggered when something goes wrong in the child process
     * - exit: Triggered when the child process has been exited
     * - close: Triggered when the child process has been closed
     * - success: Triggered when the child process has finished with success
     * - kill: Triggered when the child process has been killed
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function run(command) {
      if (typeof command === 'string') {
        if (!this._commands[command]) {
          throw new Error("You try to launch the command named \"".concat(command, "\" but it does not exists in this SProcess instance. Here's the available commands:\n").concat(Object.keys(this._commands).join('\n- ')));
        }

        command = this._commands[command];
      } else if (!command.run) {
        throw new Error("You try to launch a command but it seems that the passed one is not an instance of the SCommand class...");
      } // return the promise


      return command.run();
    }
  }, {
    key: "biggestCommandName",
    get: function get() {
      var biggestCommandName = Object.keys(this.commands) || '';
      var biggestName = Object.keys(this.commands).forEach(name => {
        if (name.length > biggestCommandName.length) biggestCommandName = name;
      });
      return biggestCommandName;
    }
    /**
     * @name                commands
     * @type                Object
     * @get
     *
     * Access the commands object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "commands",
    get: function get() {
      return this._commands;
    }
  }]);

  return SProcess;
}(), _temp);