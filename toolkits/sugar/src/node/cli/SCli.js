const __buildCommandLine = require('./buildCommandLine');
const __validateDefinitionObject = require('./validateDefinitionObject');
const __spawn = require('../process/spawn');
const __SProcessOutput = require('../blessed/SProcessOutput');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __argsToObject = require('../cli/argsToObject');
const __isChildProcess = require('../is/childProcess');
const __SPromise = require('../promise/SPromise');

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
   * @name          _childProcess
   * @type          SPromise
   * @private
   *
   * Store the spawned child process
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _childProcess = null;

  /**
   * @name        _runningArgsObj
   * @type        Object
   * @private
   *
   * Store the currently running process arguments object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runningArgsObj = {};

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
        id: null,
        includeAllArgs: true,
        argsObj: {},
        forceChildProcess: false
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
   * @name        runningArgsObj
   * @type        Object
   * @get
   *
   * Get the current process lauched with "run" or "runWithOutput" methods arguments
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get runningArgsObj() {
    return this._runningArgsObj || {};
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
    // check definition object
    const definitionObjCheck = __validateDefinitionObject(this.definitionObj);
    if (definitionObjCheck !== true) throw new Error(definitionObjCheck);
  }

  /**
   * @name          toString
   * @type          Function
   *
   * This method allows you to pass an arguments object and return the builded command line string depending on the definition object.
   *
   * @param       {Object}      argsObj         An argument object to use for the command line string generation
   * @param       {Boolean}     [includeAllArgs=settings.includeAllArgs]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
   * @return      {String}                        The generated command line string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString(argsObj = {}, includeAllArgs = this._settings.includeAllArgs) {
    return __buildCommandLine(
      this.commandString,
      this.definitionObj,
      argsObj,
      includeAllArgs
    );
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
   * @param       {Object}        [argsObj=settings.argsObj]      An argument object to override the default values of the definition object
   * @param       {Boolean}     [includeAllArgs=settings.includeAllArgs]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
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
  run(argsObj = this._settings.argsObj, settings = {}) {
    settings = __deepMerge(this._settings, settings);

    // make sure we have an object as args
    argsObj = __argsToObject(argsObj, this.definitionObj);

    // check if is running in a child process
    if (!settings.forceChildProcess && __isChildProcess() && this.childRun) {
      const childProcessPromise = new __SPromise(async (resolve, reject) => {
        const childProcess = this.childRun(argsObj);
        if (childProcess instanceof Promise) {
          console.log('#error COCOCOC');
          const result = await childProcess;
          console.log('#success COC result');
          console.log('#reso ' + result.toString());
          return resolve(result);
        }
        // resolve(childProcess);
      }).start();
      // __SPromise.pipe(childProcess, childProcessPromise);
      return childProcessPromise;
    }

    if (this._childProcess) {
      throw new Error(
        `You cannot spawn multiple "${this.constructor.name}" child process at the same time. Please kill the currently running one using the "kill" method...`
      );
    }
    const commandLine = this.toString(argsObj, settings.includeAllArgs);
    this._runningArgsObj = Object.assign({}, argsObj);
    this._childProcess = __spawn(commandLine, {
      id: this._settings.id,
      before: this.constructor.beforeCommand,
      after: this.constructor.afterCommand
    }).on('cancel,finally', () => {
      this._runningArgsObj = null;
      this._childProcess = null;
    });

    return this._childProcess;
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
    return this._childProcess !== null;
  }

  /**
   * @name          runWithOutput
   * @type          Function
   *
   * This method run the command line and display his output
   * in a nicely styled screen.
   * Check the "run" method documentation for the the arguments and return values
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // runWithOutput(
  //   argsObj = this._settings.argsObj,
  //   includeAllArgs = this._settings.includeAllArgs
  // ) {
  //   const serverProcess = this.run(argsObj, includeAllArgs);
  //   this._output = new __SProcessOutput(serverProcess, {});
  //   serverProcess.on('before.start,before.end', () => {
  //     this._output.clear();
  //   });
  //   this._output.attach();
  //   return serverProcess;
  // }

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
    if (!this._childProcess) return;
    return this._childProcess.cancel();
  }

  /**
   * @name            _runningProcessArgsObject
   * @type            Function
   * @private
   *
   * This method take an argument object as parameter and return
   * the final argument object depending on the definitionObj and the passed object
   *
   * @param       {Object}      [argsObj=settings.argsObj]      An argument object used for processing the final argument object one
   * @param       {Boolean}     [includeAllArgs=settings.includeAllArgs]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
   * @return      {Object}              The processed args object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // _runningProcessArgsObject(
  //   argsObj = {},
  //   includeAllArgs = this._settings.includeAllArgs
  // ) {
  //   const finalArgsObj = {};
  //   Object.keys(this.definitionObj).forEach((argName) => {
  //     if ((!argsObj || argsObj[argName] === undefined) && !includeAllArgs)
  //       return;
  //     finalArgsObj[argName] =
  //       argsObj[argName] !== undefined
  //         ? argsObj[argName]
  //         : this.definitionObj[argName].default;
  //   });
  //   return finalArgsObj;
  // }

  /**
   * @name            log
   * @type            Function
   *
   * This method simulate a log coming fron the child process
   *
   * @param       {Mixed}       ...args       The message(s) to log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    if (!this.isRunning()) return;
    args.forEach((arg) => {
      this._childProcess.log(__parseHtml(arg));
    });
  }
};
