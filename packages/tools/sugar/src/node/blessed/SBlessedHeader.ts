// @ts-nocheck

import __blessed from 'blessed';
import __SBlessedComponent from './SBlessedComponent';
import __deepMerge from '../object/deepMerge';
import __parseHtml from '../terminal/parseHtml';
import __color from '../color/color';

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
export = class SHeader extends __SBlessedComponent {
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
}
