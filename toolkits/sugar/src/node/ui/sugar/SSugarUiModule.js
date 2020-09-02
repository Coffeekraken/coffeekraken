const __SPromise = require('../../promise/SPromise');
const __SSugarUi = require('./SSugarUI');

/**
 * @name            SSugarUiModule
 * @namespace           node.ui.sugar
 * @type            Class
 * @extends         SPromise
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUiModule extends __SPromise {
  /**
   * @name          state
   * @type          String
   * @values        loading,ready,running,error
   * @default       loading
   *
   * Store the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _state = 'loading';
  get state() {
    return this._state;
  }
  set state(value) {
    this._setState(value);
  }
  _setState(value) {
    if (['loading', 'ready', 'running', 'error'].indexOf(value) === -1) {
      throw new __SError(
        `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
          value
        )}</magenta>" of your "<cyan>${
          this.constructor.name
        }</cyan>" class can contain only one of these values: ${[
          'loading',
          'ready',
          'running',
          'error'
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
   * @name          autorun
   * @type          Boolean
   * @get
   *
   * Access the "settings.autorun" property
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get autorun() {
    if (this._settings.autorun) {
      console.log('COPCOCOCOCOC');
    }
    return this._settings.autorun;
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
  constructor(settings = {}) {
    super(null, {
      id: 'ui.sugar.module',
      name: 'Sugar UI Module',
      autorun: false,
      ...settings
    }).start();

    this.trigger('log', {
      value: 'WELCOME'
    });
  }

  /**
   * @name          ready
   * @type          Function
   *
   * This method simply notify the main SugarUi class that this module
   * is ready
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  ready() {
    setTimeout(() => {
      this.state = 'ready';
      this.trigger('ready');
    });
  }

  /**
   * @name        run
   * @type        Function
   *
   * This method simply take an SPromise instance of a running process
   * and add some listeners on like the "error" one, etc...
   * It also pipe the process events on this module instance
   * so you don't have to take care of that manualy...
   *
   * @param       {SPromise}      runningProcess        The process you want to observe automatically
   * @return      {SPromise}                            The same process passed as parameter just in case
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(runningProcess) {
    // Pipe the process
    __SPromise.pipe(runningProcess, this, {
      filter: (value, metas) => {
        if (value.type && value.type === 'header') return false;
        return true;
      }
    });

    // return the running process just in case
    return runningProcess;
  }
};
