const __packageRoot = require('../path/packageRoot');
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
const __SOutputLogInterface = require('./interface/SOutputLogInterface');
const __SOutputSourceInterface = require('./interface/SOutputSourceInterface');
const __wait = require('../time/wait');

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
   * @name          $logBox
   * @type          blessed.Box
   * @private
   *
   * Store the actual box where the logs will be pushed
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $logBox = null;

  /**
   * @name           $headerBox
   * @type          blessed.box
   * @private
   *
   * Store the header content if a log object has the property "type" to "header"
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  $headerBox = null;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, settings = {}) {
    const _settings = __deepMerge(
      {
        filter: null,
        // maxItems: -1,
        maxItemsByGroup: 1,
        stacks: ['log', '*.log', 'warning', '*.warning', 'error', '*.error']
      },
      settings
    );
    // extends SPanel
    super(_settings);

    // generate keys UI
    this._createLogBox();

    if (!Array.isArray(source)) source = [source];
    source.forEach((s) => {
      __SOutputSourceInterface.apply(s, {
        title: 'SOutput source issue',
        description:
          'One of the passed "source" for the SOutput class does not answer the minimal requirements of the "SOutputSourceInterface"...'
      });

      // subscribe to the process
      this._subscribeToSource(s);
    });
  }

  /**
   * @name          _subscribeToSource
   * @type          Function
   * @private
   *
   * This method simply listen to the process and log the values getted
   * from it into the panel
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _subscribeToSource(s) {
    // subscribe to data
    s.on('close', async (data) => {
      // await __wait();
      // this.log({
      //   value: `Closing process with code <red>${data.code}</red> and signal <red>${data.signal}</red>...`
      // });
    })
      .on('success', (data) => {
        this.log({
          value: `#success The process has been finished <green>successfully</green>`
        });
      })

      // .on('error', (error) => {
      //   this.log({
      //     error: true,
      //     ...error
      //   });
      // })
      .on(this._settings.stacks.join(','), (data, metas) => {
        this.log({
          [metas.stack.split('.').pop()]: true,
          ...data
        });
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
  _clearTimeout = null;
  _allowClear = true;
  clear() {
    if (__isChildProcess()) {
      console.log(
        __toString({
          clear: true
        })
      );
    } else {
      clearTimeout(this._clearTimeout);
      this._clearTimeout = setTimeout(() => {
        this._allowClear = true;
      }, 200);

      if (this._allowClear) {
        this._allowClear = false;
        this._content = [];
        this._lastY = 1;
        this.$logBoxChilds.forEach((child, i) => {
          child.destroy();
        });
        if (this.$headerBox) {
          this.$headerBox.destroy();
          this.$headerBox = null;
          this.$logBox.top = 0;
        }
        this.$logBoxChilds = [];
        this.update();
      }
    }
  }

  _processMarkdown(content) {
    content = content.trim();
    content = __parseMarkdown(content);
    return content;
  }

  /**
   * @name          _parseLog
   * @type          Function
   * @private
   *
   * This method take a simple string or a complexe data object and parse them to
   * generate a nicely formated log object to pass to the ```log``` method.
   *
   * @param       {String|Object}           data           The log data to parse
   * @return      {Array<Object>}                           An array of nicely formated log object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _parseLog(...args) {
    let logsArray = [];

    args.forEach((data) => {
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
            parsedLog = __SOutputLogInterface.applyAndComplete(parsedLog);
            logsArray.push(parsedLog);
          } else if (typeof parsedLog === 'string') {
            if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
              const args = __SOutputLogInterface.parseAndComplete(parsedLog);
              logsArray.push(args);
            } else {
              const args = __SOutputLogInterface.complete({
                value: parsedLog
              });
              logsArray.push(args);
            }
          } else {
            logsArray.push({
              value: __toString(parsedLog, {
                beautify: true
              })
            });
          }
        });
      } else if (
        typeof data === 'object' &&
        data.value &&
        typeof data.value === 'string'
      ) {
        // apply the interface
        data = __SOutputLogInterface.applyAndComplete(data);

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
            __SOutputLogInterface.apply(parsedLog);
            logsArray.push({
              ...data,
              ...parsedLog
            });
          } else if (typeof parsedLog === 'string') {
            if (parsedLog.includes(' -v ') || parsedLog.includes(' --value ')) {
              const args = __SOutputLogInterface.parseAndComplete(parsedLog);
              logsArray.push({
                ...data,
                ...args
              });
            } else {
              logsArray.push({
                ...data,
                value: parsedLog
              });
            }
          } else {
            logsArray.push({
              value: __toString(parsedLog, {
                beautify: true
              })
            });
          }
        });
      } else {
        logsArray.push({
          value: __toString(data, {
            beautify: true
          })
        });
      }
    });

    return logsArray;
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
  _currentModuleId = null;
  log(...args) {
    // await __wait(100);

    let logsObjArray = this._parseLog(...args);

    for (let i = 0; i < logsObjArray.length; i++) {
      const logObj = logsObjArray[i];
      if (logObj.clear) {
        this.clear();
        logsObjArray = [logObj];
        break;
      }
    }

    // filter the content to remove the "temp" logs
    this._content = this._content.filter((logObj) => {
      if (logObj.temp && logObj.$box) {
        this._lastY -= logObj.$box.height;
        if (logObj.$box) logObj.$box.destroy();
        return false;
      }
      return true;
    });

    logsObjArray.forEach((logObj) => {
      if (
        this._settings.filter &&
        typeof this._settings.filter === 'function'
      ) {
        const res = this._settings.filter(logObj);
        if (res === false) return;
        if (res !== true) logObj = res;
      }

      if (__isChildProcess()) {
        console.log(__toString(logObj));
        return;
      }

      if (logObj.value.includes('[?1049h')) {
        logObj.value = logObj.value.slice(40);
      } // ugly hack that need to be checked...
      if (__stripAnsi(logObj.value).trim().length === 0) return;

      if (typeof logObj.value !== 'string')
        logObj.value = __toString(logObj.value);

      // replace the package root in the log
      // logObj.value = logObj.value.split(`${__packageRoot()}/`).join('');

      if (logObj.module && typeof logObj.module === 'object') {
        if (logObj.module.id && logObj.module.id !== this._currentModuleId) {
          this._currentModuleId = logObj.module.id;
          this._content.push({
            value: __parseMarkdown(
              `<bgPrimary><black> ${logObj.module.name || logObj.module.id} (${
                logObj.module.id || logObj.module.idx
              }) </black></bgPrimary>`
            )
          });
        }
      }

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
  _lastContentCount = 0;
  $logBoxChilds = [];
  _updateTimeout = null;
  _updateCountdown = 0;
  update() {
    if (__isChildProcess()) return;
    // if (!this.allowRender()) return;
    if (!this.isDisplayed()) return;

    this._lastY = 1;

    if (
      !this._content.length // ||
      // this._lastContentCount === this._content.length
    ) {
      super.update();
      return;
    }

    if (this._lastContentCount !== this._content.length) {
      this._updateCountdown = 5;
    }

    this._content.forEach((item) => {
      if (item.$box) {
        if (item.group) {
          let contentArray;
          if (this._settings.maxItemsByGroup) {
            contentArray = item.content.slice(
              this._settings.maxItemsByGroup * -1
            );
          } else {
            contentArray = item.content;
          }
          const logsString = __extractValues(contentArray, 'value').join('\n');
          item.$box.setContent(
            __trimLines(`${item.$box.title}
               ${__parseMarkdown(logsString)}`)
          );
          item.$box.height = logsString.split('\n').length + 1;
          item.$box.$line.height = logsString.split('\n').length + 1;
        } else {
        }

        item.$box.top = this._lastY + (item.mt || 0);
        this._lastY +=
          item.$box.getScrollHeight() + (item.mt || 0) + (item.mb || 1);
      } else if (item.value && typeof item.value === 'string' && item.error) {
        const $box = this._errorTextBox(item.value);
        $box.top = this._lastY + item.mt;
        this.$logBoxChilds.push($box);
        this.$logBox.append($box);
        item.$box = $box;
        this._lastY += $box.getScrollHeight() + item.mt + item.mb;
      } else if (item.value && typeof item.value === 'string' && item.warning) {
        const $box = this._warningTextBox(item.value);
        $box.top = this._lastY + item.mt;
        this.$logBoxChilds.push($box);
        this.$logBox.append($box);
        item.$box = $box;
        this._lastY += $box.getScrollHeight() + item.mt + item.mb;
      } else if (item.value && typeof item.value === 'string') {
        const $box = this._simpleTextBox(item.value);
        $box.top = this._lastY + item.mt;
        this.$logBoxChilds.push($box);
        this.$logBox.append($box);
        item.$box = $box;
        this._lastY += $box.getScrollHeight() + item.mt + item.mb;
      } else if (typeof item === 'object' && item.group) {
        const $box = this._groupBox(item.group, item.content);
        $box.top = this._lastY;
        this.$logBoxChilds.push($box);
        item.$box = $box;
        this.$logBox.append($box);
        this._lastY += $box.getScrollHeight() + 1;
      } else {
        const value = '' + item.value;
        const $box = this._simpleTextBox(value);
        $box.top = this._lastY + item.mt;
        this.$logBoxChilds.push($box);
        this.$logBox.append($box);
        item.$box = $box;
        this._lastY += $box.getScrollHeight() + item.mt + item.mb;
      }
    });

    this.$logBox.setScrollPerc(100);
    this._lastContentCount = this._content.length;
    super.update();
    if (this._updateCountdown > 0) {
      setTimeout(() => {
        this.update();
      }, 200);
      this._updateCountdown--;
    }
    // setTimeout(() => {
    //   console.log('render');
    //   super.update();
    //   super.update();
    //   super.update();
    //   super.update();
    //   super.update();
    //   super.update();
    //   super.update();
    // }, 200);
    // await __wait(200);
    // console.log('CCCC');
    // super.update();
    // await __wait(200);
    // console.log('CCCC');
    // super.update();
    // await __wait(200);
    // console.log('CCCC');
    // super.update();
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
        this.$logBox.width -
        this.$logBox.padding.left -
        this.$logBox.padding.right,
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
   * @name          _errorTextBox
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
  _errorTextBox(text) {
    const $box = __blessed.box({
      width:
        this.$logBox.width -
        this.$logBox.padding.left -
        this.$logBox.padding.right,
      height: 'shrink',
      style: {
        fg: 'white'
      },
      scrollable: true,
      padding: {
        top: 0,
        left: 4,
        right: 0,
        bottom: 0
      },
      content: __parseMarkdown(text)
    });

    const $line = __blessed.box({
      width: 1,
      height: 1,
      top: 0,
      left: $box.padding.left * -1,
      bottom: 0,
      style: {
        bg: __color('terminal.red').toString()
      }
    });
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
   * @name          _warningTextBox
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
  _warningTextBox(text) {
    const $box = __blessed.box({
      width:
        this.$logBox.width -
        this.$logBox.padding.left -
        this.$logBox.padding.right,
      height: 'shrink',
      style: {
        fg: 'white'
      },
      scrollable: true,
      padding: {
        top: 0,
        left: 4,
        right: 0,
        bottom: 0
      },
      content: __parseMarkdown(text)
    });

    const $line = __blessed.box({
      width: 1,
      height: 1,
      top: 0,
      left: $box.padding.left * -1,
      bottom: 0,
      style: {
        bg: __color('terminal.yellow').toString()
      }
    });
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
        this.$logBox.width -
        this.$logBox.padding.left -
        this.$logBox.padding.right,
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

    $box.title = title;

    // if (this._settings.maxItemsByGroup === -1) {
    //   const logsString = __extractValues(textsArray, 'value').join('\n');
    //   $box.setContent(
    //     __trimLines(`${title}
    //   ${__parseMarkdown(logsString)}`)
    //   );
    // } else {
    //   const contents = textsArray.slice(this._settings.maxItemsByGroup * -1);
    //   const logsString = __extractValues(contents, 'value').join('\n');
    //   $box.setContent(
    //     __trimLines(`${title}
    //   ${__parseMarkdown(logsString)}`)
    //   );
    // }

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

    $box.$line = $line;

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
   * @return      {blessed.box}                 Return the blessed.box instance also saved in the "$headerBox" instance property
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _createHeaderBox(logObj) {
    this.$headerBox = __blessed.box({
      width: 'shrink',
      height: 1,
      top: 0,
      left: 1,
      right: 1,
      bottom: 0,
      style: {},
      mouse: true,
      keys: true,
      scrollable: true,
      // border: {
      //   type: 'line'
      // },
      style: {
        // border: {
        //   fg: __color('terminal.primary').toString()
        // },
      },
      content: __parseMarkdown(logObj.value),
      padding: {
        top: 1,
        left: 1,
        right: 1,
        bottom: 1
      }
    });

    const $line = __blessed.box({
      height: 1,
      bottom: 1,
      left: 0,
      style: {
        fg: 'yellow'
      }
    });

    this.$headerBox.$line = $line;

    this.$headerBox.on('attach', () => {
      setTimeout(() => {
        this.$headerBox.height = this.$headerBox.getScrollHeight() + 4;
        $line.setContent('_'.repeat(this.$headerBox.width));
        this.$headerBox.append($line);
      });
    });

    this.append(this.$headerBox);

    this.$logBox.top = this.$headerBox.height + 1;

    return this.$headerBox;
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
    // if (this.$logBox) {
    //   this.$logBox.destroy();
    //   this.$logBox = null;
    // }

    this.$logBox = __blessed.box({
      // width: '100%-4',
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
        left: 2,
        right: 2,
        bottom: 0
      }
    });

    this.append(this.$logBox);
  }
};
