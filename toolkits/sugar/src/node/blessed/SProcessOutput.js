const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __parseHtml = require('../terminal/parseHtml');
const __parseMarkdown = require('../terminal/parseMarkdown');
const __isChildProcess = require('../is/childProcess');
const __stripAnsi = require('strip-ansi');
const __countLine = require('../string/countLine');
const __splitEvery = require('../string/splitEvery');
const __upperFirst = require('../string/upperFirst');

/**
 * @name                  SProcessOutput
 * @namespace           node.blessed
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
   * @name          _content
   * @type          Array
   * @private
   *
   * Store the content depending on his formatting style like groups, etc...
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _content = [];

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
    const _settings = __deepMerge(
      {
        style: {
          bg: 'red'
        }
      },
      settings
    );
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
        // this.log(
        //   `Closing process with code <red>${data.code}</red> and signal <red>${data.signal}</red>...`
        // );
        // this.update();
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
          if (typeof data.error === 'string') {
            this.log(`<red>${data.error}</red>`);
          } else if (data.error.message) {
            this.log(`<red>${data.error.message}</red>`);
          }
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
   *
   * @name          clear
   * @type          Function
   *
   * This method simply clear the output
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  clear() {
    this._content = [];
    if (this._logBox) this._logBox.setContent('');
  }

  _processMarkdown(content) {
    content = content.trim();
    content = __parseMarkdown(content);
    return content;
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
    // clearTimeout(this._logInterval);
    // this._logInterval = setTimeout(() => {
    //   console.log(this._content);
    //   process.exit();
    // }, 10000);

    // clearTimeout(this._logTimeout);
    // this._logTimeout = setTimeout(() => {
    // if (this._content[0] && this._content[0].includes('Frontend Express')) {
    //   console.log(this._content);
    // }

    let logsArray = args;

    // args.forEach((arg) => {
    //   if (typeof arg !== 'string') return;
    //   const lines = arg.split('\n');
    //   linesArray = [...linesArray, ...lines];
    // });

    logsArray = logsArray.filter((a) => {
      // if (!a) return false;
      // if (__stripAnsi(a).length <= 0) return false;
      if (typeof a !== 'string' || a.replace === undefined) return false;
      // if (a.trim() === '') return false;
      return true;
    });

    let currentGroup = null;

    logsArray.forEach((log) => {
      if (log.includes('[?1049h')) {
        log = log.slice(40);
      } // ugly hack that need to be checked...

      if (typeof log !== 'string') log = log.toString();

      if (!__isChildProcess()) {
        // check if we have a "group" at start
        const groupReg = /^\[([a-zA-Z0-9_-]+)\].*?/g;
        const groupMatch = groupReg.exec(log.trim());

        // console.log(groupMatch);

        if (currentGroup || (groupMatch && groupMatch[1])) {
          currentGroup = groupMatch ? groupMatch[1] : currentGroup;

          // console.log(currentGroup);

          // process the arg
          log = log.replace(`[${currentGroup}]`, '').trim();

          const actualGroupObjArray = this._content.filter((item) => {
            if (typeof item !== 'object') return false;
            if (item.group === currentGroup) return true;
            return false;
          });
          let groupObj = {
            group: currentGroup,
            content: []
          };
          if (actualGroupObjArray.length) {
            groupObj = actualGroupObjArray[0];
          } else {
            this._content.push(groupObj);
          }
          // append the new content to the group object
          groupObj.content.push(this._processMarkdown(log));
        } else {
          // append simply the content
          this._content.push(this._processMarkdown(log));
        }

        const processString = (string, color = 'primary') => {
          return string;
          if (color === 'red') string = ` <iCross/> ${string}`;

          // split arg by lines
          const argLinesArray = string.split('\n');
          let finalLinesArray = [];
          argLinesArray.forEach((line) => {
            const lines = __splitEvery(line, this._logBox.width - 10);
            finalLinesArray = [...finalLinesArray, ...lines];
          });
          finalLinesArray = finalLinesArray.map((line) => {
            return __parseHtml(`<${color}>│</${color}> ${line}`);
          });
          return finalLinesArray.join('\n');
        };

        // console.log(this._content);

        // this._createLogBox();
        const contentArray = [];
        // this._logBox.setContent('');
        this._content.forEach((item) => {
          if (typeof item === 'string') {
            contentArray.push(item);
            // this._logBox.pushLine(item);
          } else if (typeof item === 'object' && item.group) {
            const color =
              item.group.toLowerCase() === 'error' ? 'red' : 'primary';
            contentArray.push(
              __parseHtml(`<${color}>│ ${__upperFirst(item.group)}</${color}>`)
            );
            contentArray.push(
              processString(item.content[item.content.length - 1], color)
            );
            contentArray.push(' ');
            contentArray.push(' ');
          }
        });
        this._logBox.setContent(contentArray.join('\n'));
        // this._logBox.screen.render();
      } else {
        console.log(log);
        // console.log('<black> </black>');
      }
    });
    if (this._logBox) this._logBox.setScrollPerc(100);
    // }, 100);
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
    if (__isChildProcess()) return;

    this._createLogBox();
  }

  _createLogBox() {
    if (this._logBox) {
      this._logBox.destroy();
      this._logBox = null;
    }

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
    // if (__isChildProcess()) return;
    super.update();
  }
};
