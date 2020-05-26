const __buildCommandLine = require('./buildCommandLine');
const __checkDefinitionObject = require('./checkDefinitionObject');
const __spawn = require('../childProcess/spawn');
const __SProcessOutput = require('../blessed/SProcessOutput');

/**
 * @name                SCli
 * @namespace           sugar.node.cli
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
 *    constructor() {
 *      super('php [hostname]:[port] [rootDir] [arguments]', {
 *        hostname: {
 *          type: 'String',
 *          description: 'Server hostname',
 *          default: 'localhost'
 *        },
 *        port: {
 *          type: 'Number',
 *          description: 'Server port',
 *          default: 8080
 *        },
 *        // etc...
 *      });
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
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(commandString, definitionObj) {
    // // save the command string
    // this._commandString = commandString;
    // // save the definition object
    // this._definitionObj = definitionObj;
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
    const definitionObjCheck = __checkDefinitionObject(this.definitionObj);
    if (definitionObjCheck !== true) throw new Error(definitionObjCheck);
  }

  /**
   * @name          buildCommandLine
   * @type          Function
   *
   * This method allows you to pass an arguments object and return the builded command line string depending on the definition object.
   *
   * @param       {Object}      argsObj         An argument object to use for the command line string generation
   * @param       {Boolean}     [includeAllArgs = true]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
   * @return      {String}                        The generated command line string
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  buildCommandLine(argsObj, includeAllArgs = true) {
    return __buildCommandLine(
      this.commandString,
      this.definitionObj,
      argsObj,
      includeAllArgs
    );
  }

  /**
   * @name          spawn
   * @type          Function
   * @async
   *
   * This method spawn a new child process with the provided arguments and the definition object.
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
   * @param       {Object}        [argsObj={}]      An argument object to override the default values of the definition object
   * @param       {Boolean}     [includeAllArgs = true]       Specify if you want all the arguments in the definition object in your command line string, or if you just want the one passed in your argsObj argument
   * @return      {SPromise}                        An SPromise instance on which you can subscribe for "events" described above
   *
   * @example       js
   * myCli.spawn({
   *    port: 8888
   * }).on('start', data => {
   *    // do something...
   * });
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  spawn(argsObj = {}, includeAllArgs = true) {
    if (this._childProcess) {
      throw new Error(
        `You cannot spawn multiple "${this.constructor.name}" child process at the same time. Please kill the currently running one using the "kill" method...`
      );
    }

    const commandLine = this.buildCommandLine(argsObj, includeAllArgs);
    this._childProcess = __spawn(commandLine);
    return this._childProcess;
  }

  /**
   * @name          spawnWithOutput
   * @type          Function
   *
   * This method spawn the command line and display his output
   * in a nicely styles screen.
   * Check the "spawn" method documentation for the the arguments and return values
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  spawnWithDisplay(argsObj = {}, includeAllArgs = true) {
    const serverProcess = this.spawn(argsObj, includeAllArgs);
    const output = new __SProcessOutput(serverProcess, {});
    output.attach();
    return serverProcess;
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
    if (!this._childProcess) return;
    return this._childProcess.cancel();
  }
};
