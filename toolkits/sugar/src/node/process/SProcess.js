const __SPromise = require('../promise/SPromise');
const __SProcessInterface = require('./interface/SProcessInterface');
const __SError = require('../error/SError');
const __toString = require('../string/toString');
const __deepMerge = require('../object/deepMerge');
const __SProcessDeamonSettingInterface = require('./interface/SProcessDeamonSettingInterface');

/**
 * @name            SProcess
 * @namespace       node.process
 * @type            Class
 * @extends         SPromise
 * @implements      SProcessInterface
 *
 * This class represent a process in the sugar toolkit
 *
 * @param         {Object}          [settings={}]           An object of settings to configure your process instance:
 * - id (process.unnamed) {String}: Specify a unique id for your particular process instance
 * - name (Unnamed Process) {String}: Specify a name for your process instance
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SProcess extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        idle, running, killed, error, success, watching
   *
   * Store the process state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get state() {
    return this._state;
  }
  set state(value) {
    this._setState(value);
  }
  _state = 'idle';
  _setState(value) {
    if (
      ['idle', 'running', 'killed', 'error', 'success', 'watching'].indexOf(
        value
      ) === -1
    ) {
      throw new __SError(
        `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
          value
        )}</magenta>" of your "<cyan>${
          this.constructor.name
        }</cyan>" class can contain only one of these values: ${[
          'idle',
          'running',
          'killed',
          'error',
          'success',
          'watching'
        ]
          .map((i) => {
            return `"<green>${i}</green>"`;
          })
          .join(', ')}`
      );
    }

    // trigger an event
    this.trigger('state', value);

    this._state = value;
  }

  /**
   * @name          _currentPromise
   * @type          SPromise
   * @private
   *
   * Store the current ```run``` returned promise
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _currentPromise = null;

  /**
   * @name          duration
   * @type          Number
   *
   * Store the process duration. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  duration = 0;

  /**
   * @name          startTime
   * @type          Number
   *
   * Store the process startTime. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  startTime = 0;

  /**
   * @name          endTime
   * @type          Number
   *
   * Store the process endTime. 0 if no process launched
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  endTime = 0;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    settings = __deepMerge(
      {
        id: 'process.unnamed',
        name: 'Unnamed Process',
        deamon: null,
        throw: false
      },
      settings
    );
    super(null, settings).start();

    if (settings.deamon && typeof settings.deamon === 'object') {
      __SProcessDeamonSettingInterface.apply(settings.deamon);

      // init the deamon class
      this._deamonInstance = new settings.deamon.class(
        settings.deamon.settings || {}
      );

      const stacks = Array.isArray(settings.deamon.runOn)
        ? settings.deamon.runOn.join(',')
        : '*';
      this._deamonInstance.on(stacks, (data) => {
        // check if a process is already running
        if (this._currentPromise) return;

        // process the initial params with the "processParams" function if exists
        let params = Object.assign({}, initialParams);
        if (
          settings.deamon.processParams &&
          typeof settings.deamon.processParams === 'function'
        ) {
          params = settings.deamon.processParams(params, data);
        }

        this.log({
          clear: true,
          value: `Restarting the process "<yellow>${
            this._settings.name || this._settings.id
          }</yellow>" automatically`
        });

        // launch a new process
        this.run(params, settings);
      });

      // launch the deamon if all is ready
      if (this._deamonInstance && settings.deamon.watchArgs) {
        this._deamonInstance.watch.apply(
          this._deamonInstance,
          settings.deamon.watchArgs
        );
      }
      this._deamonInstance.start();
    }
  }

  /**
   * @name            deamon
   * @type            SDeamon
   * @get
   *
   * Access the deamon used with this process. If not exist, will return undefined
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get deamon() {
    return this._deamonInstance || undefined;
  }

  /**
   * @name            success
   * @type            Function
   *
   * This method take care of the things to do when the process
   * has finished successfully like update the state, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  success() {
    // update the state
    this.state = 'success';
  }

  /**
   * @name            kill
   * @type            Function
   *
   * This method take care of the things to do when the process
   * has beek killed like update the state, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    // update the state
    this.state = 'killed';
  }

  /**
   * @name             run
   * @type              Function
   *
   * This method is meant to be overrided by the subclass
   * in order to run the actual process code.
   * Your ```run``` method has to call this one at the end and pass it an SPromise instance that represent your process.
   * This will be usefull to automate some tasks like the duration calculation, updating the state automatically,
   * pipe the events from your process promise to this process class directly, etc...
   *
   * @param         {SPromise}        processPromise         The actual process promise representing your ongoing process. This methid will subscribe to events like "close" on the promise to actually take care of duration calculation, etc...
   * @return        {SPromise}                          An SPromise instance that you have to return in your run method
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(processPromise, argsObj = {}, settings = {}) {
    // check that their's not another processing process
    if (this._currentPromise) {
      if (this._settings.throw) {
        throw new __SError(
          `Sorry but you cannot launch multiple processes in the sams <yellow>${this.constructor.name}</yellow> instance...`
        );
      } else {
        this.log({
          error: true,
          value: `Sorry but you cannot launch multiple processes in the sams <yellow>${this.constructor.name}</yellow> instance...`
        });
      }
      return;
    }

    // update the process state
    this.state = 'running';

    if (this.deamon && this.deamon.state === 'watching') {
      console.log('HOP');
      this.log({
        value: this.deamon.logs.paused
      });
    }

    // save the start timestamp
    this.startTime = Date.now();
    this.endTime = 0;
    this.duration = 0;

    const ___this = this;

    // listen when the process close to calculate duration
    processPromise
      .on('close', () => {
        if (___this === this) console.log('DDD');
        console.log('DEDEFDEFEFEF', this._deamonInstance);
        if (this.deamon && this.deamon.state === 'watching') {
          console.log('CIOJOIJEOJF');
          this.log({
            value: this.deamon.logs.watching
          });
          this.state = 'watching';
        }
      })
      .on('close,cancel,resolve,reject', () => {
        this.endTime = Date.now();
        this.duration = this.endTime - this.startTime;
        setTimeout(() => {
          this._currentPromise = null;
        });
      });

    __SPromise.pipe(processPromise, this);

    // save the current promise
    this._currentPromise = processPromise;

    return processPromise;
  }

  /**
   * @name          log
   * @type          Function
   *
   * This method allows you to log a message that will be catched by the parent manager class
   *
   * @param       {String}        message           The message you want to log
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    setTimeout(() => {
      args.forEach((arg) => {
        if (!this._currentPromise) return;
        this._currentPromise.trigger('log', arg);
      });
    });
  }
}

module.exports = SProcess;
// module.exports = __SProcessInterface.implements(SProcess, [
//   __SProcessInterface
// ]);
