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
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');
const __commandExists = require('command-exists');
const __get = require('../object/get');
const __set = require('../object/set');
const __awaitSpawn = require('await-spawn');

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
 *
 * @example         js
 * const SProcess = require('@coffeekraken/sugar/node/terminal/SProcess');
 * const app = new SProcess({
 *    install: 'npm install something'
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
   * Store the commands available in this process
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
    // save the commands
    this._commands = commands;
    // save the settings
    const _settings = __deepMerge({}, settings);
    // init the SPromise class
    this._promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {
        this.resolve = resolve.bind(this);
        this.reject = reject.bind(this);
        this.trigger = trigger.bind(this);
        this.cancel = cancel.bind(this);
      },
      {
        stacks: 'data,error,run,toggle'
      }
    ).start();
    this.on = this._promise.on.bind(this);

    // save settings
    this._settings = _settings;

    // check the commands
    this._checkCommands();

    // check keys
    this._checkKeys();

    // init keys
    this._initKeys();
    process.stdin.resume();
  }

  /**
   * @name                _checkCommands
   * @type                Function
   * @private
   *
   * This method simply take the passed command(s) and check that they are all runnable
   * depending on the installed tools on your machine
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _checkCommands() {
    Object.keys(this._commands).forEach((name) => {
      const command = this._commands[name];
      let extension, executable;
      if (__isPath(command, true)) {
        // get the file extension
        extension = __extension(command);
        executable = this._getExecutableFromExtension(extension);
      } else if (typeof command === 'string') {
        // treat this as a command
        executable = command.split(' ').slice(0, 1);
      } else {
        // the passed process value is not something usable...
        throw new Error(
          `The passed command "<primary>${command}</primary>" is not something usable...`
        );
      }

      // check if the command needed to launch this script is available
      if (!__commandExists.sync(executable)) {
        throw new Error(
          `Sorry but the executable "${executable}" needed to launch the command named "${name}" is not installed on your machine...`
        );
      }
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
        case 'toggle':
          if (!keyObj.path) {
            throw new Error(
              `You try to register a key named "${keyName}" of type "toggle" but you forget to specify the "path" property that specify which property of your class to toggle using this key...`
            );
          }
          break;
        default:
          throw new Error(`You try to register a key named "${keyName}" of type "${keyObj.type}" but this type does not exist... Here's the list of keys type that you can register:
          - run
          - toggle
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
      __hotkey(keyObj.key, {
        once: keyObj.once
      }).on('key', (key) => {
        switch (keyObj.type) {
          case 'run':
            // run the command
            this.run(keyObj.command);
            this._promise.trigger('run', keyObj);
            break;
          case 'toggle':
            __set(this, keyObj.path, !__get(this, keyObj.path));
            this._promise.trigger('toggle', {
              ...keyObj,
              value: __get(this, keyObj.path)
            });
            break;
        }
      });
    });
  }

  /**
   * @name                _getExecutableFromExtension
   * @type                Function
   * @private
   *
   * Return the executable to use in order to execute the passed file extension
   *
   * @param         {String}        extension       The file extension to get the executable for
   * @return        {String}                        The executable command to execute the file extension passed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getExecutableFromExtension(extension) {
    switch (extension.toLowerCase()) {
      case 'js':
      case 'jsx':
        return 'node';
        break;
      case 'php':
      default:
        return extension.toLowerCase();
        break;
    }
  }

  /**
   * @name                  run
   * @type                  Function
   * @async
   *
   * This method is used to run a command specified in the first constructor parameter object
   *
   * @param         {String}         commandName        The name of the command to run
   * @return        {SPromise}                          An SPromise instance on which you can subscribe for some events listed bellow and that will be resolved once the command is successfully finished
   * - data: Triggered when some data are logged in the child process
   * - catch: Triggered when something goes wrong in the child process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(commandName) {
    if (!this._commands[commandName]) {
      throw new Error(
        `You try to run the command named "${commandName}" but it does not exists in the registered commands. Here's the list of available ones\n- ${Object.keys(
          this._commands
        ).join('\n- ')}`
      );
    }
    return new __SPromise(
      (resolve, reject, trigger, cancel) => {
        const child = __awaitSpawn(this._commands[commandName], {
          shell: true
        });
        child.catch((e) => {
          reject(e);
        });
        child.then((result) => {
          resolve(result);
          this._promise.trigger('then', {
            command: commandName,
            result: result.toString()
          });
        });
        child.child.stdout.on('data', (value) => {
          trigger('data', value);
          this._promise.trigger('data', value);
        });
        child.child.stderr.on('data', (error) => {
          trigger('error', error);
        });
      },
      {
        stacks: 'data,error'
      }
    );
  }
};
