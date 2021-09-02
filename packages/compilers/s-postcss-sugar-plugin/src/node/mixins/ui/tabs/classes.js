var _a;
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';
class postcssSugarPluginUiListClassesInterface extends __SInterface {
}
postcssSugarPluginUiListClassesInterface.definition = {
    styles: {
        type: 'String[]',
        values: ['solid'],
        default: ['solid'],
    },
    defaultStyle: {
        type: 'String',
        values: ['solid'],
        default: (_a = __theme().config('ui.tabs.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid',
    },
};
export { postcssSugarPluginUiListClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ styles: ['solid'], defaultStyle: 'solid' }, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Tabs
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tabs
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to style list (or any others) HTMLElement as tabs
        * 
        * @support          rtl
        * @support          chromium            
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-tabs${style === finalParams.defaultStyle ? '' : `\:${style}`}           Apply the ${style} tabs style`;
    })
        .join('\n')}
        * @cssClass       s-tabs\:grow        Make the tabs items grow and take the available space
        * @cssClass       s-tabs\:vertical    Display the tabs horizontally
        * 
        * @example        html
        ${finalParams.styles
        .map((style) => {
        return ` * <!-- ${style} style -->
            * <div class="s-font\:30 s-mb\:50">
            *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">${style} style</h3>
            *   <ul class="s-tabs${style === finalParams.defaultStyle ? '' : `\:${style}`} s-ui\:accent">
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *     <li tabindex="0" active>${__faker.name.findName()}</li>
            *     <li tabindex="0">${__faker.name.findName()}</li>
            *   </ul>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * <!-- grow -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Grow</h3>
        *   <ul class="s-tabs\:grow">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- rtl -->
        * <div class="s-font\:30 s-mb\:50" dir="rtl">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">RTL</h3>
        *   <ul class="s-tabs">
        *     <li class="s-ui\:accent" tabindex="0" active>${__faker.name.findName()}</li>
        *     <li class="s-ui\:complementary" tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        * 
        * <!-- vertical -->
        * <div class="s-font\:30 s-mb\:50">
        *   <h3 class="s-color\:accent s-font\:30 s-mb\:20">Vertical</h3>
        *   <ul class="s-tabs\:vertical s-ui\:complementary">
        *     <li tabindex="0" active>${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *     <li tabindex="0">${__faker.name.findName()}</li>
        *   </ul>
        * </div>
        *
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
        * @name           s-tabs
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>default</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs {
      @sugar.ui.tabs;
    }
  `);
    vars.push(`/**
        * @name           s-tabs--grow
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `);
    finalParams.styles.forEach((style) => {
        vars.push(`/**
        * @name           s-tabs${finalParams.defaultStyle === style ? '' : `:${style}`}
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>${style}</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs${finalParams.defaultStyle === style ? '' : `\:${style}`}">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs${finalParams.defaultStyle === style ? '' : `--${style}`} {
      @sugar.ui.tabs($style: ${style}, $scope: lnf);
    }
  `);
    });
    vars.push(`/**
        * @name           s-tabs--vertical
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>vertical</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--vertical">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--vertical {
      @sugar.ui.tabs($direction: vertical, $scope: direction);
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1QixNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQ3hELG1EQUFVLEdBQUc7SUFDaEIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUNyQjtJQUNELFlBQVksRUFBRTtRQUNWLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxNQUFBLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxtQ0FBSSxPQUFPO0tBQy9EO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNqQixZQUFZLEVBQUUsT0FBTyxJQUNsQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixXQUFXLENBQUMsTUFBTTtTQUNmLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ1gsT0FBTywwQkFDSCxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDeEQsd0JBQXdCLEtBQUssYUFBYSxDQUFDO0lBQy9DLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O1VBS2IsV0FBVyxDQUFDLE1BQU07U0FDZixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNYLE9BQU8sV0FBVyxLQUFLOztrRUFFMkIsS0FBSzttQ0FDcEMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7cUNBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzRDQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtxQ0FDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7OztlQUc3QyxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O3dDQU1pQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtpQ0FDOUIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQ3ZCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs2REFRSyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs2REFDdkIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozt3Q0FRaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7aUNBQzlCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2lDQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7OztLQU9uRCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JYLENBQUMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQlgsQ0FBQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDO2tDQUNnQixXQUFXLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTs7Ozs0Q0FJM0MsS0FBSzs7OzhCQUduQixXQUFXLENBQUMsWUFBWSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTs7Ozs7YUFLdkUsV0FBVyxDQUFDLFlBQVksS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7K0JBQ3BDLEtBQUs7O0dBRWpDLENBQUMsQ0FBQztJQUNELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCWCxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9