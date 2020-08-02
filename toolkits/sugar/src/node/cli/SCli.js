const __buildCommandLine = require('./buildCommandLine');
const __validateDefinitionObject = require('./validateDefinitionObject');
const __spawn = require('../process/spawn');
const __SChildProcess = require('../process/SChildProcess');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __argsToObject = require('../cli/argsToObject');
const __isChildProcess = require('../is/childProcess');
const __SPromise = require('../promise/SPromise');
const __output = require('../process/output');

/**
 * @name                SCli
 * @namespace           node.cli
 * @type                Class
 *
 * This class represent a basic CLI command with his definition object, his command string, etc...
 *
 * @param       {String}        commandString         The command string that contains arguments tokens and the "[arguments]" token where you want the parsed arguments to be placed
 * @param       {Object}        definitionObj         The definition object that represent all the available arguments, their types, etc... Here's the definitionObj format:
 * - argName:
 *    - type (null) {String}: The argument type like "String", "Boolean", "Array", "Number" or "Object"
 *    - alias (null) {String}: A 1 letter alias for the argument to be used like "-a", "-g", etc...
 *    - description (null) {String}: A small and efficient argument description
 *    - default (null) {Mixed}: The default argument value if nothing is specified
 *    - level (1) {Number}: This represent the "importance" of the argument. An argument with level 1 is an argument often used that will be displayed in the summary command list. An argument of level 2 if less important and can be skipped.
 *
 * @example         js
 * const SCli = require('@coffeekraken/sugar/js/cli/SCli');
 * class MyCli extends SCli {
 *    static command = 'php [hostname]:[port] [rootDir] [arguments]';
 *    static definitionObj = {
 *      hostname: {
 *        type: 'String',
 *        description: 'Server hostname',
 *        default: 'localhost'
 *      },
 *      port: {
 *        type: 'Number',
 *        description: 'Server port',
 *        default: 8080
 *      },
 *      // etc...
 *    }:
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 * const myCli = new MyCli();
 * myCli.getCommandLine({
 *    port: 8888
 * }); // => php localhost:8888 .
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SCli {
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
   * @name        _settings
   * @type        Object
   * @private
   *
   * Store the instance settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // save the settings
    this._settings = __deepMerge(
      {
        id: this.constructor.name,
        name: null,
        includeAllParams: true,
        output: false,
        defaultParamsObj: {}
      },
      settings
    );
    // check integrity
    this._checkCliIntegrity();
  }

  /**
   * @name        commandString
   * @type        String
   * @get
   *
   * Access the command string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get commandString() {
    return this.constructor.command;
  }

  /**
   * @name        definitionObj
   * @type        String
   * @get
   *
   * Access the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get definitionObj() {
    return Object.assign({}, this.constructor.definitionObj);
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
   * @name        _checkCliIntegrity
   * @type        Function
   * @private
   *
   * This method simply check that the extended SCli instance has the needed overrided methods, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _checkCliIntegrity() {
    // const prototypeArray = Object.getOwnPropertyNames(
    //   Object.getPrototypeOf(this)
    // );
    // check static properties
    if (
      !this.constructor.command ||
      typeof this.constructor.command !== 'string'
    ) {
      throw new Error(
        `An SCli based class like your "${this.constructor.name}" MUST have a "command" static string property...`
      );
    }
    if (
      !this.constructor.definitionObj ||
      typeof this.constructor.definitionObj !== 'object'
    ) {
      throw new Error(
        `An SCli based class like your "${this.constructor.name}" MUST have a "definitionObj" static object property...`
      );
    }

    // existence of the ```_run``` method
    if (!this._run || typeof this._run !== 'function') {
      throw new Error(
        `An SCli based class like your "${this.constructor.name}" MUST has a "_run" method that has to be responsible of executing your process when calling the "run" method...`
      );
    }

    // check definition object
    const definitionObjCheck = __validateDefinitionObject(this.definitionObj);
    if (definitionObjCheck !== true) throw new Error(definitionObjCheck);
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
   * - stdout.data: Triggered when some data are pushed in the stdout channel
   * - stderr.data: Triggered when some data are pushed in the srderr channel
   *
   * You can use the "spawn" function available under the namespace "sugar.node.childProcess" in order to
   * spawn the process with already all these events setted...
   *
   * @param       {Object}        [paramsObj=settings.defaultParamsObj]      An argument object to override the default values of the definition object
   * @param       {Boolean}     [includeAllParams=settings.includeAllParams]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your paramsObj argument
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
    // make sure we have an object as args
    paramsObj = __deepMerge(this._settings.defaultParamsObj, paramsObj);
    paramsObj = __argsToObject(paramsObj, this.definitionObj);

    if (__isChildProcess()) {
      // run the process
      this._runningProcess = this._run(paramsObj, settings);

      if (settings.output) {
        const outputSettings =
          typeof settings.output === 'object' ? settings.output : {};
        __output(this._runningProcess, outputSettings);
      }

      this._runningProcess.on('resolve', (data) => {
        data = {
          time: Date.now(),
          value: data
        };
        return data;
      });

      return this._runningProcess;
    } else {
      const childProcess = new __SChildProcess(this.commandString, {
        id: settings.id,
        definitionObj: this.definitionObj,
        defaultParamsObj: settings.defaultParamsObj
      });

      this._runningProcess = childProcess.run(paramsObj);

      if (settings.output) {
        const outputSettings =
          typeof settings.output === 'object' ? settings.output : {};
        __output(this._runningProcess, outputSettings);
      }
    }

    this._runningProcess.trigger(
      'stdout.data',
      `Launching the SCli "<primary>${
        this._settings.name || this._settings.id
      }</primary>" process...`
    );

    // save running process params
    this._runningParamsObj = paramsObj;

    // listen for some events on the process
    this._runningProcess.on('cancel,finally', () => {
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
      this.commandString,
      this.definitionObj,
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
    return this._runningProcess.cancel();
  }
};
