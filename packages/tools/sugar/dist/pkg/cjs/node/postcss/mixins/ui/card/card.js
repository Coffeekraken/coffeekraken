"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiCardInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
exports.interface = postcssUiCardInterface;
/**
 * @name          menu
 * @namespace     ui.card
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the menu lnf to any .s-menu element
 *
 * @snippet         @sugar.ui.card
 *
 * @example     css
 * .s-menu {
 *    @sugar.ui.card;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 500px;

            &.s-card--horizontal {
                flex-direction: row;
                max-width: none;
                
                .s-card_media {
                    align-self: stretch;
                    width: 50%;
                }
                .s-card_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @sugar.media mobile {
                    flex-direction: column;
                }
            }
            &.s-card--horizontal-reverse {
                flex-direction: row-reverse;
                max-width: none;

                .s-card_media {
                    align-self: stretch;
                    width: 50%;
                }
                .s-card_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                @sugar.media mobile {
                    flex-direction: column-reverse;
                }
            }
            &.s-card--vertical-reverse {
                flex-direction: column-reverse;
            }

            .s-card_content {
                align-items: unset;
            }
        `);
    }
    // lnf
    if (finalParams.scope.includes('lnf')) {
        vars.push(`
            background: sugar.color(main, surface);
            @sugar.border.radius(ui.card.borderRadius);
            @sugar.depth (ui.card.depth);

            .s-card_media {
                @sugar.border.radius(ui.card.borderRadius);
            }

            .s-card_img {
                @sugar.border.radius(ui.card.borderRadius);
            }

            .s-card_content {
                padding-block: sugar.padding(ui.card.paddingBlock);
                padding-inline: sugar.padding(ui.card.paddingInline);
            }
        `);
    }
    // wireframe
    vars.push(`
        @sugar.wireframe {
            @sugar.wireframe.background;
            @sugar.wireframe.border;
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHNCQUF1QixTQUFRLHFCQUFZO0lBQzdDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1rQywyQ0FBUztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpRFQsQ0FBQyxDQUFDO0tBQ047SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztTQWlCVCxDQUFDLENBQUM7S0FDTjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF2R0QsNEJBdUdDIn0=