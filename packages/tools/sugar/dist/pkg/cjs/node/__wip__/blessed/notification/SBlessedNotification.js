"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../../shared/object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../../shared/console/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
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
class SBlessedNotification extends SBlessedComponent_1.default {
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
        settings = (0, deepMerge_1.default)({
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
        super((0, deepMerge_1.default)({
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
                content: (0, parseHtml_1.default)([`<bold>${title}</bold>`, `${body}`, ''].join('\n'))
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
exports.default = SBlessedNotification;
SBlessedNotification.displayStacks = {
    tl: [],
    tr: [],
    bl: [],
    br: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlGQUEyRDtBQUkzRCxrRkFBNEQ7QUFDNUQsNkVBQXVEO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDRztBQUNILE1BQXFCLG9CQUFxQixTQUFRLDJCQUFtQjtJQXFDbkU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3BDLFFBQVEsR0FBRyxJQUFBLG1CQUFXLEVBQ3BCO1lBQ0UsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLE1BQU07b0JBQ1YsRUFBRSxFQUFFLE9BQU87aUJBQ1o7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixRQUFRLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDckIsS0FBSyxTQUFTO2dCQUNaLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7Z0JBQ3BDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7Z0JBQ3BDLE1BQU07WUFDUixLQUFLLFNBQVM7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQztnQkFDckMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssT0FBTyxDQUFDO1lBQ2IsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLFFBQVE7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