"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @as              @sugar.spacing.classes
 * @namespace      node.mixin.spacing
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the spacing helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.spacing.classes
 *
 * @example        css
 * \@sugar.spacing.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginSpacingClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginSpacingClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const spacingsObj = s_theme_1.default.get('space');
    const spacingsKeys = (0, array_1.__keysFirst)(Object.keys(spacingsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Spacing
        * @namespace          sugar.style.helpers.spacing
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/spacing
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply spacing to any HTMLElement container
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.spacing.classes;
        * 
        ${spacingsKeys
        .map((spaceName) => {
        if (spaceName === 'default')
            return '';
        return [
            `* @cssClass     s-spacing:${spaceName}        Apply the \`${spaceName}\` spacing`,
        ].join('\n');
    })
        .join('\n')}
        *
        * 
        * @example        html          Vertical spacing
        * <div class="s-spacing:40">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <p class="s-typo:lead">${faker_1.default.name.findName()}</p>
        *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
        *   <a class="s-btn s-color:accent">Simple Cta</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    // base css
    vars.code(`
        .s-spacing {
            display: flex;
            flex-direction: column;
            align-items: inherit;
        }
    `);
    spacingsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-spacing:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace          sugar.style.helpers.spacing
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" spacing style any HTMLElement container
    * 
    * @example      html
    * <div class="s-spacing:${spaceName}">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <p class="s-typo:lead">${faker_1.default.name.findName()}</p>
    *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
    *   <a class="s-btn s-color:accent">Simple Cta</a>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '--')} {
        gap: sugar.margin(${spaceName});
   }`, { type: 'CssClass' });
    });
    // direction
    vars.comment(() => `/**
        * @name            s-spacing:column
        * @namespace          sugar.style.helpers.spacing
        * @type             CssClass
        * @platform             css
        * @status               beta
        * 
        * This class allows you to apply the "<yellow>column</yellow>" spacing direction any HTMLElement container
        * 
        * @example      html
        * <div class="s-spacing:30:column">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <p class="s-typo:lead">${faker_1.default.name.findName()}</p>
        *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
        *   <a class="s-btn s-color:accent">Simple Cta</a>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `).code(`
        .s-spacing--column {
            flex-direction: unset;
        }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBQ3hELGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJcUQsOERBQVM7QUFFL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFtQkosWUFBWTtTQUNULEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCw2QkFBNkIsU0FBUyx1QkFBdUIsU0FBUyxZQUFZO1NBQ3JGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztxQ0FNYyxlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRdkQsQ0FDQSxDQUFDO0lBRUYsV0FBVztJQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1ULENBQUMsQ0FBQztJQUVILFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMvQixVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsYUFBYSxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lCQUNPLFNBQVM7Ozs7OztvREFNa0IsU0FBUzs7OzhCQUcvQixTQUFTOztpQ0FFTixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7SUFRcEQsQ0FDSyxDQUFDLElBQUksQ0FDRjtNQUNOLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs0QkFDTixTQUFTO0tBQ2hDLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILFlBQVk7SUFDWixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7cUNBWXVCLGVBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OztTQVFuRCxDQUNKLENBQUMsSUFBSSxDQUNGOzs7VUFHRSxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNJRCw0QkEySUMifQ==