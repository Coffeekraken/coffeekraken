const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');
const __filter = require('../object/filter');
const __wait = require('../time/wait');
const __SCommand = require('./SCommand');
const __sugarConfig = require('../config/sugar');

/**
 * @name                    SProcess
 * @namespace               sugar.node.terminal
 * @type                    Class
 *
 * This class is the base for a "process" that will be either integrated into an SApp based application, or that will be launched
 * natively in the terminal. This class gives you these features:
 * - Support for togglable options like "watch", etc...
 * - Check if your system has the requested dependencies to run the process correctly
 * -
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
   * @name              _durations
   * @type              Object
   * @private
   *
   * This is an object that store the start and end timestamp of each commands last run
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _durations = {};

  /**
   * @name              _askPromises
   * @type              Array
   * @private
   *
   * This is an array that store all the current ask promises
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _askPromises = [];

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
    const _settings = __deepMerge(
      {
        type: 'default',
        keys: {
          clear: {
            key: 'x',
            type: 'action',
            menu: 'Clear',
            action: 'clear'
          }
        }
      },
      settings
    );
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
            Object.keys(__sugarConfig('terminal.colors'))[i + 1] || 'yellow',
          run: true
        };
        _settings.keys[`command${i + 1}`] = {
          key: i + 1,
          type: 'run',
          command: `command${i + 1}`,
          menu: `${command.substr(0, 10) + (command.length > 10 ? '...' : '')}`
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
        this._commands[commandName] = new __SCommand(
          commandName,
          commandObj.command,
          commandObj
        );
      }
    });

    // pipe the commands promises to this process promise
    this._pipeCommandsPromises();

    // save settings
    this._settings = _settings;

    // check keys
    this._checkKeys();

    // init keys
    this._initKeys();

    this._listenCommandActions();

    // switch on process type to handle it properly
    setTimeout(() => {
      switch (this._settings.type) {
        // case 'steps':
        //   (async () => {
        //     const results = {};
        //     for (let i = 0; i < Object.keys(this._commands).length; i++) {
        //       const command = Object.keys(this._commands)[i];
        //       // console.log(command);
        //       // const res = await this.run(command);
        //       // console.log('res', res);
        //       // results[command] = res;
        //       // await __wait(100);
        //     }
        //     console.log('difin', results);
        //     this._promise.resolve(results);
        //   })();
        //   break;
        default:
          break;
      }
    });

    process.stdin.resume();
  }

  /**
   * @name                _listenCommandActions
   * @type                Function
   * @private
   *
   * This method listen for the process commands actions
   * in order to maintain some states like the keys states up to date
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _listenCommandActions() {
    Object.keys(this._commands).forEach((name) => {
      const command = this._commands[name];
      command.on('run', (data) => {
        // set the isRunning state of the keys associated to this command
        Object.keys(this.keys).forEach((keyName) => {
          const keyObj = this.keys[keyName];
          if (keyObj.type === 'run' && keyObj.command === data.command.name) {
            keyObj._isRunning = true;
          }
        });
      });
      command.on('kill,success', (data) => {
        // set the isRunning state of the keys associated to this command
        Object.keys(this.keys).forEach((keyName) => {
          const keyObj = this.keys[keyName];
          if (keyObj.type === 'run' && keyObj.command === data.command.name) {
            keyObj._isRunning = false;
          }
        });
      });
    });
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
      [
        'run',
        'close',
        'success',
        'error',
        'ask',
        'answer',
        'data',
        'kill'
      ].forEach((name) => {
        command.on(name, (data) => {
          this.trigger(name, data);
        });
      });
    });
  }

  /**
   * @name                _checkKeys
   * @type                Function
   * @private
   *
   * This method simply check that the passed keys are valid
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _checkKeys() {
    // loop on each keys to be inited
    Object.keys(this._settings.keys || {}).forEach((keyName) => {
      const keyObj = this._settings.keys[keyName];
      switch (keyObj.type) {
        case 'run':
          if (!keyObj.command) {
            throw new Error(
              `You try to register a key named "${keyName}" of type "run" but you forget to specify the "command" property that specify which command to run using this key...`
            );
          }
          break;
        case 'action':
          break;
        case 'toggle':
          break;
        default:
          throw new Error(`You try to register a key named "${keyName}" of type "${keyObj.type}" but this type does not exist... Here's the list of keys type that you can register:
          - run
          - toggle
          - action
          `);
          break;
      }
    });
  }

  /**
   * @name                _initKeys
   * @type                Function
   * @private
   *
   * Init the keys bindings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initKeys() {
    // loop on each keys to be inited
    Object.keys(this._settings.keys || {}).forEach((keyName) => {
      const keyObj = this._settings.keys[keyName];
      let keyString = `ctrl+${keyObj.key}`;
      if (typeof keyObj.key === 'number') {
        keyString = keyObj.key;
      }
      __hotkey(keyString, {
        once: keyObj.once
      }).on('key', (key) => {
        switch (keyObj.type) {
          case 'run':
            // run the command
            if (
              this._commands[keyObj.command] &&
              this._commands[keyObj.command].isRunning()
            ) {
              this._commands[keyObj.command].kill();
              this._promise.trigger('key.kill', keyObj);
            } else {
              keyObj._runPromise = this.run(this._commands[keyObj.command]);
              this._promise.trigger('key.run', keyObj);
            }
            break;
          case 'toggle':
            if (keyObj.value === undefined) keyObj.value = false;
            keyObj.value = !keyObj.value;
            this._promise.trigger('key.toggle', keyObj);
            break;
          case 'action':
            switch (keyObj.action) {
              default:
                this._promise.trigger('key.action', keyObj);
                break;
            }
            break;
        }
      });
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
   * @name                keys
   * @type                Function
   * @get
   *
   * Access the setted keys
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get keys() {
    return this._settings.keys || {};
  }

  // /**
  //  * @name                _getKeyObjectFromCommandName
  //  * @type                Function
  //  * @private
  //  *
  //  * This method return the key object by searching with the command name
  //  *
  //  * @param         {String}          property         The property to search for inside each key objects
  //  * @param         {Mixed}           value           The value searched
  //  * @return        {Object}                          The key object or false if not found
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _getKeyObjectByPropery(property, value) {
  //   for (let i = 0; i < Object.keys(this._settings.keys).length; i++) {
  //     const obj = this._settings.keys[Object.keys(this._settings.keys)[i]];
  //     if (obj[property] !== undefined && obj[property] === value) return obj;
  //   }
  // }

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

    // // search for a key object that correspond to this command
    // const keyObjForCurrentCommand = this._getKeyObjectByPropery(
    //   'command',
    //   command.name
    // );

    // return the promise
    return command.run();
  }
};
