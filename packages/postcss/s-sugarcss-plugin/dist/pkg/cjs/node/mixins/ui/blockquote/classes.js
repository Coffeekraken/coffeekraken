"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          classes
 * @as              @s.blockquote.classes
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the blockquote classes
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.blockquote.classes
 *
 * @example       css
 * @s.ui.blockquote.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiBlockquoteClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiBlockquoteClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Blockquote
        * @namespace          sugar.style.ui.blockquote
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/blockquote
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display nice blockquote with simple class.
        * 
        * @feature          Support for shaping through the \`s-shape:...\` class
        * @feature          Support for vertical rhythm through the \`s-rhythm:vertical\` class
        * @feature          Support for text formatting through the \`s-format:text\` class
        * @feature          Full RTL support
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.ui.blockquote.classes;
        * 
        * .my-blockquote {
        *   @s.ui.blockquote;
        * }
        * 
        * @cssClass         s-blockquote            Apply the blockquote styling
        * @cssClass         s-format:text blockquote            Apply the s-blockquote styling on plain blockquotes
        * @cssClass         s-rhythm:vertical &                 Apply the vertical rhythm on the blockquote
        *
        * @example        html       Colors (none-exhaustive)
        * <div class="s-flex:column s-gap:30">
        *   <p class="s-blockquote s-color:accent">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-color:error">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-color:info">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        * </div>
        *
        * @example    html       RTL Support
        *   <p class="s-blockquote" dir="rtl">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        * 
        * @example          html        Shapes
        * <div class="s-flex:column s-gap:30">
        *   <p class="s-blockquote s-color:accent">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-shape:pill">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-shape:square">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        * </div>
        * 
        * @example          html        Scales
        * <div class="s-flex:column s-gap:30">
        *   <p class="s-blockquote s-scale:07">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-scale:10">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-scale:13">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        *   <p class="s-blockquote s-scale:16">
        *       Est mollit consectetur occaecat culpa irure dolor proident esse labore voluptate dolor.
        *   </p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
            @s.scope 'bare' {
                .s-blockquote {
                    @s.ui.blockquote;
                }
            }
    `, {
        type: 'CssClass',
    });
    vars.code(`
        @s.scope 'lnf' {
            .s-blockquote {
                @s.scope.only 'lnf' {
                    @s.ui.blockquote;
                }
            }
        }`, { type: 'CssClass' });
    vars.code(`
            @s.scope 'tf' {
                @s.format.text {
                    blockquote {
                        @s.color(accent);
                        @s.ui.blockquote;
                    } 
                }
            }
        `, { type: 'CssClass' });
    vars.code(`
            @s.scope 'vr' {
                @s.rhythm.vertical {
                    blockquote, .s-blockquote {
                        ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.default.rhythmVertical'))}
                    } 
                }
            }
        `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSwyQ0FBNEMsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUl1RCxnRUFBUztBQUVqRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9GVCxDQUNBLENBQUMsSUFBSSxDQUNGOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7OztVQU9FLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7Ozs7U0FTQyxFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FDTDs7OzswQkFJa0IsaUJBQVEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQ3RDLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUNwRDs7OztTQUloQixFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQS9KRCw0QkErSkMifQ==