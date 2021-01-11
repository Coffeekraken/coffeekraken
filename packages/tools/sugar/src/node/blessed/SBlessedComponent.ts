// @ts-nocheck

import ISBlessedComponent, {
  ISBlessedComponentCtor,
  ISBlessedComponentSettings
} from './interface/ISBlessedComponent';

import __SPromise from '../promise/SPromise';
import __blessed from 'blessed';
import __deepMerge from '../object/deepMerge';
import __color from '../color/color';
import __hotkey from '../keyboard/hotkey';
import __tkill from 'tree-kill';
import __isChildProcess from '../is/childProcess';
import __toString from '../string/toString';
import __parse from '../string/parse';
import __onProcessExit from '../process/onProcessExit';

/**
 * @name                  SBlessedComponent
 * @namespace           sugar.node.blessed
 * @type                  Class
 * @wip
 *
 * This class is the base one for all the sugar blessed components like input, panel, etc...
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedComponent from '@coffeekraken/sugar/node/blessed/SBlessedComponent';
 * class MyCoolComponent extends SBlessedComponent {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const cls: ISBlessedComponentCtor = class SBlessedComponent
  extends __blessed.box
  implements ISBlessedComponent {
  /**
   * @name                  _settings
   * @type                  ISBlessedComponentSettings
   * @private
   *
   * Store the component settings
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISBlessedComponentSettings = {};

  /**
   * @name              getScreen
   * @type              Function
   * @static
   *
   * Get the screen initiated when using some SBlessedComponent instances
   *
   * @return      {Screen}          The blessed screen instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getScreen() {
    return SBlessedComponent.screen;
  }

  /**
   * @name              destroyScreen
   * @type              Function
   * @static
   *
   * Get the screen initiated when using some SBlessedComponent instances
   *
   * @return      {Screen}          The blessed screen instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static destroyScreen() {
    if (!SBlessedComponent.getScreen()) return;
    SBlessedComponent.getScreen().destroy();
    SBlessedComponent.screen = undefined;
  }

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
   * @name                  screen
   * @type                  __blessed.screen
   * @static
   *
   * Store the global screen initiated by the first component
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static screen;

  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISBlessedComponentSettings = {}) {
    // store the settings
    settings = __deepMerge(
      {
        screen: true,
        container: true,
        framerate: null,
        attach: undefined,
        blessed: {}
      },
      settings
    );

    // check if need to create a screen
    let isNewScreen = false;
    if (!SBlessedComponent.screen && settings.screen !== false) {
      isNewScreen = true;
      SBlessedComponent.screen = __blessed.screen({
        smartCSR: true,
        title: '[CK] Coffeekraken Sugar',
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
      SBlessedComponent.screen.on('destroy', () => {
        SBlessedComponent.screen = null;
      });
      __onProcessExit(() => {
        SBlessedComponent.destroyScreen();
      });
    }

    // extends parent
    super(settings.blessed || {});

    this._settings = settings;
    this._promise = new __SPromise();

    // save screen reference
    this._screen = SBlessedComponent.screen;

    // keep track of the component status
    this.on('attach', () => {
      this._isDisplayed = true;
      setTimeout(() => {
        if (this.isDisplayed()) this.update();
      }, 200);
    });
    this.on('detach', () => {
      this._isDisplayed = false;
    });

    // set render interval if not set already
    if (settings.framerate && !SBlessedComponent._framerateInterval) {
      this.setFramerate(settings.framerate);
    }

    if (this._settings.attach !== false && isNewScreen) {
      SBlessedComponent.screen.append(this);
    }

    if (this.parent) {
      if (this.isDisplayed()) this.update();
    } else {
      this.on('attach', () => {
        setTimeout(() => {
          if (this.isDisplayed()) this.update();
        });
      });
    }
  }

  public get realHeight() {
    let height = this.height;
    if (typeof this.getScrollHeight === 'function') {
      try {
        const originalHeight = this.height;
        this.height = 0;
        height = this.getScrollHeight();
        this.height = originalHeight;
      } catch (e) {}
    }
    return height;
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
    clearInterval(SBlessedComponent._framerateInterval);
    SBlessedComponent._framerateInterval = setInterval(() => {
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
    if (this.isDestroyed() || !this.isDisplayed()) return;
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
    return this._isDisplayed && SBlessedComponent.getScreen();
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
   * @name          trigger
   * @type          Function
   *
   * Trigger some "events" through the SPromise instance
   *
   * @param       {String}      stack         The stack (name) of the event
   * @param       {Any}         data          The data to pass along the event
   * @return      {SPromise}                  The SPromise instance to maintain chainability
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  trigger(stack, data) {
    this.emit(stack, data);
    return this;
  }
};

if (!__isChildProcess()) {
  __hotkey('ctrl+c', {
    once: true
  }).on('press', () => {
    if (!SBlessedComponent.screen) return;
    SBlessedComponent.screen.destroy();
  });
}

export = cls;
