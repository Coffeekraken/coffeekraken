"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../../console/parseHtml"));
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
    },
    _a.displayStacks = {
        tl: [],
        tr: [],
        bl: [],
        br: []
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vdGlmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsdUVBQWlEO0FBSWpELHdFQUFrRDtBQUNsRCw2RUFBdUQ7QUF1Q3ZELHVCQUFTLE1BQU0sb0JBQXFCLFNBQVEsMkJBQW1CO1FBcUM3RDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLEtBQUssRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7WUFDcEMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO2dCQUNFLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxJQUFJO2dCQUNiLE9BQU8sRUFBRTtvQkFDUCxFQUFFLEVBQUUsUUFBUTtvQkFDWixFQUFFLEVBQUUsT0FBTztvQkFDWCxLQUFLLEVBQUU7d0JBQ0wsRUFBRSxFQUFFLFFBQVE7d0JBQ1osRUFBRSxFQUFFLE9BQU87cUJBQ1o7aUJBQ0Y7YUFDRixFQUNELFFBQVEsQ0FDVCxDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFFekIsS0FBSyxpQ0FDQSxRQUFRLEtBQ1gsT0FBTyxFQUFFO29CQUNQLEtBQUssRUFBRSxFQUFFO29CQUNULE1BQU0sRUFBRSxDQUFDO29CQUNULEtBQUssRUFBRTt3QkFDTCxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUN2QixFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUN2QixLQUFLLEVBQUU7NEJBQ0wsRUFBRSxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQzdCLEVBQUUsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO3lCQUM5QjtxQkFDRjtvQkFDRCxPQUFP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