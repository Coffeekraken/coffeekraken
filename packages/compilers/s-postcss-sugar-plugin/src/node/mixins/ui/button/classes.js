import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
}
postcssSugarPluginUiButtonClassesInterface.definition = {
    sizes: {
        type: 'String[]',
        alias: 's',
    },
};
export { postcssSugarPluginUiButtonClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({}, params);
    const vars = [];
    const defaultStyle = (_a = __theme().config('ui.button.defaultStyle')) !== null && _a !== void 0 ? _a : 'default';
    const styles = ['default', 'gradient', 'outline', 'text'];
    vars.push(`
      /**
        * @name          Buttons
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/buttons
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display any HTMLElement as a button
        * 
        * 
        ${styles
        .map((style) => {
        return ` * @cssClass     s-btn${style === 'default' ? '' : `\:${style}`}           Apply the ${style} button style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <a class="s-btn\:${style} s-mr\:20">Click me!</a>
            *   <a class="s-btn\:${style} s-mr\:20 s-ui\:accent">Click me!</a>
            *   <a class="s-btn\:${style} s-mr\:20 s-ui\:complementary">Click me!</a>
            *   <a class="s-btn\:${style} s-ui\:error">Click me!</a>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    styles.forEach((style) => {
        let cls = `s-btn`;
        if (style !== defaultStyle) {
            cls += `--${style}`;
        }
        vars.push(`/**
        * @name           ${cls}
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">${style}</s-color>" button
        * 
        * @example        html
        * <a class="${cls.replace(/\./gm, ' ').trim()}">I'm a cool button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
        vars.push([`.${cls} {`, ` @sugar.ui.button($style: ${style});`, `}`].join('\n'));
    });
    // Object.keys(__theme().baseColors()).forEach((colorName) => {
    //     vars.push(`
    //   /**
    //    * @name        s-btn--${colorName}
    //    * @namespace     sugar.css.ui.button
    //    * @type          CssClass
    //    *
    //    * This class allows you to apply the "<span class="s-color-${colorName}>${colorName}</span>" color to any button
    //    *
    //    * @example       html
    //    * <a class="<s-btn--${colorName}">I'm a cool ${colorName} button</a>
    //    *
    //    * @since       2.0.0
    //    * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //    */
    //   .s-btn--${colorName} {
    //     @sugar.color.remap(ui, ${colorName});
    //   }
    // `);
    // });
    vars.push(`/**
        * @name           s-btn--block
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">block</s-color>" button
        * 
        * @example        html
        * <a class="s-btn--block">I'm a cool block button</a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn--block {
        display: block !important;
      }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDSixDQUFDO0FBS04sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7O0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sWUFBWSxHQUFHLE1BQUEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG1DQUFJLFNBQVMsQ0FBQztJQUU3RSxNQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBRTFELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztVQVlKLE1BQU07U0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8seUJBQ0gsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDekMsd0JBQXdCLEtBQUssZUFBZSxDQUFDO0lBQ2pELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7OztVQUdiLE1BQU07U0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztrRUFFMkIsS0FBSzttQ0FDcEMsS0FBSzttQ0FDTCxLQUFLO21DQUNMLEtBQUs7bUNBQ0wsS0FBSzs7ZUFFekIsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNyQixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsSUFBSSxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQ3hCLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDVSxHQUFHOzs7O3lEQUkwQixLQUFLOzs7c0JBR3hDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7OztTQUk1QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSw2QkFBNkIsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQyxDQUFDLENBQUM7SUFFSCwrREFBK0Q7SUFDL0Qsa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUix3Q0FBd0M7SUFDeEMsMENBQTBDO0lBQzFDLCtCQUErQjtJQUMvQixPQUFPO0lBQ1Asc0hBQXNIO0lBQ3RILE9BQU87SUFDUCwyQkFBMkI7SUFDM0IsMEVBQTBFO0lBQzFFLE9BQU87SUFDUCwwQkFBMEI7SUFDMUIsc0dBQXNHO0lBQ3RHLFFBQVE7SUFDUiwyQkFBMkI7SUFDM0IsNENBQTRDO0lBQzVDLE1BQU07SUFDTixNQUFNO0lBQ04sTUFBTTtJQUVOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztTQVlMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9