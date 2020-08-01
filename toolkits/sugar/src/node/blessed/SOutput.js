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
const { last } = require('lodash');

/**
 * @name                  SOutput
 * @namespace           node.blessed
 * @type                  Class
 *
 * This class is a simple SPanel extended one that accesp an SOutput instance
 * to log the data's from and display an simple UI depending on the SOutput configured keys
 *
 * @param         {SOutput}            process           The SOutput instance you want to attach
 * @param         {Object}              [settings={}]     The settings object to configure your SOutput
 *
 * @example         js
 * const SOutput = require('@coffeekraken/sugar/node/terminal/SOutput');
 * const myPanel = new SOutput(myProcess, {
 *    screen: true
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SOutput extends __SComponent {
  /**
   * @name          _process
   * @type          SOutput
   * @private
   *
   * Store the SOutput instance
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
    const _settings = __deepMerge(settings);
    // extends SPanel
    super(_settings);
    // save the process
    this._process = process;
    // subscribe to the process
    this._subscribeToProcess();
    // generate keys UI
    this._createLogBox();
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
      .on('stdout.data', (data, metas) => {
        this.log(
          data.value && data.value.value
            ? data.value.value
            : data.value
            ? data.value
            : data
        );
        this.update();
      })
      // .on('stderr.data', (data) => {
      //   if (data.error) {
      //     if (typeof data.error === 'string') {
      //       this.log(`<red>${data.error}</red>`);
      //     } else if (data.error.message) {
      //       this.log(`<red>${data.error.message}</red>`);
      //     }
      //     if (data.error.stack) this.log(data.error.stack);
      //     if (data.error.trace) this.log(data.error.trace);
      //   } else {
      //     this.log(
      //       data.value && data.value.value
      //         ? data.value.value
      //         : data.value
      //         ? data.value
      //         : data
      //     );
      //   }
      //   this.update();
      // })
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
    this._logBox.children.forEach((child) => {
      child.destroy();
    });
    this._logBox.setContent('');
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
    let logsArray = args;

    logsArray = logsArray.filter((a) => {
      if (typeof a !== 'string' || a.replace === undefined) return false;
      // if (a.trim() === '') return false;
      return true;
    });

    let currentGroup = null;

    logsArray.forEach((log) => {
      if (log.includes('[?1049h')) {
        log = log.slice(40);
      } // ugly hack that need to be checked...
      if (__stripAnsi(log).trim().length === 0) return;

      if (typeof log !== 'string') log = log.toString();
      if (__stripAnsi(log).length == 0) return;

      if (!__isChildProcess()) {
        // check if we have a "group" at start
        const groupReg = /^\[([a-zA-Z0-9_-]+)\].*?/g;
        // const groupMatch = groupReg.test(log);
        const groupMatch = groupReg.exec(log.trim());

        // if (currentGroup || groupMatch) {
        if (currentGroup || (groupMatch && groupMatch[1])) {
          currentGroup = groupMatch ? groupMatch[1] : currentGroup;

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
            if (this._content.indexOf(groupObj) === -1)
              this._content.push(groupObj);
          }
          // append the new content to the group object
          const processedLog = this._processMarkdown(log);
          if (groupObj.content.indexOf(processedLog) === -1)
            groupObj.content.push(processedLog);

          // update display
          this.update();
        } else {
          // append simply the content
          const processedLog = this._processMarkdown(log);
          if (this._content.indexOf(processedLog) === -1)
            this._content.push(processedLog);
        }
      } else {
        console.log(log);
      }
    });
  }

  /**
   * @name          _simpleTextBox
   * @type          Function
   * @private
   *
   * This method take a text as input and return a blessed box
   * representing this text to display
   *
   * @param       {String}        text        The text to display
   * @return      {Blessed.box}               A blessed box instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _simpleTextBox(text) {
    const $box = __blessed.box({
      width:
        this._logBox.width -
        this._logBox.padding.left -
        this._logBox.padding.right,
      height: 'shrink',
      style: {
        fg: 'white'
      },
      scrollable: true,
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      content: __parseMarkdown(text)
    });
    // const $line = __blessed.box({
    //   width: 1,
    //   height: 1,
    //   top: 0,
    //   left: $box.padding.left * -1,
    //   bottom: 0,
    //   style: {
    //     bg: __color('terminal.secondary').toString()
    //   }
    // });
    $box.on('attach', () => {
      setTimeout(() => {
        $box.height = $box.getScrollHeight();
        // $box.append($line);
      });
    });
    return $box;
  }

  /**
   * @name          _simpleTextBox
   * @type          Function
   * @private
   *
   * This method take a text as input and return a blessed box
   * representing this text to display
   *
   * @param       {String}        text        The text to display
   * @return      {Blessed.box}               A blessed box instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _groupBox(group, textsArray) {
    const $box = __blessed.box({
      width:
        this._logBox.width -
        this._logBox.padding.left -
        this._logBox.padding.right,
      height: 'shrink',
      style: {
        fg: 'white'
      },
      scrollable: true,
      padding: {
        top: 0,
        left: 2,
        right: 0,
        bottom: 0
      }
    });

    const color = group.toLowerCase().includes('error') ? 'red' : 'yellow';

    const contentArray = [
      group.toLowerCase().includes('error')
        ? `<red>${group}</red>`
        : `<yellow>${group}</yellow>`,
      ...textsArray
    ];

    $box.setContent(__parseMarkdown(contentArray.join('\n')));

    const $line = __blessed.box({
      width: 1,
      height: 1,
      top: 0,
      left: $box.padding.left * -1,
      bottom: 0,
      style: {
        bg: 'yellow'
      }
    });

    if (color === 'red') {
      $line.style.bg = 'red';
    }

    $box.on('attach', () => {
      setTimeout(() => {
        $box.height = $box.getScrollHeight();
        $line.height = $box.getScrollHeight();
        $box.append($line);
      });
    });
    return $box;
  }

  /**
   * @name          _createLogBox
   * @type          Function
   * @private
   *
   * This method take the registered keys in the process and generate a nice and clean UI for it
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _createLogBox() {
    // if (this._logBox) {
    //   this._logBox.destroy();
    //   this._logBox = null;
    // }

    this._logBox = __blessed.box({
      width: '100%-4',
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
        left: 1,
        right: 1,
        bottom: 1
      }
    });

    this.append(this._logBox);
  }

  update() {
    if (__isChildProcess()) return;

    clearTimeout(this._logTimeout);
    this._logTimeout = setTimeout(() => {
      if (!this.isDisplayed()) return;

      let lastY = 1;
      this._logBox.children.forEach((child) => {
        child.destroy();
      });

      this._content.forEach((item) => {
        try {
          if (typeof item === 'string') {
            const $box = this._simpleTextBox(item);
            $box.top = lastY;
            this._logBox.append($box);
            lastY += $box.getScrollHeight() + 2;
          } else if (typeof item === 'object' && item.group) {
            const $box = this._groupBox(item.group, item.content);
            $box.top = lastY;
            this._logBox.append($box);
            lastY += $box.getScrollHeight() + 2;
          }
        } catch (e) {
          // throw e;
        }
      });
      setTimeout(() => {
        this._logBox.setScrollPerc(100);
        super.update();
      }, 100);
    }, 200);
  }
};
