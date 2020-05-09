const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');
const __splitEvery = require('../string/splitEvery');
const __countLine = require('../string/countLine');
const __uniqid = require('../string/uniqid');
const __sugarConfig = require('../config/sugar');
const { print, stringify } = require('q-i');
const __SPromise = require('../promise/SPromise');

/**
 * @name                    SPanel
 * @namespace               sugar.node.terminal
 * @type                    Class
 *
 * This class define a "panel" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this panel. The name has to stick to this characters only ```[a-zA-Z0-9_-]```
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your panel wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your panel in the terminal. If you have your own screen object
 *
 * @example         js
 * const SPanel = require('@coffeekraken/sugar/node/terminal/SPanel');
 * const panel = new SPanel('my-cool-pannel', {
 * });
 * panel.log('Hello world');
 *
 * @see       https://www.npmjs.com/package/q-i
 * @see       https://www.npmjs.com/package/blessed
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SPanel extends __blessed.Box {
  /**
   * @name              _name
   * @type              String
   * @private
   *
   * Store the panel name
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _name = null;

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the panel settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        name: __uniqid(),
        beforeLog: '',
        beforeEachLine: '',
        padBeforeLog: true,
        screen: false,
        logBox: null,
        input: {
          width: 3,
          height: 1,
          placeholder: null
        },
        blessed: {
          mouse: true,
          keys: true,
          vi: true,
          scrollable: true,
          alwaysScroll: true,
          scrollbar: {
            ch: ' ',
            inverse: true
          },
          style: {
            scrollbar: {
              bg: __sugarConfig('colors.primary')
            }
          },
          padding: {
            top: 1,
            bottom: 1,
            left: 2,
            right: 1
          }
        }
      },
      settings
    );

    // create the screen if setted in the settings
    let screenInstance;
    if (_settings.screen === true) {
      screenInstance = __blessed.screen({
        smartCSR: true
      });
    } else if (_settings.screen instanceof __blessed.screen) {
      screenInstance = _settings.screen;
    }
    // extend from blessed.box
    super(_settings.blessed);

    // save settings
    this._settings = _settings;

    // manage logBox setting
    if (!this._settings.logBox) this._settings.logBox = this;

    // append this box to the screen
    if (screenInstance) {
      screenInstance.append(this);
      this.screen = screenInstance;
    }

    // save the name
    if (!/^[a-zA-Z0-9\._-\s]+$/.test(this._settings.name)) {
      throw new Error(
        `The name of an SPanel instance can contain only letters like [a-zA-Z0-9_-. ]...`
      );
    }
    this._name = this._settings.name;

    // render the screen
    if (this.screen) {
      this.screen.title = this._name;
      this.screen.render();
    }
  }

  /**
   * @name                  update
   * @type                  Function
   *
   * This method simply update the screen if the panel is a child of one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (this.screen) this.screen.render();
  }

  /**
   * @name                   input
   * @type                  Function
   *
   * Allow to display an input to ask something to the user
   *
   * @param       {Object}      [settings = {}]       A settings object to configure your input. Here's the available settings:
   * - width (100%) {String|Number}: Specify the width of your input
   * - height (1) {String|Number}: Specify the height of your input
   * - placeholder (null) {String}: Specify a placeholder to display before the user starts to write something
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  input(settings = {}) {
    settings = __deepMerge(
      {
        bottom: 0,
        left:
          __countLine(__parseHtml(this._settings.beforeLog)) +
          __countLine(__parseHtml(this._settings.beforeEachLine)),
        focus: true,
        keys: true,
        mouse: true,
        inputOnFocus: true,
        style: {
          fg: 'black',
          bg: 'white'
        },
        padding: {
          top: 0,
          left: 1,
          right: 1,
          bottom: 0
        }
      },
      this._settings.input,
      settings
    );

    const input = __blessed.textbox({
      top: this._settings.logBox.content.split('\n').length,
      ...settings
    });

    input.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

    setTimeout(() => {
      const _beforeLog =
        __parseHtml(this._settings.beforeLog) +
        __parseHtml(this._settings.beforeEachLine);
      const beforeBox = __blessed.box({
        top: this._settings.logBox.content.split('\n').length,
        left: 0,
        width: __countLine(_beforeLog),
        height: 1,
        content: _beforeLog
      });

      this.log(' ');
      this._settings.logBox.append(beforeBox);
      this._settings.logBox.append(input);

      if (settings.focus) input.focus();
      if (settings.placeholder) {
        const placeholder = settings.placeholder.toString();
        input.setValue(placeholder);
        input.width =
          placeholder.length + input.padding.left + input.padding.right;
        let placeholderPressed = false;
        setTimeout(() => {
          let isBackspace = false;
          input.onceKey('backspace', () => {
            isBackspace = true;
          });
          input.on('keypress', (value) => {
            setTimeout(() => {
              if (!placeholderPressed) {
                if (!isBackspace) {
                  input.setValue(value);
                }
                placeholderPressed = true;
              }
              input.width =
                input.getValue().length +
                input.padding.left +
                input.padding.right +
                2;
              this.update();
            });
          });
        });
      }
      input.on('submit', (value) => {
        input.promise.resolve(value);
        input.style.bg = 'green';
        input.width =
          input.getValue().length + input.padding.left + input.padding.right;
        this.update();
      });
      input.on('cancel', () => {
        input.promise.cancel('fwefew');
        input.style.bg = 'red';
        input.width =
          input.getValue().length + input.padding.left + input.padding.right;
        this.update();
      });
      this.update();
    });

    return input;
  }

  /**
   * @name                  log
   * @type                  Function
   *
   * Allow to log some content in the panel
   *
   * @param       {String}        message         The message to log
   * @param       {Object}        [settings={}]   Some settings to override for this particular log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(message, settings = {}) {
    if (!Array.isArray(message)) message = [message];

    const logSettings = __deepMerge(this._settings, settings);

    let lines = [];

    message.forEach((m) => {
      // check message type
      switch (typeof m) {
        case 'object':
          m = stringify(m);
          break;
      }
      if (Array.isArray(m)) m = stringify(m);

      m = __parseHtml(m);

      let beforeLog = logSettings.beforeLog;
      if (beforeLog) {
        if (typeof beforeLog === 'function') {
          beforeLog = beforeLog(m);
        }
        if (typeof beforeLog === 'number') {
          beforeLog = ' '.repeat(parseInt(beforeLog));
        }
      } else {
        beforeLog = '';
      }

      let beforeEachLine = logSettings.beforeEachLine;
      if (beforeEachLine) {
        if (typeof beforeEachLine === 'function') {
          beforeEachLine = beforeEachLine(m);
        }
        if (typeof beforeEachLine === 'number') {
          beforeEachLine = ' '.repeat(parseInt(beforeEachLine));
        }
      } else {
        beforeEachLine = '';
      }

      let formatedBeforeEachLine = __parseHtml(beforeEachLine);
      let formatedBeforeLog = __parseHtml(beforeLog);
      let formatedMessage = m;

      // split lines
      formatedMessage = formatedMessage.split('\n');

      formatedMessage.map((line, i) => {
        line = __splitEvery(
          line,
          this.width -
            logSettings.blessed.padding.left -
            logSettings.blessed.padding.right -
            __countLine(formatedBeforeLog) -
            __countLine(formatedBeforeEachLine)
        );
        line = line.map((l, j) => {
          if (i === 0 && j === 0) {
            return formatedBeforeLog + formatedBeforeEachLine + l;
          } else {
            return (
              ' '.repeat(__countLine(formatedBeforeLog)) +
              formatedBeforeEachLine +
              l
            );
          }
        });

        lines = [...lines, ...line];
      });

      // append the content to the panel
      logSettings.logBox.pushLine(lines.join('\n'));
    });

    logSettings.logBox.setScrollPerc(100);

    this.update();

    // return the lines
    return lines;
  }
};
