const __blessed = require('blessed');
const __SComponent = require('./SComponent');
const __deepMerge = require('../object/deepMerge');
const __parseHtml = require('../terminal/parseHtml');
const __color = require('../color/color');

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
module.exports = class SHeader extends __SComponent {
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
    super(
      __deepMerge(
        {
          title:
            'Coffeekraken <bgBlack><yellow>Sugar</yellow></bgBlack> based application',
          width: '100%',
          height: 3,
          style: {
            bg: __color('terminal.primary').toString(),
            fg: __color('terminal.black').toString()
          },
          padding: {
            top: 1,
            bottom: 1,
            left: 1,
            right: 1
          }
        },
        settings
      )
    );
    this._titleBox = __blessed.box({
      style: {
        bg: this._settings.style.bg,
        fg: this._settings.style.fg
      },
      content: __parseHtml(this._settings.title)
    });

    this.append(this._titleBox);
  }

  /**
   * @name            update
   * @type            Function
   * @override
   *
   * This method simply draw the header
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  update() {
    super.update();
  }
};
