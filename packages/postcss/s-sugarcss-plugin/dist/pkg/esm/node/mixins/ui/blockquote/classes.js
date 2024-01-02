import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class SSugarcssPluginUiBlockquoteClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUiBlockquoteClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
                    @s.scope.only 'bare' {
                        @s.ui.blockquote;
                    }
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
                        ${__STheme.current.jsObjectToCssProperties(__STheme.current.get('ui.default.rhythmVertical'))}
                    } 
                }
            }
        `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwyQ0FBMkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVwRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FvRlQsQ0FDQSxDQUFDLElBQUksQ0FDRjs7Ozs7Ozs7S0FRSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7OztVQU9FLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7Ozs7U0FTQyxFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FDTDs7OzswQkFJa0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FDcEQ7Ozs7U0FJaEIsRUFDRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==