const __blessed = require('blessed');
const __deepMerge = require('../object/deepMerge');
const __color = require('../color/color');
const __hotkey = require('../keyboard/hotkey');

let __activeScreen = null;

/**
 * @name                  SComponent
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SComponent = require('@coffeekraken/sugar/node/blessed/SComponent');
 * class MyCoolComponent extends SComponent {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _isCtrlCInited = false;
module.exports = class SComponent extends __blessed.box {
  /**
   * @name                  _settings
   * @type                  Object
   * @private
   *
   * Store the component settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // check if need to create a screen
    if (!__activeScreen && settings.screen !== false) {
      __activeScreen = __blessed.screen({
        smartCSR: true,
        cursor: {
          artificial: true,
          shape: {
            bg: __color('terminal.primary').toString(),
            ch: '|'
            // ch: '█'
          },
          blink: true
        },
        container: {
          // width: '100%',
          height: '100%',
          top: 1,
          left: 2,
          right: 2,
          bottom: 1,
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
          style: {
            bg: 'red'
          }
        }
      });
    }

    // store the settings
    settings = __deepMerge({}, settings);
    // extends parent
    super(settings);

    // ctrl+c callback
    if (!_isCtrlCInited) {
      _isCtrlCInited = true;
      __hotkey('ctrl+c').on('press', () => {
        process.exit();
      });
    }

    // save the settings
    this._settings = settings;

    if (settings.container) {
      const container = __blessed.box(settings.container);
      __activeScreen.container = container;
      __activeScreen.append(container);
    }

    this._screen = __activeScreen;
    global.screen = __activeScreen;

    if (this._settings.appendToScreen) {
      (__activeScreen.container || __activeScreen).append(this);
    }

    if (!this._settings.appendToScreen) {
      if (this.parent) {
        this.update();
      } else {
        this.on('attach', () => {
          setTimeout(() => {
            this.update();
          });
        });
      }
    }
  }

  /**
   * @name                  addToScreen
   * @type                  Function
   *
   * This method simply append the component to the generated screen
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  addToScreen() {
    (global.screen.container || global.screen).append(this);
  }

  /**
   * @name                  update
   * @type                  Function
   *
   * This method simply update the screen if the component is a child of one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (this._screen) this._screen.render();
  }
};
