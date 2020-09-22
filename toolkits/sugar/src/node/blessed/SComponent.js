const __blessed = require('blessed');
const __deepMerge = require('../object/deepMerge');
const __color = require('../color/color');
const __hotkey = require('../keyboard/hotkey');
const __tkill = require('tree-kill');
const __isChildProcess = require('../is/childProcess');
const __toString = require('../string/toString');
const __parse = require('../string/parse');
const __onProcessExit = require('../process/onProcessExit');

let __activeScreen = null;

/**
 * @name                  SComponent
 * @namespace           sugar.node.blessed
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

// __hotkey('ctrl+c', {
//   once: true
// }).on('press', () => {
//   if (!global.screen) return;
//   global.screen.destroy();
// });
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
   * @name                  _framerateInterval
   * @type                  Function
   * @private
   * @static
   *
   * Store the setInterval that render the screen
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _framerateInterval = null;

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
    // store the settings
    settings = __deepMerge(
      {
        screen: true,
        container: true,
        maxRenderInterval: 100,
        framerate: null
      },
      settings
    );
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
        }
      });

      __activeScreen.on('destroy', () => {
        __activeScreen = null;
      });

      if (settings.attach === undefined) {
        settings.attach = true;
      }

      if (settings.container === true) {
        settings.container = {
          // width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          },
          style: {}
        };
      }
    } else {
      settings.container = false;
    }

    // extends parent
    delete settings.screen;
    super(settings);

    this._screen = __activeScreen;
    global.screen = __activeScreen;

    // keep track of the component status
    this._isDisplayed = false;
    this.on('attach', () => {
      this._isDisplayed = true;
      setTimeout(() => {
        this.update();
      }, 200);
    });
    this.on('detach', () => {
      this._isDisplayed = false;
    });

    // save the settings
    this._settings = settings;

    this._allowRender = true;
    // this._renderBuffer = setInterval(() => {
    //   this._allowRender = true;
    // }, settings.maxRenderInterval);

    // set render interval if not set already
    if (settings.framerate && !SComponent._framerateInterval) {
      this.setFramerate(settings.framerate);
    }

    let container;
    if (settings.container) {
      container = __blessed.box(settings.container);
      __activeScreen.container = container;
      __activeScreen.append(container);

      __activeScreen.append = (...args) => {
        __activeScreen.container.append(...args);
      };
    }

    __onProcessExit(async () => {
      try {
        global._screen && global._screen.destroy();
      } catch (e) {}
      this._destroyed = true;
      this._allowRender = false;
      this.detach();
      return true;
    });

    if (this._settings.attach) {
      (__activeScreen.container || __activeScreen).append(this);
    }

    if (!this._settings.attach) {
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
   * @name                  setFramerate
   * @type                  Function
   *
   * This method allows you to simply change the interval timeout between the screen renders process.
   * Note that calling this will change the GLOBAL render screen interval so use with caution...
   *
   * @param       {Number}          interval          The interval between screen rendering processes in ms
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  setFramerate(framerate) {
    clearInterval(SComponent._framerateInterval);
    SComponent._framerateInterval = setInterval(() => {
      if (!this.isDisplayed()) return;
      this.update();
    }, 1000 / framerate);
  }

  /**
   * @name                  update
   * @type                  Function
   *
   * This method simply update the screen if the component is a child of one
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _renderAfterNotAllowedTimeout = null;
  update() {
    if (this.isDestroyed()) return;
    // if (!this._allowRender) {
    //   if (!this._settings.framerate && !this._renderAfterNotAllowedTimeout) {
    //     this._renderAfterNotAllowedTimeout = setTimeout(() => {
    //       clearTimeout(this._renderAfterNotAllowedTimeout);
    //       this.update();
    //     }, 200);
    //   }
    //   return;
    // }

    // this._allowRender = false;

    // clearTimeout(this._updateTimeout);
    // this._updateTimeout = setTimeout(() => {
    //   this._allowRender = true;
    //   if (!this._settings.framerate) this.update();
    // }, this._settings.maxRenderInterval);

    if (this._screen) {
      this._screen.render();
    }
  }

  /**
   * @name                isDisplayed
   * @type                Function
   *
   * Check if the component is in the display list of the screen
   *
   * @return      {Boolean}             true if is displayed, false if not
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isDisplayed() {
    return this._isDisplayed;
  }

  /**
   * @name                  isDestroyed
   * @type                  Function
   *
   * Check if the component (screen) has been destroyed
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isDestroyed() {
    return this._destroyed === true;
  }

  /**
   * @name                  allowRender
   * @type                  Function
   *
   * Check if the component allow a render at this particular time
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  allowRender() {
    return this._allowRender;
  }
};
