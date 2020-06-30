const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __hotkey = require('../keyboard/hotkey');
const __uniqid = require('../string/uniqid');
const __argsToString = require('../cli/argsToString');
const __watchCli = require('../../cli/fs/watch.cli');
const __minimatch = require('minimatch');
const __SCli = require('../cli/SCli');
const __spawn = require('../process/spawn');
const __replaceTokens = require('../string/replaceTokens');
const __notifier = require('node-notifier');
const __packageRoot = require('../path/packageRoot');
const __path = require('path');

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
   * @name          _isWatching
   * @type          Boolean
   * @private
   *
   * Store the watching status
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isWatching = false;

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
  static _commandsStack = [];

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
  static getCommandsByName(name) {
    let returnCommandsArray = [];
    SCommand._commandsStack.forEach((instance) => {
      if (instance.name === name) returnCommandsArray.push(instance);
    });
    // return the commands
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
  static getCommandsByNamespace(namespace) {
    let returnCommandsArray = [];
    if (!namespace) return SCommand._commandsStack;
    SCommand._commandsStack.forEach((instance) => {
      if (!instance.namespace) return;
      if (__minimatch(instance.namespace, namespace.toLowerCase()))
        returnCommandsArray.push(instance);
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
    // make sure the arguments are valid
    if (typeof command === 'string') {
    } else if (command instanceof __SCli) {
    } else {
      throw new Error(
        `The "command" argument of the "SCommand" class constructor has to be one of these types: String,SCli...`
      );
    }

    // init subclass
    super(
      (resolve, reject, trigger, cancel) => {
        // save this command into the static commands stack
        SCommand._commandsStack.push(this);
        // save the parameters
        this._name = name;
        this._command = command;
        this._id = __uniqid();
        // init key
        this._initKey();
      },
      __deepMerge(
        {
          // TODO: documentation settings
          run: false,
          argsObj: {},
          concurrent: false,
          color: 'white',
          title: null,
          notification: {
            successIconPath: __path.join(
              __packageRoot(__dirname),
              'src/data/notifications/success.jpg'
            ),
            errorIconPath: __path.join(
              __packageRoot(__dirname),
              'src/data/notifications/error.jpg'
            ),
            runIconPath: __path.join(
              __packageRoot(__dirname),
              'src/data/notifications/run.jpg'
            )
          },
          summary: true,
          watch: null,
          key: null,
          namespace: null,
          activeSpace: null
        },
        settings
      )
    ).start();

    setTimeout(() => {
      if (this._settings.watch && !this._settings.run) this.watch();
      if (this._settings.run) this.run();
    });
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
    return this.lastProcessObj && this.lastProcessObj.state === 'running';
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
    if (!this._processesStack.length) {
      if (!this._processObjWhenNoLastOne)
        this._processObjWhenNoLastOne = { stdout: [], stderr: [] };
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
  get runningProcessObj() {
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
    __hotkey(`${this._settings.key}`, {
      activeSpace: this._settings.activeSpace || null
    }).on('press', (keyObj) => {
      if (this.isRunning() && !this._settings.concurrent) {
        this.kill();
      } else if (!this.isRunning()) {
        this.run();
      }
    });
    __hotkey(`shift+${this._settings.key}`, {
      activeSpace: this._settings.activeSpace || null
    }).on('press', async (keyObj) => {
      if (this.isRunning() && !this._settings.concurrent) {
        this.kill();
      } else if (!this.isRunning()) {
        this.run(this._settings.argsObj, false);
      }
    });
  }

  _buildSummaryItems(argsObj = this._settings.argsObj, definitionObj) {
    if (!definitionObj) return false;
    const items = [];
    Object.keys(definitionObj).forEach((argName) => {
      const argDefinitionObj = definitionObj[argName];
      const argValue =
        argsObj[argName] !== undefined
          ? argsObj[argName]
          : argDefinitionObj.default;
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
  isWatching() {
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

    this._isWatching = true;
    this.lastProcessObj.stdout.push(
      `Starting the watch process for the command "<yellow>${this.name}</yellow>"...`
    );
    this.trigger('stdout.data', this.lastProcessObj);

    const commandLine = __argsToString(
      {
        patterns:
          typeof this._settings.watch === 'object'
            ? this._settings.watch.patterns
            : this._settings.watch
      },
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

      if (action === 'new') {
        this.lastProcessObj.stdout.push(
          `A file has been <green>created</green>: <cyan>${path}</cyan>`
        );
        this.trigger('stdout.data', {
          ...this.lastProcessObj,
          path
        });
      } else if (action === 'update') {
        this.lastProcessObj.stdout.push(
          `A file has been <yellow>updated</yellow>: <cyan>${path}</cyan>`
        );
        this.trigger('stdout.data', {
          ...this.lastProcessObj,
          path
        });
      } else if (action === 'delete') {
        this.lastProcessObj.stdout.push(
          `A file has been <red>deleted</red>: <cyan>${path}</cyan>`
        );
        this.trigger('stdout.data', {
          ...this.lastProcessObj,
          path
        });
      }
      if (!this.isRunning()) {
        // check if is already running
        clearTimeout(watchTimeout);
        watchTimeout = setTimeout(() => {
          // build the proper "argsObj"
          const argsObj = {};
          if (
            typeof this._settings.watch &&
            this._settings.watch.mapToProperty
          ) {
            argsObj[this._settings.watch.mapToProperty] = path;
          } else {
            argsObj.watchPath = path;
          }
          // run the command
          this.run(argsObj);
        }, 200);
      }
    });
    this._watchProcess.on('close', (code, signal) => {
      this._isWatching = false;
      this.trigger('stdout.data', {
        value: `The watch process has been stopped`
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
  kill() {
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
  destroy() {
    // update the destroy state
    this._destroyed = true;
    // remove this command from the static commands stack
    const instanceIdx = SCommand._commandsStack.indexOf(this);
    if (instanceIdx !== -1) {
      SCommand._commandsStack.splice(instanceIdx, 1);
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
   * @param         {Object}        [args=settings.argsObj]         An optional arguments object for this particular process instance. If not specified, will take the default one passed in the constructor settings
   * @param         {Boolean}       [skipAsk=true]             Specify if you want to skip the "ask" process
   * @return        {SPromise}                          An SPromise instance on which you can subscribe to all the "spawn" function "events" which are:
   * - start: Triggered when the command start a process
   * - close: Triggered when the process is closed
   * - kill: Triggered when the process has been killed
   * - success: Triggered when the process has finished without any error
   * - error: Triggered when the process has had an error
   * - stdout.data: Triggered when some data are pushed in the stdout channel
   * - stderr.data: Triggered when some data are pushed in the srderr channel
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async run(argsObj = this._settings.argsObj, skipAsk = true) {
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

    if (this._settings.watch) this.unwatch();

    clearTimeout(this._currentProcessSuccessTimeout);
    this._currentProcess = {};

    if (!skipAsk) {
      if (this._command instanceof __SCli) {
        const answer = await this._ask({
          type: 'summary',
          items: this._buildSummaryItems(argsObj, this._command.definitionObj)
        });
        if (!Array.isArray(answer)) return;
        answer.forEach((item) => {
          argsObj[item.id] = item.value;
        });
      }
    }

    // notification
    if (this._settings.notification) {
      __notifier.notify({
        title: this.name,
        message: `Starting the command "${this.name}"`,
        icon: this._settings.notification.runIconPath || false, // Absolute path (doesn't work on balloons)
        sound: false, // Only Notification Center or Windows Toasters
        wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
      });
    }

    if (this._command instanceof __SCli) {
      this._currentProcess.childProcessPromise = this._runSCli(argsObj);
    } else if (typeof this._command === 'string') {
      this._currentProcess.childProcessPromise = __spawn(
        __replaceTokens(this._command, argsObj)
      );
    }

    this._processesStack.push(this._currentProcess);

    // init the child process
    this._currentProcess.childProcessPromise.on('*', (data, stack) => {
      this._processesStack[this._processesStack.length - 1] = {
        ...this._processesStack[this._processesStack.length - 1],
        ...(data && data.process ? data.process : data || {})
      };
    });
    this._currentProcess.childProcessPromise.on('close', (data) => {
      this._currentProcess = null;
      if (data.code === 0 && !data.signal) return;
      if (this._settings.notification) {
        __notifier.notify({
          title: this.name,
          message: `Command closed with code "${data.code}" and signal ${data.signal}`,
          icon: this._settings.notification.errorIconPath || false, // Absolute path (doesn't work on balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      }
    });
    this._currentProcess.childProcessPromise.on('success', () => {
      if (this._settings.notification) {
        __notifier.notify({
          title: this.name,
          message: `Command finished successfully!`,
          icon: this._settings.notification.successIconPath || false, // Absolute path (doesn't work on balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      }
      this._currentProcessSuccessTimeout = setTimeout(() => {
        if (this._settings.watch) this.watch();
      }, 2000);
    });
    this._currentProcess.childProcessPromise.on('error', () => {
      if (this._settings.notification) {
        __notifier.notify({
          title: this.name,
          message: `Error!`,
          icon: this._settings.notification.errorIconPath || false, // Absolute path (doesn't work on balloons)
          sound: false, // Only Notification Center or Windows Toasters
          wait: false // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
        });
      }
    });

    const promise = new __SPromise((resolve, reject, trigger, cancel) => {})
      .on('cancel,finally', () => {})
      .start();

    __SPromise.pipe(this._currentProcess.childProcessPromise, promise, {});
    __SPromise.pipe(this._currentProcess.childProcessPromise, this, {});

    // return the promise
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
  _runSCli(argsObj = {}) {
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
  _ask(question) {
    const _this = this;
    return new __SPromise(
      (resolve, reject, trigger, cancel) => {
        switch (question.type) {
          case 'summary':
            this.trigger('ask', {
              get commandInstance() {
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
};
