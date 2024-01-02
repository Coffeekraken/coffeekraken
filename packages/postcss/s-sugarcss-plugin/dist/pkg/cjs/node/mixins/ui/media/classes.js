"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @as              @s.ui.media.classes
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the media classes
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.media.classes
 *
 * @example       css
 * @s.ui.media.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiMediaClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiMediaClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Media
        * @namespace          sugar.style.ui.media
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/media
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some media style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * @s.ui.media.classes;
        * 
        * .my-media {
        *   @s.ui.media;
        * }
        * 
        * @cssClass             s-media                Apply the media style
        * @cssClass             s-media-container       Apply on the HTMLElement that contains a media
        * 
        * @example        html         Default
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
        * </figure>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.code(`@s.scope 'bare' {`);
    vars.comment(() => `/**
          * @name           s-media
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-media {
            @s.scope.only 'bare' {
                @s.ui.media;
            }
          }
      `, { type: 'CssClass' });
    vars.comment(() => `/**
          * @name           s-media-container
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media container
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-media-container {
          }
      `, { type: 'CssClass' });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(() => `/**
        * @name           s-media
        * @namespace          sugar.style.ui.media
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" media
        * 
        * @example        html
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
        * </figure>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
        .s-media {
            @s.scope.only 'lnf' {
                @s.ui.media;
            }
        }
    `, { type: 'CssClass' });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSWtELDJEQUFTO0FBRTVELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUVBNEIyRCxJQUFJLENBQUMsS0FBSyxDQUN2RSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7Ozs7O0tBTUosQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OzsyRUFTNkQsSUFBSSxDQUFDLEtBQUssQ0FDdkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozs7OztRQU1ILENBQ0gsQ0FBQyxJQUFJLENBQ0Y7Ozs7OztPQU1ELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7MkVBUzZELElBQUksQ0FBQyxLQUFLLENBQ3ZFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7Ozs7UUFNSCxDQUNILENBQUMsSUFBSSxDQUNGOzs7T0FHRCxFQUNDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7eUVBUzJELElBQUksQ0FBQyxLQUFLLENBQ3ZFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7OztXQUtFLENBQ04sQ0FBQyxJQUFJLENBQ0Y7Ozs7OztLQU1ILEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBKRCw0QkFvSkMifQ==