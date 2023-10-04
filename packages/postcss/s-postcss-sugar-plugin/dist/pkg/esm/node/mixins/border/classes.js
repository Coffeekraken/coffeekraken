import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };
/**
 * @name          classes
 * @as          @s.border.classes
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate the borders helpers like s-radius:20, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @snippet         @s.border.classes
 *
 * @example       css
 * \@s.border.classes;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const radiusesObj = __STheme.get('border.radius');
    const radiusesKeys = __keysFirst(Object.keys(radiusesObj), ['default']);
    const widthsObj = __STheme.get('border.width');
    const widthsKeys = __keysFirst(Object.keys(widthsObj), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Radius
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/radius
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply border radius on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.border.classes;
        * 
        * .my-element {
        *   \\@s.border.radius(40);
        *   \\@s.border.width(10);
        * }         
        * 
        * @cssClass             s-radius            Apply the default border radius to any HTMLElement
        ${radiusesKeys
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return ` * @cssClass      s-radius:${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example        html          Border radius
        * <div class="s-flex:wrap s-gap:20">
        ${radiusesKeys
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return `
              *   <div class="s-radius:${radiusName} s-width:20 s-bc:main s-flex:center s-ratio:1">
              *     ${radiusName}
              *   </div> 
            `;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Border width
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-width
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some border width to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${widthsKeys
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return ` * @cssClass      s-border:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border width
        * <div class="s-flex:wrap s-gap:20">
        ${widthsKeys
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return `   <div class="s-width:20 s-flex:center s-ratio:1 s-border:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Border color
        * @namespace          sugar.style.helpers.border
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-color
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some border color to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        if (colorName === 'default')
            return '';
        return ` * @cssClass      s-border:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border color
        * <div class="s-flex:wrap s-gap:20">
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-width:20 s-flex:center s-ratio:1 s-border:${colorName}:20">
              *     ${colorName}
              *   </div> 
            `;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    radiusesKeys.forEach((radiusName) => {
        const cls = `s-radius-${radiusName}`.replace('-default', '');
        const clsName = `s-radius:${radiusName}`.replace(':default', '');
        const radiusCss = `/**
            * @name               ${clsName}
            * @namespace          sugar.style.helpers.border
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
            * 
            * @example        html
            * <div class="${clsName.replace(':', ':')} s-color-complementary">
            *     Hello world
            * </div>
            */
 `;
        vars.comment(() => radiusCss).code(`
            .${cls} {
                @s.border.radius(${radiusName});
            }
        `, { type: 'CssClass' });
    });
    widthsKeys.forEach((widthName) => {
        const cls = `s-border:${widthName}`.replace(':default', '');
        const clsName = `s-border-${widthName}`.replace('-default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.helpers.border
                * @type               CssClass
                * @platform         css
                * @status           stable
                * 
                * This class allows you to apply a "<yellow>${widthName}</yellow>" border width style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            @s.border.width(${widthName});
        }`, { type: 'CssClass' });
    });
    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
        const cls = `s-border:${colorName}`.replace(':default', '');
        const clsName = `s-border-${colorName}`.replace('-default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.helpers.border
                * @type               CssClass
                * @platform         css
                * @status           stable
                * 
                * This class allows you to apply a "<yellow>${colorName}</yellow>" border color style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            border-color: s.color(${colorName});
        }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV4RCxNQUFNLG1EQUFvRCxTQUFRLFlBQVk7SUFDMUUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsbURBQW1ELElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUNGLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDbEQsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0MsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXBFLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXlCSixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDaEIsSUFBSSxVQUFVLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLE9BQU8sOEJBQThCLFVBQVUsaUNBQWlDLFVBQVUscUJBQXFCLENBQUM7SUFDcEgsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztVQUliLFlBQVk7U0FDVCxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNoQixJQUFJLFVBQVUsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDeEMsT0FBTzt5Q0FDa0IsVUFBVTtzQkFDN0IsVUFBVTs7YUFFbkIsQ0FBQztJQUNGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLFVBQVU7U0FDUCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPLDhCQUE4QixTQUFTLGdDQUFnQyxTQUFTLHFCQUFxQixDQUFDO0lBQ2pILENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJYixVQUFVO1NBQ1AsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTyw4REFBOEQsU0FBUztzQkFDeEUsU0FBUzs7YUFFbEIsQ0FBQztJQUNGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU8sOEJBQThCLFNBQVMsZ0NBQWdDLFNBQVMscUJBQXFCLENBQUM7SUFDakgsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztVQUliLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQzFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyw4REFBOEQsU0FBUztzQkFDeEUsU0FBUzs7YUFFbEIsQ0FBQztJQUNGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDaEMsTUFBTSxHQUFHLEdBQUcsWUFBWSxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdELE1BQU0sT0FBTyxHQUFHLFlBQVksVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLFNBQVMsR0FBRztvQ0FDVSxPQUFPOzs7Ozs7MERBTWUsVUFBVTs7OzRCQUd4QyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7RUFJbkQsQ0FBQztRQUNLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUM5QjtlQUNHLEdBQUc7bUNBQ2lCLFVBQVU7O1NBRXBDLEVBQ0csRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUM3QixNQUFNLEdBQUcsR0FBRyxZQUFZLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxPQUFPLEdBQUcsWUFBWSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7d0NBQ3NCLEdBQUc7Ozs7Ozs4REFNbUIsU0FBUzs7O2dDQUd2QyxHQUFHOzs7O1NBSTFCLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7V0FDRCxPQUFPOzhCQUNZLFNBQVM7VUFDN0IsRUFDRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNoRSxNQUFNLEdBQUcsR0FBRyxZQUFZLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxPQUFPLEdBQUcsWUFBWSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7d0NBQ3NCLEdBQUc7Ozs7Ozs4REFNbUIsU0FBUzs7O2dDQUd2QyxHQUFHOzs7O1NBSTFCLENBQ0EsQ0FBQyxJQUFJLENBQ0Y7V0FDRCxPQUFPO29DQUNrQixTQUFTO1VBQ25DLEVBQ0UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==