"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiSpacesSelectorInterface extends s_interface_1.default {
    static get _definition() {
        return {};
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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.spacesSelector($1);
 *
 * @example     css
 * .s-spaces-selector {
 *    @s.ui.spacesSelector;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`            

            .s-spaces-selector_inner {
                border: 1px solid s.color(main, border);
                @s.border.radius;
            }

            .s-spaces-selector_clear {
                @s.ui.button ($lnf: text);
            }

            .s-spaces-selector_space {
                @s.transition (fast);

                &-margin {
                    box-shadow: 0px 0px 0px 25px s.color(accent, --alpha 0.05);

                    &:hover {
                        box-shadow: 0px 0px 0px 25px s.color(accent, --alpha 0.3);
                    }
                }
                &-padding {
                    box-shadow: inset 0px 0px 0px 25px
                        s.color(complementary, --alpha 0.05);

                    &:hover {
                        box-shadow: inset 0px 0px 0px 25px
                            s.color(complementary, --alpha 0.3);
                    }
                }
            }

            .s-spaces-selector_select {
                padding: s.padding(20) s.padding(10) !important;
                padding-inline-end: s.padding(40) !important;
                @s.ui.select();
                @s.scale (0.9);

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
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFFUCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbUZMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBNUdELDRCQTRHQyJ9