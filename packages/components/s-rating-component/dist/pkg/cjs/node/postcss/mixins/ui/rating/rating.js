"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiRatingInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiRatingInterface;
/**
 * @name          rating
 * @namespace     ui.rating
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the datetime picker style to any s-rating element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.rating($1);
 *
 * @example     css
 * .s-rating {
 *    @s.ui.rating;
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

            .s-rating_icons-wrapper {
                font-size: s.scalable(1em);

                i {
                    padding-inline: 5px;
                }
            }

            .s-rating_base {
                color: s.color(main);
            }
            
            .s-rating_rate {
                color: s.color(current);
            }

        `);
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHdCQUF5QixTQUFRLHFCQUFZO0lBQy9DLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSW9DLDZDQUFTO0FBRTlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFFUCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtCTCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNDRCw0QkEyQ0MifQ==