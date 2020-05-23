const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __isPath = require('../is/path');
const __extension = require('../fs/extension');
const __commandExists = require('command-exists');
const __hotkey = require('../keyboard/hotkey');
const __uniqid = require('../string/uniqid');
const __argsToString = require('../cli/argsToString');
const __watchCli = require('../../cli/fs/watch.cli');
const __spawn = require('../childProcess/spawn');
const __minimatch = require('minimatch');

/**
 * @name            SCommand
 * @namespace       sugar.node.terminal
 * @type            Class
 * @extends         SPromise
 *
 * This class define a command that you can launch, subscribe for data, etc...
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
const _namespacedCommandsStack = {};
module.exports = class SCommand extends __SPromise {
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
  _id = null;

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
  _name = null;

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
  _command = null;

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
  _id = null;

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
  _destroyed = false;

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
  _currentProcess = null;

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
  _watchProcess = null;

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
  _processesStack = [];

  /**
   * @name          getCommands
   * @type          Function
   * @static
   *
   * This static methods allows you to get back all the commands instances depending on the passed namespace glob pattern.
   * Each commands can have as setting a "namespace" property that will be used to get the commands back using this method.
   * Note that a command that does not have any namespace cannot be retreived using this command.
   *
   * @param       {String}        [namespace=null]        The namespace pattern to get the commands back. If not specified, will return all the commands that have a namespace specified.
   * @return      {Array}                                 An array containing all the commands instances that match the namespace pattern passed
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getCommands(namespace = null) {
    let returnCommandsArray = [];
    // loop on every namespaced commands registered
    Object.keys(_namespacedCommandsStack).forEach((commandNamespace) => {
      if (__minimatch(commandNamespace, namespace)) {
        Object.keys(_namespacedCommandsStack[commandNamespace]).forEach(
          (commandId) => {
            returnCommandsArray.push(
              _namespacedCommandsStack[commandNamespace][commandId]
            );
          }
        );
      }
    });
    // return the commands
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
  constructor(name, command, settings = {}) {
    // init subclass
    super(
      (resolve, reject, trigger, cancel) => {
        // save the parameters
        this._name = name;
        this._command = command;
        this._id = __uniqid();
        // save this command in the stack if a namespace is specified
        if (this._settings.namespace) {
          if (!_namespacedCommandsStack[this._settings.namespace])
            _namespacedCommandsStack[this._settings.namespace] = {};
          this._namespacedCommandsStack[this._settings.namespace][
            this._id
          ] = this;
        }
        // check the command
        this._check();
        // reset the running process object
        this._resetCurrentProcessObject();
        // init key
        this._initKey();
      },
      __deepMerge(
        {
          // TODO: documentation settings
          run: false,
          concurrent: false,
          color: 'white',
          ask: null,
          title: null,
          args: {},
          definition: null,
          summary: true,
          watch: null,
          key: null,
          namespace: null
        },
        settings
      )
    ).start();

    setTimeout(() => {
      if (this._settings.watch) this.watch();
      if (this._settings.run) this.run();
    });
  }

  /**
   * @name                   _resetCurrentProcessObject
   * @type                    Function
   * @private
   *
   * This method simply reset the running process object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _resetCurrentProcessObject() {
    this._currentProcess = {
      id: __uniqid(),
      start: null,
      end: null,
      duration: null,
      stdout: [],
      stderr: [],
      command: this._command,
      childProcessPromise: null,
      state: this._settings.watch ? 'watching' : 'idle'
    };
    this._processesStack.push(this._currentProcess);
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
   * @name                   title
   * @type                    String
   * @get
   *
   * Get the command title if specified in the settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get title() {
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
  get key() {
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
  get namespace() {
    return this._settings.namespace;
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
    return this._currentProcess && this._currentProcess.state === 'running';
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
  get concurrent() {
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
  get command() {
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
  get lastProcessObj() {
    if (!this._processesStack.length) return null;
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
  get runningProcessObj() {
    if (this._currentProcess.state === 'running') return this._currentProcess;
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
  get processesStack() {
    return this._processesStack;
  }

  /**
   * @name                  _initKey
   * @type                  Function
   * @private
   *
   * This method init the key listening if a settings.key is defined
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _initKey() {
    if (!this._settings.key) return;
    __hotkey(this._settings.key, {
      activeSpace: this._settings.namespace || null
    }).on('press', () => {
      if (this.isRunning() && !this._settings.concurrent) {
        this.kill();
      } else {
        this.run();
      }
    });
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
  unwatch() {
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
  watch() {
    if (!this._settings.watch) {
      throw new Error(
        `You try to launch the "watch" process on the command named "${this.name}" but you don't have specified the "settings.watch" configuration object...`
      );
    }
    const commandLine = __argsToString(
      this._settings.watch,
      __watchCli.definition
    );
    this._watchProcess = __childProcess.spawn(`sugar fs.watch ${commandLine}`, {
      shell: true,
      env: {
        ...process.env,
        IS_CHILD_PROCESS: true
      }
    });
    let watchTimeout;
    this._watchProcess.stdout.on('data', (data) => {
      // split the logged value
      const action = data.toString().split(':')[0];
      const path = data.toString().split(':')[1];
      const _this = this;

      if (action === 'new') {
        this.trigger('watch.new', {
          get commandObj() {
            return _this;
          },
          path,
          ...this._currentProcess
        });
      } else if (action === 'update') {
        this.trigger('watch.update', {
          get commandObj() {
            return _this;
          },
          path,
          ...this._currentProcess
        });
      } else if (action === 'delete') {
        this.trigger('watch.delete', {
          get commandObj() {
            return _this;
          },
          path,
          ...this._currentProcess
        });
      }
      if (!this.isRunning()) {
        // check if is already running
        clearTimeout(watchTimeout);
        watchTimeout = setTimeout(() => {
          // run the command
          this.run();
        }, 200);
      }
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
  kill() {
    if (!this.isRunning()) return;
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
  destroy() {
    // update the destroy state
    this._destroyed = true;
    // remove it from the registered commands stacks
    if (this._settings.namespace) {
      delete _namespacedCommandsStack[this._settings.namespace][this._id];
    }
    // kill current process if is running
    this.kill();
    // stop the watch process if is running
    this.unwatch();
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
   * - success: Triggered when the child process has finished with success
   * - kill: Triggered when the child process has been killed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run() {
    if (this._destroyed) {
      throw new Error(
        `Sorry but this command named "${this.name}" has been destroyed...`
      );
    }
    if (this.isRunning() && !this.concurrent) {
      throw new Error(
        `Sorry but the command named "${this.name}" is already running...`
      );
    }
    const _this = this;

    // set the state of the runningProcess
    this._currentProcess.state = 'running';

    const promise = new __SPromise(async (resolve, reject, trigger, cancel) => {
      // // check if we need to ask some questions before running the command
      // if (this._settings.ask) {
      //   let askStack = this._settings.ask;
      //   if (askStack.type) {
      //     askStack = {
      //       default: askStack
      //     };
      //   }

      //   for (let i = 0; i < Object.keys(askStack).length; i++) {
      //     let askObj = askStack[Object.keys(askStack)[i]];
      //     const answer = await this._ask(askObj);
      //     if (answer === '__canceled__') {
      //       cancel();
      //       return;
      //     }
      //     askObj = {
      //       get commandObj() {
      //         return _this;
      //       },
      //       answer,
      //       ...askObj
      //     };
      //     askStack[Object.keys(askStack)[i]] = askObj;
      //     this.trigger('answer', askObj);
      //     if (askObj.type === 'confirm' && askObj.answer === false) {
      //       cancel();
      //       return;
      //     }
      //     switch (askObj.type) {
      //       case 'summary':
      //         askObj.items.forEach((item) => {
      //           this._currentProcess.command = this._currentProcess.command.replace(
      //             `[${item.id}]`,
      //             item.value
      //           );
      //         });
      //         break;
      //     }
      //   }
      // }

      // if (this._settings.summary) {
      //   await new Promise((resolve, reject) => {
      //     this.trigger('summary', {
      //       get commandObj() {
      //         return _this;
      //       },
      //       resolve,
      //       reject,
      //       // items: question.items,
      //       question: `"${this.name}" command arguments summary`,
      //       type: 'summary'
      //     });
      //   });
      // }

      // try {
      // init the child process
      this._currentProcess.childProcessPromise = __spawn(
        this._currentProcess.command
      );

      this._currentProcess.childProcess
        .on('error', () => {
          this._currentProcess.state = 'error';
        })
        .on('kill', () => {
          this._currentProcess.state = 'killed';
        })
        .on('success', () => {
          this._currentProcess.state = 'success';
        });

      __SPromise.pipe(this._currentProcess.childProcessPromise, this, {
        processor: (value, stack) => {
          if (typeof value === 'object') {
            value = {
              ...value,
              commandObj: this
            };
          }
          return value;
        }
      });

      // listen for the killing of the process
      __hotkey('ctrl+c', {
        once: true
      }).on('key', (e) => {
        cancel();
      });
      // } catch (e) {
      //   console.log('SOINE');
      //   console.log(e);
      //   reject(e);
      // }
    })
      .on('cancel,finally', () => {
        this._currentProcess.childProcessPromise.cancel();
        this._resetCurrentProcessObject();
      })
      .start();

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
  // _ask(question) {
  //   const _this = this;
  //   return new __SPromise(
  //     (resolve, reject, trigger, cancel) => {
  //       switch (question.type) {
  //         case 'input':
  //           this.trigger('ask', {
  //             ...question,
  //             get commandObj() {
  //               return _this;
  //             },
  //             resolve,
  //             reject,
  //             question:
  //               question.question ||
  //               'You need to specify a question using the "question" property of the ask object...'
  //           });
  //           break;
  //         case 'summary':
  //           this.trigger('ask', {
  //             get commandObj() {
  //               return _this;
  //             },
  //             resolve,
  //             reject,
  //             items: question.items,
  //             question:
  //               question.question ||
  //               `Are that command details ok for you? (y/n)`,
  //             type: 'summary'
  //           });
  //           break;
  //         case 'confirm':
  //         case 'boolean':
  //         default:
  //           this.trigger('ask', {
  //             get commandObj() {
  //               return _this;
  //             },
  //             question:
  //               question.querstion || question.type === 'confirm'
  //                 ? `Would you really like to launch the "${this.name}" command? (y/n)`
  //                 : `You need to specify a question using the "question" property of the ask object...`,
  //             type: question.type || 'confirm'
  //           });
  //           __hotkey('y,n', {
  //             once: true
  //           }).on('key', (key) => {
  //             resolve(key === 'y');
  //           });
  //           break;
  //       }
  //     },
  //     {
  //       cancelDefaultReturn: '__canceled__'
  //     }
  //   ).start();
  // }

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
