var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
}
postcssSugarPluginUiButtonClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid', 'gradient', 'outline', 'text'],
        default: ['solid', 'gradient', 'outline', 'text'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid', 'gradient', 'outline', 'text'],
        default: (_a = __theme().config('ui.button.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
};
export { postcssSugarPluginUiButtonClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid', 'gradient', 'outline', 'text'], defaultStyle: 'solid' }, params);
    const vars = [];
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
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-btn${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} button style`;
    })
        .join('\n')}
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">${style} style</h3>
            *   <a tabindex="0" class="s-btn\:${style} s-mr\:20 s-mb\:20"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn\:${style} s-mr\:20 s-mb\:20 s-ui\:accent"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn\:${style} s-mr\:20 s-mb\:20 s-ui\:complementary"><span>Click me!</span></a>
            *   <a tabindex="0" class="s-btn\:${style} s-ui\:error"><span>Click me!</span></a>
            *   <span class="s-btn-group s-mr\:20 s-mb\:20">
            *       <a tabindex="0" class="s-btn\:${style}"><span>Click me!</span></a>
            *       <a tabindex="0" class="s-btn\:${style}"><span>+</span></a>
            *   </span>
            * </div>
            * `;
    })
        .join('\n')}
        *
        * <!-- scales -->
        * <div class="s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:30">Scales</h3>
        *   <a tabindex="0" class="s-btn s-scale\:07 s-mr\:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale\:1 s-mr\:20"><span>Click me!</span></a>
        *   <a tabindex="0" class="s-btn s-scale\:13 s-mr\:20"><span>Click me!</span></a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    finalParams.styles.forEach((style) => {
        let cls = `s-btn`;
        if (style !== finalParams.defaultStyle) {
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
    vars.push(`/**
        * @name           s-btn-group
        * @namespace      sugar.css.ui.button
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">group</s-color>" of buttons
        * 
        * @example        html
        * <span class="s-btn-group">
        *   <a class="s-btn--block">I'm a cool block button</a>
        *   <a class="s-btn--block">+</a>
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */`);
    vars.push(`
      .s-btn-group {
          display: flex !important;   
          flex-wrap: nowrap;
      }
      .s-btn-group > .s-btn {

        &:first-child:not(:last-child) {
          border-inline-end: 1px solid sugar.color(ui, --darken 5);
        }

        &:not(:first-child):not(:last-child),
        &:not(:first-child):not(:last-child):before,
        &:not(:first-child):not(:last-child):after {
            border-radius: 0 !important;
        }
        &:first-child:not(:last-child),
        &:first-child:not(:last-child):before,
        &:first-child:not(:last-child):after {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
        &:last-child:not(:first-child),
        &:last-child:not(:first-child):before,
        &:last-child:not(:first-child):after {
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
            border-inline-start: none !important;
        }
      }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sMENBQTJDLFNBQVEsWUFBWTs7QUFDMUQscURBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsVUFBVTtRQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7UUFDaEQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDO0tBQ3BEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7UUFDaEQsT0FBTyxFQUFFLE1BQUEsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG1DQUFJLE9BQU87S0FDakU7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQ2hELFlBQVksRUFBRSxPQUFPLElBQ2xCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztVQVlKLFdBQVcsQ0FBQyxNQUFNO1NBQ2YsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLHlCQUNILEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUN4RCx3QkFBd0IsS0FBSyxlQUFlLENBQUM7SUFDakQsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1VBR2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztrRUFFMkIsS0FBSztnREFDdkIsS0FBSztnREFDTCxLQUFLO2dEQUNMLEtBQUs7Z0RBQ0wsS0FBSzs7b0RBRUQsS0FBSztvREFDTCxLQUFLOzs7ZUFHMUMsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7S0FhbEIsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUM7UUFDbEIsSUFBSSxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksRUFBRTtZQUNwQyxHQUFHLElBQUksS0FBSyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ1UsR0FBRzs7Ozt5REFJMEIsS0FBSzs7O3NCQUd4QyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7Ozs7U0FJNUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsNkJBQTZCLEtBQUssSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O1NBWUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztTQWVMLENBQUMsQ0FBQztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQThCVCxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9