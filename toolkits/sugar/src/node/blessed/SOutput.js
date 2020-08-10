const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __parseMarkdown = require('../terminal/parseMarkdown');
const __isChildProcess = require('../is/childProcess');
const __parse = require('../string/parse');
const __toString = require('../string/toString');
const __stripAnsi = require('strip-ansi');
const __trimLines = require('../string/trimLines');
const __extractValues = require('../object/extractValues');
const __SOutputProcessInterface = require('./SOutputProcessInterface');

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
 * - filter (null) {Function}: Specify a function that will filter the logs to display. This function will receive two parameters. The data object to log and the metas object of the SPromise instance. If you return true, the log will pass the filter. If you return false, the log will not being displayed. And if you return an updated data object, the log will be the one you returned...
 * - maxItemsByGroup (1) {Number}: Specify the number of logs to display by group
 * - clearOnStart (true) {Boolean}: Specify if you want your output to be cleared when received any events matching this pattern: "*.start"
 *
 * @todo        Support the "maxItems" setting
 * @todo        Listen for errors and display them correctly
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
   * @name           _headerBox
   * @type          blessed.box
   * @private
   *
   * Store the header content if a log object has the property "type" to "header"
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _headerBox = null;

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
    // apply some interfaces
    __SOutputProcessInterface.apply(process);

    const _settings = __deepMerge(
      {
        filter: null,
        clearOnStart: true,
        // maxItems: -1,
        maxItemsByGroup: 1
      },
      settings
    );
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
      .on('close', (data) => {
        // this.log(
        //   `Closing process with code <red>${data.code}</red> and signal <red>${data.signal}</red>...`
        // );
        // this.update();
      })
      .on('*.start', () => {
        // if (this._settings.clearOnStart) {
        //   this.clear();
        // }
      })
      .on('log', (data, metas) => {
        if (__isChildProcess()) {
          console.log(__toString(data));
          return;
        }

        let logsArray = [];
        if (typeof data === 'string') {
          const splitedLogs = data.split(/⠀/);
          splitedLogs.forEach((log) => {
            if (log.trim() === '') return;
            log = log.replace(/⠀{0,9999999}/g, '').trim();
            const parsedLog = __parse(log);
            if (
              typeof parsedLog === 'object' &&
              parsedLog.value &&
              typeof parsedLog.value === 'string'
            ) {
              logsArray.push(parsedLog);
            } else if (typeof parsedLog === 'string') {
              logsArray.push({
                value: parsedLog
              });
            }
          });
        } else if (
          typeof data === 'object' &&
          data.value &&
          typeof data.value === 'string'
        ) {
          const splitedLogs = data.value.split(/⠀/);
          splitedLogs.forEach((log) => {
            if (log.trim() === '') return;
            log = log.replace(/⠀{0,9999999}/g, '').trim();
            const parsedLog = __parse(log);
            if (
              typeof parsedLog === 'object' &&
              parsedLog.value &&
              typeof parsedLog.value === 'string'
            ) {
              logsArray.push({
                ...data,
                ...parsedLog
              });
            } else if (typeof parsedLog === 'string') {
              logsArray.push({
                ...data,
                value: parsedLog
              });
            }
          });
        }

        logsArray.forEach((logObj) => {
          // handle special logs like #clear, etc...
          if (logObj.value === '#clear') {
            this.clear();
            return;
          }

          // default logs value
          // logObj = {
          //   mb: 1,
          //   mt: 0,
          //   ...logObj
          // };

          // special syntax
          const syntaxReg = /#[a-zA-Z0-9_-]+(:[a-zA-Z0-9\.-_]+)?/gm;
          const syntaxMatches = logObj.value.match(syntaxReg);

          if (syntaxMatches) {
            syntaxMatches.forEach((arg) => {
              logObj.value = logObj.value.replace(arg, '');

              arg = arg.replace('#', '');
              const splits = arg.split(':');
              const argName = splits[0];
              const value = splits[1] ? __parse(splits[1]) : null;

              logObj[argName] = value !== null ? value : true;
            });

            logObj.value = logObj.value.trim();
          }

          if (
            this._settings.filter &&
            typeof this._settings.filter === 'function'
          ) {
            const res = this._settings.filter(logObj, metas);
            if (res === false) return;
            if (res !== true) logObj = res;
          }

          // setTimeout(() => {
          this.log(logObj);
          // }, 200);
        });
        // this.update();
      });
    // .on('error', (data) => {
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
  _clearTimeout = null;
  _allowClear = true;
  _updateTimeout = false;
  clear() {
    nativeConsole.trace('CLEAS');
    throw 'CCO';
    if (__isChildProcess()) {
      console.log('#clear');
    } else {
      clearTimeout(this._clearTimeout);
      this._clearTimeout = setTimeout(() => {
        this._allowClear = true;
      }, 200);

      if (this._allowClear) {
        this._allowClear = false;
        this._content = [];
        this._lastY = 1;
        this._logBoxChilds.forEach((child, i) => {
          child.destroy();
        });
        this._logBoxChilds = [];
        this.update();
        this._updateTimeout = true;
        setTimeout(() => {
          this._updateTimeout = false;
          this.update();
        }, 200);
      }
    }
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
    let logsObjArray = args;
    let currentGroup = null;

    // filter the content to remove the "temp" logs
    this._content = this._content.filter((logObj) => {
      if (logObj.temp) {
        this._lastY -= logObj.$box.height;
        if (logObj.$box) logObj.$box.destroy();
        return false;
      }
      return true;
    });

    logsObjArray.forEach((logObj) => {
      if (__isChildProcess()) {
        console.log(__toString(logObj));
        return;
      }

      if (logObj.value.includes('[?1049h')) {
        logObj.value = logObj.value.slice(40);
      } // ugly hack that need to be checked...
      if (__stripAnsi(logObj.value).trim().length === 0) return;

      if (typeof logObj.value !== 'string')
        logObj.value = logObj.value.toString();

      if (logObj.type && logObj.type === 'header') {
        // generate the header box
        this._createHeaderBox(logObj);
      } else if (logObj.group && typeof logObj.group === 'string') {
        const actualGroupObjArray = this._content.filter((item) => {
          if (typeof item !== 'object') return false;
          if (item.group === logObj.group) return true;
          return false;
        });
        let groupObj = {
          group: logObj.group,
          content: []
        };
        if (actualGroupObjArray.length) {
          groupObj = actualGroupObjArray[0];
        } else {
          if (this._content.indexOf(groupObj) === -1)
            this._content.push(groupObj);
        }
        // if (groupObj.content.indexOf(processedLog) === -1)
        groupObj.content.push(logObj);
      } else {
        // if (this._content.indexOf(processedLog) === -1)
        this._content.push(logObj);
      }
    });

    // handle the maxItems setting
    if (this._settings.maxItems !== -1) {
      let itemsCount = 0;
      let newContent = [];
      for (let i = this._content.length - 1; i >= 0; i--) {
        const item = this._content[i];
        newContent = [item, ...newContent];
        itemsCount++;
        // stop if we reach the maxItems count
        if (itemsCount >= this._settings.maxItems) {
          break;
        }
      }
      // save the new content
      this._content = newContent;
    }

    // update display
    this.update();
  }

  /**
   * @name            update
   * @type            Function
   *
   * This method take the content of the this._content property and display it correctly on the screen
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _lastY = 1;
  _logBoxChilds = [];
  _stuperUpdateTimeout = null;
  update() {
    if (__isChildProcess()) return;
    // if (this._updateTimeout) return;
    if (!this.isDisplayed()) return;

    if (!this._content.length) {
      super.update();
      return;
    }

    this._content.forEach((item) => {
      try {
        if (item.$box) {
        } else if (item.value && typeof item.value === 'string') {
          const $box = this._simpleTextBox(item.value);
          $box.top = this._lastY + item.mt;
          this._logBoxChilds.push($box);
          this._logBox.append($box);
          item.$box = $box;
          this._lastY += $box.getScrollHeight() + item.mt + item.mb;
        } else if (typeof item === 'object' && item.group) {
          const $box = this._groupBox(item.group, item.content);
          $box.top = this._lastY;
          this._logBoxChilds.push($box);
          item.$box = $box;
          this._logBox.append($box);
          this._lastY += $box.getScrollHeight() + item.mt + item.mb;
        }
      } catch (e) {
        throw e;
      }
    });
    clearTimeout(this._superUpdateTimeout);
    this._superUpdateTimeout = setTimeout(() => {
      this._logBox.setScrollPerc(100);
      super.update();
    }, 50);
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

    const title = __parseMarkdown(
      group.toLowerCase().includes('error')
        ? `<red>${group}</red>`
        : `<yellow>${group}</yellow>`
    );

    if (this._settings.maxItemsByGroup === -1) {
      const logsString = __extractValues(textsArray, 'value').join('\n');
      $box.setContent(
        __trimLines(`${title}
      ${__parseMarkdown(logsString)}`)
      );
    } else {
      const contents = textsArray.slice(this._settings.maxItemsByGroup * -1);
      const logsString = __extractValues(contents, 'value').join('\n');
      $box.setContent(
        __trimLines(`${title}
      ${__parseMarkdown(logsString)}`)
      );
    }

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
   * @name          _createHeaderBox
   * @type          Function
   * @private
   *
   * This emthod take a logObj that has the property "type" to "header" and generate a
   * header box based on the blessed.box function.
   *
   * @param       {Object}      logObj          The logObj to use to generate the header box
   * @return      {blessed.box}                 Return the blessed.box instance also saved in the "_headerBox" instance property
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _createHeaderBox(logObj) {
    this._headerBox = __blessed.box({
      width: '100%',
      height: 1,
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
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: __color('terminal.primary').toString()
        },
        scrollbar: {
          bg: __color('terminal.primary').toString()
        }
      },
      content: __parseMarkdown(logObj.value),
      padding: {
        top: 1,
        left: 1,
        right: 1,
        bottom: 1
      }
    });

    this.append(this._headerBox);
    this._headerBox.height = this._headerBox.getScrollHeight() + 4;

    this._logBox.top = this._headerBox.height;

    return this._headerBox;
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
        top: 0,
        left: 1,
        right: 1,
        bottom: 1
      }
    });

    this.append(this._logBox);
  }
};
