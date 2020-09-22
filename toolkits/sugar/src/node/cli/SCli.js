const __fs = require('fs');
const __tmp = require('tmp');
const __isClass = require('../is/class');
const __packageJson = require('../package/json');
const __buildCommandLine = require('./buildCommandLine');
const __SChildProcess = require('../process/SChildProcess');
const __deepMerge = require('../object/deepMerge');
const __argsToObject = require('../cli/argsToObject');
const __isChildProcess = require('../is/childProcess');
const __output = require('../process/output');
const __parseArgs = require('../cli/parseArgs');
const __toString = require('../string/toString');
const __SProcessInterface = require('../process/interface/SProcessInterface');
const __SCliInterface = require('./interface/SCliInterface');
const __SInterface = require('../class/SInterface');
const __sugarHeading = require('../ascii/sugarHeading');
const __SPromise = require('../promise/SPromise');

/**
 * @name                SCli
 * @namespace           sugar.node.cli
 * @implements          SCliInterface
 * @type                Class
 *
 * This class represent a basic CLI command with his definition object, his command string, etc...
 *
 * @param       {Object}        [settings={}]           An object of settings to configure your SCli instance:
 * - id (constructor.name) {String}: A uniqid for your instance.
 * - name (null) {String}: A name for your SCli instance like "Build SCSS", etc...
 * - includeAllArgs (true) {Boolean}: Specify if you want to include all arguments when for example you generate the command string, etc...
 * - output (false) {Boolean|Object}: Specify if you want your SCli instance to display automatically a nice output using the SOutput class, or you can specify this to false and handle all of this yourself using the SPromise events triggered
 * - defaultParams ({}) {Object}: Specify some defaults for your accepted and described params of the definition object
 * - childProcess: ({}) {Object}: Specify some settings to pass to the SChildProcess instance like "pipe", etc...
 *
 * @TODO            check the documentation
 *
 * @example         js
 * const SCli = require('@coffeekraken/sugar/js/cli/SCli');
 * class MyCli extends SCli {
 *    static command = 'php %hostname:%port %rootDir %arguments';
 *    static interface = MyCoolSInterface;
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 * const myCli = new MyCli();
 * myCli.command; // => php localhost:8888 .
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCli extends __SPromise {
  /**
   * @name          _runningProcess
   * @type          SPromise
   * @private
   *
   * Store the spawned child process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runningProcess = null;

  /**
   * @name        _runningParamsObj
   * @type        Object
   * @private
   *
   * Store the currently running process arguments object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runningParamsObj = {};

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    // save the settings
    settings = __deepMerge(
      {
        name: null,
        includeAllParams: true,
        output: false,
        defaultParams: {},
        processSettings: {},
        childProcessSettings: {
          triggerParent: true
        }
      },
      settings
    );

    super(settings);

    if (!this._settings.id) this._settings.id = this.constructor.name;

    this._paramsObj = __argsToObject(
      initialParams,
      this.interface.definitionObj
    );

    this._paramsObj = __deepMerge(
      this._settings.defaultParams,
      this._paramsObj
    );

    if (!this._paramsObj.forceChildProcess || !this.command) {
      // run the process
      const SProcessInstance = this.constructor.processClass;

      this._processInstance = new SProcessInstance(
        this._paramsObj,
        this._settings.processSettings
      );

      if (settings.childProcessSettings.triggerParent) {
        const stacks = Array.isArray(
          settings.childProcessSettings.triggerParent
        )
          ? settings.childProcessSettings.triggerParent.join(',')
          : '*';
        this._processInstance.on(stacks, (value, metas) => {
          __SChildProcess.triggerParent(metas.stack, value, metas);
        });
      }

      // Apply the SProcessInterface on the getted process
      // __SProcessInterface.apply(this._processInstance);
    } else {
      const childProcess = new __SChildProcess(this.command, {
        id: settings.id,
        definitionObj: this.interface.definitionObj,
        defaultParams: settings.defaultParams,
        ...settings.childProcessSettings
      });

      console.log({
        id: settings.id,
        definitionObj: this.interface.definitionObj,
        defaultParams: settings.defaultParams,
        ...settings.childProcessSettings
      });

      childProcess.on('state', (state) => {
        this.state = state;
      });

      this._processInstance = childProcess;

      // childProcess.on('*', (v, m) => {
      //   console.log(m.stack);
      // });

      if (settings.output) {
        if (__isClass(settings.output)) {
          const outputInstance = new settings.output(
            this._processInstance,
            this._paramsObj
          );
        } else {
          const outputSettings =
            typeof settings.output === 'object' ? settings.output : {};
          __output(this._processInstance, outputSettings);
        }
      }
    }

    __SPromise.pipe(this._processInstance, this);
  }

  /**
   * @name        parseArgs
   * @type        Function
   * @static
   *
   * This static method take a simple cli configuration string and returns you
   * an object representing each values passed.
   * This methods uses the static definition object of the class to do his job.
   *
   * @param     {String}          cliString         The cli string you want to parse
   * @return    {Object}                            The object of configuration values
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static parseArgs(cliString) {
    return __parseArgs(cliString, this.interface.definitionObj);
  }

  /**
   * @name        command
   * @type        String
   * @get
   *
   * Access the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get command() {
    return this.constructor.command;
  }

  /**
   * @name        interface
   * @type        String
   * @get
   *
   * Access the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get interface() {
    const int = this.constructor.interface;
    int.definitionObj.forceChildProcess = {
      type: 'Boolean',
      required: true,
      default: true,
      description:
        'Allows you to force the SCli class to start a new child process even if the SCli instance already runs inside one'
    };
    return int;
  }

  /**
   * @name        runningParamsObj
   * @type        Object
   * @get
   *
   * Get the current process lauched with "run" or "runWithOutput" methods arguments
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get runningParamsObj() {
    return this._runningParamsObj || {};
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * This method run a new child process with the provided arguments and the definition object.
   * The returned object MUST be an SPromise instance that emit these "events":
   * - start: Triggered when the command start a process
   * - close: Triggered when the process is closed
   * - kill: Triggered when the process has been killed
   * - success: Triggered when the process has finished without any error
   * - error: Triggered when the process has had an error
   * - log: Triggered when some data are pushed in the stdout channel
   *
   * @param       {Object}        [paramsObj={}]      An argument object to override the default values of the definition object
   * @param       {Object}        [settings={}]       Same settings object as in the constructor but for this process only
   * @return      {SPromise}                        An SPromise instance on which you can subscribe for "events" described above
   *
   * @example       js
   * myCli.run({
   *    port: 8888
   * }).on('start', data => {
   *    // do something...
   * });
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(paramsObj = {}, settings = {}) {
    if (this._runningProcess) {
      throw new Error(
        `You cannot spawn multiple "${this.constructor.name}" process at the same time. Please kill the currently running one using the "kill" method...`
      );
    }

    settings = __deepMerge(this._settings, settings);

    if (typeof paramsObj === 'string') {
      paramsObj = __argsToObject(paramsObj, this.interface.definitionObj);
    } else if (!paramsObj) {
      paramsObj = Object.assign({}, this._paramsObj);
    }
    paramsObj = __deepMerge(
      Object.assign({}, this._paramsObj || {}),
      paramsObj
    );

    if (this._processInstance instanceof __SChildProcess) {
      paramsObj.forceChildProcess = false;
    }

    this._runningProcess = this._processInstance.run(
      paramsObj,
      settings.processSettings
    );

    this._runningProcess.on('close', (args) => {
      this._runningProcess = null;
    });

    // ${__sugarHeading({
    //   version: __packageJson(__dirname).version
    // })}\n\n

    if (!__isChildProcess()) {
      const launchingLogObj = {
        temp: true,
        value: `Launching the SCli "<primary>${
          this._settings.name || this._settings.id
        }</primary>" process...`
      };
      this._runningProcess.trigger('log', launchingLogObj);
    }

    // save running process params
    this._runningParamsObj = paramsObj;

    // listen for some events on the process
    this._runningProcess.on('finally', () => {
      this._runningProcess = null;
      this._runningParamsObj = null;
    });

    return this._runningProcess;
  }

  /**
   * @name          toString
   * @type          Function
   *
   * This method allows you to pass an arguments object and return the builded command line string depending on the definition object.
   *
   * @param       {Object}      paramsObj         An argument object to use for the command line string generation
   * @param       {Boolean}     [includeAllParams=settings.includeAllParams]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your paramsObj argument
   * @return      {String}                        The generated command line string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString(paramsObj = {}, includeAllParams = this._settings.includeAllParams) {
    return __buildCommandLine(
      this.command,
      this.interface.definitionObj,
      paramsObj,
      includeAllParams
    );
  }

  /**
   * @name        isRunning
   * @type        Function
   *
   * This method simply return true or false if the child process is running or not
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isRunning() {
    return this._runningProcess !== null;
  }

  /**
   * @name          kill
   * @type          Function
   * @async
   *
   * This method simply kill the running child process if their's one, otherwise it will do nothing.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    if (!this._runningProcess) return;
    try {
      this._runningProcess.kill();
    } catch (e) {}
  }
}

// module.exports = SCli;
module.exports = __SCliInterface.implements(SCli);
