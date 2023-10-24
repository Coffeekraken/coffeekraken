"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @as          @s.fit.classes
 * @namespace      node.mixin.fit
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate all the clearfix helper classes like s-clearfix:micro, etc...
 *
 * @return        {Css}        The generated css
 *
 * @snippet         @s.fit.classes
 *
 * @example        css
 * @s.fit.classes;
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
    const fitSizes = ['fill', 'cover', 'contain', 'none', 'abs'];
    vars.comment(() => `
      /**
        * @name          Fit Sizes
        * @namespace          sugar.style.helpers.fit
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/fit-sizes
        * @platform       css
        * @status       stable
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
        * @s.fit.classes;
        * 
        * .my-element {
        *   @s.fit(fill);
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
            *   <div class="s-ratio:16-9 s-bc:ui">
            *       <img class="s-fit:${fitSizeName} s-radius" src="https://picsum.photos/1000/1000" />
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
                * @namespace          sugar.style.helpers.fit
                * @type               CssClass
                * @platform         css
                * @status           stable
                * 
                * This class allows you to apply a "<yellow>${fitSizeName}</yellow>" fit size to any HTMLElement. Work best on images and videos
                * 
                * @example        html
                * <div class="s-ratio\:16-9 s-bc:ui">
                *       <img class="s-fit\:${fitSizeName} src="https://picsum.photos/200/200" />
                *   </div>
                * 
                * @since        2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-fit-${fitSizeName} {
                    @s.fit(${fitSizeName});
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILGNBQWMsRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsTUFBTTthQUNsQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixjQUFjLEVBQUUsTUFBTSxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDM0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFN0QsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXlCSixRQUFRO1NBQ0wsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDakIsT0FBTywwQkFBMEIsV0FBVyxvQkFBb0IsV0FBVyxXQUFXLENBQUM7SUFDM0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7VUFFYixRQUFRO1NBQ0wsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDakIsT0FBTyxtQ0FBbUMsV0FBVzs7d0NBRTdCLFdBQVc7O2VBRXBDLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5Q0FDdUIsV0FBVzs7Ozs7OzhEQU1VLFdBQVc7Ozs7NkNBSTVCLFdBQVc7Ozs7OzthQU0zQyxDQUNKLENBQUMsSUFBSSxDQUNGO3lCQUNhLFdBQVc7NkJBQ1AsV0FBVztrQkFDdEIsRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWpHRCw0QkFpR0MifQ==