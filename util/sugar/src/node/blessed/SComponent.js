const __blessed = require('blessed');
const __deepMerge = require('../object/deepMerge');
const __color = require('../color/color');

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
        autoPadding: true,
        cursor: {
          artificial: true,
          shape: {
            bg: __color('terminal.yellow').toString(),
            ch: '|'
            // ch: '█'
          },
          blink: true
        }
      });
    }

    // store the settings
    settings = __deepMerge(
      {
        screen: true
      },
      settings
    );
    // extends parent
    super(settings.blessed);

    this.screen = __activeScreen;

    // save the settings
    this._settings = settings;
    // render the screen first time if exist
    setTimeout(() => {
      this.update();
    });
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
    if (this.screen) this.screen.render();
  }
};
