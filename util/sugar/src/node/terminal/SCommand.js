const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __commandExists = require('command-exists');
const __hotkey = require('../keyboard/hotkey');
const __uniqid = require('../string/uniqid');

/**
 * @name            SCommand
 * @namespace       sugar.node.terminal
 * @type            Class
 * @extends         SPromise
 *
 * This class define a command that you can launch, subscribe for data, etc...
 *
 * @param         {String}        name            Specify a simple name for this command
 * @param        {String}         command         The command that this instance has to represent
 * @param         {Object}        [settings={}]     Some settings to configure your command
 * - ask (null) {Object|Array}: Specify one or more (Array) questions to ask before running the command. Here's the possible object properties for a question:
 *    - type (confirm) {String}: Specify the question type. For now it support:
 *        - confirm: This type ask the user if he really want to run this command
 *        - boolean: This type ask the user to answer yes or no (true, false)
 *    - question (null) {String}: Specify the question to ask to the user
 *
 * @example       js
 * const SCommand = require('@coffeekraken/sugar/node/terminal/SCommand');
 * const myCommand = new SCommand('ls -la', {});
 * myCommand.run();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCommand extends __SPromise {
  /**
   * @name          _name
   * @type          String
   * @private
   *
   * Store the command name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name          _command
   * @type          String
   * @private
   *
   * Store the command
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _command = null;

  /**
   * @name          _runningProcess
   * @type          Object
   * @private
   *
   * This store the currently running process if their's one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runningProcess = null;

  /**
   * @name          _lastRunnedProcess
   * @type          Object
   * @private
   *
   * This store the last runned process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _lastRunnedProcess = null;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(name, command, settings = {}) {
    // init subclass
    super(
      (resolve, reject, trigger, cancel) => {
        // save the parameters
        this._name = name;
        this._command = command;
        // check the command
        this._check();
      },
      __deepMerge(
        {
          color: 'white',
          ask: null
        },
        settings
      )
    ).start();
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
  get name() {
    return this._name;
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
  get color() {
    return this._settings.color;
  }

  /**
   * @name                    isRunning
   * @type                    Function
   *
   * This method return true if the command is currently running, false if not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isRunning() {
    return this._runningProcess !== null;
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
  get command() {
    return this._command;
  }

  /**
   * @name                  kill
   * @type                  Function
   *
   * This method can be used to kill the current running process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    if (!this.isRunning()) return;
    if (!this._runningProcess.promise) return;
    this._runningProcess.promise.cancel();
  }

  /**
   * @name                  run
   * @type                  Function
   * @async
   *
   * This method is used to run the command
   *
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
  run() {
    if (this.isRunning()) {
      throw new Error(
        `Sorry but the command named "${this.name}" is already running...`
      );
    }

    this._runningProcess = {
      id: __uniqid(),
      start: Date.now(),
      end: null,
      duration: null,
      stdout: [],
      stderr: [],
      promise: null
    };
    const _this = this;
    let command = this._command;

    let childProcess;
    const promise = new __SPromise(async (resolve, reject, trigger, cancel) => {
      // check if we need to ask some questions before running the command
      if (this._settings.ask) {
        let askStack = this._settings.ask;
        if (askStack.type) {
          askStack = {
            default: askStack
          };
        }

        for (let i = 0; i < Object.keys(askStack).length; i++) {
          let askObj = askStack[Object.keys(askStack)[i]];
          const answer = await this._ask(askObj);
          if (answer === '__canceled__') {
            cancel();
            return;
          }
          askObj = {
            get command() {
              return _this;
            },
            answer,
            ...askObj
          };
          askStack[Object.keys(askStack)[i]] = askObj;
          this.trigger('answer', askObj);
          if (askObj.type === 'confirm' && askObj.answer === false) {
            cancel();
            return;
          }
        }

        Object.keys(askStack).forEach((askName) => {
          const askObj = askStack[askName];
          command = command.replace(`[${askName}]`, askObj.answer);
        });
      }

      try {
        // emit a run stack event
        this.trigger('run', {
          get command() {
            return _this;
          },
          ...this._runningProcess
        });

        // init the child process
        childProcess = __childProcess.spawn(command, {
          shell: true,
          detached: true
        });

        // listen for the killing of the process
        __hotkey('ctrl+c', {
          once: true
        }).on('key', (e) => {
          cancel();
        });

        childProcess.on('close', (code, signal) => {
          if (!code && signal) {
            trigger('kill', {
              get command() {
                return _this;
              },
              ...this._runningProcess
            });
            this.trigger('kill', {
              get command() {
                return _this;
              },
              ...this._runningProcess
            });
          } else if (code === 0 && !signal) {
            resolve({
              get command() {
                return _this;
              },
              ...this._runningProcess,
              code,
              signal
            });
            this.trigger('success', {
              get command() {
                return _this;
              },
              ...this._runningProcess,
              code,
              signal
            });
          }
          this._lastRunnedProcess = Object.assign({}, this._runningProcess);
          this._runningProcess = null;
        });

        // childProcess.on('close', (code, signal) => {
        //   this._runningProcess.end = Date.now();
        //   this._runningProcess.duration =
        //     this._runningProcess.end - this._runningProcess.start;
        //   console.log(signal);
        //   if (!code || code === 0) {
        //     if (!signal) {
        //       resolve({
        //         get command() {
        //           return _this;
        //         },
        //         ...this._runningProcess,
        //         code,
        //         signal
        //       });
        //       this.trigger('success', {
        //         get command() {
        //           return _this;
        //         },
        //         ...this._runningProcess,
        //         code,
        //         signal
        //       });
        //     }
        //   } else {
        //     reject({
        //       get command() {
        //         return _this;
        //       },
        //       ...this._runningProcess,
        //       code,
        //       signal
        //     });
        //     this.trigger('close', {
        //       get command() {
        //         return _this;
        //       },
        //       ...this._runningProcess,
        //       code,
        //       signal
        //     });
        //   }
        // });

        childProcess.on('error', (error) => {
          this._runningProcess.end = Date.now();
          this._runningProcess.duration =
            this._runningProcess.end - this._runningProcess.start;
          reject({
            get command() {
              return _this;
            },
            ...this._runningProcess,
            error
          });
          this.trigger('error', {
            get command() {
              return _this;
            },
            ...this._runningProcess,
            error
          });
        });
        childProcess.stdout.on('data', (value) => {
          this._runningProcess.stdout.push(value.toString());
          trigger('data', {
            get command() {
              return _this;
            },
            ...this._runningProcess,
            data: value.toString()
          });
          this.trigger('data', {
            get command() {
              return _this;
            },
            ...this._runningProcess,
            data: value.toString()
          });
        });
        childProcess.stderr.on('data', (error) => {
          this._runningProcess.stdout.push(error.toString());
          trigger('error', {
            get command() {
              return _this;
            },
            ...this._runningProcess,
            error: error.toString()
          });
          this.trigger('error', {
            get command() {
              return _this;
            },
            ...this._runningProcess,
            error: error.toString()
          });
        });
      } catch (e) {
        reject(e);
      }
    })
      .on('cancel,finally', () => {
        childProcess && childProcess.kill();
      })
      .start();

    // save the run promise
    this._runningProcess.promise = promise;

    // return the promise
    return promise;
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
  _ask(question) {
    const _this = this;
    return new __SPromise(
      (resolve, reject, trigger, cancel) => {
        switch (question.type) {
          case 'input':
            this.trigger('ask', {
              ...question,
              get command() {
                return _this;
              },
              resolve,
              reject,
              question:
                question.question ||
                'You need to specify a question using the "question" property of the ask object...'
            });
            break;
          case 'summary':
            this.trigger('ask', {
              get command() {
                return _this;
              },
              resolve,
              reject,
              items: question.items,
              question:
                question.question ||
                `Are that command details ok for you? (y/n)`,
              type: 'summary'
            });
            break;
          case 'confirm':
          case 'boolean':
          default:
            this.trigger('ask', {
              get command() {
                return _this;
              },
              question:
                question.querstion || question.type === 'confirm'
                  ? `Would you really like to launch the "${this.name}" command? (y/n)`
                  : `You need to specify a question using the "question" property of the ask object...`,
              type: question.type || 'confirm'
            });
            __hotkey('y,n', {
              once: true
            }).on('key', (key) => {
              resolve(key === 'y');
            });
            break;
        }
      },
      {
        cancelDefaultReturn: '__canceled__'
      }
    ).start();
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
  _check() {
    let extension, executable;
    if (__isPath(this._command, true)) {
      // get the file extension
      extension = __extension(this._command);
      executable = this._getExecutableFromExtension(extension);
    } else if (typeof this._command === 'string') {
      // treat this as a command
      executable = this._command.split(' ').slice(0, 1);
    } else {
      // the passed process value is not something usable...
      throw new Error(
        `The passed command "<primary>${this._command}</primary>" is not something usable...`
      );
    }
    // check if the command needed to launch this script is available
    if (!__commandExists.sync(executable)) {
      throw new Error(
        `Sorry but the executable "${executable}" needed to launch the command named "${this._name}" is not installed on your machine...`
      );
    }
    return true;
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
};
