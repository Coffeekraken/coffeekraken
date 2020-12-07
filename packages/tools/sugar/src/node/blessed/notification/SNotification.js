"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../terminal/parseHtml"));
const SBlessedComponent_1 = __importDefault(require("../SBlessedComponent"));
module.exports = (_a = class SBlessedNotification extends SBlessedComponent_1.default {
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
                bg: 'yellow',
                fg: 'black',
                hover: {
                    bg: 'yellow',
                    fg: 'black'
                }
            }, settings);
            const position = settings.position;
            delete settings.position;
            super(Object.assign(Object.assign({}, settings), { width: 40, height: 4, style: {
                    bg: settings.bg,
                    fg: settings.fg,
                    hover: {
                        bg: settings.hover.bg,
                        fg: settings.hover.fg
                    }
                }, padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 0
                }, clickable: settings.onClick !== null, content: parseHtml_1.default([`<bold>${title}</bold>`, `${body}`, ''].join('\n')) }));
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
    },
    _a.displayStacks = {
        tl: [],
        tr: [],
        bl: [],
        br: []
    },
    _a);
//# sourceMappingURL=SNotification.js.map