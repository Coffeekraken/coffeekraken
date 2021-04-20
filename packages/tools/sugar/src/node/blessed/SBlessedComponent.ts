// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '../../shared/object/deepMerge';
import __SColor from '@coffeekraken/s-color';
import __hotkey from '../keyboard/hotkey';
import __isChildProcess from '../../node/is/childProcess';
import __innerWidth from './utils/innerWidth';
import __blessed from 'blessed';

import IBlessed from '@types/blessed';

/**
 * @name                  SBlessedComponent
 * @namespace           sugar.node.blessed
 * @type                  Class
 * @status              wip
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

export interface ISBlessedComponentSettings {}

export interface ISBlessedComponentCtor {
  new (settings?: ISBlessedComponentSettings);
}

export interface ISBlessedComponent extends IBlessed.Widgets.BlessedElement {
  readonly realHeight: number;
  setFramerate(framerate: number): void;
  on(event: string, callback: Function): void;
  isDisplayed(): boolean;
  isDestroyed(): boolean;
}

class SBlessedComponent extends __blessed.box implements ISBlessedComponent {
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
        blessed: {
          scrollable: true
          // mouse: true,
          // keys: true
        }
      },
      settings
    );

    // check if need to create a screen
    let isNewScreen = false;
    if (
      !SBlessedComponent.screen &&
      settings.screen !== false &&
      !isNewScreen
    ) {
      isNewScreen = true;
      SBlessedComponent.screen = __blessed.screen({
        smartCSR: true,
        title: '[CK] Coffeekraken Sugar',
        autoPadding: true,
        cursor: {
          artificial: true,
          shape: {
            bg: new __SColor('terminal.primary').toString(),
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

    // listen for screen resize
    this._screen.on('resize', () => {
      // update the component
      if (this.isDisplayed()) this.update();
    });

    // keep track of the component status
    this.on('attach', () => {
      this._isDisplayed = true;
      setTimeout(() => {
        if (this.isDisplayed()) this.update();
      }, 50);
    });
    this.on('detach', () => {
      this._isDisplayed = false;
    });

    // set render interval if not set already
    if (settings.framerate && !SBlessedComponent._framerateInterval) {
      this.setFramerate(settings.framerate);
    }

    if (this._settings.attach === true && SBlessedComponent.screen) {
      SBlessedComponent.screen.append(this);
    }

    if (this.parent) {
      setTimeout(() => {
        if (this.isDisplayed()) this.update();
      });
    } else {
      this.on('attach', () => {
        setTimeout(() => {
          if (this.isDisplayed()) this.update();
        });
      });
    }
  }

  /**
   * @name        innerWidth
   * @type        Integer
   * @get
   *
   * Access the inner width of the component. This mean the actual width
   * minus the left/right padding
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get innerWidth() {
    return __innerWidth(this);
  }

  get realHeight() {
    if (!this.isDisplayed()) return 0;
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
    this.emit('update');
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
    return this._isDisplayed && SBlessedComponent.getScreen() !== undefined;
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
}

if (!__isChildProcess()) {
  __hotkey('ctrl+c', {
    once: true
  }).on('press', () => {
    if (!cls.screen) return;
    cls.screen.destroy();
  });
}

const cls: ISBlessedComponentCtor = SBlessedComponent;
export default SBlessedComponent;
