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
class SBlessedNotification extends SBlessedComponent_1.default {
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
        settings = deepMerge_1.default({
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
        super(deepMerge_1.default({
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
                content: parseHtml_1.default([`<bold>${title}</bold>`, `${body}`, ''].join('\n'))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0JsZXNzZWROb3RpZmljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmxlc3NlZE5vdGlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxpRkFBMkQ7QUFJM0Qsa0ZBQTREO0FBQzVELDZFQUF1RDtBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCxNQUFxQixvQkFBcUIsU0FBUSwyQkFBbUI7SUFxQ25FOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtRQUNwQyxRQUFRLEdBQUcsbUJBQVcsQ0FDcEI7WUFDRSxPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRTtvQkFDTCxFQUFFLEVBQUUsTUFBTTtvQkFDVixFQUFFLEVBQUUsT0FBTztpQkFDWjthQUNGO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLFFBQVEsUUFBUSxDQUFDLElBQUksRUFBRTtZQUNyQixLQUFLLFNBQVM7Z0JBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO2dCQUNyQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1IsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLE1B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