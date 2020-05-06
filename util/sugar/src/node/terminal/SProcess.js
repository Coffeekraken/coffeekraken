const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');
const __filter = require('../object/filter');
const __wait = require('../time/wait');
const __SCommand = require('./SCommand');

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
    this._promise = new __SPromise(
      (resolve, reject, trigger, cancel) => {
        this.resolve = resolve.bind(this);
        this.reject = reject.bind(this);
        this.trigger = trigger.bind(this);
        this.cancel = cancel.bind(this);
      },
      {
        stacks:
          'data,error,run,key.run,key.kill,key.toggle,key.action,exit,close,success,warning,kill,ask,answer'
      }
    ).start();
    this.on = this._promise.on.bind(this);

    // save commands
    Object.keys(commands).forEach((commandName) => {
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

    // this._commands = commands;
    // Object.keys(this._commands).forEach((name) => {
    //   this._commands[name].name = name;
    // });

    // pipe the commands promises to this process promise
    this._pipeCommandsPromises();

    // save settings
    this._settings = _settings;

    // check keys
    this._checkKeys();

    // init keys
    this._initKeys();

    // switch on process type to handle it properly
    setTimeout(() => {
      switch (this._settings.type) {
        case 'steps':
          (async () => {
            const results = {};
            for (let i = 0; i < Object.keys(this._commands).length; i++) {
              const command = Object.keys(this._commands)[i];
              // console.log(command);
              // const res = await this.run(command);
              // console.log('res', res);
              // results[command] = res;
              // await __wait(100);
            }
            console.log('difin', results);
            this._promise.resolve(results);
          })();
          break;
        default:
          // Object.keys(
          //   __filter(this._commands, (obj) => {
          //     return obj.run === true;
          //   })
          // ).forEach((name, i) => {
          //   setTimeout(() => {
          //     this.run(name);
          //   }, i * 10);
          // });
          break;
      }
    });

    process.stdin.resume();
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
      command.on('run', (data) => {
        this.trigger('run', data);
      });
      command.on('close', (data) => {
        console.log('CLOSE');
        this.trigger('close', data);
      });
      command.on('success', (data) => {
        this.trigger('success', data);
      });
      command.on('error', (data) => {
        this.trigger('error', data);
      });
      command.on('data', (data) => {
        console.log('DSA');
        this.trigger('data', data);
      });
      command.on('kill', (data) => {
        this.trigger('kill', data);
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
      __hotkey(`ctrl+${keyObj.key}`, {
        once: keyObj.once
      }).on('key', (key) => {
        switch (keyObj.type) {
          case 'run':
            // run the command
            if (
              this._commands[keyObj.command] &&
              this._commands[keyObj.command]._isRunning &&
              this._commands[keyObj.command].promise
            ) {
              this._commands[keyObj.command].promise.resolve();
              this._promise.trigger('key.kill', keyObj);
            } else {
              this.run(this._commands[keyObj.command]);
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
  _ask(question, command) {
    return new __SPromise((resolve, reject, trigger, cancel) => {
      switch (question.type) {
        case 'yesOrNo':
        default:
          this._promise.trigger('ask', {
            question:
              question.querstion ||
              `Would you really like to launch the "${command.name}" command? (y/n)`,
            type: question.type || 'yesOrNo'
          });
          __hotkey('y,n', {
            once: true
          }).on('key', (key) => {
            resolve({
              command,
              value: key === 'y'
            });
          });
          break;
      }
    }).start();
  }

  /**
   * @name                  run
   * @type                  Function
   * @async
   *
   * This method is used to run the command
   *
   * @param         {SCommand}      command             The SCommand instance to run
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
    // search for a key object that correspond to this command
    const keyObjForCurrentCommand = this._getKeyObjectByPropery(
      'command',
      command.name
    );

    // // check if the command can be run depending on the "concurrent" property and the command state
    // if (this._isRunning && !this._settings.concurrent) {
    //   this.trigger(
    //     'warning',
    //     `You cannot run the command "${this._name}" twice at the same time...`
    //   );
    //   return;
    // }

    // check if we need to ask something to the user before running this command
    // if (this._settings.ask) {

    //   this._isAsking = true;

    //   const askPromise = this._ask(commandObj.ask, commandObj);
    //   this._askPromises.push(askPromise);
    //   askPromise.then(() => {
    //     this._askPromises.splice(this._askPromises.indexOf(askPromise), 1);
    //   });
    //   const answer = await askPromise;
    //   delete commandObj._isAsking;
    //   this._promise.trigger('answer', answer);
    //   if (answer.value === false) {
    //     cancel();
    //     return;
    //   }
    // }

    // return the promise
    return command.run();
  }
};
