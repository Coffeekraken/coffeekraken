// @ts-nocheck
import __deepMerge from '../../../shared/object/deepMerge';
import __parseHtml from '../../../shared/console/parseHtml';
import __SBlessedComponent from '../SBlessedComponent';
/**
 * @name                    SBlessedNotification
 * @namespace            node.blessed.notification
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SBlessedNotification extends __SBlessedComponent {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(title, body, settings = {}) {
        settings = __deepMerge({
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
        }, settings);
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
        super(__deepMerge({
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
                content: __parseHtml([`<bold>${title}</bold>`, `${body}`, ''].join('\n'))
            }
        }, settings.blessed));
        this.on('attach', () => {
            const stack = SBlessedNotification.displayStacks[position];
            if (stack.indexOf(this) === -1) {
                stack.push(this);
            }
        });
        this.on('detach', () => {
            const stack = SBlessedNotification.displayStacks[position];
            const idx = stack.indexOf(this);
            if (idx === -1)
                return;
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
                if (this.isDestroyed())
                    return;
                settings.onTimeout && settings.onTimeout();
                this.destroy();
            }, settings.timeout);
        }
    }
    static update() {
        let top = 1, bottom = 1;
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
    update() {
        SBlessedNotification.update();
        super.update();
    }
}
SBlessedNotification.displayStacks = {
    tl: [],
    tr: [],
    bl: [],
    br: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxrQ0FBa0MsQ0FBQztBQUkzRCxPQUFPLFdBQVcsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RCxPQUFPLG1CQUFtQixNQUFNLHNCQUFzQixDQUFDO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sb0JBQXFCLFNBQVEsbUJBQW1CO0lBcUNuRTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDcEMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7WUFDRSxPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsTUFBTTtvQkFDVixFQUFFLEVBQUUsT0FBTztpQkFDWjthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNyQixLQUFLLFNBQVM7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO2dCQUNyQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO2dC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