const __deepMerge = require('../../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('../../terminal/parseHtml');
const __splitEvery = require('../../string/splitEvery');
const __countLine = require('../../string/countLine');
const __uniqid = require('../../string/uniqid');
const __sugarConfig = require('../../config/sugar');
const { print, stringify } = require('q-i');
const __SPromise = require('../../promise/SPromise');
const __color = require('../../color/color');
const __hotkey = require('../../keyboard/hotkey');
const __clone = require('../../object/clone');

const __SComponent = require('../SComponent');

/**
 * @name                    SLogPanel
 * @namespace               sugar.node.blessed.panel
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
 * const SLogPanel = require('@coffeekraken/sugar/node/blessed/panel/SLogPanel');
 * const panel = new SLogPanel('my-cool-pannel', {
 * });
 * panel.log('Hello world');
 *
 * @see       https://www.npmjs.com/package/q-i
 * @see       https://www.npmjs.com/package/blessed
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SLogPanel extends __SComponent {
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
    super(
      __deepMerge(
        {
          name: __uniqid(),
          beforeLog: '',
          beforeEachLine: '',
          padBeforeLog: true,
          // input: {
          //   width: 3,
          //   height: 1,
          //   placeholder: null,
          //   bottom: 0,
          //   left: 0,
          //   focus: true,
          //   keys: true,
          //   mouse: true,
          //   inputOnFocus: true,
          //   style: {
          //     fg: __color('terminal.black').toString(),
          //     bg: __color('terminal.yellow').toString()
          //   },
          //   padding: {
          //     top: 0,
          //     left: 1,
          //     right: 1,
          //     bottom: 0
          //   }
          // },
          mouse: true,
          keys: true,
          // vi: true,
          scrollable: true,
          // alwaysScroll: true,
          scrollbar: {
            ch: ' ',
            inverse: true
          },
          style: {
            bg: __color('terminal.black').toString(),
            scrollbar: {
              bg: __color('terminal.primary').toString()
            }
          },
          padding: {
            top: 1,
            bottom: 0,
            left: 1,
            right: 1
          }
        },
        settings
      )
    );

    // save the name
    if (!/^[a-zA-Z0-9\._-\s]+$/.test(this._settings.name)) {
      throw new Error(
        `The name of an SLog instance can contain only letters like [a-zA-Z0-9_-. ]...`
      );
    }
    this._name = this._settings.name;

    // render the screen
    if (this.screen) {
      this.screen.title = this._name;
    }
  }

  // /**
  //  * @name                  _input
  //  * @type                  Function
  //  * @private
  //  *
  //  * This method return a pre-configured textbox
  //  *
  //  * @param       {Object}      [settings={}]       A blessed textbox settings object with some additional settings:
  //  * - focus (true) {Boolean}: Specify if you want the input to have focus directly
  //  * - placeholder (null) {String}: Specify a placeholder to set in the input
  //  * @return      {Textbox}             A blessed textbox
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // _input(settings = {}) {
  //   settings = __deepMerge(
  //     {
  //       focus: true,
  //       placeholder: null
  //     },
  //     __clone(this._settings.input, true),
  //     settings
  //   );

  //   const input = __blessed.textbox(settings);
  //   input.promise = new __SPromise((resolve, reject, trigger, cancel) => {});

  //   input.on('attach', () => {
  //     setTimeout(() => {
  //       if (settings.focus) input.focus();

  //       let placeholderPressed = false;
  //       if (settings.placeholder) {
  //         const placeholder = settings.placeholder.toString();
  //         input.setValue(placeholder);
  //         input.width =
  //           placeholder.length + input.padding.left + input.padding.right;
  //       }

  //       let isBackspace = false;
  //       input.onceKey('backspace', () => {
  //         isBackspace = true;
  //       });

  //       input.on('keypress', (value) => {
  //         setTimeout(() => {
  //           if (settings.placeholder && !placeholderPressed) {
  //             if (!isBackspace) {
  //               input.setValue(value);
  //             }
  //             placeholderPressed = true;
  //           }
  //           input.width =
  //             input.getValue().length +
  //             input.padding.left +
  //             input.padding.right +
  //             2;
  //           this.update();
  //         });
  //       });
  //       input.on('submit', (value) => {
  //         input.promise.resolve(value);
  //         input.style.bg = __color('terminal.green').toString();
  //         input.width =
  //           input.getValue().length + input.padding.left + input.padding.right;
  //         this.update();
  //       });
  //       input.on('cancel', () => {
  //         input.promise.cancel();
  //         input.style.bg = __color('terminal.red').toString();
  //         input.width =
  //           input.getValue().length + input.padding.left + input.padding.right;
  //         this.update();
  //       });
  //       this.update();
  //     });
  //   });
  //   return input;
  // }

  // /**
  //  * @name                   input
  //  * @type                  Function
  //  *
  //  * Allow to display an input to ask something to the user
  //  *
  //  * @param       {Object}      [settings = {}]       A settings object to configure your input. Here's the available settings:
  //  * - width (100%) {String|Number}: Specify the width of your input
  //  * - height (1) {String|Number}: Specify the height of your input
  //  * - placeholder (null) {String}: Specify a placeholder to display before the user starts to write something
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // input(settings = {}) {
  //   settings = __deepMerge(
  //     this._settings.input,
  //     {
  //       top: this._settings.logBox.content.split('\n').length,
  //       left:
  //         __countLine(__parseHtml(this._settings.beforeLog)) +
  //         __countLine(__parseHtml(this._settings.beforeEachLine))
  //     },
  //     settings
  //   );

  //   const input = this._input(settings);

  //   setTimeout(() => {
  //     const _beforeLog =
  //       __parseHtml(this._settings.beforeLog) +
  //       __parseHtml(this._settings.beforeEachLine);
  //     const beforeBox = __blessed.box({
  //       top: this._settings.logBox.content.split('\n').length,
  //       left: 0,
  //       width: __countLine(_beforeLog),
  //       height: 1,
  //       content: _beforeLog
  //     });

  //     this.log(' ');
  //     this._settings.logBox.append(beforeBox);
  //     this._settings.logBox.append(input);
  //   });

  //   this._settings.logBox.setScrollPerc(100);

  //   return input;
  // }

  // /**
  //  * @name                  summary
  //  * @type                  Function
  //  *
  //  * Allow to display some editable informations in a list format.
  //  * This is usefull when you want to propose to the user some default informations that he can update if wanted
  //  * then send back to the command process
  //  *
  //  * @param      {Object}             settings = {}               A settings object to configure your summary input
  //  *
  //  * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  //  */
  // summary(settings = {}) {}

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

      m = __parseHtml(m || '');

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
            logSettings.padding.left -
            logSettings.padding.right -
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
      this.pushLine(lines.join('\n'));
    });

    this.update();

    this.setScrollPerc(100);

    // return the lines
    return lines;
  }
};
