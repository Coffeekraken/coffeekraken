import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusClassesMixinInterface.definition = {};
export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };
/**
 * @name          classes
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the borders helpers like s-border:radius-20, etc...
 *
 * @return      {Css}                   The generated css
 *
 * @example       css
 * @sugar.border.classes;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    3;
    const radiusesObj = __theme().config('border.radius');
    const widthsObj = __theme().config('border.width');
    const vars = [];
    vars.push(`
      /**
        * @name          Border
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to align things to left, right, center, etc...  on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(radiusesObj)
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return ` * @cssClass      s-border:radius-${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
    })
        .join('\n')}
        ${Object.keys(widthsObj)
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return ` * @cssClass      s-border:width-${widthName}      Apply the border width ${widthName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Radius</h3>
        ${Object.keys(radiusesObj)
        .map((radiusName) => {
        if (radiusName === 'default')
            return '';
        return `
              *   <div class="s-display:inline-block s-width:10 s-bg:accent s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1-1 s-border:radius-${radiusName}">
              *     ${radiusName}
              *   </div> 
            `;
    })
        .join('\n')}
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Width</h3>
        ${Object.keys(widthsObj)
        .map((widthName) => {
        if (widthName === 'default')
            return '';
        return `
              *   <div style="border-color: var(--s-theme-color-accent);" class="s-display:inline-block s-width:10 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1-1 s-border:width-${widthName}">
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
        const cls = `s-border--radius-${radiusName}`.replace('-default', '');
        const clsName = `s-border:radius-${radiusName}`.replace('-default', '');
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
        const cls = `s-border--width-${widthName}`.replace('-default', '');
        const clsName = `s-border:width-${widthName}`.replace('-default', '');
        const radiusCss = `/**
  * @name               ${clsName}
  * @namespace          sugar.css.border
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply a "<yellow>${widthName}</yellow>" border width style to any HTMLElement
  * 
  * @example        html
  * <div class="${clsName}">
  *     Hello world
  * </div>
  */
.${cls} {
    @sugar.border.width(${widthName});
}`;
        vars.push(radiusCss);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxtREFBb0QsU0FBUSxZQUFZOztBQUNuRSw4REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsbURBQW1ELElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsQ0FBQyxDQUFDO0lBQ0YsTUFBTSxXQUFXLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVuRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztVQWdCSixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNyQixHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNoQixJQUFJLFVBQVUsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDeEMsT0FBTyxxQ0FBcUMsVUFBVSxpQ0FBaUMsVUFBVSxxQkFBcUIsQ0FBQztJQUMzSCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDO1VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbkIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTyxvQ0FBb0MsU0FBUyxnQ0FBZ0MsU0FBUyxxQkFBcUIsQ0FBQztJQUN2SCxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQUtiLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3JCLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2hCLElBQUksVUFBVSxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN4QyxPQUFPO21KQUM0SCxVQUFVO3NCQUN2SSxVQUFVOzthQUVuQixDQUFDO0lBQ0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7VUFLYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNuQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO3lMQUNrSyxTQUFTO3NCQUM1SyxTQUFTOzthQUVsQixDQUFDO0lBQ0YsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O0tBTWxCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUMsTUFBTSxHQUFHLEdBQUcsb0JBQW9CLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSxPQUFPLEdBQUcsbUJBQW1CLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxTQUFTLEdBQUc7MEJBQ0EsT0FBTzs7Ozs7O2dEQU1lLFVBQVU7OztrQkFHeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7O0dBSXhDLEdBQUc7MkJBQ3FCLFVBQVU7RUFDbkMsQ0FBQztRQUNLLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sR0FBRyxHQUFHLG1CQUFtQixTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sU0FBUyxHQUFHOzBCQUNBLE9BQU87Ozs7OztnREFNZSxTQUFTOzs7a0JBR3ZDLE9BQU87Ozs7R0FJdEIsR0FBRzswQkFDb0IsU0FBUztFQUNqQyxDQUFDO1FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=