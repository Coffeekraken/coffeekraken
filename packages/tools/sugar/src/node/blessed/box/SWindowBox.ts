// @ts-nocheck

import __blessed from 'blessed';
import __SBlessedComponent from '../SBlessedComponent';
import __deepMerge from '../../object/deepMerge';
import __parseHtml from '../../terminal/parseHtml';
import __countLine from '../../string/countLine';
import __hotkey from '../../keyboard/hotkey';
import __color from '../../color/color';
import __SPromise from '../../promise/SPromise';
import __multiple from '../../class/multipleExtends';
import __activeSpace from '../../core/activeSpace';
import __escapeStack from '../../terminal/escapeStack';

/**
 * @name                  SBlessedWindowBox
 * @namespace           sugar.node.blessed.box
 * @type                  Class
 * @wip
 *
 * This class gives you the ability to display windowed style boxes with a header, a body and a footer
 *
 * @param         {Array}          $content               A content to display inside the window. Must be a child of blessed.node class
 * @param        {Object}         [settings = {}]         A settings object to configure your this. Here's the available settings:
 * - title (null) {String|blessed.node}: The box title to display
 * - titleRight (null) {String|blessed.node}: The box title displayed to the right
 * - footer (null) {String|blessed.node}: The box footer to display
 * - footerRight (null) {String|blessed.node}: The box footer displayed to the right
 * - colors ({}) {Object}: The colors to use for the window
 *    - fg (black) {Color}: The foreground color to use
 *    - bg (__color('terminal.primary').toString()) {Color}: The background color to use
 * - ...blessed.box settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SBlessedWindowBox from '@coffeekraken/sugar/node/blessed/box/SBlessedWindowBox';
 * const box = new SBlessedWindowBox(myCoolContent, {});
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBlessedWindowBox extends __SBlessedComponent {
  /**
   * @name                  constructor
   * @type                  Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor($content, settings = {}) {
    super(
      __deepMerge(
        {
          style: {
            fg: 'black',
            bg: __color('terminal.primary').toString()
          },
          padding: {
            top: 1,
            left: 2,
            right: 2,
            bottom: 1
          }
        },
        settings
      )
    );

    this._$body = __blessed.box({
      width: '100%',
      height: '100%',
      position: {
        top: 0,
        left: 0
      },
      style: {
        fg: 'white',
        bg: 'black'
      }
    });

    this.append(this._$body);

    this.update();
  }

  update() {
    setTimeout(() => {
      super.update();
    });
  }
}
