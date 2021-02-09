"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
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
        }, settings);
        const position = settings.position;
        delete settings.position;
        super(Object.assign(Object.assign({}, settings), { blessed: {
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
                content: parseHtml_1.default([`<bold>${title}</bold>`, `${body}`, ''].join('\n'))
            } }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsdUVBQWlEO0FBSWpELHdFQUFrRDtBQUNsRCw2RUFBdUQ7QUFFdkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILE1BQXFCLG9CQUFxQixTQUFRLDJCQUFtQjtJQXFDbkU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3BDLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsSUFBSTtZQUNiLE9BQU8sRUFBRTtnQkFDUCxFQUFFLEVBQUUsUUFBUTtnQkFDWixFQUFFLEVBQUUsT0FBTztnQkFDWCxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFFBQVE7b0JBQ1osRUFBRSxFQUFFLE9BQU87aUJBQ1o7YUFDRjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ25DLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUV6QixLQUFLLGlDQUNBLFFBQVEsS0FDWCxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsS0FBSyxFQUFFO29CQUNMLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3ZCLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3ZCLEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDN0IsRUFBRSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FB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