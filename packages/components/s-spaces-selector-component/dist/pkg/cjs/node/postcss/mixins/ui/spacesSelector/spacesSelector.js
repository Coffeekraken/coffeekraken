"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiSpacesSelectorInterface extends s_interface_1.default {
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
exports.interface = postcssUiSpacesSelectorInterface;
/**
 * @name          spacesSelector
 * @namespace     ui.spacesSelector
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the clipbord copy style to any s-spacesSelector element
 *
 * @snippet         @sugar.ui.spacesSelector($1);
 *
 * @example     css
 * .s-spaces-selector {
 *    @sugar.ui.spacesSelector;
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
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`            

            .s-spaces-selector_inner {
                border: 1px solid sugar.color(main, border);
                @sugar.border.radius;
            }

            .s-spaces-selector_space {
                @sugar.transition (fast);

                &-margin {
                    box-shadow: 0px 0px 0px 25px sugar.color(accent, --alpha 0.05);

                    &:hover {
                        box-shadow: 0px 0px 0px 25px sugar.color(accent, --alpha 0.3);
                    }
                }
                &-padding {
                    box-shadow: inset 0px 0px 0px 25px
                        sugar.color(complementary, --alpha 0.05);

                    &:hover {
                        box-shadow: inset 0px 0px 0px 25px
                            sugar.color(complementary, --alpha 0.3);
                    }
                }
            }

            .s-spaces-selector_select {
                padding: sugar.padding(20) sugar.padding(10) !important;
                padding-inline-end: sugar.padding(30) !important;
                @sugar.ui.select();
                @sugar.scale (0.9);

                &-margin {
                    &-top {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        border-bottom: none !important;
                    }
                    &-right {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        border-left: none !important;
                    }
                    &-bottom {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-top: none !important;
                    }
                    &-left {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-right: none !important;
                    }
                }
                &-padding {
                    &-top {
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                        border-top: none !important;
                    }
                    &-right {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-right: none !important;
                    }
                    &-bottom {
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                        botder-bottom: none !important;
                    }
                    &-left {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                        border-left: none !important;
                    }
                }
            }
        `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0ErRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN0dELDRCQTZHQyJ9