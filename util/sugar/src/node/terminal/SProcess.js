const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');
const __commandExists = require('command-exists');

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
 *    install: {
 *      command: 'npm install something',
 *      concurrent: false
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
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        commands: {},
        keys: {
          clear: {
            key: 'x',
            type: 'action',
            menu: 'Clear',
            action: 'clear'
          },
          kill: {
            key: 'k',
            type: 'action',
            menu: 'Kill',
            action: 'kill'
          }
        }
      },
      settings
    );
    // init the SPromise class
    this._promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {
        this.resolve = resolve.bind(this);
        this.reject = reject.bind(this);
        this.trigger = trigger.bind(this);
        this.cancel = cancel.bind(this);
      },
      {
        stacks:
          'data,error,run,key.run,key.kill,key.toggle,key.action,exit,close,success,warning,kill'
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
    Object.keys(this._settings.commands).forEach((name) => {
      const commandObj = this._settings.commands[name];
      this._checkCommand(commandObj.command);
    });
  }

  /**
   * @name                 _checkCommand
   * @type                Function
   * @private
   *
   * This methood takes a command as parameter and return true if it is executable or throw an error if not
   *
   * @param         {String}          command           The command to check
   * @return        {Boolean}                           true if is executable, throw an error if not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _checkCommand(command) {
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
    return true;
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
      __hotkey(`ctrl+${keyObj.key}`, {
        once: keyObj.once
      }).on('key', (key) => {
        switch (keyObj.type) {
          case 'run':
            // run the command
            if (
              this._settings.commands[keyObj.command] &&
              this._settings.commands[keyObj.command].isRunning &&
              this._settings.commands[keyObj.command].promise
            ) {
              this._settings.commands[keyObj.command].promise.cancel();
              this._promise.trigger('key.kill', keyObj);
            } else {
              this.run(keyObj.command);
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
              case 'kill':
                break;
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
   * @name                getKeys
   * @type                Function
   *
   * This method simply return the keys settings property
   * so you can build a UI on top of it
   *
   * @return        {Object}
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  getKeys() {
    return this._settings.keys;
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
   * @name                _getKeyObjectFromCommandName
   * @type                Function
   * @private
   *
   * This method return the key object by searching with the command name
   *
   * @param         {String}          property         The property to search for inside each key objects
   * @param         {Mixed}           value           The value searched
   * @return        {Object}                          The key object or false if not found
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _getKeyObjectByPropery(property, value) {
    for (let i = 0; i < Object.keys(this._settings.keys).length; i++) {
      const obj = this._settings.keys[Object.keys(this._settings.keys)[i]];
      if (obj[property] !== undefined && obj[property] === value) return obj;
    }
  }

  /**
   * @name                  run
   * @type                  Function
   * @async
   *
   * This method is used to run a command specified in the first constructor parameter object
   *
   * @param         {String}         command        The name of the command to run or a command directly
   * @return        {SPromise}                          An SPromise instance on which you can subscribe for some events listed bellow and that will be resolved once the command is successfully finished
   * - data: Triggered when some data are logged in the child process
   * - catch: Triggered when something goes wrong in the child process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(command) {
    const commandObj = this._settings.commands[command];
    if (command.split(' ').length === 1 && !this._settings.commands[command]) {
      throw new Error(
        `You try to run the command named "${command}" but it does not exists in the registered commands. Here's the list of available ones\n- ${Object.keys(
          this._settings.commands
        ).join('\n- ')}`
      );
    } else {
      commandObj.name = command;
    }

    // check if the command can be run depending on the "concurrent" property and the command state
    if (commandObj && commandObj.isRunning && !commandObj.concurrent) {
      this._promise.trigger('warning', {
        ...commandObj,
        warning: `You cannot run the command "${commandObj.name}" twice at the same time...`
      });
      return;
    }

    // search for a key object that correspond to this command
    const keyObjForCurrentCommand = this._getKeyObjectByPropery(
      'command',
      commandObj.name
    );

    if (keyObjForCurrentCommand) {
      keyObjForCurrentCommand.isRunning = true;
    }

    let child;
    const promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {
        this._promise.trigger('run', commandObj);
        // save the start timestamp
        this._durations[commandObj.name] = {
          start: Date.now()
        };
        try {
          // set the command state
          if (commandObj) commandObj.isRunning = true;

          // init the child process
          child = __childProcess.spawn(commandObj.command, {
            shell: true,
            detached: true
          });

          __hotkey('ctrl+c', {
            once: true
          }).on('key', (e) => {
            cancel();
          });

          child.on('exit', (code, signal) => {
            cancel();
            trigger('exit', {
              ...commandObj,
              code,
              signal
            });
            this._promise.trigger('exit', {
              ...commandObj,
              code,
              signal
            });
          });
          child.on('close', (code, signal) => {
            this._durations[commandObj.name].end = Date.now();
            if (keyObjForCurrentCommand) {
              keyObjForCurrentCommand.isRunning = false;
            }
            if (commandObj) commandObj.isRunning = false;
            // resolve(code);
            if (code === 0) {
              this._promise.trigger('success', {
                duration:
                  this._durations[commandObj.name].end -
                  this._durations[commandObj.name].start,
                ...commandObj,
                code,
                signal
              });
            }
            trigger('close', {
              ...commandObj,
              code,
              signal
            });
            this._promise.trigger('close', {
              ...commandObj,
              code,
              signal
            });
          });
          child.on('error', (error) => {
            cancel();
            trigger('error', {
              ...commandObj,
              error
            });
            this._promise.trigger('error', {
              ...commandObj,
              error
            });
          });
          child.stdout.on('data', (value) => {
            trigger('data', {
              ...commandObj,
              data: value.toString()
            });
            this._promise.trigger('data', {
              ...commandObj,
              data: value.toString()
            });
          });
          child.stderr.on('data', (error) => {
            trigger('error', {
              ...commandObj,
              error: error.toString()
            });
            this._promise.trigger('error', {
              ...commandObj,
              error: error.toString()
            });
          });
        } catch (e) {
          cancel();
        }
      },
      {
        stacks: 'data,error,exit,close,kill'
      }
    )
      .on('cancel,finally', () => {
        if (commandObj) {
          commandObj.isRunning = false;
          delete commandObj.promise;
        }
        console.log('KILL');
        child.kill();
        promise.trigger('kill', commandObj);
        this._promise.trigger('kill', commandObj);
      })
      .start();

    // store the promise in the command object
    if (commandObj) {
      commandObj.promise = promise;
    }

    // return the promise
    return promise;
  }
};
