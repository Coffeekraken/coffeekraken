// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __blessed from 'blessed';
import __parseHtml from './parseHtml';
import __splitEvery from '../string/splitEvery';
import __countLine from '../string/countLine';

/**
 * @name                    SHeader
 * @namespace           sugar.node.terminal
 * @type                    Class
 * @wip
 *
 * This class define a "header" in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          title            Specify a title for this header.
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 * - screen (true) {Boolean}: Specify if you want your header wrapped inside an "blessed"(https://www.npmjs.com/package/blessed) screen object. Useful when you just want to render your header in the terminal. If you have your own screen object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SHeader from '@coffeekraken/sugar/node/terminal/SHeader';
 * const header = new SHeader('Hello world', {});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SHeader extends __blessed.box {
  /**
   * @name              _title
   * @type              String
   * @private
   *
   * Store the header title
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _title = null;

  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store the header settings
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
  constructor(title, settings = {}) {
    // save the settings
    const _settings = __deepMerge(
      {
        blessed: {
          tags: true,
          padding: {
            top: 1,
            bottom: 0,
            left: 2,
            right: 1
          }
        }
      },
      settings
    );

    // extend from blessed.box
    super(_settings.blessed);
    // save settings
    this._settings = _settings;

    // save the title
    this._title = title;

    // set the size
    this.height = 3;

    // set the header content
    this.setContent(__parseHtml(title));

    // render the screen
    if (this.screen) this.screen.render();
  }
}
