// @ts-nocheck

import __SApp from './SApp';
import __SHeader from './SHeader';
import __deepMerge from '../object/deepMerge';
import __blessed from 'blessed';
import __parseHtml from './parseHtml';
import __splitEvery from '../string/splitEvery';
import __countLine from '../string/countLine';
import __parseSchema from '../url/parseSchema';
import __sugarConfig from '../config/sugar';

/**
 * @name                    SSimpleApp
 * @namespace           sugar.node.terminal
 * @type                    Class
 * @wip
 *
 * This class define an application in the terminal that you can easily configure to have the look and feel that you want
 * through simple settings described bellow.
 *
 * @param           {String}          name            Specify a name for this application
 * @param           {Object}          [settings={}]   An object of settings described bellow:
 *
 * @example         js
 * import SSimpleApp from '@coffeekraken/sugar/node/terminal/SSimpleApp';
 * const app = new SSimpleApp('My Cool Application', {
 * });
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SSimpleApp extends __SApp {
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
    // extend from blessed.box
    super(name, __deepMerge({}, settings));
    this._settings.layout = this._layout.bind(this);
  }

  /**
   * @name              _layout
   * @type              Function
   * @private
   *
   * Render the layout of the app
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _layout(content) {
    // make a container box
    const container = __blessed.box({
      width: '100%',
      height: '100%'
    });

    // preparing the menu
    let menuString = '';
    Object.keys(this._settings.menu).forEach((url, i) => {
      const menuObj = this._settings.menu[url];
      menuString += this.isActive(url)
        ? `<bgBlack> ${menuObj.title} </bgBlack>`
        : `<black> ${menuObj.title} </black>`;
    });

    let headerContent =
      `<black>Coffeekraken Sugar</black>\n` + `{right}${menuString}{/right}`;

    const header = new __SHeader(headerContent, {
      blessed: {
        style: {
          bg: __sugarConfig('colors.primary.color')
        }
      }
    });

    content.top = header.height;
    content.width = '100%';

    container.append(header);
    container.append(content);

    // return the container
    return container;
  }
};
