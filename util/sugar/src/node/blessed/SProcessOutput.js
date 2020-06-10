const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __parseHtml = require('../terminal/parseHtml');
const __isChildProcess = require('../is/childProcess');

/**
 * @name                  SProcessOutput
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is a simple SPanel extended one that accesp an SProcessOutput instance
 * to log the data's from and display an simple UI depending on the SProcessOutput configured keys
 *
 * @param         {SProcessOutput}            process           The SProcessOutput instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SProcessOutput
 *
 * @example         js
 * const SProcessOutput = require('@coffeekraken/sugar/node/terminal/SProcessOutput');
 * const myPanel = new SProcessOutput(myProcess, {
 *    screen: true
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SProcessOutput extends __SComponent {
  /**
   * @name          _process
   * @type          SProcessOutput
   * @private
   *
   * Store the SProcessOutput instance
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _process = null;

  /**
   * @name          _logBox
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _logBox = null;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(process, settings = {}) {
    const _settings = __deepMerge({}, settings);
    // extends SPanel
    super(_settings);
    // save the process
    this._process = process;
    // subscribe to the process
    this._subscribeToProcess();
    // // generate keys UI
    this._generateUI();
  }

  /**
   * @name          _subscribeToProcess
   * @type          Function
   * @private
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _subscribeToProcess() {
    // subscribe to data
    this._process
      // .on('start', (data) => {
      //   this.log(`<yellow># Starting process...</yellow>`);
      //   this.update();
      // })
      .on('close', (data) => {
        this.log(
          `Closing process with code <red>${data.code}</red> and signal <red>${data.signal}</red>...`
        );
        this.update();
      })
      .on('stdout.data', (data) => {
        this.log(
          data.value && data.value.value
            ? data.value.value
            : data.value
            ? data.value
            : data
        );
        this.update();
      })
      .on('stderr.data', (data) => {
        if (data.error) {
          this.log(`<red>${data.error.message}</red>`);
          if (data.error.stack) this.log(data.error.stack);
          if (data.error.trace) this.log(data.error.trace);
        } else {
          this.log(
            data.value && data.value.value
              ? data.value.value
              : data.value
              ? data.value
              : data
          );
        }
        this.update();
      })
      // subscribe to errors
      .on('error', (data) => {
        this.log(`<red>Something went wrong:</red>`);
        this.log(data.error ? data.error : data);
        this.update();
      });
  }

  /**
   * @name          log
   * @type          Function
   *
   * This method simply log the passed arguments
   *
   * @param       {Mixed}         ...args         The arguments you want to log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(...args) {
    args.forEach((arg) => {
      if (typeof arg === 'string') {
        arg = __parseHtml(arg);
      }
      if (!__isChildProcess()) {
        this._logBox.pushLine(arg);
        this._logBox.pushLine(' ');
      } else {
        console.log(arg);
        console.log('<black> </black>');
      }
    });
    this._logBox.setScrollPerc(100);
  }

  /**
   * @name          _generateUI
   * @type          Function
   * @private
   *
   * This method take the registered keys in the process and generate a nice and clean UI for it
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _generateUI() {
    this._logBox = __blessed.box({
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      style: {},
      mouse: true,
      keys: true,
      scrollable: true,
      scrollbar: {
        ch: ' ',
        inverse: true
      },
      style: {
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      padding: {
        top: 1,
        left: 2,
        right: 2,
        bottom: 1
      }
    });

    this.append(this._logBox);
  }

  update() {
    super.update();
  }
};
