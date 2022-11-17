"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example        css
 * \@sugar.clearfix.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFixClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            defaultFitSize: {
                type: 'String',
                default: 'fill',
            },
        };
    }
}
exports.interface = postcssSugarPluginFixClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ defaultFitSize: 'fill' }, params);
    const vars = new CssVars();
    const fitSizes = ['fill', 'cover', 'contain', 'none'];
    vars.comment(() => `
      /**
        * @name          Fit Sizes
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a fit size on any HTMLElement.
        * On image and video, uses \`object-fit\` property, on all others,
        * simply fill the element using an absolute position, top: 0, left: 0 and width/height: 100%.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.fit.classes;
        * 
        * .my-element {
        *   \\@sugar.fit(fill);
        * }  
        * 
        ${fitSizes
        .map((fitSizeName) => {
        return ` * @cssClass     s-fit:${fitSizeName}       Apply the ${fitSizeName} fit size`;
    })
        .join('\n')}
        * 
        ${fitSizes
        .map((fitSizeName) => {
        return ` * @example         html        ${fitSizeName}
            *   <div class="s-ratio\:16-9 s-bg:ui">
            *       <img class="s-fit\:${fitSizeName} s-radius" src="https://picsum.photos/1000/1000" />
            *   </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    fitSizes.forEach((fitSizeName) => {
        vars.comment(() => `/**
                * @name          s-fit:${fitSizeName}
                * @namespace          sugar.style.fit
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${fitSizeName}</yellow>" fit size to any HTMLElement. Work best on images and videos
                * 
                * @example        html
                * <div class="s-ratio\:16-9 s-bg:ui">
                *       <img class="s-fit\:${fitSizeName} src="https://picsum.photos/200/200" />
                *   </div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-fit--${fitSizeName} {
                    @sugar.fit(${fitSizeName});
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixjQUFjLEVBQUUsTUFBTSxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV0RCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBeUJKLFFBQVE7U0FDTCxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNqQixPQUFPLDBCQUEwQixXQUFXLG9CQUFvQixXQUFXLFdBQVcsQ0FBQztJQUMzRixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOztVQUViLFFBQVE7U0FDTCxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUNqQixPQUFPLG1DQUFtQyxXQUFXOzt5Q0FFNUIsV0FBVzs7ZUFFckMsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtRQUM3QixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lDQUN1QixXQUFXOzs7Ozs7OERBTVUsV0FBVzs7Ozs2Q0FJNUIsV0FBVzs7Ozs7O2FBTTNDLENBQ0osQ0FBQyxJQUFJLENBQ0Y7MEJBQ2MsV0FBVztpQ0FDSixXQUFXO2tCQUMxQixFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBakdELDRCQWlHQyJ9