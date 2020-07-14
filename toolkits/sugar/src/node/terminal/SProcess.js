const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __SCommand = require('./SCommand');
const __sugarConfig = require('../config/sugar');

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
module.exports = class SProcess {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the process settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name              _commands
   * @type              Object
   * @private
   *
   * This is an object that store the available commands in this process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commands = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(commands, settings = {}) {
    // save the settings
    const _settings = __deepMerge({}, settings);

    // init the SPromise class
    this._promise = new __SPromise((resolve, reject, trigger, cancel) => {
      this.resolve = resolve.bind(this);
      this.reject = reject.bind(this);
      this.trigger = trigger.bind(this);
      this.cancel = cancel.bind(this);
    }, {}).start();
    this.on = this._promise.on.bind(this._promise);

    // make sure the passed commands are valid
    if (!Array.isArray(commands)) {
      commands = [commands];
    }
    let newCommandsObj = {};
    commands.forEach((command, i) => {
      if (typeof command === 'string') {
        newCommandsObj[`command${i + 1}`] = {
          command,
          color:
            Object.keys(__sugarConfig('terminal.colors'))[i + 1].color ||
            'yellow',
          run: true
        };
      } else if (
        typeof command === 'object' &&
        command.command &&
        command.name
      ) {
        newCommandsObj[command.name] = command;
      } else if (typeof command === 'object') {
        newCommandsObj = {
          ...newCommandsObj,
          ...command
        };
      }
    });
    commands = newCommandsObj;

    // save commands
    this._biggestCommandName = Object.keys(commands)[0];
    Object.keys(commands).forEach((commandName) => {
      if (commandName.length > this._biggestCommandName.length)
        this._biggestCommandName = commandName;
      const commandObj = commands[commandName];
      if (commandObj instanceof __SCommand) {
        this._commands[commandName] = commandObj;
      } else {
        if (typeof commandObj === 'string') {
          this._commands[commandName] = new __SCommand(
            commandName,
            commandObj,
            {}
          );
        } else if (typeof commandObj === 'object' && commandObj.command) {
          const commandSettings = Object.assign({}, commandObj);
          delete commandSettings.command;
          this._commands[commandName] = new __SCommand(
            commandName,
            commandObj.command,
            commandSettings || {}
          );
        }
      }
    });

    // pipe the commands promises to this process promise
    this._pipeCommandsPromises();

    // save settings
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
  _pipeCommandsPromises() {
    // loop on each commands
    Object.keys(this._commands).forEach((name) => {
      const command = this._commands[name];
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
  get biggestCommandName() {
    let biggestCommandName = Object.keys(this.commands) || '';
    const biggestName = Object.keys(this.commands).forEach((name) => {
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
  get commands() {
    return this._commands;
  }

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
  run(command) {
    if (typeof command === 'string') {
      if (!this._commands[command]) {
        throw new Error(
          `You try to launch the command named "${command}" but it does not exists in this SProcess instance. Here's the available commands:\n${Object.keys(
            this._commands
          ).join('\n- ')}`
        );
      }
      command = this._commands[command];
    } else if (!command.run) {
      throw new Error(
        `You try to launch a command but it seems that the passed one is not an instance of the SCommand class...`
      );
    }

    // return the promise
    return command.run();
  }
};
