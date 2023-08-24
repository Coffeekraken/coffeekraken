import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';
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
class postcssSugarPluginSpacingClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginSpacingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const spacingsObj = __STheme.get('space');
    const spacingsKeys = __keysFirst(Object.keys(spacingsObj), ['default']);
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
        *   <p class="s-typo:lead">${__faker.name.findName()}</p>
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
    *   <p class="s-typo:lead">${__faker.name.findName()}</p>
    *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
    *   <a class="s-btn s-color:accent">Simple Cta</a>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '-')} {
        gap: sugar.margin(${spaceName});
   }`, { type: 'CssClass' });
    });
    // direction
    vars.comment(() => `/**
        * @name            s-spacing:row
        * @namespace          sugar.style.helpers.spacing
        * @type             CssClass
        * @platform             css
        * @status               beta
        * 
        * This class allows you to apply the "<yellow>row</yellow>" spacing direction any HTMLElement container
        * 
        * @example      html
        * <div class="s-spacing:30:row">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <p class="s-typo:lead">${__faker.name.findName()}</p>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFtQkosWUFBWTtTQUNULEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCw2QkFBNkIsU0FBUyx1QkFBdUIsU0FBUyxZQUFZO1NBQ3JGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztxQ0FNYyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7S0FRdkQsQ0FDQSxDQUFDO0lBRUYsV0FBVztJQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1ULENBQUMsQ0FBQztJQUVILFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMvQixVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsYUFBYSxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lCQUNPLFNBQVM7Ozs7OztvREFNa0IsU0FBUzs7OzhCQUcvQixTQUFTOztpQ0FFTixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7SUFRcEQsQ0FDSyxDQUFDLElBQUksQ0FDRjtNQUNOLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs0QkFDTCxTQUFTO0tBQ2hDLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILFlBQVk7SUFDWixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7cUNBWXVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7OztTQVFuRCxDQUNKLENBQUMsSUFBSSxDQUNGOzs7VUFHRSxFQUNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9