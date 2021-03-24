// @ts-nocheck

import __deepMerge from '../../../shared/object/deepMerge';
import __blessed from 'blessed';
import __color from '../../../shared/color/color';
import __hotkey from '../../keyboard/hotkey';
import __parseHtml from '../../../shared/console/parseHtml';
import __SBlessedComponent from '../SBlessedComponent';

/**
 * @name                    SBlessedNotification
 * @namespace           sugar.node.blessed.notification
 * @type                    Class
 * @status              wip
 *
 * This class represent a notification that will be in a corner of the terminal
 * with some features like:
 * - Timeout
 * - On click action
 * - and more...
 *
 * @param         {String}             title            The notification title
 * @param         {String}            body              The notification body
 * @param         {String}            [cta=null]        The call to action text
 * @param         {Object}            [settings={}]     An object of settings to configure your notification more in details:
 *
 * @setting     {Function}    [onClick=null]        Specify a function to call when the user click on the notification
 * @setting     {Function}    [onTimeout=null]      Specify a function to call when the notification is timed out
 * @setting     {Number}      [timeout=5000]     Specify a number of ms to display the notification. -1 if you want to keep it visible until the user click on it
 * @setting     {String}     [position='tr']      Specify the position of the notification. Can be tl, tr, bl or br
 * @setting    {Object}     [blessed={}]     Some blessed settings to handle display
 * @setting     {String}    [type='default']    Specify the type. Can be "default", "success", "error", "warning", "kill"
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SBlessedNotification from '@coffeekraken/sugar/node/blessed/notification/SBlessedNotification';
 * const notification = new SBlessedNotification('Hello', 'This is a cool notif', {
 *      onClick: () => {
 *          console.log('Clicked');
 *      }
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SBlessedNotification extends __SBlessedComponent {
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
        onTimeout: null,
        position: 'tr',
        timeout: 5000,
        type: 'default',
        blessed: {
          style: {
            bg: 'cyan',
            fg: 'white'
          }
        }
      },
      settings
    );

    switch (settings.type) {
      case 'success':
        settings.blessed.style.bg = 'green';
        settings.blessed.style.fg = 'white';
        break;
      case 'warning':
        settings.blessed.style.bg = 'yellow';
        settings.blessed.style.fg = 'black';
        break;
      case 'error':
      case 'kill':
      case 'killed':
        settings.blessed.style.bg = 'red';
        settings.blessed.style.fg = 'white';
        break;
    }

    const position = settings.position;
    delete settings.position;

    super(
      __deepMerge(
        {
          blessed: {
            width: 30,
            height: 4,
            style: {
              bg: settings.blessed.style.bg,
              fg: settings.blessed.style.fg
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
        },
        settings.blessed
      )
    );
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
        if (this.isDestroyed()) return;
        settings.onTimeout && settings.onTimeout();
        this.destroy();
      }, settings.timeout);
    }
  }

  update() {
    SBlessedNotification.update();
    super.update();
  }
}
