import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginBorderRadiusClassesMixinParams {}

export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };

/**
 * @name          classes
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginBorderRadiusClassesMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginBorderRadiusClassesMixinParams = {
        ...params,
    };
    const radiusesObj = __STheme.config('border.radius');
    const widthsObj = __STheme.config('border.width');

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Radius
        * @namespace          sugar.css.helpers
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
        ${Object.keys(radiusesObj)
            .map((radiusName) => {
                if (radiusName === 'default') return '';
                return ` * @cssClass      s-radius:${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
            })
            .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Radius</h3>
        ${Object.keys(radiusesObj)
            .map((radiusName) => {
                if (radiusName === 'default') return '';
                return `
              *   <div class="s-display:inline-block s-width:20 s-bg:accent s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-radius:${radiusName}">
              *     ${radiusName}
              *   </div> 
            `;
            })
            .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`
      /**
        * @name          Border width
        * @namespace          sugar.css.helpers
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
        ${Object.keys(widthsObj)
            .map((widthName) => {
                if (widthName === 'default') return '';
                return ` * @cssClass      s-bwidth:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
            })
            .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Width</h3>
        ${Object.keys(widthsObj)
            .map((widthName) => {
                if (widthName === 'default') return '';
                return `
              *   <div style="border-color: var(--s-theme-color-accent);" class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bwidth:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
            })
            .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    Object.keys(radiusesObj).forEach((radiusName) => {
        const cls = `s-radius--${radiusName}`.replace('--default', '');
        const clsName = `s-radius:${radiusName}`.replace(':default', '');
        const radiusCss = `/**
  * @name               ${clsName}
  * @namespace          sugar.css.border
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
.${cls} {
    @sugar.border.radius(${radiusName});
}`;
        vars.push(radiusCss);
    });

    Object.keys(widthsObj).forEach((widthName) => {
        const cls = `s-bwidth:${widthName}`.replace(':default', '');
        const clsName = `s-bwidth--${widthName}`.replace('--default', '');
        const radiusCss = `/**
  * @name               ${cls}
  * @namespace          sugar.css.border
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
.${clsName} {
    @sugar.border.width(${widthName});
}`;
        vars.push(radiusCss);
    });

    return vars;
}
