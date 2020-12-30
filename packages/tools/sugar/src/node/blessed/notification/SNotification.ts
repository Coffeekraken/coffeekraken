// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __blessed from 'blessed';
import __color from '../../color/color';
import __hotkey from '../../keyboard/hotkey';
import __parseHtml from '../../console/parseHtml';
import __SBlessedComponent from '../SBlessedComponent';

/**
 * @name                    SBlessedNotification
 * @namespace           sugar.node.blessed.notification
 * @type                    Class
 * @wip
 *
 * This class represent a notification that will be in a corner of the terminal
 * with some features like:
 * - Timeout
 * - On click action
 * - and more...
 *
 * @param         {String}             title            The notification title
 * @param         {String}            body              The notification body
 * @param         {String}            [cta=null]        The call to action text
 * @param         {Object}            [settings={}]     An object of settings to configure your notification more in details:
 * - onClick (null) {Function}: Specify a function to call when the user click on the notification
 * - timeout (5000) {Number}: Specify a number of ms to display the notification. -1 if you want to keep it visible until the user click on it
 * - position (tr) {String}: Specify the position of the notification. Can be tl, tr, bl or br
 * - bg (yellow) {String}: Specify the background color to apply to the notification
 * - fg (black) {String}: Specify the foreground color to apply to the notification
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SBlessedNotification from '@coffeekraken/sugar/node/blessed/notification/SBlessedNotification';
 * const notification = new SBlessedNotification('Hello', 'This is a cool notif', null, {
 *      onClick: () => {
 *          console.log('Clicked');
 *      }
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBlessedNotification extends __SBlessedComponent {
  static displayStacks = {
    tl: [],
    tr: [],
    bl: [],
    br: []
  };

  static update() {
    let top = 1,
      bottom = 1;
    const left = 2;
    const right = 2;
    SBlessedNotification.displayStacks.tl.forEach(($notif) => {
      $notif.top = top;
      $notif.left = left;
      top += $notif.height + 1;
    });
    top = 1;
    SBlessedNotification.displayStacks.tr.forEach(($notif) => {
      $notif.top = top;
      $notif.right = right;
      top += $notif.height + 1;
    });
    SBlessedNotification.displayStacks.bl.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.left = left;
      bottom += $notif.height + 1;
    });
    bottom = 1;
    SBlessedNotification.displayStacks.br.forEach(($notif) => {
      $notif.bottom = bottom;
      $notif.right = right;
      bottom += $notif.height + 1;
    });
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(title, body, settings = {}) {
    settings = __deepMerge(
      {
        onClick: null,
        position: 'tr',
        timeout: 5000,
        blessed: {
          bg: 'yellow',
          fg: 'black',
          hover: {
            bg: 'yellow',
            fg: 'black'
          }
        }
      },
      settings
    );

    const position = settings.position;
    delete settings.position;

    super({
      ...settings,
      blessed: {
        width: 40,
        height: 4,
        style: {
          bg: settings.blessed.bg,
          fg: settings.blessed.fg,
          hover: {
            bg: settings.blessed.hover.bg,
            fg: settings.blessed.hover.fg
          }
        },
        padding: {
          top: 1,
          left: 2,
          right: 2,
          bottom: 0
        },
        clickable: settings.onClick !== null,
        content: __parseHtml(
          [`<bold>${title}</bold>`, `${body}`, ''].join('\n')
        )
      }
    });
    this.on('attach', () => {
      const stack = SBlessedNotification.displayStacks[position];
      if (stack.indexOf(this) === -1) {
        stack.push(this);
      }
    });
    this.on('detach', () => {
      const stack = SBlessedNotification.displayStacks[position];
      const idx = stack.indexOf(this);
      if (idx === -1) return;
      stack.splice(idx, 1);
      SBlessedNotification.update();
    });

    // click
    if (settings.onClick) {
      this.on('click', () => {
        settings.onClick();
        this.destroy();
      });
    }

    // timeout
    if (settings.timeout !== -1) {
      setTimeout(() => {
        this.destroy();
      }, settings.timeout);
    }
  }

  update() {
    SBlessedNotification.update();
    super.update();
  }
};
