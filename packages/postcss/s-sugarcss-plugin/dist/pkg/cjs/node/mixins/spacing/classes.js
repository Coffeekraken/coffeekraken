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
 * @as              @s.spacing.classes
 * @namespace      node.mixin.spacing
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the spacing helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.spacing.classes
 *
 * @example        css
 * @s.spacing.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginSpacingClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginSpacingClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const spacingsObj = s_theme_1.default.current.get('space');
    const spacingsKeys = (0, array_1.__keysFirst)(Object.keys(spacingsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Spacing
        * @namespace          sugar.style.helpers.spacing
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/spacing
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply spacing to any HTMLElement container
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.spacing.classes;
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
    * @status               stable
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
   .${clsMargin.replace(':', '-')} {
        gap: s.margin(${spaceName});
   }`, { type: 'CssClass' });
    });
    // direction
    vars.comment(() => `/**
        * @name            s-spacing:row
        * @namespace          sugar.style.helpers.spacing
        * @type             CssClass
        * @platform             css
        * @status               stable
        * 
        * This class allows you to apply the "<yellow>row</yellow>" spacing direction any HTMLElement container
        * 
        * @example      html
        * <div class="s-spacing:30:row">
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
        .s-spacing-row {
            flex-direction: unset;
        }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBQ3hELGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sc0NBQXVDLFNBQVEscUJBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJa0QsMkRBQVM7QUFFNUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUEsbUJBQVcsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV4RSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLFlBQVk7U0FDVCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO1lBQ0gsNkJBQTZCLFNBQVMsdUJBQXVCLFNBQVMsWUFBWTtTQUNyRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7cUNBTWMsZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7O0tBUXZELENBQ0EsQ0FBQztJQUVGLFdBQVc7SUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNVCxDQUFDLENBQUM7SUFFSCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDL0IsVUFBVTtRQUNWLE1BQU0sU0FBUyxHQUFHLGFBQWEsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5QkFDTyxTQUFTOzs7Ozs7b0RBTWtCLFNBQVM7Ozs4QkFHL0IsU0FBUzs7aUNBRU4sZUFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7O0lBUXBELENBQ0ssQ0FBQyxJQUFJLENBQ0Y7TUFDTixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7d0JBQ1QsU0FBUztLQUM1QixFQUNPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxZQUFZO0lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O3FDQVl1QixlQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7U0FRbkQsQ0FDSixDQUFDLElBQUksQ0FDRjs7O1VBR0UsRUFDRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEzSUQsNEJBMklDIn0=