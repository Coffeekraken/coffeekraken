const __deepMerge = require('../object/deepMerge');
const __blessed = require('blessed');
const __parseHtml = require('./parseHtml');

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
module.exports = class SPanel extends __blessed.box {
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
  constructor(name, settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        beforeLog: null,
        beforeLogLine: null,
        afterLog: null,
        afterLogLine: null,
        screen: true,
        blessed: {
          padding: {
            top: 2,
            bottom: 2,
            left: 4,
            right: 4
          }
        }
      },
      settings
    );
    // create the screen if setted in the settings
    let screenInstance;
    if (_settings.screen) {
      screenInstance = __blessed.screen({
        smartCSR: true
      });
    }
    // extend from blessed.box
    super(_settings.blessed);
    // save settings
    this._settings = _settings;

    // append this box to the screen
    if (screenInstance) {
      screenInstance.append(this);
      this._screen = screenInstance;
    }

    // save the name
    if (!/^[a-zA-Z0-9\._-]+$/.test(name)) {
      throw new Error(
        `The name of an SPanel instance can contain only letters like [a-zA-Z0-9_-.]...`
      );
    }
    this._name = name;

    // render the screen
    screenInstance.render();
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
    // check if we have something to put before log
    if (this._settings.beforeLogLine) {
      let beforeLogLine = this._settings.beforeLogLine;
      if (typeof beforeLogLine === 'function') {
        beforeLogLine = beforeLogLine(message);
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
        beforeLog = beforeLog(message);
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
        afterLog = afterLog(message);
      }
      if (typeof afterLog === 'number') {
        afterLog = ' '.repeat(parseInt(afterLog));
      }
    } else {
      afterLog = '';
    }

    // append the content to the panel
    this.pushLine(__parseHtml(beforeLog + message + afterLog));

    // check if we have something to put after log line
    if (this._settings.afterLogLine) {
      let afterLogLine = this._settings.afterLogLine;
      if (typeof afterLogLine === 'function') {
        afterLogLine = afterLogLine(message);
      }
      if (typeof afterLogLine === 'number') {
        this.pushLine(' '.repeat(parseInt(afterLogLine)).split(''));
      } else {
        this.pushLine(__parseHtml(afterLogLine));
      }
    }

    if (this._screen) this._screen.render();
  }
};
