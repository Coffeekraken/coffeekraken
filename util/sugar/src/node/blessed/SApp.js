const __blessed = require('blessed');
const __deepMerge = require('../object/deepMerge');
const __color = require('../color/color');
const __SComponent = require('./SComponent');
const __SHeader = require('./SHeader');
const __SFooter = require('./SFooter');

/**
 * @name                  SApp
 * @namespace             sugar.node.blessed
 * @type                  Class
 *
 * This class is the main one when you want to create a Sugar terminal based application.
 *
 * @param        {Object}         [settings = {}]         A settings object to configure your list. Here's the available settings:
 *
 * @example       js
 * const SApp = require('@coffeekraken/sugar/node/blessed/SApp');
 * class MyApp extends SApp {
 *    constructor(settings = {}) {
 *      super(settings);
 *    }
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SApp extends __SComponent {
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
        header: {
          title: 'Coffeekraken Sugar based application'
        },
        blessed: {}
      },
      settings
    );
    // extends parent
    super(settings);

    if (this._settings.header) {
      this._headerBox = new __SHeader({
        blessed: {
          style: {
            bg: __color('terminal.yellow').toString(),
            fg: __color('terminal.black').toString()
          }
        },
        ...this._settings.header
      });
      this.append(this._headerBox, true);
    }

    if (this._settings.footer) {
      this._footerBox = new __SFooter({
        blessed: {
          style: {
            bg: __color('terminal.yellow').toString(),
            fg: __color('terminal.black').toString()
          }
        },
        ...this._settings.footer
      });
      this.append(this._footerBox, true);
    }

    this._contentBox = __blessed.box({});
    this.append(this._contentBox, true);
  }

  /**
   * @name          append
   * @type          Function
   * @override
   *
   * This method simply append some content inside the contentBox
   *
   * @param       {SComponent}        component       The component to add
   * @param       {Boolean}           [ui=false]      Specify if you want to append this component to the ui or in the content box
   * @return      {SApp}                              The SApp instance to maintain chainability
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  append(component, ui = false) {
    if (ui) {
      this.screen.append(component);
    } else {
      this._contentBox.append(component);
    }
    return this;
  }

  /**
   * @name          update
   * @type          Function
   * @override
   *
   * This method simply draw the UI on the screen
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    if (this._headerBox) {
      this._headerBox.top = 0;
      this._headerBox.left = 0;

      this._contentBox.top = this._headerBox.height;
    }
    if (this._footerBox) {
      this._footerBox.bottom = 0;
      this._footerBox.left = 0;

      this._contentBox.bottom = this._footerBox.height;
    }

    super.update();
  }
};
