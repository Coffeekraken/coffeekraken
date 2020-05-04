const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');
const __splitEvery = require('../string/splitEvery');
const __countLine = require('../string/countLine');
const __uniqid = require('../string/uniqid');
const __sugarConfig = require('../config/sugar');

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
        beforeLog: null,
        beforeLogLine: null,
        afterLog: null,
        afterLogLine: null,
        padBeforeLog: true,
        screen: false,
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
            right: 0
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
   * @name                  log
   * @type                  Function
   *
   * Allow to log some content in the panel
   *
   * @param       {String}        message         The message to log
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  log(message) {
    if (!Array.isArray(message)) message = [message];

    message.forEach((m) => {
      // check if we have something to put before log
      if (this._settings.beforeLogLine) {
        let beforeLogLine = this._settings.beforeLogLine;
        if (typeof beforeLogLine === 'function') {
          beforeLogLine = beforeLogLine(m);
        }
        if (typeof beforeLogLine === 'number') {
          this.pushLine(' '.repeat(parseInt(beforeLogLine)).split(''));
        } else {
          this.pushLine(__parseHtml(beforeLogLine));
        }
      }

      let beforeLog = this._settings.beforeLog;
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

      let afterLog = this._settings.afterLog;
      if (afterLog) {
        if (typeof afterLog === 'function') {
          afterLog = afterLog(m);
        }
        if (typeof afterLog === 'number') {
          afterLog = ' '.repeat(parseInt(afterLog));
        }
      } else {
        afterLog = '';
      }

      if (this._settings.padBeforeLog) {
        let formatedBeforeLog = __parseHtml(beforeLog);
        let formatedMessage = m + afterLog;
        formatedMessage = __splitEvery(
          __parseHtml(formatedMessage),
          this.width -
            this._settings.blessed.padding.left -
            this._settings.blessed.padding.right -
            __countLine(formatedBeforeLog)
        ).map((l, i) => {
          if (i === 0) {
            return __parseHtml(beforeLog) + l;
          } else {
            return ' '.repeat(__countLine(__parseHtml(beforeLog))) + l;
          }
        });

        // append the content to the panel
        this.pushLine(formatedMessage.join('\n'));
      } else {
        this.pushLine(__parseHtml(beforeLog + m + afterLog));
      }

      // check if we have something to put after log line
      if (this._settings.afterLogLine) {
        let afterLogLine = this._settings.afterLogLine;
        if (typeof afterLogLine === 'function') {
          afterLogLine = afterLogLine(m);
        }
        if (typeof afterLogLine === 'number') {
          this.pushLine(' '.repeat(parseInt(afterLogLine)).split(''));
        } else {
          this.pushLine(__parseHtml(afterLogLine));
        }
      }
    });

    this.setScrollPerc(100);

    if (this.screen) this.screen.render();
  }
};
