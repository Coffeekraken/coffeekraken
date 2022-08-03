import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };
/**
 * @name          classes
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the borders helpers like s-radius:20, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @sugar.border.classes;
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
        * @status       beta
        * 
        * These classes allows you to apply border radius on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
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
        ${radiusesKeys
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return `
              *   <div class="s-radius:${radiusName} s-display:inline-block s-width:20 s-bg:main s-pbs:30 s-mie:30 s-mbe:30 s-text:center s-ratio:1">
              *     ${radiusName}
              *   </div> 
            `;
    })
        .join('\n')}
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
        * @status       beta
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
        return ` * @cssClass      s-bwidth:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border width
        ${widthsKeys
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return `   <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:accent s-bwidth:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `
      /**
        * @name          Border color
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-color
        * @platform       css
        * @status       beta
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
        return ` * @cssClass      s-bcolor:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example             html         Border color
        ${Object.keys(__STheme.getTheme().baseColors())
        .map((colorName) => {
        return ` * <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:${colorName} s-bwidth:20">
              *     ${colorName}
              *   </div> 
            `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    radiusesKeys.forEach((radiusName) => {
        const cls = `s-radius--${radiusName}`.replace('--default', '');
        const clsName = `s-radius:${radiusName}`.replace(':default', '');
        const radiusCss = `/**
            * @name               ${clsName}
            * @namespace          sugar.style.border
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
            * 
            * @example        html
            * <div class="${clsName.replace(':', ':')} s-color--complementary">
            *     Hello world
            * </div>
            */
 `;
        vars.comment(() => radiusCss).code(`
            .${cls} {
                @sugar.border.radius(${radiusName});
            }
        `, { type: 'CssClass' });
    });
    widthsKeys.forEach((widthName) => {
        const cls = `s-bwidth:${widthName}`.replace(':default', '');
        const clsName = `s-bwidth--${widthName}`.replace('--default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.border
                * @type               CssClass
                * @platform         css
                * @status           beta
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
            @sugar.border.width(${widthName});
        }`, { type: 'CssClass' });
    });
    Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
        const cls = `s-bcolor:${colorName}`.replace(':default', '');
        const clsName = `s-bcolor--${colorName}`.replace('--default', '');
        vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.style.border
                * @type               CssClass
                * @platform         css
                * @status           beta
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
            border-color: sugar.color(${colorName});
        }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBRXJFLE1BQU0sbURBQW9ELFNBQVEsWUFBWTtJQUMxRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxtREFBbUQsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNsRCxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMvQyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFcEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDaEIsSUFB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