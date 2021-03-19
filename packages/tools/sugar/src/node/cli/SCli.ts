// @ts-nocheck

import __SClass from '../../shared/class/SClass';
import __argsToObject from '../../shared/cli/argsToObject';
import __deepMerge from '../../shared/object/deepMerge';
import __SInterface from '../interface/SInterface';
import __buildCommandLine from './buildCommandLine';

/**
 * @name                SCli
 * @namespace           sugar.node.cli
 * @type                Class
 * @extends             SClass
 * @status              wip
 *
 * This class represent a basic CLI command with his definition object, his command string, etc...
 *
 * @param       {Object}        [settings={}]           An object of settings to configure your SCli instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SCli from '@coffeekraken/sugar/js/cli/SCli';
 * class MyCli extends SCli {
 *    static command = 'php %hostname:%port %rootDir %arguments';
 *    static interfaces = {
 *      this: MyCoolSInterface
 *    };
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

export interface ISCliSettings {
  definition?: any;
}

export interface ISCli {}

class SCli extends __SClass implements ISCli {
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
  _runningParamsObj: any = {};

  /**
   * @nane      _initialParams
   * @type      any
   * @private
   *
   * Store the initial params
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _initialParams: any;

  /**
   * @name        interface
   * @type        SInterface
   * @get
   *
   * Access the interface used to format arguments, etc...
   * Take it first from the ```settings.interface``` setting, then check in the
   * static class property called ```interfaces.cli```.
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get interface(): __SInterface {
    const int: __SInterface =
      // @ts-ignore
      this._settings.interface || this.constructor.interfaces.cli;
    if (!int) {
      throw new Error(
        `Your "<yellow>SCli</yellow>" based class called "<cyan>${this.constructor.name}</cyan>" does not have any interface specified under the "<magenta>settings.interface</magenta>" setting, or under the static "<magenta>interfaces.cli</magenta>" property.`
      );
    }
    return int;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings?: Partial<ISCliSettings>) {
    super(
      __deepMerge(
        {
          id: 'SCli',
          includeAllParams: true,
          childProcessSettings: {}
        },
        settings || {}
      )
    );

    // make sure the SCli based class is correctly implemented
    // @ts-ignore
    if (!this.constructor.command) {
      throw new Error(
        `You must specify a "<yellow>static command: string;</yellow>" property in your "<cyan>${this.constructor.name}</cyan>" SCli based class`
      );
    }

    this._initialParams = __argsToObject(
      initialParams,
      // @ts-ignore
      this.interface.definition
    );
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
    // @ts-ignore
    return this.constructor.command;
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
   * - start: emited when the command start a process
   * - close: emited when the process is closed
   * - kill: emited when the process has been killed
   * - success: emited when the process has finished without any error
   * - error: emited when the process has had an error
   * - log: emited when some data are pushed in the stdout channel
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
  run(paramsObj: any = {}, settings?: Partial<ISCliSettings>) {
    if (this._runningProcess) {
      throw new Error(
        `You cannot spawn multiple "${this.id}" process at the same time. Please kill the currently running one using the "kill" method...`
      );
    }

    const set = <ISCliSettings>__deepMerge(this._settings, settings || {});

    if (typeof paramsObj === 'string') {
      paramsObj = __argsToObject(paramsObj, {
        // @ts-ignore
        definition: this.interface.definition
      });
    } else if (!paramsObj) {
      paramsObj = Object.assign({}, this._initialParams);
    }
    paramsObj = __deepMerge(
      Object.assign({}, this._initialParams || {}),
      paramsObj
    );

    if (this.process && typeof this.process === 'function') {
      return this.process();
    }

    // build the command line
    const command = this.toString(paramsObj);

    console.log('com', command);

    return;

    // this._runningProcess = __spawn();

    // this._runningProcess.on('close', (args) => {
    //   this._runningProcess = null;
    // });

    // this._runningProcess.on('*', (d, v) => {

    // });

    // ${__sugarHeading({
    //   version: __packageJson(__dirname).version
    // })}\n\n

    // return this._runningProcess;
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
  toString(
    paramsObj: any = {},
    includeAllParams: boolean = this._settings.includeAllParams
  ) {
    return __buildCommandLine(this.command, paramsObj, {
      // @ts-ignore
      definition: this.interface.definition,
      includeAllParams
    });
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
  kill() {}
}
export default SCli;
